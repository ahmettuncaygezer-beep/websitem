'use client';

import { useCallback } from 'react';
import { useChatStore } from '../store/chatStore';
import type { RecommendedProduct } from '../types/ai.types';

export function useChat() {
    const store = useChatStore();

    const parseProducts = useCallback((content: string): RecommendedProduct[] => {
        const match = content.match(/<products>([\s\S]*?)<\/products>/);
        if (!match) return [];
        try { return JSON.parse(match[1]); } catch { return []; }
    }, []);

    const parseQuickReplies = useCallback((content: string): string[] => {
        const match = content.match(/<quickReplies>([\s\S]*?)<\/quickReplies>/);
        if (!match) return [];
        try { return JSON.parse(match[1]); } catch { return []; }
    }, []);

    const cleanResponse = useCallback((content: string) =>
        content
            .replace(/<products>[\s\S]*?<\/products>/g, '')
            .replace(/<quickReplies>[\s\S]*?<\/quickReplies>/g, '')
            .trim(), []);

    const sendMessage = useCallback(async (content: string, imageUrl?: string) => {
        // Add user message
        store.addMessage({ role: 'user', content, imageUrl });
        store.setLoading(true);

        // Add empty assistant message for streaming
        store.addMessage({ role: 'assistant', content: '', isStreaming: true });

        try {
            const allMessages = useChatStore.getState().messages;
            const apiMessages = allMessages
                .filter((m) => m.role !== 'system')
                .slice(0, -1) // exclude the empty streaming placeholder
                .map((m) => ({ role: m.role, content: m.content }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: apiMessages,
                    context: useChatStore.getState().context,
                }),
            });

            if (!response.ok) throw new Error('API error');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let fullContent = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    fullContent += decoder.decode(value, { stream: true });
                    store.updateLastMessage(fullContent);
                }
            }

            // Parse and clean
            const products = parseProducts(fullContent);
            const quickReplies = parseQuickReplies(fullContent);
            const cleaned = cleanResponse(fullContent);

            store.updateLastMessage(cleaned, {
                isStreaming: false,
                products: products.length > 0 ? products : undefined,
                quickReplies: quickReplies.length > 0 ? quickReplies : undefined,
            });
        } catch (err) {
            store.updateLastMessage(
                'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
                { isStreaming: false },
            );
        } finally {
            store.setLoading(false);
        }
    }, [store, parseProducts, parseQuickReplies, cleanResponse]);

    return { sendMessage };
}

'use client';

import { useState, useCallback } from 'react';
import { useChatStore } from '../store/chatStore';

export function useVisualSearch() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const analyzeImage = useCallback(async (file: File) => {
        setIsAnalyzing(true);
        const store = useChatStore.getState();

        // Create preview URL
        const imageUrl = URL.createObjectURL(file);

        // Add user message with image
        store.addMessage({ role: 'user', content: '🔍 Görsel arama yapıyorum…', imageUrl });

        // Add streaming assistant message
        store.addMessage({ role: 'assistant', content: '🔍 Görselinizi analiz ediyorum…', isStreaming: true });

        try {
            // Convert to base64
            const reader = new FileReader();
            const base64: string = await new Promise((resolve, reject) => {
                reader.onload = () => resolve((reader.result as string).split(',')[1]);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            const res = await fetch('/api/visual-search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64, mediaType: file.type }),
            });

            if (!res.ok) throw new Error('API error');

            const data = await res.json();
            const { analysis, products } = data;

            store.updateLastMessage(
                `Bu görseli analiz ettim:\n\n**Tür:** ${analysis.type}\n**Stil:** ${analysis.style}\n**Renk:** ${analysis.color}\n**Malzeme:** ${analysis.material}\n\nBenzer MAISON ürünleri:`,
                { isStreaming: false, products },
            );
        } catch {
            store.updateLastMessage(
                'Görsel analizi sırasında bir hata oluştu. Lütfen tekrar deneyin.',
                { isStreaming: false },
            );
        } finally {
            setIsAnalyzing(false);
        }
    }, []);

    return { analyzeImage, isAnalyzing };
}

import { create } from 'zustand';
import type { ChatStore, ChatMessage } from '../types/ai.types';

const MAX_MESSAGES = 50;

export const useChatStore = create<ChatStore>((set, get) => ({
    messages: [],
    isOpen: false,
    isMinimized: false,
    isLoading: false,
    sessionId: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36),
    context: {
        currentPage: typeof window !== 'undefined' ? window.location.pathname : '/',
    },

    openChat: () => set({ isOpen: true, isMinimized: false }),
    closeChat: () => set({ isOpen: false }),
    minimizeChat: () => set({ isMinimized: true }),
    maximizeChat: () => set({ isMinimized: false }),

    addMessage: (msg) =>
        set((s) => ({
            messages: [
                ...s.messages.slice(-MAX_MESSAGES + 1),
                { id: crypto.randomUUID(), timestamp: new Date(), ...msg } as ChatMessage,
            ],
        })),

    updateLastMessage: (content, extras) =>
        set((s) => {
            const msgs = [...s.messages];
            const last = msgs[msgs.length - 1];
            if (last?.role === 'assistant') {
                msgs[msgs.length - 1] = { ...last, content, ...extras };
            }
            return { messages: msgs };
        }),

    setLoading: (isLoading) => set({ isLoading }),

    updateContext: (ctx) =>
        set((s) => ({ context: { ...s.context, ...ctx } })),

    clearMessages: () => set({ messages: [] }),
}));

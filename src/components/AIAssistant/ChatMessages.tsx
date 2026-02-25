'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useChatStore } from './store/chatStore';
import { ChatMessage } from './ChatMessage';
import { ChatTypingIndicator } from './ChatTypingIndicator';
import { ChatQuickReplies } from './ChatQuickReplies';
import { ChatWelcome } from './ChatWelcome';
import { ChevronDown } from 'lucide-react';

export function ChatMessages() {
    const messages = useChatStore((s) => s.messages);
    const isLoading = useChatStore((s) => s.isLoading);

    const scrollRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const [autoScroll, setAutoScroll] = useState(true);
    const [activeQuickReplies, setActiveQuickReplies] = useState<string[]>([]);

    // Auto-scroll
    useEffect(() => {
        if (autoScroll && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, autoScroll]);

    // Detect manual scroll
    const handleScroll = useCallback(() => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const atBottom = scrollHeight - scrollTop - clientHeight < 60;
        setAutoScroll(atBottom);
        setShowScrollBtn(!atBottom);
    }, []);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        setAutoScroll(true);
    };

    // Track latest quick replies
    useEffect(() => {
        const last = messages.filter((m) => m.role === 'assistant' && m.quickReplies?.length).pop();
        setActiveQuickReplies(last?.quickReplies || []);
    }, [messages]);

    if (messages.length === 0 && !isLoading) return <ChatWelcome />;

    return (
        <div className="relative flex-1 overflow-hidden">
            <div ref={scrollRef} onScroll={handleScroll}
                className="h-full overflow-y-auto py-4"
                style={{ scrollBehavior: 'smooth', scrollbarWidth: 'thin', scrollbarColor: '#E8E3DC transparent' }}>
                {messages.map((m) => (
                    <ChatMessage key={m.id} message={m} />
                ))}
                {isLoading && messages[messages.length - 1]?.role !== 'assistant' && <ChatTypingIndicator />}
                <div ref={bottomRef} />
            </div>

            {/* Quick replies above input */}
            {activeQuickReplies.length > 0 && (
                <ChatQuickReplies replies={activeQuickReplies} onSent={() => setActiveQuickReplies([])} />
            )}

            {/* Scroll to bottom button */}
            {showScrollBtn && (
                <button onClick={scrollToBottom}
                    className="absolute flex items-center justify-center transition-all"
                    style={{ bottom: activeQuickReplies.length > 0 ? 52 : 8, right: 12, width: 32, height: 32, borderRadius: '50%', background: '#1C1C1E', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                    <ChevronDown size={16} />
                </button>
            )}
        </div>
    );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from './store/chatStore';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

export function ChatWindow() {
    const isOpen = useChatStore((s) => s.isOpen);
    const isMinimized = useChatStore((s) => s.isMinimized);


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0, height: isMinimized ? 60 : undefined }}
                    exit={{ opacity: 0, scale: 0.85, y: 20 }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                    className="fixed z-50 flex flex-col overflow-hidden"
                    style={{
                        bottom: 96, right: 24,
                        width: 380, height: isMinimized ? 60 : 600,
                        maxHeight: 'calc(100vh - 120px)',
                        background: 'white', borderRadius: 12,
                        boxShadow: '0 24px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.06)',
                    }}
                >
                    <ChatHeader />
                    {!isMinimized && (
                        <>
                            <ChatMessages />
                            <ChatInput />
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* Mobile full-screen version */
export function ChatWindowMobile() {
    const isOpen = useChatStore((s) => s.isOpen);
    const isMinimized = useChatStore((s) => s.isMinimized);


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '100%' }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="fixed inset-0 z-50 flex flex-col"
                    style={{ background: 'white' }}
                >
                    <ChatHeader />
                    {!isMinimized && (
                        <>
                            <ChatMessages />
                            <ChatInput />
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

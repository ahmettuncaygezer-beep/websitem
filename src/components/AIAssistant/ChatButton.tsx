'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot } from 'lucide-react';
import { useChatStore } from './store/chatStore';

export function ChatButton() {
    const isOpen = useChatStore((s) => s.isOpen);
    const openChat = useChatStore((s) => s.openChat);
    const closeChat = useChatStore((s) => s.closeChat);
    const messages = useChatStore((s) => s.messages);

    const [showGreeting, setShowGreeting] = useState(false);
    const [hovered, setHovered] = useState(false);
    const unread = messages.filter((m) => m.role === 'assistant').length;

    // Show greeting bubble after 8s, hide after 12s, only once
    useEffect(() => {
        const shown = localStorage.getItem('maison_greeting_shown');
        if (shown || isOpen) return;
        const t1 = setTimeout(() => setShowGreeting(true), 8000);
        const t2 = setTimeout(() => {
            setShowGreeting(false);
            localStorage.setItem('maison_greeting_shown', '1');
        }, 20000);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [isOpen]);

    const handleClick = () => {
        if (isOpen) closeChat();
        else { openChat(); setShowGreeting(false); }
    };

    return (
        <div className="fixed z-50" style={{ bottom: 24, right: 24 }}>
            {/* Greeting bubble */}
            <AnimatePresence>
                {showGreeting && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0, x: 10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{ transformOrigin: 'bottom right', position: 'absolute', bottom: 70, right: 0, width: 250, background: '#1C1C1E', color: 'white', borderRadius: 12, padding: '14px 16px', fontSize: 13, lineHeight: 1.5, boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}
                    >
                        👋 Merhaba! Mobilya seçiminde yardım ister misiniz?
                        <div style={{ position: 'absolute', bottom: -6, right: 20, width: 12, height: 12, background: '#1C1C1E', transform: 'rotate(45deg)' }} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tooltip on hover */}
            <AnimatePresence>
                {hovered && !isOpen && !showGreeting && (
                    <motion.div
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
                        style={{ background: '#1C1C1E', color: 'white', padding: '6px 12px', borderRadius: 6, fontSize: 12 }}
                    >
                        Size nasıl yardımcı olabilirim?
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main button */}
            <motion.button
                onClick={handleClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center"
                style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1C1C1E, #2C2C2E)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.25), 0 0 0 2px rgba(201,169,110,0.3)',
                    border: 'none', cursor: 'pointer', overflow: 'hidden',
                }}
            >
                {/* Spinning gold ring */}
                <div className="absolute inset-0 rounded-full" style={{
                    border: '2px solid transparent',
                    borderTopColor: '#C9A96E',
                    borderRightColor: 'rgba(201,169,110,0.3)',
                    animation: 'spin 3s linear infinite',
                }} />

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: 0 }} animate={{ rotate: 45 }} exit={{ rotate: 0 }}>
                            <X size={20} color="white" />
                        </motion.div>
                    ) : (
                        <motion.div key="bot" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                            <Bot size={22} color="white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Badge */}
            {!isOpen && (
                <div className="absolute flex items-center justify-center"
                    style={{
                        top: -4, right: -4, width: 18, height: 18, borderRadius: '50%',
                        background: unread > 0 ? '#E53935' : '#4CAF50',
                        border: '2px solid white', fontSize: 9, color: 'white', fontWeight: 700,
                        animation: unread === 0 ? 'none' : 'pulse 2s infinite',
                    }}>
                    {unread > 0 && unread <= 9 ? unread : ''}
                </div>
            )}

            <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
      `}</style>
        </div>
    );
}

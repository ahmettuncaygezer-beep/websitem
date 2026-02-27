'use client';

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { useChat } from './hooks/useChat';
import Link from 'next/link';

const QUICK_STARTS = [
    { icon: '🛋️', text: 'Oturma odası için mobilya', langKey: 'chat_qs_living_room' },
    { icon: '🛏️', text: 'Yatak odası dekorasyonu', langKey: 'chat_qs_bedroom' },
    { icon: '💰', text: 'Bütçeme uygun öneriler', langKey: 'chat_qs_budget' },
    { icon: '🎨', text: 'Stil testini yapmak istiyorum', langKey: 'chat_qs_style' },
    { icon: '📐', text: 'Oda planlayıcıya git', langKey: 'chat_qs_planner' },
];

export function ChatWelcome() {
    const { sendMessage } = useChat();

    const handleClick = (text: string) => {
        if (text === 'Oda planlayıcıya git') {
            window.location.href = '/oda-planlayici';
            return;
        }
        sendMessage(text);
    };

    return (
        <div className="flex flex-col items-center px-6 py-8">
            {/* Avatar */}
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
                className="flex items-center justify-center mb-5"
                style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #C9A96E, #B8915A)' }}>
                <Bot size={28} color="white" />
            </motion.div>

            <motion.h3 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                style={{ fontSize: 16, fontWeight: 600, color: '#1C1C1E', textAlign: 'center' }}
                data-lang-key="chat_welcome_title">
                Merhaba! Ben Maison AI 👋
            </motion.h3>

            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                style={{ fontSize: 13, color: '#666', textAlign: 'center', marginTop: 8 }}
                data-lang-key="chat_welcome_desc">
                Size özel mobilya önerileri için buradayım.
            </motion.p>

            {/* Quick start chips */}
            <div className="w-full mt-6 space-y-2">
                {QUICK_STARTS.map((qs, i) => (
                    <motion.button key={qs.text}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.08 }}
                        onClick={() => handleClick(qs.text)}
                        className="w-full text-left transition-all duration-200"
                        style={{
                            padding: '12px 16px', borderRadius: 8,
                            background: '#F5F0EB', border: '1px solid #E8E3DC',
                            fontSize: 13, color: '#1C1C1E', cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.background = '#FDF8F0'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E8E3DC'; e.currentTarget.style.background = '#F5F0EB'; }}
                    >
                        {qs.icon} <span data-lang-key={qs.langKey}>{qs.text}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

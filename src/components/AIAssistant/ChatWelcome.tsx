'use client';

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { useChat } from './hooks/useChat';
import { useGlobal } from '@/context/GlobalContext';

export function ChatWelcome() {
    const { sendMessage } = useChat();
    const { t } = useGlobal();

    const QUICK_STARTS = [
        { icon: '🛋️', text: t('chat_qs_living') || 'Oturma odası için mobilya', key: 'chat.qs_living' },
        { icon: '🛏️', text: t('chat_qs_bedroom') || 'Yatak odası dekorasyonu', key: 'chat.qs_bedroom' },
        { icon: '💰', text: t('chat_qs_budget') || 'Bütçeme uygun öneriler', key: 'chat.qs_budget' },
        { icon: '🎨', text: t('chat_qs_style') || 'Stil testini çözmek istiyorum', key: 'chat.qs_style' },
        { icon: '📐', text: t('chat_qs_planner') || 'Oda planlayıcıya git', key: 'chat.qs_planner' },
    ];

    const handleClick = (key: string, text: string) => {
        if (key === 'chat.qs_planner') {
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

            <div className="text-center mb-8">
                <h3 className="font-serif text-xl text-charcoal mb-2">
                    {t('chat_welcome_title') || 'Merhaba! Ben Selis AI 👋'}
                </h3>
            </div>

            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                style={{ fontSize: 13, color: '#666', textAlign: 'center', marginTop: 8 }}>
                {t('chat_welcome_desc') || "Kişiselleştirilmiş mobilya önerileri için buradayım."}
            </motion.p>

            {/* Quick start chips */}
            <div className="w-full mt-6 space-y-2">
                {QUICK_STARTS.map((qs, i) => (
                    <motion.button key={qs.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.08 }}
                        onClick={() => handleClick(qs.key, qs.text)}
                        className="w-full text-left transition-all duration-200"
                        style={{
                            padding: '12px 16px', borderRadius: 8,
                            background: '#F5F0EB', border: '1px solid #E8E3DC',
                            fontSize: 13, color: '#1C1C1E', cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.background = '#FDF8F0'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E8E3DC'; e.currentTarget.style.background = '#F5F0EB'; }}
                    >
                        {qs.icon} {qs.text}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

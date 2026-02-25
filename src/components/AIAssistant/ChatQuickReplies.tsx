'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from './hooks/useChat';

interface Props { replies: string[]; onSent: () => void; }

export function ChatQuickReplies({ replies, onSent }: Props) {
    const { sendMessage } = useChat();

    if (!replies || replies.length === 0) return null;

    const handleClick = (text: string) => {
        sendMessage(text);
        onSent();
    };

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex flex-wrap gap-2" style={{ padding: '8px 16px' }}>
                {replies.map((r, i) => (
                    <motion.button key={r} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                        onClick={() => handleClick(r)}
                        className="transition-colors duration-150"
                        style={{
                            padding: '6px 12px', borderRadius: 9999,
                            background: 'white', border: '1px solid #E8E3DC',
                            fontSize: 12, fontWeight: 500, color: '#1C1C1E', cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.background = '#FDF8F0'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E8E3DC'; e.currentTarget.style.background = 'white'; }}>
                        {r}
                    </motion.button>
                ))}
            </motion.div>
        </AnimatePresence>
    );
}

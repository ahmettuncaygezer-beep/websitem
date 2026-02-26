'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '@/lib/store/useNotificationStore';

export function NotificationBadge() {
    const { unreadCount, isOpen, setOpen } = useNotificationStore();

    return (
        <button
            onClick={() => setOpen(!isOpen)}
            aria-label={`${unreadCount} okunmamış bildirim`}
            className={`relative w-9 h-9 rounded-[6px] border border-transparent flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] ${isOpen ? 'bg-white/[0.08] text-[#C9A96E]' : 'hover:bg-white/[0.06] hover:text-[#F5F0EB] text-[#636366]'
                }`}
        >
            <motion.div
                animate={unreadCount > 0 ? {
                    rotate: [0, -10, 10, -10, 10, 0],
                } : {}}
                transition={{ duration: 0.5, delay: 2, repeat: Infinity, repeatDelay: 5 }}
            >
                <Bell size={17} />
            </motion.div>

            <AnimatePresence>
                {unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute top-[6px] right-[6px] w-[15px] h-[15px] bg-[#FF453A] rounded-full text-[9px] font-bold text-white flex items-center justify-center border-[1.5px] border-[#141416] shadow-sm pointer-events-none"
                    >
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Subtle Pulse for Unread */}
            {unreadCount > 0 && (
                <span className="absolute top-[6px] right-[6px] w-[15px] h-[15px] bg-[#FF453A] rounded-full animate-ping opacity-20 pointer-events-none" />
            )}
        </button>
    );
}

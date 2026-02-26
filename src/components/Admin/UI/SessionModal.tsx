'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, RefreshCw } from 'lucide-react';

interface SessionModalProps {
    isOpen: boolean;
    onExtend: () => void;
    onLogout: () => void;
    initialSeconds?: number;
}

export function SessionModal({
    isOpen,
    onExtend,
    onLogout,
    initialSeconds = 60,
}: SessionModalProps) {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (!isOpen) {
            setSeconds(initialSeconds);
            return;
        }
        if (seconds <= 0) {
            onLogout();
            return;
        }
        const interval = setInterval(() => setSeconds((s) => s - 1), 1000);
        return () => clearInterval(interval);
    }, [isOpen, seconds, onLogout, initialSeconds]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-[6px] z-[3000] flex items-center justify-center p-4"
                    role="alertdialog"
                    aria-modal="true"
                    aria-labelledby="session-modal-title"
                >
                    <motion.div
                        initial={{ scale: 0.94, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.94, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                        className="bg-[#1C1C1E] border border-white/[0.08] rounded-xl p-8 w-full max-w-[360px] shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                    >
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl bg-[#FFD60A]/10 border border-[#FFD60A]/20 flex items-center justify-center mb-6">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFD60A" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>

                        <h2 id="session-modal-title" className="text-[#F5F0EB] font-serif text-[20px] mb-3">
                            Oturum Zaman Aşımı
                        </h2>
                        <p className="text-[13px] text-[#AEAEB2] leading-relaxed mb-6">
                            Uzun süredir hareketsizsiniz. Oturumunuz{' '}
                            <span className="text-[#FFD60A] font-bold tabular-nums">{seconds}</span>{' '}
                            saniye içinde sonlanacak.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={onLogout}
                                className="flex-1 flex items-center justify-center gap-2 h-10 px-4 bg-transparent border border-white/10 rounded-[6px] text-[13px] text-[#AEAEB2] hover:text-[#FF453A] hover:border-[#FF453A]/30 transition-all duration-150 cursor-pointer"
                            >
                                <LogOut size={14} />
                                Çıkış Yap
                            </button>
                            <button
                                onClick={onExtend}
                                className="flex-1 flex items-center justify-center gap-2 h-10 px-4 bg-[#C9A96E] border-none rounded-[6px] text-[13px] font-semibold text-[#0F0F10] hover:bg-[#D4B87A] transition-all duration-150 cursor-pointer"
                            >
                                <RefreshCw size={14} />
                                Oturumu Uzat
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle, LogOut, RefreshCw } from 'lucide-react';

interface SessionExpireModalProps {
    isOpen: boolean;
    onExtend: () => void;
    onLogout: () => void;
}

export function SessionExpireModal({ isOpen, onExtend, onLogout }: SessionExpireModalProps) {
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes countdown

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isOpen && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0) {
            onLogout();
        }
        return () => clearInterval(timer);
    }, [isOpen, timeLeft, onLogout]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-sm bg-[#1C1C1E] border border-white/10 rounded-sm p-8 text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mx-auto mb-6">
                            <Clock size={28} className="text-[#C9A96E]" />
                        </div>

                        <h2 className="text-[20px] font-semibold text-[#F5F0EB] mb-2 font-['Playfair_Display',serif]">Oturumunuz Sona Eriyor</h2>
                        <p className="text-sm text-[#AEAEB2] mb-8">
                            Hareketsizlik nedeniyle oturumunuz <span className="text-[#C9A96E] font-bold">2 dakika</span> içinde sona erecek.
                        </p>

                        {/* Countdown circle simulation */}
                        <div className="relative w-24 h-24 mx-auto mb-10">
                            <svg className="w-full h-full -rotate-90">
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="40"
                                    fill="none"
                                    stroke="rgba(201,169,110,0.1)"
                                    strokeWidth="4"
                                />
                                <motion.circle
                                    cx="48"
                                    cy="48"
                                    r="40"
                                    fill="none"
                                    stroke="#C9A96E"
                                    strokeWidth="4"
                                    strokeDasharray="251.2"
                                    animate={{ strokeDashoffset: 251.2 - (251.2 * timeLeft / 120) }}
                                    transition={{ duration: 1, ease: 'linear' }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-[#F5F0EB] font-mono leading-none">{timeLeft}</span>
                                <span className="text-[10px] text-[#636366] uppercase tracking-wider font-bold">Saniye</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={onExtend}
                                className="w-full h-12 bg-[#C9A96E] hover:bg-[#D4B87A] text-[#0F0F10] rounded-sm text-[13px] font-bold transition-all shadow-[0_4px_20px_rgba(201,169,110,0.2)] flex items-center justify-center gap-2"
                            >
                                <RefreshCw size={16} />
                                Oturumu Uzat
                            </button>
                            <button
                                onClick={onLogout}
                                className="w-full h-12 bg-transparent border border-white/08 hover:bg-white/05 text-[#AEAEB2] rounded-sm text-[13px] font-medium transition-all flex items-center justify-center gap-2"
                            >
                                <LogOut size={16} />
                                Şimdi Çıkış Yap
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

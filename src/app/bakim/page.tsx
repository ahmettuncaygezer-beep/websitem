'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Instagram, Send, Star } from 'lucide-react';

export default function BakimPage() {
    return (
        <div className="min-h-screen bg-[#0F0F10] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-[#C9A96E]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-[#C9A96E]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[600px] w-full text-center relative z-10">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    <h1 className="text-[#F5F0EB] text-4xl sm:text-5xl font-['Playfair_Display',serif] tracking-[0.1em] mb-2 uppercase">SELIS</h1>
                    <div className="w-12 h-[1px] bg-[#C9A96E] mx-auto opacity-50 mb-3" />
                    <span className="text-[#C9A96E] text-[10px] tracking-[0.3em] font-medium uppercase font-['Inter',sans-serif]">Premium Home Experience</span>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 sm:p-12 shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-md"
                >
                    <div className="w-16 h-16 bg-[#C9A96E]/10 rounded-2xl flex items-center justify-center text-[#C9A96E] mx-auto mb-8 border border-[#C9A96E]/20">
                        <Hammer size={32} />
                    </div>

                    <h2 className="text-[#F5F0EB] text-2xl sm:text-3xl font-['Playfair_Display',serif] mb-6 leading-tight">
                        Şu an Devam Eden Mağaza İyileştirmesi
                    </h2>

                    <p className="text-[#AEAEB2] text-sm sm:text-base leading-relaxed mb-8 font-light">
                        Size daha kusursuz ve estetik bir deneyim sunabilmek için mağazamızda teknik bir güncelleme yapıyoruz. En kısa sürede yeniden aramızda olmanız için çalışıyoruz.
                    </p>

                    <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/[0.05]">
                        <div className="flex flex-col items-center">
                            <span className="text-[#C9A96E] text-xs uppercase tracking-widest mb-3 font-semibold">Bize Ulaşın</span>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-[#F5F0EB] hover:bg-[#C9A96E] hover:border-[#C9A96E] hover:text-[#0F0F10] transition-all duration-300">
                                    <Instagram size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-[#F5F0EB] hover:bg-[#C9A96E] hover:border-[#C9A96E] hover:text-[#0F0F10] transition-all duration-300">
                                    <Send size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Footer text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-12 text-[#636366] text-[11px] uppercase tracking-[0.2em]"
                >
                    Anlayışınız için Teşekkürler · &copy; 2026 SELIS
                </motion.div>
            </div>
        </div>
    );
}

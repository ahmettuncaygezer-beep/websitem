'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LoginForm } from '@/components/Admin/Auth/LoginForm';

export default function LoginPage() {
    return (
        <div className="fixed inset-0 bg-[#0F0F10] overflow-hidden flex font-['Inter',sans-serif]">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C9A96E] rounded-full opacity-[0.03] blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A96E] rounded-full opacity-[0.02] blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

            {/* Left Decorative Panel (Desk only) */}
            <div className="hidden lg:flex w-[45%] h-full bg-[#0F0F10] border-r border-white/05 relative flex-col items-center justify-center px-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="mb-12">
                        <h2 className="text-[32px] font-bold text-[#F5F0EB] font-['Playfair_Display',serif] tracking-widest">SELIS</h2>
                        <div className="w-20 h-[1px] bg-[#C9A96E] mx-auto mt-4" />
                    </div>

                    <h1 className="text-[42px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif] leading-tight">
                        Lüks mobilyada<br /><span className="text-[#C9A96E]">Türk ustalığı</span>
                    </h1>

                    <p className="text-[14px] text-[#AEAEB2] max-w-sm mx-auto leading-relaxed">
                        Yönetim paneliniz üzerinden tüm operasyonlarınızı kolayca yönetin ve SELIS deneyimini kontrol edin.
                    </p>

                    <div className="pt-12 space-y-4 text-left inline-block">
                        {[
                            'Gerçek zamanlı sipariş takibi',
                            'Gelişmiş analitik & raporlama',
                            'Çok kullanıcılı erişim yönetimi',
                            'İçerik & ürün yönetimi'
                        ].map((item, idx) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                                <span className="text-[13px] text-[#AEAEB2]">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Subtle right gradient shadow */}
                <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-white/05 to-transparent pointer-events-none" />

                <div className="absolute bottom-12 text-[11px] text-[#636366] uppercase tracking-[0.2em]">
                    SELIS ADMIN PANEL v2.0
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="flex-1 h-full flex items-center justify-center p-8 lg:p-16 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full max-w-[400px]"
                >
                    <LoginForm />
                </motion.div>
            </div>
        </div>
    );
}

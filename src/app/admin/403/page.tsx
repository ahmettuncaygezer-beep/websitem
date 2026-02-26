'use client';

import React from 'react';
import { ShieldX, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ForbiddenPage() {
    return (
        <div className="flex-1 min-h-screen bg-[#0F0F10] flex items-center justify-center p-8 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A96E] rounded-full opacity-[0.03] blur-[120px] pointer-events-none" />

            <div className="relative text-center max-w-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8"
                >
                    <div className="relative inline-block">
                        <span className="text-[120px] font-bold text-white/[0.03] font-['Playfair_Display',serif] select-none">403</span>
                        <ShieldX size={64} className="text-[#FF453A] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4" />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-[28px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif] mb-4"
                >
                    Erişim Reddedildi
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-[#636366] leading-relaxed mb-10"
                >
                    Bu sayfayı görüntülemek için gerekli yetkiye sahip değilsiniz. Yetkilendirme için süper admin ile iletişime geçebilirsiniz.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#D4B87A] text-[#0F0F10] px-8 py-3 rounded-sm text-[13px] font-bold transition-all shadow-[0_4px_20px_rgba(201,169,110,0.2)]"
                    >
                        <ArrowLeft size={16} />
                        Dashboard'a Dön
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

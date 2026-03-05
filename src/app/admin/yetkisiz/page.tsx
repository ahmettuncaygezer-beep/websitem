'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0F0F10] p-4 font-['Inter',system-ui,sans-serif]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="max-w-md w-full bg-[#1C1C1E] border border-white/[0.08] rounded-xl p-8 text-center shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
            >
                <div className="w-20 h-20 bg-white/[0.03] border border-white/[0.06] rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-[#FF453A]/10 rounded-full blur-xl" />
                    <ShieldAlert size={40} className="text-[#FF453A] relative z-10" />
                </div>

                <h1 className="text-2xl font-semibold text-[#F5F0EB] mb-3 font-['Playfair_Display',Georgia,serif]">
                    Erişim Engellendi
                </h1>

                <p className="text-[#AEAEB2] text-[14px] leading-relaxed mb-8">
                    Bu sayfayı görüntülemek veya bu işlemi gerçekleştirmek için yeterli izniniz bulunmuyor. Hesabınızın yetkilerini kontrol edin.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => window.history.back()}
                        className="flex-1 flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] text-[#F5F0EB] py-3 rounded-lg text-[13px] font-medium transition-colors border border-white/[0.08]"
                    >
                        <ArrowLeft size={16} />
                        Geri Dön
                    </button>
                    <Link
                        href="/admin/dashboard"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#C9A96E] hover:bg-[#D4B87A] text-[#0F0F10] py-3 rounded-lg text-[13px] font-bold transition-all shadow-[0_4px_20px_rgba(201,169,110,0.2)]"
                    >
                        <Home size={16} />
                        Ana Sayfa
                    </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.06] text-left">
                    <p className="text-[12px] text-[#636366] mb-1">
                        Hata Kodu: <span className="font-mono text-[#F5F0EB]">403_FORBIDDEN</span>
                    </p>
                    <p className="text-[12px] text-[#636366]">
                        Eğer bunun bir hata olduğunu düşünüyorsanız, lütfen süper yönetici ile iletişime geçin.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

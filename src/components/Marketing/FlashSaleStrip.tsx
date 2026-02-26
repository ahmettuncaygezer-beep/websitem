'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ArrowRight } from 'lucide-react';
import FlashSaleTimer from './FlashSaleTimer';

// Bitiş zamanı: env'den al, yoksa sabitlenmiş tarih
const FLASH_SALE_END = new Date(
    process.env.NEXT_PUBLIC_FLASH_SALE_END ?? '2026-03-15T23:59:59+03:00'
);

export default function FlashSaleStrip() {
    const [expired, setExpired] = useState(false);

    if (expired) return null;

    return (
        <AnimatePresence>
            <motion.section
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden bg-[#1C1C1E] w-full"
                aria-label="Flash İndirim Kampanyası"
            >
                {/* Background shimmer */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />

                <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4 relative">
                    {/* SOL: Ateş + Başlık */}
                    <div className="flex items-center gap-3 min-w-0">
                        <motion.div
                            animate={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 3 }}
                        >
                            <Flame className="w-5 h-5 text-[#C9A96E] flex-shrink-0" />
                        </motion.div>
                        <div className="hidden sm:flex flex-col">
                            <span className="text-[10px] text-[#C9A96E] tracking-[0.25em] uppercase font-medium leading-none">
                                Sınırlı Süreli
                            </span>
                            <span className="text-white font-bold text-sm tracking-wide leading-tight">
                                FLASH İNDİRİM
                            </span>
                        </div>
                        <span className="sm:hidden text-[#C9A96E] font-bold text-xs tracking-wider">
                            FLASH İNDİRİM
                        </span>

                        <div className="w-px h-8 bg-white/10 hidden sm:block mx-1" />

                        <span className="text-white/50 text-[11px] hidden md:block">
                            Seçili ürünlerde <span className="text-[#C9A96E] font-semibold">%25'e varan indirim</span>
                        </span>
                    </div>

                    {/* ORTA: Sayaç */}
                    <div className="flex items-center">
                        <FlashSaleTimer
                            endDate={FLASH_SALE_END}
                            onExpire={() => setExpired(true)}
                        />
                    </div>

                    {/* SAĞ: CTA */}
                    <Link
                        href="/kampanyalar"
                        className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-[#C9A96E] text-[#1C1C1E] text-[12px] font-bold rounded-sm hover:bg-[#B8915A] transition-colors duration-200 group"
                    >
                        <span>Kampanyayı Gör</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </motion.section>
        </AnimatePresence>
    );
}

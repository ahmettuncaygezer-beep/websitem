'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ArrowRight } from 'lucide-react';
import FlashSaleTimer from './FlashSaleTimer';
import { useGlobal } from '@/context/GlobalContext';

export default function FlashSaleStrip() {
    const [expired, setExpired] = useState(false);
    const { t } = useGlobal();
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_FLASH_SALE_END) {
            setEndDate(new Date(process.env.NEXT_PUBLIC_FLASH_SALE_END));
        } else {
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            setEndDate(endOfDay);
        }
    }, []);

    // Do not return null early. Instead, let AnimatePresence handle the unmount.
    return (
        <AnimatePresence>
            {(!expired && endDate) && (
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden bg-[#1C1C1E] w-full"
                    aria-label="Flash Sale"
                >
                    {/* Background shimmer */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />

                    <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4 relative">
                        {/* Left: Flame + Title */}
                        <div className="flex items-center gap-3 min-w-0">
                            <motion.div
                                animate={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 3 }}
                            >
                                <Flame className="w-5 h-5 text-[#C9A96E] flex-shrink-0" />
                            </motion.div>
                            <div className="hidden sm:flex flex-col">
                                <span className="text-[10px] text-[#C9A96E] tracking-[0.25em] uppercase font-medium leading-none">
                                    {t('flash_sale_limited') || 'Limited Time'}
                                </span>
                                <span className="text-white font-bold text-sm tracking-wide leading-tight">
                                    FLASH SALE
                                </span>
                            </div>
                            <span className="sm:hidden text-[#C9A96E] font-bold text-xs tracking-wider">
                                FLASH SALE
                            </span>
                        </div>

                        {/* Center: Timer */}
                        <div className="flex items-center">
                            <FlashSaleTimer
                                endDate={endDate}
                                onExpire={() => setExpired(true)}
                            />
                        </div>

                        {/* Right: CTA */}
                        <Link
                            href="/kampanyalar"
                            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-[#C9A96E] text-[#1C1C1E] text-[12px] font-bold rounded-sm hover:bg-[#B8915A] transition-colors duration-200 group"
                        >
                            <span>{t('campaigns.view_deal') || 'View Deal'}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}

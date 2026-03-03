'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useNotifications } from './useNotifications';
import { useGlobal } from '@/context/GlobalContext';

export default function NotificationQueue() {
    const { t } = useGlobal();
    const { current, isVisible, dismiss } = useNotifications(25000, 5000);

    if (!current) return null;

    const minuteText =
        current.minutesAgo === 0
            ? t('social_just_now') || "Az önce" // default to just now
            : `${current.minutesAgo} ${t('social_mins_ago') || 'dk önce'}`;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: -100, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{
                        type: 'spring',
                        damping: 25,
                        stiffness: 300,
                    }}
                    className="fixed bottom-6 left-6 z-40 max-w-[300px] w-full"
                    role="alert"
                    aria-live="polite"
                >
                    <Link
                        href={current.productHref}
                        className="flex items-center gap-3 p-3 bg-white rounded-sm shadow-xl border border-[#E8E3DC] hover:border-[#C9A96E] transition-colors duration-200 group"
                    >
                        {/* ÜRÜN GÖRSELİ */}
                        <div className="relative w-12 h-12 flex-shrink-0 rounded-sm overflow-hidden bg-[#F5F0EB]">
                            <Image
                                src={current.productImage}
                                alt={current.productName}
                                fill
                                sizes="48px"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                            {/* Fallback emoji */}
                            <div className="absolute inset-0 flex items-center justify-center text-xl bg-[#F5F0EB]">
                                {current.emoji}
                            </div>
                            {/* ALIŞVERIŞ İKONU OVERLAY */}
                            <div className="absolute inset-0 bg-[#C9A96E]/0 group-hover:bg-[#C9A96E]/20 transition-colors flex items-center justify-center">
                                <ShoppingBag className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        {/* BİLGİLER */}
                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] text-[#999] mb-0.5">
                                <span className="font-semibold text-[#1C1C1E]">
                                    {current.name}
                                </span>
                                {' · '}
                                {current.city}
                            </p>
                            <p className="text-[12px] text-[#1C1C1E] font-medium leading-snug truncate">
                                {current.emoji} {current.productName}
                            </p>
                            <p className="text-[10px] text-[#C9A96E] font-medium mt-0.5">
                                {minuteText} <span data-lang-key="social_bought">{t('social_bought')}</span>
                            </p>
                        </div>

                        {/* KAPAT BUTONU */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                dismiss();
                            }}
                            className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-[#999] hover:text-[#1C1C1E] transition-colors"
                            aria-label="Bildirimi kapat"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </Link>

                    {/* ALT PROGRESS BAR — kaç saniye sonra kapanacak */}
                    <motion.div
                        className="h-0.5 bg-[#C9A96E] rounded-b-sm origin-left"
                        initial={{ scaleX: 1 }}
                        animate={{ scaleX: 0 }}
                        transition={{ duration: 5, ease: 'linear' }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

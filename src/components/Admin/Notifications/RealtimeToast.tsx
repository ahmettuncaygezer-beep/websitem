'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, AlertTriangle, X, PackageX, ChevronRight } from 'lucide-react';
import { useNotificationStore } from '@/lib/store/useNotificationStore';
import Link from 'next/link';

const typeIcons: Record<string, { icon: any; color: string; bg: string }> = {
    'order-new': { icon: ShoppingBag, color: '#30D158', bg: 'rgba(48,209,88,0.15)' },
    'order-cancel': { icon: PackageX, color: '#FF453A', bg: 'rgba(255,69,58,0.15)' },
    'stock-warning': { icon: AlertTriangle, color: '#FFD60A', bg: 'rgba(255,214,10,0.15)' },
    'stock-empty': { icon: AlertTriangle, color: '#FF453A', bg: 'rgba(255,69,58,0.15)' },
};

export function RealtimeToast() {
    const { latestNotification, clearLatest } = useNotificationStore();
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState<typeof latestNotification>(null);

    useEffect(() => {
        if (latestNotification) {
            setCurrent(latestNotification);
            setVisible(true);
            clearLatest();

            const timer = setTimeout(() => {
                setVisible(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [latestNotification, clearLatest]);

    if (!current) return null;

    const config = typeIcons[current.type] || typeIcons['order-new'];
    const Icon = config.icon;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 80, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="fixed bottom-6 right-6 z-[100] w-[380px] bg-[#1C1C1E] border border-white/[0.08] rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
                >
                    {/* Gold accent bar */}
                    <div className="h-[2px] bg-gradient-to-r from-[#C9A96E] to-transparent" />

                    <div className="p-4 flex gap-3">
                        {/* Icon */}
                        <div
                            className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                            style={{ background: config.bg }}
                        >
                            <Icon size={18} style={{ color: config.color }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[13px] font-semibold text-[#F5F0EB] truncate">
                                {current.title}
                            </h4>
                            <p className="text-[11px] text-[#636366] mt-0.5 line-clamp-1">
                                {current.description}
                            </p>
                            {current.actionUrl && (
                                <Link
                                    href={current.actionUrl}
                                    onClick={() => setVisible(false)}
                                    className="inline-flex items-center gap-0.5 mt-2 text-[11px] font-bold text-[#C9A96E] hover:text-[#D4B87A] transition-colors"
                                >
                                    Görüntüle <ChevronRight size={12} />
                                </Link>
                            )}
                        </div>

                        {/* Close */}
                        <button
                            onClick={() => setVisible(false)}
                            className="p-1 text-[#636366] hover:text-[#F5F0EB] transition-colors self-start"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

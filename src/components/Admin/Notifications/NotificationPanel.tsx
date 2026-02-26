'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Settings2 } from 'lucide-react';
import { useNotificationStore } from '@/lib/store/useNotificationStore';
import { NotificationItem } from './NotificationItem';
import { groupByDate } from '@/lib/mock/notifications';
import { Notification } from '@/types/notifications';
import Link from 'next/link';

export function NotificationPanel() {
    const { isOpen, setOpen, notifications, markAllAsRead } = useNotificationStore();
    const [activeTab, setActiveTab] = useState<'all' | 'orders' | 'stock' | 'system'>('all');

    const filteredNotifications = useMemo(() => {
        if (activeTab === 'all') return notifications;
        if (activeTab === 'orders') return notifications.filter(n => n.type.startsWith('order'));
        if (activeTab === 'stock') return notifications.filter(n => n.type.startsWith('stock'));
        if (activeTab === 'system') return notifications.filter(n => n.type.startsWith('system') || n.type === 'security-login');
        return notifications;
    }, [notifications, activeTab]);

    const grouped = useMemo(() => groupByDate(filteredNotifications), [filteredNotifications]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60]"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: 380 }}
                        animate={{ x: 0 }}
                        exit={{ x: 380 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-screen w-[380px] bg-[#1C1C1E] border-l border-white/[0.06] shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="h-16 flex items-center justify-between px-6 border-b border-white/[0.04]">
                            <div className="flex items-center gap-3">
                                <h2 className="font-semibold text-[#F5F0EB]">Bildirimler</h2>
                                <span className="bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E] px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold">
                                    {notifications.filter(n => !n.isRead).length}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={markAllAsRead}
                                    title="Tümünü okundu işaretle"
                                    className="p-2 text-[#636366] hover:text-[#C9A96E] transition-colors"
                                >
                                    <CheckCircle2 size={18} />
                                </button>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="p-2 text-[#636366] hover:text-[#F5F0EB] transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-white/[0.04] px-4">
                            {[
                                { id: 'all', label: 'Tümü' },
                                { id: 'orders', label: 'Siparişler' },
                                { id: 'stock', label: 'Stok' },
                                { id: 'system', label: 'Sistem' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`relative px-4 py-3 text-[12px] font-medium transition-colors ${activeTab === tab.id ? 'text-[#C9A96E]' : 'text-[#636366] hover:text-[#AEAEB2]'
                                        }`}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTabBadge"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A96E]"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto scrollbar-hide">
                            <AnimatePresence mode="popLayout">
                                {Object.entries(grouped).map(([key, list]) => {
                                    if (list.length === 0) return null;

                                    const labels = { today: 'Bugün', yesterday: 'Dün', thisWeek: 'Bu Hafta', earlier: 'Daha Önce' };

                                    return (
                                        <div key={key}>
                                            <div className="px-6 py-2 bg-[#141416]/50 text-[10px] font-bold text-[#636366] uppercase tracking-widest border-y border-white/[0.02]">
                                                {labels[key as keyof typeof labels]}
                                            </div>
                                            {list.map((n: Notification) => (
                                                <NotificationItem key={n.id} notification={n} />
                                            ))}
                                        </div>
                                    );
                                })}

                                {filteredNotifications.length === 0 && (
                                    <div className="h-full flex flex-col items-center justify-center p-8 opacity-40">
                                        <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center mb-4">
                                            <Settings2 size={32} />
                                        </div>
                                        <p className="text-[13px] text-[#636366] text-center">
                                            Bu kategoride bildirim bulunmuyor.
                                        </p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-white/[0.04] bg-[#141416]/30">
                            <Link
                                href="/admin/bildirimler"
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-[13px] font-semibold text-[#C9A96E] hover:bg-[#C9A96E]/5 transition-colors"
                            >
                                Tüm Bildirimleri Gör
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ShoppingBag, AlertTriangle, User, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';
import { useNotificationStore } from '@/lib/store/useNotificationStore';
import { NotificationItem } from '@/components/Admin/Notifications/NotificationItem';
import { NotificationFilters } from '@/components/Admin/Notifications/NotificationFilters';

export default function NotificationArchivePage() {
    const { notifications, markAllAsRead, clearAll } = useNotificationStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');

    const filteredNotifications = useMemo(() => {
        return notifications.filter(n => {
            const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                n.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = typeFilter === 'all' || n.type.includes(typeFilter);
            const matchesPriority = priorityFilter === 'all' || n.priority === priorityFilter;

            return matchesSearch && matchesType && matchesPriority;
        });
    }, [notifications, searchQuery, typeFilter, priorityFilter]);

    return (
        <div className="p-8 pb-20 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-[28px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif]">Bildirim Arşivi</h1>
                    <p className="text-sm text-[#636366] mt-1">Sistem tarafından üretilen tüm bildirimlerin geçmişi</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm px-4 py-2 flex items-center gap-3">
                        <div className="text-[11px] font-bold text-[#636366] uppercase tracking-wider">OKUNMAMIŞ</div>
                        <div className="text-[18px] font-bold text-[#C9A96E]">{notifications.filter(n => !n.isRead).length}</div>
                    </div>
                    <div className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm px-4 py-2 flex items-center gap-3">
                        <div className="text-[11px] font-bold text-[#636366] uppercase tracking-wider">TOPLAM</div>
                        <div className="text-[18px] font-bold text-[#AEAEB2]">{notifications.length}</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <NotificationFilters
                onSearch={setSearchQuery}
                onTypeFilter={setTypeFilter}
                onPriorityFilter={setPriorityFilter}
                onMarkAllRead={markAllAsRead}
                onClearAll={clearAll}
            />

            {/* Main Content */}
            <div className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm overflow-hidden min-h-[500px]">
                {filteredNotifications.length > 0 ? (
                    <div className="divide-y divide-white/[0.04]">
                        {filteredNotifications.map((n, idx) => (
                            <motion.div
                                key={n.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(idx * 0.02, 0.5) }}
                                className="group"
                            >
                                <NotificationItem notification={n} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="h-[500px] flex flex-col items-center justify-center text-center p-8">
                        <div className="w-20 h-20 rounded-full bg-white/[0.03] flex items-center justify-center mb-6">
                            <Bell size={40} className="text-[#636366] opacity-30" />
                        </div>
                        <h3 className="text-[18px] font-semibold text-[#F5F0EB]">Sonuç Bulunamadı</h3>
                        <p className="text-sm text-[#636366] mt-2 max-w-xs">
                            Arama kriterlerinize uygun bildirim bulunmuyor. Farklı filtreler deneyebilirsiniz.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setTypeFilter('all');
                                setPriorityFilter('all');
                            }}
                            className="mt-6 text-[13px] font-bold text-[#C9A96E] hover:underline"
                        >
                            Filtreleri Temizle
                        </button>
                    </div>
                )}
            </div>

            {/* Pagination Placeholder */}
            {filteredNotifications.length > 0 && (
                <div className="mt-8 flex justify-between items-center text-[13px] text-[#636366]">
                    <div>{filteredNotifications.length} bildirimden 1-40 arası gösteriliyor</div>
                    <div className="flex gap-2">
                        <button disabled className="px-5 py-2 border border-white/[0.06] rounded-sm opacity-30">Önceki Sayfa</button>
                        <button disabled className="px-5 py-2 border border-white/[0.06] rounded-sm opacity-30">Sonraki Sayfa</button>
                    </div>
                </div>
            )}
        </div>
    );
}

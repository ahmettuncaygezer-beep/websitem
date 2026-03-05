'use client';

import React from 'react';
import { Search, Filter, Calendar, Trash2, CheckCircle2 } from 'lucide-react';

interface NotificationFiltersProps {
    onSearch: (query: string) => void;
    onTypeFilter: (type: string) => void;
    onPriorityFilter: (priority: string) => void;
    onMarkAllRead: () => void;
    onClearAll: () => void;
}

export function NotificationFilters({
    onSearch,
    onTypeFilter,
    onPriorityFilter,
    onMarkAllRead,
    onClearAll
}: NotificationFiltersProps) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8 p-4 bg-[#1C1C1E] border border-white/[0.06] rounded-sm">
            <div className="flex flex-wrap items-center gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-[320px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#636366]" />
                    <input
                        type="text"
                        placeholder="Bildirimlerde ara..."
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-sm py-2 pl-10 pr-4 text-[13px] text-[#F5F0EB] outline-none focus:border-[#C9A96E]/40 placeholder:text-[#636366]"
                    />
                </div>

                {/* Type Select */}
                <div className="flex items-center gap-2">
                    <Filter size={14} className="text-[#636366]" />
                    <select
                        onChange={(e) => onTypeFilter(e.target.value)}
                        className="bg-transparent text-[13px] text-[#AEAEB2] outline-none cursor-pointer hover:text-[#F5F0EB] transition-colors"
                    >
                        <option value="all">Tüm Kategoriler</option>
                        <option value="order">Siparişler</option>
                        <option value="stock">Stok</option>
                        <option value="order-cancel">İade Talepleri</option>
                        <option value="customer">Müşteriler</option>
                        <option value="system">Sistem</option>
                        <option value="security">Güvenlik</option>
                    </select>
                </div>

                {/* Priority Select */}
                <div className="flex items-center gap-2 border-l border-white/[0.08] pl-4">
                    <Calendar size={14} className="text-[#636366]" />
                    <select
                        onChange={(e) => onPriorityFilter(e.target.value)}
                        className="bg-transparent text-[13px] text-[#AEAEB2] outline-none cursor-pointer hover:text-[#F5F0EB] transition-colors"
                    >
                        <option value="all">Tüm Öncelikler</option>
                        <option value="low">Düşük</option>
                        <option value="medium">Orta</option>
                        <option value="high">Yüksek</option>
                        <option value="urgent">Kritik</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={onMarkAllRead}
                    className="flex items-center gap-2 px-4 py-2 rounded-sm text-[12px] font-semibold text-[#636366] hover:text-[#F5F0EB] hover:bg-white/[0.04] transition-all"
                >
                    <CheckCircle2 size={14} />
                    Hepsini Okundu Yap
                </button>
                <div className="w-[1px] h-4 bg-white/[0.08]" />
                <button
                    onClick={onClearAll}
                    className="flex items-center gap-2 px-4 py-2 rounded-sm text-[12px] font-semibold text-[#FF453A] hover:bg-[#FF453A]/10 transition-all"
                >
                    <Trash2 size={14} />
                    Tümünü Temizle
                </button>
            </div>
        </div>
    );
}

'use client';

import React from 'react';
import { Mail, UserCheck, UserPlus, TrendingUp } from 'lucide-react';

interface SubscriberStatsProps {
    stats: {
        total: number;
        active: number;
        newThisMonth: number;
        growth: number;
    };
}

export function SubscriberStats({ stats }: SubscriberStatsProps) {
    const cards = [
        { label: 'Toplam Abone', value: stats.total.toLocaleString('tr-TR'), icon: Mail, growth: '+12.4%', color: '#C9A96E' },
        { label: 'Aktif Abone', value: stats.active.toLocaleString('tr-TR'), icon: UserCheck, growth: '95.6%', color: '#30D158' },
        { label: 'Bu Ay Yeni', value: `+${stats.newThisMonth}`, icon: UserPlus, growth: '+8.1%', color: '#0A84FF' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {cards.map((card) => (
                <div key={card.label} className="bg-[#1C1C1E] border border-white/[0.06] p-6 rounded-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center">
                            <card.icon size={20} style={{ color: card.color }} />
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-[#30D158] bg-[#30D158]/10 px-1.5 py-0.5 rounded-[4px]">
                            <TrendingUp size={10} />
                            {card.growth}
                        </div>
                    </div>
                    <div className="text-[11px] font-bold text-[#636366] uppercase tracking-wider mb-1">{card.label}</div>
                    <div className="text-[24px] font-bold text-[#F5F0EB] tabular-nums">{card.value}</div>
                </div>
            ))}
        </div>
    );
}

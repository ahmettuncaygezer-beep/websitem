'use client';

import React from 'react';
import { Clock, CheckCircle2, XCircle, Star } from 'lucide-react';

interface ReviewStatsProps {
    stats: {
        pending: number;
        approved: number;
        rejected: number;
        averageRating: number;
    };
}

export function ReviewStats({ stats }: ReviewStatsProps) {
    const cards = [
        { label: 'Onay Bekleyen', value: stats.pending, icon: Clock, color: '#FFD60A', bg: 'rgba(255, 214, 10, 0.1)' },
        { label: 'Onaylı Yorumlar', value: stats.approved, icon: CheckCircle2, color: '#30D158', bg: 'rgba(48, 209, 88, 0.1)' },
        { label: 'Reddedilenler', value: stats.rejected, icon: XCircle, color: '#FF453A', bg: 'rgba(255, 69, 58, 0.1)' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((card) => (
                <div key={card.label} className="bg-[#1C1C1E] border border-white/[0.06] p-5 rounded-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: card.bg }}>
                        <card.icon size={24} style={{ color: card.color }} />
                    </div>
                    <div>
                        <div className="text-[11px] font-bold text-[#636366] uppercase tracking-wider mb-1">{card.label}</div>
                        <div className="text-[20px] font-bold text-[#F5F0EB] tabular-nums">{card.value}</div>
                    </div>
                </div>
            ))}

            <div className="bg-[#1C1C1E] border border-[#C9A96E]/20 p-5 rounded-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A96E]/10 flex items-center justify-center">
                    <Star size={24} className="text-[#C9A96E]" fill="#C9A96E" />
                </div>
                <div>
                    <div className="text-[11px] font-bold text-[#636366] uppercase tracking-wider mb-1">Ortalama Puan</div>
                    <div className="flex items-center gap-2">
                        <div className="text-[20px] font-bold text-[#C9A96E] tracking-tight">{stats.averageRating}</div>
                        <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={12}
                                    className={i < Math.floor(stats.averageRating) ? 'text-[#C9A96E]' : 'text-[#636366]'}
                                    fill={i < Math.floor(stats.averageRating) ? '#C9A96E' : 'transparent'}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

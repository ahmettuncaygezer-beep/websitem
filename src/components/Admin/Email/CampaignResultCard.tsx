'use client';

import React from 'react';
import { EmailCampaign } from '@/types/email';
import { ArrowUpRight, BarChart2 } from 'lucide-react';

interface CampaignResultCardProps {
    campaign: EmailCampaign;
}

export function CampaignResultCard({ campaign }: CampaignResultCardProps) {
    const stats = campaign.stats!;
    const openRate = ((stats.opened / stats.sent) * 100).toFixed(1);
    const clickRate = ((stats.clicked / stats.sent) * 100).toFixed(1);

    const metricItems = [
        { label: 'Gönderildi', value: stats.sent.toLocaleString('tr-TR'), color: '#AEAEB2' },
        { label: 'Açıldı', value: `${openRate}%`, color: '#0A84FF' },
        { label: 'Tıklandı', value: `${clickRate}%`, color: '#C9A96E' },
        { label: 'Çıkıldı', value: stats.unsubscribed, color: '#FF453A' },
    ];

    return (
        <div className="bg-[#1C1C1E] border border-white/[0.06] hover:border-[#C9A96E]/30 p-5 rounded-sm transition-all group">
            <div className="flex justify-between items-start mb-6">
                <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-semibold text-[#F5F0EB] truncate group-hover:text-[#C9A96E] transition-colors">{campaign.subject}</h3>
                    <div className="text-[11px] text-[#636366] mt-1">{new Date(campaign.sentAt!).toLocaleDateString('tr-TR')} • {campaign.targetSegment}</div>
                </div>
                <button className="p-2 bg-white/[0.03] rounded-sm text-[#636366] hover:text-[#C9A96E] transition-all">
                    <ArrowUpRight size={14} />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                {metricItems.map((item) => (
                    <div key={item.label}>
                        <div className="text-[10px] text-[#636366] uppercase tracking-wider mb-1">{item.label}</div>
                        <div className="text-[16px] font-bold tabular-nums" style={{ color: item.color }}>{item.value}</div>
                    </div>
                ))}
            </div>

            <div className="h-1 w-full bg-white/05 rounded-full overflow-hidden flex">
                <div className="h-full bg-[#0A84FF]" style={{ width: `${openRate}%` }} />
                <div className="h-full bg-[#C9A96E]" style={{ width: `${clickRate}%` }} />
            </div>

            <div className="mt-4 flex justify-between items-center text-[11px]">
                <span className="text-[#636366]">Performans Skoru:</span>
                <span className="text-[#30D158] font-bold">Harika</span>
            </div>
        </div>
    );
}

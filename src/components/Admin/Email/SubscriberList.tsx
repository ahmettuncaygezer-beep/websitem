'use client';

import React, { useState } from 'react';
import { Subscriber } from '@/types/email';
import { Search, Download, Filter, MoreHorizontal, UserMinus, UserPlus, Trash2 } from 'lucide-react';

interface SubscriberListProps {
    subscribers: Subscriber[];
}

export function SubscriberList({ subscribers }: SubscriberListProps) {
    const [search, setSearch] = useState('');

    const filtered = subscribers.filter(s =>
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.firstName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm mt-8">
            <div className="p-6 border-b border-white/[0.04] flex flex-wrap items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#636366]" />
                    <input
                        type="text"
                        placeholder="Abone ara (E-posta veya isim)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-sm pl-10 pr-4 py-2 text-[13px] text-[#F5F0EB] focus:border-[#C9A96E]/40 outline-none"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] hover:bg-white/05 text-[#AEAEB2] hover:text-[#F5F0EB] text-[12px] font-semibold rounded-sm transition-all">
                        <Filter size={14} /> Filtrele
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] hover:bg-white/05 text-[#AEAEB2] hover:text-[#F5F0EB] text-[12px] font-semibold rounded-sm transition-all">
                        <Download size={14} /> CSV
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                            <th className="px-6 py-4"><input type="checkbox" className="rounded-sm bg-white/05 border-white/10 text-[#C9A96E]" /></th>
                            <th className="px-6 py-4 text-[11px] font-bold text-[#636366] uppercase tracking-wider">ABONE</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-[#636366] uppercase tracking-wider">KAYNAK</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-[#636366] uppercase tracking-wider">KAYIT TARİHİ</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-[#636366] uppercase tracking-wider">DURUM</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                        {filtered.map((sub) => (
                            <tr key={sub.id} className="hover:bg-white/[0.01] transition-all group">
                                <td className="px-6 py-4"><input type="checkbox" className="rounded-sm bg-white/05 border-white/10 text-[#C9A96E]" /></td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-medium text-[#F5F0EB] font-mono">{sub.email}</span>
                                        <span className="text-[11px] text-[#636366]">{sub.firstName} {sub.lastName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-0.5 bg-white/05 border border-white/05 text-[#AEAEB2] text-[10px] font-bold uppercase tracking-wider rounded-sm">
                                        {sub.source}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-[12px] text-[#636366]">
                                    {new Date(sub.subscribedAt).toLocaleDateString('tr-TR')}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-1.5 h-1.5 rounded-full ${sub.status === 'active' ? 'bg-[#30D158]' : 'bg-[#FF453A]'}`} />
                                        <span className={`text-[11px] font-bold uppercase tracking-wider ${sub.status === 'active' ? 'text-[#30D158]' : 'text-[#FF453A]'}`}>
                                            {sub.status === 'active' ? 'Aktif' : 'Çıktı'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-[#636366] hover:text-[#C9A96E] opacity-0 group-hover:opacity-100 transition-all">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-6 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-[#636366]">
                <div>1-50 / {filtered.length} abone gösteriliyor</div>
                <div className="flex gap-2">
                    <button disabled className="px-3 py-1.5 border border-white/05 rounded-sm opacity-50">Önceki</button>
                    <button disabled className="px-3 py-1.5 border border-white/05 rounded-sm opacity-50">Sonraki</button>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';

const MOCK_INSTALLMENTS = [
    { count: 1, monthly: 109031, total: 109031, diff: 0 },
    { count: 3, monthly: 37344, total: 112032, diff: 3001 },
    { count: 6, monthly: 19505, total: 117030, diff: 7999 },
    { count: 12, monthly: 10156, total: 121872, diff: 12841, popular: true },
];

export function InstallmentSelector() {
    const [selected, setSelected] = useState(1);

    return (
        <div className="space-y-4 pt-8 border-t border-[#F0EDE8]">
            <h3 className="text-[12px] font-bold text-[#666] uppercase tracking-wider">Taksit Seçenekleri</h3>

            <div className="border border-[#E0E0E0] rounded-lg overflow-hidden">
                <table className="w-full text-left text-[13px]">
                    <thead className="bg-[#F9F9F9] border-b border-[#E0E0E0]">
                        <tr>
                            <th className="px-4 py-3 font-bold text-[#1C1C1E]">Taksit Sayısı</th>
                            <th className="px-4 py-3 font-bold text-[#1C1C1E]">Aylık Ödeme</th>
                            <th className="px-4 py-3 font-bold text-[#1C1C1E]">Toplam</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0EDE8]">
                        {MOCK_INSTALLMENTS.map((ins) => (
                            <tr
                                key={ins.count}
                                onClick={() => setSelected(ins.count)}
                                className={`cursor-pointer transition-colors ${selected === ins.count ? 'bg-[#FDF8F0]' : 'hover:bg-[#FAFAFA]'}`}
                            >
                                <td className="px-4 py-4 flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected === ins.count ? 'border-[#C9A96E]' : 'border-[#E8E3DC]'}`}>
                                        {selected === ins.count && <div className="w-2 h-2 bg-[#C9A96E] rounded-full" />}
                                    </div>
                                    <span className="font-medium text-[#1C1C1E]">
                                        {ins.count === 1 ? 'Tek Çekim' : `${ins.count} Taksit`}
                                        {ins.popular && (
                                            <span className="ml-2 text-[9px] bg-[#C9A96E] text-white px-1.5 py-0.5 rounded-full">POPÜLER</span>
                                        )}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-[#1C1C1E]">₺{ins.monthly.toLocaleString('tr-TR')}</td>
                                <td className="px-4 py-4 font-bold text-[#1C1C1E]">
                                    ₺{ins.total.toLocaleString('tr-TR')}
                                    {ins.diff > 0 && <span className="ml-2 text-[11px] text-[#4CAF50] font-normal">+₺{ins.diff.toLocaleString('tr-TR')}</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

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
        <div className="space-y-4 pt-8 border-t border-border">
            <h3 className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Taksit Seçenekleri</h3>

            <div className="border border-border rounded-lg overflow-hidden bg-card">
                <table className="w-full text-left text-[13px]">
                    <thead className="bg-muted border-b border-border">
                        <tr>
                            <th className="px-4 py-3 font-bold text-foreground">Taksit Sayısı</th>
                            <th className="px-4 py-3 font-bold text-foreground">Aylık Ödeme</th>
                            <th className="px-4 py-3 font-bold text-foreground">Toplam</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {MOCK_INSTALLMENTS.map((ins) => (
                            <tr
                                key={ins.count}
                                onClick={() => setSelected(ins.count)}
                                className={`cursor-pointer transition-colors ${selected === ins.count ? 'bg-selis-gold/10' : 'hover:bg-muted/50'}`}
                            >
                                <td className="px-4 py-4 flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected === ins.count ? 'border-selis-gold' : 'border-border'}`}>
                                        {selected === ins.count && <div className="w-2 h-2 bg-selis-gold rounded-full" />}
                                    </div>
                                    <span className="font-medium text-foreground">
                                        {ins.count === 1 ? 'Tek Çekim' : `${ins.count} Taksit`}
                                        {ins.popular && (
                                            <span className="ml-2 text-[9px] bg-selis-gold text-white px-1.5 py-0.5 rounded-full">POPÜLER</span>
                                        )}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-foreground">₺{ins.monthly.toLocaleString('tr-TR')}</td>
                                <td className="px-4 py-4 font-bold text-foreground">
                                    ₺{ins.total.toLocaleString('tr-TR')}
                                    {ins.diff > 0 && <span className="ml-2 text-[11px] text-green-600 dark:text-green-400 font-normal">+₺{ins.diff.toLocaleString('tr-TR')}</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

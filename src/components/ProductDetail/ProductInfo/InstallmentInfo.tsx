'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { price: number; }

const BANKS = ['Ziraat', 'Yapı Kredi', 'Garanti'] as const;
const INSTALLMENTS = [1, 3, 6, 12, 24, 36];
const RATES: Record<string, Record<number, number>> = {
    Ziraat: { 1: 0, 3: 0.026, 6: 0.053, 12: 0.107, 24: 0.20, 36: 0.24 },
    'Yapı Kredi': { 1: 0, 3: 0.03, 6: 0.06, 12: 0.12, 24: 0.22, 36: 0.28 },
    Garanti: { 1: 0, 3: 0.028, 6: 0.055, 12: 0.11, 24: 0.21, 36: 0.26 },
};

export function InstallmentInfo({ price }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [bank, setBank] = useState<typeof BANKS[number]>('Ziraat');

    return (
        <div className="mt-4">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[12px] font-medium transition-colors duration-150"
                style={{ color: '#C9A96E', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                Taksit seçeneklerini gör {isOpen ? '▴' : '▾'}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-3">
                        {/* Bank tabs */}
                        <div className="flex gap-1 mb-3">
                            {BANKS.map((b) => (
                                <button key={b} onClick={() => setBank(b)}
                                    className="px-3 py-1.5 text-[11px] font-medium transition-colors duration-150 rounded-sm"
                                    style={{ background: bank === b ? '#1C1C1E' : '#F5F0EB', color: bank === b ? 'white' : '#666', border: 'none', cursor: 'pointer' }}>
                                    {b}
                                </button>
                            ))}
                        </div>

                        {/* Table */}
                        <table className="w-full text-[12px]" style={{ borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #E8E3DC' }}>
                                    <th className="text-left py-2 px-3 font-medium" style={{ color: '#999' }}>Taksit</th>
                                    <th className="text-right py-2 px-3 font-medium" style={{ color: '#999' }}>Aylık</th>
                                    <th className="text-right py-2 px-3 font-medium" style={{ color: '#999' }}>Toplam</th>
                                </tr>
                            </thead>
                            <tbody>
                                {INSTALLMENTS.map((n, i) => {
                                    const rate = RATES[bank][n] ?? 0;
                                    const total = Math.round(price * (1 + rate));
                                    const monthly = Math.round(total / n);
                                    const isBest = n === 1;
                                    return (
                                        <tr key={n} style={{ background: isBest ? '#FDF8F0' : i % 2 === 0 ? '#FAFAF8' : 'white' }}>
                                            <td className="py-2.5 px-3" style={{ color: '#1C1C1E' }}>{n === 1 ? 'Tek çekim' : `${n} Taksit`}</td>
                                            <td className="py-2.5 px-3 text-right font-medium" style={{ color: '#1C1C1E' }}>₺{monthly.toLocaleString('tr-TR')}</td>
                                            <td className="py-2.5 px-3 text-right" style={{ color: '#666' }}>₺{total.toLocaleString('tr-TR')}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

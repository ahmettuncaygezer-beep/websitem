'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobal } from '@/context/GlobalContext';

interface Props { price: number; }

const BANKS = ['Ziraat', 'Yapı Kredi', 'Garanti'] as const;
const INSTALLMENTS = [1, 3, 6, 12, 24, 36];
const RATES: Record<string, Record<number, number>> = {
    Ziraat: { 1: 0, 3: 0.026, 6: 0.053, 12: 0.107, 24: 0.20, 36: 0.24 },
    'Yapı Kredi': { 1: 0, 3: 0.03, 6: 0.06, 12: 0.12, 24: 0.22, 36: 0.28 },
    Garanti: { 1: 0, 3: 0.028, 6: 0.055, 12: 0.11, 24: 0.21, 36: 0.26 },
};

export function InstallmentInfo({ price }: Props) {
    const { t } = useGlobal();
    const [isOpen, setIsOpen] = useState(false);
    const [bank, setBank] = useState<typeof BANKS[number]>('Ziraat');

    return (
        <div className="mt-4">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[12px] font-medium transition-colors duration-150"
                style={{ color: '#C9A96E', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                <span>{t('pdp_view_installments') || 'Taksit seçeneklerini gör'}</span> {isOpen ? '▴' : '▾'}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-3">
                        {/* Bank tabs */}
                        <div className="flex gap-1 mb-3">
                            {BANKS.map((b) => (
                                <button key={b} onClick={() => setBank(b)}
                                    className={`px-3 py-1.5 text-[11px] font-medium transition-colors duration-150 rounded-sm border-none cursor-pointer ${bank === b
                                        ? 'bg-foreground text-background'
                                        : 'bg-muted text-muted-foreground'
                                        }`}>
                                    {b}
                                </button>
                            ))}
                        </div>

                        {/* Table */}
                        <table className="w-full text-[12px] border-collapse">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">{t('pdp_installment') || 'Taksit'}</th>
                                    <th className="text-right py-2 px-3 font-medium text-muted-foreground">{t('pdp_monthly') || 'Aylık'}</th>
                                    <th className="text-right py-2 px-3 font-medium text-muted-foreground">{t('pdp_total') || 'Toplam'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {INSTALLMENTS.map((n, i) => {
                                    const rate = RATES[bank][n] ?? 0;
                                    const total = Math.round(price * (1 + rate));
                                    const monthly = Math.round(total / n);
                                    const isBest = n === 1;
                                    return (
                                        <tr key={n} className={`${isBest ? 'bg-primary/5' : i % 2 === 0 ? 'bg-muted/10' : 'bg-transparent'}`}>
                                            <td className="py-2.5 px-3 text-foreground">
                                                {n === 1 ? <span>{t('pdp_single_payment') || 'Tek çekim'}</span> : <span>{n} <span>{t('pdp_n_installment') || 'Taksit'}</span></span>}
                                            </td>
                                            <td className="py-2.5 px-3 text-right font-medium text-foreground">₺{monthly.toLocaleString('tr-TR')}</td>
                                            <td className="py-2.5 px-3 text-right text-muted-foreground">₺{total.toLocaleString('tr-TR')}</td>
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

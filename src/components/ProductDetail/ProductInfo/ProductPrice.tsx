'use client';

import { motion } from 'framer-motion';

interface Props { price: number; originalPrice?: number; currency?: string; }

export function ProductPrice({ price, originalPrice, currency = 'TRY' }: Props) {
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    const monthly = Math.ceil(price / 36);

    return (
        <div className="mt-5">
            {/* Main price */}
            <div className="flex items-baseline gap-3">
                <motion.span key={price} initial={{ scale: 1.05, color: '#C9A96E' }} animate={{ scale: 1, color: '#1C1C1E' }} transition={{ duration: 0.3 }}
                    className="text-3xl font-bold" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    ₺{price.toLocaleString('tr-TR')}
                </motion.span>
                {originalPrice && (
                    <>
                        <span className="text-lg line-through" style={{ color: '#999' }}>₺{originalPrice.toLocaleString('tr-TR')}</span>
                        <span className="text-[12px] font-bold px-2 py-0.5 rounded-sm" style={{ background: '#FFF0F0', color: '#E53935' }}>-%{discount}</span>
                    </>
                )}
            </div>

            {/* Installment hint */}
            {price >= 5000 && (
                <p className="text-[12px] mt-2" style={{ color: '#666' }}>
                    veya 36 aya kadar taksit — <strong>Aylık ₺{monthly.toLocaleString('tr-TR')}&apos;den</strong>
                </p>
            )}

            {/* VAT */}
            <p className="text-[11px] mt-1" style={{ color: '#999' }}>KDV dahil fiyattır</p>
        </div>
    );
}

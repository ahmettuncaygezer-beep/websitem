'use client';

import { motion } from 'framer-motion';
import { useGlobal } from '@/context/GlobalContext';

interface Props {
    price: number;
    originalPrice?: number;
    currency?: string;
}

export function ProductPrice({ price, originalPrice }: Props) {
    const { formatPrice, t } = useGlobal();
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    const monthly = Math.ceil(price / 36);

    return (
        <div className="mt-5">
            {/* Main price */}
            <div className="flex items-baseline gap-3">
                <motion.span
                    key={price}
                    initial={{ scale: 1.05, color: '#C9A96E' }}
                    animate={{ scale: 1, color: 'var(--foreground)' }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl font-bold"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                    {formatPrice(price)}
                </motion.span>
                {originalPrice && (
                    <>
                        <span className="text-lg line-through text-muted-foreground">{formatPrice(originalPrice)}</span>
                        <span className="text-[12px] font-bold px-2 py-0.5 rounded-sm bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">-%{discount}</span>
                    </>
                )}
            </div>

            {/* Installment hint */}
            {price >= 5000 && (
                <p className="text-[12px] mt-2 text-muted-foreground">
                    <span>{t('pdp_installment_hint_1') || 'veya 36 aya kadar taksit —'}</span> <strong>{t('pdp_monthly_from') || 'Aylık'} {formatPrice(monthly)}{t('pdp_monthly_suffix') || "'den"}</strong>
                </p>
            )}

            {/* VAT */}
            <p className="text-[11px] mt-1 text-muted-foreground/60 uppercase tracking-widest">{t('pdp_vat_included') || 'KDV dahil fiyattır'}</p>
        </div>
    );
}

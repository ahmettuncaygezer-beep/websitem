'use client';

import { useGlobal } from '@/context/GlobalContext';

interface Props { stock: number; }

export function StockIndicator({ stock }: Props) {
    const { t } = useGlobal();
    if (stock > 10) {
        return (
            <div className="mt-4">
                <span className="text-[12px] font-medium" style={{ color: '#4CAF50' }}>● {t('stock_in_stock') || 'Stokta var'}</span>
                <p className="text-[11px] text-muted-foreground">{t('stock_shipped_immediately') || 'Hemen kargoya verilir'}</p>
            </div>
        );
    }

    if (stock > 0) {
        return (
            <div className="mt-4">
                <div className="flex items-center gap-2">
                    <span className="relative text-[12px] font-medium" style={{ color: '#FF9800' }}>
                        <span className="absolute inset-0 animate-ping rounded-full" style={{ background: '#FF9800', opacity: 0.3 }} />
                        <span className="relative">⚠ {t('stock_low_stock_msg', { count: stock }) || `Son ${stock} adet kaldı!`}</span>
                    </span>
                </div>
                <div className="mt-2 w-full rounded-full overflow-hidden h-[4px] bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${(stock / 10) * 100}%`, background: 'linear-gradient(90deg, #E53935, #FF9800)' }} />
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <span className="text-[12px] font-medium" style={{ color: '#E53935' }}>✗ {t('stock_out_of_stock') || 'Stokta yok'}</span>
            <button className="mt-2 w-full py-2 text-[12px] font-medium transition-colors duration-200 border border-border rounded-sm bg-transparent text-foreground cursor-pointer">
                🔔 {t('stock_notify_btn') || 'Stok Gelince Haber Ver'}
            </button>
        </div>
    );
}

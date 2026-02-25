'use client';

interface Props { stock: number; }

export function StockIndicator({ stock }: Props) {
    if (stock > 10) {
        return (
            <div className="mt-4">
                <span className="text-[12px] font-medium" style={{ color: '#4CAF50' }}>● Stokta var</span>
                <p className="text-[11px]" style={{ color: '#999' }}>Hemen kargoya verilir</p>
            </div>
        );
    }

    if (stock > 0) {
        return (
            <div className="mt-4">
                <div className="flex items-center gap-2">
                    <span className="relative text-[12px] font-medium" style={{ color: '#FF9800' }}>
                        <span className="absolute inset-0 animate-ping rounded-full" style={{ background: '#FF9800', opacity: 0.3 }} />
                        <span className="relative">⚠ Son {stock} adet kaldı!</span>
                    </span>
                </div>
                <div className="mt-2 w-full rounded-full overflow-hidden" style={{ height: 4, background: '#F0EDE8' }}>
                    <div className="h-full rounded-full" style={{ width: `${(stock / 10) * 100}%`, background: 'linear-gradient(90deg, #E53935, #FF9800)' }} />
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <span className="text-[12px] font-medium" style={{ color: '#E53935' }}>✗ Stokta yok</span>
            <button className="mt-2 w-full py-2 text-[12px] font-medium transition-colors duration-200"
                style={{ border: '1px solid #DDD', borderRadius: '2px', background: 'transparent', color: '#1C1C1E', cursor: 'pointer' }}>
                🔔 Stok Gelince Haber Ver
            </button>
        </div>
    );
}

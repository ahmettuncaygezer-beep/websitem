'use client';

import { usePlannerStore } from '../store/plannerStore';
import { useCart } from '@/hooks/useCart';

export function CartSummary() {
    const furniture = usePlannerStore((s) => s.furniture);
    const total = furniture.reduce((s, f) => s + f.price, 0);
    const show = furniture.slice(0, 5);
    const extra = furniture.length - 5;
    const { addItem } = useCart();

    if (furniture.length === 0) return null;

    const handleAddAllToCart = () => {
        furniture.forEach((f) => {
            addItem({
                id: f.id,
                name: f.name || 'Mobilya',
                brand: 'SELIS',
                price: f.price,
                originalPrice: f.price,
                image: f.thumbnail || '/images/placeholder.jpg',
                href: '/'
            });
        });
    };

    return (
        <div className="flex items-center justify-between px-6" style={{ height: 80, background: 'white', borderTop: '2px solid #C9A96E', boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}>
            {/* Left */}
            <div className="flex items-center gap-2">
                <span className="text-[12px]" style={{ color: '#999' }}>🛋 {furniture.length} mobilya planlandı</span>
            </div>

            {/* Center — stacked avatars */}
            <div className="flex items-center">
                {show.map((f, i) => (
                    <div key={f.id} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white"
                        style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 5 - i, background: f.color }}></div>
                ))}
                {extra > 0 && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium"
                        style={{ marginLeft: -8, zIndex: 0, background: '#F5F0EB', color: '#999', border: '2px solid white' }}>
                        +{extra}
                    </div>
                )}
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-[11px]" style={{ color: '#999' }}>Toplam</p>
                    <p className="text-lg font-bold" style={{ color: '#1C1C1E' }}>₺{total.toLocaleString('tr-TR')}</p>
                </div>
                <button
                    onClick={handleAddAllToCart}
                    className="px-6 py-2.5 text-[12px] font-semibold rounded-sm transition-colors duration-200"
                    style={{ background: '#C9A96E', color: '#1C1C1E', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#B8915A')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#C9A96E')}>
                    Sepete Ekle →
                </button>
            </div>
        </div>
    );
}

'use client';

import { Truck, Calendar, Zap, Wrench } from 'lucide-react';

interface Props { deliveryDays?: number; hasQuickShip?: boolean; price: number; }

export function DeliveryInfo({ deliveryDays = 14, hasQuickShip = false, price }: Props) {
    const now = new Date();
    const start = new Date(now); start.setDate(start.getDate() + deliveryDays);
    const end = new Date(now); end.setDate(end.getDate() + deliveryDays + 2);
    const fmt = (d: Date) => d.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const rows = [
        { icon: <Truck size={16} />, title: price >= 5000 ? 'Ücretsiz Kargo' : 'Kargo', sub: price >= 5000 ? '₺5.000 ve üzeri siparişlerde' : 'Kargo ücreti ödeme adımında hesaplanır', color: '#1C1C1E' },
        { icon: <Calendar size={16} />, title: 'Tahmini Teslimat', sub: `${fmt(start)} — ${fmt(end)}`, color: '#1C1C1E' },
        ...(hasQuickShip ? [{ icon: <Zap size={16} />, title: 'Hızlı Teslimat', sub: '2 iş günü — +₺299', color: '#4CAF50' }] : []),
        { icon: <Wrench size={16} />, title: 'Ücretsiz Kurulum', sub: 'Profesyonel montaj hizmeti dahil', color: '#1C1C1E' },
    ];

    return (
        <div className="mt-6 pt-6" style={{ borderTop: '1px solid #F0EDE8' }}>
            {rows.map((r, i) => (
                <div key={i} className="flex items-start gap-3 py-3" style={{ borderBottom: i < rows.length - 1 ? '1px solid #F0EDE8' : 'none' }}>
                    <span style={{ color: r.color, marginTop: 2 }}>{r.icon}</span>
                    <div>
                        <p className="text-[13px] font-medium" style={{ color: r.color }}>{r.title}</p>
                        <p className="text-[11px]" style={{ color: '#999' }}>{r.sub}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

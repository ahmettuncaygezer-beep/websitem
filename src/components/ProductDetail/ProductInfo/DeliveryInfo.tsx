'use client';

import { Truck, Calendar, Zap, Wrench } from 'lucide-react';

interface Props { deliveryDays?: number; hasQuickShip?: boolean; price: number; }

export function DeliveryInfo({ deliveryDays = 14, hasQuickShip = false, price }: Props) {
    const now = new Date();
    const start = new Date(now); start.setDate(start.getDate() + deliveryDays);
    const end = new Date(now); end.setDate(end.getDate() + deliveryDays + 2);
    const fmt = (d: Date) => d.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const rows = [
        { icon: <Truck size={16} />, titleKey: price >= 5000 ? 'pdp_free_shipping' : 'pdp_shipping', title: price >= 5000 ? 'Ücretsiz Kargo' : 'Kargo', subKey: price >= 5000 ? 'pdp_free_shipping_sub' : 'pdp_shipping_sub', sub: price >= 5000 ? '₺5.000 ve üzeri siparişlerde' : 'Kargo ücreti ödeme adımında hesaplanır', color: 'var(--selis-primary)' },
        { icon: <Calendar size={16} />, titleKey: 'pdp_est_delivery', title: 'Tahmini Teslimat', sub: `${fmt(start)} — ${fmt(end)}`, color: 'var(--selis-primary)' },
        ...(hasQuickShip ? [{ icon: <Zap size={16} />, titleKey: 'pdp_fast_delivery', title: 'Hızlı Teslimat', subKey: 'pdp_fast_delivery_sub', sub: '2 iş günü — +₺299', color: '#4CAF50' }] : []),
        { icon: <Wrench size={16} />, titleKey: 'pdp_free_install', title: 'Ücretsiz Kurulum', subKey: 'pdp_free_install_sub', sub: 'Profesyonel montaj hizmeti dahil', color: 'var(--selis-primary)' },
    ];

    return (
        <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
            {rows.map((r, i) => (
                <div key={i} className="flex items-start gap-3 py-3" style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ color: r.color, marginTop: 2 }}>{r.icon}</span>
                    <div>
                        <p className="text-[13px] font-medium" style={{ color: r.color }} data-lang-key={r.titleKey as string}>{r.title}</p>
                        <p className="text-[11px] text-muted-foreground" data-lang-key={r.subKey as string | undefined}>{r.sub}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

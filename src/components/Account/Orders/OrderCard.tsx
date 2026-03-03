'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import type { Order } from '@/types/account.types';

const statusMap: Record<string, { label: string; className: string }> = {
    pending: { label: 'Onay Bekliyor', className: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' },
    confirmed: { label: 'Onaylandı', className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    preparing: { label: 'Hazırlanıyor', className: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' },
    shipped: { label: 'Kargoda', className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    delivered: { label: 'Teslim Edildi', className: 'bg-green-500/10 text-green-600 dark:text-green-400' },
    cancelled: { label: 'İptal', className: 'bg-red-500/10 text-red-600 dark:text-red-400' },
    returned: { label: 'İade', className: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
};

export function OrderCard({ order }: { order: Order }) {
    const st = statusMap[order.status];

    return (
        <div className="mb-4 overflow-hidden bg-card border border-border rounded-lg">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-muted/30 border-b border-border">
                <div>
                    <p className="text-[13px] font-semibold font-mono text-foreground">{order.id}</p>
                    <p className="text-[11px] mt-0.5 text-muted-foreground">
                        {format(new Date(order.createdAt), 'd MMMM yyyy, HH:mm', { locale: tr })}
                    </p>
                </div>
                <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${st.className}`}>
                    {st.label}
                </span>
            </div>

            {/* Items */}
            <div className="px-5 py-3">
                {order.items.map((item) => (
                    <div key={item.id} className="flex gap-3 py-3 border-b border-border/50 last:border-0">
                        <div className="w-16 h-16 rounded flex-shrink-0 bg-cover bg-center bg-muted" style={{ backgroundImage: `url(${item.image})` }} />
                        <div className="flex-1 min-w-0">
                            <Link href={`/urun/${item.slug}`} className="text-[13px] font-medium text-foreground hover:underline">
                                {item.name}
                            </Link>
                            <p className="text-[11px] mt-0.5 text-muted-foreground">{item.color} {item.size && `· ${item.size}`}</p>
                            <p className="text-[11px] text-muted-foreground">x{item.quantity} adet</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <p className="text-[13px] font-bold text-foreground">₺{(item.price * item.quantity).toLocaleString('tr-TR')}</p>
                            {order.status === 'delivered' && !item.reviewId && (
                                <button className="text-[11px] font-medium mt-1 text-selis-gold hover:underline bg-transparent border-none cursor-pointer">
                                    Değerlendir ★
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-muted/30 border-t border-border">
                <div>
                    <p className="text-[15px] font-bold text-foreground">Toplam: ₺{order.total.toLocaleString('tr-TR')}</p>
                    <p className="text-[11px] text-muted-foreground">{order.shippingCost === 0 ? 'Ücretsiz kargo' : `Kargo: ₺${order.shippingCost}`}</p>
                </div>
                <div className="flex gap-2">
                    {order.canCancel && (
                        <button className="px-3 py-1.5 text-[11px] font-medium rounded border border-red-200 dark:border-red-900/50 text-red-500 bg-card hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer transition-colors">
                            ✗ İptal Et
                        </button>
                    )}
                    {order.status === 'shipped' && (
                        <button className="px-3 py-1.5 text-[11px] font-medium rounded border border-blue-200 dark:border-blue-900/50 text-blue-500 bg-card hover:bg-blue-50 dark:hover:bg-blue-950/20 cursor-pointer transition-colors">
                            📍 Kargo Takip
                        </button>
                    )}
                    <Link
                        href={`/hesabim/siparislerim/${order.id}`}
                        className="px-3 py-1.5 text-[11px] font-medium rounded bg-foreground text-background hover:opacity-90 transition-opacity"
                    >
                        Sipariş Detayı
                    </Link>
                </div>
            </div>
        </div>
    );
}

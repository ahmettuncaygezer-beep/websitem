'use client';

import Link from 'next/link';
import { mockOrders } from '@/data/mock-account';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ArrowRight } from 'lucide-react';

const statusLabels: Record<string, { label: string; className: string }> = {
    pending: { label: 'Onay Bekliyor', className: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' },
    confirmed: { label: 'Onaylandı', className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    preparing: { label: 'Hazırlanıyor', className: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' },
    shipped: { label: 'Kargoda', className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    delivered: { label: 'Teslim Edildi', className: 'bg-green-500/10 text-green-600 dark:text-green-400' },
    cancelled: { label: 'İptal', className: 'bg-red-500/10 text-red-600 dark:text-red-400' },
    returned: { label: 'İade', className: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
};

export function RecentOrders() {
    const recent = mockOrders.slice(0, 3);

    return (
        <div className="mt-6 bg-card border border-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h3 className="text-[15px] font-semibold text-foreground">Son Siparişler</h3>
                <Link href="/hesabim/siparislerim" className="flex items-center gap-1 text-[12px] font-medium text-selis-gold hover:underline">
                    Tümünü Gör <ArrowRight size={14} />
                </Link>
            </div>

            {recent.map((order) => {
                const st = statusLabels[order.status];
                return (
                    <Link href={`/hesabim/siparislerim/${order.id}`} key={order.id}>
                        <div className="flex items-center gap-4 px-5 py-4 transition-colors duration-150 hover:bg-muted/30 border-b border-border last:border-0">
                            {/* Product thumbnails */}
                            <div className="flex -space-x-2 flex-shrink-0">
                                {order.items.slice(0, 3).map((item, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded bg-cover bg-center flex-shrink-0 border-2 border-card bg-muted"
                                        style={{
                                            backgroundImage: `url(${item.image})`,
                                            zIndex: 3 - i,
                                        }}
                                    />
                                ))}
                                {order.items.length > 3 && (
                                    <div className="w-8 h-8 rounded flex items-center justify-center text-[9px] font-bold bg-muted border-2 border-card text-muted-foreground">
                                        +{order.items.length - 3}
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-medium font-mono text-foreground">{order.id}</p>
                                <p className="text-[11px] text-muted-foreground">
                                    {format(new Date(order.createdAt), 'd MMMM yyyy', { locale: tr })}
                                </p>
                            </div>

                            {/* Price */}
                            <p className="text-[13px] font-bold text-foreground">₺{order.total.toLocaleString('tr-TR')}</p>

                            {/* Status */}
                            <span
                                className={`text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap ${st.className}`}
                            >
                                {st.label}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

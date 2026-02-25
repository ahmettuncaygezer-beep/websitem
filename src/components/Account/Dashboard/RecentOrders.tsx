'use client';

import Link from 'next/link';
import { mockOrders } from '@/data/mock-account';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ArrowRight } from 'lucide-react';

const statusLabels: Record<string, { label: string; bg: string; color: string }> = {
    pending: { label: 'Onay Bekliyor', bg: '#FFF8E1', color: '#F59E0B' },
    confirmed: { label: 'Onaylandı', bg: '#E3F2FD', color: '#2196F3' },
    preparing: { label: 'Hazırlanıyor', bg: '#FFF8E1', color: '#F59E0B' },
    shipped: { label: 'Kargoda', bg: '#E3F2FD', color: '#2196F3' },
    delivered: { label: 'Teslim Edildi', bg: '#E8F5E9', color: '#4CAF50' },
    cancelled: { label: 'İptal', bg: '#FFEBEE', color: '#E53935' },
    returned: { label: 'İade', bg: '#F3E5F5', color: '#9C27B0' },
};

export function RecentOrders() {
    const recent = mockOrders.slice(0, 3);

    return (
        <div className="mt-6" style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #F0EDE8' }}>
                <h3 className="text-[15px] font-semibold" style={{ color: '#1C1C1E' }}>Son Siparişler</h3>
                <Link href="/hesabim/siparislerim" className="flex items-center gap-1 text-[12px] font-medium" style={{ color: '#C9A96E' }}>
                    Tümünü Gör <ArrowRight size={14} />
                </Link>
            </div>

            {recent.map((order) => {
                const st = statusLabels[order.status];
                return (
                    <Link href={`/hesabim/siparislerim/${order.id}`} key={order.id}>
                        <div className="flex items-center gap-4 px-5 py-4 transition-colors duration-150 hover:bg-[#FAFAF8]" style={{ borderBottom: '1px solid #F5F0EB' }}>
                            {/* Product thumbnails */}
                            <div className="flex -space-x-2 flex-shrink-0">
                                {order.items.slice(0, 3).map((item, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded bg-cover bg-center flex-shrink-0"
                                        style={{
                                            backgroundImage: `url(${item.image})`,
                                            border: '2px solid white',
                                            backgroundColor: '#F0EDE8',
                                            zIndex: 3 - i,
                                        }}
                                    />
                                ))}
                                {order.items.length > 3 && (
                                    <div className="w-8 h-8 rounded flex items-center justify-center text-[9px] font-bold" style={{ background: '#F0EDE8', border: '2px solid white', color: '#999' }}>
                                        +{order.items.length - 3}
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-medium" style={{ fontFamily: 'monospace', color: '#1C1C1E' }}>{order.id}</p>
                                <p className="text-[11px]" style={{ color: '#999' }}>
                                    {format(new Date(order.createdAt), 'd MMMM yyyy', { locale: tr })}
                                </p>
                            </div>

                            {/* Price */}
                            <p className="text-[13px] font-bold" style={{ color: '#1C1C1E' }}>₺{order.total.toLocaleString('tr-TR')}</p>

                            {/* Status */}
                            <span
                                className="text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap"
                                style={{ background: st.bg, color: st.color }}
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

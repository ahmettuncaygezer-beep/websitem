'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import type { Order } from '@/types/account.types';

const statusMap: Record<string, { label: string; bg: string; color: string }> = {
    pending: { label: 'Onay Bekliyor', bg: '#FFF8E1', color: '#F59E0B' },
    confirmed: { label: 'Onaylandı', bg: '#E3F2FD', color: '#2196F3' },
    preparing: { label: 'Hazırlanıyor', bg: '#FFF8E1', color: '#F59E0B' },
    shipped: { label: 'Kargoda', bg: '#E3F2FD', color: '#2196F3' },
    delivered: { label: 'Teslim Edildi', bg: '#E8F5E9', color: '#4CAF50' },
    cancelled: { label: 'İptal', bg: '#FFEBEE', color: '#E53935' },
    returned: { label: 'İade', bg: '#F3E5F5', color: '#9C27B0' },
};

export function OrderCard({ order }: { order: Order }) {
    const st = statusMap[order.status];

    return (
        <div className="mb-4 overflow-hidden" style={{ background: 'white', border: '1px solid #F0EDE8', borderRadius: '8px' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5" style={{ background: '#FAFAF8', borderBottom: '1px solid #F0EDE8' }}>
                <div>
                    <p className="text-[13px] font-semibold" style={{ fontFamily: 'monospace', color: '#1C1C1E' }}>{order.id}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: '#999' }}>
                        {format(new Date(order.createdAt), 'd MMMM yyyy, HH:mm', { locale: tr })}
                    </p>
                </div>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ background: st.bg, color: st.color }}>
                    {st.label}
                </span>
            </div>

            {/* Items */}
            <div className="px-5 py-3">
                {order.items.map((item) => (
                    <div key={item.id} className="flex gap-3 py-3" style={{ borderBottom: '1px solid #F5F0EB' }}>
                        <div className="w-16 h-16 rounded flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})`, backgroundColor: '#F0EDE8' }} />
                        <div className="flex-1 min-w-0">
                            <Link href={`/urun/${item.slug}`} className="text-[13px] font-medium hover:underline" style={{ color: '#1C1C1E' }}>
                                {item.name}
                            </Link>
                            <p className="text-[11px] mt-0.5" style={{ color: '#999' }}>{item.color} {item.size && `· ${item.size}`}</p>
                            <p className="text-[11px]" style={{ color: '#999' }}>x{item.quantity} adet</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <p className="text-[13px] font-bold" style={{ color: '#1C1C1E' }}>₺{(item.price * item.quantity).toLocaleString('tr-TR')}</p>
                            {order.status === 'delivered' && !item.reviewId && (
                                <button className="text-[11px] font-medium mt-1" style={{ color: '#C9A96E', background: 'none', border: 'none', cursor: 'pointer' }}>
                                    Değerlendir ★
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3.5" style={{ background: '#FAFAF8', borderTop: '1px solid #F0EDE8' }}>
                <div>
                    <p className="text-[15px] font-bold" style={{ color: '#1C1C1E' }}>Toplam: ₺{order.total.toLocaleString('tr-TR')}</p>
                    <p className="text-[11px]" style={{ color: '#999' }}>{order.shippingCost === 0 ? 'Ücretsiz kargo' : `Kargo: ₺${order.shippingCost}`}</p>
                </div>
                <div className="flex gap-2">
                    {order.canCancel && (
                        <button className="px-3 py-1.5 text-[11px] font-medium rounded" style={{ border: '1px solid #FFCDD2', color: '#E53935', background: 'white', cursor: 'pointer' }}>
                            ✗ İptal Et
                        </button>
                    )}
                    {order.status === 'shipped' && (
                        <button className="px-3 py-1.5 text-[11px] font-medium rounded" style={{ border: '1px solid #BBDEFB', color: '#2196F3', background: 'white', cursor: 'pointer' }}>
                            📍 Kargo Takip
                        </button>
                    )}
                    <Link
                        href={`/hesabim/siparislerim/${order.id}`}
                        className="px-3 py-1.5 text-[11px] font-medium rounded"
                        style={{ background: '#1C1C1E', color: 'white' }}
                    >
                        Sipariş Detayı
                    </Link>
                </div>
            </div>
        </div>
    );
}

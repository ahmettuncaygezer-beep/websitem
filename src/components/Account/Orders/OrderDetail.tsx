'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useOrders } from '@/hooks/useOrders';
import { OrderTimeline } from './OrderTimeline';
import { AccountHeader } from '../AccountHeader';

const statusMap: Record<string, { label: string; bg: string; color: string }> = {
    pending: { label: 'Onay Bekliyor', bg: '#FFF8E1', color: '#F59E0B' },
    confirmed: { label: 'Onaylandı', bg: '#E3F2FD', color: '#2196F3' },
    preparing: { label: 'Hazırlanıyor', bg: '#FFF8E1', color: '#F59E0B' },
    shipped: { label: 'Kargoda', bg: '#E3F2FD', color: '#2196F3' },
    delivered: { label: 'Teslim Edildi', bg: '#E8F5E9', color: '#4CAF50' },
    cancelled: { label: 'İptal', bg: '#FFEBEE', color: '#E53935' },
    returned: { label: 'İade', bg: '#F3E5F5', color: '#9C27B0' },
};

export function OrderDetail({ orderId }: { orderId: string }) {
    const { getOrder } = useOrders();
    const order = getOrder(orderId);

    if (!order) {
        return (
            <div className="text-center py-16">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-[15px] font-semibold" style={{ color: '#1C1C1E' }}>Sipariş bulunamadı</p>
                <Link href="/hesabim/siparislerim" className="text-[13px] mt-2 inline-block" style={{ color: '#C9A96E' }}>
                    ← Siparişlerime Dön
                </Link>
            </div>
        );
    }

    const st = statusMap[order.status];

    return (
        <div>
            <AccountHeader
                title={order.id}
                breadcrumbs={[
                    { label: 'Siparişlerim', href: '/hesabim/siparislerim' },
                    { label: order.id },
                ]}
            />

            {/* Status + date */}
            <div className="flex items-center gap-3 mb-4">
                <span className="text-[12px] font-semibold px-3 py-1 rounded-full" style={{ background: st.bg, color: st.color }}>
                    {st.label}
                </span>
                <span className="text-[12px]" style={{ color: '#999' }}>
                    {format(new Date(order.createdAt), 'd MMMM yyyy, HH:mm', { locale: tr })}
                </span>
            </div>

            {/* Timeline */}
            <OrderTimeline order={order} />

            {/* Items */}
            <div className="mb-4 p-5" style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}>
                <h3 className="text-[15px] font-semibold mb-4" style={{ color: '#1C1C1E' }}>Ürünler</h3>
                {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-3" style={{ borderBottom: '1px solid #F5F0EB' }}>
                        <div className="w-20 h-20 rounded flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})`, backgroundColor: '#F0EDE8' }} />
                        <div className="flex-1">
                            <Link href={`/urun/${item.slug}`} className="text-[14px] font-medium hover:underline" style={{ color: '#1C1C1E' }}>{item.name}</Link>
                            <p className="text-[12px] mt-1" style={{ color: '#999' }}>{item.color} · x{item.quantity}</p>
                            <p className="text-[14px] font-bold mt-1" style={{ color: '#1C1C1E' }}>₺{(item.price * item.quantity).toLocaleString('tr-TR')}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary + Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Summary */}
                <div className="p-5" style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}>
                    <h3 className="text-[15px] font-semibold mb-3" style={{ color: '#1C1C1E' }}>Sipariş Özeti</h3>
                    <div className="space-y-2 text-[13px]">
                        <div className="flex justify-between"><span style={{ color: '#999' }}>Ara Toplam</span><span>₺{order.subtotal.toLocaleString('tr-TR')}</span></div>
                        <div className="flex justify-between"><span style={{ color: '#999' }}>Kargo</span><span style={{ color: '#4CAF50' }}>{order.shippingCost === 0 ? 'Ücretsiz' : `₺${order.shippingCost}`}</span></div>
                        {order.discount > 0 && <div className="flex justify-between"><span style={{ color: '#999' }}>İndirim</span><span style={{ color: '#E53935' }}>-₺{order.discount.toLocaleString('tr-TR')}</span></div>}
                        <div className="h-px" style={{ background: '#F0EDE8' }} />
                        <div className="flex justify-between font-bold text-[15px]"><span>Toplam</span><span>₺{order.total.toLocaleString('tr-TR')}</span></div>
                    </div>
                    <p className="text-[11px] mt-3" style={{ color: '#999' }}>Ödeme: {order.paymentMethod}</p>
                </div>

                {/* Address */}
                <div className="p-5" style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}>
                    <h3 className="text-[15px] font-semibold mb-3" style={{ color: '#1C1C1E' }}>Teslimat Adresi</h3>
                    <p className="text-[14px] font-medium" style={{ color: '#1C1C1E' }}>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                    <p className="text-[12px] mt-1" style={{ color: '#999' }}>{order.shippingAddress.phone}</p>
                    <p className="text-[13px] mt-2 leading-relaxed" style={{ color: '#666' }}>
                        {order.shippingAddress.address}
                        {order.shippingAddress.apartment && `, ${order.shippingAddress.apartment}`}
                        <br />
                        {order.shippingAddress.district}, {order.shippingAddress.city} {order.shippingAddress.postalCode}
                    </p>
                </div>
            </div>

            {/* Back link */}
            <Link href="/hesabim/siparislerim" className="inline-flex items-center gap-1 mt-6 text-[13px] font-medium" style={{ color: '#C9A96E' }}>
                <ArrowLeft size={16} /> Siparişlerime Dön
            </Link>
        </div>
    );
}

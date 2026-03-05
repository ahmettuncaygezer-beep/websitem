'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, User, Star, CreditCard, Banknote, Building2, Copy, Check, RotateCcw } from 'lucide-react';
import { type Order, type OrderStatus, type TimelineEvent, formatPrice, getAvatarColor } from '@/types/admin/orders';
import { OrderDetail } from '@/components/Admin/Orders/OrderDetail';
import { OrderActions } from '@/components/Admin/Orders/OrderActions';
import { OrderTimeline } from '@/components/Admin/Orders/OrderTimeline';
import { Loader2 } from 'lucide-react';

function mapDbOrder(o: any): Order {
    return {
        id: String(o.id),
        orderNo: String(o.order_number) || `#${String(o.id).slice(0, 4)}`,
        customer: {
            id: o.user_id || 'anon',
            name: o.customer_name || o.shipping_name || 'Anonim',
            email: o.customer_email || o.shipping_email || '',
            phone: o.customer_phone || o.shipping_phone || '',
            avatar: (o.customer_name || 'A').slice(0, 2).toUpperCase(),
            totalOrders: 1,
            totalSpent: Number(o.total_amount) || 0,
            isVip: false,
        },
        items: (o.items || []).map((item: any, i: number) => ({
            id: item.id || `item-${i}`,
            productName: item.product_name || item.name || 'Ürün',
            variantName: item.variant || '',
            quantity: item.quantity || 1,
            unitPrice: Number(item.price) || 0,
            totalPrice: (Number(item.price) || 0) * (item.quantity || 1),
            image: item.image || '📦',
        })),
        subtotal: Number(o.total_amount) || 0,
        shippingCost: 0,
        discount: 0,
        total: Number(o.total_amount) || 0,
        status: mapDbStatus(o.status),
        paymentMethod: {
            type: o.payment_method || 'Kredi Kartı',
            last4: null,
            transactionId: o.payment_id || '',
        },
        shippingAddress: {
            fullName: o.shipping_name || o.customer_name || '',
            phone: o.shipping_phone || '',
            address: o.shipping_address || '',
            district: o.shipping_district || '',
            city: o.shipping_city || '',
            postalCode: o.shipping_postal_code || '',
        },
        cargoCompany: o.cargo_company || null,
        trackingNumber: o.tracking_number || null,
        estimatedDelivery: o.estimated_delivery || null,
        adminNote: o.notes || '',
        timeline: [],
        createdAt: o.created_at || new Date().toISOString(),
        updatedAt: o.updated_at || new Date().toISOString(),
    };
}

function mapDbStatus(s: string): Order['status'] {
    const map: Record<string, Order['status']> = {
        'pending': 'Ödeme Bekleniyor',
        'processing': 'Hazırlanıyor',
        'shipped': 'Kargoya Verildi',
        'delivered': 'Teslim Edildi',
        'cancelled': 'İptal',
        'refunded': 'İade Talebi',
        'paid': 'Ödeme Alındı'
    };
    return map[s] || 'Ödeme Bekleniyor';
}

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

// ── Customer Card Component ────────────────────────────────────────────────
function CustomerCard({ customer }: { customer: Order['customer'] }) {
    return (
        <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
            {customer.isVip && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #C9A96E, transparent)' }} />
            )}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Müşteri</h3>
            </div>
            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: '48px', height: '48px', borderRadius: '50%', background: getAvatarColor(customer.name),
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600, color: '#0F0F10'
                        }}>
                            {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        {customer.isVip && (
                            <div style={{
                                position: 'absolute', bottom: -2, right: -2, background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.2)',
                                borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A96E', fontSize: '10px'
                            }}>
                                <Star size={10} fill="currentColor" />
                            </div>
                        )}
                    </div>
                    <div>
                        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: 500, color: '#F5F0EB', marginBottom: '2px' }}>{customer.name}</div>
                        <div style={{ fontSize: '12px', color: '#AEAEB2' }}>{customer.email}</div>
                        <div style={{ fontSize: '12px', color: '#AEAEB2' }}>{customer.phone}</div>
                        {customer.isVip && (
                            <div style={{
                                marginTop: '8px', background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.2)',
                                borderRadius: '20px', padding: '3px 12px', fontSize: '11px', fontWeight: 600, color: '#C9A96E',
                                display: 'inline-flex', alignItems: 'center', gap: '5px'
                            }}>
                                <Star size={10} fill="currentColor" /> VIP MÜŞTERİ
                            </div>
                        )}
                    </div>
                </div>

                <button style={{
                    marginTop: '16px', background: 'transparent', border: 'none', color: '#C9A96E',
                    fontSize: '12px', cursor: 'pointer', padding: 0
                }}>
                    Müşteri Profiline Git →
                </button>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '16px', paddingTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums' }}>{customer.totalOrders}</div>
                        <div style={{ fontSize: '10px', color: '#636366', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Toplam Sipariş</div>
                    </div>
                    <div>
                        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums' }}>{formatPrice(customer.totalSpent).replace('₺', '')}₺</div>
                        <div style={{ fontSize: '10px', color: '#636366', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Toplam Harcama</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Payment Card Component ────────────────────────────────────────────────
function PaymentCard({ order, onRefund }: { order: Order; onRefund: () => void }) {
    const [copied, setCopied] = useState(false);

    const handleCopyId = () => {
        navigator.clipboard.writeText(order.paymentMethod.transactionId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const PaymentIcon = () => {
        const type = order.paymentMethod.type.toLowerCase();
        if (type.includes('kart')) return <CreditCard size={18} />;
        if (type.includes('havale')) return <Building2 size={18} />;
        return <Banknote size={18} />;
    };

    return (
        <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Ödeme Bilgileri</h3>
            </div>
            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(201,169,110,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A96E' }}>
                        <PaymentIcon />
                    </div>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: '#F5F0EB' }}>{order.paymentMethod.type}</div>
                        {order.paymentMethod.last4 && (
                            <div style={{ fontSize: '12px', color: '#636366', fontFamily: "'JetBrains Mono', monospace" }}>•••• •••• •••• {order.paymentMethod.last4}</div>
                        )}
                    </div>
                </div>

                {order.paymentMethod.transactionId && (
                    <div style={{ marginTop: '12px', padding: '8px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#636366', fontFamily: "'JetBrains Mono', monospace", overflow: 'hidden', textOverflow: 'ellipsis' }}>ID: {order.paymentMethod.transactionId}</div>
                        <button
                            onClick={handleCopyId}
                            style={{ background: 'transparent', border: 'none', color: copied ? '#30D158' : '#636366', cursor: 'pointer', padding: '2px' }}
                        >
                            {copied ? <Check size={12} /> : <Copy size={12} />}
                        </button>
                    </div>
                )}

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '14px', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#636366' }}>Ödenen Tutar</span>
                    <span style={{ fontSize: '16px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums' }}>{formatPrice(order.total)}</span>
                </div>

                <button
                    onClick={onRefund}
                    style={{
                        width: '100%', marginTop: '14px', background: 'transparent', border: '1px solid rgba(255,69,58,0.2)',
                        borderRadius: '6px', padding: '8px', fontSize: '12px', color: '#FF453A', cursor: 'pointer',
                        transition: 'all 150ms', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,69,58,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                    <RotateCcw size={14} /> İade İşlemlerini Başlat
                </button>
            </div>
        </div>
    );
}

// ── Refund Modal ───────────────────────────────────────────────────────────
function RefundModal({ isOpen, onClose, orderTotal, onConfirm }: { isOpen: boolean; onClose: () => void; orderTotal: number; onConfirm: (amt: number, note: string) => void }) {
    const [amount, setAmount] = useState(orderTotal);
    const [note, setNote] = useState('');

    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }} />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                style={{ position: 'relative', background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '28px', maxWidth: '400px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
            >
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 500, color: '#F5F0EB', margin: '0 0 8px' }}>İade İşlemi</h2>
                <p style={{ fontSize: '13px', color: '#AEAEB2', margin: '0 0 20px' }}>{formatPrice(orderTotal)} tutarındaki bu sipariş için iade miktarını belirleyin.</p>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '11px', color: '#636366', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>İade Miktarı</label>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#F5F0EB', fontSize: '14px', fontWeight: 600 }}>₺</span>
                        <input
                            type="number" value={amount} onChange={e => setAmount(Math.min(orderTotal, Number(e.target.value)))}
                            style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '10px 12px 10px 28px', fontSize: '14px', color: '#F5F0EB', fontWeight: 600, outline: 'none' }}
                        />
                        <button onClick={() => setAmount(orderTotal)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#C9A96E', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>TAM İADE</button>
                    </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontSize: '11px', color: '#636366', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>İade Nedeni</label>
                    <textarea
                        value={note} onChange={e => setNote(e.target.value)} placeholder="Müşteriye de iletilecek neden..."
                        style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: '#F5F0EB', outline: 'none', minHeight: '80px', resize: 'none' }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button onClick={onClose} style={{ padding: '12px', borderRadius: '6px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#AEAEB2', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Vazgeç</button>
                    <button onClick={() => onConfirm(amount, note)} style={{ padding: '12px', borderRadius: '6px', background: '#FF453A', border: 'none', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>İadeyi Onayla</button>
                </div>
            </motion.div>
        </div>
    );
}

// ── Main Page Component ────────────────────────────────────────────────────
export default function SiparisDetayPage() {
    const params = useParams();
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

    useEffect(() => {
        if (!params.id) return;

        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/admin/orders/${params.id}`);
                if (!res.ok) throw new Error('Sipariş bulunamadı');
                const data = await res.json();
                setOrder(mapDbOrder(data));
            } catch (err) {
                console.error(err);
                router.push('/admin/siparisler');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [params.id, router]);

    if (isLoading) {
        return (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
                <Loader2 size={32} color="#C9A96E" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
                <p style={{ color: '#636366', fontSize: '14px' }}>Sipariş detayları yükleniyor...</p>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (!order) return null;

    const handleStatusUpdate = async (newStatus: OrderStatus, note: string) => {
        // Optimistic update
        const newEvent: TimelineEvent = {
            id: Math.random().toString(36).substr(2, 9),
            status: newStatus,
            description: `Sipariş durumu ${newStatus} olarak güncellendi.`,
            createdBy: 'Admin',
            createdAt: new Date().toISOString(),
            note: note || null
        };

        setOrder(prev => {
            if (!prev) return null;
            return {
                ...prev,
                status: newStatus,
                timeline: [newEvent, ...prev.timeline],
                updatedAt: new Date().toISOString()
            };
        });

        // Simulate API delay
        await new Promise(r => setTimeout(r, 800));
    };

    const handleRefundConfirm = async (amt: number, note: string) => {
        await handleStatusUpdate('İade Talebi', `İade tutarı: ${formatPrice(amt)}. Neden: ${note}`);
        setIsRefundModalOpen(false);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: easeOut }}>
            {/* Back Button */}
            <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#636366', fontSize: '13px', background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>
                <ArrowLeft size={16} /> Siparişler Listesine Dön
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-6 items-start">

                {/* Left Column */}
                <div className="flex flex-col gap-6">
                    <OrderDetail order={order} onUpdateOrder={setOrder} />
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-4">
                    <OrderActions order={order} onStatusUpdate={handleStatusUpdate} />
                    <CustomerCard customer={order.customer} />
                    <OrderTimeline events={order.timeline} />
                    <PaymentCard order={order} onRefund={() => setIsRefundModalOpen(true)} />
                </div>
            </div>

            <AnimatePresence>
                {isRefundModalOpen && (
                    <RefundModal
                        isOpen={isRefundModalOpen}
                        onClose={() => setIsRefundModalOpen(false)}
                        orderTotal={order.total}
                        onConfirm={handleRefundConfirm}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}

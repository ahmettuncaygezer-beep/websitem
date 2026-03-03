'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MoreVertical } from 'lucide-react';

export function RecentOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch('/api/admin/dashboard');
                const data = await res.json();
                if (data.recentOrders) {
                    setOrders(data.recentOrders);
                }
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center', color: '#636366', background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '20px' }}>
                Siparişler yükleniyor...
            </div>
        );
    }

    return (
        <div
            style={{
                background: '#1C1C1E',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '20px',
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: '18px 20px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>
                    Son Siparişler
                </h2>
                <Link
                    href="/admin/siparisler"
                    style={{ fontSize: '12px', color: '#C9A96E', textDecoration: 'none' }}
                >
                    Tüm Siparişler →
                </Link>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                {orders.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#636366' }}>
                        Henüz sipariş bulunmuyor.
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                {['Sipariş No', 'Müşteri', 'Ürün', 'Tutar', 'Ödeme', 'Durum', 'Tarih', ''].map((h, i) => (
                                    <th key={i} scope="col" style={{ padding: '10px 20px', textAlign: 'left', fontSize: '10px', fontWeight: 500, color: '#636366', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, idx) => {
                                const isLast = idx === orders.length - 1;
                                const customerName = order.profiles
                                    ? `${order.profiles.first_name || ''} ${order.profiles.last_name || ''}`.trim() || 'Müşteri'
                                    : 'Misafir';
                                const initials = order.profiles
                                    ? `${(order.profiles.first_name || 'M')[0]}${(order.profiles.last_name || 'S')[0]}`.toUpperCase()
                                    : 'M';

                                return (
                                    <tr
                                        key={order.id}
                                        style={{
                                            borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)',
                                            cursor: 'pointer',
                                            transition: 'background 100ms',
                                        }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.02)'; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'; }}
                                    >
                                        <td style={{ padding: '12px 20px', fontSize: '12px', color: '#C9A96E', fontWeight: 600, whiteSpace: 'nowrap' }}>
                                            #{order.order_number}
                                        </td>
                                        <td style={{ padding: '12px 20px', whiteSpace: 'nowrap' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(201,169,110,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 600, color: '#C9A96E', flexShrink: 0 }}>
                                                    {initials}
                                                </div>
                                                <span style={{ fontSize: '12px', color: '#F5F0EB', fontWeight: 500 }}>{customerName}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '12px 20px', fontSize: '12px', color: '#AEAEB2', whiteSpace: 'nowrap' }}>Sipariş Detayı</td>
                                        <td style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>₺{Number(order.total_amount).toLocaleString('tr-TR')}</td>
                                        <td style={{ padding: '12px 20px', fontSize: '11px', color: '#636366', whiteSpace: 'nowrap' }}>Kredi Kartı</td>
                                        <td style={{ padding: '12px 20px', whiteSpace: 'nowrap' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '20px', background: 'rgba(48, 209, 88, 0.1)', color: '#30D158', whiteSpace: 'nowrap' }}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 20px', fontSize: '11px', color: '#636366', whiteSpace: 'nowrap' }}>{new Date(order.created_at).toLocaleDateString('tr-TR')}</td>
                                        <td style={{ padding: '12px 20px', position: 'relative' }}>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenMenu(openMenu === order.id ? null : order.id);
                                                }}
                                                aria-label="İşlemler"
                                                style={{ background: 'transparent', border: 'none', color: '#636366', cursor: 'pointer', padding: '4px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 150ms' }}
                                                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#F5F0EB')}
                                                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#636366')}
                                            >
                                                <MoreVertical size={15} />
                                            </button>
                                            <AnimatePresence>
                                                {openMenu === order.id && (
                                                    <>
                                                        <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setOpenMenu(null)} />
                                                        <motion.div initial={{ opacity: 0, y: 6, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.95 }} transition={{ duration: 0.13 }} style={{ position: 'absolute', right: '16px', top: '40px', background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', boxShadow: '0 16px 40px rgba(0,0,0,0.5)', zIndex: 20, minWidth: '160px' }} role="menu">
                                                            {['Detayı Gör', 'Fatura İndir'].map((item) => (
                                                                <button key={item} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 16px', fontSize: '13px', color: '#AEAEB2', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'background 100ms, color 100ms' }} onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLButtonElement).style.color = '#F5F0EB'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2'; }}>{item}</button>
                                                            ))}
                                                        </motion.div>
                                                    </>
                                                )}
                                            </AnimatePresence>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

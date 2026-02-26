'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MoreVertical } from 'lucide-react';
import { mockRecentOrders } from '@/lib/mock/orders';
import { type Order, STATUS_CONFIG, formatDate, formatPrice } from '@/lib/mock/orders';

export function RecentOrders() {
    const [openMenu, setOpenMenu] = useState<string | null>(null);

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
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr
                            style={{
                                borderBottom: '1px solid rgba(255,255,255,0.04)',
                            }}
                        >
                            {['Sipariş No', 'Müşteri', 'Ürün', 'Tutar', 'Ödeme', 'Durum', 'Tarih', ''].map(
                                (h, i) => (
                                    <th
                                        key={i}
                                        scope="col"
                                        style={{
                                            padding: '10px 20px',
                                            textAlign: 'left',
                                            fontSize: '10px',
                                            fontWeight: 500,
                                            color: '#636366',
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {h}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {mockRecentOrders.map((order: Order, idx) => {
                            const st = STATUS_CONFIG[order.status];
                            const isLast = idx === mockRecentOrders.length - 1;
                            return (
                                <tr
                                    key={order.id}
                                    style={{
                                        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)',
                                        cursor: 'pointer',
                                        transition: 'background 100ms',
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.02)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLTableRowElement).style.background = 'transparent';
                                    }}
                                >
                                    {/* Order No */}
                                    <td style={{ padding: '12px 20px', fontSize: '12px', color: '#C9A96E', fontWeight: 600, whiteSpace: 'nowrap' }}>
                                        {order.orderNo}
                                    </td>

                                    {/* Customer */}
                                    <td style={{ padding: '12px 20px', whiteSpace: 'nowrap' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div
                                                style={{
                                                    width: '26px', height: '26px', borderRadius: '50%',
                                                    background: 'rgba(201,169,110,0.12)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '10px', fontWeight: 600, color: '#C9A96E', flexShrink: 0,
                                                }}
                                                aria-hidden="true"
                                            >
                                                {order.customer.avatar}
                                            </div>
                                            <span style={{ fontSize: '12px', color: '#F5F0EB', fontWeight: 500 }}>
                                                {order.customer.name}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Product */}
                                    <td style={{ padding: '12px 20px', fontSize: '12px', color: '#AEAEB2', whiteSpace: 'nowrap' }}>
                                        {order.items[0].productName}
                                    </td>

                                    {/* Amount */}
                                    <td style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                                        {formatPrice(order.total)}
                                    </td>

                                    {/* Payment */}
                                    <td style={{ padding: '12px 20px', fontSize: '11px', color: '#636366', whiteSpace: 'nowrap' }}>
                                        {order.paymentMethod.type}
                                    </td>

                                    {/* Status badge */}
                                    <td style={{ padding: '12px 20px', whiteSpace: 'nowrap' }}>
                                        <span
                                            style={{
                                                fontSize: '11px', fontWeight: 500,
                                                padding: '3px 10px', borderRadius: '20px',
                                                background: st.bg, color: st.color,
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    {/* Date */}
                                    <td style={{ padding: '12px 20px', fontSize: '11px', color: '#636366', whiteSpace: 'nowrap' }}>
                                        {formatDate(order.createdAt).date}
                                    </td>

                                    {/* Actions */}
                                    <td style={{ padding: '12px 20px', position: 'relative' }}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenu(openMenu === order.id ? null : order.id);
                                            }}
                                            aria-label="İşlemler"
                                            style={{
                                                background: 'transparent', border: 'none',
                                                color: '#636366', cursor: 'pointer',
                                                padding: '4px', borderRadius: '4px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                transition: 'color 150ms',
                                            }}
                                            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#F5F0EB')}
                                            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#636366')}
                                        >
                                            <MoreVertical size={15} />
                                        </button>

                                        <AnimatePresence>
                                            {openMenu === order.id && (
                                                <>
                                                    <div
                                                        style={{ position: 'fixed', inset: 0, zIndex: 10 }}
                                                        onClick={() => setOpenMenu(null)}
                                                        aria-hidden="true"
                                                    />
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                                                        transition={{ duration: 0.13 }}
                                                        style={{
                                                            position: 'absolute', right: '16px', top: '40px',
                                                            background: '#1C1C1E',
                                                            border: '1px solid rgba(255,255,255,0.08)',
                                                            borderRadius: '8px',
                                                            boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                                                            zIndex: 20, minWidth: '160px',
                                                        }}
                                                        role="menu"
                                                    >
                                                        {['Detayı Gör', 'Fatura İndir'].map((item) => (
                                                            <button
                                                                key={item}
                                                                role="menuitem"
                                                                style={{
                                                                    display: 'block', width: '100%', textAlign: 'left',
                                                                    padding: '9px 16px', fontSize: '13px', color: '#AEAEB2',
                                                                    background: 'transparent', border: 'none', cursor: 'pointer',
                                                                    transition: 'background 100ms, color 100ms',
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
                                                                    (e.currentTarget as HTMLButtonElement).style.color = '#F5F0EB';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                                                                    (e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2';
                                                                }}
                                                            >
                                                                {item}
                                                            </button>
                                                        ))}
                                                        <button
                                                            role="menuitem"
                                                            style={{
                                                                display: 'block', width: '100%', textAlign: 'left',
                                                                padding: '9px 16px', fontSize: '13px', color: '#AEAEB2',
                                                                background: 'transparent', border: 'none', cursor: 'pointer',
                                                                transition: 'background 100ms, color 100ms',
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,69,58,0.05)';
                                                                (e.currentTarget as HTMLButtonElement).style.color = '#FF453A';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                                                                (e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2';
                                                            }}
                                                        >
                                                            İptal Et
                                                        </button>
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
            </div>
        </div>
    );
}

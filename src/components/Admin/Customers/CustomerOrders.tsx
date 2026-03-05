'use client';

import React from 'react';
import Link from 'next/link';
import { Package, ChevronRight, Inbox } from 'lucide-react';
import { type CustomerOrderSummary, formatPrice } from '@/types/admin/customers';

interface CustomerOrdersProps {
    orders: CustomerOrderSummary[];
}

export function CustomerOrders({ orders }: CustomerOrdersProps) {
    if (orders.length === 0) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px', color: '#636366' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(201,169,110,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'rgba(201,169,110,0.2)' }}>
                    <Inbox size={32} />
                </div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#AEAEB2' }}>Henüz sipariş yok</div>
                <div style={{ fontSize: '12px', marginTop: '4px' }}>Müşteri ilk siparişini verdiğinde burada görünecek.</div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {orders.map((order, idx) => {
                const isLast = idx === orders.length - 1;
                const statusColors: Record<string, string> = {
                    'Teslim Edildi': '#30D158',
                    'Hazırlanıyor': '#C9A96E',
                    'Kargoda': '#0A84FF',
                    'İptal': '#FF453A',
                };

                return (
                    <Link
                        key={order.id}
                        href={`/admin/siparisler/${order.id}`}
                        style={{
                            padding: '16px 20px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)',
                            display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', transition: 'background 150ms'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        {/* Status Dot */}
                        <div style={{
                            width: '8px', height: '8px', borderRadius: '50%',
                            background: statusColors[order.status] || '#636366', flexShrink: 0
                        }} />

                        {/* Order No */}
                        <div style={{
                            fontSize: '13px', fontWeight: 600, color: '#C9A96E',
                            fontFamily: "'JetBrains Mono', monospace", width: '80px', flexShrink: 0
                        }}>
                            {order.orderNo}
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '13px', color: '#AEAEB2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {order.productCount} Ürün · {order.status}
                            </div>
                        </div>

                        {/* Price & Date */}
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums' }}>
                                {formatPrice(order.total)}
                            </div>
                            <div style={{ fontSize: '11px', color: '#636366', marginTop: '2px' }}>
                                {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                            </div>
                        </div>

                        <ChevronRight size={14} color="#636366" />
                    </Link>
                );
            })}
        </div>
    );
}

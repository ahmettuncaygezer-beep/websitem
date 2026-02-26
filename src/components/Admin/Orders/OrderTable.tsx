'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, CreditCard, Building2, Banknote } from 'lucide-react';
import {
    type Order,
    STATUS_CONFIG,
    AVATAR_COLORS,
    getAvatarColor,
    formatPrice,
    formatDate,
} from '@/lib/mock/orders';

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

function StatusBadge({ status }: { status: Order['status'] }) {
    const cfg = STATUS_CONFIG[status];
    return (
        <span style={{ background: cfg.bg, color: cfg.color, fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '20px', whiteSpace: 'nowrap', display: 'inline-block' }}>
            {status}
        </span>
    );
}

function Avatar({ name, isVip, size = 32 }: { name: string; isVip: boolean; size?: number }) {
    const gradient = getAvatarColor(name);
    const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
    return (
        <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
            <div style={{ width: size, height: size, borderRadius: '50%', background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size / 2.8, fontWeight: 600, color: '#0F0F10' }}>
                {initials}
            </div>
            {isVip && (
                <div style={{ position: 'absolute', bottom: -1, right: -1, width: 14, height: 14, background: '#C9A96E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#0F0F10', border: '1.5px solid #1C1C1E', zIndex: 1 }}>
                    ★
                </div>
            )}
        </div>
    );
}

function PaymentIcon({ type }: { type: string }) {
    if (type.toLowerCase().includes('kredi') || type.toLowerCase().includes('kart')) return <CreditCard size={12} style={{ color: '#636366' }} />;
    if (type.toLowerCase().includes('havale') || type.toLowerCase().includes('eft')) return <Building2 size={12} style={{ color: '#636366' }} />;
    return <Banknote size={12} style={{ color: '#636366' }} />;
}

interface ActionDropdownProps {
    orderId: string;
}
function ActionDropdown({ orderId }: ActionDropdownProps) {
    const [open, setOpen] = useState(false);
    const actions = ['Fatura İndir', 'Kargo Güncelle', 'İptal Et', 'İade İşle'];
    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
                style={{ width: '28px', height: '28px', borderRadius: '4px', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: '#636366', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 150ms' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#636366'; }}
                aria-label="Daha fazla"
                aria-haspopup="true"
                aria-expanded={open}
            >
                <MoreHorizontal size={14} />
            </button>
            <AnimatePresence>
                {open && (
                    <>
                        <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.1, ease: easeOut }}
                            style={{ position: 'absolute', right: 0, top: 'calc(100% + 4px)', background: '#242426', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', minWidth: '140px', zIndex: 20, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
                            role="menu"
                        >
                            {actions.map((action) => (
                                <button key={action}
                                    onClick={(e) => { e.stopPropagation(); console.log(action, orderId); setOpen(false); }}
                                    style={{ width: '100%', padding: '9px 14px', background: 'transparent', border: 'none', fontSize: '12px', color: action === 'İptal Et' || action === 'İade İşle' ? '#FF453A' : '#AEAEB2', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, system-ui, sans-serif', transition: 'background 100ms' }}
                                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)')}
                                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
                                    role="menuitem"
                                >
                                    {action}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

interface OrderTableProps {
    orders: Order[];
    currentPage: number;
    perPage: number;
    totalCount: number;
    onPageChange: (p: number) => void;
}

export function OrderTable({ orders, currentPage, perPage, totalCount, onPageChange }: OrderTableProps) {
    const router = useRouter();
    const totalPages = Math.ceil(totalCount / perPage);

    const thStyle: React.CSSProperties = {
        padding: '11px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 500, color: '#636366',
        letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.04)',
        whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.02)',
    };

    return (
        <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            {['Sipariş No', 'Müşteri', 'Ürünler', 'Tutar', 'Ödeme', 'Durum', 'Kargo', 'Tarih', 'İşlemler'].map((h) => (
                                <th key={h} style={thStyle}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, idx) => {
                            const { date, time } = formatDate(order.createdAt);
                            const isLast = idx === orders.length - 1;
                            return (
                                <tr
                                    key={order.id}
                                    onClick={() => router.push(`/admin/siparisler/${order.id}`)}
                                    style={{ cursor: 'pointer', transition: 'background 100ms' }}
                                    onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.02)')}
                                    onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = 'transparent')}
                                >
                                    {/* Order no */}
                                    <td style={{ padding: '14px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)', fontSize: '13px', color: '#C9A96E', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                                        {order.orderNo}
                                    </td>

                                    {/* Customer */}
                                    <td style={{ padding: '14px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Avatar name={order.customer.name} isVip={order.customer.isVip} />
                                            <div>
                                                <div style={{ fontSize: '13px', fontWeight: 500, color: '#F5F0EB', whiteSpace: 'nowrap' }}>{order.customer.name}</div>
                                                <div style={{ fontSize: '11px', color: '#636366' }}>{order.customer.email}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Products */}
                                    <td style={{ padding: '14px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            {order.items.slice(0, 2).map((item, i) => (
                                                <div key={item.id} style={{ position: 'relative', width: '32px', height: '32px', borderRadius: '4px', background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>
                                                    {item.image}
                                                    {i === 1 && order.items.length > 2 && (
                                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,20,22,0.75)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#AEAEB2', fontWeight: 600 }}>
                                                            +{order.items.length - 2}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            <span style={{ fontSize: '12px', color: '#AEAEB2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>
                                                {order.items[0].productName}
                                                {order.items.length > 1 && ` +${order.items.length - 1}`}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Total */}
                                    <td style={{ padding: '14px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)', fontSize: '13px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                                        {formatPrice(order.total)}
                                    </td>

                                    {/* Payment */}
                                    <td style={{ padding: '14px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#636366', whiteSpace: 'nowrap' }}>
                                            <PaymentIcon type={order.paymentMethod.type} />
                                            {order.paymentMethod.type}
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td style={{ padding: '14px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)' }}>
                                        <StatusBadge status={order.status} />
                                    </td>

                                    {/* Cargo */}
                                    <td style={{ padding: '14px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)' }}>
                                        {order.cargoCompany ? (
                                            <div>
                                                <div style={{ fontSize: '12px', color: '#AEAEB2', whiteSpace: 'nowrap' }}>{order.cargoCompany}</div>
                                                {order.trackingNumber && (
                                                    <button
                                                        onClick={(e) => e.stopPropagation()}
                                                        style={{ fontSize: '11px', color: '#0A84FF', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'Inter, system-ui, sans-serif' }}
                                                    >
                                                        Takip Et
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <span style={{ fontSize: '12px', color: '#636366' }}>—</span>
                                        )}
                                    </td>

                                    {/* Date */}
                                    <td style={{ padding: '14px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)' }}>
                                        <div style={{ fontSize: '11px', color: '#636366' }}>{date}</div>
                                        <div style={{ fontSize: '11px', color: '#636366', opacity: 0.7 }}>{time}</div>
                                    </td>

                                    {/* Actions */}
                                    <td style={{ padding: '14px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); router.push(`/admin/siparisler/${order.id}`); }}
                                                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '5px', padding: '5px 12px', fontSize: '11px', color: '#AEAEB2', cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', transition: 'all 150ms', whiteSpace: 'nowrap' }}
                                                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.color = '#F5F0EB'; }}
                                                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2'; }}
                                            >
                                                Detay
                                            </button>
                                            <ActionDropdown orderId={order.id} />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: '#636366', fontVariantNumeric: 'tabular-nums' }}>
                        {totalCount} sipariş, {currentPage}/{totalPages} sayfa
                    </span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button key={p} onClick={() => onPageChange(p)}
                                style={{ width: '28px', height: '28px', borderRadius: '4px', background: p === currentPage ? '#C9A96E' : 'rgba(255,255,255,0.04)', border: `1px solid ${p === currentPage ? '#C9A96E' : 'rgba(255,255,255,0.08)'}`, fontSize: '12px', color: p === currentPage ? '#0F0F10' : '#AEAEB2', cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: p === currentPage ? 600 : 400, transition: 'all 150ms' }}
                            >{p}</button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

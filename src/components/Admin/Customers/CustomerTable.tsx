'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Star, Shield, AlertTriangle, ChevronUp, ChevronDown, ChevronsUpDown, Mail, Phone, ExternalLink } from 'lucide-react';
import {
    type Customer,
    type CustomerSegment,
    SEGMENT_CONFIG,
    getAvatarColor,
    getAvatarTextColor,
    formatPrice
} from '@/lib/mock/customers';

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

// ── Segment Icon Component ──────────────────────────────────────────────────
function SegmentIcon({ segment, size = 12 }: { segment: CustomerSegment, size?: number }) {
    if (segment === 'VIP') return <Star size={size} fill="currentColor" />;
    if (segment === 'Sadık') return <Shield size={size} fill="currentColor" />;
    if (segment === 'Risk') return <AlertTriangle size={size} fill="currentColor" />;
    return null;
}

// ── Action Dropdown ───────────────────────────────────────────────────────
function ActionDropdown({ customerId }: { customerId: string }) {
    const [open, setOpen] = useState(false);
    const actions = ['Sipariş Geçmişi', 'E-posta Gönder', 'Pasife Al', 'Sil'];

    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                style={{
                    width: '28px', height: '28px', borderRadius: '4px', background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.08)', color: '#636366', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
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
                            style={{
                                position: 'absolute', right: 0, top: 'calc(100% + 4px)', background: '#242426',
                                border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', minWidth: '150px',
                                zIndex: 20, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
                            }}
                        >
                            {actions.map((action) => (
                                <button
                                    key={action}
                                    onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                                    style={{
                                        width: '100%', padding: '9px 14px', background: 'transparent', border: 'none',
                                        fontSize: '12px', color: action === 'Sil' || action === 'Pasife Al' ? '#FF453A' : '#AEAEB2',
                                        cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
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

interface CustomerTableProps {
    customers: Customer[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    onSort: (key: string) => void;
    currentPage: number;
    perPage: number;
    totalCount: number;
    onPageChange: (p: number) => void;
}

export function CustomerTable({
    customers, sortBy, sortOrder, onSort,
    currentPage, perPage, totalCount, onPageChange
}: CustomerTableProps) {
    const router = useRouter();
    const totalPages = Math.ceil(totalCount / perPage);

    const SortIcon = ({ col }: { col: string }) => {
        if (sortBy !== col) return <ChevronsUpDown size={12} style={{ color: '#636366', marginLeft: '6px' }} />;
        return sortOrder === 'asc' ? <ChevronUp size={12} style={{ color: '#C9A96E', marginLeft: '6px' }} /> : <ChevronDown size={12} style={{ color: '#C9A96E', marginLeft: '6px' }} />;
    };

    const thStyle: React.CSSProperties = {
        padding: '11px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 500, color: '#636366',
        letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.04)',
        background: 'rgba(255,255,255,0.02)', whiteSpace: 'nowrap'
    };

    return (
        <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Müşteri</th>
                            <th style={thStyle}>E-posta</th>
                            <th style={thStyle}>Telefon</th>
                            <th style={{ ...thStyle, cursor: 'pointer' }} onClick={() => onSort('totalOrders')}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>Sipariş <SortIcon col="totalOrders" /></div>
                            </th>
                            <th style={{ ...thStyle, cursor: 'pointer' }} onClick={() => onSort('totalSpent')}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>Harcama <SortIcon col="totalSpent" /></div>
                            </th>
                            <th style={thStyle}>Son Sipariş</th>
                            <th style={thStyle}>Kayıt</th>
                            <th style={{ ...thStyle, textAlign: 'right' }}>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, idx) => {
                            const isVip = customer.segment === 'VIP';
                            const lastOrderDays = customer.lastOrderAt ? Math.floor((new Date().getTime() - new Date(customer.lastOrderAt).getTime()) / (1000 * 60 * 60 * 24)) : null;
                            const isStale = lastOrderDays && lastOrderDays > 90;
                            const isWhale = customer.totalSpent > 1000000;
                            const isHigh = customer.totalSpent > 500000;
                            const isLast = idx === customers.length - 1;

                            return (
                                <tr
                                    key={customer.id}
                                    onClick={() => router.push(`/admin/musteriler/${customer.id}`)}
                                    style={{
                                        cursor: 'pointer', transition: 'all 150ms', position: 'relative',
                                        background: isVip ? 'rgba(201,169,110,0.02)' : 'transparent'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = isVip ? 'rgba(201,169,110,0.04)' : 'rgba(255,255,255,0.02)'}
                                    onMouseLeave={e => e.currentTarget.style.background = isVip ? 'rgba(201,169,110,0.02)' : 'transparent'}
                                >
                                    {/* VIP indicator */}
                                    {isVip && (
                                        <td style={{ padding: 0, width: 0 }}>
                                            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: '#C9A96E' }} />
                                        </td>
                                    )}

                                    {/* Customer Info */}
                                    <td style={{ padding: '13px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ position: 'relative', width: '36px', height: '36px' }}>
                                                <div style={{
                                                    width: '100%', height: '100%', borderRadius: '50%', background: getAvatarColor(customer.segment),
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600,
                                                    color: getAvatarTextColor(customer.segment)
                                                }}>
                                                    {customer.avatar}
                                                </div>
                                                <div style={{
                                                    position: 'absolute', bottom: -2, right: -2, width: '16px', height: '16px', borderRadius: '50%',
                                                    background: isVip ? '#C9A96E' : (customer.segment === 'Sadık' ? '#30D158' : (customer.segment === 'Risk' ? '#FF453A' : '#AEAEB2')),
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: isVip || customer.segment === 'Normal' ? '#0F0F10' : '#FFF',
                                                    border: '2px solid #1C1C1E', zIndex: 1
                                                }}>
                                                    <SegmentIcon segment={customer.segment} size={8} />
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '13px', fontWeight: 500, color: '#F5F0EB' }}>{customer.firstName} {customer.lastName}</div>
                                                <div style={{ fontSize: '11px', color: SEGMENT_CONFIG[customer.segment].color }}>{SEGMENT_CONFIG[customer.segment].label}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Email */}
                                    <td style={{ padding: '13px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)', fontSize: '12px', color: '#AEAEB2', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {customer.email}
                                    </td>

                                    {/* Phone */}
                                    <td style={{ padding: '13px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)', fontSize: '12px', color: '#636366', fontFamily: "'JetBrains Mono', monospace" }}>
                                        {customer.phone}
                                    </td>

                                    {/* Orders */}
                                    <td style={{ padding: '13px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)', fontSize: '13px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums', textAlign: 'center' }}>
                                        {customer.totalOrders}
                                    </td>

                                    {/* Spent */}
                                    <td style={{ padding: '13px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)', fontSize: '13px', fontWeight: 600, color: isWhale ? '#D4B87A' : (isHigh ? '#C9A96E' : '#F5F0EB'), fontVariantNumeric: 'tabular-nums', textShadow: isWhale ? '0 0 12px rgba(201,169,110,0.4)' : 'none' }}>
                                        {formatPrice(customer.totalSpent)}
                                    </td>

                                    {/* Last Order */}
                                    <td style={{ padding: '13px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)', fontSize: '11px', color: isStale ? '#FF453A' : '#636366' }}>
                                        {customer.lastOrderAt ? (
                                            <>
                                                {isStale && '⚠ '}
                                                {isStale ? `${lastOrderDays} gün önce` : new Date(customer.lastOrderAt).toLocaleDateString('tr-TR')}
                                            </>
                                        ) : '—'}
                                    </td>

                                    {/* Registered */}
                                    <td style={{ padding: '13px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)', fontSize: '11px', color: '#636366' }}>
                                        {new Date(customer.registeredAt).toLocaleDateString('tr-TR')}
                                    </td>

                                    {/* Actions */}
                                    <td style={{ padding: '13px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }} onClick={e => e.stopPropagation()}>
                                            <button
                                                onClick={() => router.push(`/admin/musteriler/${customer.id}`)}
                                                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '5px', padding: '5px 12px', fontSize: '11px', color: '#AEAEB2', cursor: 'pointer', transition: 'all 150ms' }}
                                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                            >
                                                Profil
                                            </button>
                                            <ActionDropdown customerId={customer.id} />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#636366' }}>
                    {perPage * (currentPage - 1) + 1}-{Math.min(perPage * currentPage, totalCount)} / {totalCount} müşteri
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button
                            key={p}
                            onClick={() => onPageChange(p)}
                            style={{
                                width: '30px', height: '30px', borderRadius: '4px', background: p === currentPage ? '#C9A96E' : 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)', fontSize: '12px', color: p === currentPage ? '#0F0F10' : '#AEAEB2',
                                cursor: 'pointer', fontWeight: p === currentPage ? 600 : 400
                            }}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

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
} from '@/types/admin/customers';

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

function CustomerCard({ customer, router }: { customer: Customer; router: any }) {
    const isVip = customer.segment === 'VIP';
    return (
        <div
            onClick={() => router.push(`/admin/musteriler/${customer.id}`)}
            className="p-4 border-b border-white/[0.04] bg-[#1C1C1E] active:bg-white/[0.02] transition-colors relative"
        >
            {isVip && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C9A96E]" />}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div style={{ position: 'relative', width: '40px', height: '40px' }}>
                        <div style={{
                            width: '100%', height: '100%', borderRadius: '50%', background: getAvatarColor(customer.segment),
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600,
                            color: getAvatarTextColor(customer.segment)
                        }}>
                            {customer.avatar}
                        </div>
                    </div>
                    <div>
                        <div className="text-[14px] font-medium text-[#F5F0EB]">
                            {customer.firstName} {customer.lastName}
                        </div>
                        <div className="text-[12px] text-[#636366] mt-0.5">{customer.email}</div>
                    </div>
                </div>
                <div style={{
                    fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px',
                    background: SEGMENT_CONFIG[customer.segment].bg, color: SEGMENT_CONFIG[customer.segment].color,
                    border: `1px solid ${SEGMENT_CONFIG[customer.segment].border}`
                }}>
                    {SEGMENT_CONFIG[customer.segment].label}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div>
                        <div className="text-[10px] text-[#636366] uppercase mb-0.5">Sipariş</div>
                        <div className="text-[13px] font-bold text-[#F5F0EB]">{customer.totalOrders}</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-[#636366] uppercase mb-0.5">Harcama</div>
                        <div className="text-[13px] font-bold text-[#C9A96E]">{formatPrice(customer.totalSpent)}</div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button className="p-2 text-[#AEAEB2] hover:text-[#C9A96E] transition-colors">
                        <Mail size={16} />
                    </button>
                    <ActionDropdown customerId={customer.id} />
                </div>
            </div>
        </div>
    );
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
        <div className="bg-[#1C1C1E] border border-white/[0.05] rounded-[8px] overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th style={thStyle}>Müşteri</th>
                            <th style={thStyle} className="hidden lg:table-cell">E-posta</th>
                            <th style={thStyle} className="hidden xl:table-cell">Telefon</th>
                            <th style={{ ...thStyle, cursor: 'pointer' }} onClick={() => onSort('totalOrders')}>
                                <div className="flex items-center">Sipariş <SortIcon col="totalOrders" /></div>
                            </th>
                            <th style={{ ...thStyle, cursor: 'pointer' }} onClick={() => onSort('totalSpent')}>
                                <div className="flex items-center">Harcama <SortIcon col="totalSpent" /></div>
                            </th>
                            <th style={thStyle} className="hidden lg:table-cell">Son Sipariş</th>
                            <th style={thStyle} className="hidden xl:table-cell">Kayıt</th>
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
                                    className={`cursor-pointer transition-all duration-150 relative hover:bg-white/[0.02] ${isVip ? 'bg-[#C9A96E]/[0.02]' : ''}`}
                                >
                                    {/* VIP indicator */}
                                    {isVip && (
                                        <td className="p-0 w-0">
                                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#C9A96E]" />
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
                                    <td className="px-4 py-3 border-b border-white/[0.03] text-[12px] text-[#AEAEB2] max-w-[180px] truncate hidden lg:table-cell">
                                        {customer.email}
                                    </td>

                                    {/* Phone */}
                                    <td className="px-4 py-3 border-b border-white/[0.03] text-[12px] text-[#636366] font-mono hidden xl:table-cell">
                                        {customer.phone}
                                    </td>

                                    {/* Orders */}
                                    <td style={{ padding: '13px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)', fontSize: '13px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums', textAlign: 'center' }}>
                                        {customer.totalOrders}
                                    </td>

                                    {/* Spent */}
                                    <td style={{ padding: '13px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)', fontSize: '13px', fontWeight: 600, color: isWhale ? '#D4B87A' : (isHigh ? '#C9A96E' : '#F5F0EB'), fontVariantNumeric: 'tabular-nums' }}>
                                        {formatPrice(customer.totalSpent)}
                                    </td>

                                    {/* Last Order */}
                                    <td className="px-4 py-3 border-b border-white/[0.03] text-[11px] hidden lg:table-cell" style={{ color: isStale ? '#FF453A' : '#636366' }}>
                                        {customer.lastOrderAt ? (
                                            <>
                                                {isStale && '⚠ '}
                                                {isStale ? `${lastOrderDays} gün önce` : new Date(customer.lastOrderAt).toLocaleDateString('tr-TR')}
                                            </>
                                        ) : '—'}
                                    </td>

                                    {/* Registered */}
                                    <td className="px-4 py-3 border-b border-white/[0.03] text-[11px] text-[#636366] hidden xl:table-cell">
                                        {new Date(customer.registeredAt).toLocaleDateString('tr-TR')}
                                    </td>

                                    {/* Actions */}
                                    <td style={{ padding: '13px 16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.03)', textAlign: 'right' }}>
                                        <div className="flex items-center gap-2 justify-end" onClick={e => e.stopPropagation()}>
                                            <button
                                                onClick={() => router.push(`/admin/musteriler/${customer.id}`)}
                                                className="bg-transparent border border-white/[0.1] rounded-[5px] px-3 py-1 text-[11px] text-[#AEAEB2] hover:bg-white/[0.06] transition-all"
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

            {/* Mobile View */}
            <div className="md:hidden divide-y divide-white/[0.04]">
                {customers.map((customer) => (
                    <CustomerCard key={customer.id} customer={customer} router={router} />
                ))}
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[12px] text-[#636366]">
                    {perPage * (currentPage - 1) + 1}-{Math.min(perPage * currentPage, totalCount)} / {totalCount} müşteri
                </span>
                <div className="flex gap-1.5 overflow-x-auto pb-2 sm:pb-0 max-w-full">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button
                            key={p}
                            onClick={() => onPageChange(p)}
                            className={`min-w-[32px] h-8 rounded-[4px] border border-white/[0.08] text-[12px] font-medium transition-all ${p === currentPage ? 'bg-[#C9A96E] text-[#0F0F10] border-[#C9A96E]' : 'bg-white/[0.04] text-[#AEAEB2] hover:bg-white/[0.08]'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Users, UserPlus, Zap, Crown, Search, Download,
    ChevronDown, Filter, SlidersHorizontal
} from 'lucide-react';
import { mockCustomers, type Customer, type CustomerSegment, type CustomerStatus } from '@/lib/mock/customers';
import { CustomerTable } from '@/components/Admin/Customers/CustomerTable';

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

interface KpiCardProps {
    value: string;
    label: string;
    icon: React.ReactNode;
    trend?: { val: string; positive: boolean; label: string };
    variant?: 'default' | 'vip';
}

function KpiCard({ value, label, icon, trend, variant = 'default' }: KpiCardProps) {
    const isVip = variant === 'vip';
    return (
        <div
            style={{
                background: isVip ? 'rgba(201,169,110,0.04)' : '#1C1C1E',
                border: isVip ? '1px solid rgba(201,169,110,0.12)' : '1px solid rgba(255,255,255,0.05)',
                borderRadius: '8px', padding: '16px 20px', transition: 'all 200ms', flex: 1, position: 'relative'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = isVip ? 'rgba(201,169,110,0.3)' : 'rgba(201,169,110,0.15)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = isVip ? 'rgba(201,169,110,0.12)' : '1px solid rgba(255,255,255,0.05)'}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: isVip ? 'rgba(201,169,110,0.15)' : 'rgba(201,169,110,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A96E'
                }}>
                    {icon}
                </div>
                <div>
                    <div style={{
                        fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 600,
                        color: '#F5F0EB', fontVariantNumeric: 'tabular-nums', lineHeight: 1
                    }}>{value}</div>
                    <div style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>{label}</div>
                </div>
            </div>
            {trend && (
                <div style={{ marginTop: '12px', fontSize: '11px', display: 'flex', gap: '4px' }}>
                    <span style={{ color: trend.positive ? '#30D158' : trend.label.includes('toplam') ? '#636366' : '#FF453A' }}>
                        {trend.val}
                    </span>
                    <span style={{ color: '#636366' }}>{trend.label}</span>
                </div>
            )}
        </div>
    );
}

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [segmentFilter, setSegmentFilter] = useState('Tümü');
    const [statusFilter, setStatusFilter] = useState('Tümü');
    const [sortBy, setSortBy] = useState('totalSpent');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 20;

    // Fetch from DB, fallback to mock
    useEffect(() => {
        async function fetchCustomers() {
            try {
                const res = await fetch('/api/admin/customers');
                const data = await res.json();
                if (data.customers && data.customers.length > 0) {
                    setCustomers(data.customers.map((c: any) => ({
                        ...mockCustomers[0], // Use as template for missing fields
                        id: c.id,
                        firstName: c.first_name || 'Anonim',
                        lastName: c.last_name || '',
                        email: c.email || '',
                        phone: c.phone || '',
                        avatar: ((c.first_name || 'A')[0] + (c.last_name || '')[0]).toUpperCase(),
                        segment: 'Normal' as CustomerSegment,
                        status: 'Aktif' as CustomerStatus,
                        totalOrders: c.total_orders || 0,
                        totalSpent: c.total_spent || 0,
                        averageOrderValue: c.total_orders ? Math.round((c.total_spent || 0) / c.total_orders) : 0,
                        registeredAt: c.created_at || new Date().toISOString(),
                        lastLoginAt: c.updated_at || new Date().toISOString(),
                    })));
                }
            } catch { /* keep mock */ }
            finally { setLoading(false); }
        }
        fetchCustomers();
    }, []);

    // Filter & Sort Logic
    const filteredCustomers = useMemo(() => {
        let result = [...customers];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(c =>
                (c.firstName + ' ' + c.lastName).toLowerCase().includes(q) ||
                c.email.toLowerCase().includes(q)
            );
        }

        if (segmentFilter !== 'Tümü') {
            result = result.filter(c => c.segment === segmentFilter);
        }

        if (statusFilter !== 'Tümü') {
            result = result.filter(c => c.status === statusFilter);
        }

        result.sort((a, b) => {
            let valA: any = a[sortBy as keyof Customer];
            let valB: any = b[sortBy as keyof Customer];

            if (sortBy === 'name') {
                valA = a.firstName + a.lastName;
                valB = b.firstName + b.lastName;
            }

            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return result;
    }, [customers, searchQuery, segmentFilter, statusFilter, sortBy, sortOrder]);

    const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * perPage, currentPage * perPage);

    const handleSort = (key: string) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(key);
            setSortOrder('desc');
        }
    };

    const handleExportCSV = () => {
        alert('Filtrelenmiş ' + filteredCustomers.length + ' müşteri CSV olarak dışa aktarılıyor...');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
        >
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 500, color: '#F5F0EB', margin: '0 0 4px' }}>
                    Müşteri Yönetimi
                </h1>
                <p style={{ fontSize: '13px', color: '#AEAEB2', margin: 0 }}>
                    Müşteri veritabanını, harcama alışkanlıklarını ve bağlılık metriklerini yönetin.
                </p>
            </div>

            {/* KPI Section */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <KpiCard value="1.247" label="Toplam Müşteri" icon={<Users size={20} />} />
                <KpiCard
                    value="89" label="Bu Ay Yeni" icon={<UserPlus size={20} />}
                    trend={{ val: '+12', positive: true, label: 'geçen aya göre' }}
                />
                <KpiCard
                    value="634" label="Aktif Son 30 Gün" icon={<Zap size={20} />}
                    trend={{ val: '%50.8', positive: true, label: 'toplam müşterinin' }}
                />
                <KpiCard
                    value="47" label="VIP Müşteri" icon={<Crown size={20} />} variant="vip"
                    trend={{ val: '4', positive: true, label: 'yeni VIP bu hafta' }}
                />
            </div>

            {/* Filters Section */}
            <div style={{
                background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px',
                padding: '16px 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap'
            }}>
                {/* Search */}
                <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#636366' }} />
                    <input
                        type="text"
                        placeholder="İsim veya e-posta ara..."
                        value={searchQuery}
                        onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        style={{
                            width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '6px', padding: '10px 12px 10px 36px', fontSize: '13px', color: '#F5F0EB', outline: 'none', transition: 'all 200ms'
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                    />
                </div>

                {/* Segment Select */}
                <div style={{ position: 'relative' }}>
                    <select
                        value={segmentFilter}
                        onChange={e => { setSegmentFilter(e.target.value); setCurrentPage(1); }}
                        style={{
                            appearance: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '6px', padding: '10px 36px 10px 12px', fontSize: '13px', color: '#F5F0EB', outline: 'none', cursor: 'pointer'
                        }}
                    >
                        <option value="Tümü">Tüm Segmentler</option>
                        <option value="VIP">VIP</option>
                        <option value="Sadık">Sadık</option>
                        <option value="Normal">Normal</option>
                        <option value="Risk">Risk</option>
                    </select>
                    <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#636366', pointerEvents: 'none' }} />
                </div>

                {/* Status Select */}
                <div style={{ position: 'relative' }}>
                    <select
                        value={statusFilter}
                        onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                        style={{
                            appearance: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '6px', padding: '10px 36px 10px 12px', fontSize: '13px', color: '#F5F0EB', outline: 'none', cursor: 'pointer'
                        }}
                    >
                        <option value="Tümü">Tüm Durumlar</option>
                        <option value="Aktif">Aktif</option>
                        <option value="Pasif">Pasif</option>
                    </select>
                    <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#636366', pointerEvents: 'none' }} />
                </div>

                {/* Sort Select */}
                <div style={{ position: 'relative' }}>
                    <select
                        value={sortBy}
                        onChange={e => handleSort(e.target.value)}
                        style={{
                            appearance: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '6px', padding: '10px 36px 10px 12px', fontSize: '13px', color: '#F5F0EB', outline: 'none', cursor: 'pointer'
                        }}
                    >
                        <option value="totalSpent">En Çok Harcayan</option>
                        <option value="totalOrders">En Çok Sipariş</option>
                        <option value="registeredAt">En Yeni Üye</option>
                        <option value="lastLoginAt">Son Aktif</option>
                    </select>
                    <SlidersHorizontal size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#636366', pointerEvents: 'none' }} />
                </div>

                {/* Export Button */}
                <button
                    onClick={handleExportCSV}
                    style={{
                        background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px',
                        padding: '10px 16px', fontSize: '12px', color: '#AEAEB2', cursor: 'pointer', transition: 'all 200ms',
                        display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                    <Download size={14} /> CSV Dışa Aktar
                </button>
            </div>

            <CustomerTable
                customers={paginatedCustomers}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
                currentPage={currentPage}
                perPage={perPage}
                totalCount={filteredCustomers.length}
                onPageChange={setCurrentPage}
            />
        </motion.div>
    );
}

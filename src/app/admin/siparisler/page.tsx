'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Calendar, Clock, AlertCircle } from 'lucide-react';
import { mockOrders } from '@/lib/mock/orders';
import type { Order } from '@/lib/mock/orders';
import { OrderFilters } from '@/components/Admin/Orders/OrderFilters';
import { OrderTable } from '@/components/Admin/Orders/OrderTable';
import type { OrderTab } from '@/components/Admin/Orders/OrderFilters';

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

interface KpiCardProps {
    value: string;
    label: string;
    icon: React.ReactNode;
    variant?: 'default' | 'danger';
}

function KpiCard({ value, label, icon, variant = 'default' }: KpiCardProps) {
    const isDanger = variant === 'danger';
    return (
        <div style={{
            background: '#1C1C1E',
            border: isDanger ? '1px solid rgba(255,69,58,0.15)' : '1px solid rgba(255,255,255,0.05)',
            borderRadius: '8px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 200ms', flex: 1
        }} onMouseEnter={e => e.currentTarget.style.borderColor = isDanger ? 'rgba(255,69,58,0.3)' : 'rgba(201,169,110,0.15)'} onMouseLeave={e => e.currentTarget.style.borderColor = isDanger ? 'rgba(255,69,58,0.15)' : 'rgba(255,255,255,0.05)'}>
            <div style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: isDanger ? 'rgba(255,69,58,0.12)' : 'rgba(201,169,110,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDanger ? '#FF453A' : '#C9A96E'
            }}>
                {icon}
            </div>
            <div>
                <div style={{
                    fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 600,
                    color: isDanger ? '#FF453A' : '#F5F0EB', fontVariantNumeric: 'tabular-nums', lineHeight: 1
                }}>{value}</div>
                <div style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>{label}</div>
            </div>
        </div>
    );
}

export default function SiparislerPage() {
    const [activeTab, setActiveTab] = useState<OrderTab>('Tümü');
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState<{ start: string | null; end: string | null }>({ start: null, end: null });
    const [paymentFilter, setPaymentFilter] = useState('Tümü');
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    // Filter logic
    const filteredOrders = useMemo(() => {
        let result = [...mockOrders];

        // Status Tab filtering
        if (activeTab !== 'Tümü') {
            const tabMappedStatuses: Record<string, string[]> = {
                'Bekliyor': ['Ödeme Bekleniyor', 'Ödeme Alındı'],
                'Hazırlanıyor': ['Hazırlanıyor'],
                'Kargoda': ['Kargoya Verildi'],
                'Tamamlandı': ['Teslim Edildi'],
                'İptal': ['İptal'],
                'İade': ['İade Talebi'],
            };
            result = result.filter(o => tabMappedStatuses[activeTab].includes(o.status));
        }

        // Search query
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(o =>
                o.orderNo.toLowerCase().includes(q) ||
                o.customer.name.toLowerCase().includes(q) ||
                o.customer.email.toLowerCase().includes(q)
            );
        }

        // Date range
        if (dateRange.start) {
            result = result.filter(o => new Date(o.createdAt) >= new Date(dateRange.start!));
        }
        if (dateRange.end) {
            result = result.filter(o => new Date(o.createdAt) <= new Date(dateRange.end + 'T23:59:59'));
        }

        // Payment method
        if (paymentFilter !== 'Tümü') {
            result = result.filter(o => o.paymentMethod.type.includes(paymentFilter));
        }

        return result;
    }, [activeTab, searchQuery, dateRange, paymentFilter]);

    const tabCounts = useMemo(() => {
        const counts: Partial<Record<OrderTab, number>> = { Tümü: mockOrders.length };
        const tabMappedStatuses: Record<string, string[]> = {
            'Bekliyor': ['Ödeme Bekleniyor', 'Ödeme Alındı'],
            'Hazırlanıyor': ['Hazırlanıyor'],
            'Kargoda': ['Kargoya Verildi'],
            'Tamamlandı': ['Teslim Edildi'],
            'İptal': ['İptal'],
            'İade': ['İade Talebi'],
        };

        Object.keys(tabMappedStatuses).forEach(tab => {
            counts[tab as OrderTab] = mockOrders.filter(o => tabMappedStatuses[tab].includes(o.status)).length;
        });

        return counts;
    }, []);

    const paginatedOrders = filteredOrders.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
        >
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '30px', fontWeight: 500, color: '#F5F0EB', margin: '0 0 4px' }}>
                    Siparişler
                </h1>
                <p style={{ fontSize: '13px', color: '#AEAEB2', margin: 0 }}>
                    Sipariş akışını ve teslimat süreçlerini yönetin
                </p>
            </div>

            {/* KPI Section */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <KpiCard value="12" label="BUGÜN" icon={<ShoppingBag size={20} />} />
                <KpiCard value="84" label="BU HAFTA" icon={<Calendar size={20} />} />
                <KpiCard value="341" label="BU AY" icon={<Clock size={20} />} />
                <KpiCard value="23" label="BEKLEYEN" icon={<AlertCircle size={20} />} variant="danger" />
            </div>

            <OrderFilters
                activeTab={activeTab}
                onTabChange={tab => { setActiveTab(tab); setCurrentPage(1); }}
                searchQuery={searchQuery}
                onSearchChange={q => { setSearchQuery(q); setCurrentPage(1); }}
                dateRange={dateRange}
                onDateRangeChange={r => { setDateRange(r); setCurrentPage(1); }}
                paymentFilter={paymentFilter}
                onPaymentFilterChange={f => { setPaymentFilter(f); setCurrentPage(1); }}
                tabCounts={tabCounts}
            />

            <OrderTable
                orders={paginatedOrders}
                currentPage={currentPage}
                perPage={perPage}
                totalCount={filteredOrders.length}
                onPageChange={setCurrentPage}
            />
        </motion.div>
    );
}

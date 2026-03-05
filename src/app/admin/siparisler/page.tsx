'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Calendar, Clock, AlertCircle } from 'lucide-react';
import ExportButton from '@/components/Admin/ExportButton';
import type { Order } from '@/types/admin/orders';
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

// Map DB order to admin Order type
function mapDbOrder(o: any): Order {
    return {
        id: o.id,
        orderNo: o.order_number || `#${o.id.slice(0, 4)}`,
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
        pending: 'Ödeme Bekleniyor',
        paid: 'Ödeme Alındı',
        processing: 'Hazırlanıyor',
        shipped: 'Kargoya Verildi',
        delivered: 'Teslim Edildi',
        cancelled: 'İptal',
        refund_requested: 'İade Talebi',
    };
    return map[s] || 'Ödeme Bekleniyor';
}

export default function SiparislerPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<OrderTab>('Tümü');
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState<{ start: string | null; end: string | null }>({ start: null, end: null });
    const [paymentFilter, setPaymentFilter] = useState('Tümü');
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    // Fetch from DB, fallback to mock
    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch('/api/admin/orders?perPage=500');
                const data = await res.json();
                if (data.orders && data.orders.length > 0) {
                    setOrders(data.orders.map(mapDbOrder));
                }
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    // Filter logic
    const filteredOrders = useMemo(() => {
        let result = [...orders];

        if (activeTab !== 'Tümü') {
            const tabMappedStatuses: Record<string, string[]> = {
                'Bekliyor': ['Ödeme Bekleniyor', 'Ödeme Alındı'],
                'Hazırlanıyor': ['Hazırlanıyor'],
                'Kargoda': ['Kargoya Verildi'],
                'Tamamlandı': ['Teslim Edildi'],
                'İptal': ['İptal'],
                'İade': ['İade Talebi'],
            };
            result = result.filter(o => tabMappedStatuses[activeTab]?.includes(o.status));
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(o =>
                o.orderNo.toLowerCase().includes(q) ||
                o.customer.name.toLowerCase().includes(q) ||
                o.customer.email.toLowerCase().includes(q)
            );
        }

        if (dateRange.start) result = result.filter(o => new Date(o.createdAt) >= new Date(dateRange.start!));
        if (dateRange.end) result = result.filter(o => new Date(o.createdAt) <= new Date(dateRange.end + 'T23:59:59'));
        if (paymentFilter !== 'Tümü') result = result.filter(o => o.paymentMethod.type.includes(paymentFilter));

        return result;
    }, [orders, activeTab, searchQuery, dateRange, paymentFilter]);

    const tabCounts = useMemo(() => {
        const counts: Partial<Record<OrderTab, number>> = { Tümü: orders.length };
        const mapping: Record<string, string[]> = {
            'Bekliyor': ['Ödeme Bekleniyor', 'Ödeme Alındı'],
            'Hazırlanıyor': ['Hazırlanıyor'],
            'Kargoda': ['Kargoya Verildi'],
            'Tamamlandı': ['Teslim Edildi'],
            'İptal': ['İptal'],
            'İade': ['İade Talebi'],
        };
        Object.keys(mapping).forEach(tab => {
            counts[tab as OrderTab] = orders.filter(o => mapping[tab].includes(o.status)).length;
        });
        return counts;
    }, [orders]);

    const paginatedOrders = filteredOrders.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
        >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                    <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '30px', fontWeight: 500, color: '#F5F0EB', margin: '0 0 4px' }}>
                        Siparişler
                    </h1>
                    <p style={{ fontSize: '13px', color: '#AEAEB2', margin: 0 }}>
                        {loading ? 'Yükleniyor...' : 'Sipariş akışını ve teslimat süreçlerini yönetin'}
                    </p>
                </div>
                <ExportButton type="orders" data={filteredOrders} />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
                <KpiCard value={String(orders.length)} label="TOPLAM" icon={<ShoppingBag size={20} />} />
                <KpiCard value={String(tabCounts['Kargoda'] || 0)} label="KARGODA" icon={<Calendar size={20} />} />
                <KpiCard value={String(tabCounts['Tamamlandı'] || 0)} label="TAMAMLANDI" icon={<Clock size={20} />} />
                <KpiCard value={String((tabCounts['Bekliyor'] || 0) + (tabCounts['Hazırlanıyor'] || 0))} label="BEKLEYEN" icon={<AlertCircle size={20} />} variant="danger" />
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

'use client';

import React from 'react';
import { Search } from 'lucide-react';
import type { OrderStatus } from '@/lib/mock/orders';

export type OrderTab = 'Tümü' | 'Bekliyor' | 'Hazırlanıyor' | 'Kargoda' | 'Tamamlandı' | 'İptal' | 'İade';

const TABS: { key: OrderTab; statuses: OrderStatus[] }[] = [
    { key: 'Tümü', statuses: [] },
    { key: 'Bekliyor', statuses: ['Ödeme Bekleniyor', 'Ödeme Alındı'] },
    { key: 'Hazırlanıyor', statuses: ['Hazırlanıyor'] },
    { key: 'Kargoda', statuses: ['Kargoya Verildi'] },
    { key: 'Tamamlandı', statuses: ['Teslim Edildi'] },
    { key: 'İptal', statuses: ['İptal'] },
    { key: 'İade', statuses: ['İade Talebi'] },
];

interface DateRange { start: string | null; end: string | null; }

interface OrderFiltersProps {
    activeTab: OrderTab;
    onTabChange: (tab: OrderTab) => void;
    searchQuery: string;
    onSearchChange: (v: string) => void;
    dateRange: DateRange;
    onDateRangeChange: (r: DateRange) => void;
    paymentFilter: string;
    onPaymentFilterChange: (v: string) => void;
    tabCounts: Partial<Record<OrderTab, number>>;
}

const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '8px 10px', fontSize: '12px', color: '#AEAEB2',
    fontFamily: 'Inter, system-ui, sans-serif', outline: 'none', transition: 'border-color 150ms',
    colorScheme: 'dark',
};

export function OrderFilters({
    activeTab, onTabChange,
    searchQuery, onSearchChange,
    dateRange, onDateRangeChange,
    paymentFilter, onPaymentFilterChange,
    tabCounts,
}: OrderFiltersProps) {
    return (
        <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '16px' }}>
            {/* Status tabs */}
            <div style={{ padding: '0 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', overflowX: 'auto' }}>
                {TABS.map(({ key }) => {
                    const active = activeTab === key;
                    const count = tabCounts[key] ?? 0;
                    return (
                        <button
                            key={key}
                            onClick={() => onTabChange(key)}
                            style={{
                                padding: '14px 0', marginRight: '24px', fontSize: '13px', cursor: 'pointer',
                                color: active ? '#F5F0EB' : '#636366', background: 'transparent', border: 'none',
                                borderBottom: `2px solid ${active ? '#C9A96E' : 'transparent'}`, whiteSpace: 'nowrap',
                                fontFamily: 'Inter, system-ui, sans-serif', transition: 'all 150ms', display: 'flex', alignItems: 'center', gap: '6px',
                            }}
                            onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2'; }}
                            onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = '#636366'; }}
                        >
                            {key}
                            <span style={{ fontSize: '11px', color: active ? '#C9A96E' : '#636366', fontVariantNumeric: 'tabular-nums' }}>
                                ({count})
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Filter bar */}
            <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {/* Search */}
                <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                    <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#636366', pointerEvents: 'none' }} />
                    <input
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Sipariş no veya müşteri adı..."
                        style={{ ...inputStyle, paddingLeft: '34px', width: '100%', boxSizing: 'border-box', fontSize: '13px' }}
                        onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                        onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)')}
                    />
                </div>

                {/* Date range */}
                <input
                    type="date"
                    value={dateRange.start ?? ''}
                    onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value || null })}
                    style={{ ...inputStyle, width: '130px' }}
                    onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                    onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)')}
                    aria-label="Başlangıç tarihi"
                />
                <input
                    type="date"
                    value={dateRange.end ?? ''}
                    onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value || null })}
                    style={{ ...inputStyle, width: '130px' }}
                    onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                    onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)')}
                    aria-label="Bitiş tarihi"
                />

                {/* Payment filter */}
                <select
                    value={paymentFilter}
                    onChange={(e) => onPaymentFilterChange(e.target.value)}
                    style={{
                        ...inputStyle, padding: '8px 30px 8px 12px',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%23636366' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
                        appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
                    }}
                >
                    <option value="Tümü">Tüm Ödemeler</option>
                    <option value="Kredi Kartı">Kredi Kartı</option>
                    <option value="Havale">Havale / EFT</option>
                    <option value="Kapıda">Kapıda Ödeme</option>
                </select>
            </div>
        </div>
    );
}

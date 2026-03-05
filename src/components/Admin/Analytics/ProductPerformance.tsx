'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, Star, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { type ProductPerformanceItem, formatCurrency } from '@/types/admin/analytics';

interface ProductPerformanceProps {
    data: ProductPerformanceItem[];
}

export function ProductPerformance({ data }: ProductPerformanceProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortKey, setSortKey] = useState<keyof ProductPerformanceItem>('revenue');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const handleSort = (key: keyof ProductPerformanceItem) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('desc');
        }
    };

    const filteredData = data.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const sortedData = [...filteredData].sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const SortIcon = ({ col }: { col: keyof ProductPerformanceItem }) => {
        if (sortKey !== col) return <ChevronsUpDown size={12} style={{ color: '#636366', marginLeft: '6px' }} />;
        return sortOrder === 'asc' ? <ChevronUp size={12} style={{ color: '#C9A96E', marginLeft: '6px' }} /> : <ChevronDown size={12} style={{ color: '#C9A96E', marginLeft: '6px' }} />;
    };

    const thStyle: React.CSSProperties = {
        padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#636366',
        textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.04)',
        cursor: 'pointer', transition: 'color 150ms', whiteSpace: 'nowrap'
    };

    return (
        <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyBetween: 'space-between' } as any}>
                <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0, flex: 1 }}>Ürün Performansı</h2>
                <div style={{ position: 'relative' }}>
                    <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#636366' }} />
                    <input
                        type="text"
                        placeholder="Ürün ara..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        style={{
                            width: '180px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '5px', padding: '6px 10px 6px 30px', fontSize: '12px', color: '#F5F0EB', outline: 'none'
                        }}
                    />
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={thStyle} onClick={() => handleSort('name')}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>Ürün <SortIcon col="name" /></div>
                            </th>
                            <th style={thStyle} onClick={() => handleSort('views')}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>Görüntüleme <SortIcon col="views" /></div>
                            </th>
                            <th style={thStyle} onClick={() => handleSort('addToCart')}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>Sepete Ekle <SortIcon col="addToCart" /></div>
                            </th>
                            <th style={thStyle} onClick={() => handleSort('sales')}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>Satış <SortIcon col="sales" /></div>
                            </th>
                            <th style={thStyle} onClick={() => handleSort('conversionRate')}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>Dönüşüm <SortIcon col="conversionRate" /></div>
                            </th>
                            <th style={thStyle} onClick={() => handleSort('revenue')}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>Gelir <SortIcon col="revenue" /></div>
                            </th>
                            <th style={thStyle} onClick={() => handleSort('rating')}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>Rating <SortIcon col="rating" /></div>
                            </th>
                            <th style={{ ...thStyle, cursor: 'default' }}>Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence mode="popLayout">
                            {sortedData.map((product) => (
                                <motion.tr
                                    layout
                                    key={product.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{ cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#636366' }}>
                                                <span style={{ fontSize: '10px' }}>IMG</span>
                                            </div>
                                            <span style={{ fontSize: '13px', fontWeight: 500, color: '#F5F0EB' }}>{product.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px 16px', fontSize: '12px', color: '#AEAEB2', fontVariantNumeric: 'tabular-nums' }}>{product.views.toLocaleString()}</td>
                                    <td style={{ padding: '12px 16px', fontSize: '12px', color: '#AEAEB2', fontVariantNumeric: 'tabular-nums' }}>{product.addToCart.toLocaleString()}</td>
                                    <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums' }}>{product.sales}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span style={{
                                            fontSize: '12px', fontWeight: 600, fontVariantNumeric: 'tabular-nums',
                                            color: product.conversionRate >= 5 ? '#30D158' : (product.conversionRate >= 2 ? '#FFD60A' : '#FF453A')
                                        }}>
                                            %{product.conversionRate}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums' }}>
                                        {formatCurrency(product.revenue)}
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Star size={12} fill="#FFD60A" color="#FFD60A" />
                                            <span style={{ fontSize: '12px', color: '#AEAEB2' }}>{product.rating}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        {product.trend === 'up' ? <TrendingUp size={16} color="#30D158" /> : <TrendingDown size={16} color="#FF453A" />}
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <Link href="/admin/urunler" style={{ fontSize: '12px', color: '#C9A96E', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Tüm Ürünleri Gör <ArrowRight size={12} />
                </Link>
            </div>
        </div>
    );
}

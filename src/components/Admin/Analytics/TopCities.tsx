'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { type CityData, formatCurrency } from '@/lib/mock/analytics';

interface TopCitiesProps {
    data: CityData[];
}

export function TopCities({ data }: TopCitiesProps) {
    const [sortBy, setSortBy] = useState<'revenue' | 'orders'>('revenue');

    const sortedData = [...data].sort((a, b) => b[sortBy] - a[sortBy]);
    const maxVal = Math.max(...data.map(d => d[sortBy]));

    return (
        <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', height: '100%' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Şehir Bazlı Satışlar</h2>

                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.02)', padding: '2px', borderRadius: '4px' }}>
                    {(['revenue', 'orders'] as const).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setSortBy(mode)}
                            style={{
                                padding: '4px 10px', fontSize: '10px', border: 'none', borderRadius: '3px', cursor: 'pointer',
                                background: sortBy === mode ? 'rgba(201,169,110,0.15)' : 'transparent',
                                color: sortBy === mode ? '#C9A96E' : '#636366', fontWeight: 600, textTransform: 'uppercase',
                                transition: 'all 150ms'
                            }}
                        >
                            {mode === 'revenue' ? 'Gelir' : 'Sipariş'}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {sortedData.map((item, idx) => {
                    const currentVal = item[sortBy];
                    const widthPct = (currentVal / maxVal) * 100;

                    return (
                        <div key={item.city} style={{ position: 'relative' }}>
                            <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1 }}>
                                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: 'rgba(201,169,110,0.5)', width: '24px', flexShrink: 0 }}>
                                    {idx + 1}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#F5F0EB' }}>{item.city}</div>
                                    <div style={{ fontSize: '10px', color: '#636366', fontStyle: 'italic', marginTop: '1px' }}>
                                        Popüler: {item.topProduct}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums' }}>
                                        {sortBy === 'revenue' ? formatCurrency(currentVal) : currentVal.toLocaleString('tr-TR')}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#636366' }}>%{item.percentage}</div>
                                </div>
                            </div>

                            {/* Progress Bar Background */}
                            <div style={{ position: 'absolute', bottom: 0, left: '20px', right: '20px', height: '1px', background: 'rgba(255,255,255,0.03)' }} />

                            {/* Dynamic Progress Bar */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${widthPct}%` }}
                                transition={{ duration: 0.8, delay: idx * 0.05 }}
                                style={{
                                    position: 'absolute', bottom: 0, left: '20px', height: '2px',
                                    background: 'linear-gradient(90deg, #C9A96E, transparent)',
                                    borderRadius: '1px'
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

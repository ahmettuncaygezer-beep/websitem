'use client';

import React from 'react';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from 'recharts';
import { type CategorySales, formatCurrency } from '@/types/admin/analytics';

interface CategoryPieProps {
    data: CategorySales[];
}

const COLORS = ['#C9A96E', '#A8845A', '#D4B87A', '#8B6A3A', '#E8CFA0', '#6B4F2C'];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const d = payload[0].payload;
        return (
            <div style={{ background: '#0F0F10', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#F5F0EB', marginBottom: '4px' }}>{d.category}</div>
                <div style={{ fontSize: '12px', color: '#AEAEB2' }}>Gelir: {formatCurrency(d.revenue)}</div>
                <div style={{ fontSize: '12px', color: '#AEAEB2' }}>Sipariş: {d.orders}</div>
                <div style={{ fontSize: '12px', color: d.growth >= 0 ? '#30D158' : '#FF453A', fontWeight: 600, marginTop: '4px' }}>
                    Büyüme: {d.growth >= 0 ? '+' : ''}{d.growth}%
                </div>
            </div>
        );
    }
    return null;
};

export function CategoryPie({ data }: CategoryPieProps) {
    const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0);

    return (
        <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Kategori Dağılımı</h2>
            </div>

            <div style={{ position: 'relative', height: '220px', marginTop: '10px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={80}
                            paddingAngle={3}
                            dataKey="revenue"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    textAlign: 'center', pointerEvents: 'none'
                }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: '#F5F0EB' }}>
                        {formatCurrency(totalRevenue)}
                    </div>
                    <div style={{ fontSize: '10px', color: '#636366', textTransform: 'uppercase' }}>Toplam</div>
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', paddingBottom: '16px' }}>
                {data.map((item, idx) => (
                    <div key={item.category} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 20px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[idx % COLORS.length] }} />
                        <div style={{ fontSize: '12px', color: '#AEAEB2', flex: 1 }}>{item.category}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '11px', color: item.growth >= 0 ? '#30D158' : '#FF453A' }}>
                                {item.growth >= 0 ? '↑' : '↓'} {Math.abs(item.growth)}%
                            </span>
                            <span style={{ fontSize: '12px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums' }}>
                                {formatCurrency(item.revenue)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

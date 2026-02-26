'use client';

import React, { useState } from 'react';
import {
    ResponsiveContainer,
    ComposedChart,
    Area,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import { mockMonthlyRevenue } from '@/lib/mock/analytics';
import type { MonthlyRevenue } from '@/lib/mock/analytics';

type DataKey = 'revenue' | 'orders' | 'visitors';

const dataOptions: { label: string; key: DataKey }[] = [
    { label: 'Gelir', key: 'revenue' },
    { label: 'Sipariş', key: 'orders' },
    { label: 'Ziyaretçi', key: 'visitors' },
];

function formatYAxis(value: number, key: DataKey): string {
    if (key !== 'revenue') return String(value);
    if (value >= 1_000_000) return `₺${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `₺${(value / 1_000).toFixed(0)}K`;
    return `₺${value}`;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: { value: number; dataKey: string }[];
    label?: string;
    dataKey: DataKey;
}

function CustomTooltip({ active, payload, label, dataKey }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;
    const main = payload.find((p) => p.dataKey === dataKey);
    const prev = payload.find((p) => p.dataKey === 'prevRevenue');
    return (
        <div
            style={{
                background: '#0F0F10',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '12px 16px',
                boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
            }}
        >
            <div style={{ fontSize: '11px', color: '#636366', marginBottom: '6px' }}>{label}</div>
            {main && (
                <div
                    style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#F5F0EB',
                    }}
                >
                    {dataKey === 'revenue'
                        ? `₺${main.value.toLocaleString('tr-TR')}`
                        : main.value.toLocaleString('tr-TR')}
                </div>
            )}
            {prev && (
                <div style={{ fontSize: '11px', color: '#AEAEB2', marginTop: '4px' }}>
                    Önceki dönem: ₺{prev.value.toLocaleString('tr-TR')}
                </div>
            )}
        </div>
    );
}

export function RevenueChart() {
    const [activeKey, setActiveKey] = useState<DataKey>('revenue');
    const [compare, setCompare] = useState(false);

    return (
        <div
            style={{
                background: '#1C1C1E',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '20px',
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: '18px 20px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                }}
            >
                <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>
                    Gelir Trendi
                </h2>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    {/* Data key selector */}
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {dataOptions.map((opt) => (
                            <button
                                key={opt.key}
                                onClick={() => setActiveKey(opt.key)}
                                style={{
                                    fontSize: '11px',
                                    padding: '4px 10px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    border: activeKey === opt.key
                                        ? '1px solid rgba(201,169,110,0.3)'
                                        : '1px solid rgba(255,255,255,0.06)',
                                    background: activeKey === opt.key ? 'rgba(201,169,110,0.12)' : 'transparent',
                                    color: activeKey === opt.key ? '#C9A96E' : '#636366',
                                    transition: 'all 150ms',
                                    fontFamily: 'Inter, system-ui, sans-serif',
                                }}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    {/* Compare toggle */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <div
                            role="switch"
                            aria-checked={compare}
                            onClick={() => setCompare((v) => !v)}
                            style={{
                                width: '30px',
                                height: '16px',
                                borderRadius: '8px',
                                background: compare ? '#C9A96E' : 'rgba(255,255,255,0.12)',
                                position: 'relative',
                                transition: 'background 150ms',
                                cursor: 'pointer',
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '2px',
                                    left: compare ? '16px' : '2px',
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: '#fff',
                                    transition: 'left 150ms',
                                }}
                            />
                        </div>
                        <span style={{ fontSize: '11px', color: '#636366' }}>Karşılaştır</span>
                    </label>
                </div>
            </div>

            {/* Chart */}
            <div style={{ padding: '20px 20px 8px' }}>
                <ResponsiveContainer width="100%" height={280}>
                    <ComposedChart data={mockMonthlyRevenue} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#C9A96E" stopOpacity={0.25} />
                                <stop offset="100%" stopColor="#C9A96E" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />

                        <XAxis
                            dataKey="month"
                            tick={{ fill: '#636366', fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tickFormatter={(v: number) => formatYAxis(v, activeKey)}
                            tick={{ fill: '#636366', fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            width={64}
                        />

                        <Tooltip
                            content={(props) => (
                                <CustomTooltip
                                    active={props.active}
                                    payload={props.payload as { value: number; dataKey: string }[] | undefined}
                                    label={props.label as string | undefined}
                                    dataKey={activeKey}
                                />
                            )}
                        />

                        {/* Main area */}
                        <Area
                            type="monotone"
                            dataKey={activeKey}
                            stroke="#C9A96E"
                            strokeWidth={2}
                            fill="url(#revGradient)"
                            fillOpacity={1}
                            dot={false}
                            activeDot={{ r: 4, fill: '#C9A96E', stroke: '#1C1C1E', strokeWidth: 2 }}
                        />

                        {/* Comparison line */}
                        {compare && activeKey === 'revenue' && (
                            <Line
                                type="monotone"
                                dataKey="prevRevenue"
                                stroke="rgba(255,255,255,0.3)"
                                strokeWidth={1.5}
                                strokeDasharray="6 3"
                                dot={false}
                                legendType="none"
                            />
                        )}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* Timestamp */}
            <div style={{ padding: '0 20px 16px', display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '11px', color: '#636366' }}>
                    Son güncelleme: bugün 09:14
                </span>
            </div>
        </div>
    );
}

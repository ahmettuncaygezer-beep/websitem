'use client';

import React, { useMemo } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, ComposedChart, Line
} from 'recharts';
import { type DailySales, formatCurrency } from '@/lib/mock/analytics';

interface SalesChartProps {
    data: DailySales[];
    metric: 'revenue' | 'orders' | 'visitors';
    compareEnabled: boolean;
    period: 'Günlük' | 'Haftalık' | 'Aylık';
    onPeriodChange: (p: 'Günlük' | 'Haftalık' | 'Aylık') => void;
}

const METRIC_LABELS: Record<string, string> = {
    revenue: 'Gelir',
    orders: 'Sipariş',
    visitors: 'Ziyaretçi'
};

const CustomTooltip = ({ active, payload, label, metric }: any) => {
    if (active && payload && payload.length) {
        const mainVal = payload[0].value;
        const prevVal = payload[1]?.value;
        const diff = prevVal ? ((mainVal - prevVal) / prevVal) * 100 : null;

        return (
            <div style={{
                background: '#0F0F10', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px', padding: '12px 16px', boxShadow: '0 16px 40px rgba(0,0,0,0.5)'
            }}>
                <div style={{ fontSize: '11px', color: '#636366', marginBottom: '4px' }}>
                    {new Date(label).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: '#F5F0EB' }}>
                    {metric === 'revenue' ? formatCurrency(mainVal) : mainVal.toLocaleString('tr-TR')}
                </div>
                {prevVal !== undefined && (
                    <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: '10px', color: '#636366', textTransform: 'uppercase' }}>Önceki Dönem</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                            <span style={{ fontSize: '13px', color: '#AEAEB2' }}>
                                {metric === 'revenue' ? formatCurrency(prevVal) : prevVal.toLocaleString('tr-TR')}
                            </span>
                            {diff !== null && (
                                <span style={{ fontSize: '11px', color: diff >= 0 ? '#30D158' : '#FF453A', fontWeight: 600 }}>
                                    {diff >= 0 ? '+' : ''}{diff.toFixed(1)}%
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
    return null;
};

export function SalesChart({ data, metric, compareEnabled, period, onPeriodChange }: SalesChartProps) {
    const chartData = useMemo(() => {
        return data.map(d => ({
            ...d,
            current: d[metric as keyof DailySales],
            previous: metric === 'revenue' ? d.prevRevenue : d.prevOrders // visitors doesn't have prev in mock yet
        }));
    }, [data, metric]);

    const summary = useMemo(() => {
        const total = data.reduce((acc, curr) => acc + (curr[metric as keyof DailySales] as number), 0);
        const avg = total / data.length;
        const max = Math.max(...data.map(d => d[metric as keyof DailySales] as number));
        return { total, avg, max };
    }, [data, metric]);

    return (
        <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
            {/* Header */}
            <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>
                    {METRIC_LABELS[metric]} Trendi
                </h2>
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.02)', padding: '3px', borderRadius: '6px' }}>
                    {(['Günlük', 'Haftalık', 'Aylık'] as const).map((p) => (
                        <button
                            key={p}
                            onClick={() => onPeriodChange(p)}
                            style={{
                                padding: '5px 12px', fontSize: '11px', border: 'none', borderRadius: '4px', cursor: 'pointer',
                                background: period === p ? 'rgba(201,169,110,0.12)' : 'transparent',
                                color: period === p ? '#C9A96E' : '#636366', fontWeight: period === p ? 600 : 500,
                                transition: 'all 150ms'
                            }}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart Area */}
            <div style={{ padding: '20px' }}>
                <div style={{ height: '300px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#C9A96E" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#C9A96E" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#636366', fontSize: 11 }}
                                tickFormatter={(str) => {
                                    const date = new Date(str);
                                    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
                                }}
                                minTickGap={30}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#636366', fontSize: 11 }}
                                tickFormatter={(val) => metric === 'revenue' ? formatCurrency(val) : val.toLocaleString('tr-TR')}
                            />
                            <Tooltip content={<CustomTooltip metric={metric} />} />

                            {compareEnabled && (
                                <Line
                                    type="monotone"
                                    dataKey="previous"
                                    stroke="rgba(255,255,255,0.25)"
                                    strokeWidth={1.5}
                                    strokeDasharray="6 3"
                                    dot={false}
                                    activeDot={false}
                                />
                            )}

                            <Area
                                type="monotone"
                                dataKey="current"
                                stroke="#C9A96E"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorMetric)"
                                dot={false}
                                activeDot={{ r: 5, fill: '#C9A96E', stroke: '#0F0F10', strokeWidth: 2 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Summary Footer */}
            <div style={{ padding: '0 20px 16px', display: 'flex', gap: '24px', borderTop: '1px solid rgba(255,255,255,0.02)', paddingTop: '16px' }}>
                <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums' }}>
                        {metric === 'revenue' ? formatCurrency(summary.total) : summary.total.toLocaleString('tr-TR')}
                    </div>
                    <div style={{ fontSize: '11px', color: '#636366', marginTop: '2px' }}>Toplam {METRIC_LABELS[metric]}</div>
                </div>
                <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums' }}>
                        {metric === 'revenue' ? formatCurrency(summary.avg) : Math.round(summary.avg).toLocaleString('tr-TR')}
                    </div>
                    <div style={{ fontSize: '11px', color: '#636366', marginTop: '2px' }}>Gnl. Ortalama</div>
                </div>
                <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#C9A96E', fontVariantNumeric: 'tabular-nums' }}>
                        {metric === 'revenue' ? formatCurrency(summary.max) : summary.max.toLocaleString('tr-TR')}
                    </div>
                    <div style={{ fontSize: '11px', color: '#636366', marginTop: '2px' }}>Zirve Değer</div>
                </div>
            </div>
        </div>
    );
}

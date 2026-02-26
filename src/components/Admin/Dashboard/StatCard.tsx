'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';
import type { KpiData } from '@/lib/mock/analytics';

// Icons mapping by KPI id
const iconMap: Record<string, string> = {
    revenue: '₺',
    orders: '📦',
    customers: '👤',
    conversion: '🎯',
};

interface StatCardProps {
    data: KpiData;
    index: number;
}

const itemVariant = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
};

export function StatCard({ data, index }: StatCardProps) {
    const sparkPoints = data.sparklineData.map((v, i) => ({ v, i }));

    return (
        <motion.div
            variants={itemVariant}
            className="relative overflow-hidden rounded-lg border transition-all duration-200 cursor-default group"
            style={{
                background: '#1C1C1E',
                borderColor: 'rgba(255,255,255,0.05)',
                padding: '20px',
            }}
            whileHover={{
                borderColor: 'rgba(201,169,110,0.2)',
                boxShadow: '0 8px 32px rgba(201,169,110,0.06)',
                y: -2,
            }}
            transition={{ duration: 0.2 }}
        >
            {/* Decorative bg icon */}
            <div
                className="absolute bottom-[-8px] left-[-4px] pointer-events-none select-none font-['Playfair_Display',Georgia,serif]"
                style={{ fontSize: '64px', opacity: 0.03, color: '#C9A96E', lineHeight: 1 }}
                aria-hidden="true"
            >
                {iconMap[data.id] ?? '◈'}
            </div>

            {/* Top row: label + sparkline */}
            <div className="flex items-start justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                    {/* Icon box */}
                    <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                        style={{ background: 'rgba(201,169,110,0.12)', color: '#C9A96E' }}
                        aria-hidden="true"
                    >
                        <span style={{ fontSize: '15px' }}>{iconMap[data.id] ?? '◈'}</span>
                    </div>
                    <span
                        className="text-[11px] font-medium uppercase"
                        style={{ color: '#636366', letterSpacing: '0.08em' }}
                    >
                        {data.label}
                    </span>
                </div>

                {/* Sparkline */}
                <div style={{ width: 80, height: 36 }}>
                    <AreaChart
                        width={80}
                        height={36}
                        data={sparkPoints}
                        margin={{ top: 2, right: 0, bottom: 2, left: 0 }}
                    >
                        <defs>
                            <linearGradient id={`spark-fill-${data.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={data.trendUp ? '#C9A96E' : '#FF453A'} stopOpacity={0.15} />
                                <stop offset="100%" stopColor={data.trendUp ? '#C9A96E' : '#FF453A'} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <YAxis domain={['dataMin', 'dataMax']} hide />
                        <Area
                            type="monotone"
                            dataKey="v"
                            stroke={data.trendUp ? '#C9A96E' : '#FF453A'}
                            strokeWidth={1.5}
                            fill={`url(#spark-fill-${data.id})`}
                            dot={false}
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </div>
            </div>

            {/* Value */}
            <div
                className="font-['Playfair_Display',Georgia,serif] tabular-nums"
                style={{ fontSize: '32px', fontWeight: 600, color: '#F5F0EB', lineHeight: 1 }}
            >
                {data.value}
            </div>

            {/* Trend + subtitle */}
            <div className="flex items-center gap-1.5 mt-2.5">
                <span
                    className="flex items-center gap-1 text-[12px] font-semibold"
                    style={{ color: data.trendUp ? '#30D158' : '#FF453A' }}
                >
                    {data.trendUp ? '↑' : '↓'} {Math.abs(data.trend)}%
                </span>
                <span style={{ fontSize: '11px', color: '#636366' }}>{data.subtitle}</span>
            </div>
        </motion.div>
    );
}

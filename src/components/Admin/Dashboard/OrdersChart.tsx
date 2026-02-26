'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const statusData = [
    { name: 'Tamamlandı', value: 592, color: '#30D158' },
    { name: 'Kargoda', value: 156, color: '#0A84FF' },
    { name: 'Hazırlanıyor', value: 45, color: '#C9A96E' },
    { name: 'İptal', value: 31, color: '#FF453A' },
];

const total = statusData.reduce((s, d) => s + d.value, 0);

export function OrdersChart() {
    return (
        <div
            style={{
                background: '#1C1C1E',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '8px',
                overflow: 'hidden',
                height: '100%',
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
                }}
            >
                <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>
                    Sipariş Durumu
                </h2>
                <span style={{ fontSize: '11px', color: '#636366' }}>Bu ay</span>
            </div>

            {/* Donut chart */}
            <div style={{ padding: '16px 20px 0' }}>
                <div style={{ position: 'relative', height: '180px' }}>
                    <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={75}
                                paddingAngle={3}
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                            >
                                {statusData.map((entry) => (
                                    <Cell key={entry.name} fill={entry.color} stroke="transparent" />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center text */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            pointerEvents: 'none',
                        }}
                    >
                        <div
                            style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontSize: '26px',
                                fontWeight: 600,
                                color: '#F5F0EB',
                                lineHeight: 1,
                            }}
                        >
                            {total}
                        </div>
                        <div style={{ fontSize: '10px', color: '#636366', marginTop: '4px' }}>toplam</div>
                    </div>
                </div>

                {/* Legend */}
                <div style={{ paddingBottom: '16px' }}>
                    {statusData.map((item) => {
                        const pct = ((item.value / total) * 100).toFixed(1);
                        return (
                            <div
                                key={item.name}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 0' }}
                            >
                                <div
                                    style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0 }}
                                />
                                <span style={{ fontSize: '12px', color: '#AEAEB2', flex: 1 }}>{item.name}</span>
                                <span style={{ fontSize: '11px', color: '#636366', marginRight: '8px' }}>{pct}%</span>
                                <span
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        color: '#F5F0EB',
                                        fontVariantNumeric: 'tabular-nums',
                                    }}
                                >
                                    {item.value}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

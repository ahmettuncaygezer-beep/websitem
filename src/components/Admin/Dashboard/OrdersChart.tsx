import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export function OrdersChart() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchChartData() {
            try {
                const res = await fetch('/api/admin/dashboard');
                const result = await res.json();
                if (result.orderStatusCounts) {
                    setData(result.orderStatusCounts);
                }
            } catch (error) {
                console.error('Failed to fetch order status data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchChartData();
    }, []);

    const total = data.reduce((s, d) => s + d.value, 0);

    if (loading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center', color: '#636366', background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Veriler yükleniyor...
            </div>
        );
    }

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
                <span style={{ fontSize: '11px', color: '#636366' }}>Tümü</span>
            </div>

            {/* Donut chart */}
            <div style={{ padding: '16px 20px 0' }}>
                <div style={{ position: 'relative', height: '180px' }}>
                    <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={75}
                                paddingAngle={3}
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                            >
                                {data.map((entry, i) => (
                                    <Cell key={`cell-${i}`} fill={entry.color} stroke="transparent" />
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
                    {data.length === 0 ? (
                        <div style={{ fontSize: '12px', color: '#636366', textAlign: 'center', padding: '10px' }}>
                            Veri bulunamadı.
                        </div>
                    ) : (
                        data.map((item) => {
                            const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0.0';
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
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

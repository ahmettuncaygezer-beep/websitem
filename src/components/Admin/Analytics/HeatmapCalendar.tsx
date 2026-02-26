'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { type HeatmapCell, formatCurrency } from '@/lib/mock/analytics';

interface HeatmapCalendarProps {
    data: HeatmapCell[];
}

const HOURS = Array.from({ length: 12 }, (_, i) => i * 2);
const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

function getIntensity(orders: number) {
    if (orders === 0) return 'rgba(255,255,255,0.03)';
    if (orders <= 5) return 'rgba(201,169,110,0.1)';
    if (orders <= 15) return 'rgba(201,169,110,0.25)';
    if (orders <= 30) return 'rgba(201,169,110,0.45)';
    return 'rgba(201,169,110,0.7)';
}

export function HeatmapCalendar({ data }: HeatmapCalendarProps) {
    const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null);

    const maxOrders = Math.max(...data.map(d => d.orders));

    return (
        <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Haftalık Satış Yoğunluğu</h2>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '10px', color: '#636366' }}>Düşük</span>
                    <div style={{ display: 'flex', gap: '2px' }}>
                        {[0.1, 0.25, 0.45, 0.7, 1].map((op, i) => (
                            <div key={i} style={{ width: '10px', height: '10px', borderRadius: '2px', background: `rgba(201,169,110,${op === 1 ? 1 : op})` }} />
                        ))}
                    </div>
                    <span style={{ fontSize: '10px', color: '#636366' }}>Yüksek</span>
                </div>
            </div>

            <div style={{ padding: '20px', overflowX: 'auto' }}>
                <div style={{ minWidth: '700px' }}>
                    {/* Hour Labels */}
                    <div style={{ display: 'flex', marginLeft: '36px', marginBottom: '8px' }}>
                        {HOURS.map(h => (
                            <div key={h} style={{ flex: 1, textAlign: 'center', fontSize: '10px', color: '#636366' }}>
                                {h.toString().padStart(2, '0')}:00
                            </div>
                        ))}
                    </div>

                    {/* Grid Rows */}
                    {DAYS.map(day => (
                        <div key={day} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                            <div style={{ width: '36px', fontSize: '11px', color: '#636366', textAlign: 'right', paddingRight: '10px' }}>
                                {day}
                            </div>
                            <div style={{ flex: 1, display: 'flex', gap: '2px' }}>
                                {data.filter(d => d.day === day).map((cell, idx) => (
                                    <div
                                        key={idx}
                                        onMouseEnter={() => setHoveredCell(cell)}
                                        onMouseLeave={() => setHoveredCell(null)}
                                        style={{
                                            flex: 1, height: '28px', borderRadius: '4px', cursor: 'pointer',
                                            background: cell.orders === maxOrders ? '#C9A96E' : getIntensity(cell.orders),
                                            border: cell.orders === 0 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                                            transition: 'all 150ms'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ padding: '12px 20px', background: 'rgba(201,169,110,0.05)', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Lightbulb size={16} color="#C9A96E" />
                <p style={{ fontSize: '12px', color: '#AEAEB2', margin: 0 }}>
                    En yoğun zaman dilimi: Cuma 20:00-22:00 arası. Bu saatlerde lojistik planlaması güçlendirilebilir.
                </p>
            </div>

            {/* Hover Tooltip */}
            <AnimatePresence>
                {hoveredCell && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', pointerEvents: 'none', zIndex: 100,
                            // Note: Ideally would use a more robust positioning logic, 
                            // but for this UI we'll follow the user's layout description
                            left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                            background: '#0F0F10', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '6px', padding: '8px 12px', boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
                        }}
                    >
                        <div style={{ fontSize: '10px', color: '#636366', marginBottom: '2px' }}>{hoveredCell.day} {hoveredCell.hour}:00</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums' }}>{hoveredCell.orders} Sipariş</span>
                            <span style={{ fontSize: '11px', color: '#C9A96E' }}>{formatCurrency(hoveredCell.revenue)}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { type FunnelStep } from '@/lib/mock/analytics';

interface FunnelChartProps {
    data: FunnelStep[];
}

export function FunnelChart({ data }: FunnelChartProps) {
    const maxCount = data[0].count;

    return (
        <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Dönüşüm Hunisi</h2>
                <span style={{ fontSize: '11px', color: '#636366' }}>Bu Ay</span>
            </div>

            <div style={{ padding: '24px 20px', flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {data.map((step, idx) => {
                        const widthPct = (step.count / maxCount) * 100;
                        const nextWidthPct = data[idx + 1] ? (data[idx + 1].count / maxCount) * 100 : widthPct;
                        const opacity = 0.4 - (idx * 0.05);

                        return (
                            <React.Fragment key={step.step}>
                                {/* Funnel Step Shape */}
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <svg width="100%" height="56" viewBox="0 0 400 56" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id={`grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" style={{ stopColor: '#C9A96E', stopOpacity: opacity }} />
                                                <stop offset="100%" style={{ stopColor: '#C9A96E', stopOpacity: opacity * 0.6 }} />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d={`M ${(400 - (widthPct * 4)) / 2} 0 H ${(400 + (widthPct * 4)) / 2} L ${(400 + (nextWidthPct * 4)) / 2} 56 H ${(400 - (nextWidthPct * 4)) / 2} Z`}
                                            fill={`url(#grad-${idx})`}
                                            style={{ transition: 'all 0.4s ease' }}
                                        />
                                    </svg>

                                    {/* Labels */}
                                    <div style={{ position: 'absolute', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'none' }}>
                                        <div style={{ fontSize: '12px', fontWeight: 500, color: '#AEAEB2' }}>{step.step}</div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums' }}>
                                                {step.count.toLocaleString('tr-TR')}
                                            </div>
                                            <div style={{ fontSize: '10px', color: '#636366' }}>%{step.percentage}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Dropoff Indicator */}
                                {idx < data.length - 1 && (
                                    <div style={{ height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ fontSize: '11px', color: '#FF453A', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ fontSize: '10px' }}>▼</span> %{step.dropoff} düşüş
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Insight Box */}
                <div style={{
                    marginTop: '24px', padding: '12px 14px', background: 'rgba(255,214,10,0.05)',
                    border: '1px solid rgba(255,214,10,0.1)', borderRadius: '6px',
                    display: 'flex', gap: '10px', alignItems: 'flex-start'
                }}>
                    <AlertCircle size={16} color="#FFD60A" style={{ marginTop: '1px', flexShrink: 0 }} />
                    <p style={{ fontSize: '12px', color: '#AEAEB2', margin: 0, lineHeight: 1.5 }}>
                        Sepetten ödemeye geçiş oranı %{data[3].percentage}, bu adımda optimizasyon potansiyeli yüksek görünüyor.
                    </p>
                </div>
            </div>
        </div>
    );
}

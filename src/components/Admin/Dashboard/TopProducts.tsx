'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { mockTopProducts } from '@/lib/mock/products';

const maxSales = mockTopProducts[0]?.sales ?? 1;

const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    show: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, delay: i * 0.05, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
    }),
};

export function TopProducts() {
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
                    En Çok Satan Ürünler
                </h2>
                <Link
                    href="/admin/urunler"
                    style={{
                        fontSize: '12px',
                        color: '#C9A96E',
                        opacity: 0.8,
                        textDecoration: 'none',
                        transition: 'opacity 150ms',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.8')}
                >
                    Tümünü Gör →
                </Link>
            </div>

            {/* List */}
            <div style={{ padding: '8px 0' }}>
                {mockTopProducts.map((product, i) => {
                    const barWidth = Math.round((product.sales / maxSales) * 100);
                    return (
                        <motion.div
                            key={product.rank}
                            custom={i}
                            variants={rowVariants}
                            initial="hidden"
                            animate="show"
                            style={{
                                padding: '10px 20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                transition: 'background 100ms',
                                cursor: 'default',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                            }}
                        >
                            {/* Rank */}
                            <div
                                style={{
                                    fontFamily: "'Playfair Display', Georgia, serif",
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    color: 'rgba(201,169,110,0.6)',
                                    width: '24px',
                                    textAlign: 'center',
                                    flexShrink: 0,
                                }}
                            >
                                {product.rank}
                            </div>

                            {/* Icon box */}
                            <div
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    background: 'rgba(201,169,110,0.08)',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#C9A96E',
                                    fontSize: '14px',
                                    flexShrink: 0,
                                }}
                                aria-hidden="true"
                            >
                                🛋️
                            </div>

                            {/* Name + category + progress bar */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: 500,
                                        color: '#F5F0EB',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {product.name}
                                </div>
                                <div style={{ fontSize: '10px', color: '#636366', marginTop: '2px' }}>
                                    {product.category}
                                </div>
                                {/* Progress bar */}
                                <div
                                    style={{
                                        marginTop: '5px',
                                        height: '3px',
                                        background: 'rgba(255,255,255,0.06)',
                                        borderRadius: '2px',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <div
                                        style={{
                                            height: '100%',
                                            width: `${barWidth}%`,
                                            background: '#C9A96E',
                                            borderRadius: '2px',
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Revenue + trend */}
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        color: '#F5F0EB',
                                        fontVariantNumeric: 'tabular-nums',
                                    }}
                                >
                                    ₺{(product.revenue / 1000).toFixed(0)}K
                                </div>
                                <div
                                    style={{
                                        fontSize: '10px',
                                        color: product.trend ? '#30D158' : '#FF453A',
                                        marginTop: '2px',
                                    }}
                                >
                                    {product.trend ? '↑' : '↓'} {product.sales} adet
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

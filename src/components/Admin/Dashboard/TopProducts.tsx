'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';



const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    show: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, delay: i * 0.05, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
    }),
};

export function TopProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTopProducts() {
            try {
                const res = await fetch('/api/admin/dashboard');
                const data = await res.json();
                if (data.topProducts) {
                    setProducts(data.topProducts);
                }
            } catch (error) {
                console.error('Failed to fetch top products:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchTopProducts();
    }, []);

    if (loading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center', color: '#636366', background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
                Ürünler yükleniyor...
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
                    Popüler Ürünler
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
                {products.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#636366' }}>
                        Ürün bulunamadı.
                    </div>
                ) : (
                    products.map((product, i) => {
                        const barWidth = 100 - (i * 15); // Simple visual rank indicator
                        return (
                            <motion.div
                                key={product.id}
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
                                    {i + 1}
                                </div>

                                {/* Icon box */}
                                <div
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#C9A96E',
                                        fontSize: '14px',
                                        flexShrink: 0,
                                        overflow: 'hidden'
                                    }}
                                >
                                    {product.images && product.images[0] ? (
                                        <img src={product.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : '🛋️'}
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
                                        {product.category || 'Mobilya'}
                                    </div>
                                    {/* Progress bar */}
                                    <div
                                        style={{
                                            marginTop: '5px',
                                            height: '2px',
                                            background: 'rgba(255,255,255,0.06)',
                                            borderRadius: '1px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <div
                                            style={{
                                                height: '100%',
                                                width: `${barWidth}%`,
                                                background: '#C9A96E',
                                                borderRadius: '1px',
                                                opacity: 0.6
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Price */}
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <div
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            color: '#F5F0EB',
                                            fontVariantNumeric: 'tabular-nums',
                                        }}
                                    >
                                        ₺{Number(product.price).toLocaleString('tr-TR')}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

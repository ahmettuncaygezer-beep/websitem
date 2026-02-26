'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StatsGrid } from '@/components/Admin/Dashboard/StatsGrid';
import { RevenueChart } from '@/components/Admin/Dashboard/RevenueChart';
import { OrdersChart } from '@/components/Admin/Dashboard/OrdersChart';
import { TopProducts } from '@/components/Admin/Dashboard/TopProducts';
import { RecentOrders } from '@/components/Admin/Dashboard/RecentOrders';
import { LiveActivity } from '@/components/Admin/Dashboard/LiveActivity';
import { QuickActions } from '@/components/Admin/Dashboard/QuickActions';

// ── Stagger animation variants ─────────────────────────────────────────────────
const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
};

// ── Period selector options ────────────────────────────────────────────────────
const periods = ['Bugün', 'Bu Hafta', 'Bu Ay', 'Son 30 Gün', 'Özel'] as const;
type Period = (typeof periods)[number];

export default function AdminDashboardPage() {
    const [activePeriod, setActivePeriod] = useState<Period>('Bu Ay');

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{ maxWidth: '1600px', margin: '0 auto' }}
        >
            {/* ── Page header ─────────────────────────────────────────────────── */}
            <motion.div
                variants={itemVariants}
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                    marginBottom: '24px',
                }}
            >
                {/* Title */}
                <div>
                    <h1
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: '30px',
                            fontWeight: 500,
                            color: '#F5F0EB',
                            margin: 0,
                            lineHeight: 1.2,
                        }}
                    >
                        Günaydın, Ali 👋
                    </h1>
                    <p style={{ fontSize: '13px', color: '#AEAEB2', marginTop: '6px' }}>
                        Bugün 12 yeni sipariş geldi,{' '}
                        <span style={{ color: '#30D158', fontWeight: 600 }}>
                            dün aynı saate göre %23 artış
                        </span>
                    </p>
                </div>

                {/* Period selector */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {periods.map((p) => (
                        <button
                            key={p}
                            onClick={() => setActivePeriod(p)}
                            aria-pressed={activePeriod === p}
                            style={{
                                padding: '5px 14px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                cursor: 'pointer',
                                fontFamily: 'Inter, system-ui, sans-serif',
                                transition: 'all 150ms',
                                background: activePeriod === p ? '#C9A96E' : 'transparent',
                                borderColor: activePeriod === p ? '#C9A96E' : 'rgba(255,255,255,0.08)',
                                border: `1px solid ${activePeriod === p ? '#C9A96E' : 'rgba(255,255,255,0.08)'}`,
                                color: activePeriod === p ? '#0F0F10' : '#AEAEB2',
                                fontWeight: activePeriod === p ? 600 : 400,
                            }}
                            onMouseEnter={(e) => {
                                if (activePeriod !== p) {
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,169,110,0.3)';
                                    (e.currentTarget as HTMLButtonElement).style.color = '#F5F0EB';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activePeriod !== p) {
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
                                    (e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2';
                                }
                            }}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* ── Quick actions ───────────────────────────────────────────────── */}
            <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
                <QuickActions />
            </motion.div>

            {/* ── KPI Stats ───────────────────────────────────────────────────── */}
            <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
                <StatsGrid />
            </motion.div>

            {/* ── Revenue chart ───────────────────────────────────────────────── */}
            <motion.div variants={itemVariants}>
                <RevenueChart />
            </motion.div>

            {/* ── Two-column: TopProducts + OrdersChart ───────────────────────── */}
            <motion.div
                variants={itemVariants}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '60% 40%',
                    gap: '20px',
                    marginBottom: '20px',
                }}
            >
                <TopProducts />
                <OrdersChart />
            </motion.div>

            {/* ── Recent orders table ─────────────────────────────────────────── */}
            <motion.div variants={itemVariants}>
                <RecentOrders />
            </motion.div>

            {/* ── Live activity feed ──────────────────────────────────────────── */}
            <motion.div variants={itemVariants}>
                <LiveActivity />
            </motion.div>
        </motion.div>
    );
}

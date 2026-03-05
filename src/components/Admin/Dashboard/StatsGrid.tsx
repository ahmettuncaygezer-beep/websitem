'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { StatCard } from './StatCard';
import type { KpiData } from '@/types/admin/analytics';

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

function buildKpis(stats: any): KpiData[] {
    return [
        {
            id: 'revenue',
            label: 'Toplam Gelir',
            value: `₺${((stats.totalRevenue || 0) / 1000).toFixed(1)}K`,
            trend: 12.5,
            trendUp: true,
            subtitle: 'Bu ay',
            color: '#C9A96E',
            sparklineData: [35, 42, 38, 50, 44, 55, 60],
        },
        {
            id: 'orders',
            label: 'Toplam Sipariş',
            value: `${stats.totalOrders || 0}`,
            trend: 8.2,
            trendUp: true,
            subtitle: 'Bu ay',
            color: '#0A84FF',
            sparklineData: [20, 18, 25, 22, 30, 28, 35],
        },
        {
            id: 'customers',
            label: 'Toplam Müşteri',
            value: `${stats.totalCustomers || 0}`,
            trend: 5.1,
            trendUp: true,
            subtitle: 'Kayıtlı',
            color: '#30D158',
            sparklineData: [15, 18, 20, 22, 25, 28, 32],
        },
        {
            id: 'products',
            label: 'Toplam Ürün',
            value: `${stats.totalProducts || 0}`,
            trend: 2,
            trendUp: true,
            subtitle: 'Aktif',
            color: '#BF5AF2',
            sparklineData: [10, 12, 11, 14, 13, 15, 16],
        },
    ];
}

export function StatsGrid() {
    const [kpis, setKpis] = useState<KpiData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const res = await fetch('/api/admin/dashboard');
                const data = await res.json();
                if (data.stats) {
                    setKpis(buildKpis(data.stats));
                }
            } catch (err) {
                console.error('Dashboard KPI fetch failed:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{
                        background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '12px', padding: '20px', height: '120px',
                        animation: 'pulse 1.5s ease-in-out infinite'
                    }} />
                ))}
                <style>{`@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
            </div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            role="region"
            aria-label="KPI istatistikleri"
        >
            {kpis.map((kpi, i) => (
                <StatCard key={kpi.id} data={kpi} index={i} />
            ))}
        </motion.div>
    );
}

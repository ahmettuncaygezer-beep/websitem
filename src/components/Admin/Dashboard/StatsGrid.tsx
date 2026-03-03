'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { StatCard } from './StatCard';
import { mockKPIs } from '@/lib/mock/analytics';

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

export function StatsGrid() {
    const [kpis, setKpis] = useState(mockKPIs);

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const res = await fetch('/api/admin/dashboard');
                const data = await res.json();
                if (data.stats) {
                    const s = data.stats;
                    // Update KPIs with real data
                    setKpis(prev => prev.map(kpi => {
                        if (kpi.label?.includes('Gelir')) return { ...kpi, value: `₺${(s.totalRevenue / 1000).toFixed(1)}K` };
                        if (kpi.label?.includes('Sipariş')) return { ...kpi, value: `${s.totalOrders}` };
                        if (kpi.label?.includes('Müşteri')) return { ...kpi, value: `${s.totalCustomers}` };
                        if (kpi.label?.includes('Stok') || kpi.label?.includes('Ürün')) return { ...kpi, value: `${s.totalProducts}` };
                        return kpi;
                    }));
                }
            } catch { /* keep mock KPIs */ }
        }
        fetchDashboard();
    }, []);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-4"
            style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
            role="region"
            aria-label="KPI istatistikleri"
        >
            {kpis.map((kpi, i) => (
                <StatCard key={kpi.id} data={kpi} index={i} />
            ))}
        </motion.div>
    );
}

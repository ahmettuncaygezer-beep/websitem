'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StatCard } from './StatCard';
import { mockKPIs } from '@/lib/mock/analytics';

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

export function StatsGrid() {
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
            {mockKPIs.map((kpi, i) => (
                <StatCard key={kpi.id} data={kpi} index={i} />
            ))}
        </motion.div>
    );
}

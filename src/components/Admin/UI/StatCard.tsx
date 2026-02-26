import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number;
    trend?: string;
    trendType?: 'positive' | 'negative' | 'neutral';
    icon: LucideIcon;
    description?: string;
    className?: string;
    delay?: number;
}

export function StatCard({
    label,
    value,
    trend,
    trendType = 'neutral',
    icon: Icon,
    description,
    className,
    delay = 0,
}: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: [0.33, 1, 0.68, 1] }}
            className={cn(
                'group relative overflow-hidden rounded-[24px] bg-admin-card p-6 border border-admin-border hover:border-admin-border-accent transition-all duration-500',
                className
            )}
        >
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-admin-text-dim group-hover:text-admin-text-secondary transition-colors">
                        {label}
                    </p>
                    <h3 className="text-2xl font-serif text-admin-text-primary">
                        {value}
                    </h3>
                </div>
                <div className="p-3 bg-admin-bg rounded-2xl text-admin-gold group-hover:bg-admin-gold group-hover:text-admin-sidebar transition-all duration-500">
                    <Icon size={20} />
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
                {trend && (
                    <div
                        className={cn(
                            'flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full',
                            trendType === 'positive' && 'bg-admin-success/10 text-admin-success',
                            trendType === 'negative' && 'bg-admin-error/10 text-admin-error',
                            trendType === 'neutral' && 'bg-admin-text-dim/10 text-admin-text-dim'
                        )}
                    >
                        {trendType === 'positive' && <TrendingUp size={10} />}
                        {trendType === 'negative' && <TrendingDown size={10} />}
                        {trend}
                    </div>
                )}
                {description && (
                    <span className="text-[10px] text-admin-text-dim">{description}</span>
                )}
            </div>

            {/* Decorative Glow */}
            <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-admin-gold/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.div>
    );
}

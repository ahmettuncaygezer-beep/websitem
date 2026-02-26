import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface DataCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    actions?: React.ReactNode;
}

export function DataCard({
    title,
    subtitle,
    children,
    footer,
    className,
    actions,
}: DataCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
                'flex flex-col rounded-[32px] bg-admin-card border border-admin-border overflow-hidden',
                className
            )}
        >
            <div className="flex items-center justify-between p-8">
                <div>
                    <h3 className="text-xl font-serif text-admin-text-primary">{title}</h3>
                    {subtitle && (
                        <p className="text-xs font-sans text-admin-text-dim mt-1">{subtitle}</p>
                    )}
                </div>
                {actions && <div className="flex gap-2">{actions}</div>}
            </div>

            <div className="flex-1 px-8 pb-8">{children}</div>

            {footer && (
                <div className="px-8 py-6 bg-admin-bg/50 border-t border-admin-border flex items-center justify-between">
                    {footer}
                </div>
            )}
        </motion.div>
    );
}

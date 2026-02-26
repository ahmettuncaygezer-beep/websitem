import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const adminBadgeVariants = cva(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default: 'bg-admin-gold/10 text-admin-gold border border-admin-gold/20',
                success: 'bg-admin-success/10 text-admin-success border border-admin-success/20',
                error: 'bg-admin-error/10 text-admin-error border border-admin-error/20',
                warning: 'bg-admin-warning/10 text-admin-warning border border-admin-warning/20',
                info: 'bg-admin-info/10 text-admin-info border border-admin-info/20',
                secondary: 'bg-admin-card text-admin-text-secondary border border-admin-border',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface AdminBadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof adminBadgeVariants> { }

function AdminBadge({ className, variant, ...props }: AdminBadgeProps) {
    return (
        <div className={cn(adminBadgeVariants({ variant }), className)} {...props} />
    );
}

export { AdminBadge, adminBadgeVariants };

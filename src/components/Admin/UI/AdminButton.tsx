import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

const adminButtonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-admin-gold disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary: 'bg-admin-gold text-admin-sidebar hover:bg-admin-gold-hover shadow-lg shadow-admin-gold/10',
                secondary: 'bg-admin-card text-admin-text-primary border border-admin-border hover:bg-admin-card-hover',
                outline: 'bg-transparent text-admin-gold border border-admin-gold/30 hover:border-admin-gold hover:bg-admin-gold/5',
                ghost: 'bg-transparent text-admin-text-secondary hover:text-admin-text-primary hover:bg-white/5',
                destructive: 'bg-admin-error/10 text-admin-error border border-admin-error/20 hover:bg-admin-error/20',
            },
            size: {
                default: 'h-10 px-5 py-2',
                sm: 'h-8 px-3 text-xs',
                lg: 'h-12 px-8 text-base',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default',
        },
    }
);

interface AdminButtonProps
    extends Omit<HTMLMotionProps<'button'>, keyof VariantProps<typeof adminButtonVariants>>,
    VariantProps<typeof adminButtonVariants> {
    isLoading?: boolean;
}

const AdminButton = React.forwardRef<HTMLButtonElement, AdminButtonProps>(
    ({ className, variant, size, isLoading, children, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={cn(adminButtonVariants({ variant, size, className }))}
                {...props}
            >
                {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                <>{children}</>
            </motion.button>
        );
    }
);

AdminButton.displayName = 'AdminButton';

export { AdminButton, adminButtonVariants };

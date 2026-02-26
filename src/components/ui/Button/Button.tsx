'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonVariants, type ButtonVariantProps } from './button.variants';
import { Spinner } from '../Spinner/Spinner';

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    ButtonVariantProps {
    children?: React.ReactNode;
    /** Show spinner and disable pointer events */
    loading?: boolean;
    /** Icon to show before children */
    icon?: React.ReactNode;
    /** Icon to show after children */
    iconRight?: React.ReactNode;
    /** Use motion.button for tap animation (default: true) */
    animated?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            shape,
            fullWidth,
            loading = false,
            icon,
            iconRight,
            animated = true,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const cls = cn(
            buttonVariants({ variant, size, shape, fullWidth }),
            loading && 'cursor-wait',
            className
        );

        const content = (
            <>
                {loading && <Spinner size="sm" className="text-current opacity-70" />}
                {!loading && icon && <span className="shrink-0">{icon}</span>}
                {children && <span>{children}</span>}
                {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
            </>
        );

        if (animated) {
            return (
                <motion.button
                    ref={ref as React.Ref<HTMLButtonElement>}
                    className={cls}
                    disabled={disabled || loading}
                    whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
                    transition={{ duration: 0.1 }}
                    {...(props as React.ComponentProps<typeof motion.button>)}
                >
                    {content}
                </motion.button>
            );
        }

        return (
            <button
                ref={ref}
                className={cls}
                disabled={disabled || loading}
                {...props}
            >
                {content}
            </button>
        );
    }
);

Button.displayName = 'Button';

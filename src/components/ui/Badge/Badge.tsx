'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
    [
        'inline-flex items-center justify-center',
        'font-semibold tracking-widest uppercase',
        'leading-none',
        'rounded-[2px]',
        'select-none',
        'whitespace-nowrap',
    ],
    {
        variants: {
            variant: {
                new: 'bg-[#C9A96E] text-[#1C1C1E]',
                sale: 'bg-[#E53935] text-white',
                limited: 'bg-[#FF9800] text-white',
                soldout: 'bg-[#ABABAB] text-white',
                trending: 'bg-[#1C1C1E] text-white',
                free: 'bg-[#4CAF50] text-white',
                info: 'bg-[#3B82F6] text-white',
                // Outline variants
                outlineGold: 'border border-[#C9A96E] text-[#C9A96E] bg-transparent',
                outlineDark: 'border border-[#1C1C1E] text-[#1C1C1E] bg-transparent',
                muted: 'bg-[#F5F0EB] text-[#666]',
            },
            size: {
                xs: 'text-[9px]  px-1.5 py-0.5',
                sm: 'text-[10px] px-2   py-1',    // DEFAULT
                md: 'text-[12px] px-2.5 py-1',
            },
        },
        defaultVariants: {
            variant: 'new',
            size: 'sm',
        },
    }
);

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;
export type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>['size']>;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
    children: React.ReactNode;
}

export function Badge({ variant, size, className, children, ...props }: BadgeProps) {
    return (
        <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
            {children}
        </span>
    );
}

// Convenience exports for common badge types
export const NewBadge = (p: Omit<BadgeProps, 'variant'>) => <Badge variant="new"      {...p}>YENİ</Badge>;
export const SaleBadge = ({ label, ...p }: Omit<BadgeProps, 'variant'> & { label: string }) => <Badge variant="sale"     {...p}>{label}</Badge>;
export const LimitedBadge = (p: Omit<BadgeProps, 'variant'>) => <Badge variant="limited"  {...p}>SINIRLI</Badge>;
export const SoldOutBadge = (p: Omit<BadgeProps, 'variant'>) => <Badge variant="soldout"  {...p}>TÜKENDİ</Badge>;
export const TrendingBadge = (p: Omit<BadgeProps, 'variant'>) => <Badge variant="trending" {...p}>TREND</Badge>;
export const FreeBadge = (p: Omit<BadgeProps, 'variant'>) => <Badge variant="free"     {...p}>ÜCRETSİZ KARGO</Badge>;

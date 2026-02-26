import { cn } from '@/lib/utils';
import React from 'react';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type IconColor = 'current' | 'primary' | 'gold' | 'muted' | 'white';

interface IconProps {
    /** Lucide (or any) icon element */
    icon: React.ReactElement;
    size?: IconSize;
    color?: IconColor;
    /** Accessible label — if provided, aria-hidden is NOT set */
    label?: string;
    className?: string;
}

const sizeMap: Record<IconSize, number> = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
};

const colorMap: Record<IconColor, string> = {
    current: 'text-current',
    primary: 'text-[#1C1C1E] dark:text-[#F5F0EB]',
    gold: 'text-[#C9A96E]',
    muted: 'text-[#666666] dark:text-[#636366]',
    white: 'text-white',
};

export function Icon({ icon, size = 'md', color = 'current', label, className }: IconProps) {
    const px = sizeMap[size];

    return (
        <span
            className={cn('inline-flex shrink-0', colorMap[color], className)}
            aria-hidden={!label}
            aria-label={label}
            role={label ? 'img' : undefined}
        >
            {React.cloneElement(icon, {
                width: px,
                height: px,
                'aria-hidden': true,
            } as React.HTMLAttributes<SVGElement>)}
        </span>
    );
}

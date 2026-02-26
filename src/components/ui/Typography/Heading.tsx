import { cn } from '@/lib/utils';
import React from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    /** Semantic heading level rendered in the DOM */
    as?: HeadingLevel;
    /** Visual size override (defaults to as level) */
    size?: HeadingLevel;
    /** Use fluid clamp typography (responsive) */
    fluid?: boolean;
    children: React.ReactNode;
}

const levelClasses: Record<HeadingLevel, string> = {
    h1: 'text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.1] tracking-[-0.04em]',
    h2: 'text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.025em]',
    h3: 'text-[clamp(1.125rem,2vw,1.5rem)] font-semibold leading-[1.25] tracking-[-0.02em]',
    h4: 'text-[1.125rem] font-semibold leading-[1.3]',
    h5: 'text-[1rem]    font-semibold leading-[1.4]',
    h6: 'text-[0.875rem] font-semibold leading-[1.5]',
};

const staticClasses: Record<HeadingLevel, string> = {
    h1: 'text-5xl font-bold leading-[1.1] tracking-[-0.04em]',
    h2: 'text-3xl font-bold leading-[1.15] tracking-[-0.025em]',
    h3: 'text-2xl font-semibold leading-[1.25] tracking-[-0.02em]',
    h4: 'text-xl  font-semibold leading-[1.3]',
    h5: 'text-lg  font-semibold leading-[1.4]',
    h6: 'text-base font-semibold leading-[1.5]',
};

export function Heading({
    as: Tag = 'h2',
    size,
    fluid = true,
    className,
    children,
    ...props
}: HeadingProps) {
    const effectiveSize = size ?? Tag;
    const sizeClass = fluid ? levelClasses[effectiveSize] : staticClasses[effectiveSize];

    return (
        <Tag
            className={cn(
                'font-heading text-[#1C1C1E] dark:text-[#F5F0EB]',
                sizeClass,
                className
            )}
            {...props}
        >
            {children}
        </Tag>
    );
}

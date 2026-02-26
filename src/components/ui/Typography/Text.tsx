import { cn } from '@/lib/utils';
import React from 'react';

type TextTag = 'p' | 'span' | 'div' | 'small' | 'strong' | 'em' | 'caption';
type TextSize = '2xs' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
type TextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
type TextColor = 'primary' | 'secondary' | 'muted' | 'disabled' | 'gold' | 'inverse' | 'inherit';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
    as?: TextTag;
    size?: TextSize;
    weight?: TextWeight;
    color?: TextColor;
    children: React.ReactNode;
}

const sizeMap: Record<TextSize, string> = {
    '2xs': 'text-[10px] leading-[14px] tracking-[0.05em]',
    xs: 'text-[11px] leading-[16px] tracking-[0.04em]',
    sm: 'text-[12px] leading-[18px] tracking-[0.01em]',
    base: 'text-[13px] leading-[20px]',
    md: 'text-[14px] leading-[22px] tracking-[-0.01em]',
    lg: 'text-[16px] leading-[24px] tracking-[-0.01em]',
    xl: 'text-[18px] leading-[28px] tracking-[-0.02em]',
};

const weightMap: Record<TextWeight, string> = {
    light: 'font-light',
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
};

const colorMap: Record<TextColor, string> = {
    primary: 'text-[#1C1C1E] dark:text-[#F5F0EB]',
    secondary: 'text-[#4A4A4A] dark:text-[#AEAEB2]',
    muted: 'text-[#666666] dark:text-[#636366]',
    disabled: 'text-[#999999] dark:text-[#3A3A3C]',
    gold: 'text-[#C9A96E]',
    inverse: 'text-white',
    inherit: '',
};

export function Text({
    as: Tag = 'p',
    size = 'md',
    weight = 'regular',
    color = 'primary',
    className,
    children,
    ...props
}: TextProps) {
    return (
        <Tag
            className={cn(
                'font-body',
                sizeMap[size],
                weightMap[weight],
                colorMap[color],
                className
            )}
            {...(props as React.HTMLAttributes<HTMLParagraphElement>)}
        >
            {children}
        </Tag>
    );
}

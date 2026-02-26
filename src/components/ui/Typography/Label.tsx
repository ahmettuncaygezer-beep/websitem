import { cn } from '@/lib/utils';
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
    /** Mark field as required — adds red asterisk */
    required?: boolean;
}

export function Label({ className, children, required, ...props }: LabelProps) {
    return (
        <label
            className={cn(
                'block font-body text-[12px] font-medium leading-tight',
                'text-[#1C1C1E] dark:text-[#F5F0EB]',
                'mb-1.5',
                className
            )}
            {...props}
        >
            {children}
            {required && (
                <span className="ml-0.5 text-[#E53935]" aria-hidden="true">
                    *
                </span>
            )}
        </label>
    );
}

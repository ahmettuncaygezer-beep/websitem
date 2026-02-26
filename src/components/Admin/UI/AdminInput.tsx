import React from 'react';
import { cn } from '@/lib/utils';

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

const AdminInput = React.forwardRef<HTMLInputElement, AdminInputProps>(
    ({ className, label, error, icon, ...props }, ref) => {
        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label className="text-xs font-semibold uppercase tracking-wider text-admin-text-secondary ml-1">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-dim group-focus-within:text-admin-gold transition-colors">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            'flex h-11 w-full rounded-xl border border-admin-border bg-admin-card px-4 py-2 text-sm text-admin-text-primary ring-offset-admin-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-admin-text-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-admin-gold/20 focus-visible:border-admin-gold/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
                            icon && 'pl-10',
                            error && 'border-admin-error focus-visible:ring-admin-error/20',
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-[10px] font-medium text-admin-error ml-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

AdminInput.displayName = 'AdminInput';

export { AdminInput };

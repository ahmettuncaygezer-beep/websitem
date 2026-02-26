import { cn } from '@/lib/utils';

interface DividerProps {
    /** Line style */
    variant?: 'solid' | 'dashed' | 'gold' | 'gradient';
    /** Orientation */
    orientation?: 'horizontal' | 'vertical';
    /** Optional center label (e.g. "veya") */
    label?: string;
    /** Height for vertical divider */
    height?: string | number;
    className?: string;
}

export function Divider({
    variant = 'solid',
    orientation = 'horizontal',
    label,
    height = '100%',
    className,
}: DividerProps) {
    // Vertical divider
    if (orientation === 'vertical') {
        return (
            <span
                role="separator"
                aria-orientation="vertical"
                className={cn('inline-block w-px bg-[#E8E3DC] dark:bg-white/10', className)}
                style={{ height }}
            />
        );
    }

    // Horizontal with label
    if (label) {
        return (
            <div className={cn('flex items-center gap-3', className)} role="separator">
                <div className="flex-1 border-t border-[#E8E3DC] dark:border-white/10" />
                <span className="shrink-0 text-[11px] font-medium text-[#999] uppercase tracking-widest">
                    {label}
                </span>
                <div className="flex-1 border-t border-[#E8E3DC] dark:border-white/10" />
            </div>
        );
    }

    // Plain horizontal
    const lineClass = {
        solid: 'border-t border-[#E8E3DC] dark:border-white/10',
        dashed: 'border-t border-dashed border-[#E8E3DC] dark:border-white/10',
        gold: 'border-t-2 border-[#C9A96E]',
        gradient: '',
    }[variant];

    if (variant === 'gradient') {
        return (
            <hr
                role="separator"
                className={cn('border-none h-px', className)}
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, #C9A96E 50%, transparent 100%)',
                    opacity: 0.6,
                }}
            />
        );
    }

    return (
        <hr
            role="separator"
            className={cn('border-none', lineClass, className)}
        />
    );
}

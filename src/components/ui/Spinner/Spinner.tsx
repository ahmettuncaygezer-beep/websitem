import { cn } from '@/lib/utils';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const sizeMap = {
    sm: 'w-4  h-4  border-2',
    md: 'w-6  h-6  border-2',
    lg: 'w-8  h-8  border-[3px]',
    xl: 'w-12 h-12 border-4',
} as const;

export function Spinner({ size = 'md', className }: SpinnerProps) {
    return (
        <span
            role="status"
            aria-label="Yükleniyor"
            className={cn(
                'inline-block rounded-full animate-spin',
                // Outer ring: cream
                'border-[#E8E3DC]',
                // Top segment: gold
                'border-t-[#C9A96E]',
                sizeMap[size],
                className
            )}
            style={{ animationDuration: '800ms' }}
        />
    );
}

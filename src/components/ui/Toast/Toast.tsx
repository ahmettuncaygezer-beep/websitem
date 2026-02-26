'use client';

import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastData {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
    duration?: number;  // ms, default 4000
}

const icons: Record<ToastType, React.FC<{ className?: string }>> = {
    success: ({ className }) => <CheckCircle2 className={cn('w-5 h-5', className)} />,
    error: ({ className }) => <XCircle className={cn('w-5 h-5', className)} />,
    warning: ({ className }) => <AlertTriangle className={cn('w-5 h-5', className)} />,
    info: ({ className }) => <Info className={cn('w-5 h-5', className)} />,
};

const styles: Record<ToastType, { icon: string; bar: string; border: string }> = {
    success: { icon: 'text-[#4CAF50]', bar: 'bg-[#4CAF50]', border: 'border-l-[#4CAF50]' },
    error: { icon: 'text-[#E53935]', bar: 'bg-[#E53935]', border: 'border-l-[#E53935]' },
    warning: { icon: 'text-[#FF9800]', bar: 'bg-[#FF9800]', border: 'border-l-[#FF9800]' },
    info: { icon: 'text-[#3B82F6]', bar: 'bg-[#3B82F6]', border: 'border-l-[#3B82F6]' },
};

interface ToastProps {
    toast: ToastData;
    onDismiss: (id: string) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
    const { id, type, title, description, duration = 4000 } = toast;
    const s = styles[type];
    const IconComp = icons[type];

    const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (Math.abs(info.offset.x) > 100) onDismiss(id);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            drag="x"
            dragConstraints={{ left: -50, right: 200 }}
            dragElastic={0.3}
            onDragEnd={handleDragEnd}
            className={cn(
                'relative overflow-hidden',
                'flex items-start gap-3',
                'w-80 max-w-[calc(100vw-2rem)] p-4',
                'bg-white dark:bg-[#2C2C2E]',
                'rounded-[4px]',
                'border border-[#E8E3DC] dark:border-white/10',
                'border-l-4',
                s.border,
                'shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
                'cursor-grab active:cursor-grabbing',
                'select-none',
            )}
            role="alert"
            aria-live="polite"
        >
            {/* Icon */}
            <div className="shrink-0 mt-0.5">
                <IconComp className={s.icon} />
            </div>

            {/* Content */}
            <div className="flex-1 pr-2 min-w-0">
                <p className="text-[13px] font-semibold text-[#1C1C1E] dark:text-[#F5F0EB] leading-tight">
                    {title}
                </p>
                {description && (
                    <p className="mt-0.5 text-[12px] text-[#666] dark:text-[#AEAEB2] leading-snug">
                        {description}
                    </p>
                )}
            </div>

            {/* Close button */}
            <button
                onClick={() => onDismiss(id)}
                className="shrink-0 mt-0.5 p-0.5 rounded text-[#999] hover:text-[#1C1C1E] dark:hover:text-[#F5F0EB] transition-colors"
                aria-label="Kapat"
            >
                <X className="w-4 h-4" />
            </button>

            {/* Progress bar */}
            <motion.div
                className={cn('absolute bottom-0 left-0 h-[2px]', s.bar)}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
                onAnimationComplete={() => onDismiss(id)}
            />
        </motion.div>
    );
}

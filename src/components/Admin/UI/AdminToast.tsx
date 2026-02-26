'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { Toast, ToastVariant } from '@/lib/hooks/useToast';

interface AdminToastProps {
    toasts: Toast[];
    removeToast: (id: string) => void;
}

const icons: Record<ToastVariant, React.ReactNode> = {
    success: <CheckCircle2 size={18} className="text-[#30D158] flex-shrink-0" />,
    error: <XCircle size={18} className="text-[#FF453A] flex-shrink-0" />,
    warning: <AlertTriangle size={18} className="text-[#FFD60A] flex-shrink-0" />,
    info: <Info size={18} className="text-[#0A84FF] flex-shrink-0" />,
};

const borders: Record<ToastVariant, string> = {
    success: 'border-[#30D158]/20',
    error: 'border-[#FF453A]/20',
    warning: 'border-[#FFD60A]/20',
    info: 'border-[#0A84FF]/20',
};

export function AdminToast({ toasts, removeToast }: AdminToastProps) {
    return (
        <div
            aria-live="polite"
            aria-label="Bildirimler"
            className="fixed top-4 right-4 z-[2000] flex flex-col gap-2 pointer-events-none"
        >
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className={`pointer-events-auto flex items-start gap-3 min-w-[280px] max-w-[360px] bg-[#1C1C1E] border ${borders[toast.variant]} rounded-lg p-3 shadow-[0_16px_40px_rgba(0,0,0,0.5)]`}
                    >
                        <div className="mt-0.5">{icons[toast.variant]}</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-[#F5F0EB]">{toast.title}</p>
                            {toast.description && (
                                <p className="text-[11px] text-[#AEAEB2] mt-0.5 leading-relaxed">{toast.description}</p>
                            )}
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            aria-label="Bildirimi kapat"
                            className="text-[#636366] hover:text-[#AEAEB2] transition-colors p-0.5 flex-shrink-0"
                        >
                            <X size={14} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

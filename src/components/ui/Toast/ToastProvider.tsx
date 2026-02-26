'use client';

import React, {
    createContext,
    useCallback,
    useContext,
    useId,
    useRef,
    useState,
} from 'react';
import { AnimatePresence } from 'framer-motion';
import { Toast, type ToastData, type ToastType } from './Toast';

// ── Context ────────────────────────────────────────────────────────────
interface ToastContextValue {
    toast: {
        success: (title: string, description?: string, duration?: number) => void;
        error: (title: string, description?: string, duration?: number) => void;
        warning: (title: string, description?: string, duration?: number) => void;
        info: (title: string, description?: string, duration?: number) => void;
        dismiss: (id: string) => void;
    };
}

const ToastContext = createContext<ToastContextValue | null>(null);

// ── Hook ───────────────────────────────────────────────────────────────
export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error('useToast must be used within <ToastProvider>');
    }
    return ctx;
}

// ── Provider ───────────────────────────────────────────────────────────
const MAX_TOASTS = 3;

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastData[]>([]);
    const counterRef = useRef(0);

    const add = useCallback((type: ToastType, title: string, description?: string, duration?: number) => {
        const id = `toast-${++counterRef.current}`;
        setToasts(prev => {
            const next = [...prev, { id, type, title, description, duration }];
            // Keep max 3 — remove oldest
            return next.length > MAX_TOASTS ? next.slice(next.length - MAX_TOASTS) : next;
        });
    }, []);

    const dismiss = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const toast = {
        success: (t: string, d?: string, dur?: number) => add('success', t, d, dur),
        error: (t: string, d?: string, dur?: number) => add('error', t, d, dur),
        warning: (t: string, d?: string, dur?: number) => add('warning', t, d, dur),
        info: (t: string, d?: string, dur?: number) => add('info', t, d, dur),
        dismiss,
    };

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}

            {/* Toast container — top-right on desktop, top-center on mobile */}
            <div
                aria-label="Bildirimler"
                role="region"
                className="
          fixed z-[9999]
          flex flex-col gap-2
          top-4 right-4
          max-sm:right-0 max-sm:left-0 max-sm:items-center max-sm:px-4
          pointer-events-none
        "
            >
                <AnimatePresence mode="popLayout">
                    {toasts.map(t => (
                        <div key={t.id} className="pointer-events-auto">
                            <Toast toast={t} onDismiss={dismiss} />
                        </div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

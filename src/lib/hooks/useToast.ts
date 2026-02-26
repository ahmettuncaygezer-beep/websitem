'use client';

import { useState, useCallback, useRef } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    title: string;
    description?: string;
    variant: ToastVariant;
}

let idCounter = 0;

export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback(
        (toast: Omit<Toast, 'id'>) => {
            const id = `toast-${++idCounter}`;
            setToasts((prev) => [...prev, { ...toast, id }]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 4000);
        },
        []
    );

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return { toasts, addToast, removeToast };
}

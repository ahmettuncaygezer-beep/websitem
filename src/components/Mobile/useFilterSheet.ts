'use client';

import { useState, useCallback, useEffect } from 'react';

export interface FilterSheetState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export function useFilterSheet(): FilterSheetState {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen(v => !v), []);

    // Body scroll lock
    useEffect(() => {
        if (!isOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, [isOpen]);

    return { isOpen, open, close, toggle };
}

'use client';

import { useState, useEffect, useCallback } from 'react';

export function useCommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const open = useCallback(() => {
        setIsOpen(true);
        setQuery('');
        setSelectedIndex(0);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        setQuery('');
        setSelectedIndex(0);
    }, []);

    const toggle = useCallback(() => {
        if (isOpen) {
            close();
        } else {
            open();
        }
    }, [isOpen, open, close]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                toggle();
            }
            if (e.key === 'Escape' && isOpen) {
                close();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, toggle, close]);

    return {
        isOpen,
        query,
        setQuery,
        selectedIndex,
        setSelectedIndex,
        open,
        close,
        toggle,
    };
}

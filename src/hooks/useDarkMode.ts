'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'colorScheme';

export function useDarkMode() {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Read current state from html class (set by inline script)
        setIsDark(document.documentElement.classList.contains('dark'));

        // Listen for system preference changes
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            const stored = localStorage.getItem(STORAGE_KEY);
            // Only auto-switch if user hasn't manually overridden
            if (!stored) {
                applyTheme(e.matches ? 'dark' : 'light');
                setIsDark(e.matches);
            }
        };
        mq.addEventListener('change', handleChange);
        return () => mq.removeEventListener('change', handleChange);
    }, []);

    const applyTheme = (theme: 'dark' | 'light') => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const toggle = useCallback(() => {
        const next = !isDark;
        const theme = next ? 'dark' : 'light';
        applyTheme(theme);
        localStorage.setItem(STORAGE_KEY, theme);
        setIsDark(next);
    }, [isDark]);

    const setTheme = useCallback((theme: 'dark' | 'light' | 'system') => {
        if (theme === 'system') {
            localStorage.removeItem(STORAGE_KEY);
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
            setIsDark(prefersDark);
        } else {
            applyTheme(theme);
            localStorage.setItem(STORAGE_KEY, theme);
            setIsDark(theme === 'dark');
        }
    }, []);

    return { isDark, toggle, setTheme, mounted };
}

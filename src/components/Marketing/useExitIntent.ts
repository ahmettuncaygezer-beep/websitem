'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'exitPopupSeen';
const COOLDOWN_DAYS = 7;

export function useExitIntent() {
    const [shouldShow, setShouldShow] = useState(false);

    const checkCooldown = useCallback((): boolean => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return true;
            const seenAt = new Date(raw).getTime();
            const diff = Date.now() - seenAt;
            return diff > COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
        } catch {
            return true;
        }
    }, []);

    const markSeen = useCallback(() => {
        try {
            localStorage.setItem(STORAGE_KEY, new Date().toISOString());
        } catch {
            // ignore
        }
    }, []);

    const trigger = useCallback(() => {
        if (!checkCooldown()) return;
        setShouldShow(true);
        markSeen();
    }, [checkCooldown, markSeen]);

    const dismiss = useCallback(() => {
        setShouldShow(false);
    }, []);

    useEffect(() => {
        // Desktop: mouse exit from top
        const handleMouseMove = (e: MouseEvent) => {
            if (e.clientY < 20) trigger();
        };

        // Mobile: visibility change (user switching tabs)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') trigger();
        };

        // Delay attaching to avoid false positives on page load
        const timer = setTimeout(() => {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('visibilitychange', handleVisibilityChange);
        }, 5000);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [trigger]);

    return { shouldShow, dismiss };
}

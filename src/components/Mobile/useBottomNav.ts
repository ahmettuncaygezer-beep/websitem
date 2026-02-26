'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';

export interface BottomNavState {
    isVisible: boolean;
    activeHref: string;
}

export function useBottomNav(): BottomNavState {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    // Handle scroll hide/show
    useEffect(() => {
        const handleScroll = () => {
            if (ticking.current) return;
            ticking.current = true;
            requestAnimationFrame(() => {
                const current = window.scrollY;
                const delta = current - lastScrollY.current;
                if (delta > 8 && current > 100) {
                    setIsVisible(false);
                } else if (delta < -8) {
                    setIsVisible(true);
                }
                lastScrollY.current = current;
                ticking.current = false;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Hide when keyboard opens (visualViewport)
    useEffect(() => {
        const vp = window.visualViewport;
        if (!vp) return;
        const handleResize = () => {
            const isKeyboardOpen = vp.height < window.innerHeight * 0.75;
            if (isKeyboardOpen) setIsVisible(false);
            else setIsVisible(true);
        };
        vp.addEventListener('resize', handleResize);
        return () => vp.removeEventListener('resize', handleResize);
    }, []);

    return { isVisible, activeHref: pathname };
}

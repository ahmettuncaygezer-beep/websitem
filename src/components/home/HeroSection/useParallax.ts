'use client';

import { useState, useEffect } from 'react';

export function useParallax(factor = 0.4) {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        // Disable parallax on mobile for performance
        if (typeof window === 'undefined' || window.innerWidth < 768) return;

        let rafId: number | null = null;

        const onScroll = () => {
            if (rafId !== null) return;
            rafId = requestAnimationFrame(() => {
                setOffsetY(window.scrollY);
                rafId = null;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);

    return offsetY * factor;
}

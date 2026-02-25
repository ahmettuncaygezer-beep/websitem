'use client';

import { useState, useEffect } from 'react';

const SPANS = {
    desktop: [5, 7, 5, 7, 5, 7],
    tablet: [5, 7, 5, 7, 5, 5],
    mobile: [5, 5, 5, 5, 5, 5],
};

type Breakpoint = 'desktop' | 'tablet' | 'mobile';

function getBreakpoint(w: number): Breakpoint {
    if (w >= 1024) return 'desktop';
    if (w >= 768) return 'tablet';
    return 'mobile';
}

export function useMasonry(count = 6) {
    const [bp, setBp] = useState<Breakpoint>('desktop');

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const update = () => setBp(getBreakpoint(window.innerWidth));
        update();
        window.addEventListener('resize', update, { passive: true });
        return () => window.removeEventListener('resize', update);
    }, []);

    const spans = SPANS[bp].slice(0, count);

    return {
        spans,
        isMobile: bp === 'mobile',
        isTablet: bp === 'tablet',
        isDesktop: bp === 'desktop',
    };
}

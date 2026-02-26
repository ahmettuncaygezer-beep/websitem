'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Returns shouldShow=true when the original "Sepete Ekle" button
 * is scrolled out of view (above the viewport).
 *
 * Pass the ref to the original button element.
 */
export function useStickyCart(targetRef: React.RefObject<HTMLElement | null>) {
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        const el = targetRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => setShouldShow(!entry.isIntersecting),
            { threshold: 0, rootMargin: '0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [targetRef]);

    return shouldShow;
}

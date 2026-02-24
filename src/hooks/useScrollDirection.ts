'use client';

import { useState, useEffect, useCallback } from 'react';

export function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
    const [scrollY, setScrollY] = useState(0);
    const [isAtTop, setIsAtTop] = useState(true);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        setIsAtTop(currentScrollY < 10);

        if (currentScrollY > scrollY && currentScrollY > 80) {
            setScrollDirection('down');
        } else if (currentScrollY < scrollY) {
            setScrollDirection('up');
        }
        setScrollY(currentScrollY);
    }, [scrollY]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return { scrollDirection, scrollY, isAtTop };
}

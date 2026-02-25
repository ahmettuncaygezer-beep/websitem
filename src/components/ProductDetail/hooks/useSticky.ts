'use client';

import { useState, useEffect } from 'react';

export function useSticky(threshold = 0.6) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const check = () => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            setIsVisible(scrollPercent > threshold);
        };
        window.addEventListener('scroll', check, { passive: true });
        check();
        return () => window.removeEventListener('scroll', check);
    }, [threshold]);

    return isVisible;
}

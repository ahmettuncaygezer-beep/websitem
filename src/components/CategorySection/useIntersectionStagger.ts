'use client';

import { useState, useEffect, useRef } from 'react';

export function useIntersectionStagger(count: number, delay = 100) {
    const [visibleItems, setVisibleItems] = useState<boolean[]>(
        new Array(count).fill(false)
    );
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    Array.from({ length: count }).forEach((_, i) => {
                        setTimeout(() => {
                            setVisibleItems((prev) => {
                                const next = [...prev];
                                next[i] = true;
                                return next;
                            });
                        }, i * delay);
                    });
                    observer.disconnect(); // fire once
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [count, delay]);

    return { containerRef, visibleItems };
}

'use client';

import { useState, useEffect, useRef } from 'react';

interface CountUpOptions {
    end: number;
    duration?: number; // ms, default 2000
    decimals?: number; // ondalık basamak, default 0
    startOnView?: boolean; // görünür olunca başla, default true
}

export function useCountUp({
    end,
    duration = 2000,
    decimals = 0,
    startOnView = true,
}: CountUpOptions) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!startOnView) {
            setHasStarted(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.3 }
        );

        const el = ref.current;
        if (el) observer.observe(el);
        return () => {
            if (el) observer.unobserve(el);
        };
    }, [hasStarted, startOnView]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime: number | null = null;
        const startValue = 0;

        // easeOutExpo: hızlı başla, yavaş bitir
        const easeOutExpo = (t: number) =>
            t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const current = startValue + (end - startValue) * easedProgress;

            setCount(parseFloat(current.toFixed(decimals)));

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    }, [hasStarted, end, duration, decimals]);

    return { count, ref };
}

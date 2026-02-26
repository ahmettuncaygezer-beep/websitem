'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

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
    const ref = useRef<HTMLElement | null>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    useEffect(() => {
        if (startOnView && !isInView) return;

        const controls = animate(0, end, {
            duration: duration / 1000,
            ease: "easeOut",
            onUpdate(value) {
                setCount(Number(value.toFixed(decimals)));
            },
        });

        return () => controls.stop();
    }, [end, duration, decimals, startOnView, isInView]);

    return { count, ref };
}

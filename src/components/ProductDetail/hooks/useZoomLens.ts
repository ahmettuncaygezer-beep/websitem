'use client';

import { useState, useCallback, useRef, type RefObject } from 'react';

export function useZoomLens(imageRef: RefObject<HTMLDivElement | null>) {
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [isActive, setIsActive] = useState(false);
    const rafId = useRef<number>(0);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!imageRef.current) return;
            cancelAnimationFrame(rafId.current);
            rafId.current = requestAnimationFrame(() => {
                const rect = imageRef.current!.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
            });
        },
        [imageRef]
    );

    const handleMouseEnter = useCallback(() => setIsActive(true), []);
    const handleMouseLeave = useCallback(() => {
        setIsActive(false);
        cancelAnimationFrame(rafId.current);
    }, []);

    return { position, isActive, handleMouseMove, handleMouseEnter, handleMouseLeave };
}

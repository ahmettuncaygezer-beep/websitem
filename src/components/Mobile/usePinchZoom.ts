'use client';

import { useState, useRef, useCallback } from 'react';

export interface PinchZoomState {
    scale: number;
    panX: number;
    panY: number;
    originX: number;
    originY: number;
    isZoomed: boolean;
    reset: () => void;
    doubleTap: (clientX: number, clientY: number, containerRect: DOMRect) => void;
    handlers: {
        onTouchStart: (e: React.TouchEvent) => void;
        onTouchMove: (e: React.TouchEvent) => void;
        onTouchEnd: (e: React.TouchEvent) => void;
    };
}

function getDistance(t1: React.Touch, t2: React.Touch) {
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
}

function getMidpoint(t1: React.Touch, t2: React.Touch) {
    return { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };
}

export function usePinchZoom(): PinchZoomState {
    const [scale, setScale] = useState(1);
    const [panX, setPanX] = useState(0);
    const [panY, setPanY] = useState(0);
    const [originX, setOriginX] = useState(0);
    const [originY, setOriginY] = useState(0);

    const initialDistance = useRef(0);
    const lastScale = useRef(1);
    const panStart = useRef({ x: 0, y: 0 });
    const lastPan = useRef({ x: 0, y: 0 });
    const lastTap = useRef(0);

    const reset = useCallback(() => {
        setScale(1);
        setPanX(0);
        setPanY(0);
        lastScale.current = 1;
        lastPan.current = { x: 0, y: 0 };
    }, []);

    const doubleTap = useCallback((clientX: number, clientY: number, containerRect: DOMRect) => {
        if (scale > 1) {
            reset();
        } else {
            const ox = clientX - containerRect.left;
            const oy = clientY - containerRect.top;
            setOriginX(ox);
            setOriginY(oy);
            setScale(2.5);
            lastScale.current = 2.5;
        }
    }, [scale, reset]);

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const mid = getMidpoint(e.touches[0], e.touches[1]);
            initialDistance.current = getDistance(e.touches[0], e.touches[1]);
            setOriginX(mid.x);
            setOriginY(mid.y);
        } else if (e.touches.length === 1 && scale > 1) {
            panStart.current = { x: e.touches[0].clientX - lastPan.current.x, y: e.touches[0].clientY - lastPan.current.y };
        }

        // Double tap detection
        const now = Date.now();
        if (now - lastTap.current < 300) {
            // Handled by parent via doubleTap()
        }
        lastTap.current = now;
    }, [scale]);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const dist = getDistance(e.touches[0], e.touches[1]);
            const newScale = Math.min(3, Math.max(1, (dist / initialDistance.current) * lastScale.current));
            setScale(newScale);
        } else if (e.touches.length === 1 && scale > 1) {
            const newPanX = e.touches[0].clientX - panStart.current.x;
            const newPanY = e.touches[0].clientY - panStart.current.y;
            setPanX(newPanX);
            setPanY(newPanY);
        }
    }, [scale]);

    const onTouchEnd = useCallback((e: React.TouchEvent) => {
        if (scale < 1.1) {
            reset();
        } else {
            lastScale.current = scale;
            lastPan.current = { x: panX, y: panY };
        }
    }, [scale, panX, panY, reset]);

    return {
        scale,
        panX,
        panY,
        originX,
        originY,
        isZoomed: scale > 1.05,
        reset,
        doubleTap,
        handlers: { onTouchStart, onTouchMove, onTouchEnd },
    };
}

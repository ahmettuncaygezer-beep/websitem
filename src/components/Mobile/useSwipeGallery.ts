'use client';

import { useState, useRef, useCallback } from 'react';

export interface SwipeGalleryState {
    currentIndex: number;
    dragOffset: number;
    isDragging: boolean;
    goTo: (index: number) => void;
    goNext: () => void;
    goPrev: () => void;
    handlers: {
        onTouchStart: (e: React.TouchEvent) => void;
        onTouchMove: (e: React.TouchEvent) => void;
        onTouchEnd: () => void;
    };
}

export function useSwipeGallery(count: number): SwipeGalleryState {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);

    const goTo = useCallback((index: number) => {
        setCurrentIndex(Math.max(0, Math.min(index, count - 1)));
        setDragOffset(0);
    }, [count]);

    const goNext = useCallback(() => {
        setCurrentIndex(prev => Math.min(prev + 1, count - 1));
        setDragOffset(0);
    }, [count]);

    const goPrev = useCallback(() => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
        setDragOffset(0);
    }, []);

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
        setIsDragging(true);
    }, []);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        const delta = e.touches[0].clientX - startX.current;
        setDragOffset(delta);
    }, []);

    const onTouchEnd = useCallback(() => {
        const threshold = 50;
        if (dragOffset < -threshold) {
            goNext();
        } else if (dragOffset > threshold) {
            goPrev();
        } else {
            setDragOffset(0);
        }
        setIsDragging(false);
    }, [dragOffset, goNext, goPrev]);

    return {
        currentIndex,
        dragOffset,
        isDragging,
        goTo,
        goNext,
        goPrev,
        handlers: { onTouchStart, onTouchMove, onTouchEnd },
    };
}

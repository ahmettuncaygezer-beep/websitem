'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryItem } from '../hooks/useProductGallery';

interface MainImageProps {
    item: GalleryItem;
    onOpenModal: () => void;
    zoomProps?: {
        isActive: boolean;
        position: { x: number; y: number };
        handleMouseMove: (e: React.MouseEvent) => void;
        handleMouseEnter: () => void;
        handleMouseLeave: () => void;
    };
    onSwipe?: (dir: 'left' | 'right') => void;
}

export function MainImage({ item, onOpenModal, zoomProps, onSwipe }: MainImageProps) {
    const touchRef = useRef(0);

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        touchRef.current = e.touches[0].clientX;
    }, []);

    const onTouchEnd = useCallback(
        (e: React.TouchEvent) => {
            const diff = e.changedTouches[0].clientX - touchRef.current;
            if (Math.abs(diff) > 50 && onSwipe) {
                onSwipe(diff < 0 ? 'left' : 'right');
            }
        },
        [onSwipe]
    );

    return (
        <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: '4/5', borderRadius: '2px', background: '#F5F0EB', cursor: zoomProps?.isActive ? 'crosshair' : 'pointer' }}
            onMouseMove={zoomProps?.handleMouseMove}
            onMouseEnter={zoomProps?.handleMouseEnter}
            onMouseLeave={zoomProps?.handleMouseLeave}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onDoubleClick={onOpenModal}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width:768px) 100vw, 55vw"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Zoom lens indicator */}
            {zoomProps?.isActive && (
                <div
                    className="absolute pointer-events-none hidden md:block"
                    style={{
                        width: '25%',
                        height: '25%',
                        left: `${zoomProps.position.x}%`,
                        top: `${zoomProps.position.y}%`,
                        transform: 'translate(-50%, -50%)',
                        border: '1px solid rgba(201,169,110,0.5)',
                        background: 'rgba(201,169,110,0.05)',
                        zIndex: 5,
                    }}
                />
            )}

            {/* Fullscreen icon */}
            <button
                onClick={(e) => { e.stopPropagation(); onOpenModal(); }}
                aria-label="Tam ekran görüntüle"
                className="absolute top-3 right-3 w-9 h-9 rounded-sm flex items-center justify-center transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', border: '1px solid rgba(0,0,0,0.06)', zIndex: 10 }}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1C1C1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
                </svg>
            </button>
        </div>
    );
}

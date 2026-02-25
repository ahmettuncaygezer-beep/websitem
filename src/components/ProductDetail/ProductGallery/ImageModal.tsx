'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryItem } from '../hooks/useProductGallery';

interface ImageModalProps {
    items: GalleryItem[];
    activeIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (idx: number) => void;
}

export function ImageModal({ items, activeIndex, isOpen, onClose, onNavigate }: ImageModalProps) {
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNavigate(Math.min(activeIndex + 1, items.length - 1));
            if (e.key === 'ArrowLeft') onNavigate(Math.max(activeIndex - 1, 0));
        };
        document.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
    }, [isOpen, activeIndex, items.length, onClose, onNavigate]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-center"
                    style={{ zIndex: 50, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)' }}
                    onClick={onClose}
                >
                    {/* Close */}
                    <button onClick={onClose} aria-label="Kapat" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>

                    {/* Prev */}
                    {activeIndex > 0 && (
                        <button onClick={(e) => { e.stopPropagation(); onNavigate(activeIndex - 1); }} aria-label="Önceki" className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                        </button>
                    )}

                    {/* Next */}
                    {activeIndex < items.length - 1 && (
                        <button onClick={(e) => { e.stopPropagation(); onNavigate(activeIndex + 1); }} aria-label="Sonraki" className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                    )}

                    {/* Image */}
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                        style={{ maxWidth: '90vw', maxHeight: '90vh', width: 800, height: 1000 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image src={items[activeIndex].src} alt={items[activeIndex].alt} fill className="object-contain" sizes="90vw" priority />
                    </motion.div>

                    {/* Bottom thumbnails */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {items.map((item, i) => (
                            <button key={item.id} onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
                                className="relative overflow-hidden transition-all duration-150"
                                style={{ width: 48, height: 60, borderRadius: '2px', border: i === activeIndex ? '1.5px solid #C9A96E' : '1.5px solid rgba(255,255,255,0.3)', opacity: i === activeIndex ? 1 : 0.6 }}>
                                <Image src={item.thumbnail} alt="" fill className="object-cover" sizes="48px" />
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

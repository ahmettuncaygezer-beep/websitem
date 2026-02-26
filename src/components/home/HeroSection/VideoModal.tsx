'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
    /** YouTube video ID or full URL — falls back to local /videos/hero.mp4 */
    videoSrc?: string;
    duration?: string;
}

export function VideoModal({
    videoSrc = 'dQw4w9WgXcQ', // Placeholder YouTube video
    duration = '2:34',
}: VideoModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    /* ── Keyboard / scroll lock ── */
    const close = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [isOpen, close]);

    /* Determine embed src — if it looks like a YT id use embed URL */
    const isYouTubeId = videoSrc && /^[a-zA-Z0-9_-]{11}$/.test(videoSrc);
    const embedSrc = isYouTubeId
        ? `https://www.youtube.com/embed/${videoSrc}?autoplay=1&rel=0`
        : null; // local video

    return (
        <>
            {/* ── Trigger button — absolute bottom-right, hidden on mobile ── */}
            <motion.button
                onClick={() => setIsOpen(true)}
                aria-label="Koleksiyon filmini izle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.8 }}
                className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-3
                   group cursor-pointer select-none"
                style={{ transition: 'all 300ms ease' }}
            >
                {/* Pulse ring + play circle */}
                <span className="relative flex items-center justify-center">
                    {/* Ripple ring */}
                    <span
                        className="absolute inset-0 rounded-full border border-white/30"
                        style={{ animation: 'videoRing 2s ease-out infinite' }}
                        aria-hidden="true"
                    />

                    {/* Circle button */}
                    <span
                        className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full
                       border border-white/30 bg-white/10
                       group-hover:bg-white/20 group-hover:scale-105
                       transition-all duration-300"
                        style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                    >
                        <Play size={14} fill="white" className="text-white ml-0.5" />
                    </span>
                </span>

                {/* Text block */}
                <span className="flex flex-col items-start leading-tight">
                    <span className="text-xs text-white/80 font-medium">Koleksiyon Filmi</span>
                    <span className="text-[10px] text-white/50">{duration}</span>
                </span>
            </motion.button>

            {/* ── Modal ── */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-50"
                            style={{
                                background: 'rgba(0,0,0,0.90)',
                                backdropFilter: 'blur(6px)',
                                WebkitBackdropFilter: 'blur(6px)',
                            }}
                            onClick={close}
                        />

                        {/* Modal box */}
                        <motion.div
                            key="modal"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            aria-modal="true"
                            role="dialog"
                            aria-label="Koleksiyon filmi"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            <div
                                className="relative w-[90vw] max-w-4xl"
                                style={{ aspectRatio: '16/9' }}
                            >
                                {/* Close button — floats above the box */}
                                <button
                                    onClick={close}
                                    className="absolute -top-10 right-0 flex items-center gap-1.5
                             text-white/70 hover:text-white transition-colors duration-200"
                                    aria-label="Kapat"
                                >
                                    <X size={20} />
                                    <span className="text-xs tracking-wider uppercase">Kapat</span>
                                </button>

                                {/* Video */}
                                <div
                                    className="w-full h-full overflow-hidden"
                                    style={{ borderRadius: '4px' }}
                                >
                                    {embedSrc ? (
                                        <iframe
                                            src={embedSrc}
                                            title="Koleksiyon filmi"
                                            allow="autoplay; fullscreen; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full border-0"
                                        />
                                    ) : (
                                        <video
                                            src={videoSrc}
                                            controls
                                            autoPlay
                                            className="w-full h-full object-cover"
                                            aria-label="Koleksiyon filmi"
                                        />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

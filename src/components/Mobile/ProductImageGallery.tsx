'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Share2, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { useSwipeGallery } from './useSwipeGallery';
import { usePinchZoom } from './usePinchZoom';

interface ProductImageGalleryProps {
    images: string[];
    productName: string;
}

/* ─── Desktop lens zoom ─────────────────────────────────────────────── */
function DesktopZoom({ src, label }: { src: string; label: string }) {
    const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = containerRef.current!.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setLensPos({ x, y });
    };

    return (
        <div className="flex gap-4">
            {/* Main image */}
            <div
                ref={containerRef}
                className="relative flex-1 aspect-square bg-[#F5F0EB] overflow-hidden cursor-crosshair rounded-sm"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Image src={src} alt={label} fill className="object-cover" sizes="(max-width:1280px) 50vw, 600px" priority />
            </div>

            {/* Zoom preview */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="hidden lg:block w-72 h-72 rounded-sm overflow-hidden border border-[#E8E3DC] flex-shrink-0"
                        style={{ position: 'relative', background: '#F5F0EB' }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: `url(${src})`,
                                backgroundSize: '250%',
                                backgroundPosition: `${lensPos.x}% ${lensPos.y}%`,
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── Full-screen overlay ───────────────────────────────────────────── */
function FullscreenModal({
    images,
    startIndex,
    productName,
    onClose,
}: {
    images: string[];
    startIndex: number;
    productName: string;
    onClose: () => void;
}) {
    const gallery = useSwipeGallery(images.length);
    const zoom = usePinchZoom();
    const imgRef = useRef<HTMLDivElement>(null);

    const handleDoubleTap = (e: React.TouchEvent) => {
        if (imgRef.current) {
            const rect = imgRef.current.getBoundingClientRect();
            zoom.doubleTap(e.touches[0]?.clientX ?? 0, e.touches[0]?.clientY ?? 0, rect);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({ title: productName, url: window.location.href }).catch(() => { });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col"
            style={{ touchAction: 'none' }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 flex-shrink-0">
                <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-white" aria-label="Kapat">
                    <X size={22} />
                </button>
                <span className="text-white/70 text-sm">{gallery.currentIndex + 1} / {images.length}</span>
                <button onClick={handleShare} className="w-10 h-10 flex items-center justify-center text-white" aria-label="Paylaş">
                    <Share2 size={20} />
                </button>
            </div>

            {/* Image */}
            <div
                ref={imgRef}
                className="flex-1 relative overflow-hidden"
                {...gallery.handlers}
                onTouchStart={(e) => {
                    gallery.handlers.onTouchStart(e);
                    zoom.handlers.onTouchStart(e);
                }}
                onTouchMove={(e) => {
                    gallery.handlers.onTouchMove(e);
                    zoom.handlers.onTouchMove(e);
                }}
                onTouchEnd={(e) => {
                    gallery.handlers.onTouchEnd();
                    zoom.handlers.onTouchEnd(e);
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        transform: `translateX(calc(${-gallery.currentIndex * 100}% + ${gallery.dragOffset}px))`,
                        transition: gallery.isDragging ? 'none' : 'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)',
                        willChange: 'transform',
                    }}
                >
                    {images.map((src, i) => (
                        <div key={i} className="flex-shrink-0 w-full h-full flex items-center justify-center">
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    transform: i === gallery.currentIndex
                                        ? `scale(${zoom.scale}) translate(${zoom.panX / zoom.scale}px, ${zoom.panY / zoom.scale}px)`
                                        : 'none',
                                    transformOrigin: `${zoom.originX}px ${zoom.originY}px`,
                                    transition: zoom.isZoomed ? 'none' : 'transform 300ms ease',
                                    willChange: 'transform',
                                }}
                            >
                                <Image src={src} alt={`${productName} ${i + 1}`} fill className="object-contain" sizes="100vw" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 pb-6 pt-4 flex-shrink-0">
                {images.map((_, i) => (
                    <motion.button
                        key={i}
                        onClick={() => gallery.goTo(i)}
                        animate={{ width: i === gallery.currentIndex ? 16 : 6 }}
                        className="h-1.5 rounded-full"
                        style={{ background: i === gallery.currentIndex ? '#C9A96E' : '#555' }}
                        transition={{ type: 'spring', stiffness: 400 }}
                    />
                ))}
            </div>
        </motion.div>
    );
}

/* ─── Main component ────────────────────────────────────────────────── */
export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const gallery = useSwipeGallery(images.length);
    const zoom = usePinchZoom();
    const containerRef = useRef<HTMLDivElement>(null);

    const currentMobileIndex = gallery.currentIndex;

    const handleDoubleTap = useCallback((e: React.TouchEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const t = e.changedTouches[0];
            zoom.doubleTap(t.clientX, t.clientY, rect);
        }
    }, [zoom]);

    return (
        <>
            {/* ── Desktop layout ──────────────────────────── */}
            <div className="hidden md:flex gap-4">
                {/* Thumbnail strip */}
                <div className="flex flex-col gap-2 w-16 flex-shrink-0">
                    {images.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className="relative w-16 h-16 rounded-sm overflow-hidden border-2 transition-all duration-200 flex-shrink-0"
                            style={{
                                borderColor: activeIndex === i ? '#C9A96E' : 'transparent',
                                opacity: activeIndex === i ? 1 : 0.55,
                            }}
                            aria-label={`Görsel ${i + 1}`}
                        >
                            <Image src={src} alt={`${productName} küçük ${i + 1}`} fill className="object-cover" sizes="64px" />
                        </button>
                    ))}
                </div>

                {/* Main image with lens zoom */}
                <div className="flex-1">
                    <div className="relative">
                        <DesktopZoom src={images[activeIndex] ?? images[0]} label={productName} />
                        {/* Expand button */}
                        <button
                            onClick={() => setIsFullscreen(true)}
                            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-[#E8E3DC] text-[#1C1C1E] hover:bg-white transition-colors z-10"
                            aria-label="Tam ekran"
                        >
                            <Expand size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Mobile layout ──────────────────────────── */}
            <div className="block md:hidden relative overflow-hidden bg-[#F5F0EB]" style={{ aspectRatio: '1/1' }}>
                {/* Image strip */}
                <div
                    ref={containerRef}
                    className="flex h-full"
                    style={{
                        transform: `translateX(calc(${-currentMobileIndex * 100}% + ${gallery.dragOffset}px))`,
                        transition: gallery.isDragging ? 'none' : 'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)',
                        willChange: 'transform',
                        touchAction: zoom.isZoomed ? 'none' : 'pan-y',
                    }}
                    {...gallery.handlers}
                    onTouchStart={(e) => {
                        gallery.handlers.onTouchStart(e);
                        zoom.handlers.onTouchStart(e);
                    }}
                    onTouchMove={(e) => {
                        gallery.handlers.onTouchMove(e);
                        zoom.handlers.onTouchMove(e);
                    }}
                    onTouchEnd={(e) => {
                        gallery.handlers.onTouchEnd();
                        zoom.handlers.onTouchEnd(e);
                        handleDoubleTap(e);
                    }}
                >
                    {images.map((src, i) => (
                        <div key={i} className="flex-shrink-0 w-full h-full relative" style={{ userSelect: 'none' }}>
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    transform: i === currentMobileIndex
                                        ? `scale(${zoom.scale}) translate(${zoom.panX / zoom.scale}px,${zoom.panY / zoom.scale}px)`
                                        : 'none',
                                    transformOrigin: `${zoom.originX}px ${zoom.originY}px`,
                                    transition: zoom.isZoomed ? 'none' : 'transform 300ms ease',
                                    willChange: 'transform',
                                }}
                            >
                                <Image
                                    src={src}
                                    alt={`${productName} ${i + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                    priority={i === 0}
                                    draggable={false}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Counter */}
                <div className="absolute top-3 right-3 z-10">
                    <span className="px-2 py-1 text-[11px] text-white rounded-full" style={{ background: 'rgba(0,0,0,0.4)' }}>
                        {currentMobileIndex + 1} / {images.length}
                    </span>
                </div>

                {/* Expand button */}
                <button
                    onClick={() => setIsFullscreen(true)}
                    className="absolute top-3 left-3 z-10 w-8 h-8 flex items-center justify-center rounded-full text-white"
                    style={{ background: 'rgba(0,0,0,0.4)' }}
                    aria-label="Tam ekran"
                >
                    <Expand size={14} />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
                    {images.map((_, i) => (
                        <motion.button
                            key={i}
                            onClick={() => gallery.goTo(i)}
                            animate={{ width: i === currentMobileIndex ? 16 : 6 }}
                            className="h-1.5 rounded-full"
                            style={{ background: i === currentMobileIndex ? '#C9A96E' : 'rgba(255,255,255,0.7)' }}
                            transition={{ type: 'spring', stiffness: 400 }}
                            aria-label={`Görsel ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Chevron nav */}
                {currentMobileIndex > 0 && (
                    <button onClick={gallery.goPrev} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full text-white" style={{ background: 'rgba(0,0,0,0.3)' }}>
                        <ChevronLeft size={18} />
                    </button>
                )}
                {currentMobileIndex < images.length - 1 && (
                    <button onClick={gallery.goNext} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full text-white" style={{ background: 'rgba(0,0,0,0.3)' }}>
                        <ChevronRight size={18} />
                    </button>
                )}
            </div>

            {/* Fullscreen modal */}
            <AnimatePresence>
                {isFullscreen && (
                    <FullscreenModal
                        images={images}
                        startIndex={activeIndex}
                        productName={productName}
                        onClose={() => setIsFullscreen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface VideoBackgroundProps {
    parallaxOffset: number;
}

// Tiny 1×1 dark placeholder for blur-up technique
const BLUR_DATA_URL =
    'data:image/webp;base64,UklGRlYAAABXRUJQVlA4MEoAAADwAQCdASoBAAEAAkA4JbACdAF0AAD+/Ov4gnAAAAA=';

export function VideoBackground({ parallaxOffset }: VideoBackgroundProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [videoReady, setVideoReady] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Responsive check
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check, { passive: true });
        return () => window.removeEventListener('resize', check);
    }, []);

    // IntersectionObserver — pause video when hero scrolls out of view (battery / CPU)
    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;
        if (!video || !container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {/* autoplay blocked, silently ignore */ });
                } else {
                    video.pause();
                }
            },
            { threshold: 0 }
        );
        observer.observe(container);
        return () => observer.disconnect();
    }, [isMobile]);

    const overlayGradient1 =
        'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.70) 100%)';
    const overlayGradient2 =
        'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.10) 60%, transparent 100%)';

    return (
        <motion.div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0, ease: 'easeOut' }}
            style={{ background: '#1a1a1c' }}
        >
            {/* MOBILE: optimised Next/Image, no parallax, no video */}
            {isMobile && (
                <div className="relative w-full h-full">
                    <Image
                        src="/images/hero/main-mobile.webp"
                        alt="SELIS lüks mobilya"
                        fill
                        priority
                        className="object-cover"
                        style={{ objectPosition: 'center 30%' }}
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: overlayGradient1 }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: overlayGradient2 }} />
                </div>
            )}

            {/* DESKTOP: video with blur-up placeholder and IntersectionObserver pause */}
            {!isMobile && (
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        transform: `translateY(${parallaxOffset}px)`,
                        willChange: 'transform',   // GPU compositing layer
                    }}
                >
                    {/* Blur placeholder — shown until video is ready */}
                    {!videoReady && !videoError && (
                        <Image
                            src="/images/hero/main.webp"
                            alt=""
                            fill
                            priority
                            className="object-cover"
                            style={{
                                filter: 'blur(20px)',
                                transform: 'scale(1.05)',
                                objectPosition: 'center',
                            }}
                            placeholder="blur"
                            blurDataURL={BLUR_DATA_URL}
                            sizes="100vw"
                        />
                    )}

                    {/* Fallback image if video fails to load */}
                    {videoError && (
                        <Image
                            src="/images/hero/main.webp"
                            alt="SELIS lüks mobilya"
                            fill
                            className="object-cover"
                            style={{ objectPosition: 'center' }}
                            sizes="100vw"
                        />
                    )}

                    {/* Video */}
                    {!videoError && (
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"           // metadata only — saves bandwidth
                            onCanPlay={() => setVideoReady(true)}
                            onError={() => setVideoError(true)}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{
                                opacity: videoReady ? 1 : 0,
                                transition: 'opacity 800ms ease-in-out',
                                willChange: 'opacity',   // GPU compositing
                            }}
                        >
                            <source src="/videos/hero.webm" type="video/webm" />
                            <source src="/videos/hero.mp4" type="video/mp4" />
                        </video>
                    )}

                    {/* Overlay layers */}
                    <div className="absolute inset-0 pointer-events-none" style={{ background: overlayGradient1 }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: overlayGradient2 }} />
                </div>
            )}
        </motion.div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ImageSliderProps {
    parallaxOffset: number;
}

const images = [
    {
        id: 1,
        src: '/images/home/hero-1.jpg',
        alt: 'Dark moody luxury living room',
    },
    {
        id: 2,
        src: '/images/home/hero-2.jpg',
        alt: 'Minimalist Scandinavian bedroom',
    },
    {
        id: 3,
        src: '/images/home/hero-3.jpg',
        alt: 'Modern dining room',
    },
];

export function ImageSlider({ parallaxOffset }: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play the slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(timer);
    }, []);

    // Dark overlay gradients (40-50% opacity)
    const overlayGradient = 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 100%)';

    return (
        <div
            className="absolute inset-0 overflow-hidden bg-black"
            aria-hidden="true"
        >
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    transform: `translateY(${parallaxOffset}px)`,
                    willChange: 'transform', // GPU compositing layer
                }}
            >
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentIndex}
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }} // Slow fade transition
                    >
                        {/* Ken Burns effect wrapper */}
                        <motion.div
                            className="absolute inset-0 w-full h-full"
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.05 }}
                            transition={{ duration: 6, ease: 'linear' }}
                        >
                            <Image
                                src={images[currentIndex].src}
                                alt={images[currentIndex].alt}
                                fill
                                priority={currentIndex === 0}
                                className="object-cover"
                                sizes="100vw"
                                quality={90}
                            />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Constant dark overlay for reading text */}
                <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{ background: overlayGradient }}
                />
            </div>
        </div>
    );
}

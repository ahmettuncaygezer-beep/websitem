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
        // Yüksek çözünürlüklü lüks salon
        src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2560',
        alt: 'Lüks ve modern oturma odası',
    },
    {
        id: 2,
        // Modern ve premium yatak odası
        src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=2560',
        alt: 'Minimalist lüks yatak odası',
    },
    {
        id: 3,
        // Zarif yemek odası
        src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2560',
        alt: 'Zarif ve modern yemek odası',
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
                className="absolute w-full"
                style={{
                    height: '115%',
                    top: '-7.5%',
                    transform: `translateY(${parallaxOffset}px)`,
                    willChange: 'transform',
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
                                quality={85}
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

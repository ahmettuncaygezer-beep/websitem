// @ts-nocheck
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': any;
        }
    }
}

interface ProductGalleryProps {
    images: string[];
    name: string;
    slug?: string;
}

// Unique AI-generated gallery images per product
const galleryImages: Record<string, string[]> = {
    'luna-kose-koltuk': ['/images/products/luna-sofa.jpg', '/images/products/luna-lifestyle.jpg', '/images/categories/living-room.jpg'],
    'aurora-yatak-basi': ['/images/products/aurora-bed.jpg', '/images/products/aurora-lifestyle.jpg', '/images/categories/bedroom.jpg'],
    'sol-yemek-masasi': ['/images/products/sol-dining-table.jpg', '/images/categories/dining.jpg', '/images/categories/living-room.jpg'],
    'iris-berjer': ['/images/products/iris-armchair.jpg', '/images/categories/living-room.jpg', '/images/rooms/lookbook-1.jpg'],
    'terra-tv-unitesi': ['/images/products/terra-tv.jpg', '/images/categories/living-room.jpg', '/images/rooms/lookbook-1.jpg'],
    'zen-kitaplik': ['/images/products/zen-kitaplik.jpg', '/images/categories/office.jpg', '/images/categories/living-room.jpg'],
    'neva-abajur': ['/images/products/neva-abajur.jpg', '/images/categories/lighting.jpg', '/images/categories/bedroom.jpg'],
    'diva-konsol': ['/images/products/diva-konsol.jpg', '/images/categories/decor.jpg', '/images/categories/living-room.jpg'],
    'como-ahsap-sandalye': ['/images/products/como-sandalye.jpg', '/images/categories/dining.jpg', '/images/categories/living-room.jpg'],
    'pera-sehpa': ['/images/products/pera-sehpa.jpg', '/images/categories/living-room.jpg', '/images/rooms/lookbook-1.jpg'],
    'aura-yastik-seti': ['/images/products/aura-yastik.jpg', '/images/categories/bedroom.jpg', '/images/categories/decor.jpg'],
    'flora-vazo': ['/images/products/flora-vazo.jpg', '/images/categories/decor.jpg', '/images/categories/dining.jpg'],
};

const defaultGallery = ['/images/products/luna-sofa.jpg', '/images/products/luna-lifestyle.jpg', '/images/categories/living-room.jpg'];

export function ProductGallery({ images, name, slug }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const localImages = slug && galleryImages[slug]
        ? galleryImages[slug]
        : defaultGallery;

    return (
        <div className="sticky top-28 flex gap-4">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-3">
                {localImages.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 ${activeIndex === index
                            ? 'ring-2 ring-gold ring-offset-2'
                            : 'opacity-60 hover:opacity-100'
                            }`}
                    >
                        <Image
                            src={img}
                            alt={`${name} - ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                        />
                    </button>
                ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-[3/4] rounded-2xl overflow-hidden bg-sand relative group"
                >
                    <Image
                        src={localImages[activeIndex]}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority
                    />

                    {/* Image counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-[10px] font-sans text-charcoal">
                            {activeIndex + 1} / {localImages.length}
                        </span>
                    </div>
                </motion.div>

                {/* AR Button */}
                <button
                    onClick={() => (document.querySelector('model-viewer') as any)?.activateAR()}
                    className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl hover:bg-white transition-all group flex items-center gap-3"
                >
                    <div className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center text-sage">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 19h16v2H4v-2zM20 9l-9-5-9 5 9 5 9-5zM11 15.69l-7-3.89v4.5l7 3.89 7-3.89v-4.5l-7 3.89z" />
                        </svg>
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal">Odanda Gör</p>
                        <p className="text-[9px] font-sans text-warm-gray">View in AR</p>
                    </div>
                </button>

                {/* Hidden model-viewer for AR functionality */}
                <div className="hidden">
                    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>
                    {/* @ts-ignore */}
                    <model-viewer
                        src="/models/furniture.glb"
                        ios-src="/models/furniture.usdz"
                        ar
                        ar-modes="webxr scene-viewer quick-look"
                        camera-controls
                        touch-action="pan-y"
                        alt="A 3D model of furniture"
                    ></model-viewer>
                </div>
            </div>
        </div>
    );
}

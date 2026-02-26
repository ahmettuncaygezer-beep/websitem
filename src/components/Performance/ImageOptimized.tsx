'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

// Tiny 10×10 grey placeholder — prevents CLS
const BLUR_DATA_URL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIklEQVQI12P4z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==';

export type ImageVariant = 'hero' | 'category' | 'product' | 'thumbnail' | 'full';

const SIZES_MAP: Record<ImageVariant, string> = {
    hero: '100vw',
    category:
        '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
    product:
        '(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw',
    thumbnail: '(max-width: 640px) 80px, 120px',
    full: '(max-width: 768px) 100vw, 50vw',
};

interface ImageOptimizedProps
    extends Omit<ImageProps, 'sizes' | 'blurDataURL' | 'placeholder'> {
    variant?: ImageVariant;
    /** Override auto sizes */
    sizes?: string;
    /** Show gradient fallback on error */
    fallbackGradient?: string;
}

export default function ImageOptimized({
    variant = 'product',
    sizes,
    fallbackGradient = 'linear-gradient(135deg, #E8E3DC 0%, #F5F0EB 100%)',
    alt,
    src,
    className = '',
    priority = false,
    ...props
}: ImageOptimizedProps) {
    const [errored, setErrored] = useState(false);

    if (errored) {
        return (
            <div
                className={`w-full h-full ${className}`}
                style={{ background: fallbackGradient }}
                role="img"
                aria-label={alt}
            />
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            sizes={sizes ?? SIZES_MAP[variant]}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            className={`transition-opacity duration-300 ${className}`}
            onError={() => setErrored(true)}
            {...props}
        />
    );
}

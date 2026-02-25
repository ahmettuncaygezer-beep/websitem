'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProductColor } from './product.types';

interface ProductCardImageProps {
    color: ProductColor;
    name: string;
    isHovered: boolean;
    priority: boolean;
}

export function ProductCardImage({
    color,
    name,
    isHovered,
    priority,
}: ProductCardImageProps) {
    const [mainLoaded, setMainLoaded] = useState(false);

    return (
        <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: '3/4', background: '#F5F0EB', borderRadius: '2px 2px 0 0' }}
        >
            {/* Shimmer skeleton */}
            {!mainLoaded && (
                <div className="absolute inset-0" aria-hidden="true">
                    <div
                        className="w-full h-full"
                        style={{
                            background: 'linear-gradient(90deg, #F5F0EB 25%, #EDE8E2 50%, #F5F0EB 75%)',
                            backgroundSize: '400% 100%',
                            animation: 'shimmer 1.5s infinite',
                        }}
                    />
                </div>
            )}

            {/* Main product image */}
            <Image
                src={color.image}
                alt={`${name} — ${color.name}`}
                fill
                priority={priority}
                loading={priority ? 'eager' : 'lazy'}
                className="object-cover"
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                style={{
                    opacity: isHovered ? 0 : 1,
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    transition: 'opacity 500ms ease, transform 700ms cubic-bezier(0.25,0.46,0.45,0.94)',
                }}
                onLoad={() => setMainLoaded(true)}
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
            />

            {/* Lifestyle crossfade image — loads on hover */}
            <Image
                src={color.lifestyleImage}
                alt={`${name} — ${color.name} yaşam alanı`}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    transition: 'opacity 500ms ease, transform 700ms cubic-bezier(0.25,0.46,0.45,0.94)',
                }}
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
            />
        </div>
    );
}

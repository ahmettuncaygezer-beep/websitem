'use client';

import Image from 'next/image';

interface ZoomLensProps {
    src: string;
    alt: string;
    isActive: boolean;
    position: { x: number; y: number };
}

export function ZoomLens({ src, alt, isActive, position }: ZoomLensProps) {
    if (!isActive) return null;

    return (
        <div
            className="absolute hidden md:block pointer-events-none"
            style={{
                left: 'calc(100% + 16px)',
                top: 0,
                width: 400,
                height: 500,
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '2px',
                overflow: 'hidden',
                background: 'white',
                boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                zIndex: 20,
            }}
        >
            <Image
                src={src}
                alt={`${alt} — büyütülmüş`}
                fill
                className="object-cover"
                sizes="400px"
                style={{
                    transform: 'scale(2.5)',
                    transformOrigin: `${position.x}% ${position.y}%`,
                    transition: 'none',
                }}
            />
        </div>
    );
}

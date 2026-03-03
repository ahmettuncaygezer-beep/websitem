'use client';

import ImageOptimized from '@/components/Performance/ImageOptimized';

interface ProductCardImageProps {
    mainImage?: string;
    hoverImage?: string;
    name: string;
    isHovered: boolean;
    priority: boolean;
}

export function ProductCardImage({
    mainImage,
    hoverImage,
    name,
    isHovered,
    priority,
}: ProductCardImageProps) {
    return (
        <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: '3/4', background: '#F5F0EB', borderRadius: '2px 2px 0 0' }}
        >
            {/* Main product image */}
            {mainImage && (
                <ImageOptimized
                    src={mainImage}
                    alt={name}
                    variant="product"
                    priority={priority}
                    className="object-cover"
                    style={{
                        opacity: isHovered ? 0 : 1,
                        transition: 'opacity 500ms ease',
                    }}
                    fill
                />
            )}

            {/* Lifestyle crossfade image — loads on hover */}
            {hoverImage && (
                <ImageOptimized
                    src={hoverImage}
                    alt={`${name} yaşam alanı`}
                    variant="product"
                    priority={false}
                    className="object-cover"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 500ms ease',
                    }}
                    fill
                />
            )}
        </div>
    );
}

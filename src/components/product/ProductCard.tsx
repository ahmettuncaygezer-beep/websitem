'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/constants';
import { useFavorites } from '@/hooks/useFavorites';

interface ProductCardProps {
    product: Product;
}

// Unique AI-generated product images for each product
const productImages: Record<string, string> = {
    'luna-kose-koltuk': '/images/products/luna-sofa.jpg',
    'aurora-yatak-basi': '/images/products/aurora-bed.jpg',
    'sol-yemek-masasi': '/images/products/sol-dining-table.jpg',
    'iris-berjer': '/images/products/iris-armchair.jpg',
    'terra-tv-unitesi': '/images/products/terra-tv.jpg',
    'zen-kitaplik': '/images/products/zen-kitaplik.jpg',
    'neva-abajur': '/images/products/neva-abajur.jpg',
    'diva-konsol': '/images/products/diva-konsol.jpg',
    'como-ahsap-sandalye': '/images/products/como-sandalye.jpg',
    'pera-sehpa': '/images/products/pera-sehpa.jpg',
    'aura-yastik-seti': '/images/products/aura-yastik.jpg',
    'flora-vazo': '/images/products/flora-vazo.jpg',
};

const lifestyleImages: Record<string, string> = {
    'luna-kose-koltuk': '/images/products/luna-lifestyle.jpg',
    'aurora-yatak-basi': '/images/products/aurora-lifestyle.jpg',
    'sol-yemek-masasi': '/images/categories/dining.jpg',
    'iris-berjer': '/images/categories/living-room.jpg',
    'terra-tv-unitesi': '/images/categories/living-room.jpg',
    'zen-kitaplik': '/images/categories/office.jpg',
    'neva-abajur': '/images/categories/lighting.jpg',
    'diva-konsol': '/images/categories/decor.jpg',
    'como-ahsap-sandalye': '/images/categories/dining.jpg',
    'pera-sehpa': '/images/categories/living-room.jpg',
    'aura-yastik-seti': '/images/categories/bedroom.jpg',
    'flora-vazo': '/images/categories/decor.jpg',
};

const fallbackImage = '/images/products/luna-sofa.jpg';

export function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { toggleFavorite, isFavorite } = useFavorites();
    const isLiked = isFavorite(product.id);

    const hasDiscount = product.salePrice && product.salePrice < product.price;
    const discountPercent = hasDiscount
        ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
        : 0;

    const mainImage = productImages[product.slug] || fallbackImage;
    const hoverImage = lifestyleImages[product.slug] || mainImage;

    return (
        <div
            className="group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/urun/${product.slug}`} className="block">
                {/* Image container */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-sand mb-4">
                    {/* Main product image */}
                    <Image
                        src={mainImage}
                        alt={product.name}
                        fill
                        className={`object-cover transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    {/* Hover lifestyle image */}
                    <Image
                        src={hoverImage}
                        alt={`${product.name} - Yaşam alanı`}
                        fill
                        className={`object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.isNew && (
                            <span className="px-2.5 py-1 bg-charcoal text-white text-[10px] font-sans font-semibold uppercase tracking-wider rounded-full">
                                Yeni
                            </span>
                        )}
                        {hasDiscount && (
                            <span className="px-2.5 py-1 bg-terracotta text-white text-[10px] font-sans font-semibold rounded-full">
                                %{discountPercent}
                            </span>
                        )}
                    </div>

                    {/* Favorite */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(product.id);
                        }}
                        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isLiked
                            ? 'bg-terracotta text-white'
                            : 'bg-white/80 backdrop-blur-sm text-warm-gray opacity-0 group-hover:opacity-100'
                            }`}
                    >
                        <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                    </button>
                </div>
            </Link>

            {/* Info */}
            <div className="space-y-2">
                <p className="text-[10px] font-sans uppercase tracking-widest text-warm-gray-light">
                    {product.brand}
                </p>
                <Link href={`/urun/${product.slug}`}>
                    <h3 className="font-serif text-base group-hover:text-gold transition-colors duration-300">
                        {product.name}
                    </h3>
                </Link>

                {/* Colors */}
                <div className="flex gap-1.5">
                    {product.colors.slice(0, 4).map((color) => (
                        <span
                            key={color.hex}
                            className="w-3.5 h-3.5 rounded-full border border-border/40"
                            style={{ backgroundColor: color.hex }}
                        />
                    ))}
                    {product.colors.length > 4 && (
                        <span className="text-[10px] font-sans text-warm-gray-light ml-0.5">
                            +{product.colors.length - 4}
                        </span>
                    )}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                    {hasDiscount ? (
                        <>
                            <span className="font-sans font-bold text-sm text-terracotta">
                                {formatPrice(product.salePrice!)}
                            </span>
                            <span className="font-sans text-xs text-warm-gray-light line-through">
                                {formatPrice(product.price)}
                            </span>
                        </>
                    ) : (
                        <span className="font-sans font-bold text-sm">
                            {formatPrice(product.price)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

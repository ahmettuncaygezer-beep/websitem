'use client';

import { useState, memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Truck, Zap } from 'lucide-react';
import { useProductCard } from './useProductCard';
import { useWishlist } from './useWishlist';
import { ProductCardImage } from './ProductCardImage';
import { ProductCardBadge } from './ProductCardBadge';
import { ProductCardActions } from './ProductCardActions';
import { ProductCardColors } from './ProductCardColors';
import { ProductCardRating } from './ProductCardRating';
import { CompareButton } from './CompareButton';
import { QuickViewModal } from './QuickViewModal';
import type { Product, ViewMode } from './product.types';

interface ProductCardProps {
    product: Product;
    index?: number;
    viewMode?: ViewMode;
    priority?: boolean;
}

export const ProductCard = memo(function ProductCard({
    product,
    index = 0,
    viewMode = 'grid',
    priority = false,
}: ProductCardProps) {
    const {
        selectedColor,
        selectedColorId,
        setSelectedColorId,
        isHovered,
        setIsHovered,
        cartState,
        handleAddToCart,
        isCompared,
        toggleCompare,
    } = useProductCard(product);

    const { isWishlisted, toggle: toggleWishlist } = useWishlist(product.id);
    const [quickViewOpen, setQuickViewOpen] = useState(false);

    const isPriority = priority || index < 4;

    // Price logic: salePrice is the current price if it exists and is > 0
    const displayPrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
    const originalPrice = product.originalPrice || (product.salePrice && product.salePrice < product.price ? product.price : undefined);

    const discount = originalPrice
        ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
        : 0;

    // ━━━ LIST VIEW ━━━
    if (viewMode === 'list') {
        return (
            <>
                <motion.article
                    role="article"
                    className="relative flex bg-white overflow-hidden transition-shadow duration-300"
                    style={{
                        borderRadius: '2px',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                        border: '1px solid rgba(0,0,0,0.04)',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileHover={{
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        borderColor: '#C9A96E',
                    }}
                >
                    {/* Left image */}
                    <Link
                        href={`/urun/${product.slug}`}
                        className="relative shrink-0 block"
                        style={{ width: 160, height: 160, background: '#F5F0EB' }}
                    >
                        <ProductCardImage
                            mainImage={selectedColor?.image || product.images[0]}
                            hoverImage={selectedColor?.lifestyleImage || product.lifestyleImage || product.images[1]}
                            name={product.name}
                            isHovered={isHovered}
                            priority={isPriority}
                        />
                    </Link>

                    {/* Right info */}
                    <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                        <div>
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                    <span className="uppercase font-medium block" style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#C9A96E' }}>
                                        {product.brand}
                                    </span>
                                    <Link
                                        href={`/urun/${product.slug}`}
                                        className="block mt-1 text-[15px] font-normal transition-colors duration-200 truncate"
                                        style={{ fontFamily: 'var(--font-playfair, serif)', color: '#1C1C1E', textDecoration: 'none', lineHeight: 1.3 }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A96E'; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#1C1C1E'; }}
                                    >
                                        {product.name}
                                    </Link>
                                </div>
                                <ProductCardRating rating={product.rating} slug={product.slug} />
                            </div>

                            {product.colors.length > 0 && (
                                <ProductCardColors colors={product.colors} selectedId={selectedColorId} onSelect={setSelectedColorId} />
                            )}
                        </div>

                        <div className="flex items-end justify-between mt-2">
                            {/* Price */}
                            <div>
                                <span className="text-base font-bold" style={{ color: '#1C1C1E' }}>
                                    ₺{displayPrice.toLocaleString('tr-TR')}
                                </span>
                                {originalPrice && (
                                    <span className="text-[12px] line-through ml-2" style={{ color: '#999' }}>
                                        ₺{originalPrice.toLocaleString('tr-TR')}
                                    </span>
                                )}
                            </div>

                            {/* Cart */}
                            <button
                                onClick={(e) => { e.preventDefault(); handleAddToCart(); }}
                                className="px-4 py-2 flex items-center gap-2 font-semibold tracking-wider uppercase transition-colors duration-200"
                                style={{ fontSize: '11px', background: '#1C1C1E', color: 'white', border: 'none', borderRadius: '2px', cursor: 'pointer' }}
                            >
                                Sepete Ekle
                            </button>
                        </div>
                    </div>
                </motion.article>
                <QuickViewModal product={product} isOpen={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
            </>
        );
    }

    // ━━━ GRID VIEW (default) ━━━
    return (
        <>
            <motion.article
                role="article"
                className="group relative bg-white overflow-hidden"
                style={{
                    borderRadius: '2px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                    setIsHovered(true);
                    (e.currentTarget as HTMLElement).style.willChange = 'transform';
                }}
                onMouseLeave={(e) => {
                    setIsHovered(false);
                    (e.currentTarget as HTMLElement).style.willChange = 'auto';
                }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                {/* ── IMAGE AREA ── */}
                <Link
                    href={`/urun/${product.slug}`}
                    className="relative block overflow-hidden"
                    aria-label={`${product.name} ürün sayfasına git`}
                    style={{ outline: 'none' }}
                >
                    <ProductCardImage
                        mainImage={selectedColor?.image || product.images[0]}
                        hoverImage={selectedColor?.lifestyleImage || product.lifestyleImage || product.images[1]}
                        name={product.name}
                        isHovered={isHovered}
                        priority={isPriority}
                    />

                    {/* Badges */}
                    <ProductCardBadge badges={product.badges} />

                    {/* Actions overlay */}
                    <ProductCardActions
                        isHovered={isHovered}
                        isWishlisted={isWishlisted}
                        onWishlistToggle={toggleWishlist}
                        cartState={cartState}
                        onAddToCart={handleAddToCart}
                        onQuickView={() => setQuickViewOpen(true)}
                        productName={product.name}
                    />
                </Link>

                {/* ── INFO AREA ── */}
                <div className="p-4">
                    {/* Brand */}
                    <span
                        className="uppercase font-medium block"
                        style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#C9A96E' }}
                    >
                        {product.brand}
                    </span>

                    {/* Product name */}
                    <Link
                        href={`/urun/${product.slug}`}
                        className="block mt-1 transition-colors duration-200"
                        style={{
                            fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
                            fontWeight: 400,
                            fontSize: '15px',
                            lineHeight: 1.3,
                            color: '#1C1C1E',
                            textDecoration: 'none',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A96E'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#1C1C1E'; }}
                    >
                        {product.name}
                    </Link>

                    {/* Colors */}
                    {product.colors.length > 0 && (
                        <ProductCardColors
                            colors={product.colors}
                            selectedId={selectedColorId}
                            onSelect={setSelectedColorId}
                        />
                    )}

                    {/* Rating */}
                    <ProductCardRating rating={product.rating} slug={product.slug} />

                    {/* Price + Delivery */}
                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-baseline gap-2">
                            <span className="text-base font-bold" style={{ color: '#1C1C1E' }}>
                                ₺{displayPrice.toLocaleString('tr-TR')}
                            </span>
                            {originalPrice && (
                                <span className="text-[12px] line-through" style={{ color: '#999' }}>
                                    ₺{originalPrice.toLocaleString('tr-TR')}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-1" style={{ color: product.hasQuickShip ? '#4CAF50' : '#999' }}>
                            {product.hasQuickShip ? <Zap size={12} /> : <Truck size={12} />}
                            <span style={{ fontSize: '10px' }}>
                                {product.hasQuickShip ? '⚡ 2 gün' : `${product.deliveryDays || 7} gün`}
                            </span>
                        </div>
                    </div>

                    {/* Installment hint */}
                    {product.price >= 5000 && (
                        <p className="text-[10px] mt-1" style={{ color: '#999' }}>
                            36 aya varan taksit
                        </p>
                    )}

                    {/* Compare */}
                    <div className="mt-2">
                        <CompareButton
                            isCompared={isCompared}
                            onToggle={toggleCompare}
                            isCardHovered={isHovered}
                            productName={product.name}
                        />
                    </div>
                </div>
            </motion.article>

            {/* Quick View Modal — rendered via portal-like behavior */}
            <QuickViewModal
                product={product}
                isOpen={quickViewOpen}
                onClose={() => setQuickViewOpen(false)}
            />

            {/* Shimmer keyframes (inject once) */}
            <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (hover: none) and (pointer: coarse) {
          .group [data-hover-only] {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
        </>
    );
});

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

import { useGlobal } from '@/context/GlobalContext';

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
    const { formatPrice } = useGlobal();
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
                    className="relative flex bg-card overflow-hidden transition-all duration-300"
                    style={{
                        borderRadius: '12px',
                        boxShadow: 'var(--shadow-selis-card)',
                        border: '1px solid var(--border)',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileHover={{
                        boxShadow: 'var(--shadow-selis-card-hover)',
                        borderColor: 'var(--selis-gold)',
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
                                    <span className="uppercase font-medium block" style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--selis-gold)' }}>
                                        {product.brand}
                                    </span>
                                    <Link
                                        href={`/urun/${product.slug}`}
                                        className="block mt-1 text-[15px] font-normal transition-colors duration-300 truncate"
                                        style={{ fontFamily: 'var(--font-playfair, serif)', color: 'var(--foreground)', textDecoration: 'none', lineHeight: 1.3 }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--selis-gold)'; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--foreground)'; }}
                                    >
                                        <span data-lang-key={product.nameKey}>{product.name}</span>
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
                                <span className="text-base font-bold" style={{ color: 'var(--foreground)' }}>
                                    {formatPrice(displayPrice)}
                                </span>
                                {originalPrice && (
                                    <span className="text-[12px] line-through ml-2" style={{ color: 'var(--muted-foreground)' }}>
                                        {formatPrice(originalPrice)}
                                    </span>
                                )}
                            </div>

                            {/* Cart */}
                            <button
                                onClick={(e) => { e.preventDefault(); handleAddToCart(); }}
                                className="px-4 py-2 flex items-center gap-2 font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95"
                                style={{ fontSize: '11px', background: 'var(--foreground)', color: 'var(--background)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                <span data-lang-key="prod_add_to_cart">Add to Cart</span>
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
                className="group relative bg-card overflow-hidden"
                style={{
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow-selis-card)',
                    cursor: 'pointer',
                    border: '1px solid var(--border)',
                }}
                onMouseEnter={(e) => {
                    setIsHovered(true);
                    (e.currentTarget as HTMLElement).style.willChange = 'transform';
                }}
                onMouseLeave={(e) => {
                    setIsHovered(false);
                    (e.currentTarget as HTMLElement).style.willChange = 'auto';
                }}
                whileHover={{ y: -8, boxShadow: 'var(--shadow-selis-card-hover)', borderColor: 'var(--selis-gold)' }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
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
                        style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--selis-gold)' }}
                    >
                        {product.brand}
                    </span>

                    {/* Product name */}
                    <Link
                        href={`/urun/${product.slug}`}
                        className="block mt-1 transition-colors duration-300"
                        style={{
                            fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
                            fontWeight: 400,
                            fontSize: '15px',
                            lineHeight: 1.3,
                            color: 'var(--foreground)',
                            textDecoration: 'none',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--selis-gold)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--foreground)'; }}
                    >
                        <span data-lang-key={product.nameKey}>{product.name}</span>
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
                            <span className="text-base font-bold" style={{ color: 'var(--foreground)' }}>
                                {formatPrice(displayPrice)}
                            </span>
                            {originalPrice && (
                                <span className="text-[12px] line-through" style={{ color: 'var(--muted-foreground)' }}>
                                    {formatPrice(originalPrice)}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-1" style={{ color: product.hasQuickShip ? 'var(--selis-success)' : 'var(--muted-foreground)' }}>
                            {product.hasQuickShip ? <Zap size={12} fill="var(--selis-success)" /> : <Truck size={12} />}
                            <span style={{ fontSize: '10px', fontWeight: 500 }}>
                                {product.hasQuickShip ? (
                                    <>⚡ 2 <span data-lang-key="product_delivery">days</span></>
                                ) : (
                                    <>{product.deliveryDays || 7} <span data-lang-key="product_delivery">days</span></>
                                )}
                            </span>
                        </div>
                    </div>

                    {/* Installment hint */}
                    {product.price >= 5000 && (
                        <p className="text-[10px] mt-1 font-medium italic opacity-70" style={{ color: 'var(--foreground)' }} data-lang-key="prod_installment_hint">
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

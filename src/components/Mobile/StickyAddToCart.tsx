'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check, Minus, Plus, ChevronRight } from 'lucide-react';
import { useStickyCart } from './useStickyCart';

interface StickyAddToCartProps {
    productName: string;
    productImage: string;
    price: number;
    originalPrice?: number;
    hasVariantSelected?: boolean;
    onScrollToVariants?: () => void;
    onAddToCart?: (quantity: number) => void;
    /** Ref to the original "Sepete Ekle" button on the page */
    originalButtonRef: React.RefObject<HTMLElement | null>;
}

export default function StickyAddToCart({
    productName,
    productImage,
    price,
    originalPrice,
    hasVariantSelected = true,
    onScrollToVariants,
    onAddToCart,
    originalButtonRef,
}: StickyAddToCartProps) {
    const shouldShow = useStickyCart(originalButtonRef);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        if (!hasVariantSelected) {
            onScrollToVariants?.();
            return;
        }
        onAddToCart?.(quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    // Only on mobile
    return (
        <div className="block md:hidden">
            <AnimatePresence>
                {shouldShow && (
                    <motion.div
                        key="sticky-cart"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed left-0 right-0 z-40 px-4 py-3 bg-background/95 backdrop-blur-xl border-t border-border shadow-[0_-8px_24px_rgba(0,0,0,0.08)]"
                        style={{
                            bottom: 'calc(64px + env(safe-area-inset-bottom))',
                        }}
                    >
                        <div className="flex items-center gap-3">
                            {/* Product summary */}
                            <div className="relative w-12 h-12 rounded-sm overflow-hidden flex-shrink-0 bg-muted">
                                <Image src={productImage} alt={productName} fill className="object-cover" sizes="48px" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[12px] font-medium text-foreground truncate">{productName}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <motion.span
                                        key={price}
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-[14px] font-bold text-foreground"
                                    >
                                        ₺{price.toLocaleString('tr-TR')}
                                    </motion.span>
                                    {originalPrice && originalPrice > price && (
                                        <span className="text-[11px] line-through text-muted-foreground/60">
                                            ₺{originalPrice.toLocaleString('tr-TR')}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Quantity stepper */}
                            {hasVariantSelected && (
                                <div className="flex items-center border border-border rounded-sm overflow-hidden flex-shrink-0">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-8 h-9 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                                        style={{ WebkitTapHighlightColor: 'transparent' }}
                                    >
                                        <Minus size={12} />
                                    </button>
                                    <span className="w-8 text-center text-[13px] font-semibold text-foreground">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="w-8 h-9 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                                        style={{ WebkitTapHighlightColor: 'transparent' }}
                                    >
                                        <Plus size={12} />
                                    </button>
                                </div>
                            )}

                            {/* CTA button */}
                            <motion.button
                                onClick={handleAddToCart}
                                className={`flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm text-[13px] font-semibold transition-colors
                                    ${added ? 'bg-green-600 text-white' : 'bg-foreground text-background'}`}
                                style={{
                                    minWidth: 120,
                                    WebkitTapHighlightColor: 'transparent',
                                }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {added ? (
                                    <>
                                        <Check size={14} />
                                        <span data-lang-key="prod_add_cart_added">Eklendi</span>
                                    </>
                                ) : hasVariantSelected ? (
                                    <>
                                        <ShoppingBag size={14} />
                                        <span data-lang-key="prod_add_to_cart">Sepete Ekle</span>
                                    </>
                                ) : (
                                    <>
                                        <span data-lang-key="prod_select_option">Seçenek Seç</span>
                                        <ChevronRight size={14} />
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

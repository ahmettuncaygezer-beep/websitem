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
                        className="fixed left-0 right-0 z-40 px-4 py-3"
                        style={{
                            bottom: 'calc(64px + env(safe-area-inset-bottom))',
                            background: 'rgba(255,255,255,0.97)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            borderTop: '1px solid rgba(0,0,0,0.06)',
                            boxShadow: '0 -8px 24px rgba(0,0,0,0.08)',
                        }}
                    >
                        <div className="flex items-center gap-3">
                            {/* Product summary */}
                            <div className="relative w-12 h-12 rounded-sm overflow-hidden flex-shrink-0 bg-[#F5F0EB]">
                                <Image src={productImage} alt={productName} fill className="object-cover" sizes="48px" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[12px] font-medium text-[#1C1C1E] truncate">{productName}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <motion.span
                                        key={price}
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-[14px] font-bold text-[#1C1C1E]"
                                    >
                                        ₺{price.toLocaleString('tr-TR')}
                                    </motion.span>
                                    {originalPrice && originalPrice > price && (
                                        <span className="text-[11px] line-through text-[#bbb]">
                                            ₺{originalPrice.toLocaleString('tr-TR')}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Quantity stepper */}
                            {hasVariantSelected && (
                                <div className="flex items-center border border-[#E8E3DC] rounded-sm overflow-hidden flex-shrink-0">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-8 h-9 flex items-center justify-center text-[#666] hover:bg-[#F5F0EB] transition-colors"
                                        style={{ WebkitTapHighlightColor: 'transparent' }}
                                    >
                                        <Minus size={12} />
                                    </button>
                                    <span className="w-8 text-center text-[13px] font-semibold text-[#1C1C1E]">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="w-8 h-9 flex items-center justify-center text-[#666] hover:bg-[#F5F0EB] transition-colors"
                                        style={{ WebkitTapHighlightColor: 'transparent' }}
                                    >
                                        <Plus size={12} />
                                    </button>
                                </div>
                            )}

                            {/* CTA button */}
                            <motion.button
                                onClick={handleAddToCart}
                                className="flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm text-[13px] font-semibold text-white transition-colors"
                                style={{
                                    background: added ? '#4CAF50' : '#1C1C1E',
                                    minWidth: 120,
                                    WebkitTapHighlightColor: 'transparent',
                                }}
                                animate={{ background: added ? '#4CAF50' : '#1C1C1E' }}
                                transition={{ duration: 0.2 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {added ? (
                                    <>
                                        <Check size={14} />
                                        Eklendi
                                    </>
                                ) : hasVariantSelected ? (
                                    <>
                                        <ShoppingBag size={14} />
                                        Sepete Ekle
                                    </>
                                ) : (
                                    <>
                                        Seçenek Seç
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

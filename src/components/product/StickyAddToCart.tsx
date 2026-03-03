'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/constants';

interface StickyAddToCartProps {
    product: Product;
}

export function StickyAddToCart({ product }: StickyAddToCartProps) {
    const [isVisible, setIsVisible] = useState(false);
    const { addItem } = useCart();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        // Observe the main add-to-cart button
        const target = document.getElementById('add-to-cart-section');
        if (target) observer.observe(target);

        return () => observer.disconnect();
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed top-0 left-0 right-0 z-[55] glass-header border-b border-border/50 shadow-sm"
                >
                    <div className="container-premium">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center gap-4">
                                {/* Mini product image */}
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sand to-linen flex-shrink-0" />
                                <div>
                                    <h4 className="font-serif text-sm">{product.name}</h4>
                                    <p className="text-xs font-sans text-warm-gray-light">{product.brand}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="font-sans font-bold text-lg hidden sm:block">
                                    {formatPrice(product.salePrice || product.price)}
                                </span>
                                <button
                                    onClick={() => addItem({
                                        id: product.id,
                                        name: product.name,
                                        brand: product.brand ?? 'SELIS',
                                        price: product.salePrice || product.price,
                                        originalPrice: product.price,
                                        image: product.images[0],
                                        href: `/urun/${product.slug}`
                                    }, { selectedColor: product.colors[0]?.name })}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-gold text-white text-xs font-sans font-semibold uppercase tracking-widest rounded-full hover:bg-gold-dark transition-colors"
                                >
                                    <ShoppingBag size={14} />
                                    <span className="hidden sm:inline" data-lang-key="prod_add_cart">Sepete Ekle</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

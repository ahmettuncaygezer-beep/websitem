'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Minus, Plus, Ruler, Smartphone } from 'lucide-react';
import { Product, ProductColor } from '@/types';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/constants';
import { ProductAccordion } from './ProductAccordion';

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
    const [quantity, setQuantity] = useState(1);
    const [isLiked, setIsLiked] = useState(false);
    const { addItem } = useCart();

    const hasDiscount = product.salePrice && product.salePrice < product.price;
    const discountPercent = hasDiscount
        ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
        : 0;

    const handleAddToCart = () => {
        addItem(
            {
                id: product.id,
                name: product.name,
                brand: product.brand ?? 'SELIS',
                price: product.salePrice || product.price,
                originalPrice: product.price,
                image: product.images[0],
                href: `/urun/${product.slug}`
            },
            {
                quantity,
                selectedColor: selectedColor.name
            }
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
        >
            {/* Brand */}
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-warm-gray-light">
                {product.brand}
            </p>

            {/* Name */}
            <h1 className="font-serif text-3xl lg:text-4xl text-charcoal leading-tight">
                {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3">
                {hasDiscount ? (
                    <>
                        <span className="font-sans text-2xl font-bold text-terracotta">
                            {formatPrice(product.salePrice!)}
                        </span>
                        <span className="font-sans text-lg text-warm-gray-light line-through">
                            {formatPrice(product.price)}
                        </span>
                        <span className="px-2.5 py-1 bg-terracotta/10 text-terracotta text-xs font-sans font-semibold rounded-full">
                            %{discountPercent}
                        </span>
                    </>
                ) : (
                    <span className="font-sans text-2xl font-bold">{formatPrice(product.price)}</span>
                )}
            </div>

            {/* Description */}
            <p className="text-body-lg leading-relaxed">{product.description}</p>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Color selector */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-warm-gray">
                        Renk
                    </h4>
                    <span className="text-xs font-sans text-warm-gray-light">{selectedColor.name}</span>
                </div>
                <div className="flex gap-3">
                    {product.colors.map((color) => (
                        <button
                            key={color.hex}
                            onClick={() => setSelectedColor(color)}
                            className={`w-10 h-10 rounded-full transition-all duration-300 ${selectedColor.hex === color.hex
                                ? 'ring-2 ring-gold ring-offset-3 scale-110'
                                : 'hover:scale-105'
                                }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

            {/* Quantity */}
            <div>
                <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-warm-gray mb-3">
                    Adet
                </h4>
                <div className="inline-flex items-center border border-border rounded-full">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-3 hover:bg-sand transition-colors rounded-l-full"
                    >
                        <Minus size={16} />
                    </button>
                    <span className="px-5 font-sans font-semibold text-lg min-w-[3rem] text-center">
                        {quantity}
                    </span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-3 hover:bg-sand transition-colors rounded-r-full"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* Add to cart */}
            <div className="flex gap-3" id="add-to-cart-section">
                <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-3 h-14 bg-gold text-white font-sans font-semibold text-sm uppercase tracking-widest rounded-full hover:bg-gold-dark transition-colors duration-500 shadow-lg shadow-gold/20"
                >
                    <ShoppingBag size={18} />
                    Sepete Ekle
                </button>
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isLiked
                        ? 'bg-terracotta border-terracotta text-white'
                        : 'border-border text-warm-gray hover:border-terracotta hover:text-terracotta'
                        }`}
                >
                    <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                </button>
            </div>

            {/* Quick features */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-sand rounded-xl">
                    <Ruler size={18} className="text-gold" />
                    <div>
                        <p className="text-xs font-sans font-medium">Boyutlar</p>
                        <p className="text-xs font-sans text-warm-gray">
                            {product.dimensions.width} × {product.dimensions.depth} × {product.dimensions.height} {product.dimensions.unit}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-sand rounded-xl">
                    <Smartphone size={18} className="text-gold" />
                    <div>
                        <p className="text-xs font-sans font-medium">AR ile Gör</p>
                        <p className="text-xs font-sans text-warm-gray">Odanda dene</p>
                    </div>
                </div>
            </div>

            {/* Accordion */}
            <ProductAccordion product={product} />
        </motion.div>
    );
}

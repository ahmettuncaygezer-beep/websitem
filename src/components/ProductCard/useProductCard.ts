'use client';

import { useState, useCallback } from 'react';
import { useCart } from '@/hooks/useCart';
import type { Product, CartButtonState } from './product.types';

export function useProductCard(product: Product) {
    const [selectedColorId, setSelectedColorId] = useState(product.colors[0]?.id ?? '');
    const [isHovered, setIsHovered] = useState(false);
    const [cartState, setCartState] = useState<CartButtonState>('idle');
    const [isCompared, setIsCompared] = useState(false);
    const { addItem } = useCart();

    const selectedColor = product.colors.find((c) => c.id === selectedColorId) ?? product.colors[0];

    const handleAddToCart = useCallback(() => {
        if (cartState !== 'idle') return;
        setCartState('loading');

        addItem(
            {
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.originalPrice
                    ? product.price
                    : product.price,
                originalPrice: product.originalPrice ?? product.price,
                image: selectedColor?.image ?? product.colors[0]?.image ?? '',
                href: `/urun/${product.slug}`
            },
            {
                selectedColor: selectedColor?.name
            }
        );

        setTimeout(() => {
            setCartState('success');
            setTimeout(() => setCartState('idle'), 1000);
        }, 400);
    }, [cartState, product, selectedColor, addItem]);

    const toggleCompare = useCallback(() => {
        setIsCompared((p) => !p);
    }, []);

    return {
        selectedColor,
        selectedColorId,
        setSelectedColorId,
        isHovered,
        setIsHovered,
        cartState,
        handleAddToCart,
        isCompared,
        toggleCompare,
    };
}

'use client';

import { WishlistButton } from './WishlistButton';
import { AddToCartButton } from './AddToCartButton';
import { ProductCardQuickView } from './ProductCardQuickView';
import type { CartButtonState } from './product.types';

interface ProductCardActionsProps {
    isHovered: boolean;
    isWishlisted: boolean;
    onWishlistToggle: () => void;
    cartState: CartButtonState;
    onAddToCart: () => void;
    onQuickView: () => void;
    productName: string;
}

export function ProductCardActions({
    isHovered,
    isWishlisted,
    onWishlistToggle,
    cartState,
    onAddToCart,
    onQuickView,
    productName,
}: ProductCardActionsProps) {
    return (
        <>
            <WishlistButton
                isWishlisted={isWishlisted}
                onToggle={onWishlistToggle}
                isCardHovered={isHovered}
                productName={productName}
            />
            <ProductCardQuickView
                isCardHovered={isHovered}
                onOpen={onQuickView}
                productName={productName}
            />
            <AddToCartButton
                state={cartState}
                onAdd={onAddToCart}
                isCardHovered={isHovered}
                productName={productName}
            />
        </>
    );
}

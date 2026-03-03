'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useGlobal } from '@/context/GlobalContext';
import { ProductBreadcrumb } from './ProductBreadcrumb';
import { ProductTitle } from './ProductTitle';
import { ProductPrice } from './ProductPrice';
import { ColorSelector } from './ProductVariants/ColorSelector';
import { SizeSelector } from './ProductVariants/SizeSelector';
import { StockIndicator } from './StockIndicator';
import { QuantitySelector } from './QuantitySelector';
import { ActionButtons } from './ActionButtons';
import { DeliveryInfo } from './DeliveryInfo';
import { InstallmentInfo } from './InstallmentInfo';
import { TrustBadges } from './TrustBadges';
import type { Product } from '@/components/ProductCard/product.types';
import { useWishlist } from '@/components/ProductCard/useWishlist';

interface Props { product: Product; selectedColorId: string; onColorChange: (id: string) => void; buttonRef?: React.Ref<HTMLButtonElement>; }

const SIZES_SAMPLE = [
    { id: 's1', label: '240×160 cm', inStock: true },
    { id: 's2', label: '280×190 cm', inStock: true },
    { id: 's3', label: '320×220 cm', inStock: false },
];

export function ProductInfo({ product, selectedColorId, onColorChange, buttonRef }: Props) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('s1');
    const [isCompared, setIsCompared] = useState(false);
    const { isWishlisted, toggle: toggleWishlist } = useWishlist(product.id);
    const { addItem } = useCart();

    const stock = 5; // placeholder for actual stock
    const selectedColor = product.colors.find((c) => c.id === selectedColorId);
    const { t } = useGlobal();

    // Map category slugs to translation keys
    const categoryKeyMap: Record<string, string> = {
        'oturma-odasi': 'cat_living_room',
        'yatak-odasi': 'cat_bedroom',
        'yemek-odasi': 'cat_dining',
        'calisma-odasi': 'cat_office',
        'aydinlatma': 'cat_lighting',
        'dekorasyon': 'cat_decoration',
        'genc-cocuk-odasi': 'cat_youth',
    };
    const categoryKey = product.categorySlug ? categoryKeyMap[product.categorySlug] : undefined;
    const categoryLabel = categoryKey ? t(categoryKey) : (product.category || 'Oturma Odası');

    const breadcrumbs = [
        { label: t('common_home'), href: '/' },
        { label: categoryLabel, href: `/kategori/${product.categorySlug || 'oturma-odasi'}` },
        { label: product.name },
    ];

    const handleAddToCart = () => {
        addItem(
            {
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.price,
                originalPrice: product.originalPrice ?? product.price,
                image: selectedColor?.image ?? product.colors[0]?.image ?? '',
                href: `/urun/${product.slug}`
            },
            {
                quantity,
                selectedColor: selectedColor?.name ?? product.colors[0]?.name
            }
        );
    };

    return (
        <div>
            <ProductBreadcrumb items={breadcrumbs} />
            <ProductTitle brand={product.brand} name={product.name} sku={`SLS-${product.slug.toUpperCase().slice(0, 8)}`} rating={product.rating} slug={product.slug} />
            <ProductPrice price={product.price} originalPrice={product.originalPrice} />

            {product.colors.length > 0 && (
                <ColorSelector colors={product.colors} selectedId={selectedColorId} onSelect={onColorChange} />
            )}

            <SizeSelector sizes={SIZES_SAMPLE} selectedId={selectedSize} onSelect={setSelectedSize} />
            <StockIndicator stock={stock} />
            <QuantitySelector value={quantity} onChange={setQuantity} max={stock > 0 ? stock : 0} />

            <ActionButtons
                ref={buttonRef}
                productName={product.name}
                isWishlisted={isWishlisted}
                isCompared={isCompared}
                inStock={stock > 0}
                onAddToCart={handleAddToCart}
                onToggleWishlist={toggleWishlist}
                onToggleCompare={() => setIsCompared((p) => !p)}
            />

            <DeliveryInfo deliveryDays={product.deliveryDays} hasQuickShip={product.hasQuickShip} price={product.price} />
            <InstallmentInfo price={product.price} />
            <TrustBadges />
        </div>
    );
}

'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
import { ProductTabs } from './ProductTabs';
import { DescriptionTab } from './ProductTabs/DescriptionTab';
import { SpecsTab } from './ProductTabs/SpecsTab';
import { DeliveryTab } from './ProductTabs/DeliveryTab';
import { ReviewsTab } from './ProductTabs/ReviewsTab';
import { CompleteTheLook } from './CompleteTheLook';
import { RelatedProducts } from './RelatedProducts';
import { RecentlyViewed } from './RecentlyViewed';
import { StickyBuyBar } from './ProductInfo/StickyBuyBar';
import type { Product } from '@/components/ProductCard/product.types';
import type { GalleryItem } from './hooks/useProductGallery';

interface ProductDetailProps { product: Product; }

export function ProductDetail({ product }: ProductDetailProps) {
    const [selectedColorId, setSelectedColorId] = useState(product.colors[0]?.id ?? '');
    const selectedColor = product.colors.find((c) => c.id === selectedColorId);
    const { addItem } = useCart();

    // Build gallery items from product data
    const galleryItems: GalleryItem[] = product.colors.map((c, i) => ({
        id: c.id,
        type: 'image' as const,
        src: c.image,
        thumbnail: c.image,
        alt: `${product.name} — ${c.name}`,
    }));

    // If we have a lifestyle image, add it
    if (product.colors[0]?.lifestyleImage) {
        galleryItems.push({
            id: 'lifestyle',
            type: 'image' as const,
            src: product.colors[0].lifestyleImage,
            thumbnail: product.colors[0].lifestyleImage,
            alt: `${product.name} — yaşam alanı`,
        });
    }

    const tabs = [
        { id: 'desc', label: 'Açıklama', content: <DescriptionTab description={product.description} /> },
        { id: 'specs', label: 'Özellikler', content: <SpecsTab /> },
        { id: 'delivery', label: 'Teslimat & Montaj', content: <DeliveryTab /> },
        { id: 'reviews', label: 'Yorumlar', count: product.rating.count, content: <ReviewsTab /> },
    ];

    const handleStickyAddToCart = () => {
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
                selectedColor: selectedColor?.name ?? product.colors[0]?.name
            }
        );
    };

    return (
        <>
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-4 md:pt-8 pb-20">
                {/* Main Hero – image + info side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-7">
                        <ProductGallery items={galleryItems} />
                    </div>
                    <div className="lg:col-span-5">
                        <ProductInfo product={product} selectedColorId={selectedColorId} onColorChange={setSelectedColorId} />
                    </div>
                </div>

                {/* Product Tabs */}
                <ProductTabs tabs={tabs} />

                {/* Complementary sections */}
                <CompleteTheLook />
                <RelatedProducts />
                <RecentlyViewed
                    currentProduct={{
                        id: product.id,
                        slug: product.slug,
                        name: product.name,
                        image: selectedColor?.image ?? product.colors[0]?.image ?? '',
                        price: product.price,
                        brand: product.brand,
                    }}
                />
            </div>

            {/* Sticky buy bar */}
            <StickyBuyBar
                name={product.name}
                image={selectedColor?.image ?? product.colors[0]?.image ?? ''}
                price={product.price}
                onAddToCart={handleStickyAddToCart}
            />
        </>
    );
}

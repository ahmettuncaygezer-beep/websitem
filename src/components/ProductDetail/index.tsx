'use client';

import { useRef, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import ProductImageGallery from '@/components/Mobile/ProductImageGallery';
import StickyAddToCart from '@/components/Mobile/StickyAddToCart';
import { ProductInfo } from './ProductInfo';
import { ProductTabs } from './ProductTabs';
import { DescriptionTab } from './ProductTabs/DescriptionTab';
import { SpecsTab } from './ProductTabs/SpecsTab';
import { DeliveryTab } from './ProductTabs/DeliveryTab';
import { ReviewsTab } from './ProductTabs/ReviewsTab';
import { CompleteTheLook } from './CompleteTheLook';
import { RelatedProducts } from './RelatedProducts';
import { RecentlyViewed } from './RecentlyViewed';
import type { Product } from '@/components/ProductCard/product.types';

interface ProductDetailProps { product: Product; }

export function ProductDetail({ product }: ProductDetailProps) {
    const [selectedColorId, setSelectedColorId] = useState(product.colors[0]?.id ?? '');
    const selectedColor = product.colors.find((c) => c.id === selectedColorId);
    const { addItem } = useCart();
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Build plain string array of images for the new gallery
    const images = product.colors.map(c => c.image);
    if (product.colors[0]?.lifestyleImage) {
        images.push(product.colors[0].lifestyleImage);
    }

    const tabs = [
        { id: 'desc', label: 'Açıklama', content: <DescriptionTab description={product.description} /> },
        { id: 'specs', label: 'Özellikler', content: <SpecsTab /> },
        { id: 'delivery', label: 'Teslimat & Montaj', content: <DeliveryTab /> },
        { id: 'reviews', label: 'Yorumlar', count: product.rating.count, content: <ReviewsTab /> },
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
                selectedColor: selectedColor?.name ?? product.colors[0]?.name
            }
        );
    };

    return (
        <>
            <div className="max-w-[1400px] mx-auto px-0 md:px-8 pt-0 md:pt-8 pb-20">
                {/* Main Hero – image + info side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-7">
                        <ProductImageGallery images={images} productName={product.name} />
                    </div>
                    <div className="lg:col-span-5 px-4 md:px-0">
                        <ProductInfo
                            product={product}
                            selectedColorId={selectedColorId}
                            onColorChange={setSelectedColorId}
                            buttonRef={buttonRef}
                        />
                    </div>
                </div>

                {/* Product Tabs */}
                <div className="px-4 md:px-0">
                    <ProductTabs tabs={tabs} />
                </div>

                {/* Complementary sections */}
                <div className="px-4 md:px-0">
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
            </div>

            {/* Enhanced Sticky Add to Cart */}
            <StickyAddToCart
                productName={product.name}
                productImage={selectedColor?.image ?? product.colors[0]?.image ?? ''}
                price={product.price}
                originalPrice={product.originalPrice}
                originalButtonRef={buttonRef}
                onAddToCart={(quantity) => {
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
                }}
            />
        </>
    );
}

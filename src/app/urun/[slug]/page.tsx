import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/ProductDetail';
import type { Product } from '@/components/ProductCard/product.types';
import BundleOffer, { type BundleProduct } from '@/components/Marketing/BundleOffer';
import StockNotifyForm from '@/components/Marketing/StockNotifyForm';
import LowStockBadge from '@/components/Marketing/LowStockBadge';
import FlashSaleTimer from '@/components/Marketing/FlashSaleTimer';
import { mockProducts } from '@/data/mock-products';

// Adapter to transform storefront product to the PDP's strict component interface
function mapToPDPProduct(p: any): Product {
    return {
        id: p.id,
        name: p.name,
        brand: p.brand || 'MAISON',
        slug: p.slug,
        price: p.salePrice || p.price,
        originalPrice: p.originalPrice || (p.salePrice ? p.price : undefined),
        currency: p.currency || 'TRY',
        categoryId: p.categoryId,
        categorySlug: p.categorySlug,
        category: p.category || p.categorySlug || p.categoryId,
        images: p.images || [],
        materials: p.materials || [],
        dimensions: p.dimensions || { width: 0, height: 0, depth: 0, unit: 'cm' },
        stock: p.stock || 0,
        featured: p.featured || false,
        isNew: p.isNew || false,
        isFeatured: p.isFeatured || p.featured || false,
        deliveryDays: p.deliveryDays || 5,
        hasQuickShip: p.hasQuickShip ?? (p.stock || 0) > 0,
        description: p.description || '',
        rating: p.rating || { average: 4.8, count: 127 },
        badges: p.badges || (p.isNew ? [{ type: 'new', label: 'Yeni' }] : []),
        colors: (p.colors || []).map((c: any, index: number) => ({
            id: c.id || `c${index}`,
            name: c.name,
            hex: c.hex,
            image: c.image || p.images?.[0] || '/images/products/luna-sofa.jpg',
            lifestyleImage: c.lifestyleImage || p.lifestyleImage || p.images?.[0] || '/images/products/luna-lifestyle.jpg',
            inStock: c.inStock ?? true
        }))
    };
}

// Demo: Flash sale bitiş tarihi
const FLASH_SALE_END = new Date(process.env.NEXT_PUBLIC_FLASH_SALE_END ?? '2026-03-15T23:59:59+03:00');

// Demo stok miktarı (0 = stokta yok, 1-5 = az)
const DEMO_STOCK = 3;

// Bundle tamamlayıcı ürünler
const BUNDLE_PRODUCTS: BundleProduct[] = [
    { id: 'orbit-sehpa', name: 'Orbit Orta Sehpa', price: 12990, image: '/images/products/pera-sehpa.jpg', href: '/urun/orbit-sehpa' },
    { id: 'arc-lambader', name: 'Arc Lambader', price: 8490, image: '/images/products/neva-abajur.jpg', href: '/urun/arc-lambader' },
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    // Find product in mock data
    const rawProduct = mockProducts.find(p => p.slug === slug);
    if (!rawProduct) {
        return { title: 'Ürün Bulunamadı | MAISON' };
    }
    const product = mapToPDPProduct(rawProduct);

    return {
        title: `${product.name} | MAISON Premium Mobilya`,
        description: `El yapımı ${product.name} — ${product.brand} koleksiyonu. ${product.description?.slice(0, 120)}...`,
        openGraph: {
            title: `${product.name} | MAISON`,
            description: product.description?.slice(0, 160),
            images: [product.colors[0]?.image || '/images/products/luna-sofa.jpg'],
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch product by slug from mock data
    const rawProduct = mockProducts.find(p => p.slug === slug);

    if (!rawProduct) {
        notFound();
    }
    const product = mapToPDPProduct(rawProduct);

    const mainBundleProduct: BundleProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.colors[0]?.image ?? '/images/products/luna-sofa.jpg',
        href: `/urun/${product.slug}`,
        isMain: true,
    };

    return (
        <>
            {/* JSON-LD Product structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Product',
                        name: product.name,
                        brand: { '@type': 'Brand', name: 'MAISON' },
                        image: product.colors.map((c) => c.image),
                        description: product.description,
                        sku: `MSN-${product.slug.toUpperCase().slice(0, 8)}`,
                        offers: {
                            '@type': 'Offer',
                            price: product.price.toString(),
                            priceCurrency: 'TRY',
                            availability: 'https://schema.org/InStock',
                        },
                        aggregateRating: {
                            '@type': 'AggregateRating',
                            ratingValue: (product.rating?.average || 4.8).toString(),
                            reviewCount: (product.rating?.count || 127).toString(),
                        },
                    }),
                }}
            />
            <ProductDetail product={product} />

            {/* Pazarlama özellikleri */}
            <div className="max-w-5xl mx-auto px-4 pb-16 flex flex-col gap-8">
                {/* Fiyat üstü: Flash sale + düşük stok */}
                <div className="flex flex-wrap items-center gap-3">
                    <LowStockBadge stock={DEMO_STOCK} />
                    <FlashSaleTimer endDate={FLASH_SALE_END} compact />
                </div>

                {/* Stok bildirim formu (stok=0 ise görünür) */}
                {DEMO_STOCK <= 0 && (
                    <StockNotifyForm
                        productId={product.id}
                        productName={product.name}
                    />
                )}

                {/* Bu koleksiyonu tamamla */}
                <BundleOffer
                    mainProduct={mainBundleProduct}
                    relatedProducts={BUNDLE_PRODUCTS}
                    bundleDiscount={14000}
                />
            </div>
        </>
    );
}

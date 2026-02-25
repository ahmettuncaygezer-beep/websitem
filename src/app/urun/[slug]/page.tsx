import type { Metadata } from 'next';
import { ProductDetail } from '@/components/ProductDetail';
import type { Product } from '@/components/ProductCard/product.types';

// ── Mock product for demo ──
const MOCK_PRODUCT: Product = {
    id: 'luna-kose-koltuk',
    name: 'Luna Köşe Koltuk',
    brand: 'MAISON Atelier',
    slug: 'luna-kose-koltuk',
    price: 74990,
    originalPrice: 89990,
    currency: 'TRY',
    category: 'Oturma Odası',
    isNew: true,
    isFeatured: true,
    deliveryDays: 5,
    hasQuickShip: true,
    description:
        'Luna Köşe Koltuk, yaşam alanınıza premium bir dokunuş katmak için el yapımı masif meşe iskelet üzerine inşa edilmiştir. Yüksek yoğunluklu sünger dolgusu, uzun yıllar boyunca konforunu korurken, OEKO-TEX® sertifikalı kadife kumaşı zarif ve güvenli bir kullanım sunar.\n\nModüler tasarımı sayesinde odanızın boyutuna göre özelleştirilebilir. Çıkarılabilir ve yıkanabilir kılıfları bakımı son derece pratik hale getirir.',
    rating: { average: 4.8, count: 127 },
    badges: [
        { type: 'new', label: 'Yeni' },
        { type: 'bestseller', label: 'Çok Satan' },
    ],
    colors: [
        { id: 'c1', name: 'Açık Gri', hex: '#B0B0B0', image: '/images/gallery-1.jpg', lifestyleImage: '/images/gallery-2.jpg', inStock: true },
        { id: 'c2', name: 'Vizon', hex: '#8B7355', image: '/images/gallery-3.jpg', lifestyleImage: '/images/gallery-4.jpg', inStock: true },
        { id: 'c3', name: 'Krem', hex: '#F5F0EB', image: '/images/gallery-5.jpg', lifestyleImage: '/images/gallery-6.jpg', inStock: true },
        { id: 'c4', name: 'Lacivert', hex: '#1B2838', image: '/images/gallery-1.jpg', lifestyleImage: '/images/gallery-2.jpg', inStock: false },
    ],
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    // In production: fetch product by slug
    const product = MOCK_PRODUCT;
    return {
        title: `${product.name} | MAISON Premium Mobilya`,
        description: `El yapımı ${product.name} — ${product.brand} koleksiyonu. ${product.description?.slice(0, 120)}...`,
        openGraph: {
            title: `${product.name} | MAISON`,
            description: product.description?.slice(0, 160),
            images: [product.colors[0]?.image],
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // In production: fetch product by slug from API/DB
    const product = MOCK_PRODUCT;

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
                            ratingValue: product.rating.average.toString(),
                            reviewCount: product.rating.count.toString(),
                        },
                    }),
                }}
            />
            <ProductDetail product={product} />
        </>
    );
}

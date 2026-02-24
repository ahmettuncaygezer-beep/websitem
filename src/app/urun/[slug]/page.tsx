'use client';

import { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
import { getProductBySlug, getProducts } from '@/lib/api';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { StickyAddToCart } from '@/components/product/StickyAddToCart';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types';
import { Loader2, Palette, Box } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProductConfigurator } from '@/components/product/ProductConfigurator';
import { AnimatePresence } from 'framer-motion';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            const data = await getProductBySlug(slug);

            if (!data) {
                router.push('/');
                return;
            }

            setProduct(data);

            // Fetch related products
            const related = await getProducts({ categorySlug: data.categorySlug });
            setRelatedProducts(related.filter(p => p.id !== data.id).slice(0, 4));

            setLoading(false);
        };

        fetchProductData();
    }, [slug, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <Loader2 className="animate-spin text-gold mx-auto mb-4" size={48} />
                    <p className="font-sans text-warm-gray">Ürün detayları yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
                <div className="text-center max-w-md">
                    <h1 className="text-headline mb-4 font-serif">Ürün Bulunamadı</h1>
                    <p className="font-sans text-warm-gray mb-8">
                        Aradığınız ürün mağazamızda bulunmuyor veya koleksiyondan kaldırılmış olabilir.
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-8 py-4 bg-charcoal text-white text-sm font-sans font-semibold uppercase tracking-widest rounded-full hover:bg-gold transition-colors"
                    >
                        Ana Sayfaya Dön
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <StickyAddToCart product={product} />

            {/* Breadcrumb */}
            <div className="container-premium pt-6 pb-2">
                <nav className="text-xs font-sans text-warm-gray-light">
                    <span>Ana Sayfa</span>
                    <span className="mx-2">/</span>
                    <span className="capitalize">{product.categorySlug.replace('-', ' ')}</span>
                    <span className="mx-2">/</span>
                    <span className="text-charcoal">{product.name}</span>
                </nav>
            </div>

            {/* Main product section */}
            <div className="container-premium py-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
                    {/* Gallery - 60% */}
                    <div className="lg:col-span-3">
                        <ProductGallery images={product.images} name={product.name} slug={product.slug} />
                    </div>

                    {/* Info - 40% */}
                    <div className="lg:col-span-2">
                        <ProductInfo product={product} />

                        {/* Workshop Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsConfiguratorOpen(true)}
                            className="w-full mt-8 p-6 bg-sand rounded-3xl border-2 border-gold/10 hover:border-gold/30 transition-all flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                    <Palette className="text-gold" size={24} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold mb-1">Butik Atölye</p>
                                    <p className="font-serif text-lg text-charcoal">Kendi Parçanı Tasarla</p>
                                </div>
                            </div>
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-gold group-hover:text-white transition-all">
                                <Box size={20} />
                            </div>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Related products */}
            {relatedProducts.length > 0 && (
                <section className="bg-sand py-20">
                    <div className="container-premium">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-14"
                        >
                            <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-4">
                                Bunları da Beğenebilirsiniz
                            </p>
                            <h2 className="text-headline text-charcoal">Benzer Ürünler</h2>
                        </motion.div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <AnimatePresence>
                {isConfiguratorOpen && (
                    <ProductConfigurator
                        isOpen={isConfiguratorOpen}
                        onClose={() => setIsConfiguratorOpen(false)}
                        basePrice={product.price}
                        productName={product.name}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

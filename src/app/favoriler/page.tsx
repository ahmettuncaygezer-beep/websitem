'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, ArrowRight, Loader2 } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { getProductsByIds } from '@/lib/api';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types';

export default function FavoritesPage() {
    const { favorites, clearAll } = useFavorites();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (favorites.length === 0) {
                setProducts([]);
                setLoading(false);
                return;
            }
            setLoading(true);
            const data = await getProductsByIds(favorites);
            setProducts(data);
            setLoading(false);
        };
        fetchFavorites();
    }, [favorites]);

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumb */}
            <div className="container-premium pt-6 pb-2">
                <nav className="text-xs font-sans text-warm-gray-light">
                    <Link href="/" className="hover:text-gold transition-colors" data-lang-key="nav_home">Ana Sayfa</Link>
                    <span className="mx-2">/</span>
                    <span className="text-charcoal" data-lang-key="nav_favorites">Favorilerim</span>
                </nav>
            </div>

            <div className="container-premium py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-end justify-between mb-10"
                >
                    <div>
                        <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-3" data-lang-key="fav_page_title">
                            Beğendiklerim
                        </p>
                        <h1 className="text-headline text-charcoal" data-lang-key="fav_page_title">Favorilerim</h1>
                        <p className="text-sm font-sans text-warm-gray mt-2">
                            {products.length} <span data-lang-key="fav_count_suffix">ürün</span>
                        </p>
                    </div>
                    {products.length > 0 && (
                        <button
                            onClick={clearAll}
                            className="text-xs font-sans uppercase tracking-wider text-warm-gray-light hover:text-terracotta transition-colors"
                            data-lang-key="fav_clear_all"
                        >
                            Tümünü Temizle
                        </button>
                    )}
                </motion.div>

                {/* Products grid or empty state */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="animate-spin text-gold" size={40} />
                        <p className="text-sm font-sans text-warm-gray" data-lang-key="fav_loading">Favorileriniz yükleniyor...</p>
                    </div>
                ) : products.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center py-24"
                    >
                        <div className="w-20 h-20 rounded-full bg-sand flex items-center justify-center mx-auto mb-6">
                            <Heart size={32} className="text-warm-gray-light" />
                        </div>
                        <h2 className="font-serif text-2xl text-charcoal mb-3" data-lang-key="fav_empty_title">
                            Henüz favoriniz yok
                        </h2>
                        <p className="text-sm font-sans text-warm-gray max-w-md mx-auto mb-8" data-lang-key="fav_empty_desc">
                            Beğendiğiniz ürünleri kalp ikonuna tıklayarak favorilerinize ekleyin.
                            Böylece ilham aldığınız parçaları bir arada tutabilirsiniz.
                        </p>
                        <Link
                            href="/kategori/oturma-odasi"
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-white text-sm font-sans font-semibold uppercase tracking-widest rounded-full hover:bg-gold transition-colors duration-500"
                        >
                            <span data-lang-key="cart_explore_products">Ürünleri Keşfet</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

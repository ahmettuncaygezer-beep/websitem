'use client';

import { useState, useEffect } from 'react';
import { getProducts } from '@/lib/api';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { motion } from 'framer-motion';
import { Loader2, SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return 0; // default newest (mocked)
    });

    return (
        <main className="py-20 min-h-screen bg-sand/20">
            <div className="container-premium">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-serif mb-4" data-lang-key="cat_all_products">Tüm Ürünler</h1>
                        <p className="text-charcoal/60" data-lang-key="cat_all_products_desc">Yaşam alanlarınız için özenle seçilmiş premium koleksiyonlar.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-sand-dark rounded-sm text-sm font-medium">
                                <SlidersHorizontal size={16} />
                                <span data-lang-key="cat_filter">Filtrele</span>
                            </button>
                        </div>
                        <div className="relative group">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-white border border-sand-dark px-4 py-2 pr-10 rounded-sm text-sm font-medium outline-none focus:border-gold"
                            >
                                <option value="newest" data-lang-key="sort_newest">En Yeniler</option>
                                <option value="price-low" data-lang-key="sort_price_low">Fiyat: Düşükten Yükseğe</option>
                                <option value="price-high" data-lang-key="sort_price_high">Fiyat: Yüksekten Düşüğe</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/40" />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-gold" size={40} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                        {sortedProducts.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <ProductCard product={product} priority={idx < 4} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

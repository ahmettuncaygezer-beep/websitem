'use client';

import { useState, useEffect, use } from 'react';
import { getProducts } from '@/lib/api';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { useGlobal } from '@/context/GlobalContext';

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const { formatPrice } = useGlobal();
    const { slug } = use(params);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const category = CATEGORIES.find(c => c.slug === slug) || { name: 'Kategori', nameKey: 'cat_default_name', description: 'Özel koleksiyonumuz.', descriptionKey: 'cat_default_desc' };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await getProducts({ categorySlug: slug });
                setProducts(data);
            } catch (err) {
                console.error('Error fetching category products:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [slug]);

    return (
        <main className="py-24 min-h-screen bg-background transition-colors duration-500">
            <div className="container-premium">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 border-b border-border pb-8"
                >
                    <h1 className="text-5xl font-serif mb-4 capitalize text-foreground" data-lang-key={category.nameKey}>
                        {category.name}
                    </h1>
                    <p className="text-muted-foreground max-w-2xl text-lg" data-lang-key={category.descriptionKey}>
                        {category.description}
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-32"
                        >
                            <Loader2 className="animate-spin text-maison-gold mb-4" size={48} />
                            <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs" data-lang-key="cat_preparing_collection">Koleksiyon Hazırlanıyor</p>
                        </motion.div>
                    ) : products.length > 0 ? (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
                        >
                            {products.map((product, idx) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <ProductCard product={product} index={idx} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-32 bg-card rounded-xl border border-border border-dashed"
                        >
                            <p className="text-foreground/40 font-medium text-lg" data-lang-key="cat_no_products">Bu kategoride henüz ürün bulunmuyor.</p>
                            <p className="text-muted-foreground/50 text-sm mt-2" data-lang-key="cat_check_later">Lütfen daha sonra tekrar kontrol edin veya diğer kategorilerimize göz atın.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}

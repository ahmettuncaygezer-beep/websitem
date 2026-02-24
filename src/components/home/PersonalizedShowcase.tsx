'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts } from '@/lib/api';
import { Product } from '@/types';
import { supabase } from '@/lib/supabase';

export function PersonalizedShowcase() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState<string | null>(null);
    const [userStyles, setUserStyles] = useState<string[]>([]);

    useEffect(() => {
        const fetchUserDataAndProducts = async () => {
            setLoading(true);
            try {
                const response = await supabase.auth.getUser();
                const user = response?.data?.user;

                if (user) {
                    const firstName = user.user_metadata?.first_name;
                    const styles = user.user_metadata?.style_preferences || [];

                    setUserName(firstName);
                    setUserStyles(styles);

                    // Fetch all products and filter by style (simulated for now since products don't have style tags yet)
                    // In a real scenario, we'd add 'style' tags to the products table and query by them.
                    const allProducts = await getProducts();

                    // Simple logic: if user has styles, show some products as "recommendations"
                    // If no styles, show general featured products
                    const recommended = styles.length > 0
                        ? allProducts.slice(0, 4) // Replace with real filter logic later
                        : allProducts.filter(p => p.featured).slice(0, 4);

                    setProducts(recommended);
                }
            } catch (err) {
                console.error('Error fetching personal showcase:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDataAndProducts();
    }, []);

    if (!userName || products.length === 0) return null;

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container-premium">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 text-gold mb-3">
                            <Sparkles size={18} />
                            <span className="text-xs font-sans font-bold uppercase tracking-[0.3em]">
                                Senin İçin Seçtiklerimiz
                            </span>
                        </div>
                        <h2 className="text-display-sm text-charcoal">
                            Hoş Geldin, {userName}. <br />
                            <span className="text-warm-gray-light">Sana Özel Seçkimiz</span>
                        </h2>
                    </motion.div>

                    <Link
                        href="/kategori/oturma-odasi"
                        className="group flex items-center gap-2 text-sm font-sans font-bold tracking-widest uppercase text-charcoal hover:text-gold transition-colors"
                    >
                        Tümünü Gör
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-gold" size={40} />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

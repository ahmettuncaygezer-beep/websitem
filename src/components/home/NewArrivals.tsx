'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '@/data/mock-products';
import { ProductCard } from '@/components/product/ProductCard';
import { useTranslationStore, translations } from '@/store/translationStore';

export function NewArrivals() {
    const products = getFeaturedProducts().slice(0, 4);
    const { language } = useTranslationStore();
    const t = (key: string) => translations[language]?.[key];

    return (
        <section className="bg-background py-20 md:py-28">
            <div className="container-premium">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-14"
                >
                    <div>
                        <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-4" data-lang-key="new_arr_badge">
                            {t('new_arr_badge') || 'Yeni Gelenler'}
                        </p>
                        <h2 className="text-headline text-foreground" data-lang-key="new_arr_title">
                            {t('new_arr_title') || 'Öne Çıkan Parçalar'}
                        </h2>
                    </div>
                    <Link
                        href="/kategori/oturma-odasi"
                        className="group mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-sans font-medium text-warm-gray hover:text-gold transition-colors"
                    >
                        <span data-lang-key="new_arr_link">{t('new_arr_link') || 'Tüm Ürünleri Gör'}</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.15 } },
                    }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
                            }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section >
    );
}

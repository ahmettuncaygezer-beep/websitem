'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { getProducts } from '@/lib/api';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types';

const collectionDefinitions = [
    {
        id: 'ilkbahar-yaz-2026',
        title: 'İlkbahar / Yaz 2026',
        subtitle: 'Yeni Sezon',
        description: 'Doğanın uyanışından ilham alan, açık tonlar ve organik formlarla bezeli yeni sezon koleksiyonumuz.',
        image: '/images/hero/main.jpg',
        filter: { isNew: true },
    },
    {
        id: 'minimal-yasam',
        title: 'Minimal Yaşam',
        subtitle: 'Zamansız Tasarım',
        description: 'Az çoktur. Temiz çizgiler, nötr tonlar ve fonksiyonel zarafet ile sade yaşamın estetiği.',
        image: '/images/categories/living-room.jpg',
        filter: { categorySlug: 'oturma-odasi' },
    },
    {
        id: 'nordik-sicaklik',
        title: 'Nordic Warmth',
        subtitle: 'Kuzey Ruhu',
        description: 'İskandinav tasarım geleneğinden ilham alan, doğal ahşap ve yumuşak dokuların buluşması.',
        image: '/images/categories/bedroom.jpg',
        filter: { featured: true },
    },
];

export default function CollectionsPage() {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            const data = await getProducts();
            setAllProducts(data);
            setLoading(false);
        };
        fetchAll();
    }, []);

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="container-premium pt-6 pb-2">
                <nav className="text-xs font-sans text-warm-gray-light">
                    <Link href="/" className="hover:text-gold transition-colors">Ana Sayfa</Link>
                    <span className="mx-2">/</span>
                    <span className="text-charcoal">Koleksiyonlar</span>
                </nav>
            </div>

            <div className="container-premium py-8 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-4">
                        Seçilmiş Koleksiyonlar
                    </p>
                    <h1 className="text-display text-charcoal">Koleksiyonlar</h1>
                    <p className="text-body-lg mt-4 max-w-lg mx-auto">
                        Yaşam tarzınıza uygun, özenle küratörlüğü yapılmış koleksiyonlarımızı keşfedin.
                    </p>
                </motion.div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-gold" size={48} />
                    <p className="text-sm font-sans text-warm-gray">Koleksiyonlar hazırlanıyor...</p>
                </div>
            ) : (
                <>
                    {/* Collections */}
                    {collectionDefinitions.map((collection, index) => {
                        let products = allProducts;
                        if (collection.filter.isNew) products = products.filter(p => p.isNew);
                        if (collection.filter.categorySlug) products = products.filter(p => p.categorySlug === collection.filter.categorySlug);
                        if (collection.filter.featured) products = products.filter(p => p.featured);

                        products = products.slice(0, 4);

                        return (
                            <section key={collection.id} className={index % 2 === 0 ? 'bg-white' : 'bg-sand'}>
                                {/* Collection hero */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="relative h-[45vh] min-h-[350px] overflow-hidden"
                                >
                                    <Image
                                        src={collection.image}
                                        alt={collection.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
                                    <div className="relative h-full container-premium flex flex-col justify-end pb-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: 0.2 }}
                                        >
                                            <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-3">
                                                {collection.subtitle}
                                            </p>
                                            <h2 className="font-serif text-3xl md:text-5xl text-white mb-3">
                                                {collection.title}
                                            </h2>
                                            <p className="text-base font-sans text-white/70 max-w-lg">
                                                {collection.description}
                                            </p>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Collection products */}
                                <div className="container-premium py-14">
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                        {products.map((product, pIndex) => (
                                            <motion.div
                                                key={product.id}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: pIndex * 0.1 }}
                                            >
                                                <ProductCard product={product} />
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="text-center mt-10">
                                        <Link
                                            href={collection.filter.categorySlug ? `/kategori/${collection.filter.categorySlug}` : '/kategori/oturma-odasi'}
                                            className="group inline-flex items-center gap-2 text-sm font-sans font-semibold uppercase tracking-widest text-charcoal hover:text-gold transition-colors"
                                        >
                                            Tüm Koleksiyonu Gör
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </>
            )}
        </div>
    );
}

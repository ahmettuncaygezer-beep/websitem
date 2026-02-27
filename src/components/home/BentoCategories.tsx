'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '@/lib/constants';
import { ArrowUpRight } from 'lucide-react';

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

const FILTERS = [
    { label: 'Tümü', id: 'all', langKey: 'bento_filter_all' },
    { label: 'Oturma', id: 'oturma-odasi', langKey: 'bento_filter_living' },
    { label: 'Yatak', id: 'yatak-odasi', langKey: 'bento_filter_bed' },
    { label: 'Yemek', id: 'yemek-odasi', langKey: 'bento_filter_dining' },
    { label: 'Çalışma', id: 'calisma-odasi', langKey: 'bento_filter_office' },
    { label: 'Aydınlatma', id: 'aydinlatma', langKey: 'bento_filter_lighting' },
];

// Bento grid layout configs
const gridConfigs: Record<string, string> = {
    'oturma-odasi': 'col-span-2 row-span-2',
    'yatak-odasi': 'col-span-1 row-span-1',
    'yemek-odasi': 'col-span-1 row-span-1',
    'calisma-odasi': 'col-span-1 row-span-2',
    'aydinlatma': 'col-span-1 row-span-1',
    'dekorasyon': 'col-span-1 row-span-1',
};

// Unique AI-generated category images
const categoryImages: Record<string, string> = {
    'oturma-odasi': '/images/categories/living-room.jpg',
    'yatak-odasi': '/images/categories/bedroom.jpg',
    'yemek-odasi': '/images/categories/dining.jpg',
    'calisma-odasi': '/images/categories/office.jpg',
    'aydinlatma': '/images/categories/lighting.jpg',
    'dekorasyon': '/images/categories/decor.jpg',
};

export function BentoCategories() {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredCategories = activeFilter === 'all'
        ? CATEGORIES.filter(cat => gridConfigs[cat.slug]) // Sadece grid config'i olanları göster (6 tane)
        : CATEGORIES.filter(cat => cat.slug === activeFilter);

    return (
        <section className="bg-background py-20 md:py-28 transition-colors duration-500">
            <div className="container-premium">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10"
                >
                    <p className="text-xs font-sans uppercase tracking-[0.3em] text-maison-gold mb-4" data-lang-key="bento_badge">
                        Kategoriler
                    </p>
                    <h2 className="text-headline text-foreground mb-8" data-lang-key="bento_title">
                        Yaşam Alanınızı Keşfedin
                    </h2>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-3 md:gap-8 mb-12">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`relative pb-2 text-sm font-sans font-bold uppercase tracking-widest transition-all duration-300 ${activeFilter === filter.id ? 'text-maison-gold' : 'text-foreground/60 hover:text-maison-gold'
                                    }`}
                                data-lang-key={`hero.${filter.langKey}`}
                            >
                                {filter.label}
                                {activeFilter === filter.id && (
                                    <motion.div
                                        layoutId="categoryFilterUnderline"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    layout
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-4"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredCategories.map((category) => (
                            <motion.div
                                layout
                                key={category.id}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={`${gridConfigs[category.slug]} group relative rounded-2xl overflow-hidden cursor-pointer bg-card/40`}
                                style={{ border: '1px solid var(--glass-border)' }}
                            >
                                <Link href={`/kategori/${category.slug}`} className="block h-full">
                                    <Image
                                        src={categoryImages[category.slug] || '/images/categories/placeholder.jpg'}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                    {/* Glassy overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent group-hover:from-background/100 transition-colors duration-500" />

                                    <div className="relative h-full flex flex-col justify-between p-5 md:p-6">
                                        <div className="flex justify-between items-start">
                                            <div />
                                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                                                <ArrowUpRight size={14} className="text-white" />
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-serif text-lg md:text-xl text-white">
                                                {category.name}
                                            </h3>
                                            <p className="text-xs font-sans text-white/70 mt-1">
                                                {category.productCount} <span data-lang-key="bento_products_count">ürün</span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}

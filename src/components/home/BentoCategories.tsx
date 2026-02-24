'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/lib/constants';
import { ArrowUpRight } from 'lucide-react';

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

// Bento grid layout configs
const gridConfigs = [
    'col-span-2 row-span-2', // Large
    'col-span-1 row-span-1', // Small
    'col-span-1 row-span-1', // Small
    'col-span-1 row-span-2', // Tall
    'col-span-1 row-span-1', // Small
    'col-span-1 row-span-1', // Small
];

// Unique AI-generated category images
const categoryImages = [
    '/images/categories/living-room.jpg',
    '/images/categories/bedroom.jpg',
    '/images/categories/dining.jpg',
    '/images/categories/office.jpg',
    '/images/categories/lighting.jpg',
    '/images/categories/decor.jpg',
];

export function BentoCategories() {
    return (
        <section className="bg-white py-20 md:py-28">
            <div className="container-premium">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-14"
                >
                    <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-4">
                        Kategoriler
                    </p>
                    <h2 className="text-headline text-charcoal">
                        Yaşam Alanınızı Keşfedin
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-4"
                >
                    {CATEGORIES.map((category, index) => (
                        <motion.div
                            key={category.id}
                            variants={itemVariants}
                            className={`${gridConfigs[index]} group relative rounded-2xl overflow-hidden cursor-pointer`}
                        >
                            <Link href={`/kategori/${category.slug}`} className="block h-full">
                                <Image
                                    src={categoryImages[index]}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent group-hover:from-charcoal/70 transition-colors duration-500" />

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
                                            {category.productCount} ürün
                                        </p>
                                        {index === 0 && (
                                            <p className="text-sm font-sans text-white/60 mt-2 max-w-[200px] hidden md:block">
                                                {category.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

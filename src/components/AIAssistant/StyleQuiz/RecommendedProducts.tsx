'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import type { RecommendedProduct } from '../types/ai.types';

interface Props {
    products: RecommendedProduct[];
}

export function RecommendedProducts({ products }: Props) {
    const [filter, setFilter] = useState('Tümü');
    const { addItem } = useCart();

    const categories = ['Tümü', 'Oturma Odası', 'Yatak Odası', 'Aydınlatma', 'Dekorasyon'];

    const filteredProducts = filter === 'Tümü'
        ? products
        : products.filter(p => true); // In a real app, we'd have categories in product type

    const handleAddAll = () => {
        filteredProducts.forEach((product) => {
            addItem({
                id: product.id,
                name: product.name,
                brand: 'MAISON',
                price: product.price,
                originalPrice: product.price,
                image: product.image,
                href: product.href
            });
        });
    };

    return (
        <div className="py-20 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif text-[#1C1C1E] mb-4">
                    Stilinize Özel Seçmeler
                </h2>
                <p className="text-[#666] font-light">
                    {products.length} ürün öneriniz tam olarak tarzınızı yansıtıyor.
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2.5 rounded-full text-xs font-medium transition-all duration-300 border ${filter === cat
                            ? 'bg-[#1C1C1E] text-white border-[#1C1C1E]'
                            : 'bg-white text-[#666] border-gray-100 hover:border-[#C9A96E]'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product, i) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group block bg-white rounded-2xl overflow-hidden border border-gray-50 hover:border-[#C9A96E]/30 transition-all duration-300"
                    >
                        <Link href={product.href} className="relative block aspect-[4/5] overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#C9A96E] text-[10px] font-bold rounded-full shadow-sm border border-[#C9A96E]/20">
                                    🎯 %{product.matchScore} Uyumlu
                                </span>
                            </div>
                        </Link>

                        <div className="p-5">
                            <h4 className="text-[14px] font-medium text-[#1C1C1E] mb-1 truncate">
                                {product.name}
                            </h4>
                            <p className="text-[11px] text-[#999] italic mb-3">
                                {product.matchReason}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-[15px] font-bold text-[#1C1C1E]">
                                    ₺{product.price.toLocaleString('tr-TR')}
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addItem({
                                            id: product.id,
                                            name: product.name,
                                            brand: 'MAISON',
                                            price: product.price,
                                            originalPrice: product.price,
                                            image: product.image,
                                            href: product.href
                                        });
                                    }}
                                    className="text-[11px] font-bold text-[#C9A96E] hover:text-[#B8915A] transition-colors leading-none pb-0.5 border-b border-[#C9A96E]">
                                    Sepete Ekle
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-20 flex justify-center">
                <button
                    onClick={handleAddAll}
                    className="px-12 py-4 bg-[#1C1C1E] text-white text-sm font-bold tracking-widest uppercase rounded-full hover:bg-[#C9A96E] hover:text-[#1C1C1E] transition-all duration-300 shadow-xl shadow-black/10">
                    Tüm Önerileri Sepete Ekle
                </button>
            </div>
        </div>
    );
}

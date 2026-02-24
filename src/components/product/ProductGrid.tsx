'use client';

import { motion } from 'framer-motion';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="font-serif text-xl mb-2">Ürün Bulunamadı</p>
                <p className="text-sm font-sans text-warm-gray">
                    Filtrelerinizi değiştirmeyi deneyin.
                </p>
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
        >
            {products.map((product) => (
                <motion.div
                    key={product.id}
                    layout
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                    }}
                >
                    <ProductCard product={product} />
                </motion.div>
            ))}
        </motion.div>
    );
}

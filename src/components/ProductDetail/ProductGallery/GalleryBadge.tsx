'use client';

import { motion } from 'framer-motion';
import type { ProductBadge } from '@/components/ProductCard/product.types';

interface GalleryBadgeProps { badges: ProductBadge[]; }

const STYLES: Record<ProductBadge['type'], { bg: string; color: string }> = {
    new: { bg: '#1C1C1E', color: 'white' },
    sale: { bg: '#E53935', color: 'white' },
    'low-stock': { bg: '#FF9800', color: 'white' },
    bestseller: { bg: '#C9A96E', color: '#1C1C1E' },
    exclusive: { bg: 'rgba(255,255,255,0.15)', color: 'white' },
};

export function GalleryBadge({ badges }: GalleryBadgeProps) {
    if (!badges.length) return null;
    return (
        <div className="absolute top-3 left-3 flex flex-col gap-1.5" style={{ zIndex: 10 }}>
            {badges.map((b, i) => (
                <motion.span key={b.type} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                    className="inline-flex items-center px-2.5 py-1 font-semibold tracking-wider uppercase whitespace-nowrap"
                    style={{ fontSize: '10px', borderRadius: '2px', ...STYLES[b.type], backdropFilter: b.type === 'exclusive' ? 'blur(4px)' : undefined }}>
                    {b.type === 'bestseller' ? `⭐ ${b.label}` : b.label}
                </motion.span>
            ))}
        </div>
    );
}

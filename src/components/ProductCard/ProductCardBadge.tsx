'use client';

import { motion } from 'framer-motion';
import type { ProductBadge } from './product.types';

const BADGE_STYLES: Record<ProductBadge['type'], { bg: string; color: string; border?: string }> = {
    new: { bg: '#1C1C1E', color: 'white' },
    sale: { bg: '#E53935', color: 'white' },
    'low-stock': { bg: '#FF9800', color: 'white' },
    bestseller: { bg: '#C9A96E', color: '#1C1C1E' },
    exclusive: { bg: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.6)' },
};

interface ProductCardBadgeProps {
    badges?: ProductBadge[];
}

export function ProductCardBadge({ badges }: ProductCardBadgeProps) {
    if (!badges || !badges.length) return null;

    return (
        <div className="absolute top-3 left-3 flex flex-col gap-1.5" style={{ zIndex: 10 }}>
            {badges.map((badge, i) => {
                const s = BADGE_STYLES[badge.type];
                const isLowStock = badge.type === 'low-stock';

                return (
                    <motion.span
                        key={badge.type}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                        className="relative inline-flex items-center px-2.5 py-1 font-semibold tracking-wider uppercase whitespace-nowrap"
                        style={{
                            fontSize: '10px',
                            borderRadius: '2px',
                            background: s.bg,
                            color: s.color,
                            border: s.border ?? 'none',
                            backdropFilter: badge.type === 'exclusive' ? 'blur(4px)' : undefined,
                        }}
                    >
                        {isLowStock && (
                            <span
                                className="absolute inset-0 rounded-sm animate-ping"
                                style={{ background: s.bg, opacity: 0.4 }}
                                aria-hidden="true"
                            />
                        )}
                        <span className="relative">
                            {badge.type === 'bestseller' ? `⭐ ${badge.label}` : badge.label}
                        </span>
                    </motion.span>
                );
            })}
        </div>
    );
}

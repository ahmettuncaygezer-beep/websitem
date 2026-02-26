'use client';

import { motion } from 'framer-motion';

interface LowStockBadgeProps {
    stock: number; // 0 = stokta yok, 1-5 = az
}

export default function LowStockBadge({ stock }: LowStockBadgeProps) {
    if (stock <= 0 || stock > 5) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-1.5 bg-[#FFF3F3] border border-[#FFCDD2] text-[#E53935] text-[11px] font-semibold px-2.5 py-1 rounded-sm"
        >
            <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
                ⚠️
            </motion.span>
            Son {stock} adet kaldı!
        </motion.div>
    );
}

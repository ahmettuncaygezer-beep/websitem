'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useFilters } from '@/hooks/useFilters';

export function FilterChips() {
    const { filters, removeFilter, clearFilters, hasActiveFilters } = useFilters();

    if (!hasActiveFilters()) return null;

    const allChips = [
        ...filters.colors.map((c) => ({ type: 'colors' as const, value: c })),
        ...filters.materials.map((m) => ({ type: 'materials' as const, value: m })),
    ];

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap items-center gap-2 mb-6"
        >
            <AnimatePresence mode="popLayout">
                {allChips.map((chip) => (
                    <motion.button
                        key={`${chip.type}-${chip.value}`}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => removeFilter(chip.type, chip.value)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-sand rounded-full text-xs font-sans text-charcoal hover:bg-sand-dark transition-colors group"
                    >
                        <span>{chip.value}</span>
                        <X size={12} className="text-warm-gray-light group-hover:text-charcoal transition-colors" />
                    </motion.button>
                ))}
            </AnimatePresence>

            <button
                onClick={clearFilters}
                className="text-xs font-sans text-gold hover:text-gold-dark transition-colors uppercase tracking-wider ml-2"
            >
                Tümünü Temizle
            </button>
        </motion.div>
    );
}

'use client';

import { motion } from 'framer-motion';
import { FILTER_COLORS, FILTER_MATERIALS, CATEGORIES } from '@/lib/constants';
import { useFilters } from '@/hooks/useFilters';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { formatPrice } from '@/lib/constants';
import { useState, useEffect } from 'react';

export function FilterSidebar() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const {
        filters,
        toggleColor,
        toggleMaterial,
        toggleCategory,
        toggleInStock,
        toggleIsNew,
        setPriceRange,
        clearFilters,
        hasActiveFilters
    } = useFilters();

    if (!mounted) {
        return (
            <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
                <div className="sticky top-28 space-y-8 animate-pulse">
                    <div className="h-8 w-32 bg-sand/20 rounded" />
                    <div className="space-y-4">
                        <div className="h-4 w-24 bg-sand/20 rounded" />
                        <div className="space-y-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-4 w-full bg-sand/20 rounded" />
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        );
    }

    return (
        <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg">Filtreler</h3>
                    <h1 className="text-red-500 font-bold text-3xl">VERSION 2.0 DEBUG</h1>
                    {hasActiveFilters() && (
                        <button
                            onClick={clearFilters}
                            className="text-xs font-sans text-gold hover:text-gold-dark transition-colors uppercase tracking-wider"
                        >
                            Temizle
                        </button>
                    )}
                </div>

                {/* Categories filter */}
                <div>
                    <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-warm-gray mb-4">
                        Kategori
                    </h4>
                    <div className="space-y-2.5">
                        {CATEGORIES.map((cat) => (
                            <label
                                key={cat.id}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <Checkbox
                                    checked={(filters.categories || []).includes(cat.slug)}
                                    onCheckedChange={() => toggleCategory(cat.slug)}
                                    className="border-border data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                                />
                                <span className="text-sm font-sans text-warm-gray group-hover:text-charcoal transition-colors">
                                    {cat.name}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Stock & Status filter */}
                <div>
                    <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-warm-gray mb-4">
                        Durum
                    </h4>
                    <div className="space-y-2.5">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <Checkbox
                                checked={filters.inStock}
                                onCheckedChange={toggleInStock}
                                className="border-border data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                            />
                            <span className="text-sm font-sans text-warm-gray group-hover:text-charcoal transition-colors">
                                Stoktakiler
                            </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <Checkbox
                                checked={filters.isNew}
                                onCheckedChange={toggleIsNew}
                                className="border-border data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                            />
                            <span className="text-sm font-sans text-warm-gray group-hover:text-charcoal transition-colors">
                                Sadece Yeni Ürünler
                            </span>
                        </label>
                    </div>
                </div>

                {/* Color filter */}
                <div>
                    <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-warm-gray mb-4">
                        Renk
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                        {FILTER_COLORS.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => toggleColor(color.name)}
                                className={`group relative w-8 h-8 rounded-full transition-transform duration-300 hover:scale-110 ${filters.colors.includes(color.name)
                                    ? 'ring-2 ring-gold ring-offset-2 scale-110'
                                    : ''
                                    }`}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            >
                                {filters.colors.includes(color.name) && (
                                    <motion.svg
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute inset-0 m-auto w-3.5 h-3.5"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M3 7l3 3 5-5"
                                            stroke={color.hex === '#FAFAFA' || color.hex === '#D4C5B2' ? '#1A1A1A' : '#FFFFFF'}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </motion.svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Material filter */}
                <div>
                    <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-warm-gray mb-4">
                        Malzeme
                    </h4>
                    <div className="space-y-2.5">
                        {FILTER_MATERIALS.map((material) => (
                            <label
                                key={material}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <Checkbox
                                    checked={filters.materials.includes(material)}
                                    onCheckedChange={() => toggleMaterial(material)}
                                    className="border-border data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                                />
                                <span className="text-sm font-sans text-warm-gray group-hover:text-charcoal transition-colors">
                                    {material}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price range */}
                <div>
                    <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-warm-gray mb-4">
                        Fiyat Aralığı
                    </h4>
                    <Slider
                        defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                        max={150000}
                        min={0}
                        step={1000}
                        onValueChange={(value) => setPriceRange([value[0], value[1]])}
                        className="mb-3"
                    />
                    <div className="flex items-center justify-between text-xs font-sans text-warm-gray">
                        <span>{formatPrice(filters.priceRange[0])}</span>
                        <span>{formatPrice(filters.priceRange[1])}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

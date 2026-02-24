'use client';

import { motion } from 'framer-motion';
import { FILTER_COLORS, FILTER_MATERIALS } from '@/lib/constants';
import { useFilters } from '@/hooks/useFilters';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { formatPrice } from '@/lib/constants';

export function FilterSidebar() {
    const { filters, toggleColor, toggleMaterial, setPriceRange, clearFilters, hasActiveFilters } =
        useFilters();

    return (
        <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg">Filtreler</h3>
                    {hasActiveFilters() && (
                        <button
                            onClick={clearFilters}
                            className="text-xs font-sans text-gold hover:text-gold-dark transition-colors uppercase tracking-wider"
                        >
                            Temizle
                        </button>
                    )}
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

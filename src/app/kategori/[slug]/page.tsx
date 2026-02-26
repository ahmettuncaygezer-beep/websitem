'use client';

import { useMemo, useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
import { FilterSidebar } from '@/components/product/FilterSidebar';
import { FilterChips } from '@/components/product/FilterChips';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useFilters } from '@/hooks/useFilters';
import { CATEGORIES } from '@/lib/constants';
import { SlidersHorizontal, Loader2 } from 'lucide-react';
import { getProducts } from '@/lib/api';
import { Product } from '@/types';
import MobileFilterSheet, { type FilterGroup } from '@/components/Mobile/MobileFilterSheet';
import type { ActiveFilter } from '@/components/Mobile/FilterChips';

const FILTER_GROUPS: FilterGroup[] = [
    {
        key: 'colors',
        title: 'Renkler',
        type: 'color',
        options: [],
        colors: [
            { name: 'Antrasit', hex: '#3B3B3B', value: 'Antrasit' },
            { name: 'Bulut Beyazı', hex: '#F5F5F5', value: 'Bulut Beyazı' },
            { name: 'Gece Mavisi', hex: '#1A237E', value: 'Gece Mavisi' },
            { name: 'Hardal', hex: '#FFC107', value: 'Hardal' },
            { name: 'Krem', hex: '#FDF5E6', value: 'Krem' },
        ],
    },
    {
        key: 'materials',
        title: 'Malzeme',
        type: 'checkbox',
        options: [
            { label: 'Kumaş', value: 'Kumaş' },
            { label: 'Deri', value: 'Deri' },
            { label: 'Kadife', value: 'Kadife' },
            { label: 'Ahşap', value: 'Ahşap' },
        ],
    },
    {
        key: 'price',
        title: 'Fiyat Aralığı',
        type: 'price',
        options: [],
    },
];

const SORT_OPTIONS = [
    { value: 'featured', label: 'Öne Çıkanlar' },
    { value: 'price-asc', label: 'Fiyat: Düşükten Yükseğe' },
    { value: 'price-desc', label: 'Fiyat: Yüksekten Düşüğe' },
    { value: 'newest', label: 'En Yeniler' },
];

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { filters, setSortBy, toggleColor, toggleMaterial, clearFilters } = useFilters();
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const category = CATEGORIES.find((c) => c.slug === slug);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getProducts({ categorySlug: slug });
                setProducts(data);
            } catch (err: any) {
                console.error('Fetch error:', err);
                setError(err.message || 'Bilinmeyen bir hata oluştu');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [slug]);

    // Filter products
    const filteredProducts = useMemo(() => {
        let result = products;

        if (filters.colors.length > 0) {
            result = result.filter((p) =>
                p.colors.some((c) => filters.colors.includes(c.name))
            );
        }

        if (filters.materials.length > 0) {
            result = result.filter((p) =>
                filters.materials.includes(p.materials[0])
            );
        }

        result = result.filter(
            (p) =>
                (p.salePrice || p.price) >= filters.priceRange[0] &&
                (p.salePrice || p.price) <= filters.priceRange[1]
        );

        switch (filters.sortBy) {
            case 'price-asc':
                result = [...result].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
                break;
            case 'price-desc':
                result = [...result].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
                break;
            case 'newest':
                result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
        }

        return result;
    }, [filters, products]);

    // Map filters to MobileFilterSheet format
    const activeFilters: ActiveFilter[] = [
        ...filters.colors.map(c => ({ key: 'colors', label: 'Renk', value: c })),
        ...filters.materials.map(m => ({ key: 'materials', label: 'Malzeme', value: m })),
    ];

    const handleFilterChange = (key: string, value: string) => {
        if (key === 'colors') toggleColor(value);
        if (key === 'materials') toggleMaterial(value);
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumb & header */}
            <div className="bg-sand">
                <div className="container-premium py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <nav className="text-xs font-sans text-warm-gray-light mb-4">
                            <span>Ana Sayfa</span>
                            <span className="mx-2">/</span>
                            <span className="text-charcoal">{category?.name || 'Tüm Ürünler'}</span>
                        </nav>
                        <h1 className="text-headline">{category?.name || 'Tüm Ürünler'}</h1>
                        <p className="text-body-lg mt-2">{category?.description}</p>
                    </motion.div>
                </div>
            </div>

            <div className="container-premium py-10">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        {/* Mobile filter toggle */}
                        <button
                            onClick={() => setMobileFiltersOpen(true)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-full text-sm font-sans"
                        >
                            <SlidersHorizontal size={16} />
                            Filtrele & Sırala
                        </button>
                        <p className="text-sm font-sans text-warm-gray">
                            <span className="font-semibold text-charcoal">{filteredProducts.length}</span> ürün
                        </p>
                    </div>

                    {/* Sort (Desktop only) */}
                    <select
                        value={filters.sortBy}
                        onChange={(e) => setSortBy(e.target.value as typeof filters.sortBy)}
                        className="hidden lg:block text-sm font-sans bg-transparent border border-border rounded-full px-4 py-2 text-warm-gray focus:outline-none focus:border-gold"
                    >
                        {SORT_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                {/* Filter chips */}
                <FilterChips />

                {/* Content */}
                <div className="flex gap-10">
                    {/* Sidebar (Desktop only) */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <FilterSidebar />
                    </div>

                    {/* Products */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <Loader2 className="animate-spin text-gold" size={40} />
                                <p className="text-sm font-sans text-warm-gray">Ürünler yükleniyor...</p>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <ProductGrid products={filteredProducts} />
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-lg font-serif">Aradığınız kriterlere uygun ürün bulunamadı.</p>
                                <button
                                    onClick={() => clearFilters()}
                                    className="mt-4 text-gold font-sans font-bold hover:underline"
                                >
                                    Filtreleri Sıfırla
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Sheet */}
            <MobileFilterSheet
                isOpen={mobileFiltersOpen}
                onClose={() => setMobileFiltersOpen(false)}
                filterGroups={FILTER_GROUPS}
                sortOptions={SORT_OPTIONS}
                activeFilters={activeFilters}
                activeSortValue={filters.sortBy}
                resultCount={filteredProducts.length}
                isLoading={loading}
                onFilterChange={handleFilterChange}
                onSortChange={(val) => setSortBy(val as any)}
                onClearAll={clearFilters}
            />
        </div>
    );
}

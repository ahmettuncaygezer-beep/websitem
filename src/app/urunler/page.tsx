'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { getProducts } from '@/lib/api';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { FilterSidebar } from '@/components/product/FilterSidebarV2';
import MobileFilterSheet from '@/components/Mobile/MobileFilterSheetV2';
import { useFilters } from '@/hooks/useFilters';
import { motion } from 'framer-motion';
import { Loader2, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default function ProductsPage() {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false);
    const {
        filters,
        setSortBy,
        toggleColor,
        toggleMaterial,
        toggleCategory,
        toggleInStock,
        toggleIsNew,
        clearFilters
    } = useFilters();

    React.useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const data = await getProducts({
                minPrice: filters.priceRange[0] !== 0 ? filters.priceRange[0] : undefined,
                maxPrice: filters.priceRange[1] !== 150000 ? filters.priceRange[1] : undefined,
                colors: filters.colors.length > 0 ? filters.colors : undefined,
                materials: filters.materials.length > 0 ? filters.materials : undefined,
                categories: filters.categories.length > 0 ? filters.categories : undefined,
                brands: filters.brands.length > 0 ? filters.brands : undefined,
                inStock: filters.inStock || undefined,
                isNew: filters.isNew || undefined
            });
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, [filters.colors, filters.materials, filters.priceRange, filters.categories, filters.brands, filters.inStock, filters.isNew]);

    const sortedProducts = React.useMemo(() => {
        return [...products].sort((a, b) => {
            if (filters.sortBy === 'price-asc') return a.price - b.price;
            if (filters.sortBy === 'price-desc') return b.price - a.price;
            return 0; // default newest
        });
    }, [products, filters.sortBy]);

    return (
        <main className="py-20 min-h-screen bg-sand/20">
            <div className="container-premium">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-serif mb-4" data-lang-key="cat_all_products">Tüm Ürünler</h1>
                        <p className="text-charcoal/60" data-lang-key="cat_all_products_desc">Yaşam alanlarınız için özenle seçilmiş premium koleksiyonlar.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group lg:hidden">
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-sand-dark rounded-sm text-sm font-medium"
                            >
                                <SlidersHorizontal size={16} />
                                <span data-lang-key="cat_filter">Filtrele</span>
                            </button>
                        </div>
                        <div className="relative group">
                            <select
                                value={filters.sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="appearance-none bg-white border border-sand-dark px-4 py-2 pr-10 rounded-sm text-sm font-medium outline-none focus:border-gold"
                            >
                                <option value="newest" data-lang-key="sort_newest">En Yeniler</option>
                                <option value="price-low" data-lang-key="sort_price_low">Fiyat: Düşükten Yükseğe</option>
                                <option value="price-high" data-lang-key="sort_price_high">Fiyat: Yüksekten Düşüğe</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/40" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block">
                        <FilterSidebar />
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="animate-spin text-gold" size={40} />
                            </div>
                        ) : sortedProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-charcoal/60 text-lg">Bu filtrelere uygun ürün bulunamadı.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                                {sortedProducts.map((product, idx) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <ProductCard product={product} priority={idx < 4} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <MobileFilterSheet
                    isOpen={isMobileFilterOpen}
                    onClose={() => setIsMobileFilterOpen(false)}
                    filterGroups={[
                        {
                            key: 'categories',
                            title: 'Kategori',
                            type: 'checkbox',
                            options: CATEGORIES.map(c => ({ value: c.slug, label: c.name }))
                        },
                        {
                            key: 'colors',
                            title: 'Renk',
                            type: 'color',
                            options: [],
                            colors: [
                                { name: 'Krem', hex: '#FAFAFA', value: 'Krem' },
                                { name: 'Bej', hex: '#D4C5B2', value: 'Bej' },
                                { name: 'Kahve', hex: '#8B5A2B', value: 'Kahve' },
                                { name: 'Gri', hex: '#808080', value: 'Gri' },
                                { name: 'Siyah', hex: '#1A1A1A', value: 'Siyah' }
                            ]
                        },
                        {
                            key: 'materials',
                            title: 'Malzeme',
                            type: 'checkbox',
                            options: [
                                { value: 'Masif Ahşap', label: 'Masif Ahşap' },
                                { value: 'Kumaş', label: 'Kumaş' },
                                { value: 'Deri', label: 'Deri' },
                                { value: 'Mermer', label: 'Mermer' },
                                { value: 'Metal', label: 'Metal' }
                            ]
                        },
                        {
                            key: 'status',
                            title: 'Durum',
                            type: 'checkbox',
                            options: [
                                { value: 'inStock', label: 'Stoktakiler' },
                                { value: 'isNew', label: 'Sadece Yeni Ürünler' }
                            ]
                        },
                        {
                            key: 'priceRange',
                            title: 'Fiyat Aralığı',
                            type: 'price',
                            options: []
                        }
                    ]}
                    sortOptions={[
                        { value: 'newest', label: 'En Yeniler' },
                        { value: 'price-asc', label: 'Fiyat: Düşükten Yükseğe' },
                        { value: 'price-desc', label: 'Fiyat: Yüksekten Düşüğe' }
                    ]}
                    activeFilters={[
                        ...(filters.categories || []).map(c => ({ key: 'categories', value: c, label: CATEGORIES.find(cat => cat.slug === c)?.name || c })),
                        ...(filters.colors || []).map(c => ({ key: 'colors', value: c, label: c })),
                        ...(filters.materials || []).map(m => ({ key: 'materials', value: m, label: m })),
                        ...(filters.inStock ? [{ key: 'status', value: 'inStock', label: 'Stoktakiler' }] : []),
                        ...(filters.isNew ? [{ key: 'status', value: 'isNew', label: 'Yeni Ürünler' }] : [])
                    ]}
                    activeSortValue={filters.sortBy}
                    resultCount={sortedProducts.length}
                    isLoading={loading}
                    onFilterChange={(key, value, checked) => {
                        if (key === 'colors') toggleColor(value);
                        if (key === 'materials') toggleMaterial(value);
                        if (key === 'categories') toggleCategory(value);
                        if (key === 'status') {
                            if (value === 'inStock') toggleInStock();
                            if (value === 'isNew') toggleIsNew();
                        }
                    }}
                    onSortChange={(value) => setSortBy(value as any)}
                    onClearAll={clearFilters}
                />
            </div>
        </main>
    );
}

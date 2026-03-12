'use client';

import React, { useState, useEffect, useMemo, use } from 'react';
import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/api';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import loadDynamic from 'next/dynamic';
import { FilterChips } from '@/components/product/FilterChips';

const FilterSidebar = loadDynamic(() => import('@/components/product/FilterSidebarV2').then(m => ({ default: m.FilterSidebar })), { ssr: false });
const MobileFilterSheet = loadDynamic(() => import('@/components/Mobile/MobileFilterSheetV2'), { ssr: false });
import { useFilters } from '@/hooks/useFilters';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ChevronDown, Check, X, RotateCcw, ChevronRight, Home, Settings } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { useGlobal } from '@/context/GlobalContext';

// Forced re-compile: 2026-03-08T04:48:00
export const dynamic = 'force-dynamic';

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = use(params);
    const { t } = useGlobal();
    const category = CATEGORIES.find(c => c.slug === slug);

    // Hooks properly defined at the top
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

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

    // Use effect for mounting check
    useEffect(() => {
        setMounted(true);
    }, []);

    // Set initial category filter based on slug
    useEffect(() => {
        if (category && !filters.categories.includes(slug)) {
            toggleCategory(slug);
        }
    }, [slug, category]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await getProducts({
                    categories: [slug],
                    minPrice: filters.priceRange[0] !== 0 ? filters.priceRange[0] : undefined,
                    maxPrice: filters.priceRange[1] !== 150000 ? filters.priceRange[1] : undefined,
                    colors: filters.colors.length > 0 ? filters.colors : undefined,
                    materials: filters.materials.length > 0 ? filters.materials : undefined,
                    inStock: filters.inStock || undefined,
                    isNew: filters.isNew || undefined
                });
                setProducts(data);
            } catch (error) {
                console.warn('Error fetching category products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [slug, filters.colors, filters.materials, filters.priceRange, filters.inStock, filters.isNew]);

    const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) => {
            if (filters.sortBy === 'price-asc') return a.price - b.price;
            if (filters.sortBy === 'price-desc') return b.price - a.price;
            if (filters.sortBy === 'newest') return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
            return 0;
        });
    }, [products, filters.sortBy]);

    if (!category) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-sand/20">
            {/* Hero Section */}
            <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-charcoal">
                {category.image && (
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.6 }}
                        transition={{ duration: 1.5 }}
                    >
                        <div className="absolute inset-0 w-full h-full">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                )}
                <div className="relative z-10 text-center px-6">
                    <nav className="flex items-center justify-center gap-2 mb-8 text-white/60 text-[10px] uppercase tracking-[0.3em] font-bold">
                        <a href="/" className="hover:text-gold transition-colors flex items-center gap-2">
                            <Home size={10} />
                            ANA SAYFA
                        </a>
                        <ChevronRight size={10} />
                        <span className="text-white">KOLEKSİYON</span>
                        <ChevronRight size={10} />
                        <span className="text-gold">{category.name}</span>
                    </nav>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-6xl md:text-8xl font-serif text-white tracking-tighter"
                    >
                        {category.name}
                    </motion.h1>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-white/70 mt-6 max-w-xl mx-auto text-lg font-light leading-relaxed">
                            {category.description || "Doğal malzemeler ve zamansız tasarımın kusursuz uyumu."}
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container-premium py-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-end">
                        <div className="block lg:hidden w-full sm:w-auto">
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-charcoal text-white rounded-none text-xs font-bold uppercase tracking-widest shadow-xl hover:bg-black transition-all active:scale-95"
                            >
                                <Settings size={18} />
                                <span>Filtrele</span>
                            </button>
                        </div>
                        <div className="relative w-full sm:w-auto">
                            <select
                                value={filters.sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="w-full appearance-none bg-white border border-sand-dark/30 pl-6 pr-12 py-4 rounded-none text-xs font-bold uppercase tracking-widest text-charcoal outline-none focus:border-gold transition-colors cursor-pointer"
                            >
                                <option value="featured">Önerilen</option>
                                <option value="newest">En Yeniler</option>
                                <option value="price-asc">{t('sort_price_low') || 'Fiyat: Düşükten Yükseğe'}</option>
                                <option value="price-desc">{t('sort_price_high') || 'Fiyat: Yüksekten Düşüğe'}</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/40" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Filter Sidebar - Desktop */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <FilterSidebar />
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        <FilterChips />
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="animate-spin text-gold" size={40} />
                            </div>
                        ) : sortedProducts.length === 0 ? (
                            <div className="text-center py-24 bg-white/50 border border-dashed border-sand-dark/30 rounded-lg">
                                <p className="text-charcoal/60 text-lg font-serif">Bu kategoride henüz ürün bulunamadı.</p>
                                <button onClick={clearFilters} className="mt-4 text-gold font-bold uppercase tracking-widest text-xs">Tüm Filtreleri Temizle</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
                                <AnimatePresence mode="popLayout">
                                    {sortedProducts.map((product, idx) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: idx % 6 * 0.1 }}
                                        >
                                            <ProductCard product={product} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>

                {mounted && (
                    <MobileFilterSheet
                        isOpen={isMobileFilterOpen}
                        onClose={() => setIsMobileFilterOpen(false)}
                        filterGroups={[
                            {
                                key: 'colors',
                                title: 'Renk',
                                type: 'color',
                                options: [],
                                colors: [
                                    { name: 'Bej', hex: '#D4C5B2', value: 'Bej' },
                                    { name: 'Gri', hex: '#9E9E9E', value: 'Gri' },
                                    { name: 'Beyaz', hex: '#FAFAFA', value: 'Beyaz' },
                                    { name: 'Antrasit', hex: '#3C3C3C', value: 'Antrasit' },
                                    { name: 'Siyah', hex: '#1C1C1E', value: 'Siyah' }
                                ]
                            },
                            {
                                key: 'materials',
                                title: 'Malzeme',
                                type: 'checkbox',
                                options: [
                                    { value: 'Keten', label: 'Keten' },
                                    { value: 'Bouclé', label: 'Bouclé' },
                                    { value: 'Kadife', label: 'Kadife' },
                                    { value: 'Masif Ahşap', label: 'Masif Ahşap' },
                                    { value: 'Mermer', label: 'Mermer' }
                                ]
                            },
                            {
                                key: 'status',
                                title: 'Durum',
                                type: 'checkbox',
                                options: [
                                    { value: 'inStock', label: 'Stoktakiler' },
                                    { value: 'isNew', label: 'Yeni Ürünler' }
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
                            { value: 'featured', label: 'Önerilen' },
                            { value: 'newest', label: 'En Yeniler' },
                            { value: 'price-asc', label: t('sort_price_low') || 'Fiyat: Düşükten Yükseğe' },
                            { value: 'price-desc', label: t('sort_price_high') || 'Fiyat: Yüksekten Düşüğe' }
                        ]}
                        activeFilters={[
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
                            if (key === 'status') {
                                if (value === 'inStock') toggleInStock();
                                if (value === 'isNew') toggleIsNew();
                            }
                        }}
                        onSortChange={(value) => setSortBy(value as any)}
                        onClearAll={clearFilters}
                    />
                )}
            </div>
        </main>
    );
}

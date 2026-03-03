'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/mock/products';
import { ProductFilters } from '@/components/Admin/Products/ProductFilters';
import { BulkActions } from '@/components/Admin/Products/BulkActions';
import { ProductTable } from '@/components/Admin/Products/ProductTable';
import type { ViewMode } from '@/components/Admin/Products/ProductFilters';

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

// Map DB product to admin Product type
function mapDbToAdminProduct(p: any): Product {
    const colors = (p.colors || []).map((c: any) => {
        try { return typeof c === 'string' ? JSON.parse(c) : c; } catch { return { name: 'Standart', hex: '#D4C5B2' }; }
    });
    return {
        id: p.id,
        name: p.name || '',
        slug: p.slug || '',
        sku: `SKU-${(p.slug || '').toUpperCase().slice(0, 8)}`,
        barcode: '',
        category: p.category_slug || 'Genel',
        subcategory: '',
        price: Number(p.price) || 0,
        comparePrice: p.sale_price ? Number(p.price) : 0,
        costPrice: Math.round((Number(p.price) || 0) * 0.6),
        stock: p.stock || 0,
        stockTracking: true,
        stockThreshold: 5,
        status: p.stock > 0 ? 'Aktif' as const : 'Pasif' as const,
        images: (p.images || []).map((url: string, i: number) => ({
            id: `img-${i}`,
            url,
            altText: p.name || '',
            isPrimary: i === 0,
            order: i,
        })),
        variants: [],
        tags: (p.materials || []),
        metaTitle: p.name || '',
        metaDescription: (p.description || '').slice(0, 160),
        relatedProducts: [],
        complementaryProducts: [],
        createdAt: p.created_at || new Date().toISOString(),
        updatedAt: p.updated_at || new Date().toISOString(),
        weight: 0,
        dimensions: {
            width: p.dimensions?.width || 0,
            height: p.dimensions?.height || 0,
            depth: p.dimensions?.depth || 0,
        },
    };
}

export default function UrunlerPage() {
    const router = useRouter();

    // ── Data state ─────────────────────────────────────────────────────────────
    const [products, setProducts] = useState<Product[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // ── Filter state ───────────────────────────────────────────────────────────
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tümü');
    const [selectedStatus, setSelectedStatus] = useState('Tümü');
    const [selectedStock, setSelectedStock] = useState('Tümü');
    const [sortBy, setSortBy] = useState('updatedAt');
    const [viewMode, setViewMode] = useState<ViewMode>('table');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(20);

    // ── Fetch products from API ────────────────────────────────────────────────
    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                params.set('page', '1');
                params.set('perPage', '500'); // Fetch all for client-side filtering
                if (searchQuery) params.set('search', searchQuery);

                const res = await fetch(`/api/admin/products?${params}`);
                const data = await res.json();

                if (data.products) {
                    setProducts(data.products.map(mapDbToAdminProduct));
                    setTotalCount(data.total || data.products.length);
                }
            } catch (err) {
                console.error('Failed to fetch products:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [searchQuery]);

    // ── Delete handler ─────────────────────────────────────────────────────────
    const handleDelete = async () => {
        if (selectedIds.length === 0) return;
        if (!confirm(`${selectedIds.length} ürün silinecek. Emin misiniz?`)) return;

        for (const id of selectedIds) {
            await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
        }
        setSelectedIds([]);
        // Refresh
        const res = await fetch('/api/admin/products?perPage=500');
        const data = await res.json();
        if (data.products) {
            setProducts(data.products.map(mapDbToAdminProduct));
            setTotalCount(data.total || data.products.length);
        }
    };

    // ── Client-side filtering ──────────────────────────────────────────────────
    const filtered = useMemo<Product[]>(() => {
        let result = [...products];

        if (selectedCategory !== 'Tümü') result = result.filter((p) => p.category === selectedCategory);
        if (selectedStatus !== 'Tümü') result = result.filter((p) => p.status === selectedStatus);
        if (selectedStock !== 'Tümü') {
            if (selectedStock === 'Stokta') result = result.filter((p) => p.stock > 10);
            if (selectedStock === 'Az Kaldı') result = result.filter((p) => p.stock > 0 && p.stock <= 10);
            if (selectedStock === 'Tükendi') result = result.filter((p) => p.stock === 0);
        }

        result.sort((a, b) => {
            switch (sortBy) {
                case 'priceAsc': return a.price - b.price;
                case 'priceDesc': return b.price - a.price;
                case 'stockAsc': return a.stock - b.stock;
                case 'stockDesc': return b.stock - a.stock;
                case 'createdAt': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                default: return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            }
        });
        return result;
    }, [products, selectedCategory, selectedStatus, selectedStock, sortBy]);

    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
    const activeCount = products.filter(p => p.status === 'Aktif').length;

    function handlePerPageChange(n: number) { setPerPage(n); setCurrentPage(1); }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            style={{ padding: '0 4px' }}
        >
            {/* ── Page header ─────────────────────────────────────────────────── */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '30px', fontWeight: 500, color: '#F5F0EB', margin: '0 0 4px' }}>
                        Ürünler
                    </h1>
                    <p style={{ fontSize: '13px', color: '#AEAEB2', margin: 0 }}>
                        {loading ? 'Yükleniyor...' : `${totalCount} ürün · ${activeCount} aktif`}
                    </p>
                </div>
                <button
                    onClick={() => router.push('/admin/urunler/yeni')}
                    style={{ background: '#C9A96E', border: 'none', borderRadius: '6px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, color: '#0F0F10', cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', transition: 'all 150ms', whiteSpace: 'nowrap' }}
                    onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#D4B87A'; b.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#C9A96E'; b.style.transform = 'translateY(0)'; }}
                >
                    Yeni Ürün Ekle +
                </button>
            </div>

            {/* ── Bulk actions toolbar ─────────────────────────────────────────── */}
            <BulkActions
                selectedCount={selectedIds.length}
                onClearSelection={() => setSelectedIds([])}
                onSetActive={() => setSelectedIds([])}
                onSetPassive={() => setSelectedIds([])}
                onDelete={handleDelete}
            />

            {/* ── Filters ─────────────────────────────────────────────────────── */}
            <ProductFilters
                searchQuery={searchQuery} onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory} onCategoryChange={(v) => { setSelectedCategory(v); setCurrentPage(1); }}
                selectedStatus={selectedStatus} onStatusChange={(v) => { setSelectedStatus(v); setCurrentPage(1); }}
                selectedStock={selectedStock} onStockChange={(v) => { setSelectedStock(v); setCurrentPage(1); }}
                sortBy={sortBy} onSortChange={setSortBy}
                viewMode={viewMode} onViewModeChange={setViewMode}
            />

            {/* ── Table / Grid ─────────────────────────────────────────────────── */}
            <ProductTable
                products={paginated}
                viewMode={viewMode}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                currentPage={currentPage}
                perPage={perPage}
                totalCount={filtered.length}
                onPageChange={setCurrentPage}
                onPerPageChange={handlePerPageChange}
            />
        </motion.div>
    );
}

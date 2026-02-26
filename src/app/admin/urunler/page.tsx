'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { mockProducts } from '@/lib/mock/products';
import type { Product } from '@/lib/mock/products';
import { ProductFilters } from '@/components/Admin/Products/ProductFilters';
import { BulkActions } from '@/components/Admin/Products/BulkActions';
import { ProductTable } from '@/components/Admin/Products/ProductTable';
import type { ViewMode } from '@/components/Admin/Products/ProductFilters';

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

export default function UrunlerPage() {
    const router = useRouter();

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

    // ── Filtered + sorted products ─────────────────────────────────────────────
    const filtered = useMemo<Product[]>(() => {
        let result = [...mockProducts];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter((p) =>
                p.name.toLowerCase().includes(q) ||
                p.sku.toLowerCase().includes(q) ||
                p.barcode.includes(q)
            );
        }
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
    }, [searchQuery, selectedCategory, selectedStatus, selectedStock, sortBy]);

    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

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
                        {mockProducts.length} ürün &nbsp;·&nbsp; {mockProducts.filter((p) => p.status === 'Aktif').length} aktif
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
                onDelete={() => setSelectedIds([])}
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

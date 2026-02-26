'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search, LayoutList, Grid3X3 } from 'lucide-react';

export type ViewMode = 'table' | 'grid';

interface ActiveFilter {
    key: string;
    label: string;
    value: string;
}

interface ProductFiltersProps {
    searchQuery: string;
    onSearchChange: (v: string) => void;
    selectedCategory: string;
    onCategoryChange: (v: string) => void;
    selectedStatus: string;
    onStatusChange: (v: string) => void;
    selectedStock: string;
    onStockChange: (v: string) => void;
    sortBy: string;
    onSortChange: (v: string) => void;
    viewMode: ViewMode;
    onViewModeChange: (v: ViewMode) => void;
}

const CATEGORIES = ['Tümü', 'Koltuklar', 'Yatak Odası', 'Masalar', 'Dekorasyon', 'Depolama', 'Aydınlatma'];
const STATUSES = ['Tümü', 'Aktif', 'Pasif', 'Taslak'];
const STOCKS = ['Tümü', 'Stokta', 'Az Kaldı', 'Tükendi'];
const SORTS = [
    { value: 'updatedAt', label: 'En Yeni' },
    { value: 'createdAt', label: 'En Eski' },
    { value: 'priceAsc', label: 'Fiyat Artan' },
    { value: 'priceDesc', label: 'Fiyat Azalan' },
    { value: 'stockAsc', label: 'Stok Artan' },
    { value: 'stockDesc', label: 'Stok Azalan' },
    { value: 'bestseller', label: 'En Çok Satan' },
];

const dropdownStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px',
    padding: '7px 32px 7px 12px',
    fontSize: '12px',
    color: '#AEAEB2',
    cursor: 'pointer',
    fontFamily: 'Inter, system-ui, sans-serif',
    appearance: 'none' as const,
    WebkitAppearance: 'none' as const,
    outline: 'none',
    transition: 'border-color 150ms',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%23636366' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
};

export function ProductFilters({
    searchQuery, onSearchChange,
    selectedCategory, onCategoryChange,
    selectedStatus, onStatusChange,
    selectedStock, onStockChange,
    sortBy, onSortChange,
    viewMode, onViewModeChange,
}: ProductFiltersProps) {
    const [inputValue, setInputValue] = useState(searchQuery);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => onSearchChange(inputValue), 300);
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [inputValue, onSearchChange]);

    const activeFilters: ActiveFilter[] = [];
    if (selectedCategory !== 'Tümü') activeFilters.push({ key: 'category', label: 'Kategori', value: selectedCategory });
    if (selectedStatus !== 'Tümü') activeFilters.push({ key: 'status', label: 'Durum', value: selectedStatus });
    if (selectedStock !== 'Tümü') activeFilters.push({ key: 'stock', label: 'Stok', value: selectedStock });

    function clearFilter(key: string) {
        if (key === 'category') onCategoryChange('Tümü');
        if (key === 'status') onStatusChange('Tümü');
        if (key === 'stock') onStockChange('Tümü');
    }

    function clearAll() {
        onCategoryChange('Tümü');
        onStatusChange('Tümü');
        onStockChange('Tümü');
        setInputValue('');
    }

    const inputFocusStyle = `
    .pf-search:focus { border-color: rgba(201,169,110,0.5) !important; background: rgba(201,169,110,0.03) !important; }
    .pf-select:focus { border-color: rgba(201,169,110,0.5) !important; }
  `;

    return (
        <div
            style={{
                background: '#1C1C1E',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '8px',
                padding: '16px 20px',
                marginBottom: '16px',
            }}
        >
            <style>{inputFocusStyle}</style>

            {/* Row 1: Search + view toggle */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search
                        size={14}
                        style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#636366', pointerEvents: 'none' }}
                        aria-hidden="true"
                    />
                    <input
                        className="pf-search"
                        type="text"
                        placeholder="Ürün adı, SKU veya barkod ile ara..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        style={{
                            width: '100%',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '6px',
                            padding: '9px 14px 9px 38px',
                            fontSize: '13px',
                            color: '#F5F0EB',
                            fontFamily: 'Inter, system-ui, sans-serif',
                            outline: 'none',
                            transition: 'border-color 150ms, background 150ms',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>

                {/* View toggle */}
                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                    {(['table', 'grid'] as ViewMode[]).map((mode) => {
                        const active = viewMode === mode;
                        const Icon = mode === 'table' ? LayoutList : Grid3X3;
                        return (
                            <button
                                key={mode}
                                onClick={() => onViewModeChange(mode)}
                                aria-label={mode === 'table' ? 'Tablo görünümü' : 'Grid görünümü'}
                                aria-pressed={active}
                                style={{
                                    width: '34px', height: '34px',
                                    borderRadius: '5px', cursor: 'pointer',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: active ? 'rgba(201,169,110,0.12)' : 'transparent',
                                    color: active ? '#C9A96E' : '#636366',
                                    transition: 'all 150ms',
                                }}
                            >
                                <Icon size={15} />
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Row 2: Dropdowns */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                <select className="pf-select" value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)} style={dropdownStyle}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c === 'Tümü' ? 'Tüm Kategoriler' : c}</option>)}
                </select>
                <select className="pf-select" value={selectedStatus} onChange={(e) => onStatusChange(e.target.value)} style={dropdownStyle}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s === 'Tümü' ? 'Tüm Durumlar' : s}</option>)}
                </select>
                <select className="pf-select" value={selectedStock} onChange={(e) => onStockChange(e.target.value)} style={dropdownStyle}>
                    {STOCKS.map((s) => <option key={s} value={s}>{s === 'Tümü' ? 'Tüm Stok' : s}</option>)}
                </select>
                <select className="pf-select" value={sortBy} onChange={(e) => onSortChange(e.target.value)} style={dropdownStyle}>
                    {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
            </div>

            {/* Active filter chips */}
            {activeFilters.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {activeFilters.map((f) => (
                        <span
                            key={f.key}
                            style={{
                                background: 'rgba(201,169,110,0.1)',
                                border: '1px solid rgba(201,169,110,0.2)',
                                borderRadius: '20px',
                                padding: '3px 10px',
                                fontSize: '11px',
                                color: '#C9A96E',
                                display: 'flex', alignItems: 'center', gap: '6px',
                            }}
                        >
                            {f.label}: {f.value}
                            <button
                                onClick={() => clearFilter(f.key)}
                                aria-label={`${f.label} filtresini kaldır`}
                                style={{ background: 'transparent', border: 'none', color: 'rgba(201,169,110,0.6)', cursor: 'pointer', padding: 0, lineHeight: 1, fontSize: '13px', transition: 'color 100ms' }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#C9A96E')}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(201,169,110,0.6)')}
                            >×</button>
                        </span>
                    ))}
                    <button
                        onClick={clearAll}
                        style={{ fontSize: '11px', color: '#636366', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'color 150ms', fontFamily: 'Inter, system-ui, sans-serif' }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#C9A96E')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#636366')}
                    >
                        Tümünü Temizle
                    </button>
                </div>
            )}
        </div>
    );
}

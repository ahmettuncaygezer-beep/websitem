'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, FolderOpen, Clock, X } from 'lucide-react';

// ─── Mock search result types ──────────────────────────────────────────────────
interface ProductResult {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    href: string;
    badge?: string;
    discount?: number;
}
interface CategoryResult {
    name: string;
    href: string;
    count: number;
}
interface ColorResult {
    name: string;
    hex: string;
    count: number;
    href: string;
}

export interface SearchResultsData {
    products: ProductResult[];
    categories: CategoryResult[];
    colors: ColorResult[];
    total: number;
}

// ─── Mocked search (replace with real API) ────────────────────────────────────
export function mockSearch(query: string): SearchResultsData {
    const q = query.toLowerCase();
    const products: ProductResult[] = [
        { id: '1', name: 'Luna Köşe Koltuk', category: 'Oturma Odası', price: 74990, image: '/images/products/luna-kose-koltuk.jpg', href: '/urun/luna-kose-koltuk', badge: 'YENİ', discount: 17 },
        { id: '2', name: 'Luna Berjer', category: 'Oturma Odası', price: 34990, image: '/images/products/luna-berjer.jpg', href: '/urun/luna-berjer' },
        { id: '3', name: 'Oslo Yemek Masası', category: 'Yemek Odası', price: 38990, image: '/images/products/oslo-yemek-masasi.jpg', href: '/urun/oslo-yemek-masasi' },
    ].filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));

    const categories: CategoryResult[] = [
        { name: 'Köşe Koltuklar', href: '/kategori/kose-koltuklar', count: 12 },
        { name: 'Tekli Koltuklar', href: '/kategori/tekli-koltuklar', count: 8 },
    ].filter((c) => c.name.toLowerCase().includes(q));

    const colors: ColorResult[] = [
        { name: 'Vizon', hex: '#C4A882', count: 24, href: '/urunler?renk=vizon' },
    ].filter((c) => c.name.toLowerCase().includes(q));

    return { products, categories, colors, total: products.length + categories.length + colors.length };
}

// ─── History helpers ──────────────────────────────────────────────────────────
const HISTORY_KEY = 'maison_search_history';
const MAX_HISTORY = 5;

export function getSearchHistory(): string[] {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
}
export function addToHistory(query: string) {
    const h = getSearchHistory().filter((s) => s !== query);
    localStorage.setItem(HISTORY_KEY, JSON.stringify([query, ...h].slice(0, MAX_HISTORY)));
}
export function removeFromHistory(query: string) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(getSearchHistory().filter((s) => s !== query)));
}
export function clearHistory() {
    localStorage.removeItem(HISTORY_KEY);
}

// ─── Component ────────────────────────────────────────────────────────────────
interface SearchResultsProps {
    query: string;
    results: SearchResultsData | null;
    history: string[];
    isLoading?: boolean;
    onClose: () => void;
    onHistoryClear: () => void;
    onHistoryRemove: (item: string) => void;
    onHistoryClick: (item: string) => void;
    focusedIndex: number;
    onSelect: (href: string) => void;
}

export function SearchResults({
    query,
    results,
    history,
    onClose,
    onHistoryClear,
    onHistoryRemove,
    onHistoryClick,
    focusedIndex,
    onSelect,
}: SearchResultsProps) {
    const QUICK_CATEGORIES = [
        { label: 'Oturma Odası', href: '/kategori/oturma-odasi' },
        { label: 'Yatak Odası', href: '/kategori/yatak-odasi' },
        { label: 'Aydınlatma', href: '/kategori/aydinlatma' },
    ];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 bg-white overflow-hidden"
                style={{
                    boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                    borderTop: '1px solid rgba(0,0,0,0.06)',
                    maxHeight: '70vh',
                    overflowY: 'auto',
                }}
                role="listbox"
                aria-label="Arama sonuçları"
            >
                {/* ── Empty query: show search history ── */}
                {!query && (
                    <div className="px-6 py-4">
                        {history.length > 0 ? (
                            <>
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#C9A96E' }}>
                                        Son Aramalar
                                    </p>
                                    <button
                                        onClick={onHistoryClear}
                                        className="text-[11px] hover:underline"
                                        style={{ color: '#999' }}
                                    >
                                        Geçmişi Temizle
                                    </button>
                                </div>
                                {history.map((item, i) => (
                                    <div key={item} className="flex items-center justify-between group">
                                        <button
                                            onClick={() => onHistoryClick(item)}
                                            className="flex items-center gap-2 flex-1 py-2 text-[13px] text-left hover:text-[#C9A96E] transition-colors duration-150"
                                        >
                                            <Clock size={13} style={{ color: '#999' }} />
                                            {item}
                                        </button>
                                        <button onClick={() => onHistoryRemove(item)} className="opacity-0 group-hover:opacity-100 p-1 transition-opacity">
                                            <X size={11} style={{ color: '#999' }} />
                                        </button>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p className="text-[13px]" style={{ color: '#999' }}>
                                Arama yapmak için yazmaya başlayın...
                            </p>
                        )}
                    </div>
                )}

                {/* ── Has query but no results ── */}
                {query && results?.total === 0 && (
                    <div className="px-6 py-8 text-center">
                        <p className="font-medium mb-2" style={{ color: '#1C1C1E' }}>
                            &ldquo;{query}&rdquo; için sonuç bulunamadı
                        </p>
                        <p className="text-[13px] mb-4" style={{ color: '#999' }}>
                            Bunları deneyin:<br />
                            • Yazımı kontrol edin &nbsp;•&nbsp; Daha genel bir terim kullanın
                        </p>
                        <div className="flex gap-2 flex-wrap justify-center">
                            {QUICK_CATEGORIES.map((cat) => (
                                <Link
                                    key={cat.href}
                                    href={cat.href}
                                    onClick={onClose}
                                    className="px-3 py-1.5 text-[12px] font-medium rounded-full border transition-colors duration-150 hover:border-[#C9A96E] hover:text-[#C9A96E]"
                                    style={{ borderColor: '#E8E3DC', color: '#1C1C1E' }}
                                >
                                    {cat.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Results ── */}
                {query && results && results.total > 0 && (
                    <div className="divide-y" style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
                        {/* Products */}
                        {results.products.length > 0 && (
                            <section className="px-6 py-4">
                                <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: '#C9A96E' }}>
                                    Ürünler ({results.products.length})
                                </p>
                                {results.products.map((product, i) => (
                                    <button
                                        key={product.id}
                                        role="option"
                                        aria-selected={false}
                                        onClick={() => { onSelect(product.href); onClose(); }}
                                        className="w-full flex items-center gap-3 py-2.5 rounded px-2 -mx-2 text-left transition-colors duration-150"
                                        style={{ background: focusedIndex === i ? '#F5F0EB' : 'transparent' }}
                                    >
                                        <div className="w-12 h-12 rounded-sm overflow-hidden shrink-0 relative" style={{ background: '#F5F0EB' }}>
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                                sizes="48px"
                                                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate" style={{ color: '#1C1C1E' }}>{product.name}</p>
                                            <p className="text-xs truncate" style={{ color: '#999' }}>{product.category}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-sm font-bold" style={{ color: '#1C1C1E' }}>
                                                ₺{product.price.toLocaleString('tr-TR')}
                                            </p>
                                            {product.discount && (
                                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: '#C9A96E', color: 'white' }}>
                                                    %{product.discount}
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </section>
                        )}

                        {/* Categories */}
                        {results.categories.length > 0 && (
                            <section className="px-6 py-4">
                                <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: '#C9A96E' }}>
                                    Kategoriler ({results.categories.length})
                                </p>
                                {results.categories.map((cat) => (
                                    <Link
                                        key={cat.href}
                                        href={cat.href}
                                        onClick={onClose}
                                        className="flex items-center gap-2 py-2 text-[13px] hover:text-[#C9A96E] transition-colors duration-150"
                                        style={{ color: '#1C1C1E' }}
                                    >
                                        <FolderOpen size={14} style={{ color: '#C9A96E' }} />
                                        {cat.name}
                                        <span className="ml-auto text-xs" style={{ color: '#999' }}>{cat.count} ürün</span>
                                    </Link>
                                ))}
                            </section>
                        )}

                        {/* Colors */}
                        {results.colors.length > 0 && (
                            <section className="px-6 py-4">
                                <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: '#C9A96E' }}>
                                    Renkler
                                </p>
                                {results.colors.map((color) => (
                                    <Link
                                        key={color.href}
                                        href={color.href}
                                        onClick={onClose}
                                        className="flex items-center gap-2 py-2 text-[13px] hover:text-[#C9A96E] transition-colors duration-150"
                                        style={{ color: '#1C1C1E' }}
                                    >
                                        <span className="w-4 h-4 rounded-full border border-black/10" style={{ background: color.hex }} />
                                        {color.name} rengi ürünler
                                        <span className="ml-auto text-xs" style={{ color: '#999' }}>{color.count} ürün</span>
                                    </Link>
                                ))}
                            </section>
                        )}

                        {/* View all */}
                        <div className="px-6 py-3 flex justify-center" style={{ background: '#F5F0EB' }}>
                            <Link
                                href={`/urunler?q=${encodeURIComponent(query)}`}
                                onClick={onClose}
                                className="text-[13px] font-semibold hover:underline"
                                style={{ color: '#C9A96E' }}
                            >
                                &ldquo;{query}&rdquo; için tüm sonuçları gör ({results.total}) →
                            </Link>
                        </div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}

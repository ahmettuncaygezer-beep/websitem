'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BarChart2, Package, LayoutGrid, ShoppingCart, Users, TrendingUp, Target, Home, FileText, Camera, UserCog, Settings, Image, Zap, FilePlus, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CommandItem {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    action: () => void;
    category: string;
}

interface CommandPaletteProps {
    isOpen: boolean;
    query: string;
    setQuery: (q: string) => void;
    selectedIndex: number;
    setSelectedIndex: (i: number) => void;
    onClose: () => void;
}

export function CommandPalette({
    isOpen,
    query,
    setQuery,
    selectedIndex,
    setSelectedIndex,
    onClose,
}: CommandPaletteProps) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const navigate = useCallback(
        (path: string) => {
            router.push(path);
            onClose();
        },
        [router, onClose]
    );

    const actions: CommandItem[] = [
        { id: 'new-product', label: 'Yeni Ürün Ekle', description: 'Ürünler sayfasına git', icon: <Package size={16} />, action: () => navigate('/admin/urunler/yeni'), category: 'Hızlı Eylemler' },
        { id: 'new-campaign', label: 'Kampanya Oluştur', description: 'Kampanyalar / Yeni', icon: <Tag size={16} />, action: () => navigate('/admin/kampanyalar/yeni'), category: 'Hızlı Eylemler' },
        { id: 'orders', label: 'Sipariş Yönet', description: 'Siparişler sayfası', icon: <ShoppingCart size={16} />, action: () => navigate('/admin/siparisler'), category: 'Hızlı Eylemler' },
        { id: 'new-blog', label: 'Blog Yaz', description: 'Blog / Yeni yazı', icon: <FilePlus size={16} />, action: () => navigate('/admin/icerik/blog/yeni'), category: 'Hızlı Eylemler' },
    ];

    const pages: CommandItem[] = [
        { id: 'p-dashboard', label: 'Dashboard', description: '/admin/dashboard', icon: <BarChart2 size={16} />, action: () => navigate('/admin/dashboard'), category: 'Sayfalar' },
        { id: 'p-products', label: 'Ürünler', description: '/admin/urunler', icon: <Package size={16} />, action: () => navigate('/admin/urunler'), category: 'Sayfalar' },
        { id: 'p-categories', label: 'Kategoriler', description: '/admin/kategoriler', icon: <LayoutGrid size={16} />, action: () => navigate('/admin/kategoriler'), category: 'Sayfalar' },
        { id: 'p-orders', label: 'Siparişler', description: '/admin/siparisler', icon: <ShoppingCart size={16} />, action: () => navigate('/admin/siparisler'), category: 'Sayfalar' },
        { id: 'p-customers', label: 'Müşteriler', description: '/admin/musteriler', icon: <Users size={16} />, action: () => navigate('/admin/musteriler'), category: 'Sayfalar' },
        { id: 'p-analytics', label: 'Analytics', description: '/admin/analytics', icon: <TrendingUp size={16} />, action: () => navigate('/admin/analytics'), category: 'Sayfalar' },
        { id: 'p-campaigns', label: 'Kampanyalar', description: '/admin/kampanyalar', icon: <Target size={16} />, action: () => navigate('/admin/kampanyalar'), category: 'Sayfalar' },
        { id: 'p-media', label: 'Medya', description: '/admin/medya', icon: <Image size={16} />, action: () => navigate('/admin/medya'), category: 'Sayfalar' },
        { id: 'p-users', label: 'Kullanıcılar', description: '/admin/kullanicilar', icon: <UserCog size={16} />, action: () => navigate('/admin/kullanicilar'), category: 'Sayfalar' },
        { id: 'p-settings', label: 'Ayarlar', description: '/admin/ayarlar', icon: <Settings size={16} />, action: () => navigate('/admin/ayarlar'), category: 'Sayfalar' },
    ];

    const [searchProducts, setSearchProducts] = useState<{ id: string; name: string; sku: string; price: number }[]>([]);

    // Fetch products when query changes and has 2+ chars
    useEffect(() => {
        if (!query || query.length < 2) {
            setSearchProducts([]);
            return;
        }
        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`/api/admin/products?search=${encodeURIComponent(query)}&perPage=5`);
                const data = await res.json();
                if (data.products) setSearchProducts(data.products);
            } catch { /* ignore */ }
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    const productItems: CommandItem[] = searchProducts.map((p) => ({
        id: `prod-${p.id}`,
        label: p.name,
        description: `${p.sku || ''} · ₺${(p.price || 0).toLocaleString('tr-TR')}`,
        icon: <Package size={16} />,
        action: () => navigate(`/admin/urunler/${p.id}`),
        category: 'Ürünler',
    }));

    const allItems = [...actions, ...pages, ...productItems];

    const filtered = query.trim()
        ? allItems.filter(
            (item) =>
                item.label.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase())
        )
        : [...actions, ...pages];

    const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    const flatFiltered: CommandItem[] = Object.values(grouped).flat();

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 60);
            setSelectedIndex(0);
        }
    }, [isOpen, setSelectedIndex]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query, setSelectedIndex]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((selectedIndex + 1) % flatFiltered.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((selectedIndex - 1 + flatFiltered.length) % flatFiltered.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (flatFiltered[selectedIndex]) {
                flatFiltered[selectedIndex].action();
            }
        }
    };

    let globalIndex = 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/75 backdrop-blur-[8px] z-[1000] flex items-start justify-center pt-[15vh]"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) onClose();
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Komut paleti"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -10 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                        className="w-[560px] max-w-[95vw] bg-[#1C1C1E] border border-white/10 rounded-xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(201,169,110,0.1)]"
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                            <Search size={16} className="text-[#636366] flex-shrink-0" />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ara veya komut çalıştır..."
                                className="flex-1 bg-transparent border-none outline-none text-[15px] text-[#F5F0EB] placeholder:text-[#636366] font-['Inter',sans-serif]"
                                aria-label="Komut paleti araması"
                                autoComplete="off"
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery('')}
                                    className="text-[#636366] hover:text-[#AEAEB2] transition-colors"
                                    aria-label="Aramayı temizle"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {/* Results */}
                        <div className="max-h-[380px] overflow-y-auto p-2" role="listbox">
                            {flatFiltered.length === 0 ? (
                                <div className="text-center py-10 text-[12px] text-[#636366]">Sonuç bulunamadı</div>
                            ) : (
                                Object.entries(grouped).map(([category, items]) => (
                                    <div key={category}>
                                        <div className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#636366] px-3 py-2 mt-1">
                                            {category}
                                        </div>
                                        {items.map((item) => {
                                            const currentIndex = globalIndex++;
                                            const isSelected = currentIndex === selectedIndex;
                                            return (
                                                <button
                                                    key={item.id}
                                                    role="option"
                                                    aria-selected={isSelected}
                                                    onClick={() => item.action()}
                                                    onMouseEnter={() => setSelectedIndex(currentIndex)}
                                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[6px] cursor-pointer transition-all duration-100 text-left ${isSelected
                                                        ? 'bg-[rgba(201,169,110,0.1)]'
                                                        : 'hover:bg-[rgba(201,169,110,0.05)]'
                                                        }`}
                                                >
                                                    <div
                                                        className={`w-8 h-8 rounded-[6px] flex items-center justify-center flex-shrink-0 transition-colors ${isSelected
                                                            ? 'bg-[rgba(201,169,110,0.15)] text-[#C9A96E]'
                                                            : 'bg-white/[0.04] text-[#636366]'
                                                            }`}
                                                    >
                                                        {item.icon}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-[13px] font-medium text-[#F5F0EB] truncate">{item.label}</div>
                                                        <div className="text-[11px] text-[#636366] truncate">{item.description}</div>
                                                    </div>
                                                    {isSelected && (
                                                        <span className="text-[10px] text-[#636366] bg-white/[0.06] border border-white/[0.08] px-1.5 py-0.5 rounded-[3px] flex-shrink-0">
                                                            ↵ Enter
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer Hints */}
                        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/[0.04]">
                            {[
                                { keys: '↑↓', label: 'gezin' },
                                { keys: '↵', label: 'seç' },
                                { keys: 'Esc', label: 'kapat' },
                            ].map(({ keys, label }) => (
                                <div key={label} className="flex items-center gap-1 text-[10px] text-[#636366]">
                                    <span className="bg-white/[0.06] border border-white/[0.08] px-1.5 py-0.5 rounded-[3px] font-mono">
                                        {keys}
                                    </span>
                                    {label}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

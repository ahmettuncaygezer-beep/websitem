import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { searchProducts } from '@/lib/api';
import { formatPrice } from '@/lib/constants';
import { CATEGORIES } from '@/lib/constants';
import { Product } from '@/types';

interface SearchBarProps {
    onClose: () => void;
}

const popularSearches = ['Köşe Koltuk', 'Bouclé', 'Yemek Masası', 'Lambader', 'Halı', 'Berjer'];

export function SearchBar({ onClose }: SearchBarProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        inputRef.current?.focus();
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    useEffect(() => {
        const performSearch = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }
            setLoading(true);
            const data = await searchProducts(query);
            setResults(data);
            setLoading(false);
        };

        const timeout = setTimeout(performSearch, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    const filteredCategories = query.length >= 2
        ? CATEGORIES.filter((c) =>
            c.name.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    const hasResults = results.length > 0 || filteredCategories.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl flex items-start justify-center pt-[12vh] overflow-y-auto pb-20"
        >
            <div className="w-full max-w-2xl px-6">
                {/* Search input */}
                <div className="relative">
                    <SearchIcon
                        size={24}
                        className="absolute left-0 top-1/2 -translate-y-1/2 text-warm-gray-light"
                    />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ürün, kategori veya ilham ara..."
                        className="w-full pl-10 pr-12 py-4 text-2xl font-serif bg-transparent border-b-2 border-border focus:border-gold outline-none transition-colors placeholder:text-warm-gray-light/60"
                    />
                    {loading && (
                        <div className="absolute right-12 top-1/2 -translate-y-1/2">
                            <Loader2 className="animate-spin text-gold" size={20} />
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:opacity-70 transition-opacity"
                        aria-label="Kapat"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Results */}
                <AnimatePresence mode="wait">
                    {query.length >= 2 ? (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="mt-8"
                        >
                            {/* Category results */}
                            {filteredCategories.length > 0 && (
                                <div className="mb-8">
                                    <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-warm-gray-light mb-4">
                                        Kategoriler
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {filteredCategories.map((cat) => (
                                            <Link
                                                key={cat.id}
                                                href={`/kategori/${cat.slug}`}
                                                onClick={onClose}
                                                className="px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-sm font-sans text-charcoal hover:bg-gold/10 transition-colors"
                                            >
                                                {cat.name}
                                                <span className="ml-2 text-warm-gray-light text-xs">
                                                    {cat.productCount} ürün
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Product results */}
                            {results.length > 0 ? (
                                <div>
                                    <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-warm-gray-light mb-4">
                                        Ürünler ({results.length})
                                    </h4>
                                    <div className="space-y-3">
                                        {results.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/urun/${product.slug}`}
                                                onClick={onClose}
                                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-sand/50 transition-colors group"
                                            >
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-sand flex-shrink-0">
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="64px"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[10px] font-sans uppercase tracking-widest text-warm-gray-light">
                                                        {product.brand}
                                                    </p>
                                                    <p className="font-serif text-sm text-charcoal group-hover:text-gold transition-colors truncate">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-xs font-sans text-warm-gray mt-0.5 truncate">
                                                        {product.materials.join(', ')}
                                                    </p>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    {product.salePrice ? (
                                                        <>
                                                            <p className="font-sans font-bold text-sm text-terracotta">
                                                                {formatPrice(product.salePrice)}
                                                            </p>
                                                            <p className="font-sans text-xs text-warm-gray-light line-through">
                                                                {formatPrice(product.price)}
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <p className="font-sans font-bold text-sm">
                                                            {formatPrice(product.price)}
                                                        </p>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                !loading && !hasResults && (
                                    <div className="text-center py-12">
                                        <div className="text-[#999] text-center py-10" data-lang-key="common_no_results">
                                            Sonuç bulunamadı
                                        </div>
                                        <p className="text-sm font-sans text-warm-gray-light">
                                            &ldquo;{query}&rdquo; ile eşleşen ürün veya kategori yok.
                                        </p>
                                    </div>
                                )
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="popular"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="mt-8"
                        >
                            <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-warm-gray-light mb-4">
                                Popüler Aramalar
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {popularSearches.map((term) => (
                                    <button
                                        key={term}
                                        onClick={() => setQuery(term)}
                                        className="px-4 py-2 rounded-full border border-border text-sm font-sans text-warm-gray hover:border-gold hover:text-gold transition-colors"
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

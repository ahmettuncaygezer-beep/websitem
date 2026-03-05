'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
    id: string;
    name: string;
    price: number;
    images?: string[];
}

interface ProductSearchProps {
    onSelect: (product: Product) => void;
    onClose: () => void;
}

export function ProductSearch({ onSelect, onClose }: ProductSearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }
            setIsLoading(true);
            try {
                const res = await fetch(`/api/admin/products?search=${encodeURIComponent(query)}&limit=5`);
                const json = await res.json();
                if (json.data) {
                    setResults(json.data.slice(0, 5));
                }
            } catch (err) {
                console.error('Search error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(fetchResults, 300);
        return () => clearTimeout(timer);
    }, [query]);

    const getMainImage = (product: Product) => {
        if (product.images && product.images.length > 0) {
            return product.images[0];
        }
        return null;
    };

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '8px 12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Search size={16} color="#636366" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ürün ara (isim veya SKU)..."
                    style={{ background: 'none', border: 'none', color: '#F5F0EB', fontSize: '13px', width: '100%', outline: 'none' }}
                />
                {isLoading ? <Loader2 size={16} className="animate-spin" color="#C9A96E" /> : query && <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', color: '#636366', cursor: 'pointer' }}><X size={14} /></button>}
            </div>

            <AnimatePresence>
                {results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        style={{
                            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
                            background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px', marginTop: '8px', overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}
                    >
                        {results.map((product) => {
                            const img = getMainImage(product);
                            return (
                                <button
                                    key={product.id}
                                    onClick={() => {
                                        onSelect(product);
                                        setQuery('');
                                        setResults([]);
                                    }}
                                    style={{
                                        width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                                        padding: '10px 16px', background: 'none', border: 'none',
                                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                                        cursor: 'pointer', textAlign: 'left', transition: 'all 200ms'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(201,169,110,0.1)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                                >
                                    <div style={{ width: '32px', height: '32px', borderRadius: '4px', overflow: 'hidden', background: 'rgba(255,255,255,0.05)', flexShrink: 0 }}>
                                        {img ? (
                                            <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Package size={14} color="#636366" /></div>
                                        )}
                                    </div>
                                    <div style={{ flex: 1, overflow: 'hidden' }}>
                                        <div style={{ fontSize: '13px', color: '#F5F0EB', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
                                        <div style={{ fontSize: '11px', color: '#C9A96E' }}>₺{product.price.toLocaleString('tr-TR')}</div>
                                    </div>
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


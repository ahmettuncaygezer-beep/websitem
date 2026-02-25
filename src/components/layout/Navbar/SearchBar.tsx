'use client';

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSearchDebounce } from './useSearchDebounce';
import {
    SearchResults,
    SearchResultsData,
    mockSearch,
    getSearchHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
} from './SearchResults';

interface SearchBarProps {
    isScrolled: boolean;
    onOpen: () => void;
    onClose: () => void;
    isOpen: boolean;
}

export function SearchBar({ isScrolled, onOpen, onClose, isOpen }: SearchBarProps) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResultsData | null>(null);
    const [history, setHistory] = useState<string[]>([]);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const debouncedQuery = useSearchDebounce(query, 300);

    // Load history on open
    useEffect(() => {
        if (isOpen) {
            setHistory(getSearchHistory());
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setQuery('');
            setResults(null);
        }
    }, [isOpen]);

    // Run search when debounced value changes
    useEffect(() => {
        if (debouncedQuery.length >= 2) {
            setResults(mockSearch(debouncedQuery));
        } else {
            setResults(null);
        }
    }, [debouncedQuery]);

    // Close on Escape
    useEffect(() => {
        const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    const handleClose = useCallback(() => {
        setQuery('');
        setResults(null);
        onClose();
    }, [onClose]);

    const handleSelect = useCallback((href: string) => {
        if (query) addToHistory(query);
        router.push(href);
        handleClose();
    }, [query, router, handleClose]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const items = results?.products ?? [];
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedIndex((prev) => Math.min(prev + 1, items.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedIndex((prev) => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter' && query) {
            if (focusedIndex >= 0 && items[focusedIndex]) {
                handleSelect(items[focusedIndex].href);
            } else {
                addToHistory(query);
                router.push(`/urunler?q=${encodeURIComponent(query)}`);
                handleClose();
            }
        }
    };

    const iconColor = isScrolled ? '#1C1C1E' : 'white';

    return (
        <>
            {/* TRIGGER BUTTON (closed state) */}
            {!isOpen && (
                <button
                    onClick={onOpen}
                    className="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
                    style={{ color: iconColor }}
                    onMouseOver={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                            isScrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)';
                    }}
                    onMouseOut={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }}
                    aria-label="Ürün ara"
                >
                    <Search size={20} />
                </button>
            )}

            {/* EXPANDED SEARCH (desktop) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={containerRef}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '100%' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="relative flex items-center gap-3 flex-1"
                        role="search"
                        aria-label="Ürün ara"
                    >
                        <Search size={18} style={{ color: '#999', flexShrink: 0 }} />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => { setQuery(e.target.value); setFocusedIndex(-1); }}
                            onKeyDown={handleKeyDown}
                            placeholder="Ürün, kategori veya renk ara..."
                            aria-label="Ürün ara"
                            className="flex-1 bg-transparent border-none outline-none"
                            style={{
                                fontSize: '16px',
                                color: '#1C1C1E',
                                caretColor: '#C9A96E',
                            }}
                        />
                        {query && (
                            <button onClick={() => { setQuery(''); setResults(null); inputRef.current?.focus(); }}>
                                <X size={16} style={{ color: '#999' }} />
                            </button>
                        )}
                        <button
                            onClick={handleClose}
                            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/5 transition-colors"
                            aria-label="Aramayı kapat"
                        >
                            <X size={20} style={{ color: '#1C1C1E' }} />
                        </button>

                        {/* Results dropdown */}
                        {(query || history.length > 0) && (
                            <SearchResults
                                query={query}
                                results={results}
                                history={history}
                                onClose={handleClose}
                                onHistoryClear={() => { clearHistory(); setHistory([]); }}
                                onHistoryRemove={(item) => { removeFromHistory(item); setHistory(getSearchHistory()); }}
                                onHistoryClick={(item) => { setQuery(item); }}
                                focusedIndex={focusedIndex}
                                onSelect={handleSelect}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

'use client';

import { useState, useRef, useEffect, useCallback, KeyboardEvent, memo } from 'react';
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
import { useGlobal } from '@/context/GlobalContext';
import { useTranslationStore } from '@/store/translationStore';

interface SearchBarProps {
    isScrolled: boolean;
    onOpen: () => void;
    onClose: () => void;
    isOpen: boolean;
}

export const SearchBar = memo(function SearchBar({ isScrolled, onOpen, onClose, isOpen }: SearchBarProps) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResultsData | null>(null);
    const [history, setHistory] = useState<string[]>([]);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const debouncedQuery = useSearchDebounce(query, 300);
    const { t, language } = useGlobal();

    // Global access for Browser Control
    useEffect(() => {
        (window as any).SelisSearch = {
            open: onOpen,
            close: onClose
        };
    }, [onOpen, onClose]);

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

    const iconColor = 'currentColor'; // Let parent control it via className

    return (
        <>
            {/* TRIGGER BUTTON (closed state) */}
            {!isOpen && (
                <button
                    onClick={onOpen}
                    className="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 text-[#4A4A4A] dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
                    aria-label={t('search_input_aria') || "Ürün ara"}
                >
                    <Search size={20} strokeWidth={1.5} />
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
                        aria-label={t('search_input_aria') || "Ürün ara"}
                    >
                        <Search size={18} strokeWidth={1.5} className="text-[#999] dark:text-white/50" style={{ flexShrink: 0 }} />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => { setQuery(e.target.value); setFocusedIndex(-1); }}
                            onKeyDown={handleKeyDown}
                            placeholder={t('search_placeholder') || "Ürün, kategori veya koleksiyon ara..."}
                            aria-label={t('search_input_aria') || "Ürün ara"}
                            className="flex-1 bg-transparent border-0 focus:border-0 border-transparent focus:border-transparent focus:ring-0 outline-none text-[#1A1A1A] dark:text-white placeholder:text-[#999] dark:placeholder:text-white/40 placeholder:font-light font-medium tracking-wide"
                            style={{
                                fontSize: '15px',
                                caretColor: '#C9A96E',
                                boxShadow: 'none' // Ensure no default browser shadow/ring
                            }}
                        />
                        {query && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => { setQuery(''); setResults(null); inputRef.current?.focus(); }}
                                className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={14} strokeWidth={2} className="text-[#999] dark:text-white/50" />
                            </motion.button>
                        )}
                        <button
                            onClick={handleClose}
                            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors ml-1"
                            aria-label={t('search_close') || "Aramayı kapat"}
                        >
                            <X size={20} strokeWidth={1.5} className="text-[#4A4A4A] dark:text-white" />
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
});

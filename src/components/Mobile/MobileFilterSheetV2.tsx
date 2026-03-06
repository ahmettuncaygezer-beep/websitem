'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, ChevronDown, ChevronUp, SlidersHorizontal, Loader2, Check,
} from 'lucide-react';
import type { ActiveFilter } from './FilterChips';

/* ─── Types ──────────────────────────────────────────────────────────── */
export interface FilterOption {
    value: string;
    label: string;
    count?: number;
}

export interface FilterGroup {
    key: string;
    title: string;
    type: 'checkbox' | 'color' | 'pill' | 'price' | 'rating';
    options: FilterOption[];
    colors?: { name: string; hex: string; value: string }[];
}

interface SortOption {
    value: string;
    label: string;
}

interface MobileFilterSheetProps {
    isOpen: boolean;
    onClose: () => void;
    filterGroups: FilterGroup[];
    sortOptions: SortOption[];
    activeFilters: ActiveFilter[];
    activeSortValue: string;
    resultCount: number;
    isLoading?: boolean;
    onFilterChange: (key: string, value: string, checked: boolean) => void;
    onSortChange: (value: string) => void;
    onClearAll: () => void;
}

/* ─── Accordion group ────────────────────────────────────────────────── */
function FilterAccordion({
    group,
    activeFilters,
    onFilterChange,
}: {
    group: FilterGroup;
    activeFilters: ActiveFilter[];
    onFilterChange: (key: string, value: string, checked: boolean) => void;
}) {
    const [open, setOpen] = useState(false);
    const selectedCount = activeFilters.filter(f => f.key === group.key).length;

    return (
        <div className="border-b border-[#F5F0EB]">
            <button
                className="flex items-center justify-between w-full py-4 text-left"
                style={{ WebkitTapHighlightColor: 'transparent' }}
                onClick={() => setOpen(v => !v)}
                aria-expanded={open}
            >
                <span className="text-[14px] font-semibold text-[#1C1C1E] flex items-center gap-2">
                    {group.title}
                    {selectedCount > 0 && (
                        <span className="w-5 h-5 rounded-full bg-[#C9A96E] text-white text-[10px] font-bold flex items-center justify-center">
                            {selectedCount}
                        </span>
                    )}
                </span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} className="text-[#999]" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pb-4">
                            {/* ── Checkbox list ── */}
                            {(group.type === 'checkbox' || group.type === 'rating') && (
                                <div className="flex flex-col gap-1">
                                    {group.options.map(opt => {
                                        const checked = activeFilters.some(f => f.key === group.key && f.value === opt.value);
                                        return (
                                            <label
                                                key={opt.value}
                                                className="flex items-center gap-3 py-2.5 cursor-pointer group"
                                                style={{ minHeight: 44, WebkitTapHighlightColor: 'transparent' }}
                                            >
                                                <div
                                                    className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-colors"
                                                    style={{
                                                        borderColor: checked ? '#C9A96E' : '#E8E3DC',
                                                        background: checked ? '#C9A96E' : 'white',
                                                    }}
                                                >
                                                    {checked && <Check size={11} className="text-white" />}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    className="sr-only"
                                                    checked={checked}
                                                    onChange={e => onFilterChange(group.key, opt.value, e.target.checked)}
                                                    value={opt.value}
                                                />
                                                <span className="text-[14px] text-[#444] flex-1">{opt.label}</span>
                                                {opt.count !== undefined && (
                                                    <span className="text-[12px] text-[#bbb]">({opt.count})</span>
                                                )}
                                            </label>
                                        );
                                    })}
                                </div>
                            )}

                            {/* ── Color swatches ── */}
                            {group.type === 'color' && group.colors && (
                                <div className="grid grid-cols-5 gap-3">
                                    {group.colors.map(c => {
                                        const checked = activeFilters.some(f => f.key === group.key && f.value === c.value);
                                        return (
                                            <button
                                                key={c.value}
                                                onClick={() => onFilterChange(group.key, c.value, !checked)}
                                                className="flex flex-col items-center gap-1.5"
                                                style={{ WebkitTapHighlightColor: 'transparent' }}
                                                aria-label={c.name}
                                                aria-pressed={checked}
                                            >
                                                <div
                                                    className="w-10 h-10 rounded-full relative flex items-center justify-center transition-transform"
                                                    style={{
                                                        background: c.hex,
                                                        border: checked ? '2px solid #1C1C1E' : '2px solid transparent',
                                                        outline: checked ? '2px solid white' : 'none',
                                                        outlineOffset: '-3px',
                                                        transform: checked ? 'scale(1.1)' : 'scale(1)',
                                                    }}
                                                >
                                                    {checked && (
                                                        <Check size={12} className="text-white drop-shadow" />
                                                    )}
                                                </div>
                                                <span className="text-[9px] text-[#666] text-center leading-tight">{c.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* ── Pill buttons ── */}
                            {group.type === 'pill' && (
                                <div className="flex flex-wrap gap-2">
                                    {group.options.map(opt => {
                                        const checked = activeFilters.some(f => f.key === group.key && f.value === opt.value);
                                        return (
                                            <button
                                                key={opt.value}
                                                onClick={() => onFilterChange(group.key, opt.value, !checked)}
                                                className="px-4 py-2 rounded-full text-[13px] font-medium border transition-all"
                                                style={{
                                                    background: checked ? '#1C1C1E' : 'transparent',
                                                    color: checked ? 'white' : '#444',
                                                    borderColor: checked ? '#1C1C1E' : '#E8E3DC',
                                                    WebkitTapHighlightColor: 'transparent',
                                                }}
                                                aria-pressed={checked}
                                            >
                                                {opt.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* ── Price range ── */}
                            {group.type === 'price' && (
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        placeholder="Min ₺"
                                        inputMode="numeric"
                                        className="flex-1 border border-[#E8E3DC] rounded-sm px-3 py-2.5 text-[14px] text-center focus:border-[#C9A96E] outline-none"
                                    />
                                    <span className="text-[#999]">—</span>
                                    <input
                                        type="number"
                                        placeholder="Max ₺"
                                        inputMode="numeric"
                                        className="flex-1 border border-[#E8E3DC] rounded-sm px-3 py-2.5 text-[14px] text-center focus:border-[#C9A96E] outline-none"
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── Main sheet ─────────────────────────────────────────────────────── */
export default function MobileFilterSheet({
    isOpen,
    onClose,
    filterGroups,
    sortOptions,
    activeFilters,
    activeSortValue,
    resultCount,
    isLoading = false,
    onFilterChange,
    onSortChange,
    onClearAll,
}: MobileFilterSheetProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const [activeTab, setActiveTab] = useState<'filter' | 'sort'>('filter');
    const dragStartY = useRef(0);
    const sheetRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    if (!mounted) return null;

    const onDragStart = useCallback((e: React.TouchEvent) => {
        dragStartY.current = e.touches[0].clientY;
        isDragging.current = true;
        if (sheetRef.current) {
            sheetRef.current.style.transition = 'none';
        }
    }, []);

    const onDragMove = useCallback((e: React.TouchEvent) => {
        if (!isDragging.current || !sheetRef.current) return;
        const delta = Math.max(0, e.touches[0].clientY - dragStartY.current);
        sheetRef.current.style.transform = `translateY(${delta}px)`;
    }, []);

    const onDragEnd = useCallback((e: React.TouchEvent) => {
        isDragging.current = false;
        const delta = e.changedTouches[0].clientY - dragStartY.current;
        if (!sheetRef.current) return;
        sheetRef.current.style.transition = '';
        if (delta > 150) {
            onClose();
        } else {
            sheetRef.current.style.transform = '';
        }
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[48] bg-black/50"
                        onClick={onClose}
                    />

                    {/* Sheet */}
                    <motion.div
                        key="sheet"
                        ref={sheetRef}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-[49] bg-white dark:bg-[#1C1C1E] flex flex-col"
                        style={{
                            height: '92vh',
                            borderRadius: '16px 16px 0 0',
                            paddingBottom: 'env(safe-area-inset-bottom)',
                        }}
                    >
                        {/* Drag handle */}
                        <div
                            className="flex-shrink-0 pt-2 pb-1 flex justify-center cursor-grab active:cursor-grabbing"
                            onTouchStart={onDragStart}
                            onTouchMove={onDragMove}
                            onTouchEnd={onDragEnd}
                        >
                            <div className="w-10 h-1 rounded-full bg-[#E8E3DC]" />
                        </div>

                        {/* Header */}
                        <div className="flex-shrink-0 flex items-center justify-between px-4 pb-3 pt-1">
                            <span className="text-[17px] font-semibold text-[#1C1C1E]">Filtrele & Sırala</span>
                            <div className="flex items-center gap-3">
                                {activeFilters.length > 0 && (
                                    <button onClick={onClearAll} className="text-[13px] font-semibold text-[#C9A96E]">
                                        Tümünü Temizle
                                    </button>
                                )}
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5F0EB]"
                                    aria-label="Kapat"
                                >
                                    <X size={15} className="text-[#1C1C1E]" />
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex-shrink-0 flex border-b border-[#F5F0EB] px-4">
                            {(['filter', 'sort'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className="flex-1 py-2.5 text-[13px] font-semibold relative"
                                    style={{
                                        color: activeTab === tab ? '#1C1C1E' : '#999',
                                        WebkitTapHighlightColor: 'transparent',
                                    }}
                                >
                                    {tab === 'filter' ? 'Filtrele' : 'Sırala'}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="filterSheetTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A96E]"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Scrollable content */}
                        <div className="flex-1 overflow-y-auto px-4" style={{ WebkitOverflowScrolling: 'touch' }}>
                            {activeTab === 'filter' ? (
                                <div>
                                    {filterGroups.map(group => (
                                        <FilterAccordion
                                            key={group.key}
                                            group={group}
                                            activeFilters={activeFilters}
                                            onFilterChange={onFilterChange}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="py-4 flex flex-col gap-1">
                                    {sortOptions.map(opt => (
                                        <label
                                            key={opt.value}
                                            className="flex items-center gap-3 py-3 cursor-pointer"
                                            style={{ minHeight: 44 }}
                                        >
                                            <div
                                                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                                                style={{
                                                    borderColor: activeSortValue === opt.value ? '#C9A96E' : '#E8E3DC',
                                                }}
                                            >
                                                {activeSortValue === opt.value && (
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#C9A96E]" />
                                                )}
                                            </div>
                                            <input
                                                type="radio"
                                                className="sr-only"
                                                name="sort"
                                                value={opt.value}
                                                checked={activeSortValue === opt.value}
                                                onChange={() => onSortChange(opt.value)}
                                            />
                                            <span className="text-[14px] text-[#1C1C1E]">{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sticky Apply button */}
                        <div
                            className="flex-shrink-0 px-4 pt-3 pb-4"
                            style={{
                                borderTop: '1px solid #F5F0EB',
                                boxShadow: '0 -8px 20px rgba(0,0,0,0.06)',
                                background: 'white',
                            }}
                        >
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="w-full py-4 rounded-sm text-[14px] font-bold text-white flex items-center justify-center gap-2 transition-opacity"
                                style={{
                                    background: isLoading ? '#999' : '#1C1C1E',
                                    WebkitTapHighlightColor: 'transparent',
                                }}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Sonuçlar yükleniyor...
                                    </>
                                ) : (
                                    `${resultCount.toLocaleString('tr-TR')} sonucu gör`
                                )}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

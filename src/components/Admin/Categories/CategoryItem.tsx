'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GripVertical, ChevronRight, Pencil, Plus } from 'lucide-react';
import type { Category } from '@/types/admin/categories';

interface CategoryItemProps {
    category: Category;
    depth: number;
    isExpanded: boolean;
    isSelected: boolean;
    onToggleExpand: () => void;
    onSelect: (cat: Category) => void;
    onAddChild: (parentId: string) => void;
    onDragStart: (cat: Category) => void;
    onDragOver: (e: React.DragEvent, cat: Category) => void;
    onDrop: (e: React.DragEvent, target: Category) => void;
    onDragEnd: () => void;
    dragOverId: string | null;
    isDragging: boolean;
}

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

export function CategoryItem({
    category,
    depth,
    isExpanded,
    isSelected,
    onToggleExpand,
    onSelect,
    onAddChild,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
    dragOverId,
    isDragging,
}: CategoryItemProps) {
    const [hovered, setHovered] = useState(false);
    const hasChildren = category.children.length > 0;
    const isDropTarget = dragOverId === category.id;

    return (
        <div>
            {/* Row */}
            <div
                draggable
                onDragStart={() => onDragStart(category)}
                onDragOver={(e) => onDragOver(e, category)}
                onDrop={(e) => onDrop(e, category)}
                onDragEnd={onDragEnd}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => onSelect(category)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    paddingLeft: `${16 + depth * 24}px`,
                    paddingRight: '10px',
                    cursor: 'pointer',
                    transition: 'background 100ms',
                    position: 'relative',
                    borderLeft: `2px solid ${isSelected ? '#C9A96E' : 'transparent'}`,
                    background: isSelected
                        ? 'rgba(201,169,110,0.08)'
                        : isDropTarget
                            ? 'rgba(10,132,255,0.06)'
                            : hovered
                                ? 'rgba(255,255,255,0.03)'
                                : 'transparent',
                    opacity: isDragging ? 0.5 : 1,
                    outline: isDropTarget ? '1px solid rgba(10,132,255,0.3)' : 'none',
                    outlineOffset: '-1px',
                }}
                role="treeitem"
                aria-expanded={hasChildren ? isExpanded : undefined}
                aria-selected={isSelected}
            >
                {/* Drag handle */}
                <div
                    style={{ color: hovered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)', cursor: 'grab', flexShrink: 0, display: 'flex', alignItems: 'center' }}
                    onMouseDown={(e) => e.stopPropagation()}
                    aria-hidden="true"
                >
                    <GripVertical size={14} />
                </div>

                {/* Expand/collapse toggle */}
                <div style={{ width: '18px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {hasChildren ? (
                        <button
                            onClick={(e) => { e.stopPropagation(); onToggleExpand(); }}
                            aria-label={isExpanded ? 'Daralt' : 'Genişlet'}
                            style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#636366', borderRadius: '3px', width: '18px', height: '18px', transition: 'color 150ms' }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2')}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#636366')}
                        >
                            <motion.div
                                animate={{ rotate: isExpanded ? 90 : 0 }}
                                transition={{ duration: 0.15, ease: easeOut }}
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <ChevronRight size={13} />
                            </motion.div>
                        </button>
                    ) : null}
                </div>

                {/* Category name */}
                <span style={{ fontSize: '13px', color: isSelected ? '#C9A96E' : '#F5F0EB', fontWeight: 500, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: 'color 100ms' }}>
                    {category.nameTR}
                </span>

                {/* Product count badge */}
                <span style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '1px 8px', fontSize: '11px', color: '#636366', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
                    {category.productCount}
                </span>

                {/* Action icons (shown on hover) */}
                <div style={{ display: 'flex', gap: '2px', opacity: hovered ? 1 : 0, transition: 'opacity 150ms', flexShrink: 0 }}>
                    <button
                        onClick={(e) => { e.stopPropagation(); onSelect(category); }}
                        aria-label="Düzenle"
                        title="Düzenle"
                        style={{ width: '24px', height: '24px', borderRadius: '4px', background: 'transparent', border: 'none', color: '#636366', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 150ms' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#636366'; }}
                    >
                        <Pencil size={12} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onAddChild(category.id); }}
                        aria-label="Alt kategori ekle"
                        title="Alt kategori ekle"
                        style={{ width: '24px', height: '24px', borderRadius: '4px', background: 'transparent', border: 'none', color: '#636366', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 150ms' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#636366'; }}
                    >
                        <Plus size={12} />
                    </button>
                </div>
            </div>

            {/* Children */}
            {hasChildren && (
                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            key="children"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: easeOut }}
                            style={{ overflow: 'hidden' }}
                        >
                            {category.children.map((child) => (
                                <CategoryItem
                                    key={child.id}
                                    category={child}
                                    depth={depth + 1}
                                    isExpanded={false}
                                    isSelected={isSelected && false}
                                    onToggleExpand={() => { }}
                                    onSelect={onSelect}
                                    onAddChild={onAddChild}
                                    onDragStart={onDragStart}
                                    onDragOver={onDragOver}
                                    onDrop={onDrop}
                                    onDragEnd={onDragEnd}
                                    dragOverId={dragOverId}
                                    isDragging={isDragging}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
}

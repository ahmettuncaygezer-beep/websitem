'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import type { Category } from '@/lib/mock/categories';
import { CategoryItem } from './CategoryItem';

interface CategoryTreeProps {
    categories: Category[];
    selectedId: string | null;
    expandedIds: string[];
    dragOverId: string | null;
    draggingId: string | null;
    onSelectCategory: (cat: Category) => void;
    onToggleExpand: (id: string) => void;
    onToggleExpandAll: () => void;
    onAddChild: (parentId: string) => void;
    onAddRoot: () => void;
    onDragStart: (cat: Category) => void;
    onDragOver: (e: React.DragEvent, cat: Category) => void;
    onDrop: (e: React.DragEvent, target: Category) => void;
    onDragEnd: () => void;
}

export function CategoryTree({
    categories,
    selectedId,
    expandedIds,
    dragOverId,
    draggingId,
    onSelectCategory,
    onToggleExpand,
    onToggleExpandAll,
    onAddChild,
    onAddRoot,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
}: CategoryTreeProps) {
    const allRootIds = categories.map((c) => c.id);
    const allExpanded = allRootIds.every((id) => expandedIds.includes(id));

    return (
        <div
            style={{
                background: '#1C1C1E',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '8px',
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>
                    Kategori Ağacı
                </h2>
                <button
                    onClick={onToggleExpandAll}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '12px',
                        color: 'rgba(201,169,110,0.8)',
                        cursor: 'pointer',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        transition: 'color 150ms',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#C9A96E')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(201,169,110,0.8)')}
                >
                    {allExpanded ? 'Tümünü Daralt' : 'Tümünü Genişlet'}
                </button>
            </div>

            {/* Tree list */}
            <div
                style={{ padding: '8px 0' }}
                role="tree"
                aria-label="Kategori ağacı"
                onDragOver={(e) => e.preventDefault()}
            >
                {categories.map((cat) => (
                    <CategoryItem
                        key={cat.id}
                        category={cat}
                        depth={0}
                        isExpanded={expandedIds.includes(cat.id)}
                        isSelected={selectedId === cat.id || cat.children.some((c) => c.id === selectedId)}
                        onToggleExpand={() => onToggleExpand(cat.id)}
                        onSelect={onSelectCategory}
                        onAddChild={onAddChild}
                        onDragStart={onDragStart}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        onDragEnd={onDragEnd}
                        dragOverId={dragOverId}
                        isDragging={draggingId === cat.id}
                    />
                ))}
            </div>

            {/* Add root category */}
            <button
                onClick={onAddRoot}
                style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'transparent',
                    border: 'none',
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    fontSize: '13px',
                    color: '#636366',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    transition: 'color 150ms',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#C9A96E')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#636366')}
            >
                <Plus size={14} />
                Yeni Ana Kategori Ekle +
            </button>
        </div>
    );
}

'use client';

import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { mockCategories } from '@/lib/mock/categories';
import type { Category } from '@/lib/mock/categories';
import { CategoryTree } from '@/components/Admin/Categories/CategoryTree';
import { CategoryForm } from '@/components/Admin/Categories/CategoryForm';

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

// ── Helper: deep-clone & update a category in the tree ───────────────────────
function updateCatInTree(cats: Category[], updated: Category): Category[] {
    return cats.map((c) => {
        if (c.id === updated.id) return { ...updated, children: c.children };
        return { ...c, children: updateCatInTree(c.children, updated) };
    });
}

function deleteCatInTree(cats: Category[], id: string): Category[] {
    return cats.filter((c) => c.id !== id).map((c) => ({ ...c, children: deleteCatInTree(c.children, id) }));
}

function flattenAll(cats: Category[]): Category[] {
    return cats.flatMap((c) => [c, ...flattenAll(c.children)]);
}

export default function KategorilerPage() {
    const [categories, setCategories] = useState<Category[]>(mockCategories);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [expandedIds, setExpandedIds] = useState<string[]>(mockCategories.map((c) => c.id));
    const [formMode, setFormMode] = useState<'edit' | 'create'>('edit');
    const [defaultParentId, setDefaultParentId] = useState<string | null>(null);
    const [dragItem, setDragItem] = useState<Category | null>(null);
    const [dragOverItem, setDragOverItem] = useState<Category | null>(null);

    const totalProducts = flattenAll(categories).reduce((sum, c) => sum + c.productCount, 0);
    const rootCount = categories.length;

    // ── Expand / collapse ──────────────────────────────────────────────────────
    function toggleExpand(id: string) {
        setExpandedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    }

    function toggleExpandAll() {
        const allIds = categories.map((c) => c.id);
        const allExpanded = allIds.every((id) => expandedIds.includes(id));
        setExpandedIds(allExpanded ? [] : allIds);
    }

    // ── Selection ──────────────────────────────────────────────────────────────
    function selectCategory(cat: Category) {
        setSelectedCategory(cat);
        setFormMode('edit');
        setDefaultParentId(null);
    }

    function openCreateForm(parentId: string | null = null) {
        setSelectedCategory(null);
        setFormMode('create');
        setDefaultParentId(parentId);
    }

    // ── Save (optimistic update) ───────────────────────────────────────────────
    function handleSave(updated: Category) {
        if (formMode === 'edit') {
            setCategories((prev) => updateCatInTree(prev, updated));
            setSelectedCategory(updated);
        } else {
            // Add new category
            if (updated.parentId) {
                setCategories((prev) => prev.map((c) => {
                    if (c.id === updated.parentId) return { ...c, children: [...c.children, updated] };
                    return { ...c, children: c.children.map((ch) => ch.id === updated.parentId ? { ...ch, children: [...ch.children, updated] } : ch) };
                }));
                // Expand the parent
                setExpandedIds((prev) => [...new Set([...prev, updated.parentId as string])]);
            } else {
                setCategories((prev) => [...prev, updated]);
            }
            setSelectedCategory(updated);
            setFormMode('edit');
        }
    }

    // ── Delete ────────────────────────────────────────────────────────────────
    function handleDelete(id: string) {
        setCategories((prev) => deleteCatInTree(prev, id));
        setSelectedCategory(null);
        setFormMode('edit');
    }

    // ── Drag and Drop ─────────────────────────────────────────────────────────
    const handleDragStart = useCallback((cat: Category) => {
        setDragItem(cat);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent, cat: Category) => {
        e.preventDefault();
        setDragOverItem(cat);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent, target: Category) => {
        e.preventDefault();
        if (!dragItem || dragItem.id === target.id) { setDragItem(null); setDragOverItem(null); return; }

        setCategories((prev) => {
            // Remove from old position
            const removed = deleteCatInTree(prev, dragItem.id);
            // If dropping on same-level, reorder
            if (dragItem.parentId === target.parentId) {
                const reorder = (cats: Category[]): Category[] => {
                    const idx = cats.findIndex((c) => c.id === dragItem.id);
                    const targetIdx = cats.findIndex((c) => c.id === target.id);
                    if (idx !== -1 && targetIdx !== -1) {
                        const newCats = [...cats];
                        newCats.splice(idx, 1);
                        newCats.splice(targetIdx, 0, dragItem);
                        return newCats.map((c, i) => ({ ...c, order: i + 1 }));
                    }
                    return cats.map((c) => ({ ...c, children: reorder(c.children) }));
                };
                return reorder(prev);
            }
            // Move to new parent (target's parentId level)
            const movedItem = { ...dragItem, parentId: target.parentId };
            if (!target.parentId) {
                // Move to root level
                const insertIdx = removed.findIndex((c) => c.id === target.id);
                const copy = [...removed];
                copy.splice(insertIdx, 0, movedItem);
                return copy.map((c, i) => ({ ...c, order: i + 1 }));
            }
            // Move under target's parent
            const insertUnder = (cats: Category[]): Category[] => cats.map((c) => {
                if (c.id === target.parentId) {
                    const insertIdx = c.children.findIndex((ch) => ch.id === target.id);
                    const newChildren = [...c.children];
                    newChildren.splice(insertIdx, 0, movedItem);
                    return { ...c, children: newChildren.map((ch, i) => ({ ...ch, order: i + 1 })) };
                }
                return { ...c, children: insertUnder(c.children) };
            });
            return insertUnder(removed);
        });

        setDragItem(null);
        setDragOverItem(null);
    }, [dragItem]);

    const handleDragEnd = useCallback(() => {
        setDragItem(null);
        setDragOverItem(null);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
        >
            {/* Page header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '30px', fontWeight: 500, color: '#F5F0EB', margin: '0 0 4px' }}>
                        Kategoriler
                    </h1>
                    <p style={{ fontSize: '13px', color: '#AEAEB2', margin: 0, fontVariantNumeric: 'tabular-nums' }}>
                        {rootCount} ana kategori &nbsp;·&nbsp; {totalProducts} toplam ürün
                    </p>
                </div>
                <button
                    onClick={() => openCreateForm(null)}
                    style={{ background: '#C9A96E', border: 'none', borderRadius: '6px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, color: '#0F0F10', cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', transition: 'all 150ms', whiteSpace: 'nowrap' }}
                    onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#D4B87A'; b.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#C9A96E'; b.style.transform = 'translateY(0)'; }}
                >
                    Yeni Kategori +
                </button>
            </div>

            {/* Two-column layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '40% 60%', gap: '24px', alignItems: 'flex-start' }}>

                {/* Left: Category tree */}
                <div>
                    <CategoryTree
                        categories={categories}
                        selectedId={selectedCategory?.id ?? null}
                        expandedIds={expandedIds}
                        dragOverId={dragOverItem?.id ?? null}
                        draggingId={dragItem?.id ?? null}
                        onSelectCategory={selectCategory}
                        onToggleExpand={toggleExpand}
                        onToggleExpandAll={toggleExpandAll}
                        onAddChild={(parentId) => openCreateForm(parentId)}
                        onAddRoot={() => openCreateForm(null)}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onDragEnd={handleDragEnd}
                    />
                </div>

                {/* Right: Form */}
                <div>
                    <CategoryForm
                        category={selectedCategory}
                        mode={formMode}
                        allCategories={categories}
                        defaultParentId={defaultParentId}
                        onSave={handleSave}
                        onDelete={handleDelete}
                        onClose={() => { setSelectedCategory(null); setFormMode('edit'); }}
                        onCreateNew={() => openCreateForm(null)}
                    />
                </div>
            </div>
        </motion.div>
    );
}

'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Category } from '@/types/admin/categories';
import { CategoryTree } from '@/components/Admin/Categories/CategoryTree';
import { CategoryForm } from '@/components/Admin/Categories/CategoryForm';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

// ── Tree Helpers ─────────────────────────────────────────────────────────────
function buildCategoryTree(flatCats: Category[]): Category[] {
    const map = new Map<string, Category>();
    const roots: Category[] = [];

    // First pass: create deep copies and reset children
    for (const c of flatCats) {
        map.set(c.id, { ...c, children: [] });
    }

    // Second pass: wire up children
    for (const c of flatCats) {
        const cat = map.get(c.id)!;
        if (c.parentId) {
            const parent = map.get(c.parentId);
            if (parent) {
                parent.children.push(cat);
            } else {
                roots.push(cat);
            }
        } else {
            roots.push(cat);
        }
    }

    // Optional: Sort children
    const sortTree = (nodes: Category[]) => {
        nodes.sort((a, b) => a.order - b.order);
        nodes.forEach(n => sortTree(n.children));
    }
    sortTree(roots);

    return roots;
}

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

// ── Components ──────────────────────────────────────────────────────────────
export default function KategorilerPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [flatCategories, setFlatCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [expandedIds, setExpandedIds] = useState<string[]>([]);
    const [formMode, setFormMode] = useState<'edit' | 'create'>('edit');
    const [defaultParentId, setDefaultParentId] = useState<string | null>(null);
    const [dragItem, setDragItem] = useState<Category | null>(null);
    const [dragOverItem, setDragOverItem] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSavingReorder, setIsSavingReorder] = useState(false);

    // Initial Fetch
    const fetchCategories = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/categories');
            if (!res.ok) throw new Error('Kategoriler yüklenemedi');
            const data = await res.json();
            const flat = data.categories || [];
            setFlatCategories(flat);

            const tree = buildCategoryTree(flat);
            setCategories(tree);

            // Auto expand root node ids
            const rootIds = tree.map(c => c.id);
            setExpandedIds(rootIds);

        } catch (err: any) {
            console.error(err);
            toast.error(err.message || 'Bir hata oluştu');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const totalProducts = flattenAll(categories).reduce((sum, c) => sum + c.productCount, 0);
    const rootCount = categories.length;

    // ── Expand / collapse ──────────────────────────────────────────────────────
    function toggleExpand(id: string) {
        setExpandedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    }

    function toggleExpandAll() {
        // Flatten tree and get all possible IDs that could expand
        const allIds = flattenAll(categories).map((c) => c.id);
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

    // ── Update local flat array & rebuild tree ─────────────────────────────────
    function syncTree(newFlat: Category[]) {
        setFlatCategories(newFlat);
        setCategories(buildCategoryTree(newFlat));
    }

    // ── Save (API Called in Form directly now or we can do it here) ────────────
    function handleLocalSave(updated: Category) {
        if (formMode === 'edit') {
            const newFlat = flatCategories.map(c => c.id === updated.id ? updated : c);
            syncTree(newFlat);
            setSelectedCategory(updated);
        } else {
            // Added
            const newFlat = [...flatCategories, updated];
            syncTree(newFlat);
            if (updated.parentId) {
                setExpandedIds(prev => [...new Set([...prev, updated.parentId as string])]);
            }
            setSelectedCategory(updated);
            setFormMode('edit');
        }
    }

    // ── Delete ────────────────────────────────────────────────────────────────
    function handleLocalDelete(id: string) {
        setSelectedCategory(null);
        setFormMode('edit');
        // also remove implicitly all children, easiest is filtering flat:
        const toDeleteIds = new Set([id]);

        let foundNew = true;
        while (foundNew) {
            foundNew = false;
            flatCategories.forEach(c => {
                if (c.parentId && toDeleteIds.has(c.parentId) && !toDeleteIds.has(c.id)) {
                    toDeleteIds.add(c.id);
                    foundNew = true;
                }
            })
        }

        const newFlat = flatCategories.filter(c => !toDeleteIds.has(c.id));
        syncTree(newFlat);
    }

    // ── Drag and Drop ─────────────────────────────────────────────────────────
    const handleDragStart = useCallback((cat: Category) => {
        setDragItem(cat);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent, cat: Category) => {
        e.preventDefault();
        setDragOverItem(cat);
    }, []);

    const saveTreeOrder = async (cats: Category[]) => {
        const flat = flattenAll(cats);
        const updates = flat.map(c => ({
            id: c.id,
            parent_id: c.parentId,
            sort_order: c.order,
        }));

        setIsSavingReorder(true);
        try {
            const res = await fetch('/api/admin/categories/reorder', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ updates })
            });

            if (!res.ok) throw new Error('Sıralama güncellenemedi');
            toast.success('Kategori sıralaması kaydedildi', {
                style: { background: '#1C1C1E', color: '#F5F0EB', border: '1px solid rgba(255,255,255,0.1)' }
            });

            // Sync flat data based on new tree structural orders
            setFlatCategories(flat);

        } catch (err) {
            toast.error('Sıralama kaydedilirken hata oluştu');
            // Optimistically revert by fetching
            fetchCategories();
        } finally {
            setIsSavingReorder(false);
        }
    }

    const handleDrop = useCallback((e: React.DragEvent, target: Category) => {
        e.preventDefault();
        if (!dragItem || dragItem.id === target.id) { setDragItem(null); setDragOverItem(null); return; }

        let newTreeStructure: Category[] = [];

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
                newTreeStructure = reorder(prev);
                return newTreeStructure;
            }
            // Move to new parent (target's parentId level)
            const movedItem = { ...dragItem, parentId: target.parentId };
            if (!target.parentId) {
                // Move to root level
                const insertIdx = removed.findIndex((c) => c.id === target.id);
                const copy = [...removed];
                copy.splice(insertIdx, 0, movedItem);
                newTreeStructure = copy.map((c, i) => ({ ...c, order: i + 1 }));
                return newTreeStructure;
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
            newTreeStructure = insertUnder(removed);
            return newTreeStructure;
        });

        // Trigger remote sync
        if (newTreeStructure.length > 0) {
            saveTreeOrder(newTreeStructure);
        }

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
                        Kategoriler {isSavingReorder && <Loader2 size={16} style={{ display: 'inline-block', marginLeft: '8px', animation: 'spin 1s linear infinite', color: '#AEAEB2' }} />}
                    </h1>
                    <p style={{ fontSize: '13px', color: '#AEAEB2', margin: 0, fontVariantNumeric: 'tabular-nums' }}>
                        {isLoading ? 'Yükleniyor...' : `${rootCount} ana kategori · ${totalProducts} toplam ürün`}
                    </p>
                </div>
                <button
                    onClick={() => openCreateForm(null)}
                    disabled={isLoading}
                    style={{ background: '#C9A96E', border: 'none', borderRadius: '6px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, color: '#0F0F10', cursor: isLoading ? 'not-allowed' : 'pointer', fontFamily: 'Inter, system-ui, sans-serif', transition: 'all 150ms', whiteSpace: 'nowrap', opacity: isLoading ? 0.6 : 1 }}
                    onMouseEnter={(e) => { if (!isLoading) { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#D4B87A'; b.style.transform = 'translateY(-1px)'; } }}
                    onMouseLeave={(e) => { if (!isLoading) { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#C9A96E'; b.style.transform = 'translateY(0)'; } }}
                >
                    Yeni Kategori +
                </button>
            </div>

            {/* Two-column layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '40% 60%', gap: '24px', alignItems: 'flex-start' }}>

                {/* Left: Category tree */}
                <div>
                    {isLoading ? (
                        <div style={{ padding: '40px', textAlign: 'center' }}>
                            <Loader2 size={32} color="#C9A96E" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
                            <p style={{ color: '#636366', fontSize: '13px' }}>Kategoriler yükleniyor...</p>
                        </div>
                    ) : categories.length === 0 ? (
                        <div style={{ background: '#1C1C1E', borderRadius: '8px', padding: '40px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ fontSize: '40px', color: 'rgba(201,169,110,0.3)', marginBottom: '16px' }}>📂</div>
                            <p style={{ color: '#AEAEB2', fontSize: '14px', marginBottom: '8px' }}>Henüz kategori eklenmemiş</p>
                            <button
                                onClick={() => openCreateForm(null)}
                                style={{ background: 'transparent', border: '1px solid rgba(201,169,110,0.3)', borderRadius: '6px', padding: '8px 16px', color: '#C9A96E', fontSize: '12px', cursor: 'pointer' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.1)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >İlk Kategoriyi Oluştur</button>
                        </div>
                    ) : (
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
                    )}
                </div>

                {/* Right: Form */}
                <div>
                    {isLoading ? (
                        <div style={{ background: '#1C1C1E', borderRadius: '8px', height: '400px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Loader2 size={24} color="#636366" style={{ animation: 'spin 1s linear infinite' }} />
                        </div>
                    ) : (
                        <CategoryForm
                            category={selectedCategory}
                            mode={formMode}
                            allCategories={flattenAll(categories)}
                            defaultParentId={defaultParentId}
                            onSave={handleLocalSave}
                            onDelete={handleLocalDelete}
                            onClose={() => { setSelectedCategory(null); setFormMode('edit'); }}
                            onCreateNew={() => openCreateForm(null)}
                        />
                    )}
                </div>
            </div>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </motion.div>
    );
}

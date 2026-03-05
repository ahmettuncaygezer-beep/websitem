'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Image as ImageIcon,
    Settings, Search, Trash2, Edit3, CheckCircle2,
    X, GripVertical, Save, Loader2, Eye, EyeOff
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ImageUploader } from '@/components/Admin/ImageUploader';

interface LookbookItem {
    id: string;
    title: string;
    description: string;
    cover_image: string;
    images: string[];
    season: string;
    tags: string[];
    is_active: boolean;
    sort_order: number;
    created_at: string;
}

export function LookbookGrid() {
    const [items, setItems] = useState<LookbookItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [editingItem, setEditingItem] = useState<Partial<LookbookItem> | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Drag & Drop state
    const [draggedId, setDraggedId] = useState<string | null>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch('/api/admin/lookbook');
            const data = await res.json();
            if (res.ok) setItems(data);
        } catch (error) {
            toast.error('Lookbook öğeleri yüklenemedi');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!editingItem?.title || !editingItem?.cover_image) {
            toast.error('Başlık ve kapak görseli zorunludur');
            return;
        }

        setIsSaving(true);
        try {
            const isNew = !editingItem.id;
            const url = isNew ? '/api/admin/lookbook' : `/api/admin/lookbook/${editingItem.id}`;
            const method = isNew ? 'POST' : 'PUT';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingItem)
            });

            if (!res.ok) throw new Error('Kaydedilemedi');

            toast.success(isNew ? 'Öğe Eklendi' : 'Öğe Güncellendi');
            setIsModalOpen(false);
            setEditingItem(null);
            fetchItems();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Bu öğeyi silmek istediğinize emin misiniz?')) return;

        try {
            const res = await fetch(`/api/admin/lookbook/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Silinemedi');
            toast.success('Öğe Silindi');
            setItems(prev => prev.filter(i => i.id !== id));
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleToggleActive = async (item: LookbookItem, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const res = await fetch(`/api/admin/lookbook/${item.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_active: !item.is_active })
            });
            if (!res.ok) throw new Error('Güncellenemedi');
            setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_active: !item.is_active } : i));
            toast.success(item.is_active ? 'Gizlendi' : 'Aktif Edildi');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const openEditModal = (item?: LookbookItem) => {
        if (item) {
            setEditingItem({ ...item });
        } else {
            setEditingItem({ title: '', description: '', season: 'Genel', cover_image: '', images: [], tags: [], is_active: true });
        }
        setIsModalOpen(true);
    };

    // Simple Drag & Drop Reordering
    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedId(id);
        e.dataTransfer.effectAllowed = 'move';
        // Hide the default HTML5 drag image slightly
        const el = e.target as HTMLElement;
        setTimeout(() => el.style.opacity = '0.5', 0);
    };

    const handleDragEnd = (e: React.DragEvent) => {
        const el = e.target as HTMLElement;
        el.style.opacity = '1';
        setDraggedId(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = async (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        if (!draggedId || draggedId === targetId) return;

        const sourceIndex = items.findIndex(i => i.id === draggedId);
        const targetIndex = items.findIndex(i => i.id === targetId);

        const newItems = [...items];
        const [removed] = newItems.splice(sourceIndex, 1);
        newItems.splice(targetIndex, 0, removed);

        // Update sort_order locally
        const updatedItems = newItems.map((item, index) => ({ ...item, sort_order: index }));
        setItems(updatedItems);

        // Save to DB
        try {
            const res = await fetch('/api/admin/lookbook', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: updatedItems.map(i => ({ id: i.id, sort_order: i.sort_order })) })
            });
            if (!res.ok) throw new Error('Sıralama kaydedilemedi');
            toast.success('Sıralama güncellendi');
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    return (
        <div>
            {/* Header Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                <button
                    onClick={() => openEditModal()}
                    style={{
                        background: '#C9A96E', color: '#0F0F10', border: 'none', borderRadius: '6px',
                        padding: '10px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '8px'
                    }}>
                    <Plus size={16} /> Yeni Lookbook Öğesi
                </button>
            </div>

            {isLoading ? (
                <div style={{ padding: '60px', textAlign: 'center' }}>
                    <Loader2 size={32} color="#C9A96E" style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }} />
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                draggable
                                onDragStart={(e: any) => handleDragStart(e, item.id)}
                                onDragEnd={handleDragEnd as any}
                                onDragOver={handleDragOver as any}
                                onDrop={(e: any) => handleDrop(e, item.id)}
                                onClick={() => openEditModal(item)}
                                style={{
                                    background: '#1C1C1E', borderRadius: '12px', overflow: 'hidden',
                                    border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer',
                                    position: 'relative', display: 'flex', flexDirection: 'column'
                                }}
                            >
                                <div style={{ height: '240px', position: 'relative' }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.cover_image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.5)', padding: '6px', borderRadius: '6px', backdropFilter: 'blur(4px)' }}>
                                        <GripVertical size={16} color="#F5F0EB" style={{ cursor: 'grab' }} />
                                    </div>
                                    {!item.is_active && (
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '12px', color: '#F5F0EB', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <EyeOff size={14} /> Gizli
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#F5F0EB' }}>{item.title}</h3>
                                        <span style={{ fontSize: '11px', color: '#C9A96E', background: 'rgba(201,169,110,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                                            {item.season}
                                        </span>
                                    </div>
                                    <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#AEAEB2', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {item.description}
                                    </p>

                                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                        <div style={{ fontSize: '12px', color: '#636366' }}>
                                            {item.images?.length || 0} Görsel
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                onClick={(e) => handleToggleActive(item, e)}
                                                style={{ background: 'none', border: 'none', color: item.is_active ? '#30D158' : '#636366', cursor: 'pointer', padding: '4px' }}
                                                title={item.is_active ? 'Gizle' : 'Aktif Et'}
                                            >
                                                {item.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                                            </button>
                                            <button
                                                onClick={(e) => handleDelete(item.id, e)}
                                                style={{ background: 'none', border: 'none', color: '#FF453A', cursor: 'pointer', padding: '4px' }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {items.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: '#636366' }}>
                            <ImageIcon size={48} style={{ opacity: 0.5, marginBottom: '16px' }} />
                            <p>Henüz bir lookbook öğesi eklenmemiş.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Edit/Create Modal */}
            <AnimatePresence>
                {isModalOpen && editingItem && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={{ background: '#141416', width: '100%', maxWidth: '800px', maxHeight: '90vh', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                        >
                            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>
                                    {editingItem.id ? 'Lookbook Düzenle' : 'Yeni Lookbook'}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#636366', cursor: 'pointer' }}>
                                    <X size={20} />
                                </button>
                            </div>

                            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                    <div>
                                        <label style={labelStyle}>Başlık *</label>
                                        <input
                                            type="text"
                                            value={editingItem.title || ''}
                                            onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                                            style={inputStyle}
                                            placeholder="Örn: Minimalist Bahar Konsepti"
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Sezon</label>
                                        <input
                                            type="text"
                                            value={editingItem.season || ''}
                                            onChange={e => setEditingItem({ ...editingItem, season: e.target.value })}
                                            style={inputStyle}
                                            placeholder="Örn: İlkbahar 2026"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={labelStyle}>Açıklama</label>
                                    <textarea
                                        value={editingItem.description || ''}
                                        onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                                        style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                                        placeholder="Koleksiyon açıklaması..."
                                    />
                                </div>

                                <div>
                                    <label style={labelStyle}>Kapak Görseli *</label>
                                    <ImageUploader
                                        bucket="lookbook"
                                        value={editingItem.cover_image || ''}
                                        onChange={url => setEditingItem({ ...editingItem, cover_image: url })}
                                        aspectRatio="16/9"
                                    />
                                </div>

                                <div>
                                    <label style={{ ...labelStyle, display: 'flex', justifyContent: 'space-between' }}>
                                        <span>Galeri Görselleri ({editingItem.images?.length || 0})</span>
                                        <span style={{ color: '#AEAEB2', fontSize: '11px', textTransform: 'none' }}>Yeni eklenenler sona eklenir. Kaldırmak için tıklayın.</span>
                                    </label>

                                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                                        {/* Existing Images */}
                                        {editingItem.images?.map((url, idx) => (
                                            <div key={idx} style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                <img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                <button
                                                    onClick={() => setEditingItem({ ...editingItem, images: editingItem.images?.filter((_, i) => i !== idx) })}
                                                    style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(255,69,58,0.8)', border: 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', cursor: 'pointer' }}
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Upload New Image to Gallery */}
                                    <div style={{ maxWidth: '300px' }}>
                                        <ImageUploader
                                            bucket="lookbook"
                                            value=""
                                            onChange={url => {
                                                if (url) {
                                                    setEditingItem({ ...editingItem, images: [...(editingItem.images || []), url] });
                                                }
                                            }}
                                            aspectRatio="1/1"
                                            label="Galeriye Ekle"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#F5F0EB', padding: '10px 20px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}
                                >
                                    İptal
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    style={{ background: '#C9A96E', border: 'none', color: '#0F0F10', padding: '10px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    {isSaving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                                    Kaydet
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

const labelStyle = { fontSize: '11px', fontWeight: 600, color: '#636366', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '8px', display: 'block' };
const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px', padding: '10px 14px', color: '#F5F0EB', fontSize: '14px', outline: 'none',
    boxSizing: 'border-box' as const
};

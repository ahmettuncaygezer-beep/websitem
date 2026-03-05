'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, GripVertical, Edit3, Trash2, Link as LinkIcon, RefreshCcw, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ConfirmModal from '@/components/Admin/ConfirmModal';

interface MenuItem {
    id: string;
    menu_id: string;
    title: string;
    url: string;
    is_external: boolean;
    sort_order: number;
}

interface Menu {
    id: string;
    name: string;
    handle: string;
    items?: MenuItem[];
}

export default function NavigasyonPage() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
    const [items, setItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form states
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [editItem, setEditItem] = useState<MenuItem | null>(null);
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

    // DnD sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const fetchMenus = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/navigation/menus');
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setMenus(data);
            if (data.length > 0) {
                fetchMenuItems(data[0].id);
                setSelectedMenu(data[0]);
            } else {
                setLoading(false);
            }
        } catch (error: any) {
            toast.error(error.message || 'Menüler alınamadı');
            setLoading(false);
        }
    };

    const fetchMenuItems = async (menuId: string) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/admin/navigation/menus/${menuId}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setItems(data.items || []);
            setSelectedMenu(data);
        } catch (error: any) {
            toast.error(error.message || 'Menü öğeleri alınamadı');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    // ── DnD Handlers ─────────────────────────────────────────────────────────
    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                // Update sort_order locally
                return newItems.map((item, index) => ({ ...item, sort_order: index }));
            });
        }
    };

    const saveOrder = async () => {
        if (!selectedMenu) return;
        try {
            setSaving(true);
            const payload = items.map((item) => ({
                id: item.id,
                sort_order: item.sort_order,
            }));

            const res = await fetch('/api/admin/navigation/items', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: payload })
            });

            if (!res.ok) throw new Error('Sıralama kaydedilemedi');
            toast.success('Menü sıralaması kaydedildi');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSaving(false);
        }
    };

    // ── Item CRU ─────────────────────────────────────────────────────────────
    const handleSaveItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const url = formData.get('url') as string;
        const is_external = formData.get('is_external') === 'on';

        if (!title || !url || !selectedMenu?.id) return;

        try {
            setSaving(true);
            const payload = { title, url, is_external, menu_id: selectedMenu.id };

            const reqUrl = editItem ? `/api/admin/navigation/items/${editItem.id}` : '/api/admin/navigation/items';
            const method = editItem ? 'PUT' : 'POST';

            const res = await fetch(reqUrl, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Öğe kaydedilemedi');

            toast.success(editItem ? 'Öğe güncellendi' : 'Öğe eklendi');
            setIsItemModalOpen(false);
            setEditItem(null);
            fetchMenuItems(selectedMenu.id);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deleteItemId || !selectedMenu) return;
        try {
            const res = await fetch(`/api/admin/navigation/items/${deleteItemId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Silinemedi');
            toast.success('Menü öğesi silindi');
            setItems(items.filter(i => i.id !== deleteItemId));
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setDeleteItemId(null);
        }
    };

    return (
        <div className="p-8 pb-20 max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-[28px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif]">Menü Yönetimi</h1>
                    <p className="text-sm text-[#636366] mt-1">Sitenizin header ve footer navigasyon alanlarını yapılandırın</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={saveOrder} disabled={saving} className="bg-[#1C1C1E] border border-white/[0.06] hover:bg-white/[0.03] text-[#F5F0EB] px-5 py-2.5 rounded-sm text-[13px] font-bold transition-colors flex items-center gap-2">
                        <Save size={16} /> Sıralamayı Kaydet
                    </button>
                    <button
                        onClick={() => { setEditItem(null); setIsItemModalOpen(true); }}
                        className="bg-[#C9A96E] hover:bg-[#b8995d] text-[#0F0F10] px-5 py-2.5 rounded-sm text-[13px] font-bold transition-colors flex items-center gap-2"
                        disabled={!selectedMenu}
                    >
                        <Plus size={16} /> Yeni Öğe
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Menüler Listesi (Sol) */}
                <div className="md:col-span-1 border border-white/[0.06] rounded-sm bg-[#1C1C1E] p-4 h-fit">
                    <h3 className="text-[11px] font-bold text-[#636366] uppercase tracking-wider mb-4 px-2">Kayıtlı Menüler</h3>
                    <div className="flex flex-col gap-1">
                        {menus.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => { if (selectedMenu?.id !== m.id) fetchMenuItems(m.id); }}
                                className={`text-left px-3 py-2.5 rounded-[4px] text-[13px] font-medium transition-all ${selectedMenu?.id === m.id ? 'bg-[#C9A96E]/10 text-[#C9A96E]' : 'text-[#AEAEB2] hover:bg-white/[0.03]'}`}
                            >
                                {m.name}
                            </button>
                        ))}
                        {menus.length === 0 && !loading && <div className="text-[#636366] text-xs px-2 py-4">Menü bulunamadı</div>}
                    </div>
                </div>

                {/* Menü İçeriği (Sağ) */}
                <div className="md:col-span-3">
                    {loading ? (
                        <div className="flex items-center gap-2 text-[#AEAEB2] text-sm"><RefreshCcw className="animate-spin" size={16} /> Yükleniyor...</div>
                    ) : selectedMenu ? (
                        <div className="border border-white/[0.06] rounded-sm bg-[#1C1C1E] p-6">
                            <div className="mb-6 flex justify-between items-center pb-4 border-b border-white/[0.04]">
                                <div>
                                    <h2 className="text-[16px] font-semibold text-[#F5F0EB]">{selectedMenu.name}</h2>
                                    <p className="text-[12px] text-[#636366] mt-1">{selectedMenu.handle}</p>
                                </div>
                                <span className="bg-white/[0.03] text-[#AEAEB2] px-3 py-1 rounded-full text-xs">{items.length} Öğe</span>
                            </div>

                            {items.length === 0 ? (
                                <div className="text-center py-10 opacity-50">
                                    <LinkIcon size={40} className="mx-auto mb-4" />
                                    <p className="text-sm">Bu menüde henüz hiç bağlantı yok.</p>
                                </div>
                            ) : (
                                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                    <SortableContext items={items} strategy={verticalListSortingStrategy}>
                                        <div className="flex flex-col gap-2">
                                            {items.map((item) => (
                                                <SortableMenuItem
                                                    key={item.id}
                                                    item={item}
                                                    onEdit={() => { setEditItem(item); setIsItemModalOpen(true); }}
                                                    onDelete={() => setDeleteItemId(item.id)}
                                                />
                                            ))}
                                        </div>
                                    </SortableContext>
                                </DndContext>
                            )}
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Menu Item Modal */}
            {isItemModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#1C1C1E] border border-white/[0.08] p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-lg font-semibold text-[#F5F0EB] mb-6">{editItem ? 'Menü Öğesini Düzenle' : 'Yeni Menü Öğesi'}</h2>
                        <form onSubmit={handleSaveItem} className="flex flex-col gap-5">
                            <div>
                                <label className="block text-[11px] font-bold text-[#636366] uppercase mb-2">Başlık</label>
                                <input type="text" name="title" defaultValue={editItem?.title} required className="w-full bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-3 text-[14px] text-[#F5F0EB] focus:outline-none focus:border-[#C9A96E]/50" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-[#636366] uppercase mb-2">URL / Link</label>
                                <input type="text" name="url" defaultValue={editItem?.url} required placeholder="/hakkimizda veya https://..." className="w-full bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-3 text-[14px] text-[#F5F0EB] focus:outline-none focus:border-[#C9A96E]/50" />
                            </div>
                            <div className="flex items-center gap-3 mt-2">
                                <input type="checkbox" name="is_external" id="is_external" defaultChecked={editItem?.is_external} className="w-4 h-4 accent-[#C9A96E] bg-white/[0.05] border-white/[0.1] rounded" />
                                <label htmlFor="is_external" className="text-sm text-[#AEAEB2]">Farklı sekmede aç / Harici link</label>
                            </div>
                            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/[0.04]">
                                <button type="button" onClick={() => setIsItemModalOpen(false)} className="px-4 py-2 text-sm text-[#AEAEB2] hover:bg-white/[0.05] rounded-sm">İptal</button>
                                <button type="submit" disabled={saving} className="px-5 py-2 bg-[#C9A96E] text-black text-sm font-semibold rounded-sm hover:bg-[#b8995d] disabled:opacity-50">Kaydet</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            <ConfirmModal
                open={!!deleteItemId}
                onClose={() => setDeleteItemId(null)}
                onConfirm={handleDeleteConfirm}
                title="Öğeyi Sil"
                description="Bu bağlantıyı menüden kaldırmak istediğinize emin misiniz?"
                confirmText="Sil"
                cancelText="İptal"
                isDestructive={true}
            />
        </div>
    );
}

function SortableMenuItem({ item, onEdit, onDelete }: { item: MenuItem, onEdit: () => void, onDelete: () => void }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
    const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 10 : 1 };

    return (
        <div ref={setNodeRef} style={style} className={`flex items-center justify-between p-3 border border-white/[0.06] rounded-sm group ${isDragging ? 'bg-[#C9A96E]/5 border-[#C9A96E]/30 shadow-xl' : 'bg-white/[0.01] hover:bg-white/[0.03]'}`}>
            <div className="flex items-center gap-3">
                <button {...attributes} {...listeners} className="p-1.5 text-[#636366] hover:text-[#C9A96E] cursor-grab active:cursor-grabbing rounded">
                    <GripVertical size={16} />
                </button>
                <div>
                    <div className="text-[14px] font-medium text-[#F5F0EB]">{item.title}</div>
                    <div className="text-[12px] text-[#636366] mt-0.5">{item.url}</div>
                </div>
            </div>
            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                <button onClick={onEdit} className="p-2 text-[#AEAEB2] hover:text-[#0A84FF] hover:bg-[#0A84FF]/10 rounded-sm" title="Düzenle">
                    <Edit3 size={16} />
                </button>
                <button onClick={onDelete} className="p-2 text-[#AEAEB2] hover:text-[#FF453A] hover:bg-[#FF453A]/10 rounded-sm" title="Sil">
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}

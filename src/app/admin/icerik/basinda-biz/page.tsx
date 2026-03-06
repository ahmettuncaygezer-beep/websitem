'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, Edit3, Trash2, Globe, ExternalLink,
    CheckCircle2, XCircle, Loader2, MoreHorizontal
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface PressItem {
    id: string;
    name: string;
    article_title: string;
    article_url: string;
    logo_url: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
}

export default function PressManagementPage() {
    const [items, setItems] = useState<PressItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PressItem | null>(null);

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        article_title: '',
        article_url: '',
        logo_url: '',
        is_active: false,
        sort_order: 0
    });

    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/press');
            const data = await res.json();
            if (Array.isArray(data)) {
                setItems(data);
            }
        } catch (error) {
            console.error('Error fetching press items:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleToggleActive = async (item: PressItem) => {
        try {
            const res = await fetch('/api/admin/press', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: item.id, is_active: !item.is_active })
            });
            if (res.ok) {
                setItems(items.map(i => i.id === item.id ? { ...i, is_active: !i.is_active } : i));
            }
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu haberi silmek istediğinize emin misiniz?')) return;
        try {
            const res = await fetch(`/api/admin/press?id=${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setItems(items.filter(i => i.id !== id));
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingItem ? 'PUT' : 'POST';
        const payload = editingItem ? { ...formData, id: editingItem.id } : formData;

        try {
            const res = await fetch('/api/admin/press', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                setIsModalOpen(false);
                setEditingItem(null);
                setFormData({ name: '', article_title: '', article_url: '', logo_url: '', is_active: false, sort_order: 0 });
                fetchItems();
            }
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };

    const openEdit = (item: PressItem) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            article_title: item.article_title,
            article_url: item.article_url,
            logo_url: item.logo_url || '',
            is_active: item.is_active,
            sort_order: item.sort_order
        });
        setIsModalOpen(true);
    };

    const filteredItems = items.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.article_title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ padding: '32px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 500, color: '#F5F0EB', margin: 0 }}>Basında Biz</h1>
                    <p style={{ fontSize: '13px', color: '#AEAEB2', marginTop: '4px' }}>Medyada yer alan haberlerinizi ve logolarınızı yönetin.</p>
                </div>
                <button
                    onClick={() => { setEditingItem(null); setFormData({ name: '', article_title: '', article_url: '', logo_url: '', is_active: false, sort_order: 0 }); setIsModalOpen(true); }}
                    style={{
                        background: '#C9A96E', color: '#0F0F10', border: 'none', borderRadius: '6px',
                        padding: '10px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                >
                    <Plus size={18} /> Yeni Haber Ekle
                </button>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={16} color="#636366" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Haber veya yayın adı ara..."
                        style={{
                            width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '6px', padding: '10px 14px 10px 40px', color: '#F5F0EB', fontSize: '13px', outline: 'none'
                        }}
                    />
                </div>
            </div>

            {/* Table */}
            <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
                            <th style={thStyle}>YAYIN / HABER</th>
                            <th style={thStyle}>BAĞLANTI</th>
                            <th style={thStyle}>DURUM</th>
                            <th style={thStyle}>SIRALAMA</th>
                            <th style={{ ...thStyle, textAlign: 'right' }}>İŞLEMLER</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '40px', textAlign: 'center' }}>
                                    <Loader2 size={32} color="#C9A96E" className="animate-spin" style={{ margin: '0 auto' }} />
                                </td>
                            </tr>
                        ) : filteredItems.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '60px', textAlign: 'center', color: '#636366' }}>
                                    Haber bulunamadı.
                                </td>
                            </tr>
                        ) : (
                            filteredItems.map((item) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
                                                {item.logo_url ? <img src={item.logo_url} style={{ maxWidth: '80%', maxHeight: '80%' }} /> : <Globe size={18} color="#636366" />}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: 500, color: '#F5F0EB' }}>{item.name}</div>
                                                <div style={{ fontSize: '12px', color: '#636366', marginTop: '2px' }}>{item.article_title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={tdStyle}>
                                        <a href={item.article_url} target="_blank" rel="noreferrer" style={{ color: '#C9A96E', fontSize: '12px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            Habere Git <ExternalLink size={12} />
                                        </a>
                                    </td>
                                    <td style={tdStyle}>
                                        <button
                                            onClick={() => handleToggleActive(item)}
                                            style={{
                                                background: item.is_active ? 'rgba(48,209,88,0.1)' : 'rgba(255,69,58,0.1)',
                                                color: item.is_active ? '#30D158' : '#FF453A',
                                                border: 'none', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', fontWeight: 600, cursor: 'pointer'
                                            }}
                                        >
                                            {item.is_active ? 'Aktif' : 'Pasif'}
                                        </button>
                                    </td>
                                    <td style={tdStyle}>
                                        <span style={{ fontSize: '13px', color: '#F5F0EB' }}>{item.sort_order}</span>
                                    </td>
                                    <td style={{ ...tdStyle, textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                            <button onClick={() => openEdit(item)} style={actionBtnStyle}><Edit3 size={14} /></button>
                                            <button onClick={() => handleDelete(item.id)} style={{ ...actionBtnStyle, color: '#FF453A' }}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, backdropFilter: 'blur(4px)' }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            style={{
                                position: 'fixed', top: '50%', left: '50%', x: '-50%', y: '-50%',
                                width: '90%', maxWidth: '500px', background: '#1C1C1E', borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.08)', zIndex: 101, overflow: 'hidden',
                                boxShadow: '0 24px 48px rgba(0,0,0,0.5)'
                            }}
                        >
                            <form onSubmit={handleSubmit}>
                                <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#F5F0EB', margin: 0 }}>
                                        {editingItem ? 'Haberi Düzenle' : 'Yeni Haber Ekle'}
                                    </h2>
                                </div>
                                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div>
                                        <label style={labelStyle}>YAYIN ADI</label>
                                        <input
                                            required value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            style={inputStyle} placeholder="Örn: Milliyet, Hürriyet"
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>HABER BAŞLIĞI</label>
                                        <input
                                            required value={formData.article_title}
                                            onChange={e => setFormData({ ...formData, article_title: e.target.value })}
                                            style={inputStyle} placeholder="Haberin başlığı"
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>HABER URL</label>
                                        <input
                                            required type="url" value={formData.article_url}
                                            onChange={e => setFormData({ ...formData, article_url: e.target.value })}
                                            style={inputStyle} placeholder="https://..."
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>LOGO URL (OPSİYONEL)</label>
                                        <input
                                            value={formData.logo_url}
                                            onChange={e => setFormData({ ...formData, logo_url: e.target.value })}
                                            style={inputStyle} placeholder="Görsel URL'si"
                                        />
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>
                                            <label style={labelStyle}>SIRALAMA</label>
                                            <input
                                                type="number" value={formData.sort_order}
                                                onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                                                style={inputStyle}
                                            />
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '20px' }}>
                                            <input
                                                type="checkbox" checked={formData.is_active}
                                                onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                                                id="is_active"
                                            />
                                            <label htmlFor="is_active" style={{ fontSize: '13px', color: '#AEAEB2', cursor: 'pointer' }}>Yayında mı?</label>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                    <button
                                        type="button" onClick={() => setIsModalOpen(false)}
                                        style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#AEAEB2', borderRadius: '6px', padding: '10px 20px', cursor: 'pointer' }}
                                    >
                                        İptal
                                    </button>
                                    <button
                                        type="submit"
                                        style={{ background: '#C9A96E', color: '#0F0F10', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: 600, cursor: 'pointer' }}
                                    >
                                        Kaydet
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style jsx>{`
                .animate-spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}

const thStyle = { padding: '16px 20px', fontSize: '11px', fontWeight: 600, color: '#636366', letterSpacing: '0.05em', textTransform: 'uppercase' as const };
const tdStyle = { padding: '16px 20px', verticalAlign: 'middle' };
const labelStyle = { fontSize: '11px', fontWeight: 600, color: '#636366', marginBottom: '8px', display: 'block' };
const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '10px 14px', color: '#F5F0EB', fontSize: '13px', outline: 'none', boxSizing: 'border-box' as const
};
const actionBtnStyle = {
    width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)', color: '#AEAEB2', display: 'flex',
    alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 200ms'
};

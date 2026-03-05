'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Save, Globe, RefreshCcw, Trash2, Edit3, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import ConfirmModal from '@/components/Admin/ConfirmModal';

interface Language {
    code: string;
    name: string;
    is_active: boolean;
    is_default: boolean;
    sort_order: number;
}

interface TranslationRow {
    key: string;
    category: string;
    translations: { [langCode: string]: string };
}

export default function TranslationsPage() {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [translationsData, setTranslationsData] = useState<TranslationRow[]>([]);
    const [loading, setLoading] = useState(true);

    // UI States
    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [categories, setCategories] = useState<string[]>([]);

    // Edit State
    const [editingKey, setEditingKey] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<{ [langCode: string]: string }>({});
    const [editCategory, setEditCategory] = useState('general');

    // New Key State
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newKey, setNewKey] = useState('');

    // Delete State
    const [deletingKey, setDeletingKey] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Languages
            const langRes = await fetch('/api/admin/translations/languages');
            if (!langRes.ok) throw new Error('Diller alınamadı');
            const langs: Language[] = await langRes.json();
            setLanguages(langs);

            // Fetch Translations
            const transRes = await fetch('/api/admin/translations/keys');
            if (!transRes.ok) throw new Error('Çeviriler alınamadı');
            const rawTrans: any[] = await transRes.json();

            // Transform raw data into structured rows: { key: 'X', category: 'Y', translations: { tr: 'A', en: 'B' } }
            const rowsMap = new Map<string, TranslationRow>();
            const uniqueCategories = new Set<string>();

            rawTrans.forEach(t => {
                uniqueCategories.add(t.category || 'general');
                if (!rowsMap.has(t.key)) {
                    rowsMap.set(t.key, { key: t.key, category: t.category || 'general', translations: {} });
                }
                const row = rowsMap.get(t.key)!;
                row.translations[t.language_code] = t.value;
            });

            setCategories(Array.from(uniqueCategories));
            setTranslationsData(Array.from(rowsMap.values()));

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditStart = (row: TranslationRow) => {
        setEditingKey(row.key);
        setEditValues({ ...row.translations });
        setEditCategory(row.category);
        setIsAddingNew(false);
    };

    const handleAddNewStart = () => {
        setEditingKey(null);
        setEditValues({});
        setEditCategory('general');
        setNewKey('');
        setIsAddingNew(true);
    };

    const handleCancelEdit = () => {
        setEditingKey(null);
        setIsAddingNew(false);
    };

    const handleSave = async () => {
        const keyToSave = isAddingNew ? newKey.trim() : editingKey;
        if (!keyToSave) {
            toast.error('Çeviri anahtarı (key) boş olamaz.');
            return;
        }

        // Check for duplicates when adding new
        if (isAddingNew && translationsData.some(t => t.key === keyToSave)) {
            toast.error('Bu anahtar zaten mevcut.');
            return;
        }

        const payload = {
            translations: languages.map(lang => ({
                key: keyToSave,
                language_code: lang.code,
                value: editValues[lang.code] || '',
                category: editCategory
            }))
        };

        try {
            const res = await fetch('/api/admin/translations/keys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Kaydedilemedi');
            }

            toast.success('Çeviriler kaydedildi');
            setIsAddingNew(false);
            setEditingKey(null);
            fetchData();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deletingKey) return;
        try {
            const res = await fetch(`/api/admin/translations/keys/${deletingKey}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Silinemedi');
            toast.success('Çeviri anahtarı silindi');
            fetchData();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setDeletingKey(null);
        }
    };

    // Filtreleme
    const filteredRows = translationsData.filter(row => {
        const matchesSearch = row.key.toLowerCase().includes(search.toLowerCase()) ||
            Object.values(row.translations).some(v => v.toLowerCase().includes(search.toLowerCase()));
        const matchesCategory = filterCategory === 'all' || row.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const activeLangs = languages.filter(l => l.is_active);

    return (
        <div className="p-8 pb-32 max-w-[1400px] mx-auto">
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: '40px', position: 'sticky', top: 0, zIndex: 10,
                background: 'rgba(20,20,22,0.8)', backdropFilter: 'blur(12px)',
                padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.04)'
            }}>
                <div>
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif", fontSize: '28px',
                        color: '#F5F0EB', margin: 0
                    }}>Çeviri Yönetimi</h1>
                    <p style={{ fontSize: '14px', color: '#AEAEB2', marginTop: '4px', margin: 0 }}>
                        Sitedeki statik metinleri (butonlar, başlıklar vb.) farklı diller için yönetin.
                    </p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#636366]" size={16} />
                        <input
                            type="text"
                            placeholder="Anahtar veya metin ara..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#1C1C1E] border border-white/[0.06] rounded-sm py-2 pl-10 pr-4 text-[13px] text-[#F5F0EB] focus:outline-none focus:border-[#C9A96E]/50"
                        />
                    </div>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm py-2 px-4 text-[13px] text-[#F5F0EB] focus:outline-none focus:border-[#C9A96E]/50"
                    >
                        <option value="all">Tüm Kategoriler</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleAddNewStart}
                    disabled={isAddingNew || editingKey !== null}
                    className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#b8995d] disabled:opacity-50 disabled:cursor-not-allowed text-[#0F0F10] px-4 py-2 rounded-sm text-[13px] font-bold transition-colors whitespace-nowrap"
                >
                    <Plus size={16} />
                    Yeni Çeviri Ekle
                </button>
            </div>

            {/* Table */}
            <div className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm overflow-hidden overflow-x-auto">
                {loading ? (
                    <div className="p-10 text-center text-[#AEAEB2] flex items-center justify-center gap-3">
                        <RefreshCcw size={18} className="animate-spin" /> Yükleniyor...
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                                <th className="p-4 text-[11px] font-semibold text-[#636366] uppercase tracking-wider w-1/4">ANAHTAR (KEY) & KATEGORİ</th>
                                {activeLangs.map(lang => (
                                    <th key={lang.code} className="p-4 text-[11px] font-semibold text-[#636366] uppercase tracking-wider">
                                        {lang.name} ({lang.code.toUpperCase()})
                                    </th>
                                ))}
                                <th className="p-4 text-[11px] font-semibold text-[#636366] uppercase tracking-wider text-right w-[100px]">İŞLEM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Satır Ekleme Formu */}
                            {isAddingNew && (
                                <tr className="border-b border-white/[0.02] bg-[#C9A96E]/5">
                                    <td className="p-4 align-top">
                                        <input
                                            type="text"
                                            placeholder="ör. nav_home"
                                            value={newKey}
                                            onChange={e => setNewKey(e.target.value)}
                                            className="w-full bg-[#141416] border border-white/[0.1] rounded-sm px-3 py-1.5 text-[13px] text-[#F5F0EB] focus:border-[#C9A96E]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Kategori (örn. navigation)"
                                            value={editCategory}
                                            onChange={e => setEditCategory(e.target.value)}
                                            className="w-full mt-2 bg-[#141416] border border-white/[0.1] rounded-sm px-3 py-1.5 text-[12px] text-[#AEAEB2] focus:border-[#C9A96E]"
                                        />
                                    </td>
                                    {activeLangs.map(lang => (
                                        <td key={lang.code} className="p-4 align-top">
                                            <textarea
                                                rows={2}
                                                value={editValues[lang.code] || ''}
                                                onChange={e => setEditValues({ ...editValues, [lang.code]: e.target.value })}
                                                placeholder={`${lang.name} çevirisi...`}
                                                className="w-full bg-[#141416] border border-white/[0.1] rounded-sm px-3 py-1.5 text-[13px] text-[#F5F0EB] focus:border-[#C9A96E] resize-y"
                                            />
                                        </td>
                                    ))}
                                    <td className="p-4 align-top text-right">
                                        <div className="flex flex-col gap-2 items-end">
                                            <button onClick={handleSave} className="p-1.5 text-[#C9A96E] hover:bg-[#C9A96E]/20 rounded transition-colors" title="Kaydet"><Check size={16} /></button>
                                            <button onClick={handleCancelEdit} className="p-1.5 text-[#AEAEB2] hover:bg-white/[0.1] rounded transition-colors" title="İptal"><X size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {filteredRows.length === 0 && !isAddingNew ? (
                                <tr>
                                    <td colSpan={activeLangs.length + 2} className="p-16 text-center">
                                        <Globe size={48} className="text-[#636366] mb-4 opacity-50 mx-auto" />
                                        <h3 className="text-[#F5F0EB] font-medium mb-1">Çeviri Bulunamadı</h3>
                                        <p className="text-[#636366] text-sm">Arama kriterlerinize uygun çeviri yok.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredRows.map(row => {
                                    const isEditing = editingKey === row.key;

                                    return (
                                        <tr key={row.key} className={`border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors ${isEditing ? 'bg-[#C9A96E]/5' : ''}`}>
                                            <td className="p-4 align-top">
                                                {isEditing ? (
                                                    <div>
                                                        <div className="text-[13px] font-medium font-mono text-[#0A84FF] mb-2">{row.key}</div>
                                                        <input
                                                            type="text"
                                                            value={editCategory}
                                                            onChange={e => setEditCategory(e.target.value)}
                                                            className="w-full bg-[#141416] border border-white/[0.1] rounded-sm px-3 py-1.5 text-[12px] text-[#AEAEB2] focus:border-[#C9A96E]"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className="text-[13px] font-medium font-mono text-[#0A84FF] break-all">{row.key}</div>
                                                        <div className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] bg-white/[0.05] text-[#8E8E93] border border-white/[0.05]">
                                                            {row.category}
                                                        </div>
                                                    </div>
                                                )}
                                            </td>

                                            {activeLangs.map(lang => (
                                                <td key={lang.code} className="p-4 align-top">
                                                    {isEditing ? (
                                                        <textarea
                                                            rows={2}
                                                            value={editValues[lang.code] ?? ''}
                                                            onChange={e => setEditValues({ ...editValues, [lang.code]: e.target.value })}
                                                            className="w-full bg-[#141416] border border-white/[0.1] rounded-sm px-3 py-1.5 text-[13px] text-[#F5F0EB] focus:border-[#C9A96E] resize-y"
                                                        />
                                                    ) : (
                                                        <div className="text-[13px] text-[#F5F0EB] whitespace-pre-wrap break-words">
                                                            {row.translations[lang.code] || <span className="text-[#FF453A]/50 italic text-[11px]">Eksik çeviri</span>}
                                                        </div>
                                                    )}
                                                </td>
                                            ))}

                                            <td className="p-4 align-top text-right">
                                                {isEditing ? (
                                                    <div className="flex flex-col gap-2 items-end">
                                                        <button onClick={handleSave} className="p-1.5 text-[#C9A96E] hover:bg-[#C9A96E]/20 rounded transition-colors" title="Kaydet"><Check size={16} /></button>
                                                        <button onClick={handleCancelEdit} className="p-1.5 text-[#AEAEB2] hover:bg-white/[0.1] rounded transition-colors" title="İptal"><X size={16} /></button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleEditStart(row)}
                                                            disabled={editingKey !== null || isAddingNew}
                                                            className="p-1.5 text-[#AEAEB2] hover:text-[#C9A96E] hover:bg-white/[0.05] rounded transition-colors disabled:opacity-30"
                                                            title="Düzenle"
                                                        >
                                                            <Edit3 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => setDeletingKey(row.key)}
                                                            disabled={editingKey !== null || isAddingNew}
                                                            className="p-1.5 text-[#AEAEB2] hover:text-[#FF453A] hover:bg-[#FF453A]/10 rounded transition-colors disabled:opacity-30"
                                                            title="Sil"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            <ConfirmModal
                open={!!deletingKey}
                onClose={() => setDeletingKey(null)}
                onConfirm={handleDeleteConfirm}
                title="Çeviriyi Sil"
                message={`"${deletingKey}" anahtarına ait tüm dillerdeki çeviriler silinecektir. Sistem veya frontend tasarımında hatalara neden olabilir. Onaylıyor musunuz?`}
                confirmText="Sil"
                cancelText="İptal"
                variant="danger"
            />
        </div>
    );
}

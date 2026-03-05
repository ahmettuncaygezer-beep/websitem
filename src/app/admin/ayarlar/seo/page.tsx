'use client';

import React, { useState, useEffect } from 'react';
import { SettingsPageHeader } from '@/components/Admin/Settings/SettingsPageHeader';
import { Search, Plus, Edit3, Trash2, Globe, FileText, AlertCircle, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import ConfirmModal from '@/components/Admin/ConfirmModal';

interface SeoEntry {
    id: string;
    url_path: string;
    title: string;
    description: string;
    keywords: string;
    updated_at: string;
}

export default function SeoManagerPage() {
    const [entries, setEntries] = useState<SeoEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Form Fields
    const [urlPath, setUrlPath] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [robots, setRobots] = useState('index, follow');

    const fetchEntries = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/seo');
            if (!res.ok) throw new Error('SEO verileri alınamadı');
            const data = await res.json();
            setEntries(data);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    const handleOpenModal = (entry?: SeoEntry) => {
        if (entry) {
            setEditingId(entry.id);
            setUrlPath(entry.url_path);
            setTitle(entry.title);
            setDescription(entry.description || '');
            setKeywords(entry.keywords || '');
        } else {
            setEditingId(null);
            setUrlPath('');
            setTitle('');
            setDescription('');
            setKeywords('');
            setRobots('index, follow');
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = { url_path: urlPath, title, description, keywords, robots };
            const url = editingId ? `/api/admin/seo/${editingId}` : '/api/admin/seo';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Kaydedilemedi');

            toast.success('SEO ayarları kaydedildi');
            setIsModalOpen(false);
            fetchEntries();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setDeleteId(id);
    };

    const handleDeleteConfirm = async () => {
        if (!deleteId) return;
        try {
            const res = await fetch(`/api/admin/seo/${deleteId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Silinemedi');
            toast.success('Kayıt silindi');
            fetchEntries();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setDeleteId(null);
        }
    };

    const filteredEntries = entries.filter(e =>
        e.url_path.toLowerCase().includes(search.toLowerCase()) ||
        e.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8 pb-32 max-w-6xl mx-auto">
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
                    }}>SEO Merkezi</h1>
                    <p style={{ fontSize: '14px', color: '#AEAEB2', marginTop: '4px', margin: 0 }}>
                        Sitedeki tüm URL'lerin arama motoru optimizasyonu (Meta başlık, açıklama, anahtar kelimeler) kayıtlarını yönetin.
                    </p>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6 mt-8">
                <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#636366]" size={16} />
                    <input
                        type="text"
                        placeholder="URL veya Başlık ara..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#1C1C1E] border border-white/[0.06] rounded-sm py-2 pl-10 pr-4 text-[13px] text-[#F5F0EB] focus:outline-none focus:border-[#C9A96E]/50"
                    />
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#b8995d] text-[#0F0F10] px-4 py-2 rounded-sm text-[13px] font-bold transition-colors"
                >
                    <Plus size={16} />
                    Yeni SEO Kaydı
                </button>
            </div>

            <div className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm overflow-hidden">
                {loading ? (
                    <div className="p-10 text-center text-[#AEAEB2] flex items-center justify-center gap-3">
                        <RefreshCcw size={18} className="animate-spin" /> Yükleniyor...
                    </div>
                ) : filteredEntries.length === 0 ? (
                    <div className="p-16 text-center flex flex-col items-center justify-center">
                        <Globe size={48} className="text-[#636366] mb-4 opacity-50" />
                        <h3 className="text-[#F5F0EB] font-medium mb-1">Kayıt Bulunamadı</h3>
                        <p className="text-[#636366] text-sm">Arama kriterlerinize uygun veya eklenmiş bir SEO ayarı yok.</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                                <th className="p-4 text-[11px] font-semibold text-[#636366] uppercase tracking-wider">URL / SAYFA</th>
                                <th className="p-4 text-[11px] font-semibold text-[#636366] uppercase tracking-wider">SEO BİLGİLERİ</th>
                                <th className="p-4 text-[11px] font-semibold text-[#636366] uppercase tracking-wider">GÜNCELLEME</th>
                                <th className="p-4 text-[11px] font-semibold text-[#636366] uppercase tracking-wider text-right">İŞLEM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEntries.map(entry => (
                                <tr key={entry.id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                                    <td className="p-4 align-top">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 p-1.5 rounded-sm bg-white/[0.03] text-[#AEAEB2]"><FileText size={14} /></div>
                                            <div>
                                                <div className="text-[13px] font-medium text-[#0A84FF] font-mono break-all">{entry.url_path}</div>
                                                <div className="text-[12px] text-[#636366] mt-1">{entry.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 align-top max-w-[300px]">
                                        <div className="text-[12px] text-[#AEAEB2] line-clamp-2" title={entry.description}>
                                            <span className="text-[#636366]">Desc:</span> {entry.description || '-'}
                                        </div>
                                        <div className="text-[11px] text-[#636366] mt-1 truncate" title={entry.keywords}>
                                            <span className="text-[#636366]">Keys:</span> {entry.keywords || '-'}
                                        </div>
                                    </td>
                                    <td className="p-4 align-top">
                                        <div className="text-[12px] text-[#AEAEB2]">{new Date(entry.updated_at).toLocaleDateString('tr-TR')}</div>
                                    </td>
                                    <td className="p-4 align-top text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => handleOpenModal(entry)} className="p-1.5 text-[#AEAEB2] hover:text-[#C9A96E] hover:bg-white/[0.05] rounded transition-colors" title="Düzenle">
                                                <Edit3 size={16} />
                                            </button>
                                            <button onClick={() => handleDeleteClick(entry.id)} className="p-1.5 text-[#AEAEB2] hover:text-[#FF453A] hover:bg-[#FF453A]/10 rounded transition-colors" title="Sil">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#1C1C1E] border border-white/[0.08] p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-[#F5F0EB]">{editingId ? 'SEO Kaydını Düzenle' : 'Yeni SEO Kaydı'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-[#636366] hover:text-white"><AlertCircle size={20} className="hidden" /> Kapat</button>
                        </div>

                        <form onSubmit={handleSave} className="flex flex-col gap-5">
                            <div>
                                <label className="block text-[11px] font-bold text-[#636366] uppercase mb-2">Hedef URL (Zorunlu) *</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-sm border border-r-0 border-white/[0.06] bg-white/[0.02] text-[#AEAEB2] text-[13px]">
                                        /
                                    </span>
                                    <input
                                        type="text"
                                        value={urlPath.replace(/^\//, '')}
                                        onChange={(e) => setUrlPath(`/${e.target.value}`)}
                                        required
                                        placeholder="hakkimizda veya kategori/yatak-odasi"
                                        className="flex-1 min-w-0 block w-full bg-white/[0.02] border border-white/[0.08] rounded-r-sm px-3 py-2.5 text-[14px] text-[#F5F0EB] focus:outline-none focus:border-[#C9A96E]/50"
                                    />
                                </div>
                                <p className="text-[11px] text-[#636366] mt-1.5">Sitenin kök dizininden sonraki kısım (örn. anasayfa için / bırakın veya kategori/sofa vb. girin).</p>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-[#636366] uppercase mb-2">Meta Başlık (Title) *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    placeholder="Sayfa SEO Başlığı"
                                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-2.5 text-[14px] text-[#F5F0EB] focus:outline-none focus:border-[#C9A96E]/50"
                                />
                                <div className="flex justify-between mt-1 text-[11px]">
                                    <span className="text-[#636366]">Arama sonuçlarında mavi tıklanabilir link olarak görünür.</span>
                                    <span className={title.length > 60 ? 'text-[#FF9F0A]' : 'text-[#636366]'}>{title.length}/60</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-[#636366] uppercase mb-2">Meta Açıklama (Description)</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Sayfanın içeriğini anlatan özet bir metin..."
                                    rows={3}
                                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-3 text-[14px] text-[#F5F0EB] focus:outline-none focus:border-[#C9A96E]/50 resize-none"
                                />
                                <div className="flex justify-between mt-1 text-[11px]">
                                    <span className="text-[#636366]">Önerilen uzunluk 150-160 karakterdir.</span>
                                    <span className={description.length > 160 ? 'text-[#FF9F0A]' : 'text-[#636366]'}>{description.length}/160</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-[#636366] uppercase mb-2">Meta Anahtar Kelimeler (Keywords)</label>
                                <input
                                    type="text"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                    placeholder="mobilya, lüks sofa, tasarım (virgülle ayırın)"
                                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-2.5 text-[14px] text-[#F5F0EB] focus:outline-none focus:border-[#C9A96E]/50"
                                />
                            </div>

                            <div className="mt-2 pt-5 border-t border-white/[0.06] flex justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-[13px] font-bold text-[#AEAEB2] hover:bg-white/[0.04] rounded-sm transition-colors">
                                    İptal
                                </button>
                                <button type="submit" disabled={saving} className="px-5 py-2.5 bg-[#C9A96E] hover:bg-[#b8995d] text-[#0F0F10] text-[13px] font-bold rounded-sm transition-colors flex items-center gap-2 disabled:opacity-50">
                                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            <ConfirmModal
                open={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDeleteConfirm}
                title="SEO Kaydını Sil"
                message="Bu URL için belirlenen özel SEO ayarları silinecek. Silme işleminden sonra varsayılan ayarlar kullanılacaktır."
                confirmText="Sil"
                cancelText="İptal"
                variant="danger"
            />
        </div>
    );
}

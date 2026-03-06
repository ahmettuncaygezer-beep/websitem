'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { PageList, type PageItem } from '@/components/Admin/Pages/PageList';
import ConfirmModal from '@/components/Admin/ConfirmModal';

export default function SayfalarPage() {
    const [pages, setPages] = useState<PageItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const fetchPages = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/pages');
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Sayfalar alınamadı');
            setPages(data.pages || []);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const handleDeleteConfirm = async () => {
        if (!deleteId) return;
        try {
            const res = await fetch(`/api/admin/pages/${deleteId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Silinemedi');
            toast.success('Sayfa başarıyla silindi');
            setPages(pages.filter(p => p.id !== deleteId));
        } catch (error: any) {
            toast.error('Hata: ' + error.message);
        } finally {
            setDeleteId(null);
        }
    };

    const filteredPages = pages.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8 pb-20 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-[28px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif]">Sayfalar</h1>
                    <p className="text-sm text-[#636366] mt-1">Sitenizdeki hakkımızda, iade koşulları vb. metin sayfalarını yönetin</p>
                </div>
                <Link
                    href="/admin/icerik/sayfalar/yeni"
                    className="bg-[#C9A96E] hover:bg-[#b8995d] text-[#0F0F10] px-5 py-2.5 rounded-sm text-[13px] font-bold transition-colors flex items-center gap-2"
                >
                    <Plus size={16} />
                    Yeni Sayfa
                </Link>
            </div>

            {/* Top Bar */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#636366]" />
                    <input
                        type="text"
                        placeholder="Sayfa ara (başlık veya URL)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#1C1C1E] border border-white/[0.06] rounded-sm py-2.5 pl-11 pr-4 text-[13px] text-[#F5F0EB] focus:outline-none focus:border-[#C9A96E]/50 focus:bg-white/[0.03] transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1C1C1E] border border-white/[0.06] rounded-sm text-[13px] text-[#AEAEB2] hover:bg-white/[0.02] transition-colors">
                    <Filter size={16} />
                    Filtrele
                </button>
            </div>

            {/* List */}
            {loading ? (
                <div className="text-[#AEAEB2] text-sm py-10 text-center">Yükleniyor...</div>
            ) : (
                <PageList pages={filteredPages} onDelete={setDeleteId} />
            )}

            {/* Delete Confirmation */}
            <ConfirmModal
                open={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDeleteConfirm}
                title="Sayfayı Sil"
                message="Bu sayfayı silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
                confirmText="Sil"
                cancelText="İptal"
                variant="danger"
            />
        </div>
    );
}

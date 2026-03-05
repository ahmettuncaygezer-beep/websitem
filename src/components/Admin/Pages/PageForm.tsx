'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Globe, EyeOff, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
// import { Editor } from '@/components/Admin/Editor'; // In a real scenario we'd use a Rich Text Editor. Using textarea for now as placeholder for brevity.

interface PageFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export function PageForm({ initialData, isEdit }: PageFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form State
    const [title, setTitle] = useState(initialData?.title || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
    const [isPublished, setIsPublished] = useState(initialData?.is_published || false);

    // SEO State
    const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || '');
    const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || '');
    const [metaKeywords, setMetaKeywords] = useState(initialData?.meta_keywords || '');

    // Auto-generate slug from title if not edit mode and slug is empty
    useEffect(() => {
        if (!isEdit && title && !slug) {
            const autoSlug = title
                .toLowerCase()
                .trim()
                .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                .replace(/[^a-z0-9-]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
            setSlug(autoSlug);
        }
    }, [title, isEdit]);

    const handleSave = async () => {
        if (!title.trim() || !slug.trim() || !content.trim()) {
            toast.error('Lütfen başlık, URL ve içerik alanlarını doldurun.');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                title,
                slug,
                content,
                excerpt,
                meta_title: metaTitle,
                meta_description: metaDescription,
                meta_keywords: metaKeywords,
                is_published: isPublished
            };

            const url = isEdit ? `/api/admin/pages/${initialData.id}` : '/api/admin/pages';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Bir hata oluştu');

            toast.success(`Sayfa başarıyla ${isEdit ? 'güncellendi' : 'oluşturuldu'}`);
            router.push('/admin/icerik/sayfalar');
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 pb-32 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/icerik/sayfalar" className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center text-[#AEAEB2] hover:bg-white/[0.08] hover:text-white transition-all">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-[24px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif]">
                            {isEdit ? 'Sayfayı Düzenle' : 'Yeni Sayfa Oluştur'}
                        </h1>
                        <p className="text-[#636366] text-sm mt-1">
                            Siteniz için statik içerik sayfası hazırlayın
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push('/admin/icerik/sayfalar')}
                        className="px-5 py-2.5 rounded-sm border border-white/[0.08] text-[#AEAEB2] text-[13px] font-bold hover:bg-white/[0.02] transition-colors"
                    >
                        İptal
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-5 py-2.5 rounded-sm bg-[#C9A96E] hover:bg-[#b8995d] text-[#0F0F10] text-[13px] font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save size={16} />
                        {loading ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Basic Info */}
                    <div className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm p-6">
                        <h2 className="text-[14px] font-semibold text-[#F5F0EB] mb-6 uppercase tracking-wider">Sayfa İçeriği</h2>

                        <div className="flex flex-col gap-5">
                            <div>
                                <label className="block text-[11px] font-bold text-[#636366] uppercase tracking-wider mb-2">SAYFA BAŞLIĞI *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Örn: Hakkımızda"
                                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-3 text-[14px] text-[#F5F0EB] focus:outline-none focus:border-[#C9A96E]/50 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-[#636366] uppercase tracking-wider mb-2">İÇERİK *</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Sayfa içeriğini HTML veya düz metin olarak buraya yazın..."
                                    className="w-full h-[400px] bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-3 text-[14px] text-[#F5F0EB] focus:outline-none focus:border-[#C9A96E]/50 transition-colors font-mono resize-y"
                                />
                                <p className="text-[12px] text-[#636366] mt-2">İpucu: HTML formatı desteklenmektedir.</p>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-[#636366] uppercase tracking-wider mb-2">ÖZET (İsteğe Bağlı)</label>
                                <textarea
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    placeholder="Sayfanın kısa bir özeti..."
                                    className="w-full h-24 bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-3 text-[14px] text-[#F5F0EB] focus:outline-none focus:border-[#C9A96E]/50 transition-colors resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO Settings */}
                    <div className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm p-6">
                        <h2 className="text-[14px] font-semibold text-[#F5F0EB] mb-6 uppercase tracking-wider">Arama Motoru Optimizasyonu (SEO)</h2>

                        <div className="flex flex-col gap-5">
                            <div>
                                <label className="block text-[11px] font-bold text-[#636366] uppercase tracking-wider mb-2">META BAŞLIK</label>
                                <input
                                    type="text"
                                    value={metaTitle}
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                    placeholder={title || 'SEO Başlığı'}
                                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-3 text-[14px] text-[#F5F0EB] focus:outline-none focus:border-[#C9A96E]/50 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-[#636366] uppercase tracking-wider mb-2">META AÇIKLAMA</label>
                                <textarea
                                    value={metaDescription}
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                    placeholder="Arama sonuçlarında görünecek açıklama metni..."
                                    className="w-full h-20 bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-3 text-[14px] text-[#F5F0EB] focus:outline-none focus:border-[#C9A96E]/50 transition-colors resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-[#636366] uppercase tracking-wider mb-2">ANAHTAR KELİMELER</label>
                                <input
                                    type="text"
                                    value={metaKeywords}
                                    onChange={(e) => setMetaKeywords(e.target.value)}
                                    placeholder="mobilya, lüks, tasarım (virgülle ayırın)"
                                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-3 text-[14px] text-[#F5F0EB] focus:outline-none focus:border-[#C9A96E]/50 transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="flex flex-col gap-6">
                    {/* Publishing */}
                    <div className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm p-6">
                        <h2 className="text-[14px] font-semibold text-[#F5F0EB] mb-6 uppercase tracking-wider">Yayın Durumu</h2>

                        <div className="flex gap-2 p-1 bg-white/[0.02] border border-white/[0.08] rounded-sm mb-6">
                            <button
                                onClick={() => setIsPublished(true)}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded text-[13px] font-bold transition-all ${isPublished ? 'bg-[#30D158]/10 text-[#30D158] shadow-sm' : 'text-[#636366] hover:text-[#F5F0EB]'}`}
                            >
                                <Globe size={16} />
                                Yayında
                            </button>
                            <button
                                onClick={() => setIsPublished(false)}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded text-[13px] font-bold transition-all ${!isPublished ? 'bg-white/[0.08] text-[#F5F0EB] shadow-sm' : 'text-[#636366] hover:text-[#F5F0EB]'}`}
                            >
                                <EyeOff size={16} />
                                Taslak
                            </button>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-[#636366] uppercase tracking-wider mb-2">URL / SLUG *</label>
                            <div className="flex items-center bg-white/[0.02] border border-white/[0.08] rounded-sm overflow-hidden focus-within:border-[#C9A96E]/50 transition-colors">
                                <span className="pl-4 pr-1 py-3 text-[13px] text-[#636366]">/</span>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="ornek-sayfa"
                                    className="w-full bg-transparent px-2 py-3 text-[14px] text-[#F5F0EB] focus:outline-none"
                                />
                            </div>
                            <p className="text-[12px] text-[#636366] mt-2">Sitenizde görüneceği link yapısı. Örn: 2mobilya.com/<b>{slug || 'hakkimizda'}</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

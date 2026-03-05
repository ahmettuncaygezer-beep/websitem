'use client';

import React, { useState, useEffect } from 'react';
import {
    ArrowLeft, Eye, Send, Globe
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlogEditor } from '@/components/Admin/Content/BlogEditor';
import { BlogSeoCard } from '@/components/Admin/Content/BlogSeoCard';
import { ImageUploader } from '@/components/Admin/ImageUploader';
import { toast } from 'react-hot-toast';

function toSlug(text: string): string {
    const map: Record<string, string> = {
        'ğ': 'g', 'Ğ': 'g', 'ü': 'u', 'Ü': 'u', 'ş': 's', 'Ş': 's',
        'ı': 'i', 'İ': 'i', 'ö': 'o', 'Ö': 'o', 'ç': 'c', 'Ç': 'c',
    };
    return text.split('').map(c => map[c] ?? c).join('').toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}

const CATEGORIES = ['Tasarım', 'Dekorasyon', 'Koleksiyon', 'Haberler', 'Yaşam', 'Sürdürülebilirlik'];

export default function YeniBlogPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [keyword, setKeyword] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

    useEffect(() => {
        if (title && !slugManuallyEdited) {
            setSlug(toSlug(title));
        }
    }, [title, slugManuallyEdited]);

    const handleSlugChange = (v: string) => { setSlug(v); setSlugManuallyEdited(true); };

    const buildPayload = (status: 'draft' | 'published') => ({
        title: title.trim(), slug: slug.trim() || toSlug(title), content,
        excerpt: excerpt || content.replace(/<[^>]+>/g, '').slice(0, 200),
        cover_image: coverImage, author, category, status,
        meta_title: metaTitle || title, meta_description: metaDescription || excerpt,
        read_time: Math.max(1, Math.round(content.replace(/<[^>]+>/g, '').split(/\s+/).length / 200)),
    });

    const handleSave = async () => {
        if (!title.trim()) { toast.error('Başlık giriniz'); return; }
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(buildPayload('draft')) });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Kaydedilemedi');
            toast.success('Taslak kaydedildi');
            router.push('/admin/icerik/blog');
        } catch (err: any) { toast.error(err.message); } finally { setIsSaving(false); }
    };

    const handlePublish = async () => {
        if (!title.trim()) { toast.error('Başlık giriniz'); return; }
        if (!content.trim()) { toast.error('İçerik giriniz'); return; }
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(buildPayload('published')) });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Yayınlanamadı');
            toast.success('Yazı başarıyla yayınlandı!');
            router.push('/admin/icerik/blog');
        } catch (err: any) { toast.error(err.message); } finally { setIsSaving(false); }
    };

    const handlePreview = () => {
        if (!slug) { toast.error('Önce bir başlık girin'); return; }
        window.open(`/blog/${slug}`, '_blank');
    };

    return (
        <div style={{ background: '#141416', minHeight: '100vh' }}>
            {/* Top Bar */}
            <header style={{
                height: '64px', background: '#0F0F10', borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px',
                position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(10px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Link href="/admin/icerik/blog" style={{ color: '#636366', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowLeft size={16} /> Tüm Yazılar
                    </Link>
                    <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />
                    <h1 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Yeni Blog Yazısı</h1>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={btnOutlineStyle} onClick={handlePreview}><Eye size={16} /> Önizle</button>
                    <button style={btnSecondaryStyle} onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Kaydediliyor...' : 'Taslak Kaydet'}
                    </button>
                    <button style={btnPrimaryStyle} onClick={handlePublish} disabled={isSaving}><Send size={16} /> Yayınla</button>
                </div>
            </header>

            <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>

                {/* Main Editor Area */}
                <main>
                    <BlogEditor
                        title={title} onTitleChange={setTitle}
                        content={content} onContentChange={setContent}
                        slug={slug} onSlugChange={handleSlugChange}
                    />

                    <div style={{ marginTop: '24px', padding: '20px', background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h4 style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', marginBottom: '12px' }}>Özet (Excerpt)</h4>
                        <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Kısa yazı özeti..."
                            style={{ width: '100%', minHeight: '80px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '10px', color: '#F5F0EB', fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: '1.6' }} />
                    </div>

                    <div style={{ marginTop: '24px', padding: '24px', background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <ImageUploader
                            bucket="blog"
                            value={coverImage}
                            onChange={setCoverImage}
                            label="Öne Çıkan Görsel"
                        />
                    </div>
                </main>

                {/* Sidebar Meta Area */}
                <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    <div style={cardStyle}>
                        <h4 style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', marginBottom: '16px' }}>Yayınlama Ayarları</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                <span style={{ color: '#636366' }}>Durum</span>
                                <span style={{ color: '#AEAEB2' }}>Taslak</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                <span style={{ color: '#636366' }}>Görünürlük</span>
                                <span style={{ color: '#30D158' }}>Herkese Açık</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                                <span style={{ color: '#636366' }}>Kategori</span>
                                <select value={category} onChange={e => setCategory(e.target.value)}
                                    style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#C9A96E', fontSize: '12px', padding: '4px 8px', outline: 'none' }}>
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                                <span style={{ color: '#636366' }}>Yazar</span>
                                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Yazar adı..."
                                    style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '8px', color: '#F5F0EB', fontSize: '12px', outline: 'none' }} />
                            </div>
                        </div>
                    </div>

                    <div style={cardStyle}>
                        <h4 style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', marginBottom: '16px' }}>SEO Ayarları</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div>
                                <div style={{ fontSize: '11px', color: '#636366', marginBottom: '6px' }}>Meta Başlık</div>
                                <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder={title || 'Meta başlık...'}
                                    style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '8px', color: '#F5F0EB', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }} />
                            </div>
                            <div>
                                <div style={{ fontSize: '11px', color: '#636366', marginBottom: '6px' }}>Meta Açıklama</div>
                                <textarea value={metaDescription} onChange={e => setMetaDescription(e.target.value)} placeholder="Meta açıklama..."
                                    style={{ width: '100%', minHeight: '70px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '8px', color: '#F5F0EB', fontSize: '12px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                            </div>
                        </div>
                    </div>

                    <BlogSeoCard
                        title={metaTitle || title}
                        description={metaDescription || excerpt || content.slice(0, 160)}
                        keyword={keyword}
                        content={content}
                    />

                    <div style={cardStyle}>
                        <h4 style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', marginBottom: '16px' }}>Anahtar Kelime</h4>
                        <input
                            type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Odak kelime girin..."
                            style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '10px', color: '#F5F0EB', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                        />
                    </div>

                </aside>
            </div>
        </div>
    );
}

const cardStyle = { background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '20px' };
const btnBaseStyle = { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 200ms' };
const btnPrimaryStyle = { ...btnBaseStyle, background: '#C9A96E', color: '#0F0F10' };
const btnSecondaryStyle = { ...btnBaseStyle, background: 'rgba(255,255,255,0.08)', color: '#F5F0EB' };
const btnOutlineStyle = { ...btnBaseStyle, background: 'transparent', border: '1px solid #C9A96E', color: '#C9A96E' };

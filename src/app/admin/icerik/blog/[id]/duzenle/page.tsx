'use client';

import React, { useState, useEffect } from 'react';
import {
    ArrowLeft, Eye, Send, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { BlogEditor } from '@/components/Admin/Content/BlogEditor';
import { BlogSeoCard } from '@/components/Admin/Content/BlogSeoCard';
import { ImageUploader } from '@/components/Admin/ImageUploader';
import { toast } from 'react-hot-toast';

const CATEGORIES = ['Tasarım', 'Dekorasyon', 'Koleksiyon', 'Haberler', 'Yaşam', 'Sürdürülebilirlik'];

interface BlogData {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    cover_image: string;
    author: string;
    category: string;
    status: string;
    meta_title: string;
    meta_description: string;
    created_at: string;
    updated_at: string;
}

export default function BlogDuzenlePage() {
    const router = useRouter();
    const params = useParams();
    const [blog, setBlog] = useState<BlogData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        async function loadBlog() {
            try {
                const res = await fetch(`/api/admin/blog/${params.id}`);
                const json = await res.json();
                if (!res.ok) throw new Error(json.error || 'Bulunamadı');
                setBlog(json);
            } catch (err: any) {
                toast.error(err.message);
                router.push('/admin/icerik/blog');
            } finally {
                setIsLoading(false);
            }
        }
        if (params.id) loadBlog();
    }, [params.id, router]);

    const handleUpdate = (field: keyof BlogData, value: string) => {
        if (!blog) return;
        setBlog({ ...blog, [field]: value });
    };

    const handleSave = async () => {
        if (!blog) return;
        setIsSaving(true);
        try {
            const res = await fetch(`/api/admin/blog/${blog.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: blog.title, slug: blog.slug, content: blog.content,
                    excerpt: blog.excerpt, cover_image: blog.cover_image,
                    author: blog.author, category: blog.category, status: blog.status,
                    meta_title: blog.meta_title, meta_description: blog.meta_description,
                }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Kaydedilemedi');
            toast.success('Değişiklikler kaydedildi');
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handlePublish = async () => {
        if (!blog) return;
        setIsSaving(true);
        try {
            const res = await fetch(`/api/admin/blog/${blog.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: blog.title, slug: blog.slug, content: blog.content,
                    excerpt: blog.excerpt, cover_image: blog.cover_image,
                    author: blog.author, category: blog.category,
                    status: 'published',
                    meta_title: blog.meta_title, meta_description: blog.meta_description,
                }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Yayınlanamadı');
            toast.success('Yazı yayınlandı!');
            router.push('/admin/icerik/blog');
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading || !blog) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#141416' }}>
            <Loader2 size={32} color="#C9A96E" style={{ animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    return (
        <div style={{ background: '#141416', minHeight: '100vh' }}>
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
                    <div>
                        <h1 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>{blog.title}</h1>
                        <div style={{ fontSize: '10px', color: '#636366' }}>
                            {blog.status === 'published' ? '✅ Yayında' : blog.status === 'draft' ? '📝 Taslak' : '⏰ Zamanlanmış'}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={btnOutlineStyle} onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}><Eye size={16} /> Önizle</button>
                    <button style={btnSecondaryStyle} onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
                    </button>
                    {blog.status !== 'published' && (
                        <button style={btnPrimaryStyle} onClick={handlePublish} disabled={isSaving}><Send size={16} /> Yayınla</button>
                    )}
                </div>
            </header>

            <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>
                <main>
                    <BlogEditor
                        title={blog.title} onTitleChange={(v) => handleUpdate('title', v)}
                        content={blog.content} onContentChange={(v) => handleUpdate('content', v)}
                        slug={blog.slug} onSlugChange={(v) => handleUpdate('slug', v)}
                    />

                    <div style={{ marginTop: '24px', padding: '20px', background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h4 style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', marginBottom: '12px' }}>Özet (Excerpt)</h4>
                        <textarea value={blog.excerpt || ''} onChange={e => handleUpdate('excerpt', e.target.value)} placeholder="Kısa yazı özeti..."
                            style={{ width: '100%', minHeight: '80px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '10px', color: '#F5F0EB', fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: '1.6' }} />
                    </div>

                    <div style={{ marginTop: '24px', padding: '24px', background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <ImageUploader
                            bucket="blog"
                            value={blog.cover_image || ''}
                            onChange={(url) => handleUpdate('cover_image', url)}
                            label="Öne Çıkan Görsel"
                        />
                    </div>
                </main>

                <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={cardStyle}>
                        <h4 style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', marginBottom: '16px' }}>Yazı Bilgileri</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                <span style={{ color: '#636366' }}>Durum</span>
                                <span style={{ color: blog.status === 'published' ? '#30D158' : '#AEAEB2' }}>
                                    {blog.status === 'published' ? 'Yayında' : blog.status === 'draft' ? 'Taslak' : 'Zamanlanmış'}
                                </span>
                            </div>
                            <div style={{ fontSize: '12px', color: '#636366' }}>
                                Oluşturma: {new Date(blog.created_at).toLocaleDateString('tr-TR')}
                            </div>
                            <div style={{ fontSize: '12px', color: '#636366' }}>
                                Son Güncelleme: {new Date(blog.updated_at).toLocaleDateString('tr-TR')}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                                <span style={{ color: '#636366' }}>Yazar</span>
                                <input type="text" value={blog.author || ''} onChange={e => handleUpdate('author', e.target.value)} placeholder="Yazar adı..."
                                    style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '8px', color: '#F5F0EB', fontSize: '12px', outline: 'none' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                                <span style={{ color: '#636366' }}>Kategori</span>
                                <select value={blog.category || CATEGORIES[0]} onChange={e => handleUpdate('category', e.target.value)}
                                    style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#C9A96E', fontSize: '12px', padding: '4px 8px', outline: 'none' }}>
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={cardStyle}>
                        <h4 style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', marginBottom: '16px' }}>SEO Ayarları</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div>
                                <div style={{ fontSize: '11px', color: '#636366', marginBottom: '6px' }}>Meta Başlık</div>
                                <input type="text" value={blog.meta_title || ''} onChange={e => handleUpdate('meta_title', e.target.value)} placeholder={blog.title}
                                    style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '8px', color: '#F5F0EB', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }} />
                            </div>
                            <div>
                                <div style={{ fontSize: '11px', color: '#636366', marginBottom: '6px' }}>Meta Açıklama</div>
                                <textarea value={blog.meta_description || ''} onChange={e => handleUpdate('meta_description', e.target.value)} placeholder="Meta açıklama..."
                                    style={{ width: '100%', minHeight: '70px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '8px', color: '#F5F0EB', fontSize: '12px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                            </div>
                        </div>
                    </div>

                    <BlogSeoCard
                        title={blog.meta_title || blog.title}
                        description={blog.meta_description || blog.excerpt || blog.content.slice(0, 160)}
                        keyword={keyword}
                        content={blog.content}
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
const btnBaseStyle = { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600 as const, border: 'none', cursor: 'pointer', transition: 'all 200ms' };
const btnPrimaryStyle = { ...btnBaseStyle, background: '#C9A96E', color: '#0F0F10' };
const btnSecondaryStyle = { ...btnBaseStyle, background: 'rgba(255,255,255,0.08)', color: '#F5F0EB' };
const btnOutlineStyle = { ...btnBaseStyle, background: 'transparent', border: '1px solid #C9A96E', color: '#C9A96E' };

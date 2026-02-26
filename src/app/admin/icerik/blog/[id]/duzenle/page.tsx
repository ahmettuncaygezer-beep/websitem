'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Save, Eye, Send,
    Terminal, Globe, BookOpen, Clock, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { BlogEditor } from '@/components/Admin/Content/BlogEditor';
import { BlogSeoCard } from '@/components/Admin/Content/BlogSeoCard';
import { mockBlogs, BlogPost } from '@/lib/mock/content';

export default function BlogDuzenlePage() {
    const router = useRouter();
    const params = useParams();
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const found = mockBlogs.find(b => b.id === params.id);
        if (found) {
            setBlog(found);
            setKeyword(found.seo.focusKeyword);
        }
    }, [params.id]);

    const handleUpdate = (updates: Partial<BlogPost>) => {
        if (!blog) return;
        setBlog({ ...blog, ...updates });
    };

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsSaving(false);
    };

    if (!blog) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#141416' }}>
            <Loader2 size={32} color="#C9A96E" className="animate-spin" />
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
                        <div style={{ fontSize: '10px', color: '#636366' }}>Güncelleniyor...</div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={btnOutlineStyle}><Eye size={16} /> Önizle</button>
                    <button style={btnSecondaryStyle} onClick={handleSave}>
                        {isSaving ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
                    </button>
                    <button style={btnPrimaryStyle}><Send size={16} /> Değişiklikleri Yayınla</button>
                </div>
            </header>

            <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>
                <main>
                    <BlogEditor
                        title={blog.title} onTitleChange={(v) => handleUpdate({ title: v })}
                        content={blog.content} onContentChange={(v) => handleUpdate({ content: v })}
                        slug={blog.slug} onSlugChange={(v) => handleUpdate({ slug: v })}
                    />

                    <div style={{ marginTop: '32px', padding: '24px', background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h4 style={{ fontSize: '13px', color: '#AEAEB2', marginBottom: '16px' }}>Öne Çıkan Görsel</h4>
                        <div style={{
                            width: '100%', aspectRatio: '21/9', borderRadius: '8px', overflow: 'hidden', position: 'relative',
                            border: '1px solid rgba(255,255,255,0.06)'
                        }}>
                            <img src={blog.coverImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', opacity: 0, transition: 'all 200ms', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <button style={{ background: '#F5F0EB', color: '#0F0F10', border: 'none', borderRadius: '4px', padding: '8px 16px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                                    Görseli Değiştir
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={cardStyle}>
                        <h4 style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', marginBottom: '16px' }}>Yazı Bilgileri</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img src={blog.author.avatar} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                                <span style={{ fontSize: '12px', color: '#AEAEB2' }}>{blog.author.name}</span>
                            </div>
                            <div style={{ fontSize: '12px', color: '#636366' }}>Oluşturma: {new Date(blog.createdAt).toLocaleDateString('tr-TR')}</div>
                            <div style={{ fontSize: '12px', color: '#636366' }}>Son Güncelleme: {new Date(blog.updatedAt).toLocaleDateString('tr-TR')}</div>
                        </div>
                    </div>

                    <BlogSeoCard
                        title={blog.title}
                        description={blog.excerpt}
                        keyword={keyword}
                        content={blog.content}
                    />

                    <div style={cardStyle}>
                        <h4 style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', marginBottom: '16px' }}>Anahtar Kelime</h4>
                        <input
                            type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Odak kelime girin..."
                            style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '10px', color: '#F5F0EB', fontSize: '13px', outline: 'none' }}
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

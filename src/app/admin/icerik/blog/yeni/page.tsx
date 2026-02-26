'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Save, Eye, Send,
    Terminal, Globe, BookOpen, Clock
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlogEditor } from '@/components/Admin/Content/BlogEditor';
import { BlogSeoCard } from '@/components/Admin/Content/BlogSeoCard';

export default function YeniBlogPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');
    const [keyword, setKeyword] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Auto-slug logic
    useEffect(() => {
        if (title && !slug) {
            setSlug(title.toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
            );
        }
    }, [title]);

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsSaving(false);
        // router.push('/admin/icerik/blog');
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
                    <button style={btnOutlineStyle}><Eye size={16} /> Önizle</button>
                    <button style={btnSecondaryStyle} onClick={handleSave}>
                        {isSaving ? 'Kaydediliyor...' : 'Taslak Kaydet'}
                    </button>
                    <button style={btnPrimaryStyle}><Send size={16} /> Yayınla</button>
                </div>
            </header>

            <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>

                {/* Main Editor Area */}
                <main>
                    <BlogEditor
                        title={title} onTitleChange={setTitle}
                        content={content} onContentChange={setContent}
                        slug={slug} onSlugChange={setSlug}
                    />

                    <div style={{ marginTop: '32px', padding: '24px', background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h4 style={{ fontSize: '13px', color: '#AEAEB2', marginBottom: '16px' }}>Öne Çıkan Görsel</h4>
                        <div style={{
                            width: '100%', aspectRatio: '21/9', background: 'rgba(0,0,0,0.2)', border: '2px dashed rgba(255,255,255,0.06)',
                            borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                        }}>
                            <Globe size={32} color="#636366" />
                            <div style={{ color: '#636366', fontSize: '13px', marginTop: '12px' }}>Kapak görselini sürükleyin veya seçin</div>
                        </div>
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                <span style={{ color: '#636366' }}>Kategori</span>
                                <select style={{ background: 'none', border: 'none', color: '#C9A96E', fontSize: '12px', textAlign: 'right', outline: 'none' }}>
                                    <option>Dekorasyon</option>
                                    <option>Tasarım</option>
                                    <option>Yaşam</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <BlogSeoCard
                        title={title}
                        description={content.slice(0, 160)}
                        keyword={keyword}
                        content={content}
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

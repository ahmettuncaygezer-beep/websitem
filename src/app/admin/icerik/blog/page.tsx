'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, Filter, MoreHorizontal,
    Eye, Edit3, Trash2, Copy, BarChart2,
    Calendar, User, Tag as TagIcon
} from 'lucide-react';
import Link from 'next/link';
import { mockBlogs, BlogPost } from '@/lib/mock/content';

const TABS = [
    { id: 'all', label: 'Tümü', count: 47 },
    { id: 'published', label: 'Yayında', count: 32 },
    { id: 'draft', label: 'Taslak', count: 11 },
    { id: 'scheduled', label: 'Zamanlanmış', count: 4 },
];

export default function BlogListPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBlogs = mockBlogs.filter(b => {
        const matchesTab = activeTab === 'all' || b.status === activeTab;
        const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ padding: '32px' }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 500, color: '#F5F0EB', margin: 0 }}>Blog Yazıları</h1>
                    <div style={{ fontSize: '13px', color: '#AEAEB2', marginTop: '2px' }}>47 yazı toplam</div>
                </div>

                <Link href="/admin/icerik/blog/yeni" style={{ textDecoration: 'none' }}>
                    <button style={{
                        background: '#C9A96E', color: '#0F0F10', border: 'none', borderRadius: '6px',
                        padding: '10px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '8px'
                    }}>
                        <Plus size={18} /> Yeni Yazı
                    </button>
                </Link>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '24px' }}>
                {TABS.map(tab => {
                    const active = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '12px 0', background: 'none', border: 'none', fontSize: '13px',
                                color: active ? '#C9A96E' : '#636366', cursor: 'pointer', transition: 'all 200ms',
                                borderBottom: `2px solid ${active ? '#C9A96E' : 'transparent'}`,
                                position: 'relative'
                            }}
                        >
                            {tab.label} <span style={{ fontSize: '11px', opacity: 0.5, marginLeft: '4px' }}>({tab.count})</span>
                        </button>
                    );
                })}
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={16} color="#636366" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Yazı başlığı veya içerik ara..."
                        style={{
                            width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '6px', padding: '10px 14px 10px 40px', color: '#F5F0EB', fontSize: '13px', outline: 'none'
                        }}
                    />
                </div>
                <button style={filterBtnStyle}><Filter size={16} /> Filtrele</button>
                <button style={filterBtnStyle}><BarChart2 size={16} /> Sırala</button>
            </div>

            {/* Table */}
            <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
                            <th style={thStyle}>BAŞLIK</th>
                            <th style={thStyle}>KATEGORİ / YAZAR</th>
                            <th style={thStyle}>DURUM</th>
                            <th style={thStyle}>ETKİLEŞİM</th>
                            <th style={thStyle}>TARİH</th>
                            <th style={{ ...thStyle, textAlign: 'right' }}>İŞLEMLER</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence mode="popLayout">
                            {filteredBlogs.map((blog, idx) => (
                                <motion.tr
                                    key={blog.id}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 200ms' }}
                                >
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <img src={blog.coverImage} style={{ width: '60px', height: '40px', borderRadius: '4px', objectFit: 'cover', background: '#333' }} />
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: 500, color: '#F5F0EB' }}>{blog.title}</div>
                                                <div style={{ fontSize: '11px', color: '#636366', fontFamily: "'JetBrains Mono', monospace", marginTop: '2px' }}>{blog.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <img src={blog.author.avatar} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                                            <div>
                                                <div style={{ fontSize: '13px', color: '#F5F0EB' }}>{blog.author.name}</div>
                                                <div style={{ fontSize: '11px', color: '#636366' }}>{blog.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={tdStyle}>
                                        <StatusBadge status={blog.status} />
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '12px', fontWeight: 600, color: '#F5F0EB' }}>{blog.views.toLocaleString()}</div>
                                                <div style={{ fontSize: '9px', color: '#636366', textTransform: 'uppercase' }}>İzlenme</div>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '12px', fontWeight: 600, color: '#F5F0EB' }}>{blog.readTime}dk</div>
                                                <div style={{ fontSize: '9px', color: '#636366', textTransform: 'uppercase' }}>Okuma</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ fontSize: '12px', color: '#AEAEB2' }}>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                        <div style={{ fontSize: '10px', color: '#636366' }}>{new Date(blog.publishedAt || blog.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</div>
                                    </td>
                                    <td style={{ ...tdStyle, textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                            <Link href={`/admin/icerik/blog/${blog.id}/duzenle`}>
                                                <button style={actionBtnStyle}><Edit3 size={14} /></button>
                                            </Link>
                                            <button style={actionBtnStyle}><Eye size={14} /></button>
                                            <button style={{ ...actionBtnStyle, color: '#FF453A' }}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const config: Record<string, any> = {
        published: { label: 'Yayında', color: '#30D158', bg: 'rgba(48,209,88,0.1)' },
        draft: { label: 'Taslak', color: '#AEAEB2', bg: 'rgba(255,255,255,0.05)' },
        scheduled: { label: 'Zamanlanmış', color: '#C9A96E', bg: 'rgba(201,169,110,0.1)' },
    };
    const c = config[status] || config.draft;
    return (
        <span style={{
            padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
            background: c.bg, color: c.color
        }}>
            {c.label}
        </span>
    );
}

const thStyle = { padding: '16px 20px', fontSize: '11px', fontWeight: 600, color: '#636366', letterSpacing: '0.05em' };
const tdStyle = { padding: '16px 20px', verticalAlign: 'middle' };
const filterBtnStyle = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '10px 16px', color: '#F5F0EB', fontSize: '13px',
    display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'
};
const actionBtnStyle = {
    width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)', color: '#AEAEB2', display: 'flex',
    alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 200ms'
};

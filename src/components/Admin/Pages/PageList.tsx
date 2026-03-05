'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MoreHorizontal, Edit3, Trash2, Eye, Calendar, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export interface PageItem {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    is_published: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

interface PageListProps {
    pages: PageItem[];
    onDelete: (id: string) => void;
}

export function PageList({ pages, onDelete }: PageListProps) {
    if (pages.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#636366' }}>
                <FileText size={40} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                <div style={{ fontSize: '15px', color: '#F5F0EB', marginBottom: '8px' }}>Henüz sayfa oluşturulmamış</div>
                <div style={{ fontSize: '13px' }}>Yeni bir sistem sayfası oluşturarak başlayın.</div>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', overflowX: 'auto', background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <th style={thStyle}>SAYFA BAŞLIĞI</th>
                        <th style={thStyle}>URL / SLUG</th>
                        <th style={thStyle}>DURUM</th>
                        <th style={thStyle}>TARİH</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>İŞLEMLER</th>
                    </tr>
                </thead>
                <tbody>
                    {pages.map((page, i) => (
                        <motion.tr
                            key={page.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                        >
                            <td style={tdStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '8px',
                                        background: 'rgba(255,255,255,0.03)', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center', color: '#AEAEB2'
                                    }}>
                                        <FileText size={18} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 500, color: '#F5F0EB' }}>{page.title}</div>
                                        <div style={{ fontSize: '12px', color: '#636366', marginTop: '2px', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {page.excerpt || 'Özet yok'}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td style={tdStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#0A84FF' }}>
                                    <LinkIcon size={12} />
                                    <span>/{page.slug}</span>
                                </div>
                            </td>
                            <td style={tdStyle}>
                                <span style={{
                                    display: 'inline-flex', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
                                    background: page.is_published ? 'rgba(48, 209, 88, 0.1)' : 'rgba(255, 159, 10, 0.1)',
                                    color: page.is_published ? '#30D158' : '#FF9F0A'
                                }}>
                                    {page.is_published ? 'Yayında' : 'Taslak'}
                                </span>
                            </td>
                            <td style={tdStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#AEAEB2' }}>
                                    <Calendar size={14} />
                                    <span>{new Date(page.created_at).toLocaleDateString('tr-TR')}</span>
                                </div>
                            </td>
                            <td style={{ ...tdStyle, textAlign: 'right' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                    <Link href={`/${page.slug}`} target="_blank" style={iconBtnStyle} title="Görüntüle">
                                        <Eye size={16} />
                                    </Link>
                                    <Link href={`/admin/icerik/sayfalar/${page.id}`} style={iconBtnStyle} title="Düzenle">
                                        <Edit3 size={16} />
                                    </Link>
                                    <button onClick={() => onDelete(page.id)} style={{ ...iconBtnStyle, color: '#FF453A' }} title="Sil">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const thStyle: React.CSSProperties = {
    padding: '16px 20px', fontSize: '11px', fontWeight: 600, color: '#636366',
    letterSpacing: '0.05em', textAlign: 'left'
};

const tdStyle: React.CSSProperties = {
    padding: '16px 20px', verticalAlign: 'middle'
};

const iconBtnStyle: React.CSSProperties = {
    width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(255,255,255,0.03)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#AEAEB2',
    transition: 'all 200ms', cursor: 'pointer', border: 'none'
};

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Download, Link as LinkIcon, Trash2,
    ExternalLink, Copy, Check, Edit3,
    Calendar, User, Folder, Info, Tag
} from 'lucide-react';
import { MediaFile, formatFileSize } from '@/types/media';

interface MediaDetailPanelProps {
    file: MediaFile | null;
    onClose: () => void;
    onUpdate: (id: string, updates: Partial<MediaFile>) => void;
}

export function MediaDetailPanel({ file, onClose, onUpdate }: MediaDetailPanelProps) {
    const [altText, setAltText] = useState(file?.altText || '');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (file) setAltText(file.altText);
    }, [file]);

    const handleCopyUrl = () => {
        if (!file) return;
        navigator.clipboard.writeText(file.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {file && (
                <motion.aside
                    initial={{ x: 320 }}
                    animate={{ x: 0 }}
                    exit={{ x: 320 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    style={{
                        width: '320px', height: '100%', background: '#1C1C1E',
                        borderLeft: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column'
                    }}
                >
                    {/* Header */}
                    <div style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Dosya Detayları</h3>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#636366', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                        {/* Preview */}
                        <div style={{
                            width: '100%', aspectRatio: '1/1', background: '#0F0F10', borderRadius: '8px',
                            overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '24px', border: '1px solid rgba(255,255,255,0.04)'
                        }}>
                            {file.type === 'image' && <img src={file.url} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
                            {file.type === 'video' && <video src={file.url} controls style={{ width: '100%', height: '100%' }} />}
                            {file.type === 'pdf' && <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '12px', fontWeight: 600, color: '#636366' }}>PDF BELGESİ</div>
                                <button style={{ marginTop: '12px', padding: '6px 12px', background: 'rgba(255,69,58,0.1)', color: '#FF453A', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>Aç</button>
                            </div>}
                        </div>

                        {/* Basic Info */}
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>{file.name}</h4>
                                <Edit3 size={14} color="#636366" style={{ cursor: 'pointer' }} />
                            </div>
                            <div style={{ fontSize: '12px', color: '#636366' }}>{file.mimeType} · {formatFileSize(file.size)}</div>
                        </div>

                        {/* Meta Grid */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: 'minmax(80px, auto) 1fr', gap: '12px 24px',
                            padding: '16px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', marginBottom: '24px'
                        }}>
                            <MetaRow label="Yükleme" value={new Date(file.createdAt).toLocaleDateString('tr-TR')} icon={Calendar} />
                            <MetaRow label="Boyutlar" value={file.width ? `${file.width} x ${file.height}` : '—'} icon={Info} />
                            <MetaRow label="Yükleyen" value={file.uploadedBy.name} icon={User} />
                            <MetaRow label="Klasör" value="Ürünler / Koltuklar" icon={Folder} />
                        </div>

                        {/* SEO & Tags */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={labelStyle}>ALT TEXT (SEO)</label>
                                <textarea
                                    value={altText}
                                    onChange={(e) => setAltText(e.target.value)}
                                    onBlur={() => onUpdate(file.id, { altText })}
                                    placeholder="Görseli tanımlayan metin..."
                                    style={textareaStyle}
                                />
                                <div style={{ fontSize: '10px', color: '#3A3A3C', marginTop: '4px' }}>Değişiklikler otomatik kaydedilir.</div>
                            </div>

                            <div>
                                <label style={labelStyle}>ETİKETLER</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {file.tags.map(tag => (
                                        <span key={tag} style={tagStyle}>
                                            {tag} <X size={10} style={{ marginLeft: '4px', cursor: 'pointer' }} />
                                        </span>
                                    ))}
                                    <button style={{ ...tagStyle, background: 'none', border: '1px dashed rgba(255,255,255,0.1)', color: '#636366' }}>+ Ekle</button>
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>DOSYA URL</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input readOnly value={file.url} style={{ ...textareaStyle, height: '36px', overflow: 'hidden', whiteSpace: 'nowrap' }} />
                                    <button onClick={handleCopyUrl} style={{ ...actionBtnStyle, width: '40px', padding: 0 }}>
                                        {copied ? <Check size={16} color="#30D158" /> : <Copy size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Usages */}
                        <div style={{ marginTop: '32px' }}>
                            <label style={labelStyle}>KULLANILDIĞI YERLER ({file.usages.length})</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                                {file.usages.length > 0 ? file.usages.map(usage => (
                                    <div key={usage.id} style={usageRowStyle}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#C9A96E' }} />
                                            <span style={{ fontSize: '12px', color: '#AEAEB2' }}>{usage.name}</span>
                                        </div>
                                        <ExternalLink size={12} color="#3A3A3C" />
                                    </div>
                                )) : (
                                    <div style={{ padding: '16px', background: 'rgba(255,214,10,0.05)', borderRadius: '6px', border: '1px solid rgba(255,214,10,0.1)' }}>
                                        <div style={{ fontSize: '11px', color: '#FFD60A', fontWeight: 600 }}>UYARI: KULLANILMIYOR</div>
                                        <div style={{ fontSize: '11px', color: '#636366', marginTop: '4px' }}>Bu dosya herhangi bir sayfada kullanılmıyor.</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '12px' }}>
                        <button style={{ ...actionBtnStyle, flex: 1 }}><Download size={16} /> İndir</button>
                        <button style={{ ...actionBtnStyle, background: 'rgba(255,69,58,0.1)', color: '#FF453A', border: '1px solid rgba(255,69,58,0.1)', flex: 1 }}>
                            <Trash2 size={16} /> Sil
                        </button>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}

function MetaRow({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon size={12} color="#636366" />
                <span style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
            </div>
            <div style={{ fontSize: '12px', color: '#AEAEB2', textAlign: 'right' }}>{value}</div>
        </>
    );
}

const labelStyle = { fontSize: '10px', fontWeight: 600, color: '#636366', textTransform: 'uppercase' as any, letterSpacing: '0.1em', marginBottom: '8px', display: 'block' };
const textareaStyle = {
    width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '10px', color: '#AEAEB2', fontSize: '13px', outline: 'none', resize: 'none' as any
};
const tagStyle = {
    display: 'inline-flex', alignItems: 'center', padding: '4px 8px', background: 'rgba(255,255,255,0.05)',
    borderRadius: '4px', fontSize: '11px', color: '#AEAEB2'
};
const actionBtnStyle = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '10px', color: '#AEAEB2', fontSize: '13px', fontWeight: 600,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
};
const usageRowStyle = {
    padding: '10px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'
};

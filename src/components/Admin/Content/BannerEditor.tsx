'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Type, Link as LinkIcon, Palette, Clock,
    ExternalLink, Zap, MousePointer2
} from 'lucide-react';
import { BannerContent } from '@/lib/mock/content';

interface BannerEditorProps {
    content: BannerContent;
    onChange: (content: BannerContent) => void;
}

const THEMES = [
    { name: 'Altın-Siyah', bg: '#C9A96E', text: '#0F0F10', link: '#0F0F10' },
    { name: 'Beyaz-Koyu', bg: '#F5F0EB', text: '#141416', link: '#C9A96E' },
    { name: 'Kırmızı-Beyaz', bg: '#FF453A', text: '#F5F0EB', link: '#F5F0EB' },
    { name: 'Koyu-Altın', bg: '#0F0F10', text: '#C9A96E', link: '#F5F0EB' },
];

export function BannerEditor({ content, onChange }: BannerEditorProps) {
    const handleChange = (field: keyof BannerContent, value: any) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', margin: 0 }}>Üst Şerit Duyurusu</h2>
                    <p style={{ fontSize: '13px', color: '#636366', marginTop: '4px' }}>Tüm sayfalarda en üstte görünen kampanya veya duyuru çubuğu.</p>
                </div>

                <button
                    onClick={() => handleChange('isActive', !content.isActive)}
                    style={{
                        padding: '8px 24px', borderRadius: '6px', cursor: 'pointer', transition: 'all 200ms',
                        background: content.isActive ? 'rgba(48,209,88,0.1)' : 'rgba(255,69,58,0.1)',
                        border: `1px solid ${content.isActive ? '#30D158' : '#FF453A'}`,
                        color: content.isActive ? '#30D158' : '#FF453A', fontSize: '12px', fontWeight: 600
                    }}
                >
                    {content.isActive ? 'Bölüm Aktif' : 'Bölüm Pasif'}
                </button>
            </div>

            <div style={{ opacity: content.isActive ? 1 : 0.5, pointerEvents: content.isActive ? 'auto' : 'none', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Metin ve Bağlantı */}
                <section style={cardStyle}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Duyuru Metni</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text" value={content.text}
                                    onChange={(e) => handleChange('text', e.target.value)}
                                    style={{ ...inputStyle, paddingLeft: '40px' }}
                                    placeholder="Sınırlı süre: ₺5.000 üzeri %10 indirim"
                                />
                                <Type size={16} color="#636366" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>Marquee (Kayan Yazı)</label>
                            <button
                                onClick={() => handleChange('isMarquee', !content.isMarquee)}
                                style={{
                                    width: '50px', height: '26px', borderRadius: '13px', border: 'none',
                                    background: content.isMarquee ? '#C9A96E' : '#3A3A3C',
                                    position: 'relative', cursor: 'pointer', transition: 'all 200ms'
                                }}
                            >
                                <motion.div
                                    animate={{ x: content.isMarquee ? 26 : 2 }}
                                    style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#F5F0EB', position: 'absolute', top: 2 }}
                                />
                            </button>
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <label style={labelStyle}>Bağlantı URL (Opsiyonel)</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text" value={content.url || ''}
                                onChange={(e) => handleChange('url', e.target.value)}
                                style={{ ...inputStyle, paddingLeft: '40px' }}
                                placeholder="https://maison.com.tr/koleksiyon"
                            />
                            <LinkIcon size={16} color="#636366" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        </div>
                    </div>
                </section>

                {/* Renkler ve Temalar */}
                <section style={cardStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <Palette size={16} color="#AEAEB2" />
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#F5F0EB' }}>Görünüm ve Renkler</span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                        {THEMES.map(theme => (
                            <button
                                key={theme.name}
                                onClick={() => onChange({
                                    ...content,
                                    backgroundColor: theme.bg,
                                    textColor: theme.text,
                                    linkColor: theme.link
                                })}
                                style={{
                                    padding: '8px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.03)',
                                    border: content.backgroundColor === theme.bg ? '1px solid #C9A96E' : '1px solid rgba(255,255,255,0.08)',
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                                }}
                            >
                                <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: theme.bg }} />
                                <span style={{ fontSize: '11px', color: '#AEAEB2' }}>{theme.name}</span>
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        <ColorPicker label="Arka Plan" value={content.backgroundColor} onChange={(v) => handleChange('backgroundColor', v)} />
                        <ColorPicker label="Metin Rengi" value={content.textColor} onChange={(v) => handleChange('textColor', v)} />
                        <ColorPicker label="Link Rengi" value={content.linkColor} onChange={(v) => handleChange('linkColor', v)} />
                    </div>
                </section>

                {/* Canlı Önizleme Şeridi */}
                <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#636366', textTransform: 'uppercase', marginBottom: '4px' }}>Şerit Önizleme</h4>
                    <div style={{
                        width: '100%', height: '40px', background: content.backgroundColor, color: content.textColor,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px',
                        fontSize: '13px', fontWeight: 500, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden'
                    }}>
                        <motion.div
                            animate={content.isMarquee ? { x: [-100, 100] } : {}}
                            transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
                            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                        >
                            {content.text}
                            {content.url && <ExternalLink size={14} style={{ color: content.linkColor }} />}
                        </motion.div>
                    </div>
                </section>

            </div>
        </div>
    );
}

function ColorPicker({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
    return (
        <div>
            <label style={{ fontSize: '11px', color: '#636366', display: 'block', marginBottom: '6px' }}>{label}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.2)', padding: '6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <input
                    type="color" value={value} onChange={(e) => onChange(e.target.value)}
                    style={{ width: '24px', height: '24px', border: 'none', padding: 0, background: 'none', cursor: 'pointer' }}
                />
                <input
                    type="text" value={value.toUpperCase()} onChange={(e) => onChange(e.target.value)}
                    style={{ background: 'none', border: 'none', color: '#AEAEB2', fontSize: '11px', width: '60px', outline: 'none', fontFamily: "'JetBrains Mono', monospace" }}
                />
            </div>
        </div>
    );
}

const cardStyle = {
    background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '8px', padding: '24px'
};
const labelStyle = { fontSize: '12px', fontWeight: 600, color: '#AEAEB2', display: 'block', marginBottom: '8px' };
const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '10px 14px', color: '#F5F0EB', fontSize: '14px', outline: 'none'
};

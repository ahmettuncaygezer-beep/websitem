'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Type, AlignLeft, AlignCenter, AlignRight,
    Image as ImageIcon, Video, Layers, ExternalLink
} from 'lucide-react';
import { HeroContent } from '@/lib/mock/content';

interface HeroEditorProps {
    content: HeroContent;
    onChange: (content: HeroContent) => void;
}

export function HeroEditor({ content, onChange }: HeroEditorProps) {
    const handleChange = (field: keyof HeroContent, value: any) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', margin: 0 }}>Hero Bölümü Düzenle</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

                {/* Left: Text Content */}
                <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={labelStyle}>Üst Etiket</label>
                        <input
                            type="text" value={content.topLabel}
                            onChange={(e) => handleChange('topLabel', e.target.value)}
                            placeholder="Örn: 2026 Koleksiyonu" style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Ana Başlık</label>
                        <textarea
                            value={content.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="Başlığı buraya yazın..." style={{ ...inputStyle, minHeight: '80px', fontFamily: "'Playfair Display', serif", fontSize: '18px' }}
                        />
                        <div style={{ fontSize: '10px', color: '#636366', marginTop: '4px' }}>Satır kesmek için Enter kullanın.</div>
                    </div>

                    <div>
                        <label style={labelStyle}>Alt Açıklama</label>
                        <textarea
                            value={content.subtitle}
                            onChange={(e) => handleChange('subtitle', e.target.value)}
                            placeholder="Kısa bir açıklama..." style={{ ...inputStyle, minHeight: '100px' }}
                        />
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
                        <label style={labelStyle}>Metin Konumu</label>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {[
                                { id: 'left', icon: AlignLeft },
                                { id: 'center', icon: AlignCenter },
                                { id: 'right', icon: AlignRight }
                            ].map((pos) => (
                                <button
                                    key={pos.id}
                                    onClick={() => handleChange('textPosition', pos.id)}
                                    style={{
                                        flex: 1, padding: '10px', borderRadius: '4px', cursor: 'pointer', transition: 'all 200ms',
                                        background: content.textPosition === pos.id ? 'rgba(201,169,110,0.1)' : 'rgba(255,255,255,0.02)',
                                        border: `1px solid ${content.textPosition === pos.id ? '#C9A96E' : 'rgba(255,255,255,0.06)'}`,
                                        color: content.textPosition === pos.id ? '#C9A96E' : '#AEAEB2'
                                    }}
                                >
                                    <pos.icon size={20} style={{ margin: '0 auto' }} />
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Right: Media Content */}
                <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={labelStyle}>Masaüstü Görseli</label>
                        <div style={uploadZoneStyle}>
                            {content.desktopImage ? (
                                <img src={content.desktopImage} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} />
                            ) : (
                                <div style={{ textAlign: 'center' }}>
                                    <ImageIcon size={32} color="#636366" />
                                    <div style={{ fontSize: '12px', color: '#636366', marginTop: '8px' }}>Görsel Yükle</div>
                                </div>
                            )}
                        </div>
                        <div style={{ fontSize: '10px', color: '#636366', marginTop: '6px' }}>Önerilen: 1920×1080px, WEBP</div>
                    </div>

                    <div>
                        <label style={labelStyle}>Overlay Karartma (%{content.overlayOpacity})</label>
                        <input
                            type="range" min="0" max="80" value={content.overlayOpacity}
                            onChange={(e) => handleChange('overlayOpacity', Number(e.target.value))}
                            style={{ width: '100%', accentColor: '#C9A96E' }}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#636366', textTransform: 'uppercase', marginBottom: '12px' }}>Mini Önizleme</h4>
                        <div style={{
                            width: '100%', aspectRatio: '16/9', background: '#0F0F10', borderRadius: '8px', overflow: 'hidden',
                            position: 'relative', border: '1px solid rgba(255,255,255,0.06)'
                        }}>
                            <img src={content.desktopImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{
                                position: 'absolute', inset: 0, background: `rgba(0,0,0,${content.overlayOpacity / 100})`,
                                display: 'flex', alignItems: 'center', justifyContent: content.textPosition === 'center' ? 'center' : (content.textPosition === 'right' ? 'flex-end' : 'flex-start'),
                                padding: '20px', textAlign: content.textPosition as any
                            }}>
                                <div style={{ maxWidth: '70%', transform: 'scale(0.5)', transformOrigin: content.textPosition }}>
                                    <div style={{ fontSize: '14px', color: '#C9A96E', fontWeight: 600 }}>{content.topLabel}</div>
                                    <div style={{ fontSize: '32px', color: '#F5F0EB', fontWeight: 500, fontFamily: "'Playfair Display', serif", whiteSpace: 'pre-wrap' }}>{content.title}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

const labelStyle = { fontSize: '12px', fontWeight: 600, color: '#AEAEB2', display: 'block', marginBottom: '8px' };
const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '10px 14px', color: '#F5F0EB', fontSize: '14px', outline: 'none'
};
const uploadZoneStyle = {
    width: '100%', minHeight: '160px', border: '2px dashed rgba(255,255,255,0.06)', borderRadius: '8px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 200ms',
    background: 'rgba(255,255,255,0.01)', overflow: 'hidden'
};

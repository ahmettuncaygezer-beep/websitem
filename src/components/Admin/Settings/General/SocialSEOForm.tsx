'use client';

import React from 'react';
import { SettingsCard } from '../SettingsCard';
import { Instagram, Facebook, Youtube, Share2, Search, Image as ImageIcon } from 'lucide-react';

interface SocialSEOFormProps {
    settings: any;
    onChange: (section: string, field: string, value: any) => void;
}

export function SocialSEOForm({ settings, onChange }: SocialSEOFormProps) {
    const social = settings.site_social || {};
    const seo = settings.site_seo || {};

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <SettingsCard
                title="Sosyal Medya Hesapları"
                description="Müşterilerinizin size ulaşabileceği ve takip edebileceği kanallar."
            >
                <div style={formGridStyle}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}><Instagram size={14} style={{ marginRight: 8 }} /> INSTAGRAM</label>
                        <input
                            type="text"
                            value={social.instagram || ''}
                            onChange={(e) => onChange('site_social', 'instagram', e.target.value)}
                            style={inputStyle}
                            placeholder="https://instagram.com/kullaniciadi"
                        />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}><Facebook size={14} style={{ marginRight: 8 }} /> FACEBOOK</label>
                        <input
                            type="text"
                            value={social.facebook || ''}
                            onChange={(e) => onChange('site_social', 'facebook', e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}><Youtube size={14} style={{ marginRight: 8 }} /> YOUTUBE</label>
                        <input
                            type="text"
                            value={social.youtube || ''}
                            onChange={(e) => onChange('site_social', 'youtube', e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}><Share2 size={14} style={{ marginRight: 8 }} /> WHATSAPP</label>
                        <input
                            type="text"
                            value={social.whatsapp || ''}
                            onChange={(e) => onChange('site_social', 'whatsapp', e.target.value)}
                            style={inputStyle}
                            placeholder="https://wa.me/90..."
                        />
                    </div>
                </div>
            </SettingsCard>

            <SettingsCard
                title="SEO & Paylaşım Ayarları"
                description="Google aramaları ve sosyal medya paylaşımlarında nasıl göründüğünüzü kontrol edin."
            >
                <div style={formGridStyle}>
                    <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }}>
                        <label style={labelStyle}><Search size={14} style={{ marginRight: 8 }} /> OG BAŞLIĞI (PAYLAŞIM)</label>
                        <input
                            type="text"
                            value={seo.ogTitle || ''}
                            onChange={(e) => onChange('site_seo', 'ogTitle', e.target.value)}
                            style={inputStyle}
                        />
                        <span style={hintStyle}>Paylaşıldığında görünecek dikkat çekici başlık.</span>
                    </div>

                    <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }}>
                        <label style={labelStyle}>OG AÇIKLAMASI</label>
                        <textarea
                            value={seo.ogDescription || ''}
                            onChange={(e) => onChange('site_seo', 'ogDescription', e.target.value)}
                            style={{ ...inputStyle, height: '80px', resize: 'none' }}
                        />
                    </div>

                    <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }}>
                        <label style={labelStyle}>ANAHTAR KELİMELER (.ile ayırın)</label>
                        <input
                            type="text"
                            value={Array.isArray(seo.keywords) ? seo.keywords.join(', ') : ''}
                            onChange={(e) => onChange('site_seo', 'keywords', e.target.value.split(',').map(s => s.trim()))}
                            style={inputStyle}
                        />
                    </div>
                </div>
            </SettingsCard>
        </div>
    );
}

const formGridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '12px' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column' as const, gap: '8px' };
const labelStyle = { display: 'flex', alignItems: 'center', fontSize: '11px', fontWeight: 600, color: '#636366', letterSpacing: '0.05em' };
const inputStyle = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px', padding: '10px 14px', color: '#F5F0EB', fontSize: '14px', outline: 'none',
    transition: 'border-color 200ms'
};
const hintStyle = { fontSize: '11px', color: '#636366' };

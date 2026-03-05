'use client';

import React from 'react';
import { SettingsCard } from '../SettingsCard';
import { GeneralSettings } from '@/types/settings';
import { ImageUploader } from '@/components/Admin/ImageUploader';

interface SiteInfoFormProps {
    settings: GeneralSettings;
    onChange: (updates: Partial<GeneralSettings>) => void;
}

export function SiteInfoForm({ settings, onChange }: SiteInfoFormProps) {
    return (
        <SettingsCard
            title="Site Bilgileri"
            description="Mağazanızın temel kimliği ve iletişim bilgileri."
        >
            <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                <div style={{ flex: '0 0 200px' }}>
                    <ImageUploader
                        bucket="media"
                        folder="logos"
                        value={settings.logo || ''}
                        onChange={(url) => onChange({ logo: url })}
                        label="Site Logosu"
                        height="64px"
                        aspectRatio="auto"
                    />
                </div>

                <div style={{ flex: '0 0 80px' }}>
                    <ImageUploader
                        bucket="media"
                        folder="logos"
                        value={settings.favicon || ''}
                        onChange={(url) => onChange({ favicon: url })}
                        label="Favicon"
                        height="48px"
                        aspectRatio="1/1"
                    />
                </div>
            </div>

            <div style={formGridStyle}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>SİTE ADI</label>
                    <input
                        type="text" value={settings.siteName}
                        onChange={(e) => onChange({ siteName: e.target.value })}
                        style={inputStyle}
                    />
                    <span style={hintStyle}>Tarayıcı sekmesi ve SEO başlığı için kullanılır.</span>
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>SİTE SLOGANI</label>
                    <input
                        type="text" value={settings.siteSlogan}
                        onChange={(e) => onChange({ siteSlogan: e.target.value })}
                        style={inputStyle}
                    />
                </div>

                <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }}>
                    <label style={labelStyle}>SİTE AÇIKLAMASI (META)</label>
                    <textarea
                        value={settings.siteDescription}
                        onChange={(e) => onChange({ siteDescription: e.target.value })}
                        style={{ ...inputStyle, height: '80px', resize: 'none' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                        <span style={hintStyle}>Google sonuçlarında görünecek ana açıklama.</span>
                        <span style={{ fontSize: '11px', color: settings.siteDescription.length > 160 ? '#FF453A' : '#636366' }}>
                            {settings.siteDescription.length} / 160
                        </span>
                    </div>
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>İLETİŞİM E-POSTASI</label>
                    <input
                        type="email" value={settings.contactEmail}
                        onChange={(e) => onChange({ contactEmail: e.target.value })}
                        style={inputStyle}
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>DESTEK E-POSTASI</label>
                    <input
                        type="email" value={settings.supportEmail}
                        onChange={(e) => onChange({ supportEmail: e.target.value })}
                        style={inputStyle}
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>İLETİŞİM TELEFONU</label>
                    <input
                        type="tel" value={settings.contactPhone}
                        onChange={(e) => onChange({ contactPhone: e.target.value })}
                        style={inputStyle}
                    />
                </div>

                <div style={dividerStyle} />

                <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }}>
                    <label style={labelStyle}>MAĞAZA ADRESİ</label>
                    <textarea
                        value={settings.address?.full || ''}
                        onChange={(e) => onChange({ address: { ...settings.address, full: e.target.value } as any })}
                        style={{ ...inputStyle, height: '60px', resize: 'none' }}
                        placeholder="Örn: Modoko Mobilyacılar Sitesi, 2. Cadde No: 45"
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>ŞEHİR</label>
                    <input
                        type="text" value={settings.address?.city || ''}
                        onChange={(e) => onChange({ address: { ...settings.address, city: e.target.value } as any })}
                        style={inputStyle}
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>İLÇE</label>
                    <input
                        type="text" value={settings.address?.district || ''}
                        onChange={(e) => onChange({ address: { ...settings.address, district: e.target.value } as any })}
                        style={inputStyle}
                    />
                </div>
            </div>
        </SettingsCard>
    );
}

const formGridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '12px' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column' as const, gap: '8px' };
const labelStyle = { fontSize: '11px', fontWeight: 600, color: '#636366', letterSpacing: '0.05em' };
const inputStyle = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px', padding: '10px 14px', color: '#F5F0EB', fontSize: '14px', outline: 'none',
    transition: 'border-color 200ms'
};
const dividerStyle = {
    gridColumn: 'span 2',
    height: '1px',
    background: 'rgba(255,255,255,0.06)',
    margin: '8px 0'
};
const hintStyle = { fontSize: '11px', color: '#636366' };


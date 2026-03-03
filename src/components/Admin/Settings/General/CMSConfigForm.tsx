'use client';

import React from 'react';
import { SettingsCard } from '../SettingsCard';

interface CMSConfigFormProps {
    settings: any;
    onChange: (section: string, field: string, value: any) => void;
}

export function CMSConfigForm({ settings, onChange }: CMSConfigFormProps) {
    if (!settings) return null;

    const cmsSettings = settings;

    return (
        <SettingsCard
            title="Site Görünümü & CMS Ayarları"
            description="Tüm sitenin marka renklerini ve ana içeriklerini yönetin."
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Colors Section */}
                <div style={sectionStyle}>
                    <h4 style={sectionTitleStyle}>Tema Renkleri</h4>
                    <div style={gridStyle}>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Ana Renk (Primary)</label>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <input
                                    type="color"
                                    value={cmsSettings.cms_colors?.primary || '#C9A96E'}
                                    onChange={(e) => onChange('cms_colors', 'primary', e.target.value)}
                                    style={colorInputStyle}
                                />
                                <input
                                    type="text"
                                    value={cmsSettings.cms_colors?.primary || '#C9A96E'}
                                    onChange={(e) => onChange('cms_colors', 'primary', e.target.value)}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Koyu Ana Renk</label>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <input
                                    type="color"
                                    value={cmsSettings.cms_colors?.primaryDark || '#B8915A'}
                                    onChange={(e) => onChange('cms_colors', 'primaryDark', e.target.value)}
                                    style={colorInputStyle}
                                />
                                <input
                                    type="text"
                                    value={cmsSettings.cms_colors?.primaryDark || '#B8915A'}
                                    onChange={(e) => onChange('cms_colors', 'primaryDark', e.target.value)}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <div style={sectionStyle}>
                    <h4 style={sectionTitleStyle}>Ana Sayfa (Hero)</h4>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Ana Başlık</label>
                        <textarea
                            value={cmsSettings.cms_hero?.title || ''}
                            onChange={(e) => onChange('cms_hero', 'title', e.target.value)}
                            style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }}
                            placeholder="Mükemmel Evinizin Hikayesi"
                        />
                        <span style={hintStyle}>Typewriter efekti için her satırı yeni bir cümle olarak ekleyin.</span>
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Alt Başlık Açıklaması</label>
                        <textarea
                            value={cmsSettings.cms_hero?.subtitle || ''}
                            onChange={(e) => onChange('cms_hero', 'subtitle', e.target.value)}
                            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                            placeholder="Modern tasarım..."
                        />
                    </div>
                </div>

                {/* Announcement Section */}
                <div style={sectionStyle}>
                    <h4 style={sectionTitleStyle}>Duyuru Çubuğu</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <input
                            type="checkbox"
                            checked={cmsSettings.cms_announcement?.enabled || false}
                            onChange={(e) => onChange('cms_announcement', 'enabled', e.target.checked)}
                        />
                        <label style={{ fontSize: '12px', color: '#AEAEB2' }}>Aktif</label>
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Metin</label>
                        <input
                            type="text"
                            value={cmsSettings.cms_announcement?.text || ''}
                            onChange={(e) => onChange('cms_announcement', 'text', e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div style={gridStyle}>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Arka Plan</label>
                            <input
                                type="color"
                                value={cmsSettings.cms_announcement?.bg || '#C9A96E'}
                                onChange={(e) => onChange('cms_announcement', 'bg', e.target.value)}
                                style={colorInputStyle}
                            />
                        </div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Yazı Rengi</label>
                            <input
                                type="color"
                                value={cmsSettings.cms_announcement?.color || '#000000'}
                                onChange={(e) => onChange('cms_announcement', 'color', e.target.value)}
                                style={colorInputStyle}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </SettingsCard>
    );
}

const sectionStyle = {
    padding: '20px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
};

const sectionTitleStyle = {
    fontSize: '14px',
    color: '#F5F0EB',
    fontWeight: 600,
    margin: 0
};

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
};

const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
};

const labelStyle = {
    fontSize: '11px',
    fontWeight: 600,
    color: '#636366',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const
};

const inputStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px',
    padding: '12px 14px',
    color: '#F5F0EB',
    fontSize: '14px',
    outline: 'none',
    width: '100%'
};

const colorInputStyle = {
    width: '40px',
    height: '40px',
    padding: 0,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    background: 'transparent'
};

const hintStyle = {
    fontSize: '11px',
    color: '#636366',
    marginTop: '4px'
};

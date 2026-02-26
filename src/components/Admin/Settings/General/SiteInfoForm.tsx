'use client';

import React, { useState } from 'react';
import { Camera, Edit3 } from 'lucide-react';
import { SettingsCard } from '../SettingsCard';
import { GeneralSettings } from '@/types/settings';

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
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                    <div style={{
                        width: '128px', height: '64px', background: '#0F0F10', borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.06)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                    }}>
                        <img src={settings.logo} alt="Logo" style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                    </div>
                    <button style={uploadIconBtnStyle}><Camera size={14} /></button>
                    <div style={{ fontSize: '11px', color: '#636366', marginTop: '8px', textAlign: 'center' }}>Site Logosu</div>
                </div>

                <div style={{ position: 'relative' }}>
                    <div style={{
                        width: '48px', height: '48px', background: '#0F0F10', borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.06)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                    }}>
                        <img src={settings.favicon} alt="Favicon" style={{ width: '24px', height: '24px' }} />
                    </div>
                    <button style={{ ...uploadIconBtnStyle, top: '-4px', right: '-4px' }}><Camera size={12} /></button>
                    <div style={{ fontSize: '11px', color: '#636366', marginTop: '8px', textAlign: 'center' }}>Favicon</div>
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
const hintStyle = { fontSize: '11px', color: '#636366' };
const uploadIconBtnStyle = {
    position: 'absolute' as const, top: '-8px', right: '-8px', width: '28px', height: '28px',
    borderRadius: '50%', background: '#242426', border: '1px solid rgba(255,255,255,0.1)',
    color: '#C9A96E', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
};

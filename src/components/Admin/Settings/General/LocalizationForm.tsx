'use client';

import React from 'react';
import { SettingsCard } from '../SettingsCard';
import { GeneralSettings } from '@/types/settings';

interface LocalizationFormProps {
    settings: GeneralSettings;
    onChange: (updates: Partial<GeneralSettings>) => void;
}

export function LocalizationForm({ settings, onChange }: LocalizationFormProps) {
    return (
        <SettingsCard
            title="Dil & Yerelleştirme"
            description="Mağazanızın dil, para birimi ve zaman ayarları."
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>VARSAYILAN PARA BİRİMİ</label>
                    <select
                        value={settings.currency}
                        onChange={(e) => onChange({ currency: e.target.value as any })}
                        style={inputStyle}
                    >
                        <option value="TRY">Türk Lirası (₺)</option>
                        <option value="USD">ABD Doları ($)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="GBP">İngiliz Sterlini (£)</option>
                    </select>
                    <span style={hintStyle}>Örnek fiyat: {settings.currency === 'TRY' ? '₺1.247,50' : '$1,247.50'}</span>
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>VARSAYILAN DİL</label>
                    <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '8px' }}>
                        {['tr', 'en'].map((lang) => (
                            <button
                                key={lang}
                                onClick={() => onChange({ defaultLanguage: lang as any })}
                                style={{
                                    flex: 1, padding: '8px', borderRadius: '6px', border: 'none',
                                    background: settings.defaultLanguage === lang ? '#1C1C1E' : 'transparent',
                                    color: settings.defaultLanguage === lang ? '#C9A96E' : '#636366',
                                    fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 200ms'
                                }}
                            >
                                {lang === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>SAAT DİLİMİ</label>
                    <select
                        value={settings.timezone}
                        onChange={(e) => onChange({ timezone: e.target.value })}
                        style={inputStyle}
                    >
                        <option value="Europe/Istanbul (UTC+3)">Europe/Istanbul (UTC+3)</option>
                        <option value="Europe/London (UTC+0)">Europe/London (UTC+0)</option>
                        <option value="America/New_York (UTC-5)">America/New_York (UTC-5)</option>
                    </select>
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>TARİH FORMATI</label>
                    <select
                        value={settings.dateFormat}
                        onChange={(e) => onChange({ dateFormat: e.target.value })}
                        style={inputStyle}
                    >
                        <option value="GG/AA/YYYY">GG/AA/YYYY (12/03/2026)</option>
                        <option value="AA/GG/YYYY">AA/GG/YYYY (03/12/2026)</option>
                        <option value="YYYY-AA-GG">YYYY-AA-GG (2026-03-12)</option>
                    </select>
                </div>
            </div>
        </SettingsCard>
    );
}

const inputGroupStyle = { display: 'flex', flexDirection: 'column' as const, gap: '8px' };
const labelStyle = { fontSize: '11px', fontWeight: 600, color: '#636366', letterSpacing: '0.05em' };
const inputStyle = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px', padding: '10px 14px', color: '#F5F0EB', fontSize: '14px', outline: 'none',
    width: '100%', cursor: 'pointer'
};
const hintStyle = { fontSize: '11px', color: '#636366' };

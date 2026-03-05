'use client';

import React from 'react';
import { Palette, Image as ImageIcon, Globe, Share2, Mail, Phone, MapPin } from 'lucide-react';

interface GlobalSettings {
    siteName: string;
    logoUrl: string;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
    };
    contact: {
        email: string;
        phone: string;
        address: string;
    };
    social: {
        instagram: string;
        facebook: string;
        whatsapp: string;
    };
}

interface GlobalSettingsEditorProps {
    content: GlobalSettings;
    onChange: (content: GlobalSettings) => void;
}

export function GlobalSettingsEditor({ content, onChange }: GlobalSettingsEditorProps) {
    const handleChange = (path: string, value: any) => {
        const newContent = { ...content };
        const keys = path.split('.');
        let current: any = newContent;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        onChange(newContent);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <header>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', margin: 0 }}>Site Geneli Ayarlar</h2>
                <p style={{ fontSize: '13px', color: '#636366', marginTop: '4px' }}>Logo, kurumsal renkler ve iletişim bilgilerini buradan yönetin.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                {/* Left: Branding & Colors */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <section style={cardStyle}>
                        <h3 style={sectionTitleStyle}><ImageIcon size={16} /> Marka & Logo</h3>
                        <div style={{ marginTop: '16px' }}>
                            <label style={labelStyle}>Site Adı</label>
                            <input
                                type="text" value={content.siteName}
                                onChange={(e) => handleChange('siteName', e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <div style={{ marginTop: '16px' }}>
                            <label style={labelStyle}>Logo URL</label>
                            <input
                                type="text" value={content.logoUrl}
                                onChange={(e) => handleChange('logoUrl', e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                    </section>

                    <section style={cardStyle}>
                        <h3 style={sectionTitleStyle}><Palette size={16} /> Renk Paleti</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                            <ColorInput label="Ana Renk" value={content.colors.primary} onChange={(v) => handleChange('colors.primary', v)} />
                            <ColorInput label="Sekonder Renk" value={content.colors.secondary} onChange={(v) => handleChange('colors.secondary', v)} />
                            <ColorInput label="Arka Plan" value={content.colors.background} onChange={(v) => handleChange('colors.background', v)} />
                            <ColorInput label="Metin Rengi" value={content.colors.text} onChange={(v) => handleChange('colors.text', v)} />
                        </div>
                    </section>
                </div>

                {/* Right: Contact & Social */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <section style={cardStyle}>
                        <h3 style={sectionTitleStyle}><Globe size={16} /> İletişim Bilgileri</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                            <IconInput icon={Mail} value={content.contact.email} onChange={(v) => handleChange('contact.email', v)} placeholder="E-posta" />
                            <IconInput icon={Phone} value={content.contact.phone} onChange={(v) => handleChange('contact.phone', v)} placeholder="Telefon" />
                            <IconInput icon={MapPin} value={content.contact.address} onChange={(v) => handleChange('contact.address', v)} placeholder="Adres" />
                        </div>
                    </section>

                    <section style={cardStyle}>
                        <h3 style={sectionTitleStyle}><Share2 size={16} /> Sosyal Medya</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                            <IconInput icon={Share2} value={content.social.instagram} onChange={(v) => handleChange('social.instagram', v)} placeholder="Instagram URL" />
                            <IconInput icon={Share2} value={content.social.whatsapp} onChange={(v) => handleChange('social.whatsapp', v)} placeholder="WhatsApp Numarası" />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function ColorInput({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
    return (
        <div>
            <label style={labelStyle}>{label}</label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '4px' }}>
                <input type="color" value={value} onChange={(e) => onChange(e.target.value)} style={{ width: '24px', height: '24px', border: 'none', background: 'none', cursor: 'pointer' }} />
                <span style={{ fontSize: '11px', color: '#AEAEB2' }}>{(value || '').toUpperCase()}</span>
            </div>
        </div>
    );
}

function IconInput({ icon: Icon, value, onChange, placeholder }: { icon: any, value: string, onChange: (v: string) => void, placeholder: string }) {
    return (
        <div style={{ position: 'relative' }}>
            <Icon size={16} color="#636366" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
                type="text" value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={{ ...inputStyle, paddingLeft: '40px' }}
            />
        </div>
    );
}

const cardStyle = { background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '24px' };
const sectionTitleStyle = { fontSize: '14px', fontWeight: 600, color: '#F5F0EB', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 };
const labelStyle = { fontSize: '11px', color: '#636366', display: 'block', marginBottom: '6px' };
const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '10px 14px', color: '#F5F0EB', fontSize: '13px', outline: 'none' };

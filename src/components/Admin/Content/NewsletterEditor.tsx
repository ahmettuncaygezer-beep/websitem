import React from 'react';
import { Mail, Bell } from 'lucide-react';

interface NewsletterContent {
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
    successMessage: string;
    backgroundColor?: string;
}

interface NewsletterEditorProps {
    content: NewsletterContent;
    onChange: (content: NewsletterContent) => void;
}

export function NewsletterEditor({ content, onChange }: NewsletterEditorProps) {
    const handleChange = (field: keyof NewsletterContent, value: any) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', margin: 0 }}>Bülten Ayarları</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                {/* Content Settings */}
                <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={labelStyle}>Başlık</label>
                        <input
                            type="text"
                            value={content.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="Örn: Özel Fırsatlardan Haberdar Olun"
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Açıklama</label>
                        <textarea
                            value={content.description || ''}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder="Kısa bir açıklama..."
                            style={{ ...inputStyle, minHeight: '80px' }}
                        />
                    </div>
                </section>

                {/* Form Settings */}
                <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={labelStyle}>Input Yer Tutucu (Placeholder)</label>
                        <input
                            type="text"
                            value={content.placeholder || ''}
                            onChange={(e) => handleChange('placeholder', e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={labelStyle}>Buton Metni</label>
                            <input
                                type="text"
                                value={content.buttonText || ''}
                                onChange={(e) => handleChange('buttonText', e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Arka Plan Rengi</label>
                            <input
                                type="color"
                                value={content.backgroundColor || '#1C1C1E'}
                                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                                style={{ ...inputStyle, padding: '4px', height: '42px' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Başarı Mesajı</label>
                        <input
                            type="text"
                            value={content.successMessage || ''}
                            onChange={(e) => handleChange('successMessage', e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                </section>
            </div>

            {/* Preview Card */}
            <div style={{ marginTop: '20px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#636366', textTransform: 'uppercase', marginBottom: '12px' }}>Görünüm Önizleme</h4>
                <div style={{
                    width: '100%', padding: '40px', background: content.backgroundColor || '#1C1C1E', borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
                }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(201,169,110,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                        <Mail size={24} color="#C9A96E" />
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#F5F0EB', marginBottom: '8px' }}>{content.title}</h3>
                    <p style={{ fontSize: '14px', color: '#AEAEB2', maxWidth: '400px', marginBottom: '24px' }}>{content.description}</p>
                    <div style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '400px' }}>
                        <div style={{ flex: 1, padding: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)', fontSize: '14px', textAlign: 'left' }}>
                            {content.placeholder}
                        </div>
                        <div style={{ padding: '12px 24px', borderRadius: '6px', background: '#C9A96E', color: '#0F0F10', fontWeight: 700, fontSize: '14px' }}>
                            {content.buttonText}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const labelStyle = { fontSize: '12px', fontWeight: 600, color: '#AEAEB2', display: 'block', marginBottom: '8px' };
const inputStyle = {
    width: '100%', background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '10px 14px', color: '#F5F0EB', fontSize: '14px', outline: 'none'
};

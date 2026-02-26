'use client';

import React, { useState } from 'react';
import { X, Mail, Plus } from 'lucide-react';

interface NotificationEmailsProps {
    emails: string[];
    onChange: (val: string[]) => void;
}

export function NotificationEmails({ emails, onChange }: NotificationEmailsProps) {
    const [input, setInput] = useState('');

    const handleAdd = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && input.trim()) {
            if (!emails.includes(input.trim())) {
                onChange([...emails, input.trim()]);
            }
            setInput('');
        }
    };

    const removeEmail = (email: string) => {
        onChange(emails.filter(e => e !== email));
    };

    return (
        <div style={containerStyle}>
            <label style={labelStyle}>BİLDİRİM ALICI E-POSTALARI</label>
            <div style={inputWrapperStyle}>
                <div style={tagCloudStyle}>
                    {emails.map(email => (
                        <span key={email} style={chipStyle}>
                            {email}
                            <button onClick={() => removeEmail(email)} style={removeBtnStyle}><X size={12} /></button>
                        </span>
                    ))}
                    <input
                        type="email"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleAdd}
                        placeholder="E-posta ekle ve Enter'a bas..."
                        style={inputStyle}
                    />
                </div>
            </div>
            <p style={hintStyle}>Bu adreslere tüm admin bildirimleri (yeni sipariş, stok uyarısı vb.) gönderilir.</p>
        </div>
    );
}

const containerStyle = { display: 'flex', flexDirection: 'column' as const, gap: '8px' };
const labelStyle = { fontSize: '11px', fontWeight: 600, color: '#636366', letterSpacing: '0.05em' };
const inputWrapperStyle = {
    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '8px', padding: '12px'
};
const tagCloudStyle = { display: 'flex', flexWrap: 'wrap' as any, gap: '8px', alignItems: 'center' };
const chipStyle = {
    background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)',
    color: '#C9A96E', padding: '4px 10px', borderRadius: '4px', fontSize: '13px',
    display: 'flex', alignItems: 'center', gap: '8px'
};
const removeBtnStyle = { background: 'none', border: 'none', color: '#C9A96E', cursor: 'pointer', padding: 0 };
const inputStyle = {
    background: 'transparent', border: 'none', color: '#F5F0EB', fontSize: '13px',
    outline: 'none', minWidth: '200px', flex: 1
};
const hintStyle = { fontSize: '11px', color: '#636366' };

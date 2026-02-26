'use client';

import React, { useState, useMemo } from 'react';
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { SettingsCard } from '../SettingsCard';

export function ChangePassword() {
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [showPwd, setShowPwd] = useState(false);

    const strength = useMemo(() => {
        if (!newPwd) return 0;
        let s = 0;
        if (newPwd.length >= 8) s++;
        if (/[A-Z]/.test(newPwd)) s++;
        if (/[0-9]/.test(newPwd)) s++;
        if (/[!@#$%^&*]/.test(newPwd)) s++;
        return s;
    }, [newPwd]);

    const STRENGTH_COLORS = ['#FF453A', '#FF9F0A', '#FFD60A', '#30D158', '#32D74B'];
    const STRENGTH_LABELS = ['Çok Zayıf', 'Zayıf', 'Orta', 'Güçlü', 'Çok Güçlü'];

    const rules = [
        { label: 'En az 8 karakter', met: newPwd.length >= 8 },
        { label: 'En az 1 büyük harf', met: /[A-Z]/.test(newPwd) },
        { label: 'En az 1 rakam', met: /[0-9]/.test(newPwd) },
        { label: 'En az 1 özel karakter (!@#...)', met: /[!@#$%^&*]/.test(newPwd) }
    ];

    const isMatch = newPwd === confirmPwd && confirmPwd !== '';

    return (
        <SettingsCard
            title="Şifre Değiştir"
            description="Hesabınızın güvenliği için güçlü bir şifre seçtiğinizden emin olun."
        >
            <div style={inputGroupStyle}>
                <label style={labelStyle}>MEVCUT ŞİFRE</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPwd ? 'text' : 'password'}
                        value={currentPwd}
                        onChange={(e) => setCurrentPwd(e.target.value)}
                        style={inputStyle}
                    />
                    <button onClick={() => setShowPwd(!showPwd)} style={eyeBtnStyle}>
                        {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
            </div>

            <div style={inputGroupStyle}>
                <label style={labelStyle}>YENİ ŞİFRE</label>
                <input
                    type={showPwd ? 'text' : 'password'}
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    style={inputStyle}
                />

                {/* Strength Meter */}
                <div style={{ marginTop: '8px' }}>
                    <div style={meterBgStyle}>
                        <div style={{
                            height: '100%', width: `${(strength / 4) * 100}%`,
                            background: STRENGTH_COLORS[strength], transition: 'all 300ms'
                        }} />
                    </div>
                    <div style={{ fontSize: '11px', color: STRENGTH_COLORS[strength], marginTop: '4px', textAlign: 'right', fontWeight: 600 }}>
                        {STRENGTH_LABELS[strength]}
                    </div>
                </div>

                {/* Rules */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
                    {rules.map(rule => (
                        <div key={rule.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: rule.met ? '#30D158' : '#636366' }}>
                            {rule.met ? <Check size={14} /> : <div style={{ width: 14, height: 14, border: '1px solid currentColor', borderRadius: '50%' }} />}
                            {rule.label}
                        </div>
                    ))}
                </div>
            </div>

            <div style={inputGroupStyle}>
                <label style={labelStyle}>YENİ ŞİFRE TEKRAR</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPwd ? 'text' : 'password'}
                        value={confirmPwd}
                        onChange={(e) => setConfirmPwd(e.target.value)}
                        style={{ ...inputStyle, borderColor: confirmPwd && !isMatch ? '#FF453A' : 'rgba(255,255,255,0.08)' }}
                    />
                    {isMatch && <Check size={16} color="#30D158" style={eyeBtnStyle} />}
                    {confirmPwd && !isMatch && <AlertCircle size={16} color="#FF453A" style={eyeBtnStyle} />}
                </div>
                {confirmPwd && !isMatch && <span style={{ fontSize: '11px', color: '#FF453A' }}>Şifreler eşleşmiyor.</span>}
            </div>

            <button
                disabled={strength < 3 || !isMatch}
                style={{
                    ...submitBtnStyle,
                    opacity: (strength < 3 || !isMatch) ? 0.5 : 1,
                    cursor: (strength < 3 || !isMatch) ? 'not-allowed' : 'pointer'
                }}
            >
                Şifreyi Güncelle
            </button>
        </SettingsCard>
    );
}

const inputGroupStyle = { display: 'flex', flexDirection: 'column' as const, gap: '8px' };
const labelStyle = { fontSize: '11px', fontWeight: 600, color: '#636366', letterSpacing: '0.05em' };
const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#F5F0EB', fontSize: '14px', outline: 'none', transition: 'all 200ms' };
const eyeBtnStyle = { position: 'absolute' as any, right: '12px', top: '10px', background: 'none', border: 'none', color: '#636366', cursor: 'pointer' };
const meterBgStyle = { height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' };
const submitBtnStyle = { background: '#C9A96E', color: '#0F0F10', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '14px', fontWeight: 600, marginTop: '8px' };

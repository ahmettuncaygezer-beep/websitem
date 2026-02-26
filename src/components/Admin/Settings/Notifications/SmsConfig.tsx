'use client';

import React from 'react';
import { SettingsCard } from '../SettingsCard';
import { Smartphone, Info } from 'lucide-react';

import { NotificationSettings } from '@/types/settings';

interface SmsConfigProps {
    config: NotificationSettings['sms'];
    onChange: (updates: Partial<NotificationSettings['sms']>) => void;
}

export function SmsConfig({ config, onChange }: SmsConfigProps) {
    return (
        <SettingsCard
            title="SMS Bildirimleri"
            description="Müşterilere ve adminlere SMS yoluyla bildirim gönderin."
            headerAction={
                <button
                    onClick={() => onChange({ enabled: !config.enabled })}
                    style={{
                        width: '40px', height: '20px', background: config.enabled ? '#C9A96E' : '#333',
                        borderRadius: '10px', border: 'none', position: 'relative', cursor: 'pointer'
                    }}
                >
                    <div style={{
                        width: '16px', height: '16px', background: '#F5F0EB',
                        borderRadius: '50%', position: 'absolute', top: '2px',
                        left: config.enabled ? '22px' : '2px', transition: 'left 200ms'
                    }} />
                </button>
            }
        >
            <div style={{ opacity: config.enabled ? 1 : 0.4, pointerEvents: config.enabled ? 'auto' : 'none' }}>
                <div style={formGridStyle}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>SMS SAĞLAYICISI</label>
                        <select
                            value={config.provider}
                            onChange={(e) => onChange({ provider: e.target.value as any })}
                            style={inputStyle}
                        >
                            <option value="netgsm">Netgsm</option>
                            <option value="iletimerkezi">İleti Merkezi</option>
                            <option value="twilio">Twilio</option>
                        </select>
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>BAŞLIK (SENDER ID)</label>
                        <input
                            type="text" value={config.senderName}
                            onChange={(e) => onChange({ senderName: e.target.value })}
                            maxLength={11}
                            style={inputStyle}
                        />
                        <span style={hintStyle}>Görünen isim (Maks. 11 karakter)</span>
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>KULLANICI ADI</label>
                        <input
                            type="text" value={config.username}
                            onChange={(e) => onChange({ username: e.target.value })}
                            style={inputStyle}
                        />
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>ŞİFRE</label>
                        <input
                            type="password" value={config.password}
                            onChange={(e) => onChange({ password: e.target.value })}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={infoBoxStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <Smartphone size={16} /> <span>Kalan Kredi: 1.247 SMS</span>
                        </div>
                        <button style={testBtnStyle}>Test SMS Gönder</button>
                    </div>
                </div>
            </div>
        </SettingsCard>
    );
}

const formGridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column' as const, gap: '8px' };
const labelStyle = { fontSize: '11px', fontWeight: 600, color: '#636366', letterSpacing: '0.05em' };
const inputStyle = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px', padding: '10px 14px', color: '#F5F0EB', fontSize: '14px', outline: 'none'
};
const hintStyle = { fontSize: '11px', color: '#636366' };
const infoBoxStyle = {
    marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', fontSize: '13px', color: '#AEAEB2'
};
const testBtnStyle = {
    background: 'none', border: '1px solid #C9A96E', color: '#C9A96E',
    padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer'
};

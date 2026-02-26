'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, ExternalLink, ShieldCheck } from 'lucide-react';
import { SettingsCard } from '../SettingsCard';
import { PaymentSettings } from '@/types/settings';

interface IyzicoConfigProps {
    config: PaymentSettings['iyzico'];
    onChange: (updates: Partial<PaymentSettings['iyzico']>) => void;
}

export function IyzicoConfig({ config, onChange }: IyzicoConfigProps) {
    const [showKeys, setShowKeys] = useState(false);

    return (
        <SettingsCard
            title="iyzico Entegrasyonu"
            description="iyzico ile kredi kartı ve ATM kartı ödemelerini saniyeler içinde kabul edin."
            headerAction={
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '11px', color: config.enabled ? '#30D158' : '#636366', fontWeight: 600 }}>
                        {config.enabled ? '● AKTİF' : '○ PASİF'}
                    </span>
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
                </div>
            }
        >
            <div style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '24px' }}>
                <button
                    onClick={() => onChange({ environment: 'sandbox' })}
                    style={config.environment === 'sandbox' ? activeTabStyle : inactiveTabStyle}
                >🧪 Sandbox (Test)</button>
                <button
                    onClick={() => onChange({ environment: 'production' })}
                    style={config.environment === 'production' ? activeTabStyle : inactiveTabStyle}
                >🚀 Production (Canlı)</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '20px', opacity: config.enabled ? 1 : 0.5, pointerEvents: config.enabled ? 'auto' : 'none' }}>
                {config.environment === 'sandbox' && (
                    <div style={alertContentStyle}>
                        <ShieldCheck size={16} /> iyzico Sandbox modu aktif. Gerçek para çekilmez.
                    </div>
                )}

                <div style={inputGroupStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label style={labelStyle}>API KEY</label>
                        <button onClick={() => setShowKeys(!showKeys)} style={toggleKeyBtnStyle}>
                            {showKeys ? <EyeOff size={14} /> : <Eye size={14} />} {showKeys ? 'Gizle' : 'Göster'}
                        </button>
                    </div>
                    <input
                        type={showKeys ? 'text' : 'password'}
                        value={config.environment === 'sandbox' ? config.sandboxApiKey : config.liveApiKey}
                        onChange={(e) => onChange(config.environment === 'sandbox' ? { sandboxApiKey: e.target.value } : { liveApiKey: e.target.value })}
                        style={inputStyle}
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>SECRET KEY</label>
                    <input
                        type={showKeys ? 'text' : 'password'}
                        value={config.environment === 'sandbox' ? config.sandboxSecretKey : config.liveSecretKey}
                        onChange={(e) => onChange(config.environment === 'sandbox' ? { sandboxSecretKey: e.target.value } : { liveSecretKey: e.target.value })}
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a href="#" style={{ fontSize: '12px', color: '#C9A96E', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        iyzico panelinden API bilgilerini al <ExternalLink size={12} />
                    </a>
                    <button style={testBtnStyle}>Bağlantıyı Test Et</button>
                </div>
            </div>
        </SettingsCard>
    );
}

const activeTabStyle = {
    background: 'none', border: 'none', color: '#C9A96E', fontSize: '13px',
    fontWeight: 600, padding: '8px 0', borderBottom: '2px solid #C9A96E', cursor: 'pointer'
};
const inactiveTabStyle = {
    background: 'none', border: 'none', color: '#636366', fontSize: '13px',
    fontWeight: 500, padding: '8px 0', cursor: 'pointer'
};
const inputGroupStyle = { display: 'flex', flexDirection: 'column' as const, gap: '8px' };
const labelStyle = { fontSize: '11px', fontWeight: 600, color: '#636366', letterSpacing: '0.05em' };
const inputStyle = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px', padding: '10px 14px', color: '#F5F0EB', fontSize: '14px', outline: 'none',
    fontFamily: 'JetBrains Mono, monospace'
};
const toggleKeyBtnStyle = {
    background: 'none', border: 'none', color: '#636366', fontSize: '11px',
    display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer'
};
const alertContentStyle = {
    padding: '12px', background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)',
    borderRadius: '6px', fontSize: '12px', color: '#C9A96E', display: 'flex', gap: '8px', alignItems: 'center'
};
const testBtnStyle = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '6px 12px', color: '#F5F0EB', fontSize: '12px', cursor: 'pointer'
};

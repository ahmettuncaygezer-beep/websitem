'use client';

import React from 'react';
import { SettingsCard } from '../SettingsCard';
import { PaymentSettings } from '@/types/settings';

interface CashOnDeliveryProps {
    config: PaymentSettings['cashOnDelivery'];
    onChange: (updates: Partial<PaymentSettings['cashOnDelivery']>) => void;
}

export function CashOnDelivery({ config, onChange }: CashOnDeliveryProps) {
    return (
        <SettingsCard
            title="Kapıda Ödeme"
            description="Müşterilerinizin siparişlerini teslimat anında nakit veya kartla ödemesine izin verin."
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', opacity: config.enabled ? 1 : 0.5 }}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>EKSTRA KOMİSYON / ÜCRET</label>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#636366' }}>₺</span>
                        <input
                            type="number" value={config.extraFee}
                            onChange={(e) => onChange({ extraFee: Number(e.target.value) })}
                            style={{ ...inputStyle, paddingLeft: '28px' }}
                        />
                    </div>
                    <span style={hintStyle}>Kapıda ödeme hizmet bedeli.</span>
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>MİNYİMUM SİPARİŞ TUTARI</label>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#636366' }}>₺</span>
                        <input
                            type="number" value={config.minOrderAmount}
                            onChange={(e) => onChange({ minOrderAmount: Number(e.target.value) })}
                            style={{ ...inputStyle, paddingLeft: '28px' }}
                        />
                    </div>
                </div>

                <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }}>
                    <label style={labelStyle}>İZİN VERİLEN ŞEHİRLER</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {config.allowedCities.map((city: string) => (
                            <span key={city} style={ipChipStyle}>
                                {city} <button style={{ background: 'none', border: 'none', color: '#636366', cursor: 'pointer' }}>×</button>
                            </span>
                        ))}
                        <button style={{ ...ipChipStyle, border: '1px dashed rgba(255,255,255,0.1)', color: '#AEAEB2' }}>+ Şehir Ekle</button>
                    </div>
                </div>
            </div>
        </SettingsCard>
    );
}

const inputGroupStyle = { display: 'flex', flexDirection: 'column' as const, gap: '8px' };
const labelStyle = { fontSize: '11px', fontWeight: 600, color: '#636366', letterSpacing: '0.05em' };
const inputStyle = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px', padding: '10px 14px', color: '#F5F0EB', fontSize: '14px', outline: 'none', width: '100%'
};
const hintStyle = { fontSize: '11px', color: '#636366' };
const ipChipStyle = {
    background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px',
    fontSize: '12px', color: '#AEAEB2', display: 'flex', alignItems: 'center', gap: '6px'
};

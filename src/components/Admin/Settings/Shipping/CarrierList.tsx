'use client';

import React from 'react';
import { Truck, ExternalLink, Cog } from 'lucide-react';
import { SettingsCard } from '../SettingsCard';
import { ShippingCarrier } from '@/types/settings';

interface CarrierListProps {
    carriers: ShippingCarrier[];
    onChange: (updates: ShippingCarrier[]) => void;
}

export function CarrierList({ carriers, onChange }: CarrierListProps) {
    const toggleCarrier = (id: string, enabled: boolean) => {
        onChange(carriers.map(c => c.id === id ? { ...c, enabled } : c));
    };

    const updateApi = (id: string, key: string, val: string) => {
        onChange(carriers.map(c => c.id === id ? { ...c, apiConfig: { ...c.apiConfig, [key]: val } } : c));
    };

    return (
        <div style={gridStyle}>
            {carriers.map(carrier => (
                <SettingsCard
                    key={carrier.id}
                    title={carrier.name}
                    description={`${carrier.name} API & entegrasyon ayarları.`}
                    headerAction={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '10px', color: carrier.enabled ? '#30D158' : '#636366' }}>{carrier.enabled ? 'AKTİF' : 'PASİF'}</span>
                            <button
                                onClick={() => toggleCarrier(carrier.id, !carrier.enabled)}
                                style={{
                                    width: '36px', height: '18px', background: carrier.enabled ? '#C9A96E' : '#333',
                                    borderRadius: '9px', border: 'none', position: 'relative', cursor: 'pointer'
                                }}
                            >
                                <div style={{
                                    width: '14px', height: '14px', background: '#F5F0EB',
                                    borderRadius: '50%', position: 'absolute', top: '2px',
                                    left: carrier.enabled ? '20px' : '2px', transition: 'left 200ms'
                                }} />
                            </button>
                        </div>
                    }
                >
                    <div style={{ opacity: carrier.enabled ? 1 : 0.4, pointerEvents: carrier.enabled ? 'auto' : 'none' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {Object.keys(carrier.apiConfig).map(key => (
                                <div key={key} style={inputGroupStyle}>
                                    <label style={labelStyle}>{key.toUpperCase().replace(/([A-Z])/g, ' $1')}</label>
                                    <input
                                        type={key.toLowerCase().includes('password') || key.toLowerCase().includes('key') ? 'password' : 'text'}
                                        value={carrier.apiConfig[key]}
                                        onChange={(e) => updateApi(carrier.id, key, e.target.value)}
                                        style={inputStyle}
                                    />
                                </div>
                            ))}

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                <button style={secondaryBtnStyle}><Cog size={14} /> Gelişmiş Ayarlar</button>
                                <button style={testBtnStyle}>Bağlantıyı Test Et</button>
                            </div>
                        </div>
                    </div>
                </SettingsCard>
            ))}
        </div>
    );
}

const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column' as const, gap: '6px' };
const labelStyle = { fontSize: '10px', fontWeight: 600, color: '#636366', letterSpacing: '0.05em' };
const inputStyle = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '8px 12px', color: '#F5F0EB', fontSize: '13px', outline: 'none'
};
const secondaryBtStyle = { background: 'none', border: 'none', color: '#AEAEB2', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' };
const testBtnStyle = {
    background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)',
    borderRadius: '4px', padding: '4px 8px', color: '#C9A96E', fontSize: '11px', fontWeight: 600, cursor: 'pointer'
};
const secondaryBtnStyle = { ...secondaryBtStyle };

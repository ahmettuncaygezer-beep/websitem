'use client';

import React from 'react';
import { Plus, Trash2, Info } from 'lucide-react';
import { SettingsCard } from '../SettingsCard';
import { WeightRule, ShippingSettings } from '@/types/settings';

interface ShippingRulesProps {
    threshold: number;
    enabled: boolean;
    rules: WeightRule[];
    onChange: (updates: Partial<ShippingSettings>) => void;
}

export function ShippingRules({ threshold, enabled, rules, onChange }: ShippingRulesProps) {
    const addRule = () => {
        const newRule: WeightRule = {
            id: Math.random().toString(36).substr(2, 9),
            fromWeight: 0,
            toWeight: 0,
            price: 0
        };
        onChange({ weightRules: [...rules, newRule] });
    };

    const removeRule = (id: string) => {
        onChange({ weightRules: rules.filter(r => r.id !== id) });
    };

    const updateRule = (id: string, updates: Partial<WeightRule>) => {
        onChange({
            weightRules: rules.map(r => r.id === id ? { ...r, ...updates } : r)
        });
    };

    return (
        <SettingsCard
            title="Kargo Ücret Kuralları"
            description="Ücretsiz kargo eşiği ve ağırlık bazlı fiyatlandırma kuralları."
        >
            <div style={thresholdRowStyle}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB' }}>Ücretsiz Kargo Eşiği</div>
                    <div style={{ fontSize: '12px', color: '#636366', marginTop: '4px' }}>Belirlenen tutarın üzerindeki siparişlerde kargo ücretsiz olur.</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ position: 'relative', width: '120px' }}>
                        <span style={{ position: 'absolute', left: '10px', top: '8px', color: '#636366', fontSize: '13px' }}>₺</span>
                        <input
                            type="number" value={threshold}
                            onChange={(e) => onChange({ freeShippingThreshold: Number(e.target.value) })}
                            style={thresholdInputStyle}
                        />
                    </div>
                    <button
                        onClick={() => onChange({ freeShippingEnabled: !enabled })}
                        style={{
                            width: '36px', height: '18px', background: enabled ? '#30D158' : '#333',
                            borderRadius: '9px', border: 'none', position: 'relative', cursor: 'pointer'
                        }}
                    >
                        <div style={{
                            width: '14px', height: '14px', background: '#F5F0EB',
                            borderRadius: '50%', position: 'absolute', top: '2px',
                            left: enabled ? '20px' : '2px', transition: 'left 200ms'
                        }} />
                    </button>
                </div>
            </div>

            <div style={{ marginTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={labelStyle}>AĞIRLIK BAZLI ÜCRETLER</label>
                </div>

                <div style={rulesGridHeaderStyle}>
                    <div>Ağırlık Aralığı (kg)</div>
                    <div>Ücret (₺)</div>
                    <div />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {rules.sort((a, b) => a.fromWeight - b.fromWeight).map(rule => (
                        <div key={rule.id} style={ruleRowStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                <input
                                    type="number" value={rule.fromWeight}
                                    onChange={(e) => updateRule(rule.id, { fromWeight: Number(e.target.value) })}
                                    style={ruleInputStyle}
                                />
                                <span style={{ color: '#636366' }}>-</span>
                                <input
                                    type="number" value={rule.toWeight}
                                    onChange={(e) => updateRule(rule.id, { toWeight: Number(e.target.value) })}
                                    style={ruleInputStyle}
                                />
                            </div>
                            <div style={{ width: '100px', position: 'relative' }}>
                                <input
                                    type="number" value={rule.price}
                                    onChange={(e) => updateRule(rule.id, { price: Number(e.target.value) })}
                                    style={{ ...ruleInputStyle, width: '100%', paddingLeft: '20px' }}
                                />
                                <span style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#636366', fontSize: '12px' }}>₺</span>
                            </div>
                            <button
                                onClick={() => removeRule(rule.id)}
                                style={removeBtnStyle}
                            ><Trash2 size={14} /></button>
                        </div>
                    ))}
                </div>

                <button onClick={addRule} style={addRuleBtnStyle}>
                    <Plus size={14} /> Yeni Aralık Ekle
                </button>
            </div>

            <div style={infoBoxStyle}>
                <Info size={16} /> 1 desi = 5000 cm³ olarak hesaplanır. Fiziksel ağırlık ve desi arasından büyük olan esas alınır.
            </div>
        </SettingsCard>
    );
}

const thresholdRowStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px',
    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px'
};
const thresholdInputStyle = {
    width: '100%', background: '#141416', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '6px 12px 6px 24px', color: '#C9A96E', fontSize: '13px', fontWeight: 600, outline: 'none'
};
const labelStyle = { fontSize: '11px', fontWeight: 600, color: '#636366', letterSpacing: '0.05em' };
const rulesGridHeaderStyle = {
    display: 'grid', gridTemplateColumns: '1fr 100px 32px', gap: '12px', padding: '0 8px 8px',
    fontSize: '11px', color: '#636366', fontWeight: 600
};
const ruleRowStyle = {
    display: 'flex', gap: '12px', alignItems: 'center', padding: '8px',
    background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '6px'
};
const ruleInputStyle = {
    width: '70px', background: '#0F0F10', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '4px', padding: '6px 8px', color: '#F5F0EB', fontSize: '12px', outline: 'none'
};
const removeBtnStyle = { background: 'none', border: 'none', color: '#636366', cursor: 'pointer', padding: '4px' };
const addRuleBtnStyle = {
    marginTop: '12px', background: 'none', border: '1px dashed rgba(255,255,255,0.1)',
    color: '#AEAEB2', padding: '8px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer',
    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
};
const infoBoxStyle = {
    marginTop: '24px', padding: '12px', background: 'rgba(10,132,255,0.05)',
    border: '1px solid rgba(10,132,255,0.1)', borderRadius: '6px',
    fontSize: '12px', color: '#0A84FF', display: 'flex', gap: '8px', alignItems: 'center'
};

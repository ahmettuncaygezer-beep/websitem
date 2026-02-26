'use client';

import React from 'react';
import { SettingsCard } from '../SettingsCard';
import { PaymentSettings } from '@/types/settings';

interface InstallmentConfigProps {
    config: PaymentSettings['installments'];
    onChange: (updates: Partial<PaymentSettings['installments']>) => void;
}

export function InstallmentConfig({ config, onChange }: InstallmentConfigProps) {
    const bankList = [
        { name: 'Garanti Profit', logo: '🏦' },
        { name: 'İş Bankası Maximum', logo: '🏛️' },
        { name: 'Yapı Kredi World', logo: '💳' },
        { name: 'Akbank Axess', logo: '💎' }
    ];

    const installmentOptions = [2, 3, 6, 9, 12];

    const toggleInstallment = (bank: string, month: number) => {
        const currentMonths = config.banks[bank] || [];
        const newMonths = currentMonths.includes(month)
            ? currentMonths.filter((m: number) => m !== month)
            : [...currentMonths, month].sort((a, b) => a - b);

        onChange({
            banks: { ...config.banks, [bank]: newMonths }
        });
    };

    return (
        <SettingsCard
            title="Taksit Seçenekleri"
            description="Kredi kartı taksit limitlerini ve izin verilen seçenekleri belirleyin."
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', opacity: config.enabled ? 1 : 0.5 }}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>MİNİMUM TAKSİT TUTARI</label>
                    <div style={{ position: 'relative', maxWidth: '200px' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#636366' }}>₺</span>
                        <input
                            type="number" value={config.minAmount}
                            onChange={(e) => onChange({ minAmount: Number(e.target.value) })}
                            style={{ ...inputStyle, paddingLeft: '28px' }}
                        />
                    </div>
                    <span style={hintStyle}>Bu tutarın altındaki siparişlerde taksit sunulmaz.</span>
                </div>

                <div style={tableWrapperStyle}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Banka</th>
                                {installmentOptions.map(m => <th key={m} style={thCenterStyle}>{m}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {bankList.map(bank => (
                                <tr key={bank.name} style={trStyle}>
                                    <td style={tdStyle}>
                                        <span style={{ marginRight: '8px' }}>{bank.logo}</span> {bank.name}
                                    </td>
                                    {installmentOptions.map(m => (
                                        <td key={m} style={tdCenterStyle}>
                                            <input
                                                type="checkbox"
                                                checked={config.banks[bank.name]?.includes(m)}
                                                onChange={() => toggleInstallment(bank.name, m)}
                                                disabled={!config.enabled}
                                                style={checkboxStyle}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </SettingsCard>
    );
}

const inputGroupStyle = { display: 'flex', flexDirection: 'column' as const, gap: '8px' };
const labelStyle = { fontSize: '11px', fontWeight: 600, color: '#636366', letterSpacing: '0.05em' };
const inputStyle = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px', padding: '10px 14px', color: '#F5F0EB', fontSize: '14px', outline: 'none'
};
const hintStyle = { fontSize: '11px', color: '#636366' };
const tableWrapperStyle = { border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' as any };
const thStyle = { background: 'rgba(255,255,255,0.02)', padding: '12px', textAlign: 'left' as any, fontSize: '12px', color: '#636366', borderBottom: '1px solid rgba(255,255,255,0.06)' };
const thCenterStyle = { ...thStyle, textAlign: 'center' as any };
const trStyle = { borderBottom: '1px solid rgba(255,255,255,0.04)' };
const tdStyle = { padding: '12px', fontSize: '13px', color: '#F5F0EB' };
const tdCenterStyle = { ...tdStyle, textAlign: 'center' as any };
const checkboxStyle = { width: '16px', height: '16px', accentColor: '#C9A96E', cursor: 'pointer' };

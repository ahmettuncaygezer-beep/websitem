'use client';

import React from 'react';
import { Plus, Trash2, Landmark } from 'lucide-react';
import { SettingsCard } from '../SettingsCard';
import { PaymentSettings, BankAccount } from '@/types/settings';

interface BankTransferProps {
    config: PaymentSettings['bankTransfer'];
    onChange: (updates: Partial<PaymentSettings['bankTransfer']>) => void;
}

export function BankTransfer({ config, onChange }: BankTransferProps) {
    const addAccount = () => {
        const newAccount: BankAccount = {
            id: Math.random().toString(36).substr(2, 9),
            bankName: '',
            accountHolder: '',
            iban: ''
        };
        onChange({ accounts: [...config.accounts, newAccount] });
    };

    const removeAccount = (id: string) => {
        onChange({ accounts: config.accounts.filter((a: BankAccount) => a.id !== id) });
    };

    const updateAccount = (id: string, updates: Partial<BankAccount>) => {
        onChange({
            accounts: config.accounts.map((a: BankAccount) => a.id === id ? { ...a, ...updates } : a)
        });
    };

    return (
        <SettingsCard
            title="Banka Havalesi / EFT"
            description="Doğrudan banka hesabınıza ödeme alın. Siparişler havale onayı sonrası işleme alınır."
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
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px', opacity: config.enabled ? 1 : 0.5 }}>
                {config.accounts.map((account: BankAccount) => (
                    <div key={account.id} style={accountRowStyle}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', flex: 1 }}>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>BANKA ADI</label>
                                <input
                                    type="text" value={account.bankName}
                                    onChange={(e) => updateAccount(account.id, { bankName: e.target.value })}
                                    placeholder="Ziraat Bankası, Garanti..."
                                    style={inputStyle}
                                />
                            </div>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>HESAP SAHİBİ</label>
                                <input
                                    type="text" value={account.accountHolder}
                                    onChange={(e) => updateAccount(account.id, { accountHolder: e.target.value })}
                                    placeholder="Şirket ünvanı..."
                                    style={inputStyle}
                                />
                            </div>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>IBAN</label>
                                <input
                                    type="text" value={account.iban}
                                    onChange={(e) => updateAccount(account.id, { iban: e.target.value })}
                                    placeholder="TR 00 0000 0000..."
                                    style={{ ...inputStyle, fontFamily: 'JetBrains Mono, monospace' }}
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => removeAccount(account.id)}
                            style={removeBtnStyle}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}

                <button
                    onClick={addAccount}
                    disabled={!config.enabled}
                    style={addAccountBtnStyle}
                >
                    <Plus size={16} /> Banka Hesabı Ekle
                </button>

                <div style={{ ...inputGroupStyle, marginTop: '8px' }}>
                    <label style={labelStyle}>ÖDEME SONRASI MESAJI</label>
                    <textarea
                        value={config.customerMessage}
                        onChange={(e) => onChange({ customerMessage: e.target.value })}
                        placeholder="Müşteriye ödeme sonrası gösterilecek talimatlar..."
                        style={{ ...inputStyle, height: '60px', resize: 'none' }}
                    />
                </div>
            </div>
        </SettingsCard>
    );
}

const accountRowStyle = {
    display: 'flex', gap: '12px', alignItems: 'flex-end', padding: '16px',
    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '8px'
};
const inputGroupStyle = { display: 'flex', flexDirection: 'column' as const, gap: '6px' };
const labelStyle = { fontSize: '10px', fontWeight: 600, color: '#636366', letterSpacing: '0.05em' };
const inputStyle = {
    background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '8px 12px', color: '#F5F0EB', fontSize: '13px', outline: 'none'
};
const removeBtnStyle = {
    background: 'none', border: 'none', color: '#636366', cursor: 'pointer',
    padding: '8px', borderRadius: '6px', transition: 'color 200ms', height: '36px'
};
const addAccountBtnStyle = {
    background: 'rgba(201,169,110,0.05)', border: '1px dashed rgba(201,169,110,0.2)',
    color: '#C9A96E', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
};

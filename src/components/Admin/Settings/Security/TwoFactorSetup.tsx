'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Smartphone, Check, ArrowRight, Copy, Download } from 'lucide-react';
import { SettingsCard } from '../SettingsCard';

export function TwoFactorSetup() {
    const [step, setStep] = useState(1);
    const [isEnabled, setIsEnabled] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [savedCodes, setSavedCodes] = useState(false);

    const handleOtpInput = (index: number, val: string) => {
        if (val.length > 1) val = val[0];
        const newOtp = [...otp];
        newOtp[index] = val;
        setOtp(newOtp);

        if (val && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    return (
        <SettingsCard
            title="İki Faktörlü Doğrulama (2FA)"
            description="Hesabınızı ekstra bir güvenlik katmanıyla koruyun."
        >
            {!isEnabled && step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px 0' }}>
                    <div style={shieldIconStyle}><ShieldCheck size={32} /></div>
                    <h4 style={{ fontSize: '16px', color: '#F5F0EB', margin: '16px 0 8px' }}>Hesap Güvenliğini Artırın</h4>
                    <p style={{ fontSize: '13px', color: '#636366', maxWidth: '300px', margin: '0 0 24px' }}>
                        2FA aktif edildiğinde giriş yapmak için telefonunuzdaki kod gerekir.
                    </p>
                    <button onClick={() => setStep(2)} style={primaryBtnStyle}>2FA Kurulumunu Başlat</button>
                </div>
            )}

            {!isEnabled && step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div style={{ display: 'flex', gap: '32px' }}>
                        <div style={qrBoxStyle}>
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=MaisonOTP" alt="QR" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#F5F0EB' }}>1. Adım: QR Kodu Okutun</div>
                            <p style={{ fontSize: '12px', color: '#636366', marginTop: '8px' }}>
                                Google Authenticator veya Authy uygulamasını açın ve bu kodu telefonunuza ekleyin.
                            </p>
                            <div style={{ marginTop: '16px' }}>
                                <div style={{ fontSize: '11px', color: '#636366' }}>MANUEL KOD:</div>
                                <div style={manualCodeStyle}>JBSW Y3DP EHPK 3PXP <Copy size={12} cursor="pointer" /></div>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setStep(3)} style={{ ...primaryBtnStyle, marginTop: '24px', width: '100%' }}>Sonraki Adım <ArrowRight size={16} /></button>
                </motion.div>
            )}

            {!isEnabled && step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#F5F0EB', marginBottom: '24px' }}>2. Adım: Doğrulama Kodunu Girin</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                        {otp.map((digit, i) => (
                            <input
                                key={i} id={`otp-${i}`}
                                type="text" value={digit}
                                onChange={(e) => handleOtpInput(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                style={otpInputStyle}
                            />
                        ))}
                    </div>
                    <button
                        disabled={otp.some(d => !d)}
                        onClick={() => setStep(4)}
                        style={{ ...primaryBtnStyle, marginTop: '32px', width: '100%', opacity: otp.some(d => !d) ? 0.5 : 1 }}
                    >Doğrula ve Etkinleştir</button>
                </motion.div>
            )}

            {!isEnabled && step === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#F5F0EB', marginBottom: '16px' }}>3. Adım: Yedek Kodlarınızı Kaydedin</div>
                    <div style={backupCodesGrid}>
                        {['1234-5678', '8765-4321', '0000-1111', '2222-3333'].map(c => <div key={c} style={backupChip}>{c}</div>)}
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                        <button style={secondaryBtnStyle}><Copy size={14} /> Kopyala</button>
                        <button style={secondaryBtnStyle}><Download size={14} /> İndir (TXT)</button>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={savedCodes} onChange={(e) => setSavedCodes(e.target.checked)} style={{ accentColor: '#C9A96E' }} />
                        <span style={{ fontSize: '12px', color: '#AEAEB2' }}>Yedek kodlarımı güvenli bir yere kaydettim.</span>
                    </label>
                    <button
                        disabled={!savedCodes}
                        onClick={() => { setIsEnabled(true); setStep(1); }}
                        style={{ ...primaryBtnStyle, marginTop: '24px', width: '100%', opacity: !savedCodes ? 0.5 : 1 }}
                    >Kurulumu Tamamla</button>
                </motion.div>
            )}

            {isEnabled && (
                <div style={activeStatusStyle}>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#30D158', fontWeight: 600 }}>
                            <Check size={18} /> 2FA Etkinleştirildi
                        </div>
                        <div style={{ fontSize: '12px', color: '#636366', marginTop: '4px' }}>
                            Hesabınız şu an maksimum düzeyde korunuyor.
                        </div>
                    </div>
                    <button onClick={() => setIsEnabled(false)} style={disableBtnStyle}>Devre Dışı Bırak</button>
                </div>
            )}
        </SettingsCard>
    );
}

const shieldIconStyle = {
    width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(201,169,110,0.1)',
    color: '#C9A96E', display: 'flex', alignItems: 'center', justifyContent: 'center'
};
const primaryBtnStyle = {
    background: '#C9A96E', color: '#0F0F10', border: 'none', borderRadius: '8px',
    padding: '12px 24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
};
const qrBoxStyle = { background: '#FFF', padding: '16px', borderRadius: '12px', width: 'fit-content' };
const manualCodeStyle = {
    fontSize: '13px', color: '#C9A96E', background: 'rgba(201,169,110,0.05)',
    padding: '10px', borderRadius: '8px', fontFamily: 'JetBrains Mono, monospace',
    marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
};
const otpInputStyle = {
    width: '48px', height: '56px', background: '#242426', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px', color: '#F5F0EB', fontSize: '20px', fontWeight: 700,
    textAlign: 'center' as any, outline: 'none'
};
const backupCodesGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' };
const backupChip = {
    padding: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '6px', textAlign: 'center' as any, fontFamily: 'JetBrains Mono, monospace', color: '#AEAEB2'
};
const secondaryBtnStyle = { flex: 1, padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#AEAEB2', fontSize: '13px', display: 'flex', justifyContent: 'center', gap: '8px', cursor: 'pointer' };
const activeStatusStyle = { display: 'flex', alignItems: 'center', padding: '20px', background: 'rgba(48,209,88,0.05)', border: '1px solid rgba(48,209,88,0.1)', borderRadius: '12px' };
const disableBtnStyle = { background: 'none', border: '1px solid rgba(255,69,58,0.4)', color: '#FF453A', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' };

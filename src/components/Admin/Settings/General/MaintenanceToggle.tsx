'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, Clock, CheckCircle2 } from 'lucide-react';
import { SettingsCard } from '../SettingsCard';
import { GeneralSettings } from '@/types/settings';

interface MaintenanceToggleProps {
    maintenanceMode: GeneralSettings['maintenanceMode'];
    onChange: (updates: Partial<GeneralSettings['maintenanceMode']>) => void;
}

export function MaintenanceToggle({ maintenanceMode, onChange }: MaintenanceToggleProps) {
    const [showConfirm, setShowConfirm] = useState(false);

    const toggleMode = () => {
        if (!maintenanceMode.enabled) {
            setShowConfirm(true);
        } else {
            onChange({ enabled: false });
        }
    };

    return (
        <SettingsCard
            title="Bakım Modu"
            variant={maintenanceMode.enabled ? 'danger' : 'default'}
            headerAction={
                <button
                    onClick={toggleMode}
                    style={{
                        width: '44px', height: '24px', background: maintenanceMode.enabled ? '#FF453A' : '#333',
                        borderRadius: '12px', border: 'none', position: 'relative', cursor: 'pointer',
                        transition: 'background 200ms'
                    }}
                >
                    <motion.div
                        animate={{ x: maintenanceMode.enabled ? 22 : 2 }}
                        style={{
                            width: '20px', height: '20px', background: '#F5F0EB',
                            borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                    />
                </button>
            }
        >
            <AnimatePresence mode="wait">
                {maintenanceMode.enabled ? (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                            padding: '16px', background: 'rgba(255,69,58,0.1)',
                            border: '1px solid rgba(255,69,58,0.2)', borderRadius: '8px'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <AlertTriangle color="#FF453A" size={20} />
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: '#FF453A' }}>Bakım Modu Yayında</div>
                                <div style={{ fontSize: '13px', color: 'rgba(255,69,58,0.8)', marginTop: '4px' }}>
                                    Ziyaretçiler şu an mağazanıza erişemez. Sadece aşağıdaki IP adresleri siteye giriş yapabilir.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div style={{
                        padding: '16px', background: 'rgba(48,209,88,0.1)',
                        border: '1px solid rgba(48,209,88,0.2)', borderRadius: '8px',
                        display: 'flex', gap: '12px', alignItems: 'center'
                    }}>
                        <CheckCircle2 color="#30D158" size={20} />
                        <div style={{ fontSize: '13px', color: '#30D158' }}>Mağazanız aktif ve ziyaretçilere açıktır.</div>
                    </div>
                )}
            </AnimatePresence>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px', marginTop: '8px' }}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>BAKIM SAYFASI MESAJI</label>
                    <textarea
                        value={maintenanceMode.message}
                        onChange={(e) => onChange({ message: e.target.value })}
                        placeholder="Müşterilere gösterilecek bilgilendirme metni..."
                        style={{ ...inputStyle, height: '60px', resize: 'none' }}
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>İZİN VERİLEN IP ADRESLERİ</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {maintenanceMode.allowedIps.map(ip => (
                            <span key={ip} style={ipChipStyle}>
                                {ip} <button style={{ background: 'none', border: 'none', color: '#636366', cursor: 'pointer' }}>×</button>
                            </span>
                        ))}
                        <button style={{ ...ipChipStyle, border: '1px dashed rgba(255,255,255,0.1)', color: '#AEAEB2' }}>+ IP Ekle</button>
                    </div>
                    <span style={hintStyle}>Geliştirici ekibinin erişimi için kendi IP'nizi eklediğinizden emin olun.</span>
                </div>
            </div>

            {/* Confirm Modal */}
            {showConfirm && (
                <div style={modalOverlayStyle}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={modalContentStyle}
                    >
                        <AlertTriangle size={48} color="#FFD60A" style={{ marginBottom: '16px' }} />
                        <h4 style={{ fontSize: '18px', color: '#F5F0EB', margin: '0 0 12px' }}>Bakım Moduna Geçilsin mi?</h4>
                        <p style={{ fontSize: '14px', color: '#AEAEB2', textAlign: 'center', margin: '0 0 24px' }}>
                            Siteyi kapattığınızda tüm aktif müşteri oturumları sonlanacak ve alışveriş durdurulacaktır.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                            <button onClick={() => setShowConfirm(false)} style={cancelBtnStyle}>Vazgeç</button>
                            <button onClick={() => { onChange({ enabled: true }); setShowConfirm(false); }} style={confirmBtnStyle}>Evet, Siteyi Kapat</button>
                        </div>
                    </motion.div>
                </div>
            )}
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
const ipChipStyle = {
    background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px',
    fontSize: '12px', color: '#AEAEB2', display: 'flex', alignItems: 'center', gap: '6px'
};
const modalOverlayStyle = { position: 'fixed' as any, inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' };
const modalContentStyle = { background: '#1C1C1E', padding: '32px', borderRadius: '16px', maxWidth: '400px', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', border: '1px solid rgba(255,255,255,0.1)' };
const cancelBtnStyle = { flex: 1, padding: '12px', borderRadius: '8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#F5F0EB', fontWeight: 600, cursor: 'pointer' };
const confirmBtnStyle = { flex: 1, padding: '12px', borderRadius: '8px', background: '#FF453A', border: 'none', color: '#F5F0EB', fontWeight: 600, cursor: 'pointer' };

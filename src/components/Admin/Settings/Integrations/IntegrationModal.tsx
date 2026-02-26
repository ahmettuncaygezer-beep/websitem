'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

interface IntegrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    integration: any;
}

export function IntegrationModal({ isOpen, onClose, integration }: IntegrationModalProps) {
    if (!integration) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={overlayStyle}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        style={modalStyle}
                    >
                        <div style={headerStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={logoWrapperStyle}>{integration.logo}</div>
                                <div>
                                    <h3 style={{ fontSize: '18px', color: '#F5F0EB', margin: 0 }}>{integration.name} Bağlantısı</h3>
                                    <p style={{ fontSize: '12px', color: '#636366', marginTop: '2px', margin: 0 }}>API ve yetkilendirme yapılandırması</p>
                                </div>
                            </div>
                            <button onClick={onClose} style={closeBtnStyle}><X size={20} /></button>
                        </div>

                        <div style={contentStyle}>
                            <div style={infoBannerStyle}>
                                <ShieldCheck size={16} /> API bilgileriniz AES-256 ile şifrelenerek güvenle saklanır.
                            </div>

                            <div style={formGroupStyle}>
                                <label style={labelStyle}>API KEY / TOKEN</label>
                                <input type="password" placeholder="••••••••••••••••" style={inputStyle} />
                            </div>

                            {integration.name.toLowerCase().includes('mailchimp') && (
                                <div style={formGroupStyle}>
                                    <label style={labelStyle}>AUDIENCE ID (LISTE ID)</label>
                                    <input type="text" placeholder="e.g. 5a1b2c3d4e" style={inputStyle} />
                                </div>
                            )}

                            <div style={{ marginTop: '8px' }}>
                                <a href="#" style={{ fontSize: '12px', color: '#C9A96E', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {integration.name} üzerinden API anahtarı nasıl alınır? <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>

                        <div style={footerStyle}>
                            <button onClick={onClose} style={cancelBtnStyle}>Vazgeç</button>
                            <button onClick={onClose} style={saveBtnStyle}>Kaydet ve Bağlan</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

const overlayStyle = { position: 'fixed' as any, inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' };
const modalStyle = { background: '#1C1C1E', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '480px', overflow: 'hidden', boxShadow: '0 24px 48px rgba(0,0,0,0.5)' };
const headerStyle = { padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const logoWrapperStyle = { width: '48px', height: '48px', background: '#0F0F10', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: '1px solid rgba(255,255,255,0.06)' };
const closeBtnStyle = { background: 'none', border: 'none', color: '#636366', cursor: 'pointer' };
const contentStyle = { padding: '24px', display: 'flex', flexDirection: 'column' as any, gap: '20px' };
const formGroupStyle = { display: 'flex', flexDirection: 'column' as any, gap: '8px' };
const labelStyle = { fontSize: '11px', fontWeight: 600, color: '#636366', letterSpacing: '0.05em' };
const inputStyle = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px 14px', color: '#F5F0EB', fontSize: '14px', outline: 'none' };
const infoBannerStyle = { padding: '12px', background: 'rgba(48,209,88,0.05)', border: '1px solid rgba(48,209,88,0.1)', borderRadius: '8px', fontSize: '12px', color: '#30D158', display: 'flex', gap: '8px', alignItems: 'center' };
const footerStyle = { padding: '20px 24px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '12px' };
const cancelBtnStyle = { flex: 1, padding: '12px', borderRadius: '8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#AEAEB2', fontWeight: 600, cursor: 'pointer' };
const saveBtnStyle = { flex: 1, padding: '12px', borderRadius: '8px', background: '#C9A96E', border: 'none', color: '#0F0F10', fontWeight: 600, cursor: 'pointer' };

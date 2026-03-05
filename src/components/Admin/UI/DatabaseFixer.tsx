'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Copy, Check, ExternalLink, X, AlertCircle } from 'lucide-react';

interface DatabaseFixerProps {
    isOpen: boolean;
    onClose: () => void;
    sql: string;
    title?: string;
}

export function DatabaseFixer({ isOpen, onClose, sql, title = 'Veritabanı Hazırlığı Gerekli' }: DatabaseFixerProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(sql);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const supabaseUrl = 'https://hvqsjhnlpaksnejlkcpl.supabase.co/project/hvqsjhnlpaksnejlkcpl/sql/new';

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="database-fixer-modal"
                        style={{
                            width: '100%',
                            maxWidth: '700px',
                            background: '#1C1C1E',
                            border: '1px solid rgba(201,169,110,0.3)',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(201,169,110,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A96E' }}>
                                    <Database size={24} />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>{title}</h2>
                                    <p style={{ fontSize: '13px', color: '#636366', margin: '4px 0 0' }}>Supabase veritabanında eksik tablolar tespit edildi.</p>
                                </div>
                            </div>
                            <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#636366', cursor: 'pointer' }}><X size={20} /></button>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '24px' }}>
                            <div style={{ background: 'rgba(255,69,58,0.05)', border: '1px solid rgba(255,69,58,0.1)', borderRadius: '10px', padding: '16px', display: 'flex', gap: '12px', marginBottom: '24px' }}>
                                <AlertCircle size={20} color="#FF453A" style={{ flexShrink: 0 }} />
                                <div style={{ fontSize: '13px', color: '#FF453A', lineHeight: 1.5 }}>
                                    <strong>Nedir?</strong> Yönetim panelinin düzgün çalışması için bazı tabloların veritabanınızda oluşturulması gerekiyor. Güvenlik kısıtlamaları nedeniyle bu işlemi sizin manuel olarak onaylamanız gerekmektedir.
                                </div>
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    Nasıl Yapılır?
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                        { step: 1, text: 'Aşağıdaki SQL kodunu "Kopyala" butonuyla panonuza kopyalayın.' },
                                        { step: 2, text: 'Supabase SQL Editor sayfasını açın.' },
                                        { step: 3, text: 'Yeni bir sorgu (New Query) oluşturup kopyaladığınız kodu yapıştırın ve "Run" butonuna basın.' }
                                    ].map((item) => (
                                        <div key={item.step} style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#AEAEB2' }}>
                                            <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: '#C9A96E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>{item.step}</span>
                                            {item.text}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 1, display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={handleCopy}
                                        style={{
                                            background: copied ? '#30D158' : '#3A3A3C',
                                            color: 'white', border: 'none', borderRadius: '6px',
                                            padding: '8px 12px', fontSize: '12px', fontWeight: 600,
                                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                                            transition: 'all 200ms'
                                        }}
                                    >
                                        {copied ? <Check size={14} /> : <Copy size={14} />}
                                        {copied ? 'Kopyalandı' : 'SQL Kodunu Kopyala'}
                                    </button>
                                    <a
                                        href={supabaseUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            background: '#C9A96E',
                                            color: '#0F0F10', textDecoration: 'none', borderRadius: '6px',
                                            padding: '8px 12px', fontSize: '12px', fontWeight: 600,
                                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                                            transition: 'all 200ms'
                                        }}
                                    >
                                        SQL Editor'ü Aç <ExternalLink size={14} />
                                    </a>
                                </div>
                                <div style={{
                                    height: '200px',
                                    background: '#000',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    paddingTop: '60px',
                                    fontSize: '12px',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: '#AEAEB2',
                                    overflowY: 'auto',
                                    border: '1px solid rgba(255,255,255,0.06)'
                                }}>
                                    <pre style={{ margin: 0 }}>{sql}</pre>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={onClose}
                                style={{ background: 'none', border: 'none', color: '#AEAEB2', fontSize: '13px', cursor: 'pointer', padding: '8px 16px' }}
                            >
                                Şimdilik Kapat
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

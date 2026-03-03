'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Download, Copy, Check, Trash2, Tag, Layers, ZapOff } from 'lucide-react';

interface CouponGeneratorProps {
    value?: string;
    onChange: (value: string | null) => void;
    type?: 'single' | 'unique' | 'none';
    onTypeChange: (type: 'single' | 'unique' | 'none') => void;
}

export function CouponGenerator({ value, onChange, type = 'single', onTypeChange }: CouponGeneratorProps) {
    const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
    const [prefix, setPrefix] = useState('');
    const [bulkCount, setBulkCount] = useState(50);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const generateCode = (len = 8) => {
        const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // No O, 0, I, 1 for clarity
        const array = new Uint32Array(len);
        window.crypto.getRandomValues(array);
        let result = "";
        for (let i = 0; i < len; i++) {
            result += charset[array[i] % charset.length];
        }
        return result;
    };

    const handleBulkGenerate = () => {
        const codes = Array.from({ length: Math.min(bulkCount, 1000) }, () => prefix + generateCode());
        setGeneratedCodes(codes);
    };

    const handleCopy = (code: string, index: number) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const downloadCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8,Kupon Kodu\n" + generatedCodes.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `selis_coupons_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Kupon Kodu</h3>
            </div>

            <div style={{ padding: '20px' }}>
                {/* Type Selector */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    {[
                        { id: 'single', label: 'Tek Kod', icon: Tag },
                        { id: 'unique', label: 'Benzersiz Kodlar', icon: Layers },
                        { id: 'none', label: 'Kodsuz (Otomatik)', icon: ZapOff },
                    ].map((t) => {
                        const Icon = t.icon;
                        const active = type === t.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => onTypeChange(t.id as any)}
                                style={{
                                    flex: 1, padding: '10px', borderRadius: '6px', cursor: 'pointer', transition: 'all 200ms',
                                    background: active ? 'rgba(201,169,110,0.1)' : 'rgba(255,255,255,0.02)',
                                    border: `1px solid ${active ? 'rgba(201,169,110,0.2)' : 'rgba(255,255,255,0.06)'}`,
                                    color: active ? '#C9A96E' : '#AEAEB2', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'
                                }}
                            >
                                <Icon size={18} />
                                <span style={{ fontSize: '11px', fontWeight: 600 }}>{t.label}</span>
                            </button>
                        );
                    })}
                </div>

                <AnimatePresence mode="wait">
                    {type === 'single' && (
                        <motion.div
                            key="single"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        >
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    value={value || ''}
                                    onChange={(e) => onChange(e.target.value.toUpperCase())}
                                    placeholder="Kupon Kodunu Girin..."
                                    style={{
                                        width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: '6px', padding: '12px 100px 12px 40px', fontSize: '16px', color: '#F5F0EB',
                                        fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', outline: 'none'
                                    }}
                                />
                                <Tag size={16} color="#636366" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                                <button
                                    onClick={() => onChange(generateCode())}
                                    style={{
                                        position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                                        background: 'rgba(201,169,110,0.15)', border: 'none', borderRadius: '4px',
                                        padding: '6px 10px', color: '#C9A96E', fontSize: '11px', fontWeight: 600, cursor: 'pointer'
                                    }}
                                >
                                    Otomatik Üret
                                </button>
                            </div>
                            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input type="checkbox" id="singleUse" style={{ width: '14px', height: '14px' }} />
                                <label htmlFor="singleUse" style={{ fontSize: '12px', color: '#AEAEB2' }}>Müşteri başına tek kullanım</label>
                            </div>
                        </motion.div>
                    )}

                    {type === 'unique' && (
                        <motion.div
                            key="unique"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                                <div>
                                    <label style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Adet (Maks 1000)</label>
                                    <input
                                        type="number"
                                        value={bulkCount}
                                        onChange={(e) => setBulkCount(Number(e.target.value))}
                                        style={{
                                            width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                            borderRadius: '6px', padding: '8px 12px', color: '#F5F0EB', outline: 'none'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Ön Ek (Opsiyonel)</label>
                                    <input
                                        type="text"
                                        value={prefix}
                                        onChange={(e) => setPrefix(e.target.value.toUpperCase())}
                                        placeholder="SELIS-"
                                        style={{
                                            width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                            borderRadius: '6px', padding: '8px 12px', color: '#F5F0EB', outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleBulkGenerate}
                                style={{
                                    width: '100%', background: '#C9A96E', color: '#0F0F10', border: 'none',
                                    borderRadius: '6px', padding: '10px', fontSize: '13px', fontWeight: 600,
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                }}
                            >
                                <RefreshCcw size={16} /> {generatedCodes.length > 0 ? 'Yeniden Üret' : 'Kodları Üret'}
                            </button>

                            {generatedCodes.length > 0 && (
                                <div style={{ marginTop: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <span style={{ fontSize: '12px', color: '#636366' }}>Üretilen Kodlar ({generatedCodes.length})</span>
                                        <button onClick={downloadCSV} style={{ background: 'none', border: 'none', color: '#0A84FF', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Download size={12} /> CSV İndir
                                        </button>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)', padding: '8px' }}>
                                        {generatedCodes.slice(0, 5).map((code, idx) => (
                                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px', borderBottom: idx < 4 ? '1px solid rgba(255,255,255,0.02)' : 'none' }}>
                                                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#AEAEB2' }}>{code}</span>
                                                <button onClick={() => handleCopy(code, idx)} style={{ background: 'none', border: 'none', color: '#636366', cursor: 'pointer' }}>
                                                    {copiedIndex === idx ? <Check size={12} color="#30D158" /> : <Copy size={12} />}
                                                </button>
                                            </div>
                                        ))}
                                        {generatedCodes.length > 5 && (
                                            <div style={{ padding: '8px', textAlign: 'center', fontSize: '11px', color: '#636366' }}>ve {generatedCodes.length - 5} adet daha...</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {type === 'none' && (
                        <motion.div
                            key="none"
                            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                            style={{ background: 'rgba(10,132,255,0.05)', border: '1px solid rgba(10,132,255,0.1)', borderRadius: '6px', padding: '16px', textAlign: 'center' }}
                        >
                            <ZapOff size={24} color="#0A84FF" style={{ marginBottom: '8px' }} />
                            <div style={{ fontSize: '13px', color: '#0A84FF', fontWeight: 500 }}>Otomatik Uygulama</div>
                            <p style={{ fontSize: '11px', color: '#AEAEB2', margin: '4px 0 0', lineHeight: 1.5 }}>Bu kampanya sepet koşulları sağlandığında otomatik olarak uygulanacaktır. Müşterilerin kod girmesine gerek kalmaz.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

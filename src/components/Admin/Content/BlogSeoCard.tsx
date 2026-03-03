'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, XCircle, BarChart3, Globe } from 'lucide-react';

interface BlogSeoCardProps {
    title: string;
    description: string;
    keyword: string;
    content: string;
}

export function BlogSeoCard({ title, description, keyword, content }: BlogSeoCardProps) {
    const analysis = useMemo(() => {
        const rules = [
            { id: 1, label: 'Başlıkta focus keyword var', pass: title.toLowerCase().includes(keyword.toLowerCase()), critical: true },
            { id: 2, label: 'Meta açıklamada keyword var', pass: description.toLowerCase().includes(keyword.toLowerCase()), critical: false },
            { id: 3, label: 'İçerik 300+ kelime', pass: content.split(/\s+/).length >= 300, critical: true },
            { id: 4, label: 'Başlık uzunluğu (50-60 karakter)', pass: title.length >= 50 && title.length <= 60, critical: false },
            { id: 5, label: 'Meta açıklama uzunluğu (120-160)', pass: description.length >= 120 && description.length <= 160, critical: false },
            { id: 6, label: 'İçerikte keyword yoğunluğu', pass: (content.match(new RegExp(keyword, 'gi')) || []).length >= 3, critical: true },
        ];

        const score = Math.round((rules.filter(r => r.pass).length / rules.length) * 100);
        return { rules, score };
    }, [title, description, keyword, content]);

    const scoreColor = analysis.score > 70 ? '#30D158' : (analysis.score > 40 ? '#FFD60A' : '#FF453A');

    return (
        <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>SEO & Arama Analizi</h3>
                <BarChart3 size={18} color={scoreColor} />
            </div>

            {/* Google Preview */}
            <div style={{ background: '#242426', borderRadius: '6px', padding: '16px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Globe size={12} color="#AEAEB2" />
                    </div>
                    <div style={{ fontSize: '12px', color: '#AEAEB2' }}>selis.com.tr › blog › ...</div>
                </div>
                <div style={{ fontSize: '16px', color: '#8AB4F8', marginBottom: '4px', cursor: 'pointer' }}>{title || 'Yazı Başlığı'}</div>
                <div style={{ fontSize: '13px', color: '#BDC1C6', lineHeight: 1.5 }}>{description || 'Meta açıklama burada görünecek...'}</div>
            </div>

            {/* Score Bar */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#AEAEB2' }}>SEO Skoru</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: scoreColor }}>%{analysis.score}</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${analysis.score}%` }}
                        style={{ height: '100%', background: scoreColor }}
                    />
                </div>
            </div>

            {/* Rules List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {analysis.rules.map((rule) => (
                    <div key={rule.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        {rule.pass ? (
                            <CheckCircle2 size={14} color="#30D158" style={{ marginTop: '2px', flexShrink: 0 }} />
                        ) : (
                            <XCircle size={14} color={rule.critical ? '#FF453A' : '#636366'} style={{ marginTop: '2px', flexShrink: 0 }} />
                        )}
                        <span style={{ fontSize: '12px', color: rule.pass ? '#AEAEB2' : '#636366' }}>{rule.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

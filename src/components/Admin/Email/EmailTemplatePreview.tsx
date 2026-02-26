'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Monitor, Smartphone, Send, Code, Eye } from 'lucide-react';
import { EmailTemplate } from '@/types/email';

interface EmailTemplatePreviewProps {
    template: EmailTemplate | null;
    onClose: () => void;
}

export function EmailTemplatePreview({ template, onClose }: EmailTemplatePreviewProps) {
    const [view, setView] = useState<'desktop' | 'mobile'>('desktop');
    const [mode, setMode] = useState<'preview' | 'code'>('preview');

    if (!template) return null;

    return (
        <AnimatePresence>
            {template && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full h-full bg-[#0F0F10] border border-white/10 rounded-sm flex flex-col overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="h-16 border-b border-white/05 px-6 flex items-center justify-between bg-[#141416]">
                            <div className="flex items-center gap-4">
                                <h2 className="text-[16px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif]">{template.name}</h2>
                                <div className="text-[10px] font-bold text-[#636366] uppercase tracking-widest bg-white/05 px-2 py-1 rounded-sm">
                                    {template.trigger}
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex bg-white/[0.04] p-1 rounded-sm border border-white/[0.08]">
                                    <button
                                        onClick={() => setView('desktop')}
                                        className={`p-1.5 rounded-sm transition-all ${view === 'desktop' ? 'bg-white/05 text-[#C9A96E]' : 'text-[#636366] hover:text-[#AEAEB2]'}`}
                                    >
                                        <Monitor size={16} />
                                    </button>
                                    <button
                                        onClick={() => setView('mobile')}
                                        className={`p-1.5 rounded-sm transition-all ${view === 'mobile' ? 'bg-white/05 text-[#C9A96E]' : 'text-[#636366] hover:text-[#AEAEB2]'}`}
                                    >
                                        <Smartphone size={16} />
                                    </button>
                                </div>

                                <div className="flex bg-white/[0.04] p-1 rounded-sm border border-white/[0.08]">
                                    <button
                                        onClick={() => setMode('preview')}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-[12px] font-medium transition-all ${mode === 'preview' ? 'bg-white/05 text-[#C9A96E]' : 'text-[#636366] hover:text-[#AEAEB2]'}`}
                                    >
                                        <Eye size={14} /> Önizleme
                                    </button>
                                    <button
                                        onClick={() => setMode('code')}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-[12px] font-medium transition-all ${mode === 'code' ? 'bg-white/05 text-[#C9A96E]' : 'text-[#636366] hover:text-[#AEAEB2]'}`}
                                    >
                                        <Code size={14} /> Kod
                                    </button>
                                </div>

                                <button className="bg-[#C9A96E] hover:bg-[#D4B87A] text-[#0F0F10] px-4 py-2 rounded-sm text-[12px] font-bold transition-all flex items-center gap-2">
                                    <Send size={14} /> Test Gönder
                                </button>

                                <button onClick={onClose} className="p-2 text-[#636366] hover:text-[#F5F0EB] transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex overflow-hidden">
                            {mode === 'code' ? (
                                <div className="flex-1 p-6 font-mono text-[13px] bg-[#0F0F10] text-[#AEAEB2] overflow-y-auto">
                                    <pre className="whitespace-pre-wrap">
                                        {template.htmlContent.split(/({{[^}]+}})/g).map((part, i) => (
                                            <span key={i} className={part.startsWith('{{') ? 'text-[#C9A96E] font-bold' : ''}>
                                                {part}
                                            </span>
                                        ))}
                                    </pre>
                                </div>
                            ) : (
                                <div className="flex-1 bg-[#141416] p-8 flex justify-center overflow-y-auto">
                                    <div
                                        className={`bg-white transition-all duration-300 shadow-2xl overflow-hidden rounded-sm ${view === 'desktop' ? 'w-full max-w-4xl' : 'w-[375px]'
                                            }`}
                                    >
                                        <div className="p-8 text-black font-sans" dangerouslySetInnerHTML={{ __html: template.htmlContent.replace(/{{[^}]+}}/g, (match) => `<span style="background: rgba(201,169,110,0.15); color: #8B6A3A; padding: 0 4px; border-radius: 2px;">${match}</span>`) }} />
                                    </div>
                                </div>
                            )}

                            {/* Sidebar Variables */}
                            <div className="w-64 border-l border-white/05 bg-[#141416] p-6 space-y-6">
                                <h4 className="text-[11px] font-bold text-[#636366] uppercase tracking-wider">Kullanılabilir Değişkenler</h4>
                                <div className="space-y-3">
                                    {['müşteri_adı', 'sipariş_no', 'takip_no', 'tarih', 'toplam_tutar'].map(v => (
                                        <div key={v} className="p-2 bg-white/05 border border-white/05 rounded-sm flex items-center justify-between group cursor-copy">
                                            <code className="text-[11px] text-[#C9A96E] font-bold">{"{{"}{v}{"}}"}</code>
                                            <button className="text-[10px] text-[#636366] opacity-0 group-hover:opacity-100 transition-all uppercase font-bold">Kopyala</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

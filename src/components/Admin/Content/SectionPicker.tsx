'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Zap, LayoutTemplate, Radio, Check,
    MessageSquare, Mail, Eye, Text, Grid
} from 'lucide-react';
import { SectionType } from '@/lib/default-content';

interface SectionPickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (type: SectionType) => void;
}

const sectionTypes = [
    { type: 'hero', label: 'Hero (Giriş)', icon: Zap, desc: 'Büyük görsel ve etkileyici başlık.' },
    { type: 'features', label: 'Özellikler', icon: Check, desc: 'Hizmet avantajlarını listeleyen şerit.' },
    { type: 'featured-products', label: 'Ürün Izgarası', icon: LayoutGrid, desc: 'Öne çıkan veya yeni ürünler.' },
    { type: 'campaign-strip', label: 'Kampanya Bandı', icon: Radio, desc: 'Kayan yazı veya kampanya duyurusu.' },
    { type: 'testimonials', label: 'Müşteri Yorumları', icon: MessageSquare, desc: 'Gerçek kullanıcı deneyimleri.' },
    { type: 'newsletter', label: 'Bülten Kaydı', icon: Mail, desc: 'E-posta abonelik formu.' },
    { type: 'lookbook-banner', label: 'Lookbook Banner', icon: Eye, desc: 'İnteraktif ürün etiketli görseller.' },
    { type: 'text-block', label: 'Metin Bloğu', icon: Text, desc: 'Hakkımızda veya detaylı bilgi alanı.' },
    { type: 'gallery', label: 'Galeri', icon: Grid, desc: 'Şık image grid yerleşimi.' },
] as const;

import { LayoutGrid } from 'lucide-react';

export function SectionPicker({ isOpen, onClose, onSelect }: SectionPickerProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.8)', zIndex: 200, backdropFilter: 'blur(4px)'
                        }}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        style={{
                            position: 'fixed', top: '50%', left: '50%', x: '-50%', y: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: '90%', maxWidth: '800px', maxHeight: '85vh',
                            background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '12px', zIndex: 201, display: 'flex', flexDirection: 'column',
                            boxShadow: '0 24px 48px rgba(0,0,0,0.5)', overflow: 'hidden'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}>
                            <div>
                                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: '#C9A96E', margin: 0 }}>Bölüm Ekle</h2>
                                <p style={{ color: '#636366', fontSize: '13px', marginTop: '4px' }}>Sayfanıza yeni bir içerik bloğu ekleyin.</p>
                            </div>
                            <button
                                onClick={onClose}
                                style={{
                                    padding: '8px', background: 'rgba(255,255,255,0.03)', border: 'none',
                                    borderRadius: '50%', color: '#AEAEB2', cursor: 'pointer'
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Grid */}
                        <div style={{
                            padding: '24px', overflowY: 'auto', display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px'
                        }}>
                            {sectionTypes.map((item) => (
                                <button
                                    key={item.type}
                                    onClick={() => onSelect(item.type as any)}
                                    style={{
                                        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                                        borderRadius: '8px', padding: '20px', textAlign: 'left', cursor: 'pointer',
                                        transition: 'all 200ms', display: 'flex', flexDirection: 'column', gap: '12px'
                                    }}
                                    className="hover-trigger"
                                >
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(201,169,110,0.05)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(201,169,110,0.2)'
                                    }}>
                                        <item.icon size={22} color="#C9A96E" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '15px', fontWeight: 600, color: '#F5F0EB' }}>{item.label}</div>
                                        <div style={{ fontSize: '12px', color: '#636366', marginTop: '4px', lineHeight: '1.4' }}>{item.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <style jsx>{`
                            .hover-trigger:hover {
                                background: rgba(201,169,110,0.05) !important;
                                border-color: rgba(201,169,110,0.3) !important;
                                transform: translateY(-2px);
                            }
                        `}</style>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

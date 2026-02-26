'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Tag as TagIcon, LayoutGrid, List,
    Settings, ExternalLink, Calendar, Search,
    X, CheckCircle2, MoreVertical, MapPin, Trash2
} from 'lucide-react';
import { mockLookbooks, LookbookCollection, LookbookPhoto } from '@/lib/mock/content';

export function LookbookGrid() {
    const [collections, setCollections] = useState<LookbookCollection[]>(mockLookbooks);
    const [selectedCol, setSelectedCol] = useState<LookbookCollection>(collections[0]);
    const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(selectedCol.photos[0]?.id || null);

    const selectedPhoto = selectedCol.photos.find(p => p.id === selectedPhotoId);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', minHeight: 'calc(100vh - 200px)' }}>

            {/* Masonry Grid Area */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignContent: 'start' }}>
                <AnimatePresence mode="popLayout">
                    {selectedCol.photos.map((photo, idx) => (
                        <motion.div
                            key={photo.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={() => setSelectedPhotoId(photo.id)}
                            style={{
                                position: 'relative', borderRadius: '8px', overflow: 'hidden',
                                cursor: 'pointer', border: `2px solid ${selectedPhotoId === photo.id ? '#C9A96E' : 'transparent'}`,
                                gridRow: idx % 3 === 0 ? 'span 2' : 'span 1' // Basic masonry effect
                            }}
                        >
                            <img src={photo.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                            <div style={{
                                position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px',
                                opacity: selectedPhotoId === photo.id ? 1 : 0, transition: 'all 200ms'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F5F0EB', fontSize: '11px' }}>
                                    <TagIcon size={12} /> {photo.productTags.length} Ürün etiketlendi
                                </div>
                            </div>

                            {photo.isFeatured && (
                                <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#C9A96E', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, color: '#0F0F10' }}>
                                    ÖNE ÇIKAN
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                <button style={{
                    background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.06)', borderRadius: '8px',
                    aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    color: '#636366', cursor: 'pointer', transition: 'all 200ms'
                }}>
                    <Plus size={32} />
                    <span style={{ fontSize: '13px', marginTop: '12px' }}>Fotoğraf Ekle</span>
                </button>
            </div>

            {/* Sidebar Detail Area */}
            <aside>
                <AnimatePresence mode="wait">
                    {selectedPhoto ? (
                        <motion.div
                            key={selectedPhoto.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                        >
                            <div style={cardStyle}>
                                <h4 style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', marginBottom: '16px' }}>Fotoğraf Detayı</h4>
                                <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <img src={selectedPhoto.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                                    <button style={btnActionStyle}><TagIcon size={14} /> Ürün Etiketle</button>
                                    <button style={btnActionStyle}><Settings size={14} /> Ayarlar</button>
                                </div>
                            </div>

                            <div style={cardStyle}>
                                <h4 style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', marginBottom: '16px' }}>Etiketlenen Ürünler ({selectedPhoto.productTags.length})</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {selectedPhoto.productTags.length > 0 ? selectedPhoto.productTags.map(tag => (
                                        <div key={tag.productId} style={{
                                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                                            padding: '10px 12px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C9A96E' }} />
                                                <span style={{ fontSize: '13px', color: '#F5F0EB' }}>{tag.productName}</span>
                                            </div>
                                            <button style={{ background: 'none', border: 'none', color: '#636366', cursor: 'pointer' }}><X size={14} /></button>
                                        </div>
                                    )) : (
                                        <div style={{ fontSize: '12px', color: '#636366', fontStyle: 'italic', textAlign: 'center', padding: '20px 0' }}>
                                            Henüz ürün etiketlenmemiş.
                                        </div>
                                    )}
                                </div>
                                <button style={{
                                    width: '100%', marginTop: '16px', background: 'rgba(201,169,110,0.1)', border: '1px dashed #C9A96E',
                                    borderRadius: '4px', padding: '10px', color: '#C9A96E', fontSize: '12px', fontWeight: 600, cursor: 'pointer'
                                }}>
                                    + Yeni Tag Ekle
                                </button>
                            </div>

                            <button style={{
                                width: '100%', background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.2)',
                                color: '#FF453A', padding: '12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                            }}>
                                <Trash2 size={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Fotoğrafı Sil
                            </button>
                        </motion.div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#636366' }}>
                            <MapPin size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
                            <div style={{ fontSize: '13px' }}>Düzenlemek için bir fotoğraf seçin.</div>
                        </div>
                    )}
                </AnimatePresence>
            </aside>
        </div>
    );
}

const cardStyle = { background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '20px' };
const btnActionStyle = {
    flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '4px', padding: '8px', color: '#F5F0EB', fontSize: '11px', fontWeight: 600,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
};

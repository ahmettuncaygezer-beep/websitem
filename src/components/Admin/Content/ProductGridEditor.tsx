import React from 'react';
import { LayoutGrid, Plus, Trash2, MoveHorizontal } from 'lucide-react';

interface ProductGridContent {
    title: string;
    subtitle?: string;
    productIds: string[];
    layout: 'grid' | 'carousel';
    itemsPerRow: 2 | 3 | 4;
}

interface ProductGridEditorProps {
    content: ProductGridContent;
    onChange: (content: ProductGridContent) => void;
}

export function ProductGridEditor({ content, onChange }: ProductGridEditorProps) {
    const handleChange = (field: keyof ProductGridContent, value: any) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', margin: 0 }}>Ürün Izgarası Düzenle</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                {/* Basic Settings */}
                <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={labelStyle}>Bölüm Başlığı</label>
                        <input
                            type="text"
                            value={content.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="Örn: Öne Çıkan Koleksiyonlar"
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Alt Başlık (Opsiyonel)</label>
                        <textarea
                            value={content.subtitle || ''}
                            onChange={(e) => handleChange('subtitle', e.target.value)}
                            placeholder="Kısa bir açıklama..."
                            style={{ ...inputStyle, minHeight: '80px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Görünüm</label>
                            <select
                                value={content.layout}
                                onChange={(e) => handleChange('layout', e.target.value)}
                                style={inputStyle}
                            >
                                <option value="grid">Izgara (Grid)</option>
                                <option value="carousel">Kaydırmalı (Carousel)</option>
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Satır Başına Ürün</label>
                            <select
                                value={content.itemsPerRow}
                                onChange={(e) => handleChange('itemsPerRow', Number(e.target.value))}
                                style={inputStyle}
                            >
                                <option value={2}>2 Ürün</option>
                                <option value={3}>3 Ürün</option>
                                <option value={4}>4 Ürün</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Product Selection Placeholder */}
                <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px dashed rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '40px',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <LayoutGrid size={48} color="#636366" />
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB' }}>Ürün Seçimi</div>
                            <div style={{ fontSize: '12px', color: '#636366', marginTop: '4px' }}>
                                Şimdilik bu bölüm otomatik olarak en yeni ürünleri gösterir.
                                Manuel seçim özelliği yakında eklenecektir.
                            </div>
                        </div>
                        <button style={{
                            background: 'rgba(201,169,110,0.1)', border: 'none', borderRadius: '4px',
                            padding: '8px 16px', color: '#C9A96E', fontSize: '13px', fontWeight: 600, cursor: 'default',
                            opacity: 0.5
                        }}>
                            Ürünleri Yönet (Yakında)
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

const labelStyle = { fontSize: '12px', fontWeight: 600, color: '#AEAEB2', display: 'block', marginBottom: '8px' };
const inputStyle = {
    width: '100%', background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '10px 14px', color: '#F5F0EB', fontSize: '14px', outline: 'none'
};

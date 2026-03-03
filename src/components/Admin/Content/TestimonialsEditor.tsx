import React from 'react';
import { Quote, Plus, Trash2, Star } from 'lucide-react';

interface Testimonial {
    id: string;
    author: string;
    role: string;
    content: string;
    rating: number;
    avatar?: string;
}

interface TestimonialsEditorProps {
    content: Testimonial[];
    onChange: (content: Testimonial[]) => void;
}

export function TestimonialsEditor({ content, onChange }: TestimonialsEditorProps) {
    const handleAdd = () => {
        const newTestimonial: Testimonial = {
            id: Date.now().toString(),
            author: 'Müşteri Adı',
            role: 'Müşteri',
            content: 'Görüşlerinizi buraya yazın...',
            rating: 5
        };
        onChange([...content, newTestimonial]);
    };

    const handleUpdate = (id: string, updates: Partial<Testimonial>) => {
        onChange(content.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    const handleRemove = (id: string) => {
        onChange(content.filter(t => t.id !== id));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', margin: 0 }}>Müşteri Görüşleri</h2>
                    <p style={{ fontSize: '13px', color: '#636366', marginTop: '4px' }}>Ana sayfada sergilenecek müşteri yorumlarını yönetin.</p>
                </div>
                <button
                    onClick={handleAdd}
                    style={{
                        background: '#C9A96E',
                        color: '#0F0F10', border: 'none', borderRadius: '4px', padding: '8px 16px',
                        fontSize: '12px', fontWeight: 600, cursor: 'pointer'
                    }}
                >
                    <Plus size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Yeni Yorum Ekle
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                {content.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: '8px', padding: '24px', position: 'relative'
                        }}
                    >
                        <button
                            onClick={() => handleRemove(item.id)}
                            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#636366' }}
                        >
                            <Trash2 size={16} />
                        </button>

                        <div style={{ display: 'flex', gap: '24px' }}>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={labelStyle}>İsim</label>
                                        <input
                                            type="text" value={item.author}
                                            onChange={(e) => handleUpdate(item.id, { author: e.target.value })}
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Unvan / Rol</label>
                                        <input
                                            type="text" value={item.role}
                                            onChange={(e) => handleUpdate(item.id, { role: e.target.value })}
                                            style={inputStyle}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={labelStyle}>Yorum</label>
                                    <textarea
                                        value={item.content}
                                        onChange={(e) => handleUpdate(item.id, { content: e.target.value })}
                                        style={{ ...inputStyle, minHeight: '80px' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <label style={{ ...labelStyle, marginBottom: 0 }}>Puan:</label>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => handleUpdate(item.id, { rating: star })}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                            >
                                                <Star
                                                    size={16}
                                                    fill={star <= item.rating ? '#C9A96E' : 'none'}
                                                    color={star <= item.rating ? '#C9A96E' : '#636366'}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const labelStyle = { fontSize: '12px', fontWeight: 600, color: '#AEAEB2', display: 'block', marginBottom: '8px' };
const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '10px 14px', color: '#F5F0EB', fontSize: '14px', outline: 'none'
};

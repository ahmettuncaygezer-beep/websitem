'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const FEATURES = [
    'El yapımı ahşap iskelet',
    'Yüksek yoğunluklu sünger dolgu',
    'Çıkarılabilir ve yıkanabilir kılıf',
    'OEKO-TEX® sertifikalı kumaş',
    'Solmaya dayanıklı boyama',
    'Anti-alerjik iç dolgu',
];

interface Props { description?: string; }

export function DescriptionTab({ description }: Props) {
    const [expanded, setExpanded] = useState(false);
    const text = description || 'Luna Köşe Koltuk, yaşam alanınıza premium bir dokunuş katmak için el yapımı masif meşe iskelet üzerine inşa edilmiştir. Yüksek yoğunluklu sünger dolgusu, uzun yıllar boyunca konforunu korurken, OEKO-TEX® sertifikalı kadife kumaşı zarif ve güvenli bir kullanım sunar. Modüler tasarımı sayesinde odanızın boyutuna göre özelleştirilebilir.\n\nKoltuğun çıkarılabilir ve yıkanabilir kılıfları, bakımı son derece pratik hale getirir. Türkiye\'de yerel ustalar tarafından el işçiliğiyle üretilen bu parça, zamansız estetiği ve dayanıklılığıyla dikkat çeker.';

    return (
        <div className="grid md:grid-cols-5 gap-8">
            {/* Left — text */}
            <div className="md:col-span-3">
                <div className="relative" style={{ maxHeight: expanded ? 'none' : '200px', overflow: 'hidden' }}>
                    {text.split('\n\n').map((p, i) => (
                        <p key={i} className="text-[14px] leading-relaxed mb-4" style={{ color: '#444' }}>{p}</p>
                    ))}
                    {!expanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(transparent, white)' }} />
                    )}
                </div>
                {!expanded && (
                    <button onClick={() => setExpanded(true)} className="mt-2 text-[13px] font-medium" style={{ color: '#C9A96E', background: 'none', border: 'none', cursor: 'pointer' }}>
                        Daha Fazla Göster ▾
                    </button>
                )}
            </div>

            {/* Right — features */}
            <div className="md:col-span-2">
                <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-playfair, serif)', fontWeight: 400, color: '#1C1C1E' }}>Öne Çıkan Özellikler</h3>
                <ul className="space-y-3">
                    {FEATURES.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <Check size={16} style={{ color: '#C9A96E', marginTop: 2, flexShrink: 0 }} />
                            <span className="text-[13px]" style={{ color: '#444' }}>{f}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

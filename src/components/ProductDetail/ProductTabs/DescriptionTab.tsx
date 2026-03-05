'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useGlobal } from '@/context/GlobalContext';

const FEATURES = [
    { key: 'pdp_feature_1', text: 'El yapımı ahşap iskelet' },
    { key: 'pdp_feature_2', text: 'Yüksek yoğunluklu sünger dolgu' },
    { key: 'pdp_feature_3', text: 'Çıkarılabilir ve yıkanabilir kılıf' },
    { key: 'pdp_feature_4', text: 'OEKO-TEX® sertifikalı kumaş' },
    { key: 'pdp_feature_5', text: 'Solmaya dayanıklı boyama' },
    { key: 'pdp_feature_6', text: 'Anti-alerjik iç dolgu' },
];

interface Props { description?: string; }

export function DescriptionTab({ description }: Props) {
    const { t } = useGlobal();
    const [expanded, setExpanded] = useState(false);
    const text = description || 'Luna Köşe Koltuk, yaşam alanınıza premium bir dokunuş katmak için el yapımı masif meşe iskelet üzerine inşa edilmiştir. Yüksek yoğunluklu sünger dolgusu, uzun yıllar boyunca konforunu korurken, OEKO-TEX® sertifikalı kadife kumaşı zarif ve güvenli bir kullanım sunar. Modüler tasarımı sayesinde odanızın boyutuna göre özelleştirilebilir.\n\nKoltuğun çıkarılabilir ve yıkanabilir kılıfları, bakımı son derece pratik hale getirir. Türkiye\'de yerel ustalar tarafından el işçiliğiyle üretilen bu parça, zamansız estetiği ve dayanıklılığıyla dikkat çeker.';

    return (
        <div className="grid md:grid-cols-5 gap-8">
            {/* Left — text */}
            <div className="md:col-span-3">
                <div className="relative" style={{ maxHeight: expanded ? 'none' : '200px', overflow: 'hidden' }}>
                    {text.split('\n\n').map((p, i) => (
                        <p key={i} className="text-[14px] leading-relaxed mb-4 text-muted-foreground">{p}</p>
                    ))}
                    {!expanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-background to-transparent" />
                    )}
                </div>
                {!expanded && (
                    <button onClick={() => setExpanded(true)} className="mt-2 text-[13px] font-medium" style={{ color: '#C9A96E', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <span>{t('pdp_show_more') || 'Daha Fazla Göster ▾'}</span>
                    </button>
                )}
            </div>

            {/* Right — features */}
            <div className="md:col-span-2">
                <h3 className="text-lg mb-4 text-foreground font-normal" style={{ fontFamily: 'var(--font-playfair, serif)' }}>{t('pdp_highlighted_features') || 'Öne Çıkan Özellikler'}</h3>
                <ul className="space-y-3">
                    {FEATURES.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <Check size={16} className="text-selis-gold mt-[2px] shrink-0" />
                            <span className="text-[13px] text-muted-foreground">{t(f.key) || f.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

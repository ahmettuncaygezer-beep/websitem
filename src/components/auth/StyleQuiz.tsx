'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check } from 'lucide-react';

interface Style {
    id: string;
    name: string;
    description: string;
    image: string;
}

const styles: Style[] = [
    {
        id: 'minimalist',
        name: 'Minimalist',
        description: 'Temiz çizgiler ve ferah alanlar.',
        image: '/images/styles/minimalist.jpg'
    },
    {
        id: 'scandinavian',
        name: 'İskandinav',
        description: 'Sıcak ahşap ve doğal dokular.',
        image: '/images/styles/scandinavian.jpg'
    },
    {
        id: 'maximalist',
        name: 'Maksimalist',
        description: 'Cesur renkler ve sanatsal detaylar.',
        image: '/images/styles/maximalist.jpg'
    },
    {
        id: 'modern-luxury',
        name: 'Modern Lüks',
        description: 'Zarif mermer ve metalik dokunuşlar.',
        image: '/images/styles/modern-luxury.jpg'
    }
];

interface StyleQuizProps {
    onComplete: (selectedStyleIds: string[]) => void;
}

export function StyleQuiz({ onComplete }: StyleQuizProps) {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleStyle = (id: string) => {
        setSelected(prev =>
            prev.includes(id)
                ? prev.filter(s => s !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="pt-4">
            <div className="text-center mb-8">
                <h3 className="font-serif text-2xl text-charcoal mb-2">Hangi tarz seni yansıtıyor?</h3>
                <p className="text-sm font-sans text-warm-gray">
                    Zevkinize uygun ürünleri öne çıkarmamız için en az bir stil seçin.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
                {styles.map((style) => (
                    <motion.div
                        key={style.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleStyle(style.id)}
                        className={`relative aspect-square rounded-3xl overflow-hidden cursor-pointer group border-2 transition-colors ${selected.includes(style.id) ? 'border-gold' : 'border-transparent'
                            }`}
                    >
                        {/* Placeholder for real images - using a colored div for now */}
                        <div className={`absolute inset-0 ${style.id === 'minimalist' ? 'bg-sand' :
                                style.id === 'scandinavian' ? 'bg-sage/10' :
                                    style.id === 'maximalist' ? 'bg-terracotta/10' : 'bg-charcoal/5'
                            }`} />

                        {/* Title and Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent flex flex-col justify-end p-4">
                            <p className="text-white font-serif text-sm">{style.name}</p>
                            <p className="text-white/60 text-[10px] font-sans truncate">{style.description}</p>
                        </div>

                        {/* Selected Indicator */}
                        {selected.includes(style.id) && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-3 right-3 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-white"
                            >
                                <Check size={14} />
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>

            <button
                onClick={() => onComplete(selected)}
                disabled={selected.length === 0}
                className="w-full bg-charcoal text-white py-4 rounded-2xl font-sans font-bold tracking-widest uppercase hover:bg-black transition-all disabled:opacity-30"
            >
                Devam Et
            </button>
        </div>
    );
}

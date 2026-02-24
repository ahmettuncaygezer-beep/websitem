'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Share2, Info } from 'lucide-react';
import Image from 'next/image';
import { useGlobal } from '@/context/GlobalContext';
import { ProductStage } from '../three/ProductStage';
import { ConfigurableModel } from '../three/ConfigurableModel';

interface Option {
    id: string;
    name: string;
    image?: string;
    color?: string;
    priceModifier: number;
}

interface Feature {
    id: string;
    name: string;
    options: Option[];
}

const configurationData: Feature[] = [
    {
        id: 'fabric',
        name: 'Kumaş Dokusu',
        options: [
            { id: 'linen-beige', name: 'Keten Bej', color: '#E5E4E2', priceModifier: 0 },
            { id: 'velvet-gray', name: 'Kadife Füme', color: '#4A4A4A', priceModifier: 2500 },
            { id: 'boucle-white', name: 'Bouclé Kar', color: '#FDFDFD', priceModifier: 4800 },
        ]
    },
    {
        id: 'legs',
        name: 'Ayak Yapısı',
        options: [
            { id: 'oak-natural', name: 'Doğal Meşe', color: '#D2B48C', priceModifier: 0 },
            { id: 'walnut-dark', name: 'Koyu Ceviz', color: '#5C4033', priceModifier: 1200 },
            { id: 'brass-gold', name: 'Pirinç Altın', color: '#D4AF37', priceModifier: 3500 },
        ]
    },
    {
        id: 'armrest',
        name: 'Kolçak Tasarımı',
        options: [
            { id: 'standard', name: 'Klasik İnce', priceModifier: 0 },
            { id: 'wide', name: 'Geniş Konfor', priceModifier: 1500 },
        ]
    }
];

interface ProductConfiguratorProps {
    isOpen: boolean;
    onClose: () => void;
    basePrice: number;
    productName: string;
}

export function ProductConfigurator({ isOpen, onClose, basePrice, productName }: ProductConfiguratorProps) {
    const { formatPrice } = useGlobal();
    const [selections, setSelections] = useState<Record<string, string>>({
        fabric: 'linen-beige',
        legs: 'oak-natural',
        armrest: 'standard'
    });

    const calculateTotalPrice = () => {
        let extra = 0;
        Object.entries(selections).forEach(([featureId, optionId]) => {
            const feature = configurationData.find(f => f.id === featureId);
            const option = feature?.options.find(o => o.id === optionId);
            extra += option?.priceModifier || 0;
        });
        return basePrice + extra;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-serif text-charcoal">Atölye: {productName}</h2>
                        <p className="text-[10px] font-sans text-warm-gray uppercase tracking-widest font-bold">Kendi Parçanı Düzenle</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-sand rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Real 3D Preview */}
                    <div className="aspect-square bg-[#F5F5F3] relative overflow-hidden group">
                        <ProductStage>
                            <ConfigurableModel
                                fabricColor={configurationData[0].options.find(o => o.id === selections.fabric)?.color}
                                legColor={configurationData[1].options.find(o => o.id === selections.legs)?.color}
                                armrestType={selections.armrest}
                            />
                        </ProductStage>

                        <div className="absolute top-6 left-6 z-20">
                            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-charcoal/40 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full">3D Canlı Atölye</span>
                        </div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            <button className="p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-colors"><Share2 size={16} /></button>
                            <button className="p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-colors"><Info size={16} /></button>
                        </div>
                    </div>

                    {/* Options Selection */}
                    <div className="p-8 space-y-10">
                        {configurationData.map((feature) => (
                            <div key={feature.id}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-charcoal">{feature.name}</h3>
                                    <span className="text-[10px] font-sans text-warm-gray">
                                        {feature.options.find(o => o.id === selections[feature.id])?.name}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {feature.options.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => setSelections(prev => ({ ...prev, [feature.id]: option.id }))}
                                            className={`px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-3 ${selections[feature.id] === option.id
                                                ? 'border-gold bg-gold/5'
                                                : 'border-sand hover:border-warm-gray-light'
                                                }`}
                                        >
                                            {option.color && (
                                                <div
                                                    className="w-4 h-4 rounded-full border border-black/10 shadow-inner"
                                                    style={{ backgroundColor: option.color }}
                                                />
                                            )}
                                            <div className="text-left">
                                                <p className="text-xs font-sans font-bold text-charcoal">{option.name}</p>
                                                {option.priceModifier > 0 && (
                                                    <p className="text-[10px] font-sans text-gold">+{formatPrice(option.priceModifier)}</p>
                                                )}
                                            </div>
                                            {selections[feature.id] === option.id && <Check size={14} className="text-gold" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-border bg-sand/20">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-sm font-sans font-bold uppercase tracking-widest text-warm-gray">Toplam Fiyat</span>
                        <motion.span
                            key={calculateTotalPrice()}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-2xl font-sans font-bold text-charcoal"
                        >
                            {formatPrice(calculateTotalPrice())}
                        </motion.span>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex-1 bg-charcoal text-white py-4 rounded-2xl font-sans font-bold tracking-widest uppercase hover:bg-black transition-all">
                            Konfigürasyonu Kaydet
                        </button>
                    </div>
                    <p className="text-center text-[10px] font-sans text-warm-gray-light mt-4 uppercase tracking-tighter">
                        Teslimat Süresi: *Bu özel konfigürasyon 4-6 hafta içinde üretilir.*
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

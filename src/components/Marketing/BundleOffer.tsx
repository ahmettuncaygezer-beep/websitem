'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShoppingBag } from 'lucide-react';
import { useGlobal } from '@/context/GlobalContext';

export interface BundleProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    href: string;
    isMain?: boolean;
}

interface BundleOfferProps {
    mainProduct: BundleProduct;
    relatedProducts: BundleProduct[];
    bundleDiscount?: number; // toplam indirim tutarı
}

function AnimatedPrice({ value }: { value: number }) {
    const { formatPrice } = useGlobal();
    return (
        <motion.span
            key={value}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="tabular-nums"
        >
            {formatPrice(value)}
        </motion.span>
    );
}

export default function BundleOffer({ mainProduct, relatedProducts, bundleDiscount = 0 }: BundleOfferProps) {
    const { formatPrice, t } = useGlobal();
    const allProducts = [mainProduct, ...relatedProducts];
    const [selected, setSelected] = useState<Set<string>>(
        new Set(allProducts.map(p => p.id))
    );

    const total = allProducts
        .filter(p => selected.has(p.id))
        .reduce((sum, p) => sum + p.price, 0);

    const selectedCount = selected.size;
    const hasAll = selectedCount === allProducts.length;
    const hasSavings = hasAll && bundleDiscount > 0;

    const toggle = (id: string) => {
        if (id === mainProduct.id) return; // ana ürün her zaman seçili
        setSelected(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handleAddAll = () => {
        console.log('Bundle sepete eklendi:', Array.from(selected));
    };

    return (
        <div className="bg-[#F5F0EB] dark:bg-card rounded-sm p-5 border border-[#E8E3DC] dark:border-border transition-colors">
            {/* Başlık */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p data-lang-key="bundle_offer_title" className="text-[10px] text-[#C9A96E] tracking-[0.25em] uppercase font-medium mb-0.5">
                        {t('bundle_offer_title')}
                    </p>
                    <h3 data-lang-key="bundle_complete_collection" className="font-bold text-[#1C1C1E] dark:text-foreground text-base"
                        style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                        {t('bundle_complete_collection')}
                    </h3>
                </div>
                {!hasAll && (
                    <button
                        onClick={() => setSelected(new Set(allProducts.map(p => p.id)))}
                        className="text-[11px] text-[#C9A96E] font-medium hover:underline"
                    >
                        <span data-lang-key="bundle_select_all">{t('bundle_select_all')}</span>
                    </button>
                )}
            </div>

            {/* Ürün satırı */}
            <div className="flex items-center gap-2 flex-wrap">
                {allProducts.map((product, idx) => (
                    <div key={product.id} className="flex items-center gap-2">
                        {/* Ürün kartı */}
                        <motion.div
                            animate={{
                                borderColor: selected.has(product.id) ? '#C9A96E' : '#E8E3DC',
                                opacity: selected.has(product.id) ? 1 : 0.5,
                            }}
                            transition={{ duration: 0.2 }}
                            className="relative bg-white dark:bg-muted border-2 rounded-sm overflow-hidden cursor-pointer group"
                            style={{ width: 96, flexShrink: 0 }}
                            onClick={() => toggle(product.id)}
                        >
                            <div className="relative h-20 bg-[#E8E3DC] dark:bg-card">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="96px"
                                    className="object-cover"
                                />
                            </div>

                            {product.isMain && (
                                <div data-lang-key="bundle_this_product" className="absolute top-1 left-1 bg-[#1C1C1E] text-white text-[8px] px-1.5 py-0.5 rounded-sm font-medium">
                                    {t('bundle_this_product')}
                                </div>
                            )}

                            {!product.isMain && (
                                <div className="absolute top-1 right-1">
                                    <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${selected.has(product.id) ? 'bg-[#C9A96E] border-[#C9A96E]' : 'bg-white border-[#ccc]'}`}>
                                        {selected.has(product.id) && (
                                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="p-1.5">
                                <p className="text-[10px] text-[#1C1C1E] dark:text-foreground font-medium leading-tight line-clamp-1">
                                    {product.name}
                                </p>
                                <p className="text-[11px] text-[#C9A96E] font-bold mt-0.5">
                                    {formatPrice(product.price)}
                                </p>
                            </div>
                        </motion.div>

                        {idx < allProducts.length - 1 && (
                            <div className="w-6 h-6 rounded-full bg-white dark:bg-muted border border-[#E8E3DC] dark:border-border flex items-center justify-center flex-shrink-0">
                                <Plus className="w-3 h-3 text-[#666] dark:text-muted-foreground" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Toplam + CTA */}
            <div className="mt-4 pt-4 border-t border-[#E8E3DC] dark:border-border">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <p className="text-[12px] text-[#666] dark:text-muted-foreground">
                            <span data-lang-key="bundle_selected">{t('bundle_selected')}</span> <span className="font-semibold text-[#1C1C1E] dark:text-foreground">{selectedCount} <span data-lang-key="bundle_products">{t('bundle_products')}</span></span>
                        </p>
                        <div className="text-xl font-bold text-[#1C1C1E] dark:text-foreground">
                            <AnimatePresence mode="wait">
                                <AnimatedPrice value={hasSavings ? (total - bundleDiscount) : total} />
                            </AnimatePresence>
                        </div>
                    </div>

                    <AnimatePresence>
                        {hasSavings && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="text-right"
                            >
                                <p className="text-[10px] text-[#666] dark:text-muted-foreground line-through">{formatPrice(total)}</p>
                                <p className="text-[11px] text-green-600 dark:text-green-400 font-semibold">
                                    <span data-lang-key="bundle_deal">{t('bundle_deal')}:</span> {formatPrice(total - bundleDiscount)}
                                </p>
                                <p className="text-[10px] text-green-600 dark:text-green-500">
                                    {formatPrice(bundleDiscount)} <span data-lang-key="bundle_savings">{t('bundle_savings')}</span>
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddAll}
                    disabled={selectedCount === 0}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#C9A96E] text-white font-semibold text-[13px] rounded-sm hover:bg-[#B8915A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <ShoppingBag className="w-4 h-4" />
                    <span data-lang-key="bundle_add_all_cart">{t('bundle_add_all_cart')}</span>
                </motion.button>
            </div>
        </div>
    );
}

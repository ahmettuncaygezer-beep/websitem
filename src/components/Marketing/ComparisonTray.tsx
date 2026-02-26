'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, BarChart2 } from 'lucide-react';
import { useComparisonStore } from '@/store/comparisonStore';

export default function ComparisonTray() {
    const { products, remove, clear } = useComparisonStore();
    const count = products.length;
    const isVisible = count > 0;
    const canCompare = count >= 2;

    // 4 slot
    const slots = Array.from({ length: 4 }, (_, i) => products[i] ?? null);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t-2 border-[#C9A96E] shadow-2xl"
                    aria-label="Karşılaştırma tepsisi"
                >
                    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
                        {/* Sol: başlık */}
                        <div className="hidden sm:flex items-center gap-2 min-w-max">
                            <BarChart2 className="w-4 h-4 text-[#C9A96E]" />
                            <div>
                                <p className="text-[11px] text-[#666] leading-none">Karşılaştırma Tepsisi</p>
                                <p className="text-[12px] font-bold text-[#1C1C1E]">{count}/4 Ürün</p>
                            </div>
                        </div>

                        <div className="w-px h-10 bg-[#E8E3DC] hidden sm:block" />

                        {/* Ürün slotları */}
                        <div className="flex-1 flex items-center gap-3">
                            {slots.map((product, i) => (
                                <div
                                    key={product?.id ?? `slot-${i}`}
                                    className={`relative flex-1 h-14 rounded-sm overflow-hidden flex items-center justify-center
                    ${product ? 'bg-[#F5F0EB]' : 'border-2 border-dashed border-[#E8E3DC] bg-white'}`}
                                >
                                    {product ? (
                                        <>
                                            <div className="relative w-10 h-10 flex-shrink-0 ml-2">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    sizes="40px"
                                                    className="object-cover rounded-sm"
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                />
                                            </div>
                                            <div className="flex-1 px-2 min-w-0">
                                                <p className="text-[11px] text-[#1C1C1E] font-medium truncate leading-tight">
                                                    {product.name}
                                                </p>
                                                <p className="text-[11px] text-[#C9A96E] font-bold">
                                                    ₺{product.price.toLocaleString('tr-TR')}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => remove(product.id)}
                                                className="absolute top-1 right-1 w-4 h-4 bg-[#1C1C1E] rounded-full flex items-center justify-center hover:bg-[#E53935] transition-colors"
                                                aria-label={`${product.name} kaldır`}
                                            >
                                                <X className="w-2.5 h-2.5 text-white" />
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-[10px] text-[#ccc]">Boş Slot</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Sağ: Aksiyonlar */}
                        <div className="flex items-center gap-2 min-w-max">
                            <button
                                onClick={clear}
                                className="text-[11px] text-[#999] hover:text-[#E53935] transition-colors"
                            >
                                Temizle
                            </button>
                            <Link
                                href="/karsilastir"
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-sm text-[12px] font-bold transition-all ${canCompare
                                        ? 'bg-[#C9A96E] text-white hover:bg-[#B8915A]'
                                        : 'bg-[#E8E3DC] text-[#999] cursor-not-allowed pointer-events-none'
                                    }`}
                                aria-disabled={!canCompare}
                            >
                                Karşılaştır
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

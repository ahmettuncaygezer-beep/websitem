'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, X, Star } from 'lucide-react';
import { useComparisonStore, type ComparisonProduct } from '@/store/comparisonStore';
import { formatPrice } from '@/lib/constants';

const SPEC_LABELS: { key: keyof NonNullable<ComparisonProduct['specs']>; label: string }[] = [
    { key: 'dimensions', label: 'Boyutlar' },
    { key: 'material', label: 'Malzeme' },
    { key: 'warranty', label: 'Garanti Süresi' },
    { key: 'delivery', label: 'Kargo Süresi' },
    { key: 'inStock', label: 'Stok Durumu' },
    { key: 'origin', label: 'Üretim Yeri' },
    { key: 'fabricType', label: 'Kumaş Türü' },
    { key: 'loadCapacity', label: 'Yük Kapasitesi' },
    { key: 'rating', label: 'Kullanıcı Puanı' },
    { key: 'ratingCount', label: 'Değerlendirme' },
];

function formatSpec(key: string, value: unknown): React.ReactNode {
    if (value === undefined || value === null) return <span className="text-[#ccc]">—</span>;
    if (key === 'inStock') return value ? (
        <span className="text-green-600 font-semibold">Stokta Var</span>
    ) : (
        <span className="text-red-500 font-semibold">Stokta Yok</span>
    );
    if (key === 'colors' && Array.isArray(value)) return (
        <div className="flex gap-1 flex-wrap">
            {(value as string[]).map((c, i) => (
                <span key={i} className="text-[11px] bg-[#F5F0EB] px-1.5 py-0.5 rounded-sm">{c}</span>
            ))}
        </div>
    );
    if (key === 'rating') return (
        <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-[#C9A96E] fill-[#C9A96E]" />
            <span className="font-semibold">{String(value)}</span>
        </div>
    );
    return <span>{String(value)}</span>;
}

function getBestValue(key: string, products: ComparisonProduct[]): Set<string> {
    const best = new Set<string>();
    if (key === 'price') {
        const minPrice = Math.min(...products.map(p => p.price));
        products.forEach(p => { if (p.price === minPrice) best.add(p.id); });
    }
    if (key === 'warranty') {
        // En uzun garanti en iyi
        const vals = products.map(p => parseInt(String(p.specs?.warranty ?? '0')));
        const max = Math.max(...vals);
        products.forEach((p, i) => { if (vals[i] === max && max > 0) best.add(p.id); });
    }
    if (key === 'rating') {
        const vals = products.map(p => p.specs?.rating ?? 0);
        const max = Math.max(...vals);
        products.forEach((p, i) => { if (vals[i] === max && max > 0) best.add(p.id); });
    }
    return best;
}

export default function ComparisonTable({ products }: { products: ComparisonProduct[] }) {
    const { remove } = useComparisonStore();

    if (products.length === 0) return (
        <div className="text-center py-20 text-[#666]">
            <p className="text-lg">Henüz ürün eklenmedi.</p>
            <Link href="/" className="text-[#C9A96E] font-medium hover:underline mt-2 inline-block">
                ← Ürünlere Dön
            </Link>
        </div>
    );

    const priceBest = getBestValue('price', products);

    return (
        <div className="overflow-x-auto -mx-4 md:mx-0">
            <table className="w-full min-w-[480px] border-collapse">
                {/* Ürün başlıkları */}
                <thead>
                    <tr>
                        {/* Özellik sütunu */}
                        <th className="w-36 md:w-48 sticky left-0 bg-white z-10 border-b-2 border-[#E8E3DC] p-3 text-left">
                            <span className="text-[11px] text-[#999] uppercase tracking-wider">Özellik</span>
                        </th>
                        {products.map(product => (
                            <th key={product.id} className="border-b-2 border-[#E8E3DC] p-3 text-center min-w-[180px]">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div className="relative w-24 h-24 rounded-sm overflow-hidden bg-[#F5F0EB] mx-auto">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="96px"
                                            className="object-cover"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-[#C9A96E] uppercase tracking-wider">{product.brand}</span>
                                    <span className="text-sm font-bold text-[#1C1C1E] text-center leading-tight"
                                        style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                                        {product.name}
                                    </span>
                                    <span className={`text-base font-bold ${priceBest.has(product.id) ? 'text-[#C9A96E]' : 'text-[#1C1C1E]'}`}>
                                        {formatPrice(product.price)}
                                    </span>
                                    <div className="flex gap-2">
                                        <Link
                                            href={product.href}
                                            className="flex items-center gap-1 px-3 py-1.5 bg-[#C9A96E] text-white text-[11px] font-semibold rounded-sm hover:bg-[#B8915A] transition-colors"
                                        >
                                            <ShoppingBag className="w-3 h-3" /> Sepete Ekle
                                        </Link>
                                        <button
                                            onClick={() => remove(product.id)}
                                            className="px-2 py-1.5 border border-[#E8E3DC] rounded-sm text-[11px] text-[#666] hover:border-[#E53935] hover:text-[#E53935] transition-colors"
                                            title="Kaldır"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                </motion.div>
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Özellik satırları */}
                <tbody>
                    {SPEC_LABELS.map(({ key, label }, rowIdx) => {
                        const best = getBestValue(key, products);
                        const values = products.map(p => p.specs?.[key]);
                        const allSame = values.every(v => String(v) === String(values[0]));

                        return (
                            <tr key={key} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}>
                                <td className="sticky left-0 bg-inherit z-10 border-b border-[#F0EBE3] p-3 text-[12px] text-[#666] font-medium">
                                    {label}
                                </td>
                                {products.map(product => {
                                    const val = product.specs?.[key];
                                    const isBest = best.has(product.id) && !allSame;
                                    return (
                                        <td
                                            key={product.id}
                                            className={`border-b border-[#F0EBE3] p-3 text-center text-[12px] transition-colors ${isBest && (key as string) !== 'price' ? 'bg-green-50' : ''
                                                } ${isBest && (key as string) === 'price' ? 'bg-amber-50' : ''}`}
                                        >
                                            <div className="flex justify-center">
                                                {formatSpec(key, val)}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

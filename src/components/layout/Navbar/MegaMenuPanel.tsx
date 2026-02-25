'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { NavCategory } from './navbar.types';
import { useGlobal } from '@/context/GlobalContext';

interface MegaMenuPanelProps {
    category: NavCategory;
    onClose: () => void;
}

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
    const [showTip, setShowTip] = useState(false);
    return (
        <div className="relative" onMouseEnter={() => setShowTip(true)} onMouseLeave={() => setShowTip(false)}>
            <button
                className="w-4 h-4 rounded-full border border-black/10 hover:scale-110 transition-transform duration-150"
                style={{ background: hex }}
                aria-label={name}
            />
            {showTip && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-white bg-[#1C1C1E] px-1.5 py-0.5 rounded pointer-events-none z-10">
                    {name}
                </span>
            )}
        </div>
    );
}

export function MegaMenuPanel({ category, onClose }: MegaMenuPanelProps) {
    useGlobal();
    const product = category.featuredProduct;

    return (
        <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex gap-8">

                {/* ── LEFT: Sub-categories (compact) ── */}
                <div className="w-[36%] shrink-0 space-y-5">
                    {category.subCategories.map((section) => (
                        <div key={section.title}>
                            <p
                                className="uppercase font-bold mb-2"
                                style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#C9A96E' }}
                            >
                                {section.title}
                            </p>
                            <motion.ul
                                initial="hidden"
                                animate="show"
                                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
                            >
                                {section.items.map((item) => (
                                    <motion.li
                                        key={item.href}
                                        variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={onClose}
                                            className="group flex items-center gap-1.5 py-1 text-[13px] transition-all duration-150"
                                            style={{ color: 'rgba(28,28,30,0.7)' }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLElement).style.color = '#C9A96E';
                                                (e.currentTarget as HTMLElement).style.paddingLeft = '8px';
                                                (e.currentTarget as HTMLElement).style.borderLeft = '2px solid #C9A96E';
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLElement).style.color = 'rgba(28,28,30,0.7)';
                                                (e.currentTarget as HTMLElement).style.paddingLeft = '0';
                                                (e.currentTarget as HTMLElement).style.borderLeft = 'none';
                                            }}
                                        >
                                            <span className="text-[#C9A96E] group-hover:translate-x-1 transition-transform text-xs" aria-hidden="true">→</span>
                                            {item.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                    ))}
                </div>

                {/* ── RIGHT: Featured product (compact) ── */}
                <div className="flex-1 flex flex-col gap-3">
                    <Link
                        href={product.href}
                        onClick={onClose}
                        className="group flex gap-4 rounded-sm border overflow-hidden p-3 transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                        style={{ borderColor: '#E8E3DC' }}
                    >
                        {/* Thumbnail — compact 80×80 */}
                        <div
                            className="relative shrink-0 rounded-sm overflow-hidden"
                            style={{ width: 80, height: 80, background: 'linear-gradient(135deg, #F5F0EB, #E8E3DC)' }}
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-[400ms]"
                                sizes="80px"
                                priority={false}
                                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                            />
                            {product.badge && (
                                <span
                                    className="absolute top-1 left-1 text-white text-[9px] font-bold px-1.5 py-0.5 leading-none"
                                    style={{ background: '#C9A96E' }}
                                >
                                    {product.badge}
                                </span>
                            )}
                        </div>

                        {/* Text */}
                        <div className="flex flex-col justify-center gap-1">
                            <span className="text-[10px] uppercase tracking-wider" style={{ color: '#999' }}>{product.brand}</span>
                            <h3 className="text-sm font-medium leading-snug" style={{ color: '#1C1C1E' }}>{product.name}</h3>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm" style={{ color: '#1C1C1E' }}>₺{product.price.toLocaleString('tr-TR')}</span>
                                {product.originalPrice && (
                                    <span className="text-xs line-through" style={{ color: '#bbb' }}>₺{product.originalPrice.toLocaleString('tr-TR')}</span>
                                )}
                            </div>
                            <span className="flex items-center gap-1 text-[11px] font-semibold border-b pb-0.5 w-fit transition-all duration-200 group-hover:tracking-widest"
                                style={{ color: '#C9A96E', borderColor: '#C9A96E' }}>
                                Ürünü İncele <ArrowRight size={9} />
                            </span>
                        </div>
                    </Link>

                    {/* Editorial + swatches */}
                    {(category.editorialText || category.colors) && (
                        <div className="flex items-center justify-between">
                            {category.editorialText && (
                                <p className="text-xs italic" style={{ color: '#999' }}>{category.editorialText}</p>
                            )}
                            {category.colors && (
                                <div className="flex items-center gap-1.5">
                                    {category.colors.map((c) => <ColorSwatch key={c.name} name={c.name} hex={c.hex} />)}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Bottom promo strip ── */}
            {category.promotionText && (
                <div
                    className="mt-5 -mx-6 -mb-5 px-6 py-2.5 flex items-center justify-between"
                    style={{ background: '#F5F0EB', borderTop: '1px solid #EDE8E1' }}
                >
                    <p className="text-[11px]" style={{ color: '#1C1C1E' }}>
                        {category.promotionText}
                    </p>
                    <Link
                        href="/kampanyalar"
                        onClick={onClose}
                        className="text-[11px] font-semibold hover:underline whitespace-nowrap ml-4"
                        style={{ color: '#C9A96E' }}
                    >
                        Tüm Kampanyaları Gör →
                    </Link>
                </div>
            )}
        </div>
    );
}

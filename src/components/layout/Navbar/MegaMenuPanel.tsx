import { useState, memo, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import type { NavCategory } from './navbar.types';
import { useGlobal } from '@/context/GlobalContext';

interface MegaMenuPanelProps {
    category: NavCategory;
    onClose: () => void;
}

export const MegaMenuPanel = memo(function MegaMenuPanel({ category, onClose }: MegaMenuPanelProps) {
    const { formatPrice, t } = useGlobal();
    const product = category.featuredProduct;

    // Memoize variants to avoid recreation on every render
    const itemVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    }), []);

    return (
        <div className="w-full px-4 py-3 bg-transparent transition-colors duration-300">
            <div className="grid grid-cols-12 gap-4 mx-auto">

                {/* ── LEFT: Lifestyle Visual (The "Look") ── */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                    className="col-span-2 relative group overflow-hidden aspect-[3/4] shadow-sm border border-[#E5D5BC]/20 dark:border-white/5 rounded-xl"
                >
                    <Image
                        src={`/images/categories/${category.id === 'oturma-odasi' ? 'living-room' :
                            category.id === 'yatak-odasi' ? 'bedroom' :
                                category.id === 'yemek-odasi' ? 'dining' :
                                    category.id === 'aydinlatma' ? 'lighting' :
                                        category.id === 'dekorasyon' ? 'decor' :
                                            category.id === 'calisma-odasi' ? 'office' : category.id}.jpg`}
                        alt={`${category.label} Lookbook`}
                        fill
                        className="object-cover transition-transform duration-[3000ms] group-hover:scale-105"
                        onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.src = product.image;
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 to-transparent" />
                    <div className="absolute bottom-2 left-2">
                        <p className="text-white/80 text-[6px] uppercase font-bold tracking-[0.2em] mb-0.5">Heritage Look</p>
                        <h4 className="text-white text-[15px] font-serif italic leading-tight" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                            {category.label}
                        </h4>
                    </div>
                </motion.div>

                {/* ── MIDDLE: Sub-categories ── */}
                <div className="col-span-8 grid grid-cols-3 gap-4">
                    {category.subCategories.map((section, idx) => (
                        <div key={section.title} className="flex flex-col">
                            <motion.h5
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                className="font-serif italic text-base mb-2 border-b border-[#E5D5BC]/20 dark:border-white/10 pb-1 text-[#1A1A1A] dark:text-white"
                                style={{ fontFamily: '"Cormorant Garamond", serif' }}
                                data-lang-key={section.dataKey}
                            >
                                {section.title}
                            </motion.h5>
                            <motion.ul
                                initial="hidden"
                                animate="show"
                                transition={{ staggerChildren: 0.02, delayChildren: 0.1 + (0.1 * idx) }}
                                className="space-y-1"
                            >
                                {section.items.map((item) => (
                                    <motion.li
                                        key={item.href}
                                        variants={itemVariants}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={onClose}
                                            className="group flex items-center text-[15px] transition-colors duration-300 text-muted-foreground/80 dark:text-white/80 hover:text-[#C9A96E] dark:hover:text-[#C9A96E]"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform duration-300 font-medium" data-lang-key={item.dataKey}>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                    ))}
                </div>

                {/* ── RIGHT: Featured Piece ── */}
                <div className="col-span-2 border-l border-[#E5D5BC]/20 dark:border-white/5 pl-4">
                    <div className="flex flex-col h-full justify-between pb-1">
                        <div>
                            <p className="text-[5px] uppercase font-bold tracking-[0.2em] text-[#C9A96E] mb-2">
                                Signature Piece
                            </p>
                            <Link
                                href={product.href}
                                onClick={onClose}
                                className="group block"
                            >
                                <div className="relative aspect-[5/6] overflow-hidden mb-2.5 shadow-sm border border-[#E5D5BC]/10 dark:border-white/5 rounded-xl">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                                    />
                                </div>
                                <div className="space-y-0">
                                    <h3 className="text-xs font-serif italic text-[#1A1A1A] dark:text-white group-hover:text-[#C9A96E] transition-colors leading-tight" style={{ fontFamily: '"Cormorant Garamond", serif' }} data-lang-key={product.nameKey}>
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[11px] font-medium text-[#4A4A4A] dark:text-white/70">{formatPrice(product.price)}</span>
                                    </div>
                                    <div className="pt-0.5">
                                        <span className="text-[7px] uppercase tracking-widest font-bold border-b border-[#C9A96E] pb-0.5 text-[#C9A96E]">Shop Selection</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

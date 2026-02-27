import { useState, memo, useMemo } from 'react';
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

const ColorSwatch = memo(function ColorSwatch({ name, hex }: { name: string; hex: string }) {
    const [showTip, setShowTip] = useState(false);
    return (
        <div className="relative" onMouseEnter={() => setShowTip(true)} onMouseLeave={() => setShowTip(false)}>
            <button
                className="w-4 h-4 rounded-full border border-black/10 hover:scale-110 transition-transform duration-150"
                style={{ background: hex }}
                aria-label={name}
            />
            {showTip && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-white bg-black/90 px-1.5 py-0.5 rounded pointer-events-none z-10 backdrop-blur-sm">
                    {name}
                </span>
            )}
        </div>
    );
});

export const MegaMenuPanel = memo(function MegaMenuPanel({ category, onClose }: MegaMenuPanelProps) {
    const { formatPrice } = useGlobal();
    const product = category.featuredProduct;

    // Memoize variants to avoid recreation on every render
    const itemVariants = useMemo(() => ({
        hidden: { opacity: 0, x: -5 },
        show: { opacity: 1, x: 0 }
    }), []);

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
                                data-lang-key={section.dataKey}
                            >
                                {section.title}
                            </p>
                            <motion.ul
                                initial="hidden"
                                animate="show"
                                transition={{ staggerChildren: 0.02 }}
                            >
                                {section.items.map((item) => (
                                    <motion.li
                                        key={item.href}
                                        variants={itemVariants}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={onClose}
                                            className="group flex items-center gap-1.5 py-1 text-[13px] transition-all duration-300"
                                            style={{ color: 'var(--foreground)', opacity: 0.7 }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLElement).style.color = 'var(--maison-gold)';
                                                (e.currentTarget as HTMLElement).style.opacity = '1';
                                                (e.currentTarget as HTMLElement).style.paddingLeft = '8px';
                                                (e.currentTarget as HTMLElement).style.borderLeft = '2px solid var(--maison-gold)';
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLElement).style.color = 'var(--foreground)';
                                                (e.currentTarget as HTMLElement).style.opacity = '0.7';
                                                (e.currentTarget as HTMLElement).style.paddingLeft = '0';
                                                (e.currentTarget as HTMLElement).style.borderLeft = 'none';
                                            }}
                                        >
                                            <span className="text-[#C9A96E] group-hover:translate-x-1 transition-transform text-xs" aria-hidden="true">→</span>
                                            <span data-lang-key={item.dataKey}>{item.label}</span>
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
                        className="group flex gap-4 rounded-xl border overflow-hidden p-3 transition-all duration-300 hover:shadow-maison-card-hover bg-background/50"
                        style={{ borderColor: 'var(--glass-border)' }}
                    >
                        {/* Thumbnail — compact 80×80 */}
                        <div
                            className="relative shrink-0 rounded-lg overflow-hidden"
                            style={{ width: 80, height: 80, background: 'linear-gradient(135deg, var(--muted), var(--border))' }}
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
                                    className="absolute top-1 left-1 text-black text-[9px] font-bold px-1.5 py-0.5 leading-none rounded-sm"
                                    style={{ background: 'var(--maison-gold)' }}
                                    data-lang-key={product.badgeKey}
                                >
                                    {product.badge}
                                </span>
                            )}
                        </div>

                        {/* Text */}
                        <div className="flex flex-col justify-center gap-1">
                            <span className="text-[10px] uppercase tracking-wider opacity-60" style={{ color: 'var(--foreground)' }} data-lang-key={product.brandKey}>{product.brand}</span>
                            <h3 className="text-sm font-medium leading-snug" style={{ color: 'var(--foreground)' }} data-lang-key={product.nameKey}>{product.name}</h3>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>{formatPrice(product.price)}</span>
                                {product.originalPrice && (
                                    <span className="text-xs line-through opacity-50 transition-opacity" style={{ color: 'var(--foreground)' }}>{formatPrice(product.originalPrice)}</span>
                                )}
                            </div>
                            <span className="flex items-center gap-1 text-[11px] font-semibold border-b pb-0.5 w-fit transition-all duration-300 group-hover:tracking-widest"
                                style={{ color: 'var(--maison-gold)', borderColor: 'var(--maison-gold)' }}>
                                <span data-lang-key="mega_nav_view_product">Ürünü İncele</span> <ArrowRight size={9} />
                            </span>
                        </div>
                    </Link>

                    {/* Editorial + swatches */}
                    {(category.editorialText || category.colors) && (
                        <div className="flex items-center justify-between">
                            {category.editorialText && (
                                <p className="text-xs italic" style={{ color: 'var(--muted-foreground)' }} data-lang-key={category.editorialTextKey}>{category.editorialText}</p>
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
                    style={{ background: 'var(--muted)', borderTop: '1px solid var(--glass-border)' }}
                >
                    <p className="text-[11px]" style={{ color: 'var(--foreground)' }} data-lang-key={category.promotionTextKey}>
                        {category.promotionText}
                    </p>
                    <Link
                        href="/kampanyalar"
                        onClick={onClose}
                        className="text-[11px] font-semibold hover:underline whitespace-nowrap ml-4 flex items-center gap-1"
                        style={{ color: 'var(--maison-gold)' }}
                    >
                        <span data-lang-key="mega_nav_view_campaigns">Tüm Kampanyaları Gör →</span>
                    </Link>
                </div>
            )}
        </div>
    );
});

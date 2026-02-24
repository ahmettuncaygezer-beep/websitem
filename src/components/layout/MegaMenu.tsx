'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { NavItem } from '@/types';

interface MegaMenuProps {
    item: NavItem;
    onClose: () => void;
}

export function MegaMenu({ item, onClose }: MegaMenuProps) {
    if (!item.children) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full"
        >
            <div className="container-premium py-10">
                <div className="grid grid-cols-12 gap-8">
                    {/* Category columns */}
                    <div className="col-span-8">
                        <div className="grid grid-cols-3 gap-8">
                            {item.children.map((category) => (
                                <div key={category.title}>
                                    <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-gold mb-4">
                                        {category.title}
                                    </h4>
                                    <ul className="space-y-2.5">
                                        {category.items.map((subItem) => (
                                            <li key={subItem.href}>
                                                <Link
                                                    href={subItem.href}
                                                    onClick={onClose}
                                                    className="text-sm font-sans text-warm-gray hover:text-charcoal transition-colors duration-300 flex items-center group"
                                                >
                                                    <span>{subItem.label}</span>
                                                    <ArrowRight
                                                        size={12}
                                                        className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                                                    />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* CTA buttons */}
                        <div className="flex gap-4 mt-8 pt-6 border-t border-border">
                            <Link
                                href={`${item.href}?filter=new`}
                                onClick={onClose}
                                className="text-xs font-sans font-semibold uppercase tracking-widest text-gold hover:text-gold-dark transition-colors"
                            >
                                Yeni Gelenler →
                            </Link>
                            <Link
                                href={`${item.href}?filter=featured`}
                                onClick={onClose}
                                className="text-xs font-sans font-semibold uppercase tracking-widest text-gold hover:text-gold-dark transition-colors"
                            >
                                Lüks Koleksiyon →
                            </Link>
                        </div>
                    </div>

                    {/* Featured image */}
                    <div className="col-span-4">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sand">
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-white font-serif text-xl mb-2">
                                    {item.label} Koleksiyonu
                                </p>
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className="text-white/90 text-xs font-sans uppercase tracking-widest hover:text-white transition-colors inline-flex items-center gap-1"
                                >
                                    Keşfet <ArrowRight size={12} />
                                </Link>
                            </div>
                            {/* Placeholder color block — will be replaced with real images */}
                            <div className="absolute inset-0 bg-gradient-to-br from-sand-dark to-linen -z-10" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

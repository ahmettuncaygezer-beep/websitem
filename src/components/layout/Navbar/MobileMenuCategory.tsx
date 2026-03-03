'use client';

import { useState, memo } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NavCategory } from './navbar.types';

interface MobileMenuCategoryProps {
    category: NavCategory;
    onClose: () => void;
}

export const MobileMenuCategory = memo(function MobileMenuCategory({ category, onClose }: MobileMenuCategoryProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            {/* Category header */}
            <button
                className="flex items-center justify-between w-full py-4 text-left"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="text-[18px] font-medium text-white" data-lang-key={category.dataKey}>{category.label}</span>
                <Plus
                    size={20}
                    className="text-white/60 transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                />
            </button>

            {/* Accordion sub-items */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="pb-3">
                            {category.subCategories.flatMap((section) =>
                                section.items.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={onClose}
                                        className="flex items-center gap-2 py-2.5 pl-4 text-[14px] transition-colors duration-150"
                                        style={{ color: 'rgba(255,255,255,0.6)' }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLElement).style.color = '#C9A96E';
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                                        }}
                                    >
                                        <span className="text-white/30" aria-hidden="true">–</span>
                                        <span data-lang-key={item.dataKey}>{item.label}</span>
                                    </Link>
                                ))
                            )}

                            {/* View all link */}
                            <Link
                                href={category.href}
                                onClick={onClose}
                                className="flex items-center gap-2 py-2.5 pl-4 text-[13px] font-medium mt-1"
                                style={{ color: '#C9A96E' }}
                            >
                                <span data-lang-key="common_view_all_arrow">Tümünü Gör →</span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

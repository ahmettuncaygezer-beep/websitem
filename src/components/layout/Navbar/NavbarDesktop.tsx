import React, { memo, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { NavCategory } from './navbar.types';
import { MegaMenu } from './MegaMenu';
import { useGlobal } from '@/context/GlobalContext';

interface NavbarDesktopProps {
    categories: NavCategory[];
    isScrolled: boolean;
    activeCategoryId: string | null;
    onCategoryEnter: (id: string) => void;
    onCategoryLeave: () => void;
    onMegaMenuEnter?: () => void;
    onMegaMenuClose?: () => void;
}

export const NavbarDesktop = memo(function NavbarDesktop({
    categories,
    isScrolled,
    activeCategoryId,
    onCategoryEnter,
    onCategoryLeave,
    onMegaMenuEnter,
    onMegaMenuClose,
}: NavbarDesktopProps) {
    const pathname = usePathname();
    const { t } = useGlobal();
    const goldColor = '#C9A96E';

    return (
        <nav
            className="flex items-center gap-2"
            role="navigation"
        >
            {categories.map((cat, index) => {
                const isActive = activeCategoryId === cat.id || pathname.startsWith(cat.href);
                const label = cat.dataKey ? t(cat.dataKey) : cat.label;

                return (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{
                            type: 'spring',
                            damping: 25,
                            stiffness: 300,
                            delay: index * 0.05
                        }}
                    >
                        <CategoryLink
                            cat={cat}
                            label={label}
                            isActive={isActive}
                            isScrolled={isScrolled}
                            goldColor={goldColor}
                            onEnter={() => onCategoryEnter(cat.id)}
                            onLeave={onCategoryLeave}
                            activeCategoryId={activeCategoryId}
                            onMegaMenuEnter={onMegaMenuEnter}
                            onMegaMenuClose={onMegaMenuClose}
                        />
                    </motion.div>
                );
            })}
        </nav>
    );
});

interface CategoryLinkProps {
    cat: NavCategory;
    label: string;
    isActive: boolean;
    isScrolled: boolean;
    goldColor: string;
    onEnter: () => void;
    onLeave: () => void;
    activeCategoryId: string | null;
    onMegaMenuEnter?: () => void;
    onMegaMenuClose?: () => void;
}

const CategoryLink = ({ cat, label, isActive, isScrolled, goldColor, onEnter, onLeave, activeCategoryId, onMegaMenuEnter, onMegaMenuClose }: CategoryLinkProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative flex items-center group cursor-pointer px-5 py-2 rounded-full transition-all duration-500 hover:bg-black/5 dark:hover:bg-white/10"
            onMouseEnter={() => {
                setIsHovered(true);
                onEnter();
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                onLeave();
            }}
        >
            <Link
                href={cat.href}
                className="relative block"
            >
                <span
                    className="block text-[17px] tracking-wide transition-all duration-500 dark:text-white"
                    style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontWeight: isActive || isHovered ? 600 : 500,
                        color: isActive ? goldColor : undefined,
                        fontStyle: 'italic'
                    }}
                >
                    {label}
                </span>

                {/* Micro Node Indicator */}
                <AnimatePresence>
                    {(isActive || isHovered) && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                            style={{ backgroundColor: goldColor }}
                        />
                    )}
                </AnimatePresence>
            </Link>

            <MegaMenu
                activeCategory={activeCategoryId === cat.id ? cat : null}
                onClose={onMegaMenuClose || (() => { })}
                onMouseEnter={onMegaMenuEnter || (() => { })}
                onMouseLeave={onLeave}
                position="center"
            />
        </div>
    );
};

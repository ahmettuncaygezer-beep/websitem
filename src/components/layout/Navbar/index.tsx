'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Menu, Search, X, Heart, User, ShoppingBag, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useNavbarScroll } from './useNavbarScroll';
import { NavbarLogo } from './NavbarLogo';
import { NavbarDesktop } from './NavbarDesktop';
import { SearchBar } from './SearchBar';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CurrencySwitcher } from './CurrencySwitcher';
import { MobileMenu } from './MobileMenu';
import { NAV_CATEGORIES } from './navData';
import { useGlobal } from '@/context/GlobalContext';
import { usePathname } from 'next/navigation';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useCart } from '@/hooks/useCart';
import { Moon, Sun } from 'lucide-react';

export function Navbar() {
    const pathname = usePathname();
    const isProductPage = pathname?.startsWith('/urun/');

    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { openCart } = useCart();
    const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { isScrolled: _isScrolled } = useNavbarScroll(activeCategoryId !== null);

    // Override isScrolled to false on the PDP so the big logo always stays.
    const isScrolled = isProductPage ? false : _isScrolled;

    const { t, currency } = useGlobal();

    const handleCategoryEnter = useCallback((id: string) => {
        if (isSearchOpen) return;
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = setTimeout(() => setActiveCategoryId(id), 150);
    }, [isSearchOpen]);

    const handleCategoryLeave = useCallback(() => {
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = setTimeout(() => setActiveCategoryId(null), 150);
    }, []);

    const handleMegaMenuEnter = useCallback(() => {
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    }, []);

    const handleMegaMenuClose = useCallback(() => setActiveCategoryId(null), []);
    const handleMobileOpen = useCallback(() => setIsMobileOpen(true), []);
    const handleMobileClose = useCallback(() => setIsMobileOpen(false), []);
    const handleSearchOpen = useCallback(() => { setActiveCategoryId(null); setIsSearchOpen(true); }, []);
    const handleSearchClose = useCallback(() => setIsSearchOpen(false), []);

    const { isDark, toggle: toggleDarkMode, mounted: darkModeMounted } = useDarkMode();

    const goldColor = '#C9A96E';

    const [isExpanded, setIsExpanded] = useState(false);

    // 3D Tilt Physics
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 150, damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 150, damping: 25 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsExpanded(false);
        handleCategoryLeave();
    };
    // Removed isExpanded state

    // Removed 3D Tilt Physics (mouseX, mouseY, rotateX, rotateY, useSpring, useTransform, useMotionValue)
    // Removed handleMouseMove, handleMouseLeave

    // Material definitions - "Heritage Modern" Style
    const heritageMaterial = "bg-[#FCFBF7]/95 dark:bg-black backdrop-blur-md border border-[#E5D5BC]/30 dark:border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.05)]";
    const goldAccent = "text-[#C9A96E]";

    const isHome = pathname === '/' || pathname === '/tr' || pathname === '/en' || pathname === '/de' || pathname === '/fr' || pathname === '/ar';

    return (
        <header className={`${isHome ? 'fixed' : 'sticky'} top-0 left-0 right-0 z-[100] flex flex-col items-center transition-all duration-500 pointer-events-none ${isScrolled ? 'pt-2' : 'pt-8'}`}>
            {/* Top Logo - centered and prominent */}
            <div className={`pointer-events-auto transition-all duration-500 transform hover:scale-105 ${isScrolled ? 'mb-1' : 'mb-4'}`}>
                <NavbarLogo isScrolled={isScrolled} />
            </div>

            {/* Navigation Strip */}
            <nav className={`pointer-events-auto flex items-center justify-between px-10 py-3 rounded-full ${heritageMaterial}`}>
                {/* Left: Cart & Lang (Simplified Tools) */}
                <div className="flex items-center gap-4 min-w-[120px]">
                    <LanguageSwitcher isScrolled={isScrolled} />
                    <button
                        onClick={() => openCart()}
                        className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors relative"
                    >
                        <ShoppingBag size={20} className="text-[#4A4A4A] dark:text-white" strokeWidth={1.5} />
                    </button>
                </div>

                {/* Center: Desktop Navigation */}
                <div className="mx-8">
                    <NavbarDesktop
                        categories={NAV_CATEGORIES}
                        isScrolled={isScrolled}
                        activeCategoryId={activeCategoryId}
                        onCategoryEnter={handleCategoryEnter}
                        onCategoryLeave={handleCategoryLeave}
                        onMegaMenuEnter={handleMegaMenuEnter}
                        onMegaMenuClose={handleMegaMenuClose}
                    />
                </div>

                {/* Right: Tools (Search, User, DarkMode) */}
                <div className="flex items-center gap-3 min-w-[150px] justify-end">
                    <SearchBar
                        isScrolled={isScrolled}
                        isOpen={isSearchOpen}
                        onOpen={handleSearchOpen}
                        onClose={handleSearchClose}
                    />

                    <Link href="/hesabim">
                        <div className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                            <User size={20} className="text-[#4A4A4A] dark:text-white" strokeWidth={1.5} />
                        </div>
                    </Link>

                    {darkModeMounted && (
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                            aria-label="Karanlık Mod Değiştir"
                        >
                            {isDark ? <Sun size={20} className="text-[#C9A96E]" strokeWidth={1.5} /> : <Moon size={20} className="text-[#4A4A4A] dark:text-white" strokeWidth={1.5} />}
                        </button>
                    )}
                </div>

                {/* Mobile Menu Icon */}
                <div className="lg:hidden ml-4">
                    <button onClick={handleMobileOpen} className="p-2 focus:outline-none">
                        <Menu size={24} className="text-[#4A4A4A] dark:text-white" />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileOpen}
                onClose={handleMobileClose}
                categories={NAV_CATEGORIES}
            />

            {/* Accessibility Link - Absolute relative to header */}
            <a href="#main-content" className="sr-only focus:not-sr-only absolute top-4 left-4 z-[60] bg-white text-black p-2 rounded shadow-lg">
                {t('common_skip_to_content') || 'İçeriğe geç'}
            </a>
        </header>
    );
}

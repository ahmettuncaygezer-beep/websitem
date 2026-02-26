'use client';

import Link from 'next/link';

import { useState, useRef, useCallback, useMemo } from 'react';
import { Menu } from 'lucide-react';
import { useNavbarScroll } from './useNavbarScroll';
import { NavbarLogo } from './NavbarLogo';
import { NavbarDesktop } from './NavbarDesktop';
import { MegaMenu } from './MegaMenu';
import { SearchBar } from './SearchBar';
import { NavIcons } from './NavIcons';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CurrencySwitcher } from './CurrencySwitcher';
import { MobileMenu } from './MobileMenu';
import { NAV_CATEGORIES } from './navData';

export function Navbar() {
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { isScrolled, shouldHide } = useNavbarScroll(activeCategoryId !== null);

    const activeCategory = useMemo(() =>
        NAV_CATEGORIES.find((c) => c.id === activeCategoryId) ?? null,
        [activeCategoryId]
    );

    // 150ms debounce on category hover to prevent accidental activations
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

    const handleMegaMenuClose = useCallback(() => {
        setActiveCategoryId(null);
    }, []);

    const handleMobileOpen = useCallback(() => setIsMobileOpen(true), []);
    const handleMobileClose = useCallback(() => setIsMobileOpen(false), []);
    const handleSearchOpen = useCallback(() => {
        setActiveCategoryId(null);
        setIsSearchOpen(true);
    }, []);
    const handleSearchClose = useCallback(() => setIsSearchOpen(false), []);

    // Navbar background styling based on scroll state
    const headerStyle = useMemo<React.CSSProperties>(() => ({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transform: shouldHide ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 300ms ease, background 400ms cubic-bezier(0.25,0.46,0.45,0.94), border-color 400ms ease, box-shadow 400ms ease',
        background: isScrolled
            ? 'rgba(255,255,255,0.96)'
            : 'linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.30) 70%, transparent 100%)',
        borderBottom: isScrolled
            ? '1px solid rgba(0,0,0,0.07)'
            : 'none',
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(4px)',
        WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(4px)',
        boxShadow: isScrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
    }), [isScrolled, shouldHide]);

    const uiColors = useMemo(() => ({
        btnColor: isMobileOpen ? 'white' : isScrolled ? '#1C1C1E' : 'white',
        btnHover: isMobileOpen
            ? 'rgba(255,255,255,0.1)'
            : isScrolled
                ? 'rgba(0,0,0,0.05)'
                : 'rgba(255,255,255,0.1)'
    }), [isMobileOpen, isScrolled]);

    return (
        <>
            {/* Skip navigation link for accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100]
                   focus:px-4 focus:py-2 focus:bg-white focus:text-[#1C1C1E] focus:font-medium
                   focus:text-sm focus:shadow-lg"
            >
                İçeriğe geç
            </a>

            <header style={headerStyle} role="banner">
                <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center gap-8">

                    {/* Hamburger (mobile) */}
                    <button
                        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
                        style={{ color: uiColors.btnColor }}
                        onClick={handleMobileOpen}
                        aria-label="Menüyü aç"
                        aria-expanded={isMobileOpen}
                        onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = uiColors.btnHover; }}
                        onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                    >
                        <Menu size={22} />
                    </button>

                    {/* Logo */}
                    <NavbarLogo isScrolled={isScrolled} isMobileMenuOpen={isMobileOpen} />

                    {/* Center: desktop nav OR expanded search */}
                    {isSearchOpen ? (
                        <div className="flex-1 flex items-center">
                            <SearchBar
                                isScrolled={isScrolled}
                                isOpen={isSearchOpen}
                                onOpen={handleSearchOpen}
                                onClose={handleSearchClose}
                            />
                        </div>
                    ) : (
                        <>
                            <NavbarDesktop
                                categories={NAV_CATEGORIES}
                                isScrolled={isScrolled}
                                activeCategoryId={activeCategoryId}
                                onCategoryEnter={handleCategoryEnter}
                                onCategoryLeave={handleCategoryLeave}
                            />
                            {/* Spacer */}
                            <div className="flex-1" />
                        </>
                    )}

                    {/* Right: switchers + search trigger + icons */}
                    {!isSearchOpen && (
                        <div className="flex items-center gap-3">
                            {/* Language + currency (xl+ only) */}
                            <div
                                className="hidden xl:flex items-center gap-3 pr-3 mr-1"
                                style={{ borderRight: `1px solid ${isScrolled ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.2)'}` }}
                            >
                                <LanguageSwitcher isScrolled={isScrolled} />
                                <span
                                    style={{
                                        width: '1px',
                                        height: '14px',
                                        background: isScrolled ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)',
                                        display: 'inline-block',
                                    }}
                                />
                                <CurrencySwitcher isScrolled={isScrolled} />
                            </div>

                            {/* Room Planner button */}
                            <Link href="/oda-planlayici"
                                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold tracking-wide rounded-full transition-all duration-200"
                                style={{
                                    background: 'linear-gradient(135deg, #C9A96E, #B8915A)',
                                    color: '#1C1C1E', border: 'none', textDecoration: 'none',
                                    boxShadow: '0 2px 8px rgba(201,169,110,0.4)',
                                }}>
                                ✨ Oda Planla
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full animate-pulse"
                                    style={{ background: '#1C1C1E', color: '#C9A96E' }}>Yeni</span>
                            </Link>

                            {/* Search icon (closed state only) */}
                            <SearchBar
                                isScrolled={isScrolled}
                                isOpen={false}
                                onOpen={handleSearchOpen}
                                onClose={handleSearchClose}
                            />

                            {/* Nav icons (favorites, profile, cart) */}
                            <NavIcons isScrolled={isScrolled} />
                        </div>
                    )}
                </div>
            </header>

            {/* Mega menu (positioned below header) */}
            <MegaMenu
                activeCategory={activeCategory}
                onClose={handleMegaMenuClose}
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleCategoryLeave}
            />

            {/* Mobile drawer */}
            <MobileMenu
                isOpen={isMobileOpen}
                onClose={handleMobileClose}
                categories={NAV_CATEGORIES}
            />


            {/* Spacer so page content isn't hidden behind fixed navbar */}
            <div style={{ height: '72px' }} aria-hidden="true" />
        </>
    );
}

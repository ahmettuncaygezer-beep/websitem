'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobal } from '@/context/GlobalContext';
import { useDarkMode } from '@/hooks/useDarkMode';

interface NavbarLogoProps {
    isScrolled: boolean;
    isMobileMenuOpen?: boolean;
}

export const NavbarLogo = memo(function NavbarLogo({ isScrolled, isMobileMenuOpen = false }: NavbarLogoProps) {
    const { siteSettings, t } = useGlobal();
    const { isDark } = useDarkMode();
    const siteName = siteSettings?.site_info?.siteName || 'SELIS';
    const siteSlogan = siteSettings?.site_info?.siteSlogan || t('site_slogan') || 'HOME CONCEPT';

    const goldColor = '#C9A96E';

    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <Link
            href="/"
            prefetch={true}
            onClick={handleClick}
            className="flex flex-col items-center justify-center group pointer-events-auto"
            style={{ textDecoration: 'none' }}
            aria-label="SELIS Anasayfa"
        >
            <motion.div
                layout
                className={`relative flex flex-col items-center transition-all duration-500 ${isScrolled ? 'gap-0' : 'gap-4'}`}
            >
                {/* Logo Container - Transforms between Circle and Capsule */}
                <motion.div
                    layout
                    className={`
                        relative flex items-center justify-center overflow-hidden transition-all duration-500 shadow-sm
                        border border-[#E5D5BC] dark:border-white/10
                        ${isScrolled
                            ? 'w-64 h-12 rounded-full px-6 bg-[#FCFBF7]/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-lg shadow-black/5'
                            : 'w-14 h-14 rounded-full bg-white dark:bg-zinc-900'
                        }
                    `}
                >
                    <div className="flex items-center gap-5">
                        {/* Monogram "S" */}
                        <motion.span
                            layout
                            className={`font-serif italic transition-colors duration-500 leading-none
                                ${isScrolled ? 'text-[#C9A96E] text-xl' : 'text-[#4A4A4A] dark:text-white text-2xl'}
                            `}
                            style={{ fontFamily: '"Cormorant Garamond", serif' }}
                        >
                            S
                        </motion.span>

                        {/* Scrolled: Content inside the capsule */}
                        <AnimatePresence mode="wait">
                            {isScrolled && (
                                <motion.div
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -15 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="flex flex-col items-start leading-tight"
                                >
                                    <span
                                        className="text-[#1A1A1A] dark:text-white uppercase font-serif tracking-[0.25em] text-[15px] font-semibold"
                                        style={{ fontFamily: '"Cormorant Garamond", serif' }}
                                    >
                                        {siteName}
                                    </span>
                                    <span className="text-[#C9A96E] uppercase font-sans text-[9px] font-medium tracking-[0.4em] mt-0.5">
                                        {siteSlogan}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Not Scrolled: Content below the circle */}
                <AnimatePresence>
                    {!isScrolled && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="flex flex-col items-center"
                        >
                            <span
                                className="block text-[#1A1A1A] dark:text-white"
                                style={{
                                    fontFamily: '"Cormorant Garamond", serif',
                                    fontSize: '32px',
                                    fontWeight: 500,
                                    letterSpacing: '0.25em',
                                    paddingLeft: '0.25em',
                                    lineHeight: 1,
                                    textTransform: 'uppercase',
                                }}
                            >
                                {siteName}
                            </span>

                            <div className="flex items-center gap-3 mt-2">
                                <div className="h-px w-6 bg-[#C9A96E]/40" />
                                <span
                                    style={{
                                        fontFamily: '"Inter", sans-serif',
                                        fontSize: '10px',
                                        fontWeight: 400,
                                        letterSpacing: '0.5em',
                                        color: goldColor,
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {siteSlogan}
                                </span>
                                <div className="h-px w-6 bg-[#C9A96E]/40" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </Link>
    );
});

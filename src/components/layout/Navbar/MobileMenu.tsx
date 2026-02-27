'use client';

import { useEffect, useRef, memo } from 'react';
import Link from 'next/link';
import { X, Search, Heart, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileMenuCategory } from './MobileMenuCategory';
import { NavbarLogo } from './NavbarLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CurrencySwitcher } from './CurrencySwitcher';
import type { NavCategory } from './navbar.types';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    categories: NavCategory[];
}

export const MobileMenu = memo(function MobileMenu({ isOpen, onClose, categories }: MobileMenuProps) {
    const { totalItems: itemCount, openCart } = useCart();
    const favCount = useFavorites((state) => state.favorites.length);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Body scroll lock
    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen]);

    // Escape key close
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    // Swipe-to-close (right swipe ≥80px)
    useEffect(() => {
        const el = overlayRef.current;
        if (!el) return;
        let startX = 0;
        const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
        const onTouchEnd = (e: TouchEvent) => {
            const dx = e.changedTouches[0].clientX - startX;
            if (dx < -80) onClose(); // swipe left to close
        };
        el.addEventListener('touchstart', onTouchStart, { passive: true });
        el.addEventListener('touchend', onTouchEnd, { passive: true });
        return () => {
            el.removeEventListener('touchstart', onTouchStart);
            el.removeEventListener('touchend', onTouchEnd);
        };
    }, [onClose]);

    const containerVariants = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.03, delayChildren: 0.1 },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, x: -15 },
        show: { opacity: 1, x: 0, transition: { duration: 0.2 } },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 z-[58] bg-black/50 lg:hidden"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        ref={overlayRef}
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                        className="fixed inset-y-0 left-0 z-[59] w-full max-w-sm overflow-y-auto lg:hidden"
                        style={{ background: '#1C1C1E' }}
                        aria-label="Mobil navigasyon"
                        aria-modal="true"
                        role="dialog"
                    >
                        {/* Header row */}
                        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                            <NavbarLogo isScrolled={false} isMobileMenuOpen={true} />
                            <button
                                onClick={onClose}
                                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
                                aria-label="Menüyü kapat"
                            >
                                <X size={22} className="text-white" />
                            </button>
                        </div>

                        {/* Content */}
                        <motion.div
                            className="px-6 py-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                        >
                            {/* Search */}
                            <motion.div variants={itemVariants} className="mb-6">
                                <div
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg"
                                    style={{
                                        background: 'rgba(255,255,255,0.08)',
                                        border: '1px solid rgba(255,255,255,0.12)',
                                    }}
                                >
                                    <Search size={16} style={{ color: 'rgba(255,255,255,0.4)' }} />
                                    <input
                                        type="text"
                                        placeholder="Ne arıyorsunuz?"
                                        className="flex-1 bg-transparent border-none outline-none text-white text-[14px]"
                                        style={{
                                            caretColor: '#C9A96E',
                                        }}
                                        aria-label="Ürün ara"
                                        data-lang-key="mobile_nav_search_placeholder"
                                    />
                                </div>
                            </motion.div>

                            {/* Category accordion items */}
                            {categories.map((cat) => (
                                <motion.div key={cat.id} variants={itemVariants}>
                                    <MobileMenuCategory category={cat} onClose={onClose} />
                                </motion.div>
                            ))}

                            {/* Secondary links */}
                            <motion.div
                                variants={itemVariants}
                                className="flex gap-6 py-5 mt-2 border-t text-[14px] text-white/50"
                                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                            >
                                {[
                                    { label: 'Hakkımızda', href: '/hakkimizda', langKey: 'nav_about' },
                                    { label: 'Blog', href: '/blog', langKey: 'nav_blog' },
                                    { label: 'İletişim', href: '/iletisim', langKey: 'nav_contact' },
                                ].map(({ label, href, langKey }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={onClose}
                                        className="hover:text-white transition-colors duration-150"
                                        data-lang-key={langKey}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </motion.div>

                            {/* Language + currency */}
                            <motion.div
                                variants={itemVariants}
                                className="flex items-center gap-4 py-4 border-t"
                                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                            >
                                <LanguageSwitcher isScrolled={false} />
                                <span style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.2)' }} />
                                <CurrencySwitcher isScrolled={false} />
                            </motion.div>

                            {/* Footer actions */}
                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col gap-3 py-4 border-t"
                                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                            >
                                <Link
                                    href="/favoriler"
                                    onClick={onClose}
                                    className="flex items-center gap-3 text-[14px] text-white/70 hover:text-white transition-colors"
                                >
                                    <Heart size={18} />
                                    <span data-lang-key="mobile_nav_favorites">Favorilerim</span>
                                    {favCount > 0 && (
                                        <span className="ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#C9A96E', color: 'white' }}>
                                            {favCount}
                                        </span>
                                    )}
                                </Link>
                                <button
                                    onClick={() => { onClose(); openCart(); }}
                                    className="flex items-center gap-3 text-[14px] text-white/70 hover:text-white transition-colors text-left"
                                >
                                    <ShoppingBag size={18} />
                                    <span data-lang-key="mobile_nav_cart">Sepetim</span>
                                    {itemCount > 0 && (
                                        <span className="ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#C9A96E', color: 'white' }}>
                                            {itemCount}
                                        </span>
                                    )}
                                </button>
                                <Link
                                    href="/hesabim"
                                    onClick={onClose}
                                    className="flex items-center gap-3 text-[14px] text-white/70 hover:text-white transition-colors"
                                >
                                    <span data-lang-key="mobile_nav_account">👤 Giriş Yap / Hesabım</span>
                                </Link>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 pt-4 border-t border-white/5">
                                    {[
                                        { label: 'SSS', href: '/sss', langKey: 'footer_support_faq' },
                                        { label: 'Kargo', href: '/kargo', langKey: 'footer_support_shipping' },
                                        { label: 'İade', href: '/iade', langKey: 'footer_support_returns' },
                                        { label: 'Garanti', href: '/garanti', langKey: 'footer_support_warranty' }
                                    ].map(link => (
                                        <Link key={link.href} href={link.href} onClick={onClose} className="text-[12px] text-white/40 hover:text-white transition-colors" data-lang-key={link.langKey}>
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
});

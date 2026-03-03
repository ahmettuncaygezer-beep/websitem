'use client';

import { useState, memo, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, User, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartBadge } from './CartBadge';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuthStore } from '@/store/authStore';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useGlobal } from '@/context/GlobalContext';

interface NavIconsProps {
    isScrolled: boolean;
}

const NavIconBtn = memo(function NavIconBtn({
    label,
    onClick,
    children,
    color,
    hoverBg
}: {
    label: string,
    onClick?: () => void,
    children: React.ReactNode,
    color: string,
    hoverBg: string
}) {
    return (
        <button
            onClick={onClick}
            aria-label={label}
            className="relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
            style={{ color }}
            onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = hoverBg; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >
            {children}
        </button>
    );
});

export const NavIcons = memo(function NavIcons({ isScrolled }: NavIconsProps) {
    const openAuth = useAuthStore((state) => state.openAuthModal);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const { totalItems, openCart } = useCart();
    const favCount = useFavorites((state) => state.favorites.length);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [heartHovered, setHeartHovered] = useState(false);
    const { t, language } = useGlobal();

    const ui = useMemo(() => ({
        iconColor: 'var(--foreground)',
        iconBtnHover: 'rgba(128,128,128,0.1)'
    }), []);

    const { isDark, toggle, mounted } = useDarkMode();

    const handleLoginClick = useCallback(() => openAuth('login'), [openAuth]);

    return (
        <div className="flex items-center gap-0 md:gap-1">
            {/* Dark Mode Toggle */}
            {mounted && (
                <button
                    onClick={toggle}
                    aria-label={isDark ? t('sc_day_mode') : t('sc_night_mode')}
                    title={isDark ? t('sc_day_mode') : t('sc_night_mode')}
                    className="relative hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
                    style={{ color: ui.iconColor }}
                    onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = ui.iconBtnHover; }}
                    onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                    <motion.div
                        key={isDark ? 'moon' : 'sun'}
                        initial={{ rotate: -30, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.25 }}
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </motion.div>
                </button>
            )}
            {/* ① Favorites */}
            <Link
                href="/favoriler"
                aria-label={`${t('nav_favorites')}${favCount > 0 ? `, ${favCount} ${t('fav_count_suffix')}` : ''}`}
                className="relative hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
                style={{ color: ui.iconColor }}
                onMouseEnter={() => setHeartHovered(true)}
                onMouseLeave={() => setHeartHovered(false)}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = ui.iconBtnHover; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
                <Heart
                    size={20}
                    style={{
                        fill: heartHovered ? '#ef4444' : 'none',
                        color: heartHovered ? '#ef4444' : ui.iconColor,
                        transition: 'fill 200ms ease, color 200ms ease',
                    }}
                />
                {favCount > 0 && <CartBadge count={favCount} />}
            </Link>

            {/* ② User profile */}
            <div
                className="relative hidden md:block"
                onMouseEnter={() => setIsUserMenuOpen(true)}
                onMouseLeave={() => setIsUserMenuOpen(false)}
            >
                <div
                    className="relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors duration-200"
                    style={{ color: ui.iconColor }}
                    onClick={handleLoginClick}
                    onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = ui.iconBtnHover; }}
                    onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                    <User size={20} />
                </div>

                <AnimatePresence>
                    {isUserMenuOpen && (
                        <div className="absolute top-[100%] right-[-10px] pt-4 z-50">
                            <motion.div
                                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className="w-[200px] bg-background/80 backdrop-blur-xl rounded-xl overflow-hidden glass-premium"
                                style={{
                                    border: '1px solid var(--glass-border)',
                                    boxShadow: 'var(--shadow-selis-mega-menu)',
                                    transformOrigin: 'top right',
                                }}
                            >
                                <div className="p-3 border-b" style={{ borderColor: 'var(--border)' }}>
                                    <button
                                        onClick={() => { openAuth('register'); setIsUserMenuOpen(false); }}
                                        className="w-full py-2.5 mb-1 text-[11px] font-bold uppercase tracking-wider rounded hover:bg-accent transition-colors"
                                        style={{ color: 'var(--foreground)' }}
                                        data-lang-key="auth_register_btn"
                                    >
                                        {t('auth_register_btn')}
                                    </button>
                                    <button
                                        onClick={() => { openAuth('login'); setIsUserMenuOpen(false); }}
                                        className="w-full py-2.5 text-[11px] font-bold uppercase tracking-wider rounded hover:bg-accent transition-colors"
                                        style={{ color: 'var(--foreground)' }}
                                        data-lang-key="auth_tab_login"
                                    >
                                        {t('auth_tab_login')}
                                    </button>
                                </div>
                                <div className="p-2">
                                    {[
                                        { label: 'Siparişlerim', href: '/siparis-takip', langKey: 'nav_orders' },
                                        { label: 'Favorilerim', href: '/favoriler', langKey: 'nav_favorites' },
                                        { label: 'Hesabım', href: '/hesabim', langKey: 'nav_account' },
                                    ].map(({ label, href, langKey }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="block px-4 py-3 text-[13px] rounded hover:bg-accent transition-colors"
                                            style={{ color: 'var(--foreground)' }}
                                            data-lang-key={langKey}
                                        >
                                            {t(langKey)}
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* ③ Cart */}
            <NavIconBtn
                label={`${t('mobile_nav_cart')}, ${totalItems} ${t('fav_count_suffix')}`}
                onClick={openCart}
                color={ui.iconColor}
                hoverBg={ui.iconBtnHover}
            >
                <>
                    <ShoppingBag size={20} />
                    {totalItems > 0 && <CartBadge count={totalItems} />}
                </>
            </NavIconBtn>
        </div>
    );
});

'use client';

import { useState, memo, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, User, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartBadge } from './CartBadge';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuthStore } from '@/store/authStore';
import { useDarkMode } from '@/hooks/useDarkMode';

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

    const ui = useMemo(() => ({
        iconColor: isScrolled ? '#1C1C1E' : 'white',
        iconBtnHover: isScrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'
    }), [isScrolled]);

    const { isDark, toggle, mounted } = useDarkMode();

    const handleLoginClick = useCallback(() => openAuth('login'), [openAuth]);

    return (
        <div className="flex items-center gap-0 md:gap-1">
            {/* Dark Mode Toggle */}
            {mounted && (
                <button
                    onClick={toggle}
                    aria-label={isDark ? 'Aydınlık moda geç' : 'Karanlık moda geç'}
                    title={isDark ? 'Aydınlık mod' : 'Karanlık mod'}
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
                aria-label={`Favorilerim${favCount > 0 ? `, ${favCount} ürün` : ''}`}
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
                <NavIconBtn
                    label="Hesabım"
                    onClick={handleLoginClick}
                    color={ui.iconColor}
                    hoverBg={ui.iconBtnHover}
                >
                    <User size={20} />
                </NavIconBtn>

                <AnimatePresence>
                    {isUserMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.96 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg overflow-hidden"
                            style={{
                                border: '1px solid rgba(0,0,0,0.06)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                                transformOrigin: 'top right',
                            }}
                        >
                            <div className="p-2 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                                <button
                                    onClick={() => { openAuth('register'); setIsUserMenuOpen(false); }}
                                    className="w-full py-2 text-[11px] font-bold uppercase tracking-wider rounded hover:bg-[#F5F0EB] transition-colors"
                                    style={{ color: '#1C1C1E' }}
                                >
                                    Üye Ol
                                </button>
                                <button
                                    onClick={() => { openAuth('login'); setIsUserMenuOpen(false); }}
                                    className="w-full py-2 text-[11px] font-bold uppercase tracking-wider rounded hover:bg-[#F5F0EB] transition-colors"
                                    style={{ color: '#1C1C1E' }}
                                >
                                    Giriş Yap
                                </button>
                            </div>
                            <div className="p-1">
                                {[
                                    { label: 'Siparişlerim', href: '/siparis-takip' },
                                    { label: 'Favorilerim', href: '/favoriler' },
                                    { label: 'Hesabım', href: '/hesabim' },
                                ].map(({ label, href }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => setIsUserMenuOpen(false)}
                                        className="block px-4 py-2.5 text-[13px] rounded hover:bg-[#F5F0EB] transition-colors"
                                        style={{ color: '#6B6560' }}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ③ Cart */}
            <NavIconBtn
                label={`Sepet, ${totalItems} ürün`}
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

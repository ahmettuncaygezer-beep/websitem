'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartBadge } from './CartBadge';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { AuthModal, useAuthStore } from '@/components/auth/AuthModal';

interface NavIconsProps {
    isScrolled: boolean;
}

export function NavIcons({ isScrolled }: NavIconsProps) {
    const openAuth = useAuthStore((state) => state.open);
    const { totalItems, openCart } = useCart();
    const favCount = useFavorites((state) => state.favorites.length);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [heartHovered, setHeartHovered] = useState(false);

    const iconColor = isScrolled ? '#1C1C1E' : 'white';
    const iconBtnHover = isScrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)';

    const iconBtn = (label: string, onClick?: () => void, children?: React.ReactNode) => (
        <button
            onClick={onClick}
            aria-label={label}
            className="relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
            style={{ color: iconColor }}
            onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = iconBtnHover; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >
            {children}
        </button>
    );

    return (
        <div className="flex items-center gap-0 md:gap-1">
            {/* ① Favorites */}
            <Link
                href="/favoriler"
                aria-label={`Favorilerim${favCount > 0 ? `, ${favCount} ürün` : ''}`}
                className="relative hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
                style={{ color: iconColor }}
                onMouseEnter={() => setHeartHovered(true)}
                onMouseLeave={() => setHeartHovered(false)}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = iconBtnHover; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
                <Heart
                    size={20}
                    style={{
                        fill: heartHovered ? '#ef4444' : 'none',
                        color: heartHovered ? '#ef4444' : iconColor,
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
                {iconBtn('Hesabım', () => openAuth('login'),
                    <User size={20} />
                )}

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
            {iconBtn(`Sepet, ${totalItems} ürün`, openCart,
                <>
                    <ShoppingBag size={20} />
                    {totalItems > 0 && <CartBadge count={totalItems} />}
                </>
            )}
        </div>
    );
}

'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { BottomNavItem } from './BottomNavItem';
import { useBottomNav } from './useBottomNav';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuthStore } from '@/store/authStore';

const BOTTOM_NAV_HEIGHT = 64;

interface BottomNavProps {
    onSearchOpen?: () => void;
}

export default function BottomNav({ onSearchOpen }: BottomNavProps) {
    const { isVisible, activeHref } = useBottomNav();
    const { totalItems, openCart } = useCart();
    const favCount = useFavorites((s) => s.favorites.length);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    // Add body padding so content isn't hidden under BottomNav
    useEffect(() => {
        document.body.style.paddingBottom = `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom))`;
        return () => { document.body.style.paddingBottom = ''; };
    }, []);

    const isActive = (href: string) => {
        if (href === '/') return activeHref === '/';
        return activeHref.startsWith(href);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    key="bottom-nav"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="block md:hidden fixed bottom-0 left-0 right-0 z-[45] flex"
                    style={{
                        background: 'rgba(255,255,255,0.96)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        borderTop: '1px solid rgba(0,0,0,0.06)',
                        boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
                        paddingBottom: 'env(safe-area-inset-bottom)',
                        minHeight: `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom))`,
                    }}
                    role="navigation"
                    aria-label="Alt navigasyon"
                >
                    <div className="flex items-center w-full px-2"
                        style={{ height: BOTTOM_NAV_HEIGHT }}
                    >
                        {/* Ana Sayfa */}
                        <BottomNavItem
                            href="/"
                            icon={<Home size={20} />}
                            label="Ana"
                            isActive={isActive('/')}
                        />

                        {/* Arama */}
                        <BottomNavItem
                            onClick={onSearchOpen}
                            icon={<Search size={20} />}
                            label="Ara"
                            isActive={false}
                        />

                        {/* Favoriler */}
                        <BottomNavItem
                            href="/favoriler"
                            icon={<Heart size={20} />}
                            label="Favori"
                            isActive={isActive('/favoriler')}
                            badge={favCount}
                            badgeColor="#ef4444"
                        />

                        {/* Sepet */}
                        <BottomNavItem
                            onClick={openCart}
                            icon={<ShoppingBag size={20} />}
                            label="Sepet"
                            isActive={false}
                            badge={totalItems}
                            badgeColor="#C9A96E"
                        />

                        {/* Profil */}
                        <BottomNavItem
                            href={isAuthenticated ? '/hesabim' : '/giris'}
                            icon={
                                isAuthenticated ? (
                                    <div className="w-6 h-6 rounded-full bg-[#C9A96E] flex items-center justify-center text-white text-[10px] font-bold">
                                        ME
                                    </div>
                                ) : (
                                    <User size={20} />
                                )
                            }
                            label="Profil"
                            isActive={isActive('/hesabim') || isActive('/giris')}
                        />
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}

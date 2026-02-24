'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { SITE_NAME, NAVIGATION } from '@/lib/constants';
import { MegaMenu } from './MegaMenu';
import { SearchBar } from './SearchBar';
import { AuthModal, useAuthStore } from '../auth/AuthModal';
import { useGlobal } from '@/context/GlobalContext';
import { translations, currencies } from '@/lib/i18n';
import { Globe, DollarSign } from 'lucide-react';

export function Header() {
    const { language, setLanguage, currency, setCurrency, t, formatPrice } = useGlobal();
    const openAuth = useAuthStore((state) => state.open);
    const { scrollDirection, isAtTop } = useScrollDirection();
    const totalItems = useCart((state) => state.totalItems());
    const openCart = useCart((state) => state.openCart);
    const favCount = useFavorites((state) => state.favorites.length);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (label: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveMenu(label);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 300);
    };

    const isVisible = scrollDirection === 'up' || isAtTop;

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${isVisible ? 'translate-y-0' : '-translate-y-full'
                    } ${isAtTop ? 'bg-white' : 'glass-header border-b border-border/50'}`}
            >
                {/* Top banner */}
                <div className="bg-charcoal text-white text-center py-2 text-[10px] tracking-widest uppercase font-sans">
                    {language === 'tr' ? 'Ücretsiz Kargo — ' : 'Free Shipping — '}
                    {formatPrice(5000)} {language === 'tr' ? 've Üzeri Siparişlerde' : 'and Above Orders'}
                </div>

                {/* Main header */}
                <div className="container-premium">
                    <div className="flex items-center justify-between h-20">
                        {/* Mobile menu */}
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="lg:hidden p-2 hover:opacity-70 transition-opacity"
                            aria-label="Menü"
                        >
                            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        {/* Logo */}
                        <Link
                            href="/"
                            className="font-serif text-2xl md:text-3xl tracking-[0.2em] font-medium hover:opacity-80 transition-opacity"
                        >
                            {SITE_NAME}
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {NAVIGATION.map((item) => (
                                <div
                                    key={item.label}
                                    onMouseEnter={() => handleMouseEnter(item.label)}
                                    onMouseLeave={handleMouseLeave}
                                    className="relative"
                                >
                                    <Link
                                        href={item.href}
                                        className={`text-sm tracking-wide uppercase font-sans font-medium py-8 block transition-colors duration-300 ${activeMenu === item.label
                                            ? 'text-gold'
                                            : 'text-foreground hover:text-gold'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                    {/* Invisible bridge to close the gap */}
                                    {activeMenu === item.label && (
                                        <div className="absolute top-full left-0 w-full h-12 z-10" />
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Right actions */}
                        <div className="flex items-center gap-4">
                            {/* Lang/Currency Switchers */}
                            <div className="hidden xl:flex items-center gap-1 border-r border-border pr-2 mr-2">
                                <div className="relative" onMouseEnter={() => setIsLangMenuOpen(true)} onMouseLeave={() => setIsLangMenuOpen(false)}>
                                    <button className="p-2 text-[10px] font-sans font-bold uppercase tracking-widest hover:text-gold transition-colors flex items-center gap-1">
                                        <Globe size={14} /> {language}
                                    </button>
                                    <AnimatePresence>
                                        {isLangMenuOpen && (
                                            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute left-1/2 -translate-x-1/2 top-full bg-white rounded-xl shadow-xl border p-1 z-[60] min-w-[80px]">
                                                {Object.keys(translations).map((lang) => (
                                                    <button key={lang} onClick={() => setLanguage(lang as any)} className={`w-full text-left px-3 py-1.5 text-[10px] font-sans font-bold uppercase rounded-lg hover:bg-sand transition-colors ${language === lang ? 'text-gold' : 'text-warm-gray'}`}>
                                                        {lang}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="relative" onMouseEnter={() => setIsCurrencyMenuOpen(true)} onMouseLeave={() => setIsCurrencyMenuOpen(false)}>
                                    <button className="p-2 text-[10px] font-sans font-bold uppercase tracking-widest hover:text-gold transition-colors flex items-center gap-1">
                                        <DollarSign size={14} /> {currency}
                                    </button>
                                    <AnimatePresence>
                                        {isCurrencyMenuOpen && (
                                            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute left-1/2 -translate-x-1/2 top-full bg-white rounded-xl shadow-xl border p-1 z-[60] min-w-[80px]">
                                                {Object.keys(currencies).map((cur) => (
                                                    <button key={cur} onClick={() => setCurrency(cur as any)} className={`w-full text-left px-3 py-1.5 text-[10px] font-sans font-bold uppercase rounded-lg hover:bg-sand transition-colors ${currency === cur ? 'text-gold' : 'text-warm-gray'}`}>
                                                        {cur}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2 hover:opacity-70 transition-opacity"
                                aria-label="Ara"
                            >
                                <Search size={20} />
                            </button>
                            <div
                                className="relative"
                                onMouseEnter={() => setIsUserMenuOpen(true)}
                                onMouseLeave={() => setIsUserMenuOpen(false)}
                            >
                                <button
                                    onClick={() => openAuth('login')}
                                    className="hidden md:block p-2 hover:opacity-70 transition-opacity"
                                    aria-label="Hesabım"
                                >
                                    <User size={20} />
                                </button>

                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-50"
                                        >
                                            <div className="p-2 border-b border-border flex gap-2">
                                                <button
                                                    onClick={() => { openAuth('register'); setIsUserMenuOpen(false); }}
                                                    className="flex-1 py-2 text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal hover:bg-sand rounded-xl transition-colors"
                                                >
                                                    ÜYE OL
                                                </button>
                                                <button
                                                    onClick={() => { openAuth('login'); setIsUserMenuOpen(false); }}
                                                    className="flex-1 py-2 text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal hover:bg-sand rounded-xl transition-colors"
                                                >
                                                    GİRİŞ
                                                </button>
                                            </div>
                                            <div className="p-1">
                                                <Link
                                                    href="/siparis-takip"
                                                    className="block px-4 py-2.5 text-xs font-sans text-warm-gray hover:text-charcoal hover:bg-sand rounded-xl transition-all"
                                                >
                                                    Sipariş Takibi
                                                </Link>
                                                <Link
                                                    href="/yardim"
                                                    className="block px-4 py-2.5 text-xs font-sans text-warm-gray hover:text-charcoal hover:bg-sand rounded-xl transition-all"
                                                >
                                                    Yardım Merkezi
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <Link
                                href="/favoriler"
                                className="relative hidden md:block p-2 hover:opacity-70 transition-opacity"
                                aria-label="Favoriler"
                            >
                                <Heart size={20} />
                                {favCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-0.5 -right-0.5 bg-terracotta text-white text-[10px] font-sans font-bold w-5 h-5 rounded-full flex items-center justify-center"
                                    >
                                        {favCount}
                                    </motion.span>
                                )}
                            </Link>
                            <button
                                onClick={openCart}
                                className="relative p-2 hover:opacity-70 transition-opacity"
                                aria-label="Sepet"
                            >
                                <ShoppingBag size={20} />
                                {totalItems > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-0.5 -right-0.5 bg-gold text-white text-[10px] font-sans font-bold w-5 h-5 rounded-full flex items-center justify-center"
                                    >
                                        {totalItems}
                                    </motion.span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mega Menu */}
                <AnimatePresence>
                    {activeMenu && (
                        <div
                            className="absolute top-full left-0 w-full z-50 pointer-events-none"
                            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="pointer-events-auto bg-white border-b border-border shadow-lg">
                                <MegaMenu
                                    item={NAVIGATION.find((n) => n.label === activeMenu)!}
                                    onClose={() => setActiveMenu(null)}
                                />
                            </div>
                            {/* Visual interaction area extension */}
                            <div className="h-[400px] pointer-events-auto" />
                        </div>
                    )}
                </AnimatePresence>
            </header>

            <AuthModal />

            {/* Search overlay */}
            <AnimatePresence>
                {isSearchOpen && <SearchBar onClose={() => setIsSearchOpen(false)} />}
            </AnimatePresence>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="fixed inset-0 z-40 bg-white pt-32 px-6 overflow-y-auto lg:hidden"
                    >
                        <nav className="space-y-6">
                            {NAVIGATION.map((item) => (
                                <div key={item.label}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className="text-2xl font-serif font-medium block py-2"
                                    >
                                        {item.label}
                                    </Link>
                                    {item.children && (
                                        <div className="ml-4 mt-2 space-y-1">
                                            {item.children.map((cat) =>
                                                cat.items.map((sub) => (
                                                    <Link
                                                        key={sub.href}
                                                        href={sub.href}
                                                        onClick={() => setIsMobileOpen(false)}
                                                        className="block text-sm text-warm-gray py-1.5 hover:text-gold transition-colors"
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Extra pages */}
                            <div className="border-t border-border/50 pt-6 mt-6">
                                <Link
                                    href="/koleksiyonlar"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="text-2xl font-serif font-medium block py-2"
                                >
                                    Koleksiyonlar
                                </Link>
                                <Link
                                    href="/hakkimizda"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="text-2xl font-serif font-medium block py-2"
                                >
                                    Hakkımızda
                                </Link>
                                <Link
                                    href="/favoriler"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="text-2xl font-serif font-medium block py-2"
                                >
                                    Favorilerim
                                </Link>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer for fixed header */}
            <div className="h-[calc(2rem+5rem)]" />
        </>
    );
}

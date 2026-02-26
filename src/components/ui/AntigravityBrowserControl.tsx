'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Cpu,
    Search,
    Box,
    Moon,
    Sun,
    X,
    Shield,
    Terminal,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { useDarkMode } from '@/hooks/useDarkMode';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/components/ProductCard/useWishlist';

export default function AntigravityBrowserControl() {
    const [isOpen, setIsOpen] = useState(false);
    const [systemStatus, setSystemStatus] = useState('ACTIVE');
    const { isDark, toggle: toggleDarkMode, mounted } = useDarkMode();
    const pathname = usePathname();
    const { totalItems: cartCount } = useCart();
    const { favorites } = useFavorites();
    const favoritesCount = favorites?.length || 0;

    // Simulate system pulse
    useEffect(() => {
        const statuses = ['ACTIVE', 'OPTIMIZED', 'SYNCED', 'STABLE'];
        const interval = setInterval(() => {
            setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)]);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const isPlanner = pathname === '/oda-planlayici';
    const isProductPage = pathname?.startsWith('/urun/');

    const getContextActions = () => {
        const baseActions = [
            { icon: isDark ? <Sun size={18} /> : <Moon size={18} />, label: isDark ? 'Gündüz Modu' : 'Gece Modu', onClick: toggleDarkMode, color: 'text-amber-400' },
            { icon: <Search size={18} />, label: 'Akıllı Arama', onClick: () => (window as any).MaisonSearch?.open(), color: 'text-purple-400' },
        ];

        // PWA Install Check
        if ((window as any).MaisonPWA?.trigger) {
            baseActions.push({ icon: <Cpu size={18} />, label: 'Uygulamayı Yükle', onClick: () => (window as any).MaisonPWA.trigger(), color: 'text-green-400' });
        }

        if (isPlanner) {
            return [
                { icon: <Box size={18} />, label: 'Taslağı Kaydet', onClick: () => { }, color: 'text-blue-400' },
                ...baseActions
            ];
        }

        if (isProductPage) {
            return [
                { icon: <Zap size={18} />, label: 'Benzerini Bul', onClick: () => { }, color: 'text-gold' },
                ...baseActions
            ];
        }

        return [
            { icon: <Box size={18} />, label: 'Oda Planlayıcı', href: '/oda-planlayici', color: 'text-blue-400' },
            ...baseActions
        ];
    };

    if (!mounted) return null;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.button
                        key="orb"
                        layoutId="control-center"
                        onClick={() => setIsOpen(true)}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="pointer-events-auto h-14 px-6 rounded-full bg-[#1C1C1E]/90 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center gap-3 group overflow-hidden"
                    >
                        <div className="relative">
                            <Cpu size={20} className="text-gold animate-pulse" />
                            <div className="absolute inset-0 bg-gold/30 blur-md rounded-full animate-ping" />
                        </div>
                        <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-white">
                            Antigravity
                        </span>
                        <div className="flex items-center gap-1.5 ml-2 border-l border-white/10 pl-3">
                            <div className="flex flex-col items-center">
                                <span className="text-[8px] text-white/40 uppercase leading-none mb-0.5">Cart</span>
                                <span className="text-[10px] font-bold text-white leading-none">{cartCount}</span>
                            </div>
                            <div className="w-px h-4 bg-white/5" />
                            <div className="flex flex-col items-center">
                                <span className="text-[8px] text-white/40 uppercase leading-none mb-0.5">Fav</span>
                                <span className="text-[10px] font-bold text-white leading-none">{favoritesCount}</span>
                            </div>
                        </div>
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] ml-1" />

                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    </motion.button>
                ) : (
                    <motion.div
                        key="panel"
                        layoutId="control-center"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="pointer-events-auto w-[320px] bg-[#1C1C1E]/95 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-[0_32px_64px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Terminal size={14} className="text-gold" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/60">System Control Center</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-full hover:bg-white/10 text-white/60 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Status Bar */}
                        <div className="px-5 py-3 bg-black/40 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase text-white/40">Core Status</span>
                                    <span className="text-[10px] font-bold text-green-500 flex items-center gap-1.5">
                                        <Shield size={10} /> {systemStatus}
                                    </span>
                                </div>
                                <div className="w-[1px] h-6 bg-white/5" />
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase text-white/40">Environment</span>
                                    <span className="text-[10px] font-bold text-gold flex items-center gap-1.5 italic">
                                        Antigravity OS
                                    </span>
                                </div>
                            </div>
                            <div className="h-2 w-2 rounded-full bg-gold animate-pulse shadow-[0_0_10px_#C9A96E]" />
                        </div>

                        {/* Actions */}
                        <div className="p-3 grid grid-cols-2 gap-2">
                            {getContextActions().map((action: any, i: number) => (
                                action.href ? (
                                    <Link key={i} href={action.href} className="group relative">
                                        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300">
                                            <div className={`${action.color} mb-2`}>{action.icon}</div>
                                            <div className="text-[11px] font-medium text-white/90">{action.label}</div>
                                        </div>
                                    </Link>
                                ) : (
                                    <button
                                        key={i}
                                        onClick={action.onClick}
                                        className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300 text-left"
                                    >
                                        <div className={`${action.color} mb-2`}>{action.icon}</div>
                                        <div className="text-[11px] font-medium text-white/90">{action.label}</div>
                                    </button>
                                )
                            ))}
                        </div>

                        {/* Footer Branding */}
                        <div className="p-4 bg-white/[0.02] mt-2 flex items-center justify-center gap-2">
                            <div className="h-px w-8 bg-white/5" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-warm-gray-light/40 italic">
                                Built with Antigravity
                            </span>
                            <div className="h-px w-8 bg-white/5" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 1.5s infinite;
                }
            `}</style>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Cpu,
    Navigation,
    Search,
    Box,
    Moon,
    Sun,
    X,
    ChevronRight,
    Monitor,
    Shield,
    Terminal,
    Zap
} from 'lucide-react';
import Link from 'next/link';

export default function AntigravityBrowserControl() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [systemStatus, setSystemStatus] = useState('ACTIVE');

    // Simulate system pulse
    useEffect(() => {
        const statuses = ['ACTIVE', 'SCANNING', 'CALIBRATING', 'STABLE'];
        const interval = setInterval(() => {
            setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)]);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    const actions = [
        { icon: <Navigation size={18} />, label: 'Hızlı Gezinti', href: '/urunler', color: 'text-gold' },
        { icon: <Box size={18} />, label: 'Oda Planlayıcı', href: '/oda-planlayici', color: 'text-blue-400' },
        { icon: <Search size={18} />, label: 'Akıllı Arama', onClick: () => { }, color: 'text-purple-400' },
        { icon: isDarkMode ? <Sun size={18} /> : <Moon size={18} />, label: isDarkMode ? 'Gündüz Modu' : 'Gece Modu', onClick: toggleDarkMode, color: 'text-amber-400' },
    ];

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
                        className="pointer-events-auto h-14 px-6 rounded-full bg-charcoal/90 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center gap-3 group overflow-hidden"
                    >
                        <div className="relative">
                            <Cpu size={20} className="text-gold animate-pulse" />
                            <div className="absolute inset-0 bg-gold/30 blur-md rounded-full animate-ping" />
                        </div>
                        <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-white">
                            Antigravity Browser Control
                        </span>
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />

                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    </motion.button>
                ) : (
                    <motion.div
                        key="panel"
                        layoutId="control-center"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="pointer-events-auto w-[320px] bg-charcoal/95 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-[0_32px_64px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Terminal size={14} className="text-gold" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-warm-gray-light">System Dashboard</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-full hover:bg-white/10 text-warm-gray-light transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Status Bar */}
                        <div className="px-5 py-3 bg-black/40 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase text-warm-gray-light/60">Core Status</span>
                                    <span className="text-[10px] font-bold text-green-500 flex items-center gap-1.5">
                                        <Shield size={10} /> {systemStatus}
                                    </span>
                                </div>
                                <div className="w-[1px] h-6 bg-white/5" />
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase text-warm-gray-light/60">Control</span>
                                    <span className="text-[10px] font-bold text-white flex items-center gap-1.5">
                                        <Monitor size={10} /> v2.4.0
                                    </span>
                                </div>
                            </div>
                            <Zap size={14} className="text-gold animate-bounce" />
                        </div>

                        {/* Actions */}
                        <div className="p-3 grid grid-cols-2 gap-2">
                            {actions.map((action, i) => (
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

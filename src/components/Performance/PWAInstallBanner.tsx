'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const STORAGE_KEY = 'pwa_install_dismissed';
const DISMISS_DAYS = 30;

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallBanner() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [show, setShow] = useState(false);
    const [installed, setInstalled] = useState(false);

    useEffect(() => {
        // Don't show if already installed (standalone mode)
        if (window.matchMedia('(display-mode: standalone)').matches) return;

        // Check dismiss cooldown
        const dismissed = localStorage.getItem(STORAGE_KEY);
        if (dismissed && Date.now() - Number(dismissed) < DISMISS_DAYS * 24 * 60 * 60 * 1000) return;

        const handleBeforeInstall = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            // Show after 30 seconds or on 2nd visit
            setTimeout(() => setShow(true), 30_000);
        };

        const handleInstalled = () => setInstalled(true);

        window.addEventListener('beforeinstallprompt', handleBeforeInstall);
        window.addEventListener('appinstalled', handleInstalled);
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
            window.removeEventListener('appinstalled', handleInstalled);
        };
    }, []);

    const handleInstall = useCallback(async () => {
        if (!deferredPrompt) return;
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') setInstalled(true);
        setDeferredPrompt(null);
        setShow(false);
    }, [deferredPrompt]);

    const handleDismiss = useCallback(() => {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
        setShow(false);
    }, []);

    if (installed) return null;

    return (
        <AnimatePresence>
            {show && deferredPrompt && (
                <motion.div
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 120, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                    className="fixed bottom-0 left-0 right-0 z-[200] md:bottom-6 md:left-auto md:right-6 md:max-w-sm"
                >
                    <div className="bg-white dark:bg-[#2C2C2E] border-t md:border border-[#E8E3DC] dark:border-white/10 md:rounded-sm shadow-xl p-4 mx-0 md:mx-0">
                        <div className="flex items-start gap-3">
                            {/* İkon */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/icons/icon-72x72.png" alt="MAISON" width={44} height={44}
                                className="rounded-xl flex-shrink-0 bg-[#F5F0EB]"
                                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-bold text-[#1C1C1E] dark:text-[#F5F0EB]">
                                    MAISON&apos;u Ana Ekrana Ekle
                                </p>
                                <p className="text-[11px] text-[#666] dark:text-[#AEAEB2] mt-0.5">
                                    Daha hızlı erişim, offline kullanım
                                </p>
                                <div className="flex items-center gap-3 mt-3">
                                    <button
                                        onClick={handleInstall}
                                        className="px-4 py-1.5 bg-[#C9A96E] text-white text-[12px] font-semibold rounded-sm hover:bg-[#B8915A] transition-colors"
                                    >
                                        Ekle
                                    </button>
                                    <button
                                        onClick={handleDismiss}
                                        className="text-[11px] text-[#999] hover:text-[#666] transition-colors"
                                    >
                                        Hayır, teşekkürler
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={handleDismiss}
                                className="p-1 text-[#ccc] hover:text-[#666] transition-colors flex-shrink-0"
                                aria-label="Kapat"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

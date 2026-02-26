'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

/* ─── WhatsApp SVG icon ─────────────────────────────────────────────── */
function WhatsAppIcon({ size = 24 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
    );
}

/* ─── Business hours check (Turkey, GMT+3) ──────────────────────────── */
function isBusinessHours(): boolean {
    const now = new Date();
    const tr = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
    const h = tr.getHours();
    return h >= 9 && h < 18;
}

/* ─── URL builder ────────────────────────────────────────────────────── */
function buildWhatsAppUrl(pathname: string, productName?: string): string {
    const phone = '905000000000'; // replace with real number
    let message = 'Merhaba! Mobilya hakkında bilgi almak istiyorum.';

    if (pathname.startsWith('/urun/') && productName) {
        message = `Merhaba! "${productName}" ürünü hakkında bilgi almak istiyorum.\nÜrün linki: ${typeof window !== 'undefined' ? window.location.href : ''}`;
    } else if (pathname.startsWith('/sepet')) {
        message = 'Merhaba! Siparişim hakkında yardım almak istiyorum.';
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/* ─── Main component ─────────────────────────────────────────────────── */
interface WhatsAppButtonProps {
    productName?: string;
}

export default function WhatsAppButton({ productName }: WhatsAppButtonProps) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipDismissed, setTooltipDismissed] = useState(false);
    const [showOfflineWarning, setShowOfflineWarning] = useState(false);
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    // Don't show on checkout page
    const isHidden = pathname.startsWith('/odeme');

    // Animate in after 3 seconds
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 3000);
        return () => clearTimeout(t);
    }, []);

    // Show tooltip after mount (once)
    useEffect(() => {
        if (!mounted) return;
        const dismissed = localStorage.getItem('waChatDismissed') === '1';
        if (dismissed) { setTooltipDismissed(true); return; }
        const t = setTimeout(() => setShowTooltip(true), 500);
        const t2 = setTimeout(() => setShowTooltip(false), 5500);
        return () => { clearTimeout(t); clearTimeout(t2); };
    }, [mounted]);

    // Hide when keyboard opens
    useEffect(() => {
        const vp = window.visualViewport;
        if (!vp) return;
        const handle = () => setKeyboardOpen(vp.height < window.innerHeight * 0.75);
        vp.addEventListener('resize', handle);
        return () => vp.removeEventListener('resize', handle);
    }, []);

    const dismissTooltip = useCallback(() => {
        setShowTooltip(false);
        setTooltipDismissed(true);
        localStorage.setItem('waChatDismissed', '1');
    }, []);

    const handleClick = useCallback(() => {
        if (!isBusinessHours()) {
            setShowOfflineWarning(true);
            return;
        }
        const url = buildWhatsAppUrl(pathname, productName);
        window.open(url, '_blank', 'noopener,noreferrer');
    }, [pathname, productName]);

    const handleOpenAnyway = useCallback(() => {
        setShowOfflineWarning(false);
        const url = buildWhatsAppUrl(pathname, productName);
        window.open(url, '_blank', 'noopener,noreferrer');
    }, [pathname, productName]);

    if (isHidden || keyboardOpen) return null;

    return (
        <>
            <AnimatePresence>
                {mounted && (
                    <motion.div
                        key="wa-button"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0 }}
                        className="fixed z-[39]"
                        style={{
                            right: 16,
                            bottom: 'calc(64px + env(safe-area-inset-bottom) + 16px)',
                        }}
                    // Desktop overrides via inline media would conflict — handle via Tailwind responsive
                    >
                        <div className="relative flex items-center">
                            {/* Tooltip */}
                            <AnimatePresence>
                                {showTooltip && !tooltipDismissed && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: 10, scale: 0.9 }}
                                        className="absolute right-full mr-3 flex items-center gap-1.5 whitespace-nowrap"
                                        style={{ bottom: '50%', transform: 'translateY(50%)' }}
                                    >
                                        <div
                                            className="relative px-3 py-2 rounded-xl text-[12px] font-medium text-[#1C1C1E] shadow-lg"
                                            style={{ background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
                                        >
                                            Merhaba! 👋 Yardım ister misiniz?
                                            {/* Arrow */}
                                            <div
                                                className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rotate-45"
                                                style={{ background: 'white' }}
                                            />
                                        </div>
                                        <button
                                            onClick={dismissTooltip}
                                            className="w-5 h-5 rounded-full bg-[#E8E3DC] flex items-center justify-center flex-shrink-0"
                                            aria-label="Kapat"
                                        >
                                            <X size={10} className="text-[#666]" />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Main FAB */}
                            <motion.button
                                onClick={handleClick}
                                className="relative w-12 h-12 rounded-full flex items-center justify-center focus:outline-none"
                                style={{
                                    background: '#25D366',
                                    boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
                                    WebkitTapHighlightColor: 'transparent',
                                }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="WhatsApp ile destek al"
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
                            >
                                <WhatsAppIcon size={24} />
                                {/* Pulse ring */}
                                <motion.div
                                    className="absolute inset-[-6px] rounded-full border-2 pointer-events-none"
                                    style={{ borderColor: 'rgba(37,211,102,0.5)' }}
                                    animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                                    transition={{ duration: 2, repeat: 3, ease: 'easeOut' }}
                                />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Offline hours modal */}
            <AnimatePresence>
                {showOfflineWarning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-end justify-center p-4 bg-black/40"
                        onClick={() => setShowOfflineWarning(false)}
                    >
                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 40, opacity: 0 }}
                            className="w-full max-w-sm bg-white rounded-2xl p-6 text-center"
                            style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="text-3xl mb-3">🌙</div>
                            <h3 className="font-bold text-[17px] text-[#1C1C1E] mb-1">Şu an çevrimdışıyız</h3>
                            <p className="text-[13px] text-[#666] mb-5">
                                Mesajınızı bırakın, mesai saatlerinde (09:00–18:00) yanıtlayalım.
                            </p>
                            <button
                                onClick={handleOpenAnyway}
                                className="w-full py-3.5 rounded-xl text-[14px] font-bold text-white mb-3"
                                style={{ background: '#25D366' }}
                            >
                                Yine de Mesaj Gönder
                            </button>
                            <button
                                onClick={() => setShowOfflineWarning(false)}
                                className="text-[13px] text-[#999]"
                            >
                                İptal
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

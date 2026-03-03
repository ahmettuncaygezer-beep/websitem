'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

const CONSENT_KEY = 'selis_cookie_consent';

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Show banner if consent not yet given
        const consent = localStorage.getItem(CONSENT_KEY);
        if (!consent) {
            // Small delay so the banner doesn't flash on initial load
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const accept = () => {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        setVisible(false);
    };

    const reject = () => {
        localStorage.setItem(CONSENT_KEY, 'rejected');
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto bg-[#1C1C1E] text-white rounded-2xl p-6 md:p-8 shadow-2xl border border-white/5">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            {/* Icon + Text */}
                            <div className="flex items-start gap-4 flex-1">
                                <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/15 flex items-center justify-center shrink-0 mt-0.5">
                                    <Cookie size={18} className="text-[#C9A96E]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-sans font-bold mb-1" data-lang-key="cookie_title">Çerez Kullanımı</h3>
                                    <p className="text-xs font-sans text-white/60 leading-relaxed">
                                        <span data-lang-key="cookie_desc_1">Deneyiminizi iyileştirmek için çerezler kullanıyoruz.</span>{' '}
                                        <Link
                                            href="/cerez"
                                            className="text-[#C9A96E] hover:text-[#D4B87A] underline underline-offset-2 transition-colors"
                                            data-lang-key="cookie_policy_link"
                                        >
                                            Çerez Politikamızı
                                        </Link>{' '}
                                        <span data-lang-key="cookie_desc_2">inceleyerek detaylı bilgi alabilirsiniz.</span>
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                                <button
                                    onClick={reject}
                                    className="flex-1 md:flex-none px-5 py-2.5 text-xs font-sans font-bold uppercase tracking-wider text-white/60 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all"
                                    data-lang-key="cookie_reject"
                                >
                                    Reddet
                                </button>
                                <button
                                    onClick={accept}
                                    className="flex-1 md:flex-none px-6 py-2.5 text-xs font-sans font-bold uppercase tracking-wider bg-[#C9A96E] hover:bg-[#B8915A] text-[#0D0D0F] rounded-xl transition-all"
                                    data-lang-key="cookie_accept"
                                >
                                    Kabul Et
                                </button>
                            </div>
                        </div>

                        {/* Close */}
                        <button
                            onClick={reject}
                            className="absolute top-3 right-3 p-1.5 text-white/30 hover:text-white/60 transition-colors"
                            aria-label="Kapat"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

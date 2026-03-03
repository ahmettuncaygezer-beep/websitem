'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Mail } from 'lucide-react';
import { useExitIntent } from './useExitIntent';

const COUPON_CODE = 'SELIS10';

export default function ExitIntentPopup() {
    const { shouldShow, dismiss } = useExitIntent();
    const [copied, setCopied] = useState(false);
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(COUPON_CODE);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // fallback
        }
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        // API call placeholder
        console.log('Kupon gönderildi:', email);
        setSent(true);
    };

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <AnimatePresence>
            {shouldShow && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                        onClick={dismiss}
                    />

                    {/* Popup */}
                    <motion.div
                        initial={isMobile
                            ? { y: '100%', opacity: 1 }
                            : { scale: 0.9, opacity: 0 }
                        }
                        animate={isMobile
                            ? { y: 0, opacity: 1 }
                            : { scale: 1, opacity: 1 }
                        }
                        exit={isMobile
                            ? { y: '100%', opacity: 1 }
                            : { scale: 0.95, opacity: 0 }
                        }
                        transition={{ type: 'spring', damping: 28, stiffness: 300, duration: 0.35 }}
                        className={`
              fixed z-[61] bg-white overflow-hidden
              ${isMobile
                                ? 'bottom-0 left-0 right-0 rounded-t-2xl max-h-[85vh] overflow-y-auto'
                                : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[520px] rounded-sm shadow-2xl'
                            }
            `}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Özel indirim teklifi"
                    >
                        {/* Hero görsel */}
                        <div
                            className="relative w-full bg-gradient-to-br from-[#1C1C1E] via-[#2C2C2E] to-[#1C1C1E] flex items-center justify-center"
                            style={{ aspectRatio: '16/7' }}
                        >
                            <div className="text-center text-white px-6">
                                <p className="text-[11px] text-[#C9A96E] tracking-[0.3em] uppercase font-medium mb-2">
                                    Özel Teklif
                                </p>
                                <p className="text-2xl font-bold tracking-wider"
                                    style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                                    SELIS
                                </p>
                            </div>

                            {/* Kapat butonu */}
                            <button
                                onClick={dismiss}
                                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                                aria-label="Kapat"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* İçerik */}
                        <div className="p-6 md:p-8">
                            {/* Başlık */}
                            <h2 className="text-2xl font-bold text-[#1C1C1E] italic text-center mb-1"
                                style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                                Gitmeden önce...
                            </h2>
                            <p className="text-[13px] text-[#666] text-center mb-5">
                                Sepetinizdeki ürünler için özel bir teklifimiz var.
                            </p>

                            {/* İndirim kutusu */}
                            <div className="border-2 border-[#C9A96E] rounded-sm p-4 text-center mb-5 bg-[#F5F0EB]">
                                <p className="text-5xl font-bold text-[#C9A96E] leading-none"
                                    style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                                    %10
                                </p>
                                <p className="text-sm font-semibold text-[#1C1C1E] mt-1">İNDİRİM</p>
                                <p className="text-[11px] text-[#666] mt-0.5">İlk siparişinizde geçerli</p>
                            </div>

                            {/* Kupon kodu */}
                            <div className="flex items-center gap-2 mb-5">
                                <div className="flex-1 border-2 border-dashed border-[#E8E3DC] rounded-sm px-4 py-2.5 text-center">
                                    <span className="text-lg font-bold text-[#1C1C1E] tracking-[0.15em]">
                                        {COUPON_CODE}
                                    </span>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-sm text-[12px] font-semibold transition-all ${copied
                                            ? 'bg-green-500 text-white'
                                            : 'bg-[#1C1C1E] text-white hover:bg-[#333]'
                                        }`}
                                >
                                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                    {copied ? 'Kopyalandı ✓' : 'Kopyala'}
                                </button>
                            </div>

                            {/* E-posta gönder */}
                            {!sent ? (
                                <form onSubmit={handleSend} className="flex gap-2 mb-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="e-posta@adresiniz.com"
                                        className="flex-1 border border-[#E8E3DC] rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-[#C9A96E] transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        className="flex items-center gap-1.5 px-4 py-2 bg-[#C9A96E] text-white rounded-sm text-[12px] font-semibold hover:bg-[#B8915A] transition-colors"
                                    >
                                        <Mail className="w-3.5 h-3.5" />
                                        Gönder
                                    </button>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center text-green-600 text-[13px] font-medium mb-3 py-2 bg-green-50 rounded-sm"
                                >
                                    ✓ Kupon kodunuz e-postanıza gönderildi!
                                </motion.div>
                            )}

                            {/* GDPR notu */}
                            <p className="text-center text-[10px] text-[#aaa] mb-4">
                                Spam göndermeyiz. İstediğiniz zaman çıkabilirsiniz.
                            </p>

                            {/* Hayır teşekkürler */}
                            <button
                                onClick={dismiss}
                                className="block w-full text-center text-[11px] text-[#bbb] hover:text-[#666] transition-colors"
                            >
                                Hayır teşekkürler, tam fiyatla devam edeceğim
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

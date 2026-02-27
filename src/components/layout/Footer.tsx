'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITE_NAME, NAVIGATION } from '@/lib/constants';

export function Footer() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setStatus('error');
            setMessage('Lütfen geçerli bir e-posta adresi giriniz.');
            return;
        }

        setStatus('loading');

        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Save to localStorage
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
        }

        setStatus('success');
        setMessage('Teşekkürler! Bültenimize başarıyla kaydoldunuz.');
        setEmail('');
    };

    return (
        <footer className="bg-section text-foreground border-t border-glass-border overflow-hidden">
            {/* Newsletter */}
            <div className="border-b border-white/10">
                <div className="container-premium py-16">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="font-serif text-2xl md:text-3xl mb-2 text-foreground" style={{ fontFamily: 'var(--font-playfair, serif)' }} data-lang-key="footer_newsletter_title">İlham Bülteniniz</h3>
                            <p className="text-muted-foreground font-sans text-sm" data-lang-key="footer_newsletter_desc">
                                Yeni koleksiyonlar, trendler ve özel tekliflerden ilk siz haberdar olun.
                            </p>
                        </div>
                        <div className="w-full md:w-auto relative">
                            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-0">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="E-posta adresiniz"
                                    required
                                    disabled={status === 'loading' || status === 'success'}
                                    className="flex-1 w-full min-w-[200px] md:w-80 px-6 py-3.5 bg-background/50 border border-glass-border rounded-l-full text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-maison-gold transition-colors disabled:opacity-50 backdrop-blur-md"
                                    data-lang-key="footer_newsletter_placeholder"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading' || status === 'success'}
                                    className="px-8 py-3.5 bg-maison-gold text-black text-sm font-sans font-semibold uppercase tracking-wider rounded-r-full hover:bg-maison-gold-dark transition-all whitespace-nowrap disabled:opacity-50 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
                                        </>
                                    ) : <span data-lang-key="footer_newsletter_btn">Katıl</span>}
                                </button>
                            </form>
                            {message && (
                                <p className={`absolute -bottom-6 left-0 text-xs font-medium ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                                    {message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main footer */}
            <div className="container-premium py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <Link href="/" className="font-serif text-2xl tracking-[0.2em] font-medium block mb-4 text-foreground" style={{ fontFamily: 'var(--font-playfair, serif)' }}>
                            {SITE_NAME}
                        </Link>
                        <p className="text-muted-foreground font-sans text-sm leading-relaxed" data-lang-key="footer_brand_desc">
                            Premium mobilya ve ev dekorasyonu. Evinizin yeni hikayesini birlikte yazalım.
                        </p>
                    </div>

                    {/* Navigation columns */}
                    {NAVIGATION.slice(0, 3).map((nav) => (
                        <div key={nav.label}>
                            <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-maison-gold mb-5">
                                {nav.label}
                            </h4>
                            <ul className="space-y-2.5">
                                {nav.children?.slice(0, 2).flatMap((cat) =>
                                    cat.items.slice(0, 4).map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className="text-sm font-sans text-muted-foreground hover:text-maison-gold transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    ))}

                    {/* Support */}
                    <div>
                        <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-maison-gold mb-5" data-lang-key="footer_support_title">
                            Destek
                        </h4>
                        <ul className="space-y-2.5">
                            <li>
                                <Link href="/iletisim" className="text-sm font-sans text-muted-foreground hover:text-maison-gold transition-colors" data-lang-key="footer_support_contact">
                                    İletişim
                                </Link>
                            </li>
                            <li>
                                <Link href="/sss" className="text-sm font-sans text-muted-foreground hover:text-maison-gold transition-colors" data-lang-key="footer_support_faq">
                                    Sıkça Sorulan Sorular
                                </Link>
                            </li>
                            <li>
                                <Link href="/kargo" className="text-sm font-sans text-muted-foreground hover:text-maison-gold transition-colors" data-lang-key="footer_support_shipping">
                                    Kargo & Teslimat
                                </Link>
                            </li>
                            <li>
                                <Link href="/iade" className="text-sm font-sans text-muted-foreground hover:text-maison-gold transition-colors" data-lang-key="footer_support_returns">
                                    İade Politikası
                                </Link>
                            </li>
                            <li>
                                <Link href="/garanti" className="text-sm font-sans text-muted-foreground hover:text-maison-gold transition-colors" data-lang-key="footer_support_warranty">
                                    Garanti Koşulları
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-glass-border">
                <div className="container-premium py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-sans text-muted-foreground opacity-60">
                        © 2026 {SITE_NAME}. <span data-lang-key="footer_all_rights">Tüm hakları saklıdır.</span>
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/gizlilik" className="text-xs font-sans text-muted-foreground hover:text-maison-gold transition-colors" data-lang-key="footer_privacy">
                            Gizlilik Politikası
                        </Link>
                        <Link href="/kullanim-kosullari" className="text-xs font-sans text-muted-foreground hover:text-maison-gold transition-colors" data-lang-key="footer_terms">
                            Kullanım Koşulları
                        </Link>
                        <Link href="/cerez" className="text-xs font-sans text-muted-foreground hover:text-maison-gold transition-colors" data-lang-key="footer_cookies">
                            Çerez Politikası
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

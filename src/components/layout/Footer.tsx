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
        <footer className="bg-charcoal text-white">
            {/* Newsletter */}
            <div className="border-b border-white/10">
                <div className="container-premium py-16">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="font-serif text-2xl md:text-3xl mb-2">İlham Bülteniniz</h3>
                            <p className="text-white/60 font-sans text-sm">
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
                                    className="flex-1 w-full min-w-[200px] md:w-80 px-6 py-3.5 bg-white/10 border border-white/20 rounded-l-full text-sm font-sans text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading' || status === 'success'}
                                    className="px-8 py-3.5 bg-gold text-white text-sm font-sans font-semibold uppercase tracking-wider rounded-r-full hover:bg-gold-dark transition-colors whitespace-nowrap disabled:opacity-50 flex items-center gap-2"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                        </>
                                    ) : 'Katıl'}
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
                        <Link href="/" className="font-serif text-2xl tracking-[0.2em] font-medium block mb-4">
                            {SITE_NAME}
                        </Link>
                        <p className="text-white/50 font-sans text-sm leading-relaxed">
                            Premium mobilya ve ev dekorasyonu. Evinizin yeni hikayesini birlikte yazalım.
                        </p>
                    </div>

                    {/* Navigation columns */}
                    {NAVIGATION.slice(0, 3).map((nav) => (
                        <div key={nav.label}>
                            <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-gold mb-5">
                                {nav.label}
                            </h4>
                            <ul className="space-y-2.5">
                                {nav.children?.slice(0, 2).flatMap((cat) =>
                                    cat.items.slice(0, 4).map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className="text-sm font-sans text-white/50 hover:text-white transition-colors"
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
                        <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-gold mb-5">
                            Destek
                        </h4>
                        <ul className="space-y-2.5">
                            <li>
                                <Link href="/iletisim" className="text-sm font-sans text-white/50 hover:text-white transition-colors">
                                    İletişim
                                </Link>
                            </li>
                            <li>
                                <Link href="/sss" className="text-sm font-sans text-white/50 hover:text-white transition-colors">
                                    Sıkça Sorulan Sorular
                                </Link>
                            </li>
                            <li>
                                <Link href="/kargo" className="text-sm font-sans text-white/50 hover:text-white transition-colors">
                                    Kargo & Teslimat
                                </Link>
                            </li>
                            <li>
                                <Link href="/iade" className="text-sm font-sans text-white/50 hover:text-white transition-colors">
                                    İade Politikası
                                </Link>
                            </li>
                            <li>
                                <Link href="/garanti" className="text-sm font-sans text-white/50 hover:text-white transition-colors">
                                    Garanti Koşulları
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="container-premium py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-sans text-white/30">
                        © 2026 {SITE_NAME}. Tüm hakları saklıdır.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/gizlilik" className="text-xs font-sans text-white/30 hover:text-white/60 transition-colors">
                            Gizlilik Politikası
                        </Link>
                        <Link href="/kullanim-kosullari" className="text-xs font-sans text-white/30 hover:text-white/60 transition-colors">
                            Kullanım Koşulları
                        </Link>
                        <Link href="/cerez" className="text-xs font-sans text-white/30 hover:text-white/60 transition-colors">
                            Çerez Politikası
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

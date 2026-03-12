'use client';

import { useState } from 'react';
import { useGlobal } from '@/context/GlobalContext';

export function NewsletterForm() {
    const { t } = useGlobal();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setStatus('error');
            setMessage(t('footer_newsletter_error'));
            return;
        }

        setStatus('loading');

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setStatus('success');
                setMessage(t('footer_newsletter_success'));
                setEmail('');
            } else {
                const data = await res.json();
                setStatus('error');
                setMessage(data.error || t('footer_newsletter_error_general'));
            }
        } catch {
            setStatus('error');
            setMessage(t('footer_newsletter_error_network'));
        }
    };

    return (
        <div className="w-full md:w-auto relative">
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-0">
                <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer_newsletter_placeholder')}
                    required
                    disabled={status === 'loading' || status === 'success'}
                    className="flex-1 w-full min-w-[200px] md:w-80 px-6 py-3.5 bg-background/50 border border-glass-border rounded-l-full text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-selis-gold transition-colors disabled:opacity-50 backdrop-blur-md"
                    data-lang-key="footer_newsletter_placeholder"
                />
                <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="px-8 py-3.5 bg-selis-gold text-black text-sm font-sans font-semibold uppercase tracking-wider rounded-r-full hover:bg-selis-gold-dark transition-all whitespace-nowrap disabled:opacity-50 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                    {status === 'loading' ? (
                        <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : <span data-lang-key="footer_newsletter_btn">Katıl</span>}
                </button>
            </form>
            {message && (
                <p className={`absolute -bottom-6 left-0 text-xs font-medium ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

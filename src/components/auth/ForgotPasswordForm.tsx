'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';

interface Props {
    onBack: () => void;
}

export function ForgotPasswordForm({ onBack }: Props) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [focused, setFocused] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        setLoading(false);
        setSent(true);
    };

    if (sent) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-8 py-8 text-center"
            >
                <div className="text-5xl mb-4">✉️</div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#1C1C1E', fontFamily: 'var(--font-playfair)' }} data-lang-key="auth_check_email">
                    E-postanızı Kontrol Edin
                </h3>
                <p className="text-[13px] mb-6" style={{ color: '#999' }}>
                    <strong style={{ color: '#1C1C1E' }}>{email}</strong> <span data-lang-key="auth_reset_sent_to">adresine şifre sıfırlama bağlantısı gönderdik.</span>
                </p>
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 mb-3 text-[13px] font-medium"
                    style={{ border: '1px solid #E0E0E0', borderRadius: '6px', background: 'white', cursor: 'pointer', color: '#1C1C1E' }}
                >
                    <span data-lang-key="auth_resend_email">E-postayı Yeniden Gönder</span>
                </button>
                <button
                    onClick={onBack}
                    className="text-[12px] font-medium"
                    style={{ color: '#C9A96E', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <span data-lang-key="auth_back_to_login">← Giriş Sayfasına Dön</span>
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="px-8 pb-6">
            <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-1 text-[12px] font-medium mb-4"
                style={{ color: '#C9A96E', background: 'none', border: 'none', cursor: 'pointer' }}
            >
                <ArrowLeft size={14} /> <span data-lang-key="auth_back_to_login">Giriş Sayfasına Dön</span>
            </button>

            <h3 className="text-lg font-semibold mb-1" style={{ color: '#1C1C1E', fontFamily: 'var(--font-playfair)' }} data-lang-key="auth_forgot_title">
                Şifremi Unuttum
            </h3>
            <p className="text-[13px] mb-6" style={{ color: '#999' }} data-lang-key="auth_forgot_desc">
                E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
            </p>

            <div className="mb-4">
                <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }} data-lang-key="auth_email_label">E-posta adresi</label>
                <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200" style={{ color: focused ? '#C9A96E' : '#CCC' }} />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder="ornek@email.com"
                        className="w-full pl-10 pr-4 py-3 text-[14px] outline-none transition-colors duration-200"
                        style={{ border: focused ? '1px solid #C9A96E' : '1px solid #E0E0E0', borderRadius: '6px', color: '#1C1C1E' }}
                    />
                </div>
            </div>

            <motion.button
                type="submit"
                disabled={loading || !email}
                whileHover={loading ? {} : { y: -1 }}
                whileTap={loading ? {} : { scale: 0.98 }}
                className="w-full py-3.5 text-[13px] font-semibold tracking-wide flex items-center justify-center gap-2"
                style={{
                    background: loading || !email ? '#666' : '#1C1C1E',
                    color: 'white',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: loading || !email ? 'not-allowed' : 'pointer',
                }}
            >
                {loading ? (
                    <>
                        <div className="animate-spin" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #C9A96E', borderRadius: '50%' }} />
                        <span data-lang-key="auth_sending">Gönderiliyor...</span>
                    </>
                ) : (
                    <span data-lang-key="auth_send_reset_link">Sıfırlama Bağlantısı Gönder</span>
                )}
            </motion.button>
        </form>
    );
}

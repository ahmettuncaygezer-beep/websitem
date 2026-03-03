'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { SocialLogin } from './SocialLogin';
import { AuthDivider } from './AuthDivider';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { useTranslationStore, translations } from '@/store/translationStore';

export function AuthModal() {
    const { isAuthModalOpen, authModalView, closeAuthModal } = useAuthStore();
    const [view, setView] = useState<'login' | 'register' | 'forgot' | 'success'>(authModalView);
    const { language } = useTranslationStore();
    const t = (key: string) => translations[language]?.[key];

    useEffect(() => {
        setView(authModalView);
    }, [authModalView]);

    // Lock body scroll when open
    useEffect(() => {
        if (isAuthModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isAuthModalOpen]);

    const titles: Record<string, { title: string; subtitle: string; titleKey: string; subKey: string }> = {
        login: { title: 'Tekrar Hoş Geldiniz', subtitle: 'Premium mobilya dünyasına girin', titleKey: 'auth_welcome_title', subKey: 'auth_welcome_sub' },
        register: { title: 'Hesap Oluşturun', subtitle: 'SELIS HOME CONCEPT ailesine katılın', titleKey: 'auth_register_title', subKey: 'auth_register_sub' },
        forgot: { title: 'Şifre Sıfırlama', subtitle: 'E-posta adresinize bağlantı göndereceğiz', titleKey: 'auth_forgot_title', subKey: 'auth_forgot_sub' },
        success: { title: 'Tebrikler! 🎉', subtitle: 'Hesabınız başarıyla oluşturuldu', titleKey: 'auth_success_title', subKey: 'auth_success_sub' },
    };

    const current = titles[view] || titles.login;

    return (
        <AnimatePresence>
            {isAuthModalOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeAuthModal}
                        className="fixed inset-0 z-50"
                        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                        className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] max-w-[95vw] max-h-[90vh] overflow-y-auto"
                        style={{ background: 'white', borderRadius: '12px' }}
                    >
                        {/* Header */}
                        <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1C1C1E, #2C2C2E)', padding: '32px 32px 24px' }}>
                            {/* Decorative watermark */}
                            <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-[80px] font-bold opacity-[0.04] tracking-wider select-none" style={{ fontFamily: 'var(--font-playfair)', color: 'white' }}>
                                M
                            </div>

                            {/* Close button */}
                            <button
                                onClick={closeAuthModal}
                                className="absolute right-4 top-4 p-1 transition-colors duration-200"
                                style={{ color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer' }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                            >
                                <X size={20} />
                            </button>

                            {/* Logo */}
                            <div className="text-xl text-white font-bold tracking-wider" style={{ fontFamily: 'var(--font-playfair)' }}>
                                SELIS
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl text-white mt-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                                {t(current.titleKey) || current.title}
                            </h2>
                            <p className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                                {t(current.subKey) || current.subtitle}
                            </p>

                            {/* Tabs */}
                            {(view === 'login' || view === 'register') && (
                                <div className="flex mt-4 -mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    {[
                                        { key: 'login' as const, label: 'Giriş Yap', langKey: 'auth_tab_login' },
                                        { key: 'register' as const, label: 'Kayıt Ol', langKey: 'auth_register_btn' }
                                    ].map((tab) => (
                                        <button
                                            key={tab.key}
                                            onClick={() => setView(tab.key)}
                                            className="flex-1 py-3 text-center text-[13px] font-medium transition-colors duration-200"
                                            style={{
                                                color: view === tab.key ? 'white' : 'rgba(255,255,255,0.6)',
                                                background: 'none',
                                                border: 'none',
                                                borderBottomWidth: '2px',
                                                borderBottomStyle: 'solid',
                                                borderBottomColor: view === tab.key ? '#C9A96E' : 'transparent',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {t(tab.langKey) || tab.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={view}
                                initial={{ opacity: 0, x: view === 'register' ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: view === 'register' ? -20 : 20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {view === 'login' && (
                                    <>
                                        <SocialLogin />
                                        <AuthDivider />
                                        <LoginForm
                                            onForgotPassword={() => setView('forgot')}
                                            onSwitchToRegister={() => setView('register')}
                                        />
                                    </>
                                )}
                                {view === 'register' && (
                                    <>
                                        <SocialLogin />
                                        <AuthDivider />
                                        <RegisterForm
                                            onSwitchToLogin={() => setView('login')}
                                            onSuccess={() => setView('success')}
                                        />
                                    </>
                                )}
                                {view === 'forgot' && (
                                    <ForgotPasswordForm onBack={() => setView('login')} />
                                )}
                                {view === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="px-8 py-8 text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.2 }}
                                            className="text-6xl mb-4"
                                        >
                                            ✉️
                                        </motion.div>
                                        <h3 className="text-lg font-semibold mb-2" style={{ color: '#1C1C1E', fontFamily: 'var(--font-playfair)' }} data-lang-key="auth_verify_email">
                                            E-postanızı Doğrulayın
                                        </h3>
                                        <p className="text-[13px] mb-6" style={{ color: '#999' }} data-lang-key="auth_verify_desc">
                                            Doğrulama linki e-posta adresinize gönderildi.
                                        </p>
                                        <button
                                            onClick={() => setView('login')}
                                            className="w-full py-3 text-[13px] font-semibold"
                                            style={{ background: '#1C1C1E', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                                        >
                                            <span data-lang-key="auth_back_to_login">Giriş Sayfasına Dön</span>
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

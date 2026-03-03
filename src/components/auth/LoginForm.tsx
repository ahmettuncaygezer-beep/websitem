'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTranslationStore, translations } from '@/store/translationStore';

interface Props {
    onForgotPassword: () => void;
    onSwitchToRegister: () => void;
}

export function LoginForm({ onForgotPassword, onSwitchToRegister }: Props) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const { language } = useTranslationStore();
    const t = (key: string) => translations[language]?.[key];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        // The provided Code Edit block seems to be for a registration form, not a login form.
        // Applying the spirit of the instruction "Replace hardcoded Turkish strings with translation keys"
        // to the existing login form's validation logic.
        if (!email || !password) {
            setError(t('auth_error_all_fields') || 'Lütfen tüm alanları doldurun.');
            return;
        }
        setLoading(true);
        try {
            const success = await login(email, password);
            if (!success) setError(t('auth_error_invalid_credentials') || 'E-posta veya şifre hatalı.');
        } catch {
            setError(t('auth_error_generic') || 'Bir hata oluştu. Tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="px-8 pb-6">
            {/* Email */}
            <div className="mb-4">
                <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>
                    {t('auth_email_label') || "E-posta adresi"}
                </label>
                <div className="relative">
                    <Mail
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                        style={{ color: emailFocused ? '#C9A96E' : '#CCC' }}
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        autoComplete="email"
                        placeholder={t('auth_email_placeholder') || "ornek@email.com"}
                        className="w-full pl-10 pr-4 py-3 text-[14px] outline-none transition-colors duration-200"
                        style={{
                            border: error ? '1px solid #E53935' : emailFocused ? '1px solid #C9A96E' : '1px solid #E0E0E0',
                            borderRadius: '6px',
                            color: '#1C1C1E',
                        }}
                    />
                </div>
            </div>

            {/* Password */}
            <div className="mb-3">
                <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>
                    {t('auth_password_label') || "Şifre"}
                </label>
                <div className="relative">
                    <Lock
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                        style={{ color: passwordFocused ? '#C9A96E' : '#CCC' }}
                    />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 text-[14px] outline-none transition-colors duration-200"
                        style={{
                            border: error ? '1px solid #E53935' : passwordFocused ? '1px solid #C9A96E' : '1px solid #E0E0E0',
                            borderRadius: '6px',
                            color: '#1C1C1E',
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        style={{ color: '#CCC', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between mt-2 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <div
                        onClick={() => setRememberMe(!rememberMe)}
                        className="flex items-center justify-center transition-colors duration-200"
                        style={{
                            width: '16px',
                            height: '16px',
                            border: '1px solid #E0E0E0',
                            borderRadius: '3px',
                            background: rememberMe ? '#1C1C1E' : 'white',
                            cursor: 'pointer',
                        }}
                    >
                        {rememberMe && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </div>
                    <span className="text-[12px]" style={{ color: '#666' }}>{t('auth_remember_me') || "Beni Hatırla"}</span>
                </label>
                <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-[12px] hover:underline"
                    style={{ color: '#C9A96E', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <span>{t('auth_forgot_link') || "Şifremi Unuttum →"}</span>
                </button>
            </div>

            {/* Submit */}
            <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex justify-center py-3.5 px-4 mb-4 border border-transparent rounded-sm shadow-sm text-sm font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider mt-6"
                style={{
                    background: loading ? '#666' : '#1C1C1E',
                    color: 'white',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                }}
            >
                {loading ? (
                    <span>{t('auth_logging_in') || "Giriş yapılıyor..."}</span>
                ) : (
                    <span>{t('auth_login_btn') || "Giriş Yap"}</span>
                )}
            </motion.button>

            {/* Error */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: [0, -8, 8, -8, 8, 0] }}
                    transition={{ x: { duration: 0.4 } }}
                    className="mt-3 px-4 py-3 text-[13px]"
                    style={{
                        background: '#FFF3F3',
                        border: '1px solid #FFCDD2',
                        borderRadius: '6px',
                        color: '#E53935',
                    }}
                >
                    ✗ {error}
                </motion.div>
            )}

            {/* Switch to register */}
            <p className="text-center mt-4 text-[12px]" style={{ color: '#999' }}>
                <span>{t('auth_no_account') || "Hesabınız yok mu?"}</span>{' '}
                <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="font-medium hover:underline"
                    style={{ color: '#C9A96E', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <span>{t('auth_register_link') || "Kayıt Olun →"}</span>
                </button>
            </p>
        </form>
    );
}

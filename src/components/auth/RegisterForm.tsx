'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
import { PasswordStrength } from './PasswordStrength';
import { useAuth } from '@/hooks/useAuth';
import { useTranslationStore, translations } from '@/store/translationStore';

interface Props {
    onSwitchToLogin: () => void;
    onSuccess: () => void;
}

export function RegisterForm({ onSwitchToLogin, onSuccess }: Props) {
    const { register } = useAuth();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        acceptMarketing: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [focusedField, setFocusedField] = useState('');
    const { language } = useTranslationStore();
    const t = (key: string) => translations[language]?.[key];

    const update = (field: string, value: string | boolean) =>
        setForm((f) => ({ ...f, [field]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.password) {
            setError('Lütfen tüm zorunlu alanları doldurun.');
            return;
        }
        if (form.password.length < 8) {
            setError('Şifre en az 8 karakter olmalıdır.');
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError('Şifreler eşleşmiyor.');
            return;
        }
        if (!form.acceptTerms) {
            setError('Kullanım koşullarını kabul etmeniz gerekiyor.');
            return;
        }

        setLoading(true);
        try {
            await register({
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phone: form.phone,
                password: form.password,
            });
            onSuccess();
        } catch {
            setError('Bir hata oluştu. Tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = (field: string, hasError = false) => ({
        border: hasError ? '1px solid #E53935' : focusedField === field ? '1px solid #C9A96E' : '1px solid #E0E0E0',
        borderRadius: '6px',
        color: '#1C1C1E' as const,
    });

    const iconColor = (field: string) => (focusedField === field ? '#C9A96E' : '#CCC');

    return (
        <form onSubmit={handleSubmit} className="px-8 pb-6">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                    <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>{t('auth_firstname_label') || "Ad"} *</label>
                    <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200" style={{ color: iconColor('firstName') }} />
                        <input
                            value={form.firstName}
                            onChange={(e) => update('firstName', e.target.value)}
                            onFocus={() => setFocusedField('firstName')}
                            onBlur={() => setFocusedField('')}
                            placeholder="Ali"
                            className="w-full pl-10 pr-3 py-3 text-[14px] outline-none transition-colors duration-200"
                            style={inputStyle('firstName')}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>{t('auth_lastname_label') || "Soyad"} *</label>
                    <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200" style={{ color: iconColor('lastName') }} />
                        <input
                            value={form.lastName}
                            onChange={(e) => update('lastName', e.target.value)}
                            onFocus={() => setFocusedField('lastName')}
                            onBlur={() => setFocusedField('')}
                            placeholder="Kaya"
                            className="w-full pl-10 pr-3 py-3 text-[14px] outline-none transition-colors duration-200"
                            style={inputStyle('lastName')}
                        />
                    </div>
                </div>
            </div>

            {/* Email */}
            <div className="mb-3">
                <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>
                    <span>{t('auth_email_label') || "E-posta adresi"}</span> *
                </label>
                <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200" style={{ color: iconColor('email') }} />
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        placeholder="ali@email.com"
                        autoComplete="email"
                        className="w-full pl-10 pr-4 py-3 text-[14px] outline-none transition-colors duration-200"
                        style={inputStyle('email')}
                    />
                </div>
            </div>

            {/* Phone */}
            <div className="mb-3">
                <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>{t('auth_phone_label') || "Telefon numarası"} *</label>
                <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200" style={{ color: iconColor('phone') }} />
                    <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField('')}
                        placeholder="+90 5XX XXX XXXX"
                        className="w-full pl-10 pr-4 py-3 text-[14px] outline-none transition-colors duration-200"
                        style={inputStyle('phone')}
                    />
                </div>
            </div>

            {/* Password */}
            <div className="mb-3">
                <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>
                    <span>{t('auth_password_label') || "Şifre"}</span> *
                </label>
                <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200" style={{ color: iconColor('password') }} />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={(e) => update('password', e.target.value)}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField('')}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 text-[14px] outline-none transition-colors duration-200"
                        style={inputStyle('password')}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#CCC', background: 'none', border: 'none', cursor: 'pointer' }}>
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
                {focusedField === 'password' && <PasswordStrength password={form.password} />}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
                <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>{t('auth_confirm_password_label') || "Şifre Tekrar"} *</label>
                <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200" style={{ color: iconColor('confirmPassword') }} />
                    <input
                        type={showConfirm ? 'text' : 'password'}
                        value={form.confirmPassword}
                        onChange={(e) => update('confirmPassword', e.target.value)}
                        onFocus={() => setFocusedField('confirmPassword')}
                        onBlur={() => setFocusedField('')}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 text-[14px] outline-none transition-colors duration-200"
                        style={inputStyle('confirmPassword', form.confirmPassword !== '' && form.password !== form.confirmPassword)}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#CCC', background: 'none', border: 'none', cursor: 'pointer' }}>
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
                {form.confirmPassword && form.password !== form.confirmPassword && (
                    <p className="text-[11px] mt-1" style={{ color: '#E53935' }}>Şifreler eşleşmiyor</p>
                )}
            </div>

            {/* Terms */}
            <div className="flex flex-col gap-3 mb-4">
                <label className="flex items-start gap-2 cursor-pointer">
                    <div
                        onClick={() => update('acceptTerms', !form.acceptTerms)}
                        className="flex-shrink-0 flex items-center justify-center mt-0.5"
                        style={{ width: '16px', height: '16px', border: '1px solid #E0E0E0', borderRadius: '3px', background: form.acceptTerms ? '#1C1C1E' : 'white', cursor: 'pointer' }}
                    >
                        {form.acceptTerms && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                    <span className="text-[12px]" style={{ color: '#666' }}>
                        <span>
                            <span style={{ color: '#C9A96E', cursor: 'pointer' }}>{t('auth_terms_link1') || "Kullanım Koşulları"}</span>
                            <span> {t('auth_terms_and') || "ve"} </span>
                            <span style={{ color: '#C9A96E', cursor: 'pointer' }}>{t('auth_terms_link2') || "Gizlilik Politikası"}</span>
                            <span>{t('auth_terms_read') || "'nı okudum, kabul ediyorum. *"}</span>
                        </span>
                    </span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                    <div
                        onClick={() => update('acceptMarketing', !form.acceptMarketing)}
                        className="flex-shrink-0 flex items-center justify-center mt-0.5"
                        style={{ width: '16px', height: '16px', border: '1px solid #E0E0E0', borderRadius: '3px', background: form.acceptMarketing ? '#1C1C1E' : 'white', cursor: 'pointer' }}
                    >
                        {form.acceptMarketing && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                    <span className="text-[12px]" style={{ color: '#666' }}>
                        {t('auth_marketing_accept') || "SELIS'dan kampanya ve özel teklif e-postaları almak istiyorum."}
                    </span>
                </label>
            </div>

            {/* Submit */}
            <motion.button
                type="submit"
                disabled={loading}
                whileHover={loading ? {} : { y: -1 }}
                whileTap={loading ? {} : { scale: 0.98 }}
                className="w-full py-3.5 text-[13px] font-semibold tracking-wide flex items-center justify-center gap-2"
                style={{
                    background: loading ? '#666' : '#1C1C1E',
                    color: 'white',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                }}
            >
                {loading ? (
                    <span>{t('auth_register_loading') || "Hesap oluşturuluyor..."}</span>
                ) : (
                    <span>{t('auth_register_btn') || "Kayıt Ol"}</span>
                )}
            </motion.button>

            {/* Error */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: [0, -8, 8, -8, 8, 0] }}
                    className="mt-3 px-4 py-3 text-[13px]"
                    style={{ background: '#FFF3F3', border: '1px solid #FFCDD2', borderRadius: '6px', color: '#E53935' }}
                >
                    ✗ {error}
                </motion.div>
            )}

            {/* Switch to login */}
            <p className="text-center mt-4 text-[12px]" style={{ color: '#999' }}>
                <span>{t('auth_has_account') || "Zaten hesabınız var mı?"}</span>{' '}
                <button type="button" onClick={onSwitchToLogin} className="font-medium hover:underline" style={{ color: '#C9A96E', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span>{t('auth_login_link') || "Giriş Yapın →"}</span>
                </button>
            </p>
        </form>
    );
}

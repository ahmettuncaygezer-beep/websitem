'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { create } from 'zustand';

interface AuthStore {
    isOpen: boolean;
    view: 'login' | 'register' | 'quiz';
    open: (view?: 'login' | 'register' | 'quiz') => void;
    close: () => void;
    user: any | null;
    setUser: (user: any) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isOpen: false,
    view: 'login',
    open: (view = 'login') => set({ isOpen: true, view }),
    close: () => set({ isOpen: false }),
    user: null,
    setUser: (user) => set({ user }),
}));

import { StyleQuiz } from './StyleQuiz';

export function AuthModal() {
    const { isOpen, view, close, open, setUser } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        countryCode: '+90',
        marketingConsent: false,
        termsAccepted: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (view === 'register') {
                if (!formData.termsAccepted) {
                    throw new Error('Üyelik sözleşmesini kabul etmelisiniz.');
                }

                const { data, error: signUpError } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            first_name: formData.firstName,
                            last_name: formData.lastName,
                            phone: `${formData.countryCode}${formData.phone}`,
                            marketing_consent: formData.marketingConsent,
                        },
                    },
                });

                if (signUpError) throw signUpError;
                if (data.user) {
                    setUser(data.user);
                    open('quiz');
                }
            } else {
                const { data, error: signInError } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });

                if (signInError) throw signInError;
                if (data.user) {
                    setUser(data.user);
                    close();
                }
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleQuizComplete = async (selectedStyles: string[]) => {
        setLoading(true);
        try {
            // In a real app, update Supabase user metadata or a profiles table
            const { error: updateError } = await supabase.auth.updateUser({
                data: { style_preferences: selectedStyles }
            });

            if (updateError) throw updateError;

            console.log('Style preferences saved:', selectedStyles);
            close();
            // Optional: Trigger a refresh of personalized content
            window.location.reload();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative"
            >
                <button
                    onClick={close}
                    className="absolute top-6 right-6 p-2 text-warm-gray hover:text-charcoal transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-8 md:p-10">
                    {view !== 'quiz' ? (
                        <>
                            <div className="flex border-b border-border mb-8">
                                <button
                                    onClick={() => open('login')}
                                    className={`flex-1 pb-4 text-sm font-sans font-bold tracking-widest uppercase transition-colors relative ${view === 'login' ? 'text-charcoal' : 'text-warm-gray hover:text-charcoal'
                                        }`}
                                >
                                    GİRİŞ
                                    {view === 'login' && (
                                        <motion.div layoutId="auth-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-sage" />
                                    )}
                                </button>
                                <button
                                    onClick={() => open('register')}
                                    className={`flex-1 pb-4 text-sm font-sans font-bold tracking-widest uppercase transition-colors relative ${view === 'register' ? 'text-charcoal' : 'text-warm-gray hover:text-charcoal'
                                        }`}
                                >
                                    ÜYE OL
                                    {view === 'register' && (
                                        <motion.div layoutId="auth-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-sage" />
                                    )}
                                </button>
                            </div>

                            <form onSubmit={handleAuth} className="space-y-4">
                                {view === 'register' && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="İsim"
                                                required
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full pl-12 pr-4 py-3.5 bg-sand rounded-2xl border-none focus:ring-2 focus:ring-sage/20 text-sm font-sans"
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Soyisim"
                                                required
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3.5 bg-sand rounded-2xl border-none focus:ring-2 focus:ring-sage/20 text-sm font-sans"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="relative">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="E-Posta"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-3.5 bg-sand rounded-2xl border-none focus:ring-2 focus:ring-sage/20 text-sm font-sans"
                                    />
                                </div>

                                {view === 'register' && (
                                    <div className="flex gap-2">
                                        <select
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, countryCode: e.target.value }))}
                                            className="bg-sand rounded-2xl px-3 py-3.5 text-xs font-sans border-none appearance-none"
                                        >
                                            <option value="+90">🇹🇷 +90</option>
                                            <option value="+1">🇺🇸 +1</option>
                                            <option value="+44">🇬🇧 +44</option>
                                        </select>
                                        <div className="relative flex-1">
                                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Telefon Numarası"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full pl-12 pr-4 py-3.5 bg-sand rounded-2xl border-none focus:ring-2 focus:ring-sage/20 text-sm font-sans"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Şifre"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-12 py-3.5 bg-sand rounded-2xl border-none focus:ring-2 focus:ring-sage/20 text-sm font-sans"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray hover:text-charcoal"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 text-red-500 text-xs bg-red-50 p-3 rounded-xl border border-red-100 mt-2">
                                        <AlertCircle size={14} />
                                        <span>{error}</span>
                                    </div>
                                )}

                                {view === 'register' && (
                                    <div className="space-y-3 pt-2">
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                name="termsAccepted"
                                                checked={formData.termsAccepted}
                                                onChange={handleInputChange}
                                                className="mt-1 w-4 h-4 rounded border-gray-300 text-sage focus:ring-sage/20"
                                            />
                                            <span className="text-[11px] leading-relaxed text-warm-gray group-hover:text-charcoal transition-colors">
                                                Üyelik Sözleşmesini, Veri Koruma Politikasını ve Aydınlatma Metnini okudum, kabul ediyorum.
                                            </span>
                                        </label>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[11px] font-bold text-warm-gray uppercase tracking-widest">
                                                İletişim İzni
                                            </span>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2 cursor-pointer text-[11px] text-warm-gray">
                                                    <input
                                                        type="radio"
                                                        name="marketingConsent"
                                                        checked={formData.marketingConsent}
                                                        onChange={() => setFormData((p) => ({ ...p, marketingConsent: true }))}
                                                    />
                                                    Onaylıyorum
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer text-[11px] text-warm-gray">
                                                    <input
                                                        type="radio"
                                                        name="marketingConsent"
                                                        checked={!formData.marketingConsent}
                                                        onChange={() => setFormData((p) => ({ ...p, marketingConsent: false }))}
                                                    />
                                                    Onaylamıyorum
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-charcoal text-white py-4 rounded-2xl font-sans font-bold tracking-widest uppercase hover:bg-black transition-all hover:shadow-xl disabled:opacity-50 mt-4 group flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : view === 'login' ? (
                                        'Giriş Yap'
                                    ) : (
                                        'Hesap Oluştur'
                                    )}
                                </button>

                                <div className="text-center pt-2">
                                    <button
                                        type="button"
                                        className="text-[11px] text-warm-gray hover:text-charcoal uppercase tracking-widest font-bold transition-colors"
                                        onClick={() => open(view === 'login' ? 'register' : 'login')}
                                    >
                                        {view === 'login' ? 'Hesabınız yok mu? Üye Ol' : 'Zaten üye misiniz? Giriş Yap'}
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <StyleQuiz onComplete={handleQuizComplete} />
                    )}
                </div>
            </motion.div>
        </div>
    );
}

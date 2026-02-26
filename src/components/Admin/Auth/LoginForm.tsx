'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, Eye, EyeOff, Loader2, Check, ArrowLeft, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockLogin, mockVerifyOtp } from '@/lib/auth/session';
import { OtpInput } from './OtpInput';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
    email: z.string().min(1, 'Giriş bilgisi gereklidir'),
    password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
    rememberMe: z.boolean().optional()
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
    const [step, setStep] = useState<1 | 2>(1);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [otp, setOtp] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        setError(null);

        // Simulate network delay
        await new Promise(r => setTimeout(r, 1000));

        const res = mockLogin(data);
        if (res.success) {
            if (res.requiresTwoFactor) {
                setStep(2);
            } else {
                handleSuccess(res.sessionToken!);
            }
        } else {
            setError(res.error || 'Giriş yapılamadı');
        }
        setLoading(false);
    };

    const handleOtpSubmit = async () => {
        if (otp.length < 6) return;
        setLoading(true);
        setError(null);

        await new Promise(r => setTimeout(r, 800));
        const res = mockVerifyOtp(getValues('email'), otp);

        if (res) {
            handleSuccess(res.sessionToken!);
        } else {
            setError('Kod geçersiz. Lütfen tekrar deneyin.');
            setOtp('');
        }
        setLoading(false);
    };

    const handleSuccess = (token: string) => {
        setSuccess(true);
        document.cookie = `admin-session=${token}; path=/; max-age=${30 * 60}`;
        setTimeout(() => {
            router.push('/admin');
        }, 1000);
    };

    return (
        <div className="w-full max-w-[400px]">
            <AnimatePresence mode="wait">
                {step === 1 ? (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <header className="mb-8">
                            <h1 className="text-[28px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif] mb-2">Tekrar Hoş Geldiniz</h1>
                            <p className="text-sm text-[#636366]">Admin panelinizle giriş yapın</p>
                        </header>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-[#636366] uppercase tracking-wider">Kullanıcı Adı veya E-posta</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input
                                        {...register('email')}
                                        type="text"
                                        placeholder="admin"
                                        className={`w-full bg-white/[0.03] border rounded-sm pl-10 pr-4 py-3 text-[14px] text-[#F5F0EB] outline-none transition-all ${errors.email ? 'border-[#FF453A]' : 'border-white/08 focus:border-[#C9A96E]'
                                            }`}
                                    />
                                </div>
                                {errors.email && <p className="text-[11px] text-[#FF453A]">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[11px] font-bold text-[#636366] uppercase tracking-wider">ŞİFRE</label>
                                    <button type="button" className="text-[11px] text-[#C9A96E] hover:underline">Şifremi unuttum</button>
                                </div>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input
                                        {...register('password')}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••••"
                                        className={`w-full bg-white/[0.03] border rounded-sm pl-10 pr-12 py-3 text-[14px] text-[#F5F0EB] outline-none transition-all ${errors.password ? 'border-[#FF453A]' : 'border-white/08 focus:border-[#C9A96E]'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#636366] hover:text-[#AEAEB2]"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-[#FF453A]/10 border border-[#FF453A]/20 p-3 rounded-sm text-[12px] text-[#FF453A]"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || success}
                                className={`w-full h-12 rounded-sm text-[14px] font-bold transition-all flex items-center justify-center gap-2 ${success
                                    ? 'bg-[#30D158] text-[#0F0F10]'
                                    : 'bg-[#C9A96E] hover:bg-[#D4B87A] text-[#0F0F10]'
                                    } shadow-[0_4px_20px_rgba(201,169,110,0.2)]`}
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : success ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    'Giriş Yap'
                                )}
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                    >
                        <button
                            onClick={() => setStep(1)}
                            className="flex items-center gap-2 text-[12px] text-[#636366] hover:text-[#C9A96E] transition-colors mb-6 group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                            Geri Dön
                        </button>

                        <header className="mb-8">
                            <h1 className="text-[28px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif] mb-2">Güvenlik Doğrulaması</h1>
                            <p className="text-sm text-[#636366]">Authenticator uygulamasındaki 6 haneli kodu girin</p>
                        </header>

                        <div className="bg-[#C9A96E]/05 border border-[#C9A96E]/15 p-4 rounded-sm flex gap-3 mb-8">
                            <Shield size={20} className="text-[#C9A96E] shrink-0" />
                            <p className="text-[12px] text-[#AEAEB2] leading-relaxed">
                                Hesabınızın güvenliği için iki faktörlü doğrulama (2FA) gereklidir.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <OtpInput
                                value={otp}
                                onChange={(val) => {
                                    setOtp(val);
                                    if (val.length === 6) handleOtpSubmit();
                                }}
                                error={!!error}
                            />

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-[12px] text-[#FF453A] text-center"
                                >
                                    {error}
                                </motion.p>
                            )}

                            <div className="text-center space-y-4">
                                <p className="text-[12px] text-[#636366]">Kodu almadınız mı? <button className="text-[#C9A96E] hover:underline">Yedek kod kullan</button></p>

                                <button
                                    onClick={handleOtpSubmit}
                                    disabled={loading || otp.length < 6 || success}
                                    className={`w-full h-12 rounded-sm text-[14px] font-bold transition-all flex items-center justify-center gap-2 ${success
                                        ? 'bg-[#30D158] text-[#0F0F10]'
                                        : 'bg-[#C9A96E] hover:bg-[#D4B87A] text-[#0F0F10]'
                                        }`}
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : success ? (
                                        <Check className="w-5 h-5" />
                                    ) : (
                                        'Doğrula ve Gir'
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

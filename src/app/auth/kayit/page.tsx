'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { SocialLogin } from '@/components/auth/SocialLogin';
import { AuthDivider } from '@/components/auth/AuthDivider';
import { motion } from 'framer-motion';

export default function KayitPage() {
    const router = useRouter();
    const [success, setSuccess] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#F5F0EB' }}>
            <div className="w-full max-w-[440px]" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1C1C1E, #2C2C2E)', padding: '32px 32px 24px' }}>
                    <div className="text-xl text-white font-bold tracking-wider" style={{ fontFamily: 'var(--font-playfair)' }}>SELIS</div>
                    <h1 className="text-2xl text-white mt-2" style={{ fontFamily: 'var(--font-playfair)' }}>Hesap Oluşturun</h1>
                    <p className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>SELIS HOME CONCEPT ailesine katılın</p>
                </div>

                {success ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-8 py-8 text-center">
                        <div className="text-6xl mb-4">✉️</div>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: '#1C1C1E', fontFamily: 'var(--font-playfair)' }}>E-postanızı Doğrulayın</h3>
                        <p className="text-[13px] mb-6" style={{ color: '#999' }}>Doğrulama linki e-posta adresinize gönderildi.</p>
                        <button onClick={() => router.push('/auth/giris')} className="w-full py-3 text-[13px] font-semibold" style={{ background: '#1C1C1E', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
                            Giriş Sayfasına Dön
                        </button>
                    </motion.div>
                ) : (
                    <>
                        <SocialLogin />
                        <AuthDivider />
                        <RegisterForm onSwitchToLogin={() => router.push('/auth/giris')} onSuccess={() => setSuccess(true)} />
                    </>
                )}
            </div>
        </div>
    );
}

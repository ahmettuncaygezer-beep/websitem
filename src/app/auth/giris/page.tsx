'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { LoginForm } from '@/components/auth/LoginForm';
import { SocialLogin } from '@/components/auth/SocialLogin';
import { AuthDivider } from '@/components/auth/AuthDivider';

export default function GirisPage() {
    const router = useRouter();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) router.push('/hesabim');
    }, [isAuthenticated, router]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#F5F0EB' }}>
            <div className="w-full max-w-[440px]" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                {/* Header */}
                <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1C1C1E, #2C2C2E)', padding: '32px 32px 24px' }}>
                    <div className="text-xl text-white font-bold tracking-wider" style={{ fontFamily: 'var(--font-playfair)' }}>SELIS</div>
                    <h1 className="text-2xl text-white mt-2" style={{ fontFamily: 'var(--font-playfair)' }}>Tekrar Hoş Geldiniz</h1>
                    <p className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>Premium mobilya dünyasına girin</p>
                </div>

                <SocialLogin />
                <AuthDivider />
                <LoginForm
                    onForgotPassword={() => router.push('/auth/sifremi-unuttum')}
                    onSwitchToRegister={() => router.push('/auth/kayit')}
                />
            </div>
        </div>
    );
}

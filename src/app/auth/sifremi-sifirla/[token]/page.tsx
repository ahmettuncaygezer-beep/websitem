'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { PasswordStrength } from '@/components/auth/PasswordStrength';

export default function SifremiSifirlaPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password.length < 8 || password !== confirm) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        setLoading(false);
        setDone(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#F5F0EB' }}>
            <div className="w-full max-w-[440px]" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1C1C1E, #2C2C2E)', padding: '32px 32px 24px' }}>
                    <div className="text-xl text-white font-bold tracking-wider" style={{ fontFamily: 'var(--font-playfair)' }}>MAISON</div>
                    <h1 className="text-2xl text-white mt-2" style={{ fontFamily: 'var(--font-playfair)' }}>Yeni Şifre Belirleyin</h1>
                    <p className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>Güçlü bir şifre oluşturun</p>
                </div>

                {done ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-8 py-8 text-center">
                        <div className="text-5xl mb-4">✓</div>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: '#1C1C1E', fontFamily: 'var(--font-playfair)' }}>Şifreniz Güncellendi</h3>
                        <p className="text-[13px] mb-6" style={{ color: '#999' }}>Yeni şifrenizle giriş yapabilirsiniz.</p>
                        <button onClick={() => router.push('/auth/giris')} className="w-full py-3 text-[13px] font-semibold" style={{ background: '#1C1C1E', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
                            Giriş Yap
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="px-8 py-6">
                        <div className="mb-3">
                            <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>Yeni Şifre</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#CCC' }} />
                                <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-12 py-3 text-[14px] outline-none" style={{ border: '1px solid #E0E0E0', borderRadius: '6px', color: '#1C1C1E' }} />
                                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#CCC', background: 'none', border: 'none', cursor: 'pointer' }}>
                                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            <PasswordStrength password={password} />
                        </div>

                        <div className="mb-4">
                            <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>Şifre Tekrar</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#CCC' }} />
                                <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 text-[14px] outline-none" style={{ border: confirm && password !== confirm ? '1px solid #E53935' : '1px solid #E0E0E0', borderRadius: '6px', color: '#1C1C1E' }} />
                            </div>
                            {confirm && password !== confirm && <p className="text-[11px] mt-1" style={{ color: '#E53935' }}>Şifreler eşleşmiyor</p>}
                        </div>

                        <motion.button type="submit" disabled={loading || password.length < 8 || password !== confirm} className="w-full py-3.5 text-[13px] font-semibold tracking-wide" style={{ background: '#1C1C1E', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer', opacity: loading || password.length < 8 || password !== confirm ? 0.5 : 1 }}>
                            {loading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                        </motion.button>
                    </form>
                )}
            </div>
        </div>
    );
}

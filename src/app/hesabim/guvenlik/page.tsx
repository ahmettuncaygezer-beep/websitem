'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Shield, Smartphone, Monitor, Globe, Check } from 'lucide-react';
import { PasswordStrength } from '@/components/auth/PasswordStrength';
import { AccountHeader } from '@/components/Account/AccountHeader';
import { mockSessions } from '@/data/mock-account';

export default function GuvenlikPage() {
    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [showCurrPw, setShowCurrPw] = useState(false);
    const [showNewPw, setShowNewPw] = useState(false);
    const [saved, setSaved] = useState(false);
    const [twoFA, setTwoFA] = useState(false);

    const handleSave = () => {
        if (newPw.length >= 8 && newPw === confirmPw) {
            setSaved(true);
            setCurrentPw('');
            setNewPw('');
            setConfirmPw('');
            setTimeout(() => setSaved(false), 3000);
        }
    };

    const deviceIcons: Record<string, React.ReactNode> = {
        desktop: <Monitor size={16} />,
        mobile: <Smartphone size={16} />,
        tablet: <Smartphone size={16} />,
    };

    return (
        <div>
            <AccountHeader title="Güvenlik" breadcrumbs={[{ label: 'Güvenlik' }]} />

            {/* Change password */}
            <div className="p-6 mb-4" style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}>
                <h3 className="text-[15px] font-semibold mb-4 flex items-center gap-2" style={{ color: '#1C1C1E' }}>
                    <Lock size={18} /> Şifre Değiştir
                </h3>

                <div className="space-y-3 max-w-md">
                    <div>
                        <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>Mevcut Şifre</label>
                        <div className="relative">
                            <input type={showCurrPw ? 'text' : 'password'} value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 pr-12 text-[14px] outline-none" style={{ border: '1px solid #E0E0E0', borderRadius: '6px' }} />
                            <button type="button" onClick={() => setShowCurrPw(!showCurrPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#CCC', background: 'none', border: 'none', cursor: 'pointer' }}>
                                {showCurrPw ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>Yeni Şifre</label>
                        <div className="relative">
                            <input type={showNewPw ? 'text' : 'password'} value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 pr-12 text-[14px] outline-none" style={{ border: '1px solid #E0E0E0', borderRadius: '6px' }} />
                            <button type="button" onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#CCC', background: 'none', border: 'none', cursor: 'pointer' }}>
                                {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        <PasswordStrength password={newPw} />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>Şifre Tekrar</label>
                        <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 text-[14px] outline-none" style={{ border: confirmPw && newPw !== confirmPw ? '1px solid #E53935' : '1px solid #E0E0E0', borderRadius: '6px' }} />
                        {confirmPw && newPw !== confirmPw && <p className="text-[11px] mt-1" style={{ color: '#E53935' }}>Şifreler eşleşmiyor</p>}
                    </div>

                    <motion.button whileTap={{ scale: 0.98 }} onClick={handleSave} className="flex items-center gap-2 px-6 py-3 text-[13px] font-semibold mt-2" style={{ background: saved ? '#4CAF50' : '#1C1C1E', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
                        {saved ? <><Check size={16} /> Kaydedildi!</> : 'Şifreyi Güncelle'}
                    </motion.button>
                </div>
            </div>

            {/* 2FA */}
            <div className="p-6 mb-4" style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Shield size={18} style={{ color: twoFA ? '#4CAF50' : '#999' }} />
                        <div>
                            <h3 className="text-[15px] font-semibold" style={{ color: '#1C1C1E' }}>İki Faktörlü Doğrulama (2FA)</h3>
                            <p className="text-[12px]" style={{ color: '#999' }}>Ekstra güvenlik katmanı ekleyin</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setTwoFA(!twoFA)}
                        className="relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer"
                        style={{ background: twoFA ? '#4CAF50' : '#E0E0E0', border: 'none' }}
                    >
                        <motion.div
                            className="absolute top-0.5 rounded-full"
                            style={{ width: '20px', height: '20px', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
                            animate={{ left: twoFA ? '22px' : '2px' }}
                            transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                        />
                    </button>
                </div>
            </div>

            {/* Active sessions */}
            <div className="p-6" style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}>
                <h3 className="text-[15px] font-semibold mb-4 flex items-center gap-2" style={{ color: '#1C1C1E' }}>
                    <Globe size={18} /> Aktif Oturumlar
                </h3>
                {mockSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #F5F0EB' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#F5F0EB', color: '#999' }}>
                                {deviceIcons[session.device]}
                            </div>
                            <div>
                                <p className="text-[13px] font-medium" style={{ color: '#1C1C1E' }}>{session.browser} · {session.os}</p>
                                <p className="text-[11px]" style={{ color: '#999' }}>{session.location}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            {session.isCurrent ? (
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: '#E8F5E9', color: '#4CAF50' }}>Bu Cihaz</span>
                            ) : (
                                <button className="text-[11px] font-medium" style={{ color: '#E53935', background: 'none', border: 'none', cursor: 'pointer' }}>Oturumu Kapat</button>
                            )}
                            <p className="text-[10px] mt-0.5" style={{ color: '#CCC' }}>{session.lastActive}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

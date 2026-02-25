'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save, Check } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { AccountHeader } from '@/components/Account/AccountHeader';

export default function ProfilimPage() {
    const user = useAuthStore((s) => s.user);
    const updateProfile = useAuthStore((s) => s.updateProfile);

    const [form, setForm] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        birthday: user?.birthday || '',
    });
    const [saved, setSaved] = useState(false);

    const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

    const handleSave = () => {
        updateProfile(form);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    if (!user) return null;
    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

    return (
        <div>
            <AccountHeader title="Profilim" breadcrumbs={[{ label: 'Profilim' }]} />

            <div className="p-6" style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}>
                {/* Avatar + basic info */}
                <div className="flex items-center gap-5 mb-6 pb-6" style={{ borderBottom: '1px solid #F0EDE8' }}>
                    <div className="relative">
                        <div className="flex items-center justify-center rounded-full text-2xl font-bold" style={{ width: '80px', height: '80px', background: '#C9A96E', color: '#1C1C1E' }}>
                            {initials}
                        </div>
                        <button className="absolute -bottom-1 -right-1 p-1.5 rounded-full" style={{ background: '#1C1C1E', border: '2px solid white', cursor: 'pointer' }}>
                            <Camera size={12} color="white" />
                        </button>
                    </div>
                    <div>
                        <p className="text-lg font-semibold" style={{ color: '#1C1C1E' }}>{user.firstName} {user.lastName}</p>
                        <p className="text-[12px]" style={{ color: '#999' }}>{user.email}</p>
                        <p className="text-[11px] mt-1" style={{ color: '#999' }}>Üye: {new Date(user.createdAt).toLocaleDateString('tr-TR')}</p>
                    </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>Ad</label>
                        <input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className="w-full px-4 py-3 text-[14px] outline-none transition-colors" style={{ border: '1px solid #E0E0E0', borderRadius: '6px', color: '#1C1C1E' }} />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>Soyad</label>
                        <input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className="w-full px-4 py-3 text-[14px] outline-none transition-colors" style={{ border: '1px solid #E0E0E0', borderRadius: '6px', color: '#1C1C1E' }} />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>E-posta</label>
                        <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full px-4 py-3 text-[14px] outline-none transition-colors" style={{ border: '1px solid #E0E0E0', borderRadius: '6px', color: '#1C1C1E' }} />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>Telefon</label>
                        <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-3 text-[14px] outline-none transition-colors" style={{ border: '1px solid #E0E0E0', borderRadius: '6px', color: '#1C1C1E' }} />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#666' }}>Doğum Tarihi</label>
                        <input type="date" value={form.birthday} onChange={(e) => update('birthday', e.target.value)} className="w-full px-4 py-3 text-[14px] outline-none transition-colors" style={{ border: '1px solid #E0E0E0', borderRadius: '6px', color: '#1C1C1E' }} />
                    </div>
                </div>

                {/* Save */}
                <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 text-[13px] font-semibold"
                    style={{ background: saved ? '#4CAF50' : '#1C1C1E', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                >
                    {saved ? <><Check size={16} /> Kaydedildi!</> : <><Save size={16} /> Değişiklikleri Kaydet</>}
                </motion.button>
            </div>
        </div>
    );
}

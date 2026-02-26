'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    User, Mail, Phone, ShieldCheck, Key,
    RefreshCcw, Copy, Check, Eye, EyeOff,
    Info, LayoutGrid, ShoppingCart, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminRole, AdminPermission } from '@/types/users';
import { ROLE_PERMISSIONS } from '@/lib/mock/users';
import { UserPermissions } from './UserPermissions';

const userSchema = z.object({
    firstName: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
    lastName: z.string().min(2, 'Soyad en az 2 karakter olmalıdır'),
    email: z.string().email('Geçerli bir e-posta adresi giriniz'),
    phone: z.string().optional(),
    role: z.enum(['super-admin', 'editor', 'order-manager', 'analyst']),
    status: z.enum(['active', 'inactive', 'invited']),
    password: z.string().min(8, 'Şifre en az 8 karakter olmalıdır').optional(),
    sendInvite: z.boolean(),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserRoleOption {
    id: AdminRole;
    title: string;
    description: string;
    icon: any;
    scope: string;
}

const roleOptions: UserRoleOption[] = [
    {
        id: 'super-admin',
        title: 'Süper Admin',
        description: 'Tüm modüllere tam erişim sağlar.',
        icon: ShieldCheck,
        scope: 'Tam Yetki'
    },
    {
        id: 'editor',
        title: 'Editör',
        description: 'İçerik ve ürün yönetimi yetkileri.',
        icon: LayoutGrid,
        scope: 'Ürün & İçerik'
    },
    {
        id: 'order-manager',
        title: 'Sipariş Yöneticisi',
        description: 'Sipariş ve müşteri operasyonları.',
        icon: ShoppingCart,
        scope: 'Satış Operasyon'
    },
    {
        id: 'analyst',
        title: 'Analist',
        description: 'Sadece görüntüleme ve raporlama.',
        icon: TrendingUp,
        scope: 'Okuma Erişimi'
    }
];

export function UserForm() {
    const [passwordType, setPasswordType] = useState<'auto' | 'manual'>('auto');
    const [showPassword, setShowPassword] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [copied, setCopied] = useState(false);
    const [customPermissions, setCustomPermissions] = useState<AdminPermission[]>([]);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            role: 'editor',
            status: 'active',
            sendInvite: true
        }
    });

    const selectedRole = watch('role');

    useEffect(() => {
        setCustomPermissions(ROLE_PERMISSIONS[selectedRole]);
    }, [selectedRole]);

    const generateSecurePassword = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        let retVal = "";
        for (let i = 0, n = charset.length; i < 12; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        setGeneratedPassword(retVal);
        setValue('password', retVal);
    };

    useEffect(() => {
        if (passwordType === 'auto') generateSecurePassword();
    }, [passwordType]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedPassword);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const onSubmit = (data: UserFormData) => {
        console.log('User created:', { ...data, permissions: customPermissions });
        // Handle redirect or success message
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Details */}
            <div className="lg:col-span-2 space-y-8">
                {/* Personal Info */}
                <div className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm p-6">
                    <h3 className="text-[16px] font-semibold text-[#F5F0EB] mb-6 flex items-center gap-2">
                        <User size={18} className="text-[#C9A96E]" />
                        Kişisel Bilgiler
                    </h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-[#636366] uppercase tracking-wider">AD</label>
                            <input
                                {...register('firstName')}
                                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-sm px-4 py-2.5 text-[13px] text-[#F5F0EB] outline-none focus:border-[#C9A96E]/40"
                                placeholder="Ali"
                            />
                            {errors.firstName && <p className="text-[11px] text-[#FF453A]">{errors.firstName.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-[#636366] uppercase tracking-wider">SOYAD</label>
                            <input
                                {...register('lastName')}
                                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-sm px-4 py-2.5 text-[13px] text-[#F5F0EB] outline-none focus:border-[#C9A96E]/40"
                                placeholder="Yılmaz"
                            />
                            {errors.lastName && <p className="text-[11px] text-[#FF453A]">{errors.lastName.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-[#636366] uppercase tracking-wider">E-POSTA ADRESİ</label>
                            <div className="relative">
                                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#636366]" />
                                <input
                                    {...register('email')}
                                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-sm pl-10 pr-4 py-2.5 text-[13px] text-[#F5F0EB] outline-none focus:border-[#C9A96E]/40"
                                    placeholder="ali.yilmaz@maison.com"
                                />
                            </div>
                            {errors.email && <p className="text-[11px] text-[#FF453A]">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-[#636366] uppercase tracking-wider">TELEFON (OPSİYONEL)</label>
                            <div className="relative">
                                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#636366]" />
                                <input
                                    {...register('phone')}
                                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-sm pl-10 pr-4 py-2.5 text-[13px] text-[#F5F0EB] outline-none focus:border-[#C9A96E]/40"
                                    placeholder="+90 5XX XXX XX XX"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] text-xl font-bold">
                            AY
                        </div>
                        <div className="space-y-1">
                            <button type="button" className="text-[13px] font-semibold text-[#F5F0EB] hover:text-[#C9A96E] transition-colors">Profil Fotoğrafı Seç</button>
                            <p className="text-[11px] text-[#636366]">JPG veya PNG, max 1MB. Kare olması önerilir.</p>
                        </div>
                    </div>
                </div>

                {/* Entry Credentials */}
                <div className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm p-6">
                    <h3 className="text-[16px] font-semibold text-[#F5F0EB] mb-6 flex items-center gap-2">
                        <Key size={18} className="text-[#C9A96E]" />
                        Giriş Bilgileri
                    </h3>

                    <div className="space-y-6">
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="passwordType"
                                    checked={passwordType === 'auto'}
                                    onChange={() => setPasswordType('auto')}
                                    className="hidden"
                                />
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${passwordType === 'auto' ? 'border-[#C9A96E] bg-[#C9A96E]' : 'border-white/20'
                                    }`}>
                                    {passwordType === 'auto' && <div className="w-1.5 h-1.5 rounded-full bg-[#0F0F10]" />}
                                </div>
                                <span className={`text-[13px] ${passwordType === 'auto' ? 'text-[#F5F0EB]' : 'text-[#636366]'}`}>Otomatik şifre oluştur</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="passwordType"
                                    checked={passwordType === 'manual'}
                                    onChange={() => setPasswordType('manual')}
                                    className="hidden"
                                />
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${passwordType === 'manual' ? 'border-[#C9A96E] bg-[#C9A96E]' : 'border-white/20'
                                    }`}>
                                    {passwordType === 'manual' && <div className="w-1.5 h-1.5 rounded-full bg-[#0F0F10]" />}
                                </div>
                                <span className={`text-[13px] ${passwordType === 'manual' ? 'text-[#F5F0EB]' : 'text-[#636366]'}`}>Şifre belirle</span>
                            </label>
                        </div>

                        {passwordType === 'auto' ? (
                            <div className="bg-white/[0.03] border border-white/[0.08] rounded-sm p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[11px] font-bold text-[#636366] uppercase tracking-wider">GÜVENLİ ŞİFRE</span>
                                    <button
                                        type="button"
                                        onClick={generateSecurePassword}
                                        className="text-[11px] text-[#C9A96E] hover:underline flex items-center gap-1"
                                    >
                                        <RefreshCcw size={10} /> Yenile
                                    </button>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 font-mono text-[16px] text-[#C9A96E] tracking-wider select-all">{generatedPassword}</div>
                                    <button
                                        type="button"
                                        onClick={copyToClipboard}
                                        className="p-2 text-[#AEAEB2] hover:text-[#C9A96E] hover:bg-white/05 rounded transition-all"
                                    >
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <div className="mt-4 flex items-start gap-2 text-[11px] text-[#C9A96E]/60 bg-[#C9A96E]/05 border border-[#C9A96E]/10 p-2.5 rounded">
                                    <Info size={14} className="flex-shrink-0 mt-0.5" />
                                    Bu şifre kullanıcıya e-posta ile gönderilir. İlk girişte değiştirmesi önerilir.
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-[#636366] uppercase tracking-wider">ŞİFRE</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            {...register('password')}
                                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-sm px-4 py-2.5 text-[13px] text-[#F5F0EB] outline-none focus:border-[#C9A96E]/40"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#636366] hover:text-[#AEAEB2]"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-[#636366] uppercase tracking-wider">ŞİFRE TEKRAR</label>
                                    <input
                                        type="password"
                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-sm px-4 py-2.5 text-[13px] text-[#F5F0EB] outline-none focus:border-[#C9A96E]/40"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <UserPermissions
                    permissions={customPermissions}
                    title="İzin Matrisi (Önizleme)"
                    description="Seçilen rol için varsayılan izinler aşağıdadır. Kullanıcıyı oluşturduktan sonra profilden özelleştirebilirsiniz."
                    readonly
                />
            </div>

            {/* Right Column - Role & Settings */}
            <div className="space-y-8">
                {/* Role Selector */}
                <div className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm p-6 sticky top-24">
                    <h3 className="text-[16px] font-semibold text-[#F5F0EB] mb-6 flex items-center gap-2">
                        <ShieldCheck size={18} className="text-[#C9A96E]" />
                        Rol & İzinler
                    </h3>

                    <div className="space-y-3">
                        {roleOptions.map((role) => (
                            <label
                                key={role.id}
                                className={`relative block p-4 rounded-sm border cursor-pointer transition-all ${selectedRole === role.id
                                    ? 'bg-[#C9A96E]/05 border-[#C9A96E]/40'
                                    : 'bg-[#242426] border-white/[0.04] hover:border-white/[0.1]'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    {...register('role')}
                                    value={role.id}
                                    className="sr-only"
                                />
                                {selectedRole === role.id && (
                                    <motion.div
                                        layoutId="activeRoleBar"
                                        className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#C9A96E]"
                                    />
                                )}
                                <div className="flex items-center gap-3 mb-1">
                                    <role.icon size={20} className={selectedRole === role.id ? 'text-[#C9A96E]' : 'text-[#636366]'} />
                                    <span className={`text-[14px] font-semibold ${selectedRole === role.id ? 'text-[#F5F0EB]' : 'text-[#AEAEB2]'}`}>{role.title}</span>
                                </div>
                                <p className="text-[11px] text-[#636366] leading-relaxed mb-3">
                                    {role.description}
                                </p>
                                <div className={`text-[10px] font-bold uppercase tracking-widest ${selectedRole === role.id ? 'text-[#C9A96E]/60' : 'text-[#636366]'}`}>
                                    Kapsam: {role.scope}
                                </div>
                            </label>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/[0.04] space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-[13px] font-medium text-[#F5F0EB]">Davet E-postası</label>
                                <p className="text-[11px] text-[#636366]">Giriş bilgilerini e-posta ile gönder.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" {...register('sendInvite')} className="sr-only peer" />
                                <div className="w-9 h-5 bg-white/[0.05] border border-white/[0.1] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#AEAEB2] peer-checked:after:bg-[#C9A96E] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C9A96E]/20 peer-checked:border-[#C9A96E]/40" />
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-[13px] font-medium text-[#F5F0EB]">Hesap Durumu</label>
                                <p className="text-[11px] text-[#636366]">Kullanıcı hemen giriş yapabilir.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={watch('status') === 'active'} onChange={(e) => setValue('status', e.target.checked ? 'active' : 'inactive')} className="sr-only peer" />
                                <div className="w-9 h-5 bg-white/[0.05] border border-white/[0.1] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#AEAEB2] peer-checked:after:bg-[#30D158] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#30D158]/20 peer-checked:border-[#30D158]/40" />
                            </label>
                        </div>
                    </div>

                    <div className="mt-8 space-y-3">
                        <button
                            type="submit"
                            className="w-full bg-[#C9A96E] hover:bg-[#D4B87A] text-[#0F0F10] py-3 rounded-sm text-[13px] font-bold transition-all shadow-[0_4px_20px_rgba(201,169,110,0.2)]"
                        >
                            Kullanıcı Oluştur
                        </button>
                        <button
                            type="button"
                            className="w-full bg-transparent border border-white/[0.08] hover:bg-white/[0.02] text-[#AEAEB2] py-3 rounded-sm text-[13px] font-medium transition-all"
                        >
                            İptal
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

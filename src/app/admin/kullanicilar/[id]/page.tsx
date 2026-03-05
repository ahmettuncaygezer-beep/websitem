'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, Mail, Edit2, Trash2,
    ShieldAlert, Power, User as UserIcon,
    Settings, Activity, Monitor
} from 'lucide-react';
import Link from 'next/link';
import { type AdminUser } from '@/types/users';
import { mockActivityLogs } from '@/types/admin/users'; // Temporary until logs are migrated
import { UserCard } from '@/components/Admin/Users/UserCard';
import { UserForm } from '@/components/Admin/Users/UserForm';
import { UserPermissions } from '@/components/Admin/Users/UserPermissions';
import { UserActivityLog } from '@/components/Admin/Users/UserActivityLog';

export default function UserProfilePage({ params }: { params: { id: string } }) {
    const [user, setUser] = useState<AdminUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'general' | 'permissions' | 'activity' | 'sessions'>('general');

    React.useEffect(() => {
        if (!params.id) return;
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/admin/users/${params.id}`);
                const data = await res.json();
                if (data.user) {
                    setUser({
                        id: data.user.id,
                        firstName: data.user.first_name || '',
                        lastName: data.user.last_name || '',
                        email: data.user.email,
                        role: data.user.role,
                        status: data.user.is_active ? 'active' : 'inactive',
                        avatar: '',
                        lastLogin: undefined,
                        hasCustomPermissions: false,
                        totalLogins: 0,
                        monthlyLogins: 0,
                        totalActions: 0,
                        errorCount: 0,
                        createdAt: data.user.created_at || new Date().toISOString(),
                        updatedAt: data.user.updated_at || new Date().toISOString()
                    });
                }
            } catch (err) {
                console.error('Failed to fetch user profile', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [params.id]);

    const tabs = [
        { id: 'general', label: 'Genel', icon: UserIcon },
        { id: 'permissions', label: 'İzinler', icon: ShieldAlert },
        { id: 'activity', label: 'Aktivite', icon: Activity },
        { id: 'sessions', label: 'Oturumlar', icon: Monitor },
    ];

    return (
        <div className="p-8 pb-20">
            {isLoading ? (
                <div className="text-center py-20 bg-[#1C1C1E] border border-white/[0.06] rounded-sm">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-[#C9A96E] rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[#636366]">Kullanıcı bilgileri yükleniyor...</p>
                </div>
            ) : !user ? (
                <div className="text-center py-20 bg-[#1C1C1E] border border-white/[0.06] rounded-sm">
                    <p className="text-[#636366]">Kullanıcı bulunamadı.</p>
                </div>
            ) : (
                <>
                    {/* Action Bar */}
                    <div className="flex justify-between items-center mb-10">
                        <Link
                            href="/admin/kullanicilar"
                            className="flex items-center gap-2 text-[13px] text-[#636366] hover:text-[#C9A96E] transition-colors group"
                        >
                            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Kullanıcılara Dön
                        </Link>

                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-[#F5F0EB] px-4 py-2 rounded-sm text-[12px] font-semibold transition-all">
                                <Mail size={14} className="text-[#C9A96E]" />
                                Şifre Sıfırlama Gönder
                            </button>
                            <button className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] hover:border-[#FF453A]/40 hover:text-[#FF453A] text-[#AEAEB2] px-4 py-2 rounded-sm text-[12px] font-semibold transition-all">
                                <Trash2 size={14} />
                                Kullanıcıyı Sil
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                        {/* Left - Sticky Card */}
                        <UserCard user={user} />

                        {/* Right - Tabbed Content */}
                        <div className="space-y-6">
                            {/* Tab Navigation */}
                            <div className="flex border-b border-white/[0.06] px-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`relative px-6 py-4 flex items-center gap-2 text-[13px] font-medium transition-all ${activeTab === tab.id ? 'text-[#C9A96E]' : 'text-[#636366] hover:text-[#AEAEB2]'
                                            }`}
                                    >
                                        <tab.icon size={16} />
                                        {tab.label}
                                        {activeTab === tab.id && (
                                            <motion.div
                                                layoutId="profileTabBadge"
                                                className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#C9A96E]"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="pt-4">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {activeTab === 'general' && <UserForm />}
                                        {activeTab === 'permissions' && (
                                            <div className="space-y-6">
                                                <UserPermissions
                                                    permissions={user.customPermissions || []}
                                                    title="Özel İzin Düzenleme"
                                                    description="Bu kullanıcının rolünden bağımsız olarak sahip olduğu özel yetkilerdir."
                                                />
                                                <div className="bg-[#C9A96E]/05 border border-[#C9A96E]/20 p-4 rounded-sm flex items-start gap-3">
                                                    <ShieldAlert size={18} className="text-[#C9A96E] mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <h4 className="text-[13px] font-bold text-[#C9A96E] uppercase tracking-wider mb-1">Önemli Not</h4>
                                                        <p className="text-[12px] text-[#AEAEB2] leading-relaxed">
                                                            Özel izinler, kullanıcının rolü değişse bile korunur. Rol varsayılanlarına dönmek için "Özel İzinleri Temizle" diyebilirsiniz.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {activeTab === 'activity' && <UserActivityLog logs={mockActivityLogs} />}
                                        {activeTab === 'sessions' && (
                                            <div className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm p-6 text-center py-20">
                                                <Monitor size={48} className="text-[#636366] mx-auto mb-4 opacity-20" />
                                                <h3 className="text-[16px] font-semibold text-[#F5F0EB]">Aktif Oturumlar</h3>
                                                <p className="text-sm text-[#636366] mt-1">Bu özellik yakında aktif olacaktır.</p>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

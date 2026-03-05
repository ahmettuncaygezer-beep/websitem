'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, UserCheck, Clock, Plus, Search } from 'lucide-react';
import { UserTable } from '@/components/Admin/Users/UserTable';
import { AdminUser } from '@/types/users';
import Link from 'next/link';

const kpis = [
    { label: 'Toplam', value: '8', sub: 'Yönetici', icon: Users, color: '#C9A96E' },
    { label: 'Aktif', value: '6', sub: 'Giriş Yapabilir', icon: UserCheck, color: '#30D158' },
    { label: 'Süper Admin', value: '2', sub: 'Tam Yetkili', icon: ShieldCheck, color: '#BF5AF2' },
    { label: 'Son 7 Gün', value: '5', sub: 'Aktif Oturum', icon: Clock, color: '#0A84FF' },
];

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch('/api/admin/users');
                const data = await res.json();
                if (data.users) {
                    setUsers(data.users.map((u: any) => ({
                        id: u.id,
                        firstName: u.first_name,
                        lastName: u.last_name,
                        email: u.email,
                        role: u.role,
                        status: u.is_active ? 'active' : 'inactive',
                        avatar: '',
                        lastLogin: null
                    })));
                }
            } catch (err) {
                console.error("Failed to fetch admin users", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="text-[28px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif]">Kullanıcılar</h1>
                    <p className="text-sm text-[#636366] mt-1">Panel erişimi olan yönetici hesapları</p>
                </div>
                <Link
                    href="/admin/kullanicilar/yeni"
                    className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#D4B87A] text-[#0F0F10] px-5 py-2.5 rounded-sm text-[13px] font-bold transition-all shadow-[0_4px_20px_rgba(201,169,110,0.2)]"
                >
                    <Plus size={18} strokeWidth={3} />
                    Yeni Kullanıcı
                </Link>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-4 gap-6 mb-10">
                {kpis.map((kpi, idx) => {
                    let dynamicValue = kpi.value;
                    if (kpi.label === 'Toplam') dynamicValue = users.length.toString();
                    if (kpi.label === 'Aktif') dynamicValue = users.filter(u => u.status === 'active').length.toString();
                    if (kpi.label === 'Süper Admin') dynamicValue = users.filter(u => u.role === 'super_admin').length.toString();

                    return (
                        <motion.div
                            key={kpi.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[#1C1C1E] border border-white/[0.06] p-5 rounded-sm flex items-center gap-4 group hover:border-[#C9A96E]/30 transition-colors"
                        >
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                                style={{ backgroundColor: `${kpi.color}15` }}
                            >
                                <kpi.icon size={24} style={{ color: kpi.color }} />
                            </div>
                            <div>
                                <div className="text-[24px] font-bold text-[#F5F0EB] leading-none mb-1">{dynamicValue}</div>
                                <div className="text-[11px] font-medium text-[#636366] uppercase tracking-wider">{kpi.label}</div>
                                <div className="text-[10px] text-[#C9A96E] opacity-60 mt-0.5">{kpi.sub}</div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-4 flex-1 min-w-[300px]">
                    {/* Search */}
                    <div className="relative flex-1 max-w-[400px]">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#636366]" />
                        <input
                            type="text"
                            placeholder="Ad, e-posta veya rol ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#1C1C1E] border border-white/[0.08] rounded-sm py-2.5 pl-10 pr-4 text-[13px] text-[#F5F0EB] outline-none focus:border-[#C9A96E]/40 transition-colors placeholder:text-[#636366]"
                        />
                    </div>

                    {/* Role Filter Tabs */}
                    <div className="flex bg-[#1C1C1E] p-1 rounded-sm border border-white/[0.08]">
                        {[
                            { id: 'all', label: 'Tümü' },
                            { id: 'super-admin', label: 'Süper Admin' },
                            { id: 'editor', label: 'Editör' },
                            { id: 'order-manager', label: 'Sipariş Yön.' }
                        ].map(role => (
                            <button
                                key={role.id}
                                onClick={() => setRoleFilter(role.id)}
                                className={`px-4 py-1.5 rounded-sm text-[12px] font-medium transition-all ${roleFilter === role.id
                                    ? 'bg-[#C9A96E]/15 text-[#C9A96E] border border-[#C9A96E]/30'
                                    : 'text-[#636366] hover:text-[#AEAEB2] border border-transparent'
                                    }`}
                            >
                                {role.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Status Filter */}
                <div className="flex items-center bg-[#1C1C1E] p-1 rounded-sm border border-white/[0.08]">
                    {[
                        { id: 'all', label: 'Tümü' },
                        { id: 'active', label: 'Aktif' },
                        { id: 'inactive', label: 'Pasif' },
                        { id: 'invited', label: 'Bekliyor' }
                    ].map(status => (
                        <button
                            key={status.id}
                            onClick={() => setStatusFilter(status.id)}
                            className={`px-4 py-1.5 rounded-sm text-[12px] font-medium transition-all ${statusFilter === status.id
                                ? 'bg-white/[0.06] text-[#F5F0EB]'
                                : 'text-[#636366] hover:text-[#AEAEB2]'
                                }`}
                        >
                            {status.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            {isLoading ? (
                <div className="text-center py-20 bg-[#1C1C1E] border border-white/[0.06] rounded-sm">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-[#C9A96E] rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[#636366]">Kullanıcılar yükleniyor...</p>
                </div>
            ) : (
                <UserTable users={filteredUsers} />
            )}

            {/* Pagination Placeholder */}
            {!isLoading && filteredUsers.length > 0 && (
                <div className="mt-6 flex justify-between items-center text-[13px] text-[#636366]">
                    <div>Toplam {filteredUsers.length} yönetici gösteriliyor</div>
                    <div className="flex gap-2">
                        <button disabled className="px-3 py-1 border border-white/[0.06] rounded-sm opacity-30">Geri</button>
                        <button disabled className="px-3 py-1 border border-white/[0.06] rounded-sm opacity-30">İleri</button>
                    </div>
                </div>
            )}

            {!isLoading && filteredUsers.length === 0 && (
                <div className="text-center py-20 bg-[#1C1C1E] border border-white/[0.06] rounded-sm mt-6">
                    <p className="text-[#636366]">Arama kriterlerine uygun kullanıcı bulunamadı.</p>
                </div>
            )}
        </div>
    );
}

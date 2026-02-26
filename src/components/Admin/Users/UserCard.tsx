'use client';

import React from 'react';
import { AdminUser } from '@/types/users';
import { UserRoleBadge } from './UserRoleBadge';
import {
    Calendar, Clock, Phone, Globe,
    Monitor, Mail, Activity, AlertCircle
} from 'lucide-react';

interface UserCardProps {
    user: AdminUser;
}

export function UserCard({ user }: UserCardProps) {
    const stats = [
        { label: 'Toplam Giriş', value: user.totalLogins, icon: Activity },
        { label: 'Bu Ay Giriş', value: user.monthlyLogins, icon: Clock },
        { label: 'Eylem Sayısı', value: user.totalActions, icon: Activity },
        { label: 'Hata Sayısı', value: user.errorCount, icon: AlertCircle, color: user.errorCount > 0 ? '#FF453A' : undefined },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm overflow-hidden sticky top-24">
                {/* Profile Header */}
                <div className="p-8 flex flex-col items-center text-center border-b border-white/[0.04]">
                    <div
                        className="w-24 h-24 rounded-full border-2 border-[#C9A96E]/30 p-1 mb-4 flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.1) 0%, transparent 100%)' }}
                    >
                        <div
                            className="w-full h-full rounded-full flex items-center justify-center text-[24px] font-bold text-[#0F0F10]"
                            style={{
                                background: user.avatar ? `url(${user.avatar}) center/cover` : 'linear-gradient(135deg, #C9A96E 0%, #8B6A3A 100%)'
                            }}
                        >
                            {!user.avatar && `${user.firstName[0]}${user.lastName[0]}`}
                        </div>
                    </div>

                    <h2 className="text-[20px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif] mb-1">
                        {user.firstName} {user.lastName}
                    </h2>
                    <div className="text-[12px] text-[#636366] font-mono mb-4">{user.email}</div>

                    <div className="flex flex-col items-center gap-3">
                        <UserRoleBadge role={user.role} />
                        <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-[#30D158]' : 'bg-[#636366]'}`} />
                            <span className="text-[11px] font-medium text-[#AEAEB2] uppercase tracking-wider">{user.status === 'active' ? 'Aktif' : 'Pasif'}</span>
                        </div>
                    </div>
                </div>

                {/* Info List */}
                <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-[13px]">
                        <Calendar size={14} className="text-[#636366]" />
                        <span className="text-[#636366]">Üyelik:</span>
                        <span className="text-[#F5F0EB] flex-1 text-right">14 Ocak 2025</span>
                    </div>
                    <div className="flex items-center gap-3 text-[13px]">
                        <Clock size={14} className="text-[#636366]" />
                        <span className="text-[#636366]">Son Giriş:</span>
                        <span className="text-[#F5F0EB] flex-1 text-right">2 saat önce</span>
                    </div>
                    <div className="flex items-center gap-3 text-[13px]">
                        <Phone size={14} className="text-[#636366]" />
                        <span className="text-[#636366]">Telefon:</span>
                        <span className="text-[#F5F0EB] flex-1 text-right">{user.phone || '-'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[13px]">
                        <Globe size={14} className="text-[#636366]" />
                        <span className="text-[#636366]">Son IP:</span>
                        <span className="text-[#F5F0EB] flex-1 text-right font-mono text-[11px]">78.191.xx.xx</span>
                    </div>
                    <div className="flex items-center gap-3 text-[13px]">
                        <Monitor size={14} className="text-[#636366]" />
                        <span className="text-[#636366]">Tarayıcı:</span>
                        <span className="text-[#F5F0EB] flex-1 text-right">Chrome / macOS</span>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="p-4 bg-white/[0.02] border-t border-white/[0.04] grid grid-cols-2 gap-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-[#1C1C1E] border border-white/[0.04] p-3 rounded-sm">
                            <div className="text-[10px] text-[#636366] uppercase tracking-wider mb-1">{stat.label}</div>
                            <div
                                className="text-[16px] font-bold tabular-nums"
                                style={{ color: stat.color || '#C9A96E' }}
                            >
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

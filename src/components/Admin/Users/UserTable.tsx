'use client';

import React from 'react';
import { AdminUser, AdminPermission } from '@/types/users';
import { UserRoleBadge } from './UserRoleBadge';
import {
    MoreHorizontal, Edit2, ShieldAlert, Key,
    Power, Trash2, LayoutDashboard, Package,
    ShoppingCart, Users, TrendingUp, Target,
    Search, FileText, Image, Settings
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ROLE_PERMISSIONS } from '@/lib/mock/users';

interface UserTableProps {
    users: AdminUser[];
}

const moduleIcons: Record<string, any> = {
    dashboard: LayoutDashboard,
    urunler: Package,
    kategoriler: Search, // Example mapping
    siparisler: ShoppingCart,
    musteriler: Users,
    analytics: TrendingUp,
    kampanyalar: Target,
    icerik: FileText,
    medya: Image,
    ayarlar: Settings,
    kullanicilar: ShieldAlert
};

export function UserTable({ users }: UserTableProps) {
    const currentUserEmail = 'ali.yilmaz@maison.com'; // Mock current user

    return (
        <div className="w-full overflow-hidden bg-[#1C1C1E] border border-white/[0.06] rounded-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/[0.04] bg-white/[0.02]">
                        <th className="px-6 py-4 text-[11px] font-bold text-[#636366] uppercase tracking-wider">Kullanıcı</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-[#636366] uppercase tracking-wider">Rol</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-[#636366] uppercase tracking-wider">İzinler</th>
                        <th className="px-6 py-4 text-[11px) font-bold text-[#636366] uppercase tracking-wider">Son Giriş</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-[#636366] uppercase tracking-wider">Durum</th>
                        <th className="px-6 py-4 text-right text-[11px] font-bold text-[#636366] uppercase tracking-wider">İşlemler</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                    {users.map((user) => {
                        const isMe = user.email === currentUserEmail;
                        const permissions = user.hasCustomPermissions && user.customPermissions
                            ? user.customPermissions
                            : ROLE_PERMISSIONS[user.role];

                        return (
                            <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold text-[#0F0F10] border border-white/[0.1]"
                                            style={{
                                                background: user.avatar ? `url(${user.avatar}) center/cover` : 'linear-gradient(135deg, #C9A96E 0%, #8B6A3A 100%)'
                                            }}
                                        >
                                            {!user.avatar && `${user.firstName[0]}${user.lastName[0]}`}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[14px] font-medium text-[#F5F0EB]">
                                                    {user.firstName} {user.lastName}
                                                </span>
                                                {isMe && (
                                                    <span className="px-1.5 py-0.5 rounded-[3px] bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E] text-[9px] font-bold">● SEN</span>
                                                )}
                                            </div>
                                            <div className="text-[12px] text-[#636366] font-mono">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <UserRoleBadge role={user.role} />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1">
                                        {permissions?.slice(0, 5).map((p) => {
                                            const Icon = moduleIcons[p.module] || Settings;
                                            return (
                                                <div
                                                    key={p.module}
                                                    title={p.module}
                                                    className={`w-6 h-6 rounded flex items-center justify-center transition-opacity ${p.view ? 'opacity-100' : 'opacity-20'}`}
                                                >
                                                    <Icon size={14} className="text-[#AEAEB2]" />
                                                </div>
                                            );
                                        })}
                                        {(permissions?.length || 0) > 5 && (
                                            <span className="text-[10px] text-[#636366] ml-1">+{permissions!.length - 5}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-[13px] ${!user.lastLogin ? 'text-[#636366]' : ''}`}>
                                        {user.lastLogin
                                            ? formatDistanceToNow(new Date(user.lastLogin), { addSuffix: true, locale: tr })
                                            : 'Hiç giriş yok'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {user.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />}
                                        {user.status === 'inactive' && <span className="w-1.5 h-1.5 rounded-full bg-[#636366]" />}
                                        {user.status === 'invited' && <span className="w-1.5 h-1.5 rounded-full bg-[#0A84FF]" />}
                                        <span className={`text-[12px] ${user.status === 'active' ? 'text-[#30D158]' :
                                                user.status === 'invited' ? 'text-[#0A84FF]' : 'text-[#636366]'
                                            }`}>
                                            {user.status === 'active' && 'Aktif'}
                                            {user.status === 'inactive' && 'Pasif'}
                                            {user.status === 'invited' && 'Davet Edildi'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-[#AEAEB2] hover:text-[#C9A96E] hover:bg-white/[0.04] rounded-lg transition-colors">
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            disabled={isMe}
                                            className={`p-2 text-[#AEAEB2] hover:text-[#FF453A] hover:bg-[rgba(255,69,58,0.05)] rounded-lg transition-colors ${isMe ? 'cursor-not-allowed opacity-30' : ''}`}
                                            title={isMe ? 'Kendi hesabınızı silemezsiniz' : 'Sil'}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <button className="p-2 text-[#AEAEB2] hover:text-[#F5F0EB] hover:bg-white/[0.04] rounded-lg transition-colors">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

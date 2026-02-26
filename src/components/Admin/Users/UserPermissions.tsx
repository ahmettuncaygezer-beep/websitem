'use client';

import React from 'react';
import { AdminPermission } from '@/types/users';
import {
    LayoutDashboard, Package, Search, ShoppingCart,
    Users, TrendingUp, Target, FileText,
    Image, Settings, ShieldAlert, Check, Minus
} from 'lucide-react';
import { motion } from 'framer-motion';

interface UserPermissionsProps {
    permissions: AdminPermission[];
    onChange?: (module: string, field: keyof Omit<AdminPermission, 'module'>, value: boolean) => void;
    readonly?: boolean;
    title?: string;
    description?: string;
}

const moduleIcons: Record<string, any> = {
    dashboard: LayoutDashboard,
    urunler: Package,
    kategoriler: Search,
    siparisler: ShoppingCart,
    musteriler: Users,
    analytics: TrendingUp,
    kampanyalar: Target,
    icerik: FileText,
    medya: Image,
    ayarlar: Settings,
    kullanicilar: ShieldAlert
};

const moduleLabels: Record<string, string> = {
    dashboard: 'Dashboard',
    urunler: 'Ürünler',
    kategoriler: 'Kategoriler',
    siparisler: 'Siparişler',
    musteriler: 'Müşteriler',
    analytics: 'Analytics',
    kampanyalar: 'Kampanyalar',
    icerik: 'İçerik',
    medya: 'Medya',
    ayarlar: 'Ayarlar',
    kullanicilar: 'Kullanıcılar'
};

export function UserPermissions({ permissions, onChange, readonly = false, title, description }: UserPermissionsProps) {
    return (
        <div className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm overflow-hidden">
            {(title || description) && (
                <div className="p-6 border-b border-white/[0.04]">
                    {title && <h3 className="text-[16px] font-semibold text-[#F5F0EB]">{title}</h3>}
                    {description && <p className="text-[12px] text-[#636366] mt-1">{description}</p>}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/[0.04] bg-white/[0.02]">
                            <th className="px-6 py-3 text-[11px] font-bold text-[#636366] uppercase tracking-wider">Modül</th>
                            <th className="px-6 py-3 text-center text-[11px] font-bold text-[#636366] uppercase tracking-wider">Görüntüle</th>
                            <th className="px-6 py-3 text-center text-[11px] font-bold text-[#636366] uppercase tracking-wider">Oluştur</th>
                            <th className="px-6 py-3 text-center text-[11px] font-bold text-[#636366] uppercase tracking-wider">Düzenle</th>
                            <th className="px-6 py-3 text-center text-[11px] font-bold text-[#636366] uppercase tracking-wider">Sil</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                        {permissions.map((p, idx) => {
                            const Icon = moduleIcons[p.module] || Settings;
                            return (
                                <motion.tr
                                    key={p.module}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="hover:bg-white/[0.01] transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-[#AEAEB2]">
                                                <Icon size={16} />
                                            </div>
                                            <span className="text-[13px] font-medium text-[#F5F0EB]">
                                                {moduleLabels[p.module] || p.module}
                                            </span>
                                        </div>
                                    </td>
                                    {['view', 'create', 'edit', 'delete'].map((field) => (
                                        <td key={field} className="px-6 py-4 text-center">
                                            <div className="flex justify-center">
                                                {readonly ? (
                                                    p[field as keyof Omit<AdminPermission, 'module'>] ? (
                                                        <Check size={16} className="text-[#C9A96E]" />
                                                    ) : (
                                                        <Minus size={16} className="text-[#636366] opacity-30" />
                                                    )
                                                ) : (
                                                    <button
                                                        onClick={() => onChange?.(p.module, field as any, !p[field as keyof Omit<AdminPermission, 'module'>])}
                                                        className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${p[field as keyof Omit<AdminPermission, 'module'>]
                                                                ? 'bg-[#C9A96E] border-[#C9A96E] text-[#0F0F10]'
                                                                : 'bg-transparent border-white/[0.1] hover:border-[#C9A96E]/40'
                                                            }`}
                                                    >
                                                        {p[field as keyof Omit<AdminPermission, 'module'>] && <Check size={12} strokeWidth={4} />}
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    ))}
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

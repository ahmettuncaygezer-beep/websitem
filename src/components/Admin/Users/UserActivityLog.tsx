'use client';

import React from 'react';
import { ActivityLog } from '@/types/users';
import {
    Plus, Edit, Trash2, LogIn, Settings,
    ShoppingCart, Globe, Monitor, MapPin
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface UserActivityLogProps {
    logs: ActivityLog[];
}

const actionConfig = {
    create: { icon: Plus, color: '#30D158', label: 'Oluşturma' },
    update: { icon: Edit, color: '#0A84FF', label: 'Güncelleme' },
    delete: { icon: Trash2, color: '#FF453A', label: 'Silme' },
    login: { icon: LogIn, color: '#C9A96E', label: 'Giriş' },
    settings: { icon: Settings, color: '#BF5AF2', label: 'Ayar Değişikliği' },
    order: { icon: ShoppingCart, color: '#FF9500', label: 'Sipariş İşlemi' },
};

export function UserActivityLog({ logs }: UserActivityLogProps) {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-[14px] font-semibold text-[#F5F0EB]">Son Aktiviteler</h3>
                <button className="text-[12px] text-[#C9A96E] hover:underline transition-all">CSV Olarak İndir</button>
            </div>

            <div className="relative pl-8 space-y-8 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/[0.04]">
                {logs.map((log, idx) => {
                    const config = actionConfig[log.action] || actionConfig.update;
                    const Icon = config.icon;

                    return (
                        <div key={log.id} className="relative group">
                            {/* Dot */}
                            <div
                                className="absolute -left-[27px] top-1 w-[10px] h-[10px] rounded-full border-2 border-[#1C1C1E] z-10"
                                style={{ backgroundColor: config.color }}
                            />

                            <div className="bg-[#1C1C1E] border border-white/[0.04] p-4 rounded-sm group-hover:border-[#C9A96E]/20 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[3px]"
                                            style={{ backgroundColor: `${config.color}15`, color: config.color }}
                                        >
                                            {config.label}
                                        </span>
                                        <h4 className="text-[13px] font-medium text-[#F5F0EB]">{log.description}</h4>
                                    </div>
                                    <span className="text-[11px] text-[#636366]">
                                        {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true, locale: tr })}
                                    </span>
                                </div>

                                {log.detail && (
                                    <p className="text-[12px] text-[#AEAEB2] mb-3 leading-relaxed">
                                        {log.detail}
                                    </p>
                                )}

                                <div className="flex flex-wrap items-center gap-4 border-t border-white/[0.04] pt-3 mt-3">
                                    <div className="flex items-center gap-1.5 text-[11px] text-[#636366]">
                                        <Globe size={12} />
                                        <span>IP: {log.ip}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[11px] text-[#636366]">
                                        <Monitor size={12} />
                                        <span>Chrome / Windows</span>
                                    </div>
                                    {log.entityId && (
                                        <div className="flex items-center gap-1.5 text-[11px] text-[#636366]">
                                            <MapPin size={12} />
                                            <span>ID: {log.entityId}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="w-full py-3 bg-white/[0.02] border border-white/[0.06] rounded-sm text-[12px] text-[#AEAEB2] hover:bg-white/[0.04] transition-all">
                Daha Fazla Yükle
            </button>
        </div>
    );
}

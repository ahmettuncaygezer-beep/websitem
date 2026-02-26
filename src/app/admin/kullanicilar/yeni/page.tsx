'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { UserForm } from '@/components/Admin/Users/UserForm';

export default function NewUserPage() {
    return (
        <div className="p-8 pb-20">
            {/* Header */}
            <div className="mb-10">
                <Link
                    href="/admin/kullanicilar"
                    className="flex items-center gap-2 text-[13px] text-[#636366] hover:text-[#C9A96E] transition-colors mb-4 group w-fit"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Kullanıcılara Dön
                </Link>
                <h1 className="text-[28px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif]">Yeni Kullanıcı Ekle</h1>
                <p className="text-sm text-[#636366] mt-1">Sisteme yeni bir yönetici veya operatör tanımlayın.</p>
            </div>

            <UserForm />
        </div>
    );
}

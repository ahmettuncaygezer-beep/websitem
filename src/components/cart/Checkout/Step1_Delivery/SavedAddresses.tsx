'use client';

import { useState } from 'react';
import { Home, Briefcase, MapPin, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_ADDRESSES = [
    { id: '1', title: 'Evim', icon: Home, name: 'Ali Kaya', city: 'İstanbul', district: 'Kadıköy', full: 'Moda Cad. No:42 D:5' },
    { id: '2', title: 'İş Yerim', icon: Briefcase, name: 'Ali Kaya', city: 'İstanbul', district: 'Levent', full: 'Büyükdere Cad. No:199' },
];

export function SavedAddresses() {
    const [selected, setSelected] = useState<string>('1');

    return (
        <div className="space-y-4">
            <h3 className="text-[12px] font-bold text-[#666] uppercase tracking-wider">Kayıtlı Adresleriniz</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {MOCK_ADDRESSES.map((addr) => (
                    <motion.div
                        key={addr.id}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelected(addr.id)}
                        className={`w-[220px] flex-shrink-0 p-4 border-2 rounded-lg cursor-pointer transition-all ${selected === addr.id ? 'border-[#C9A96E] bg-[#FDF8F0]' : 'border-[#E8E3DC] bg-white hover:border-[#1C1C1E]'}`}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <addr.icon size={16} className={selected === addr.id ? 'text-[#C9A96E]' : 'text-[#999]'} />
                            <span className="text-[13px] font-bold text-[#1C1C1E]">{addr.title}</span>
                        </div>
                        <p className="text-[12px] font-medium text-[#1C1C1E]">{addr.name}</p>
                        <p className="text-[11px] text-[#666] mt-1 leading-relaxed">
                            {addr.full} <br /> {addr.district}, {addr.city}
                        </p>
                    </motion.div>
                ))}

                <button className="w-[120px] flex-shrink-0 flex flex-col items-center justify-center border-2 border-dashed border-[#E8E3DC] rounded-lg text-[#999] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all gap-2 p-4">
                    <Plus size={20} />
                    <span className="text-[11px] font-bold tracking-wider">YENI EKLE</span>
                </button>
            </div>
        </div>
    );
}

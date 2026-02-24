'use client';

import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Heart,
    Search,
    Filter,
    Star,
    ShoppingBag,
    Sparkles,
    Palette
} from 'lucide-react';

const customers = [
    {
        id: '1',
        name: 'Elif Yıldız',
        email: 'elif@example.com',
        style: 'Modern Minimalist',
        spent: '₺142.000',
        lastOrder: '21 Feb 2026',
        avatar: 'E'
    },
    {
        id: '2',
        name: 'Can Özkan',
        email: 'can@example.com',
        style: 'Klasik Lüks',
        spent: '₺84.500',
        lastOrder: '15 Feb 2026',
        avatar: 'C'
    },
];

export default function AdminCRMPage() {
    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-serif text-charcoal">CRM & Müşteri Stilleri</h1>
                    <p className="text-sm font-sans text-warm-gray mt-1">Müşteri tercihleri, stil profilleri ve alışveriş alışkanlıkları.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" size={16} />
                        <input placeholder="Müşteri ara..." className="pl-11 pr-4 py-3 bg-white border border-border rounded-2xl text-xs font-sans w-64" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Customer List */}
                <div className="lg:col-span-1 space-y-4">
                    {customers.map((c) => (
                        <div key={c.id} className="bg-white p-6 rounded-[32px] border border-border hover:border-gold transition-all cursor-pointer group shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-sand rounded-2xl flex items-center justify-center font-serif text-xl border border-border group-hover:bg-gold group-hover:text-white transition-colors">
                                    {c.avatar}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-sans font-bold text-charcoal">{c.name}</div>
                                    <div className="text-xs font-sans text-warm-gray">{c.email}</div>
                                </div>
                                <Star size={16} className="text-gold fill-gold" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* 360 Degree View */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[40px] border border-border p-10 shadow-sm relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row gap-10">
                            <div className="space-y-6 flex-1">
                                <div className="flex items-center gap-3">
                                    <div className="px-3 py-1 bg-gold/10 text-gold text-[10px] font-sans font-bold uppercase tracking-widest rounded-full">VIP Profil</div>
                                    <div className="px-3 py-1 bg-charcoal text-white text-[10px] font-sans font-bold uppercase tracking-widest rounded-full tracking-tighter">İç Mimar Atandı</div>
                                </div>

                                <h2 className="text-4xl font-serif text-charcoal">Elif Yıldız</h2>

                                <div className="grid grid-cols-2 gap-6 pt-4">
                                    <div className="flex items-center gap-3 text-warm-gray">
                                        <Mail size={16} />
                                        <span className="text-sm font-sans">elif@example.com</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-warm-gray">
                                        <Phone size={16} />
                                        <span className="text-sm font-sans">+90 532 000 00 00</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-warm-gray">
                                        <MapPin size={16} />
                                        <span className="text-sm font-sans">İstanbul, TR</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-warm-gray">
                                        <ShoppingBag size={16} />
                                        <span className="text-sm font-sans">12 Sipariş</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-64 bg-sand/20 rounded-[32px] p-6 border border-border/50">
                                <div className="flex items-center gap-2 text-gold mb-4">
                                    <Palette size={16} />
                                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest">Stil Analizi</span>
                                </div>
                                <div className="text-xl font-serif text-charcoal mb-4">Modern Minimalist</div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[10px] font-sans font-bold">
                                        <span className="text-warm-gray uppercase">Ton Tercihi</span>
                                        <span className="text-charcoal uppercase">Toprak / Bej</span>
                                    </div>
                                    <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                                        <div className="h-full bg-gold w-[85%]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-[32px] border border-border p-8 shadow-sm">
                            <h3 className="text-xs font-sans font-bold text-charcoal uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <Heart size={14} className="text-terracotta" /> Favori Ürünler
                            </h3>
                            <div className="space-y-4">
                                {[1, 2].map(i => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-sand rounded-xl border border-border" />
                                        <div className="flex-1">
                                            <div className="text-xs font-sans font-bold text-charcoal">Bastiano Köşe Koltuk</div>
                                            <div className="text-[9px] font-sans text-warm-gray uppercase">₺32.400 • 24 Feb 2026 Favorilendi</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-charcoal rounded-[32px] p-8 shadow-sm text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xs font-sans font-bold text-gold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                    <Sparkles size={14} /> AI Öngörüler
                                </h3>
                                <p className="text-sm font-serif italic text-warm-gray leading-relaxed">
                                    "Elif hanım genelde akşam 21:00-23:00 saatleri arasında 'İskandinav' stilindeki lambaderleri inceliyor. Yeni 'Nordic Glow' koleksiyonu için özel bir ön izleme daveti ona dönüşüm getirebilir."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

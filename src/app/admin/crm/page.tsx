'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    User, Mail, Phone, MapPin, Heart, Search, Filter, Star, ShoppingBag, Sparkles, Palette, Loader2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminCRMPage() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await fetch('/api/admin/crm');
                if (!res.ok) throw new Error('Müşteri verileri alınamadı');
                const data = await res.json();
                setCustomers(data);
                if (data.length > 0) {
                    setSelectedCustomer(data[0]);
                }
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-serif text-charcoal flex items-center gap-3">
                        CRM & Müşteri Stilleri
                        {loading && <Loader2 size={16} className="animate-spin text-warm-gray" />}
                    </h1>
                    <p className="text-sm font-sans text-warm-gray mt-1">Müşteri tercihleri, stil profilleri ve alışveriş alışkanlıkları.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" size={16} />
                        <input
                            placeholder="Müşteri ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-11 pr-4 py-3 bg-white border border-border rounded-2xl text-xs font-sans w-64 focus:outline-none focus:border-gold"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Customer List */}
                <div className="lg:col-span-1 space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                    {!loading && filteredCustomers.length === 0 && (
                        <div className="p-8 text-center text-warm-gray text-sm">Müşteri bulunamadı.</div>
                    )}
                    {filteredCustomers.map((c) => (
                        <div
                            key={c.id}
                            onClick={() => setSelectedCustomer(c)}
                            className={`bg-white p-6 rounded-[32px] border transition-all cursor-pointer shadow-sm
                                ${selectedCustomer?.id === c.id ? 'border-gold ring-1 ring-gold/20' : 'border-border hover:border-gold/50'}
                            `}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-serif text-xl border transition-colors
                                    ${selectedCustomer?.id === c.id ? 'bg-gold text-white border-gold' : 'bg-sand border-border text-charcoal'}
                                `}>
                                    {c.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-sans font-bold text-charcoal truncate">{c.name}</div>
                                    <div className="text-xs font-sans text-warm-gray truncate">{c.email}</div>
                                </div>
                                {c.is_vip && <Star size={16} className="text-gold fill-gold flex-shrink-0" />}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 360 Degree View */}
                <div className="lg:col-span-2 space-y-8">
                    {selectedCustomer ? (
                        <div className="bg-white rounded-[40px] border border-border p-10 shadow-sm relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row gap-10">
                                <div className="space-y-6 flex-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        {selectedCustomer.is_vip && (
                                            <div className="px-3 py-1 bg-gold/10 text-gold text-[10px] font-sans font-bold uppercase tracking-widest rounded-full">VIP Profil</div>
                                        )}
                                        {selectedCustomer.assigned_designer && (
                                            <div className="px-3 py-1 bg-charcoal text-white text-[10px] font-sans font-bold uppercase tracking-widest rounded-full tracking-tighter">İç Mimar Atandı: {selectedCustomer.assigned_designer}</div>
                                        )}
                                    </div>

                                    <h2 className="text-4xl font-serif text-charcoal break-words">{selectedCustomer.name}</h2>

                                    <div className="grid grid-cols-2 gap-6 pt-4">
                                        <div className="flex items-center gap-3 text-warm-gray">
                                            <Mail size={16} />
                                            <span className="text-sm font-sans truncate">{selectedCustomer.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-warm-gray">
                                            <Phone size={16} />
                                            <span className="text-sm font-sans">Kayıtlı Değil</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-warm-gray">
                                            <ShoppingBag size={16} />
                                            <span className="text-sm font-sans">{selectedCustomer.orders} Sipariş</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-warm-gray flex-col items-start gap-1">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl font-serif text-charcoal">₺{Number(selectedCustomer.spent).toLocaleString('tr-TR')}</span>
                                            </div>
                                            <span className="text-[10px] uppercase font-bold ml-[28px] mt-[-5px]">Toplam Harcama</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-64 bg-sand/20 rounded-[32px] p-6 border border-border/50">
                                    <div className="flex items-center gap-2 text-gold mb-4">
                                        <Palette size={16} />
                                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest">Stil Analizi</span>
                                    </div>
                                    <div className="text-xl font-serif text-charcoal mb-4">{selectedCustomer.style}</div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-[10px] font-sans font-bold">
                                            <span className="text-warm-gray uppercase">Ton Tercihi</span>
                                            <span className="text-charcoal uppercase">{selectedCustomer.tone}</span>
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
                    ) : (
                        <div className="bg-white rounded-[40px] border border-border p-10 h-full flex flex-col items-center justify-center text-warm-gray">
                            <User size={48} className="mb-4 opacity-50" />
                            <p>Görüntülemek için bir müşteri seçin</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-[32px] border border-border p-8 shadow-sm">
                            <h3 className="text-xs font-sans font-bold text-charcoal uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <Heart size={14} className="text-terracotta" /> Favori Ürünler
                            </h3>
                            <div className="space-y-4">
                                <div className="text-sm font-sans text-warm-gray p-4 text-center border border-dashed border-border rounded-2xl">
                                    Favori ürünler yakında eklenecek.
                                </div>
                            </div>
                        </div>

                        <div className="bg-charcoal rounded-[32px] p-8 shadow-sm text-white relative overflow-hidden flex flex-col">
                            <div className="relative z-10 flex-1">
                                <h3 className="text-xs font-sans font-bold text-gold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                    <Sparkles size={14} /> AI Öngörüler
                                </h3>
                                <p className="text-sm font-serif italic text-warm-gray leading-relaxed">
                                    {selectedCustomer?.ai_insights ? `"${selectedCustomer.ai_insights}"` : "Bu müşteri için henüz AI öngörüsü oluşturulmadı."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

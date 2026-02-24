'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Box,
    Layers,
    Image as ImageIcon,
    Target,
    Save,
    X,
    Upload
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function AdminInventoryPage() {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-serif text-charcoal">Ürün & Varlık Yönetimi</h1>
                    <p className="text-sm font-sans text-warm-gray mt-1">3D modeller, materyaller ve "Shop the Room" ayarları.</p>
                </div>
                <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-2xl text-[10px] font-sans font-bold uppercase tracking-widest hover:shadow-xl transition-all"
                >
                    <Plus size={16} /> Koleksiyona Ekle
                </button>
            </div>

            {/* Editing Overlay (Modal Concept) */}
            <AnimatePresence>
                {isEditing && (
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
                            onClick={() => setIsEditing(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-5xl h-[90vh] rounded-[40px] shadow-2xl relative z-10 overflow-hidden flex flex-col"
                        >
                            <div className="p-8 border-b border-border flex items-center justify-between bg-sand/10">
                                <div>
                                    <h2 className="text-2xl font-serif text-charcoal">Ürün Editörü</h2>
                                    <p className="text-xs font-sans text-warm-gray">Premium ürün detaylarını ve 3D varlıkları yapılandırın.</p>
                                </div>
                                <button onClick={() => setIsEditing(false)} className="p-3 hover:bg-white rounded-full transition-colors"><X size={24} /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Left Side: Basic Info & 3D */}
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-sans font-bold text-warm-gray uppercase tracking-widest">Temel Bilgiler</label>
                                        <input placeholder="Ürün Adı" className="w-full px-5 py-3.5 bg-sand/20 rounded-2xl border-none text-sm outline-none" />
                                        <textarea placeholder="Ürün Açıklaması" rows={4} className="w-full px-5 py-3.5 bg-sand/20 rounded-2xl border-none text-sm outline-none" />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-sans font-bold text-warm-gray uppercase tracking-widest flex items-center gap-2">
                                            <Box size={14} /> 3D Model Varlıkları
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-5 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-gold transition-colors cursor-pointer">
                                                <Upload size={20} className="text-warm-gray" />
                                                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-warm-gray">.GLB (Web)</span>
                                            </div>
                                            <div className="p-5 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-gold transition-colors cursor-pointer">
                                                <Upload size={20} className="text-warm-gray" />
                                                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-warm-gray">.USDZ (iOS/AR)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Variants & Hotspots */}
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-sans font-bold text-warm-gray uppercase tracking-widest flex items-center gap-2">
                                            <Layers size={14} /> Materyal Varyasyonları
                                        </label>
                                        <div className="space-y-3">
                                            {['Keten Bej', 'Kadife Lacivert', 'Deri Antrasit'].map(v => (
                                                <div key={v} className="flex items-center gap-4 p-4 bg-sand/20 rounded-2xl">
                                                    <div className="w-8 h-8 rounded-full bg-white border border-border" />
                                                    <span className="text-xs font-sans font-bold flex-1">{v}</span>
                                                    <button className="text-terracotta"><Trash2 size={16} /></button>
                                                </div>
                                            ))}
                                            <button className="w-full py-3 border-2 border-dashed border-border rounded-2xl text-[10px] font-sans font-bold uppercase tracking-widest text-warm-gray hover:text-gold hover:border-gold transition-all">
                                                + Yeni Varyasyon Ekle
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-sans font-bold text-warm-gray uppercase tracking-widest flex items-center gap-2">
                                            <Target size={14} /> "Shop the Room" Etiketleme
                                        </label>
                                        <div className="h-48 bg-sand/30 rounded-3xl border border-border border-dashed flex items-center justify-center gap-3">
                                            <ImageIcon size={24} className="text-warm-gray" />
                                            <span className="text-xs font-sans text-warm-gray">Odada Göster Fotoğrafı Yükle</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border-t border-border flex justify-end gap-4 bg-white sticky bottom-0">
                                <button onClick={() => setIsEditing(false)} className="px-8 py-4 rounded-2xl text-[10px] font-sans font-bold uppercase tracking-widest text-warm-gray hover:bg-sand transition-all">İptal</button>
                                <button className="flex items-center gap-2 bg-charcoal text-white px-10 py-4 rounded-2xl text-[10px] font-sans font-bold uppercase tracking-widest hover:bg-black transition-all">
                                    <Save size={16} /> Değişiklikleri Kaydet
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* List View */}
            <div className="bg-white rounded-[32px] border border-border overflow-hidden">
                <div className="p-8 border-b border-border flex items-center justify-between gap-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-warm-gray" size={18} />
                        <input placeholder="Koleksiyonlarda ara..." className="w-full pl-14 pr-4 py-3 bg-sand/10 rounded-2xl border-none text-sm font-sans" />
                    </div>
                    <div className="flex gap-2">
                        {['Büfeler', 'Koltuklar', 'Yataklar'].map(f => (
                            <button key={f} className="px-5 py-2.5 rounded-xl text-[10px] font-sans font-bold border border-border hover:bg-sand transition-all uppercase tracking-widest">{f}</button>
                        ))}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FBFAFA] border-b border-border">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-sans font-bold text-warm-gray uppercase tracking-[0.2em] w-16">3D</th>
                                <th className="px-8 py-5 text-[10px] font-sans font-bold text-warm-gray uppercase tracking-[0.2em]">Ürün</th>
                                <th className="px-8 py-5 text-[10px] font-sans font-bold text-warm-gray uppercase tracking-[0.2em]">Stok</th>
                                <th className="px-8 py-5 text-[10px] font-sans font-bold text-warm-gray uppercase tracking-[0.2em]">Fiyat</th>
                                <th className="px-8 py-5 text-[10px] font-sans font-bold text-warm-gray uppercase tracking-[0.2em]">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {[1, 2, 3, 4].map(i => (
                                <tr key={i} className="hover:bg-sand/10 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="w-10 h-10 bg-charcoal rounded-xl flex items-center justify-center text-gold">
                                            <Box size={20} />
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-sans font-bold text-charcoal">Bastiano Köşe Koltuk</div>
                                        <div className="text-[10px] font-sans text-warm-gray uppercase">Oturma Odası • 12 Varyant</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                            <span className="text-sm font-sans text-charcoal">24 Parça</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-sans font-bold">₺32.400</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setIsEditing(true)} className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-border"><Edit2 size={16} className="text-warm-gray" /></button>
                                            <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-border"><Trash2 size={16} className="text-terracotta" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

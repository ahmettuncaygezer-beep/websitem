'use client';

import React, { useState } from 'react';
import {
    Layout, Type, Image as LucideImage,
    Box, Plus, Trash2, GripVertical,
    Save, Send, ChevronLeft, Smartphone, Monitor
} from 'lucide-react';
import { motion, Reorder } from 'framer-motion';
import Link from 'next/link';

interface ContentBlock {
    id: string;
    type: 'text' | 'image' | 'products' | 'button';
    content: any;
}

export function NewsletterEditor({ initialData }: { initialData?: any }) {
    const [view, setView] = useState<'desktop' | 'mobile'>('desktop');
    const [blocks, setBlocks] = useState<ContentBlock[]>([
        { id: '1', type: 'text', content: { title: 'Yeni Koleksiyonu Keşfedin', body: 'Lüks ve konforun buluştuğu SELIS ürünleri şimdi özel indirimlerle.' } }
    ]);

    const addBlock = (type: ContentBlock['type']) => {
        const newBlock: ContentBlock = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            content: type === 'text' ? { title: '', body: '' } : type === 'products' ? { count: 3 } : {}
        };
        setBlocks([...blocks, newBlock]);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)]">
            <div className="flex-1 flex overflow-hidden">
                {/* Tools Sidebar */}
                <div className="w-80 border-r border-white/05 bg-[#141416] p-6 overflow-y-auto">
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[11px] font-bold text-[#636366] uppercase tracking-wider mb-4">Kampanya Bilgileri</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[12px] text-[#AEAEB2] mb-1.5">E-posta Konusu</label>
                                    <input
                                        type="text"
                                        placeholder="Haftalık Bülten - Mart #1"
                                        className="w-full bg-white/05 border border-white/10 rounded-sm px-3 py-2 text-[13px] text-[#F5F0EB] focus:border-[#C9A96E]/40 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[12px] text-[#AEAEB2] mb-1.5">Hedef Kitle</label>
                                    <select className="w-full bg-white/05 border border-white/10 rounded-sm px-3 py-2 text-[13px] text-[#F5F0EB] focus:border-[#C9A96E]/40 outline-none">
                                        <option>Tüm Aboneler</option>
                                        <option>Yeni Üyeler (Son 30 Gün)</option>
                                        <option>VIP Müşteriler</option>
                                        <option>Sepette Ürün Bırakanlar</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[11px] font-bold text-[#636366] uppercase tracking-wider mb-4">İçerik Blokları</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => addBlock('text')} className="flex flex-col items-center gap-2 p-4 bg-white/05 border border-white/10 rounded-sm hover:border-[#C9A96E]/40 hover:bg-white/[0.08] transition-all group">
                                    <Type size={18} className="text-[#636366] group-hover:text-[#C9A96E]" />
                                    <span className="text-[11px] text-[#AEAEB2]">Metin</span>
                                </button>
                                <button onClick={() => addBlock('image')} className="flex flex-col items-center gap-2 p-4 bg-white/05 border border-white/10 rounded-sm hover:border-[#C9A96E]/40 hover:bg-white/[0.08] transition-all group">
                                    <LucideImage size={18} className="text-[#636366] group-hover:text-[#C9A96E]" />
                                    <span className="text-[11px] text-[#AEAEB2]">Görsel</span>
                                </button>
                                <button onClick={() => addBlock('products')} className="flex flex-col items-center gap-2 p-4 bg-white/05 border border-white/10 rounded-sm hover:border-[#C9A96E]/40 hover:bg-white/[0.08] transition-all group">
                                    <Box size={18} className="text-[#636366] group-hover:text-[#C9A96E]" />
                                    <span className="text-[11px] text-[#AEAEB2]">Ürünler</span>
                                </button>
                                <button onClick={() => addBlock('button')} className="flex flex-col items-center gap-2 p-4 bg-white/05 border border-white/10 rounded-sm hover:border-[#C9A96E]/40 hover:bg-white/[0.08] transition-all group">
                                    <Layout size={18} className="text-[#636366] group-hover:text-[#C9A96E]" />
                                    <span className="text-[11px] text-[#AEAEB2]">Buton</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editor Surface */}
                <div className="flex-1 bg-[#0F0F10] p-12 flex flex-col items-center overflow-y-auto">
                    {/* View Switcher */}
                    <div className="flex bg-white/[0.04] p-1 rounded-sm border border-white/[0.08] mb-10">
                        <button
                            onClick={() => setView('desktop')}
                            className={`p-2 rounded-sm transition-all ${view === 'desktop' ? 'bg-white/10 text-[#C9A96E]' : 'text-[#636366]'}`}
                        >
                            <Monitor size={16} />
                        </button>
                        <button
                            onClick={() => setView('mobile')}
                            className={`p-2 rounded-sm transition-all ${view === 'mobile' ? 'bg-white/10 text-[#C9A96E]' : 'text-[#636366]'}`}
                        >
                            <Smartphone size={16} />
                        </button>
                    </div>

                    {/* Content Paper */}
                    <div
                        className={`bg-white transition-all duration-300 shadow-2xl overflow-hidden flex flex-col min-h-full ${view === 'desktop' ? 'w-full max-w-2xl' : 'w-[375px]'
                            }`}
                    >
                        {/* Email Header */}
                        <div className="bg-[#1C1C1E] p-8 text-center border-b border-black/05">
                            <span className="text-[#C9A96E] text-2xl font-['Playfair_Display',serif] tracking-widest font-bold">SELIS</span>
                        </div>

                        {/* Blocks */}
                        <div className="p-8 space-y-8 flex-1">
                            <Reorder.Group axis="y" values={blocks} onReorder={setBlocks} className="space-y-4">
                                {blocks.map((block) => (
                                    <Reorder.Item key={block.id} value={block} className="relative group/block">
                                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover/block:opacity-100 transition-all flex flex-col items-center gap-2">
                                            <div className="cursor-grab active:cursor-grabbing p-1.5 text-[#636366] hover:text-[#C9A96E]">
                                                <GripVertical size={16} />
                                            </div>
                                            <button
                                                onClick={() => setBlocks(blocks.filter(b => b.id !== block.id))}
                                                className="p-1.5 text-[#636366] hover:text-[#FF453A]"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div className="border border-dashed border-transparent hover:border-[#C9A96E]/40 rounded-sm p-4 transition-all">
                                            {block.type === 'text' && (
                                                <div className="text-center text-black">
                                                    <input
                                                        className="w-full text-center text-xl font-bold bg-transparent outline-none mb-2"
                                                        placeholder="Başlık Yazın..."
                                                        defaultValue={block.content.title}
                                                    />
                                                    <textarea
                                                        className="w-full text-center text-sm text-gray-500 bg-transparent outline-none resize-none"
                                                        placeholder="Açıklama metni..."
                                                        rows={3}
                                                        defaultValue={block.content.body}
                                                    />
                                                </div>
                                            )}
                                            {block.type === 'image' && (
                                                <div className="aspect-video bg-gray-100 rounded-sm flex items-center justify-center text-gray-400 border border-gray-200">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <LucideImage size={32} strokeWidth={1} />
                                                        <span className="text-[11px] font-medium">Görsel Yükle</span>
                                                    </div>
                                                </div>
                                            )}
                                            {block.type === 'products' && (
                                                <div className="grid grid-cols-2 gap-4">
                                                    {[1, 2].map(i => (
                                                        <div key={i} className="bg-gray-50 p-3 rounded-sm border border-gray-100">
                                                            <div className="aspect-square bg-gray-200 rounded-sm mb-3" />
                                                            <div className="h-3 w-3/4 bg-gray-200 rounded-full mb-2" />
                                                            <div className="h-3 w-1/2 bg-gray-200 rounded-full" />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {block.type === 'button' && (
                                                <div className="flex justify-center">
                                                    <button className="bg-[#C9A96E] text-white px-8 py-3 font-bold text-sm tracking-widest uppercase">
                                                        Koleksiyonu İncele
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </Reorder.Item>
                                ))}
                            </Reorder.Group>

                            {blocks.length === 0 && (
                                <div className="py-20 border-2 border-dashed border-gray-100 rounded-sm flex flex-col items-center justify-center text-gray-400">
                                    <Plus size={24} className="mb-2" />
                                    <span className="text-sm font-medium">Blok eklemek için yan menüyü kullanın</span>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-8 border-t border-gray-100 text-center text-[10px] text-gray-400 uppercase tracking-widest">
                            © 2024 SELIS COLLECTIVE • Tüm Hakları Saklıdır
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="h-20 border-t border-white/05 bg-[#141416] px-8 flex items-center justify-between">
                <Link href="/admin/eposta" className="flex items-center gap-2 text-[13px] text-[#636366] hover:text-[#AEAEB2] transition-colors">
                    <ChevronLeft size={16} /> İptal Et
                </Link>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-white/[0.03] border border-white/[0.06] hover:bg-white/05 text-[#AEAEB2] text-[13px] font-bold rounded-sm transition-all">
                        <Save size={16} /> Taslak Olarak Kaydet
                    </button>
                    <button className="flex items-center gap-2 px-8 py-2.5 bg-[#C9A96E] hover:bg-[#D4B87A] text-[#0F0F10] text-[13px] font-bold rounded-sm transition-all shadow-[0_4px_20px_rgba(201,169,110,0.2)]">
                        <Send size={16} /> Şimdi Gönder
                    </button>
                </div>
            </div>
        </div>
    );
}

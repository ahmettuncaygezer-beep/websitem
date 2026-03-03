'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, MessageCircle, FileText } from 'lucide-react';

export default function GarantiPage() {
    return (
        <main className="min-h-screen bg-[#FAF8F5] pt-32 pb-20">
            <div className="container-premium max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <ShieldCheck className="w-12 h-12 text-[#C9A96E] mx-auto mb-4" />
                    <h1 className="text-display mb-4">Ürün Garantisi</h1>
                    <p className="text-body-lg">5 yıl SELIS güvencesi.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white p-8 rounded-xl border border-[#E8E3DC]">
                        <h3 className="font-serif text-xl mb-4 text-[#C9A96E]">Neleri Kapsar?</h3>
                        <ul className="space-y-3 text-sm text-[#666]">
                            <li>• İskelet ve taşıyıcı aksamdaki hatalar</li>
                            <li>• Malzeme kaynaklı dökülme ve solmalar</li>
                            <li>• Birleştirme ve montaj kusurları</li>
                            <li>• Mekanizma arızaları</li>
                        </ul>
                    </div>
                    <div className="bg-white p-8 rounded-xl border border-[#E8E3DC]">
                        <h3 className="font-serif text-xl mb-4 text-[#C9A96E]">Neleri Kapsamaz?</h3>
                        <ul className="space-y-3 text-sm text-[#666]">
                            <li>• Kullanım kaynaklı yırtılma ve yanmalar</li>
                            <li>• Sıvı teması sonucu oluşan lekelenmeler</li>
                            <li>• Yanlış temizlik ürünleri kullanımı</li>
                            <li>• Taşınma esnasında oluşan hasarlar (SELIS dışı nakil)</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-[#1C1C1E] rounded-2xl p-10 text-white flex flex-col md:flex-row items-center gap-8 justify-between">
                    <div>
                        <h2 className="font-serif text-2xl mb-2">Servis Talebi</h2>
                        <p className="text-white/60 text-sm">Garantili ürünleriniz için teknik servis talebi oluşturabilirsiniz.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-[#C9A96E] text-[#1C1C1E] font-bold rounded-sm text-sm">TALEP OLUŞTUR</button>
                        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-sm text-sm">DESTEK AL</button>
                    </div>
                </div>
            </div>
        </main>
    );
}

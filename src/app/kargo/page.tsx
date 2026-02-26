'use client';

import { motion } from 'framer-motion';
import { Truck, MapPin, Clock, ShieldCheck } from 'lucide-react';

export default function KargoPage() {
    return (
        <main className="min-h-screen bg-[#FAF8F5] pt-32 pb-20">
            <div className="container-premium max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <Truck className="w-12 h-12 text-[#C9A96E] mx-auto mb-4" />
                    <h1 className="text-display mb-4">Teslimat Bilgileri</h1>
                    <p className="text-body-lg">Güvenli ve özenli teslimat süreçlerimiz.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        { icon: Truck, title: 'Ücretsiz Nakliye', desc: '₺5.000 üzeri siparişlerde Türkiye geneli ücretsiz nakliye.' },
                        { icon: ShieldCheck, title: 'Profesyonel Montaj', desc: 'Deneyimli ekiplerimiz tarafından ücretsiz kurulum hizmeti.' },
                        { icon: Clock, title: 'Hızlı Teslimat', desc: 'Stoklu ürünlerde 2-5 iş günü içinde kapınızda.' },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-xl border border-[#E8E3DC] text-center">
                            <item.icon className="w-8 h-8 text-[#C9A96E] mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-[#666]">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl p-8 md:p-12 border border-[#E8E3DC]">
                    <h2 className="font-serif text-2xl mb-6">Detaylı Teslimat Süreci</h2>
                    <div className="space-y-6 text-[#666] leading-relaxed">
                        <p>MAISON olarak siparişlerinizi kendi özel lojistik ağımız ve uzman ekiplerimizle teslim ediyoruz. Mobilyalarınızın hassasiyetini biliyor, taşınma ve kurulum aşamasında en yüksek özeni gösteriyoruz.</p>
                        <ul className="list-disc pl-5 space-y-3">
                            <li>Siparişiniz kargoya verilmeden önce kalite kontrol ekibimiz tarafından detaylıca incelenir.</li>
                            <li>Teslimat gününden bir gün önce ekiplerimiz sizi arayarak uygunluk durumunuzu teyit eder.</li>
                            <li>Montaj hizmeti, teslimat anında ekiplerimiz tarafından gerçekleştirilir ve ürünleriniz kullanıma hazır halde teslim edilir.</li>
                            <li>Türkiye&apos;nin 81 iline teslimat yapmaktayız (bazı adalar ve uzak bölgeler için ek süre gerekebilir).</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}

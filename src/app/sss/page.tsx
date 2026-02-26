'use client';

import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
    {
        q: 'Siparişim ne zaman teslim edilir?',
        a: 'Ürünlerimiz el işçiliği ile üretildiği için teslimat süreleri ürün grubuna göre 2 ile 30 iş günü arasında değişmektedir. Ürün sayfasında belirtilen teslimat sürelerini kontrol edebilirsiniz.'
    },
    {
        q: 'Teslimat ücretli mi?',
        a: '₺5.000 ve üzeri tüm siparişlerinizde nakliye ve montaj hizmetimiz ücretsizdir. Bu tutarın altındaki siparişler için standart kargo ücreti uygulanır.'
    },
    {
        q: 'Ödeme seçenekleriniz nelerdir?',
        a: 'Kredi kartı (36 aya varan taksit seçenekleri), Havale/EFT ve Mağazadan ödeme seçeneklerimiz mevcuttur.'
    },
    {
        q: 'Ürünü iade edebilir miyim?',
        a: 'Evet, standart ürünlerimizde 30 gün içinde koşulsuz iade hakkınız mevcuttur. Kişiye özel üretim (seçili kumaş/ölçü) ürünlerde ise iade yapılamamaktadır.'
    },
    {
        q: 'Garanti süresi ne kadar?',
        a: 'Tüm mobilya ürünlerimiz üretim ve malzeme hatalarına karşı 5 yıl MAISON garantisi altındadır.'
    }
];

export default function SSSPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <main className="min-h-screen bg-[#FAF8F5] pt-32 pb-20">
            <div className="container-premium max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <HelpCircle className="w-12 h-12 text-[#C9A96E] mx-auto mb-4" />
                    <h1 className="text-display mb-4">Sıkça Sorulan Sorular</h1>
                    <p className="text-body-lg">Aradığınız cevabı burada bulabilirsiniz.</p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-[#E8E3DC] overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left"
                            >
                                <span className="font-semibold text-[#1C1C1E]">{faq.q}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-[#C9A96E] transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <motion.div
                                initial={false}
                                animate={{ height: openIndex === idx ? 'auto' : 0, opacity: openIndex === idx ? 1 : 0 }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 pb-6 text-sm text-[#666] leading-relaxed border-t border-[#F5F0EB] pt-4">
                                    {faq.a}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

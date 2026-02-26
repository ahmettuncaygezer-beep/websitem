'use client';

import { motion } from 'framer-motion';
import { RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function IadePage() {
    return (
        <main className="min-h-screen bg-[#FAF8F5] pt-32 pb-20">
            <div className="container-premium max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <RotateCcw className="w-12 h-12 text-[#C9A96E] mx-auto mb-4" />
                    <h1 className="text-display mb-4">İptal ve İade Koşulları</h1>
                    <p className="text-body-lg">30 gün boyunca koşulsuz iade güvencesi.</p>
                </motion.div>

                <div className="bg-white rounded-2xl p-8 md:p-12 border border-[#E8E3DC] mb-12">
                    <div className="flex items-start gap-4 mb-8">
                        <CheckCircle2 className="w-6 h-6 text-[#4CAF50] shrink-0" />
                        <div>
                            <h3 className="font-semibold text-lg mb-2">30 Günlük İade Hakkı</h3>
                            <p className="text-[#666] text-sm leading-relaxed">Standart koleksiyonumuzdaki ürünleri, teslimat tarihinden itibaren 30 gün içinde herhangi bir gerekçe göstermeksizin iade edebilirsiniz.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 mb-8">
                        <AlertCircle className="w-6 h-6 text-[#C9A96E] shrink-0" />
                        <div>
                            <h3 className="font-semibold text-lg mb-2">İstisnai Durumlar</h3>
                            <p className="text-[#666] text-sm leading-relaxed">Kişiye özel ölçü, renk veya kumaş seçimi yapılarak üretilen (custom-made) ürünler ile hijyen kuralları gereği paketinden çıkarılmış tekstil ürünlerinde iade kabul edilememektedir.</p>
                        </div>
                    </div>

                    <h2 className="font-serif text-2xl mb-6 mt-12">İade Süreci Nasıl İşler?</h2>
                    <ol className="list-decimal pl-5 space-y-4 text-[#666] text-sm leading-relaxed">
                        <li>Müşteri panelinizden veya destek hattımızdan iade talebinizi oluşturun.</li>
                        <li>İade ekibimiz ürünü adresinizden teslim almak üzere randevu planlar.</li>
                        <li>Ürün merkeze ulaştıktan sonra kalite kontrolü yapılır ve onaylanır.</li>
                        <li>Onayın ardından 7-10 iş günü içerisinde ödeme yaptığınız kanala (kredi kartı/hesap) iadeniz gerçekleştirilir.</li>
                    </ol>
                </div>
            </div>
        </main>
    );
}

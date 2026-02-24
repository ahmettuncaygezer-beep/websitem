'use client';

import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, FileText, Phone } from 'lucide-react';

export default function HelpCenterPage() {
    const categories = [
        { icon: HelpCircle, title: 'Sıkça Sorulan Sorular', desc: 'Sipariş, teslimat ve iade süreçleri hakkında bilgiler.' },
        { icon: MessageCircle, title: 'Canlı Destek', desc: 'Müşteri temsilcilerimizle anında iletişime geçin.' },
        { icon: FileText, title: 'Üyelik & Güvenlik', desc: 'Hesap yönetimi ve veri koruma politikalarımız.' },
        { icon: Phone, title: 'Bize Ulaşın', desc: '0850 XXX XX XX numaralı hattımızdan bize ulaşabilirsiniz.' },
    ];

    return (
        <div className="bg-sand min-h-screen pt-32 pb-20">
            <div className="container-premium">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h1 className="text-display mb-6">Yardım Merkezi</h1>
                    <p className="text-body-lg">Size nasıl yardımcı olabiliriz? Sorularınızın cevaplarını burada bulabilir veya doğrudan destek ekibimizle iletişime geçebilirsiniz.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group"
                        >
                            <div className="w-12 h-12 bg-sand rounded-2xl flex items-center justify-center text-sage mb-6 group-hover:bg-sage group-hover:text-white transition-colors">
                                <cat.icon size={24} />
                            </div>
                            <h3 className="font-serif text-xl mb-3">{cat.title}</h3>
                            <p className="text-sm font-sans text-warm-gray leading-relaxed">{cat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

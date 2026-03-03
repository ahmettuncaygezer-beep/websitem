'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, RotateCcw, Truck, Headphones } from 'lucide-react';
import { TRUST_BADGES } from './socialProof.data';

/* ÜST BÖLÜM: 4 garanti kutusu */
const GUARANTEES = [
    {
        icon: Truck,
        title: 'Ücretsiz Kargo',
        desc: '₺5.000 üzeri siparişlerde',
        titleKey: 'trust_shipping_title',
        descKey: 'trust_shipping_desc'
    },
    {
        icon: Shield,
        title: '5 Yıl Garanti',
        desc: 'Tüm mobilya ürünlerinde',
        titleKey: 'trust_warranty_title',
        descKey: 'trust_warranty_desc'
    },
    {
        icon: RotateCcw,
        title: '30 Gün İade',
        desc: 'Koşulsuz iade garantisi',
        titleKey: 'trust_return_title',
        descKey: 'trust_return_desc'
    },
    {
        icon: Headphones,
        title: 'VIP Destek',
        desc: '7/24 kişiye özel danışmanlık',
        titleKey: 'trust_support_title',
        descKey: 'trust_support_desc'
    },
];
import { useGlobal } from '@/context/GlobalContext';

export default function TrustBadges() {
    const { t } = useGlobal();
    return (
        <div>
            {/* ÜST: GARANTİ KUTULARI (Footer'dan önce, tam genişlik) */}
            <section className="py-12 bg-[#F5F0EB] border-t border-[#E8E3DC]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {GUARANTEES.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col items-center text-center gap-3 p-4 rounded-sm bg-white border border-[#E8E3DC] hover:border-[#C9A96E] hover:shadow-sm transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-[#F5F0EB] flex items-center justify-center group-hover:bg-[#C9A96E]/10 transition-colors">
                                        <Icon className="w-5 h-5 text-[#C9A96E]" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#1C1C1E] text-[13px] mb-1" data-lang-key={item.titleKey} suppressHydrationWarning>
                                            {item.title}
                                        </p>
                                        <p className="text-[11px] text-[#666] leading-relaxed" data-lang-key={item.descKey} suppressHydrationWarning>
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ALT: GÜVEN ROZETLERİ (Footer içinde) */}
            <div className="bg-[#1C1C1E] py-8 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <p className="text-center text-[11px] text-white/40 tracking-[0.25em] uppercase mb-6" data-lang-key="trust_secure_shopping">
                        {t('trust_secure_shopping') || 'Güvenli Alışveriş'}
                    </p>

                    {/* ROZET SATIRI */}
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                        {/* SSL ROZETİ */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
                        >
                            <div className="w-8 h-8 rounded-full bg-[#4CAF50]/20 flex items-center justify-center">
                                <Lock className="w-4 h-4 text-[#4CAF50]" />
                            </div>
                            <div>
                                <p className="text-white text-[11px] font-bold leading-none">
                                    256-bit SSL
                                </p>
                                <p className="text-white/40 text-[9px] mt-0.5" data-lang-key="trust_ssl_encrypted">
                                    {t('trust_ssl_encrypted') || 'Şifreli bağlantı'}
                                </p>
                            </div>
                        </motion.div>

                        {/* AYIRICI */}
                        <div className="w-px h-8 bg-white/10 hidden md:block" />

                        {/* ÖDEME ROZET GRUPLARI */}
                        {TRUST_BADGES.filter((b) => b.category === 'payment').map((badge) => (
                            <motion.a
                                key={badge.id}
                                href={badge.verifyUrl ?? '#'}
                                target={badge.verifyUrl ? '_blank' : '_self'}
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.08, opacity: 1 }}
                                className="opacity-40 hover:opacity-100 transition-all duration-200 flex items-center justify-center"
                                title={badge.description}
                            >
                                <span className="text-white font-bold text-sm bg-white/10 px-3 py-1.5 rounded-sm">
                                    {badge.name}
                                </span>
                            </motion.a>
                        ))}

                        {/* AYIRICI */}
                        <div className="w-px h-8 bg-white/10 hidden md:block" />

                        {/* DERNEK/KURUM ROZETLERİ */}
                        {TRUST_BADGES.filter((b) => b.category === 'association').map((badge) => (
                            <motion.a
                                key={badge.id}
                                href={badge.verifyUrl ?? '#'}
                                target={badge.verifyUrl ? '_blank' : '_self'}
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.08 }}
                                className="opacity-40 hover:opacity-100 transition-all duration-200"
                                title={`${badge.name} — ${badge.description}`}
                            >
                                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm hover:border-[#C9A96E] transition-colors">
                                    <Shield className="w-3.5 h-3.5 text-[#C9A96E]" />
                                    <span className="text-white text-[11px] font-semibold">
                                        {badge.name}
                                    </span>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* ALT NOT */}
                    <p className="text-center text-white/25 text-[10px] mt-6 tracking-wide" data-lang-key="trust_secure_desc">
                        {t('trust_secure_desc') || 'Tüm ödemeleriniz 256-bit SSL şifreleme ile korunmaktadır. iyzico ve PayTR güvencesiyle güvenli alışveriş.'}
                    </p>
                </div>
            </div>
        </div>
    );
}

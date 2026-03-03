'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#FAFAF8] dark:bg-[#0D0D0F] py-20 px-6">
            <div className="max-w-xl text-center">
                {/* Animated 404 */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                    className="mb-8"
                >
                    <span className="font-serif text-[120px] md:text-[160px] leading-none font-bold bg-gradient-to-b from-[#C9A96E] to-[#9A7440] bg-clip-text text-transparent select-none">
                        404
                    </span>
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <h1 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] dark:text-[#F5F0EB] mb-4">
                        Sayfa Bulunamadı
                    </h1>
                    <p className="text-base font-sans text-[#6B6560] dark:text-[#8E8E93] mb-10 max-w-md mx-auto leading-relaxed">
                        Aradığınız sayfa taşınmış, kaldırılmış veya hiç var olmamış olabilir.
                        Alışverişe devam etmek için aşağıdaki bağlantıları kullanabilirsiniz.
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/"
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1C1C1E] dark:bg-[#C9A96E] text-white dark:text-[#0D0D0F] text-xs font-sans font-bold uppercase tracking-widest rounded-2xl hover:bg-black dark:hover:bg-[#B8915A] transition-all duration-300"
                    >
                        <Home size={16} />
                        Ana Sayfaya Dön
                    </Link>
                    <Link
                        href="/kategori/oturma-odasi"
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-[#1C1C1E] border border-[#E8E2DB] dark:border-[#2C2C2E] text-[#1C1C1E] dark:text-[#F5F0EB] text-xs font-sans font-bold uppercase tracking-widest rounded-2xl hover:bg-[#FAF8F5] dark:hover:bg-[#2C2C2E] transition-all duration-300"
                    >
                        <Search size={16} />
                        Ürünleri Keşfet
                    </Link>
                </motion.div>

                {/* Decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-16 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent"
                />

                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6"
                >
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 text-[13px] font-sans text-[#6B6560] dark:text-[#8E8E93] hover:text-[#C9A96E] transition-colors group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Önceki sayfaya geri dön
                    </button>
                </motion.div>
            </div>
        </div>
    );
}

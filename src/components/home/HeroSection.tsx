'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/hero/main.jpg"
                    alt="Lüks modern salon"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full container-premium flex flex-col justify-center">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-6">
                            2026 İlkbahar / Yaz Koleksiyonu
                        </p>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        className="text-display text-charcoal"
                    >
                        Evinizin
                        <br />
                        <span className="italic text-gold">Yeni Hikayesi</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                        className="text-body-lg mt-6 max-w-lg"
                    >
                        Doğal malzemeler, zamansız tasarımlar ve el işçiliği ile
                        yaşam alanlarınıza sofistike bir dokunuş.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                        className="flex flex-wrap gap-4 mt-10"
                    >
                        <Link
                            href="/kategori/oturma-odasi"
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-white text-sm font-sans font-semibold uppercase tracking-widest rounded-full hover:bg-gold transition-colors duration-500"
                        >
                            Koleksiyonu Keşfet
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/kategori/oturma-odasi"
                            className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-charcoal text-charcoal text-sm font-sans font-semibold uppercase tracking-widest rounded-full hover:bg-charcoal hover:text-white transition-colors duration-500"
                        >
                            Lookbook
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-warm-gray">
                        Keşfet
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        className="w-px h-8 bg-gradient-to-b from-warm-gray to-transparent"
                    />
                </motion.div>
            </div>
        </section>
    );
}

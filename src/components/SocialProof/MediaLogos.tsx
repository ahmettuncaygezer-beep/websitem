'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { MEDIA_LOGOS } from './socialProof.data';

export default function MediaLogos() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section className="py-16 bg-[#1C1C1E] overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* BAŞLIK */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-[11px] text-[#C9A96E] tracking-[0.3em] uppercase font-medium mb-3">
                        Medyada Biz
                    </p>
                    <h2 className="text-xl md:text-2xl font-medium text-white/80">
                        Türkiye&apos;nin önde gelen yayınlarında yer aldık
                    </h2>
                </motion.div>

                {/* LOGO SATIRI */}
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                    {MEDIA_LOGOS.map((media, index) => (
                        <motion.a
                            key={media.id}
                            href={media.articleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredId(media.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="relative group flex flex-col items-center gap-2"
                        >
                            {/* LOGO KUTUSU */}
                            <div
                                className={`
                h-10 flex items-center px-4 rounded-sm
                transition-all duration-300
                ${hoveredId === media.id ? 'opacity-100 bg-white/10' : 'opacity-40 hover:opacity-70'}
              `}
                            >
                                <span className="text-white font-bold text-lg tracking-tight">
                                    {media.name}
                                </span>
                            </div>

                            {/* HOVER TOOLTIP: Makale başlığı */}
                            <AnimatePresence>
                                {hoveredId === media.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-[#C9A96E] text-white text-[11px] px-3 py-1.5 rounded-sm whitespace-nowrap z-10 font-medium"
                                    >
                                        {media.articleTitle}
                                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#C9A96E] rotate-45" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.a>
                    ))}
                </div>

                {/* ALINTI BÖLÜMÜ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center max-w-2xl mx-auto"
                >
                    <Quote className="w-8 h-8 text-[#C9A96E]/40 mx-auto mb-4" />
                    <p className="text-white/70 text-[15px] italic leading-relaxed">
                        &ldquo;MAISON, Türk mobilya sektöründe lüks ve erişilebilirliği bir arada sunan nadir markalardan biri.&rdquo;
                    </p>
                    <p className="text-[#C9A96E] text-[12px] mt-3 font-medium">
                        — Hürriyet Ev, Ocak 2026
                    </p>
                </motion.div>

                {/* SONSUZ KAYAN LOGO BANDI (mobil için) */}
                <div className="md:hidden mt-10 overflow-hidden -mx-6">
                    <motion.div
                        animate={{ x: [0, -600] }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        className="flex gap-10 whitespace-nowrap px-6"
                    >
                        {[...MEDIA_LOGOS, ...MEDIA_LOGOS].map((media, i) => (
                            <span
                                key={i}
                                aria-hidden={i >= MEDIA_LOGOS.length}
                                tabIndex={i >= MEDIA_LOGOS.length ? -1 : undefined}
                                className="text-white/30 font-bold text-base tracking-tight flex-shrink-0"
                            >
                                {media.name}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

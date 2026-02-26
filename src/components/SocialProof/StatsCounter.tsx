'use client';

import { motion } from 'framer-motion';
import { useCountUp } from './useCountUp';
import { STATS } from './socialProof.data';

function StatItem({
    stat,
    index,
}: {
    stat: (typeof STATS)[0];
    index: number;
}) {
    const { count, ref } = useCountUp({
        end: stat.value,
        duration: stat.duration,
        decimals: stat.decimals ?? 0,
    });

    const formattedCount =
        stat.decimals && stat.decimals > 0
            ? count.toFixed(stat.decimals)
            : new Intl.NumberFormat('tr-TR').format(Math.floor(count));

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex flex-col items-center text-center px-6 py-8 relative group"
        >
            {/* AYIRICI ÇİZGİ (son eleman hariç) */}
            {index < STATS.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-[#E8E3DC] hidden md:block" />
            )}

            {/* İKON */}
            <motion.span
                className="text-3xl mb-3 block"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
            >
                {stat.icon}
            </motion.span>

            {/* SAYAÇ */}
            <div className="flex items-end gap-0.5 mb-1">
                <span
                    ref={ref as React.RefObject<HTMLSpanElement>}
                    className="text-4xl md:text-5xl font-bold text-[#1C1C1E] leading-none tabular-nums"
                    style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                >
                    {formattedCount}
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#C9A96E] leading-none mb-0.5">
                    {stat.suffix}
                </span>
            </div>

            {/* LABEL */}
            <p className="text-[13px] text-[#666] font-medium tracking-wide uppercase mt-1">
                {stat.label}
            </p>

            {/* ALTI GOLD ÇİZGİ (hover'da görünür) */}
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#C9A96E] rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: 40 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
}

export default function StatsCounter() {
    return (
        <section className="py-16 bg-[#F5F0EB]">
            <div className="max-w-5xl mx-auto px-6">
                {/* BAŞLIK */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="text-[11px] text-[#C9A96E] tracking-[0.3em] uppercase font-medium mb-3">
                        Rakamlarla MAISON
                    </p>
                    <h2
                        className="text-2xl md:text-3xl font-bold text-[#1C1C1E]"
                        style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                    >
                        Binlerce Mutlu Müşteri
                    </h2>
                </motion.div>

                {/* SAYAÇLAR GRID */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0 bg-white rounded-sm border border-[#E8E3DC] shadow-sm overflow-hidden">
                    {STATS.map((stat, index) => (
                        <StatItem key={stat.id} stat={stat} index={index} />
                    ))}
                </div>

                {/* RATING YILDIZLARI */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col items-center mt-8 gap-2"
                >
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <motion.svg
                                key={star}
                                initial={{ scale: 0, rotate: -30 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.9 + star * 0.08, type: 'spring' }}
                                className="w-5 h-5"
                                viewBox="0 0 20 20"
                                fill={star <= 4 ? '#C9A96E' : 'url(#halfFillStats)'}
                            >
                                <defs>
                                    <linearGradient id="halfFillStats" x1="0" x2="1" y1="0" y2="0">
                                        <stop offset="80%" stopColor="#C9A96E" />
                                        <stop offset="80%" stopColor="#E8E3DC" />
                                    </linearGradient>
                                </defs>
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </motion.svg>
                        ))}
                    </div>
                    <p className="text-[12px] text-[#999]">
                        12.500+ müşteri değerlendirmesi üzerinden
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

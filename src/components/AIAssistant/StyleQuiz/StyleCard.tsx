'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { StyleProfile } from '../types/ai.types';

interface Props {
    profile: StyleProfile;
    secondaryPct?: number;
    secondaryName?: string;
}

export function StyleCard({ profile, secondaryPct, secondaryName }: Props) {
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
            {/* Hero section */}
            <div className="relative h-80 w-full">
                <Image
                    src={profile.heroImage}
                    alt={profile.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute bottom-10 left-10 right-10">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-3 py-1 bg-[#C9A96E] text-black text-[11px] font-bold tracking-widest uppercase rounded-full mb-4"
                    >
                        Sizin Stiliniz
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-serif italic text-white mb-2"
                    >
                        {profile.name}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/80 font-light"
                    >
                        {profile.tagline}
                    </motion.p>
                </div>
            </div>

            <div className="p-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Main analysis */}
                    <div>
                        <h3 className="text-lg font-serif text-[#1C1C1E] mb-4 border-b pb-2 border-gray-100 italic">
                            Karakteristik Analiz
                        </h3>
                        <p className="text-[#666] leading-relaxed mb-6 font-light">
                            {profile.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {profile.keywords.map((word) => (
                                <span
                                    key={word}
                                    className="px-4 py-1.5 bg-[#F5F0EB] text-[#1C1C1E] text-xs font-medium rounded-full border border-[#E8E3DC]"
                                >
                                    {word}
                                </span>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-bold tracking-wider uppercase text-[#999]">
                                Önerilen Renk Paleti
                            </h4>
                            <div className="flex gap-4">
                                {profile.colors.map((color) => (
                                    <div key={color.hex} className="group relative">
                                        <div
                                            className="w-10 h-10 rounded-full border border-gray-100 shadow-sm cursor-help transition-transform hover:scale-110"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1C1C1E] text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                            {color.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Secondary traits */}
                    <div className="bg-[#FAFAF8] p-8 rounded-2xl border border-gray-100">
                        {secondaryName && (
                            <div className="mb-8">
                                <h3 className="text-lg font-serif text-[#1C1C1E] mb-2 italic">
                                    İkincil Etki
                                </h3>
                                <p className="text-[#666] text-sm leading-relaxed">
                                    Ayrıca ruhunuzun <span className="text-[#C9A96E] font-bold">%{secondaryPct}</span> kadarı <span className="font-medium text-[#1C1C1E]">{secondaryName}</span> izleri taşıyor. Bu hibrit yapı yaşam alanınıza derinlik katacaktır.
                                </p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <h4 className="text-xs font-bold tracking-wider uppercase text-[#999]">
                                Önerilen Kategoriler
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                {profile.recommendedCategories.map((cat) => (
                                    <div key={cat} className="p-3 bg-white rounded-lg border border-gray-100 text-sm font-medium text-[#1C1C1E] flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-[#C9A96E] rounded-full" />
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-white rounded-xl border border-[#E8E3DC] border-dashed">
                            <p className="text-[11px] text-[#999] italic text-center">
                                * Bu analiz cevaplarınızdaki desenlere göre MAISON AI tarafından oluşturulmuştur.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

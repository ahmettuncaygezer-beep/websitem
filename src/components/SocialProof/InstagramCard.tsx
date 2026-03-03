'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ExternalLink, MapPin, Instagram } from 'lucide-react';
import type { InstagramPost } from './socialProof.data';

export default function InstagramCard({
    post,
    index,
}: {
    post: InstagramPost;
    index: number;
}) {
    const [isHovered, setIsHovered] = useState(false);

    // Masonry için değişken yükseklik
    const heights = ['h-64', 'h-72', 'h-56', 'h-80', 'h-64', 'h-72'];
    const height = heights[index % heights.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative ${height} rounded-sm overflow-hidden group`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* STRETCHED LINK TO INSTAGRAM (covers entire card) */}
            <a
                href="https://instagram.com/selismobilya"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label="Instagram'da gör"
            />

            {/* GÖRSEL */}
            <Image
                src={post.imageUrl}
                alt={post.caption}
                fill
                sizes="(max-width:768px) 50vw, 33vw"
                className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />

            {/* FALLBACK BG */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E8E3DC] to-[#D4C4B0] -z-10" />

            {/* HOVER OVERLAY */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col justify-between p-4 z-20 pointer-events-none"
                    >
                        {/* ÜSTTE KULLANICI */}
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#B8915A] flex items-center justify-center">
                                <Instagram className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-white text-[12px] font-medium">
                                @{post.username}
                            </span>
                        </div>

                        {/* ORTADA CAPTION */}
                        <div>
                            <p className="text-white text-[12px] leading-relaxed line-clamp-3 mb-2">
                                {post.caption}
                            </p>

                            {/* KONUM */}
                            {post.location && (
                                <div className="flex items-center gap-1 mb-3">
                                    <MapPin className="w-3 h-3 text-white/60" />
                                    <span className="text-white/60 text-[11px]">
                                        {post.location}
                                    </span>
                                </div>
                            )}

                            {/* BUTONLAR */}
                            <div className="flex gap-2 pointer-events-auto">
                                {/* BEĞENİ */}
                                <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1">
                                    <Heart className="w-3 h-3 text-[#C9A96E] fill-[#C9A96E]" />
                                    <span className="text-white text-[11px] font-medium">
                                        {new Intl.NumberFormat('tr-TR').format(post.likes)}
                                    </span>
                                </div>

                                {/* ÜRÜNE GİT */}
                                {post.productHref && (
                                    <Link
                                        href={post.productHref}
                                        className="flex items-center gap-1.5 bg-[#C9A96E] rounded-full px-3 py-1 hover:bg-[#B8915A] transition-colors relative z-30"
                                    >
                                        <ExternalLink className="w-3 h-3 text-white" />
                                        <span className="text-white text-[11px] font-semibold">
                                            {post.productName ?? 'Ürünü Gör'}
                                        </span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SABİT INSTAGRAM İKONU (hover değilken) */}
            {!isHovered && (
                <div className="absolute top-3 right-3 z-20">
                    <div className="w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                        <Instagram className="w-3.5 h-3.5 text-white" />
                    </div>
                </div>
            )}
        </motion.div>
    );
}

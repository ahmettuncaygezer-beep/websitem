'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';
import InstagramCard from './InstagramCard';
import { INSTAGRAM_POSTS } from './socialProof.data';
import { useGlobal } from '@/context/GlobalContext';

export default function InstagramFeed() {
    const [showAll, setShowAll] = useState(false);
    const { t } = useGlobal();
    const visible = showAll ? INSTAGRAM_POSTS : INSTAGRAM_POSTS.slice(0, 6);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* BAŞLIK */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
                >
                    <div>
                        <p className="text-[11px] text-[#C9A96E] tracking-[0.3em] uppercase font-medium mb-2">
                            {t('ig_badge') || '@SELISMOBILYA'}
                        </p>
                        <h2
                            className="text-2xl md:text-3xl font-bold text-[#1C1C1E]"
                            style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                        >
                            {t('ig_title') || 'Müşterilerimizin Evleri'}
                        </h2>
                        <p className="text-[13px] text-[#666] mt-2 max-w-md">
                            {t('ig_desc') || 'Siz de evinizi paylaşın, #selismobilya etiketiyle Instagram\'da görünün'}
                        </p>
                    </div>

                    {/* INSTAGRAM TAKİP BUTONU */}
                    <a
                        href="https://instagram.com/selismobilya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-5 py-2.5 border border-[#E8E3DC] rounded-sm text-[13px] font-medium text-[#1C1C1E] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors duration-200 self-start md:self-auto group"
                    >
                        <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        @selismobilya
                        <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                    </a>
                </motion.div>

                {/* MASONRY GRID */}
                <div className="columns-2 md:columns-3 gap-3 space-y-3">
                    {visible.map((post, index) => (
                        <div key={post.id} className="break-inside-avoid mb-3">
                            <InstagramCard post={post} index={index} />
                        </div>
                    ))}
                </div>

                {/* DAHA FAZLA BUTONU */}
                {!showAll && INSTAGRAM_POSTS.length > 6 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-10"
                    >
                        <button
                            onClick={() => setShowAll(true)}
                            className="px-8 py-3 border border-[#1C1C1E] text-[13px] font-semibold text-[#1C1C1E] hover:bg-[#1C1C1E] hover:text-white transition-all duration-300 rounded-sm"
                        >
                            <span>{t('insta_btn_more') || 'Daha Fazla Gör'}</span>
                        </button>
                    </motion.div>
                )}

                {/* HASHTAG PAYLAŞIM DAVETI */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-14 bg-[#F5F0EB] rounded-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
                >
                    <div>
                        <h3 className="font-bold text-[#1C1C1E] text-lg mb-1">
                            {t('ig_highlight_title') || 'Evinizi Bizimle Paylaşın'}
                        </h3>
                        <p className="text-[13px] text-[#666]">
                            {t('ig_highlight_desc') || 'SELIS mobilyalarınızı etiketleyin, sayfamızda öne çıkarılın ve $500 hediye çeki kazanın.'}
                        </p>
                    </div>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C9A96E] to-[#B8915A] text-white text-[13px] font-semibold rounded-sm hover:opacity-90 transition-opacity"
                    >
                        <Instagram className="w-4 h-4" />
                        #selismobilya
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Download, Share2, ArrowRight } from 'lucide-react';
import { StyleCard } from './StyleCard';
import { RecommendedProducts } from './RecommendedProducts';
import ReactMarkdown from 'react-markdown';
import type { StylePoints, StyleProfile } from '../types/ai.types';

interface Props {
    scores: StylePoints;
    distribution: { id: string; pts: number; pct: number }[];
    primaryStyle: StyleProfile;
    secondaryStyle?: StyleProfile;
    aiAnalysis: string;
    isAnalyzing: boolean;
    onShare: () => void;
    onDownload: () => void;
}

export function QuizResult({
    scores,
    distribution,
    primaryStyle,
    secondaryStyle,
    aiAnalysis,
    isAnalyzing,
    onShare,
    onDownload
}: Props) {
    const resultRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Confetti effect
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#C9A96E', '#F5F0EB', '#1C1C1E', '#FFFFFF']
            }));
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#C9A96E', '#F5F0EB', '#1C1C1E', '#FFFFFF']
            }));
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={resultRef} className="pb-20">
            <div className="max-w-5xl mx-auto px-6">
                {/* Style Card */}
                <StyleCard
                    profile={primaryStyle}
                    secondaryPct={distribution[1]?.pct}
                    secondaryName={secondaryStyle?.name}
                />

                {/* Distribution Chart */}
                <div className="mt-12 bg-white rounded-3xl p-10 shadow-xl shadow-black/5 border border-gray-100">
                    <h3 className="text-xl font-serif text-[#1C1C1E] mb-8 italic">
                        Stil Dağılım Grafiğiniz
                    </h3>
                    <div className="space-y-6">
                        {distribution.map((item, i) => (
                            <div key={item.id} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold tracking-widest uppercase">
                                    <span className={i === 0 ? 'text-[#C9A96E]' : 'text-[#666]'}>
                                        {item.id}
                                    </span>
                                    <span className="text-[#1C1C1E]">
                                        %{item.pct}
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-[#F5F0EB] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.pct}%` }}
                                        transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                                        className={`h-full rounded-full ${i === 0
                                                ? 'bg-gradient-to-r from-[#C9A96E] to-[#B8915A]'
                                                : 'bg-gray-300'
                                            }`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Analysis */}
                <div className="mt-12 bg-[#1C1C1E] rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Sparkles size={120} color="#C9A96E" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[#C9A96E] flex items-center justify-center">
                                <Sparkles size={20} color="#1C1C1E" />
                            </div>
                            <h3 className="text-xl font-serif italic">MAISON AI Kişisel Analizi</h3>
                        </div>

                        <div className="prose prose-invert max-w-none text-white/80 leading-relaxed font-light">
                            {isAnalyzing ? (
                                <div className="space-y-4">
                                    <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" />
                                    <div className="h-4 bg-white/10 rounded w-full animate-pulse" />
                                    <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse" />
                                </div>
                            ) : (
                                <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
                            )}
                            {isAnalyzing && <span className="inline-block animate-pulse ml-1">▋</span>}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={onDownload}
                        className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#1C1C1E] text-[#1C1C1E] text-sm font-bold tracking-widest uppercase rounded-full hover:bg-[#1C1C1E] hover:text-white transition-all duration-300"
                    >
                        <Download size={18} /> Raporu İndir
                    </button>
                    <button
                        onClick={onShare}
                        className="flex items-center gap-2 px-8 py-4 bg-[#C9A96E] text-[#1C1C1E] text-sm font-bold tracking-widest uppercase rounded-full hover:bg-[#B8915A] transition-all duration-300 shadow-lg shadow-[#C9A96E]/20"
                    >
                        <Share2 size={18} /> Sonucu Paylaş
                    </button>
                </div>
            </div>

            {/* Recommended Products */}
            <div className="mt-20 bg-[#F5F0EB]/50">
                <RecommendedProducts products={primaryStyle.products} />
            </div>

            {/* Bottom CTA to Chat */}
            <div className="max-w-3xl mx-auto mt-20 px-6 text-center">
                <div className="p-10 bg-white rounded-3xl border border-gray-100 shadow-xl">
                    <h3 className="text-2xl font-serif text-[#1C1C1E] mb-4 italic">
                        Aklınızda bir soru mu var?
                    </h3>
                    <p className="text-[#666] mb-8 font-light leading-relaxed">
                        Stilinizle uyumlu ürünleri nasıl kombinleyebileceğinizi veya merak ettiğiniz detayları dijital danışmanımıza sorabilirsiniz.
                    </p>
                    <button
                        onClick={() => (window as any).MaisonChat?.open()}
                        className="inline-flex items-center gap-3 text-[#C9A96E] font-bold text-sm tracking-widest uppercase border-b-2 border-[#C9A96E] pb-1 hover:text-[#1C1C1E] hover:border-[#1C1C1E] transition-all duration-300"
                    >
                        Danışmanla Sohbeti Başlat <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}

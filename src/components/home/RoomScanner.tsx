'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Maximize, Loader2, CheckCircle2, Scan, Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function RoomScanner() {
    const [status, setStatus] = useState<'idle' | 'scanning' | 'analyzing' | 'completed'>('idle');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (status === 'scanning') {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setStatus('analyzing');
                        return 100;
                    }
                    return prev + 2;
                });
            }, 50);
            return () => clearInterval(interval);
        }

        if (status === 'analyzing') {
            const timer = setTimeout(() => {
                setStatus('completed');
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [status]);

    return (
        <section className="py-24 bg-charcoal overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />

            <div className="container-premium relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Visualizer Side */}
                    <div className="relative group">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="aspect-[4/5] md:aspect-square bg-black rounded-[3rem] overflow-hidden relative border border-white/10"
                        >
                            <Image
                                src="/images/rooms/living-room-scanner.jpg"
                                alt="Living room scan"
                                fill
                                className={`object-cover transition-all duration-1000 ${status === 'scanning' || status === 'analyzing' ? 'grayscale opacity-50 scale-105' : 'opacity-80'
                                    }`}
                            />

                            {/* Scan Line Overlay */}
                            <AnimatePresence>
                                {status === 'scanning' && (
                                    <motion.div
                                        initial={{ top: '0%' }}
                                        animate={{ top: '100%' }}
                                        exit={{ opacity: 0 }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                        className="absolute left-0 right-0 h-1 bg-gold shadow-[0_0_20px_rgba(212,175,55,0.8)] z-20"
                                    />
                                )}
                            </AnimatePresence>

                            {/* AR Points */}
                            <AnimatePresence>
                                {(status === 'analyzing' || status === 'completed') && (
                                    <div className="absolute inset-0">
                                        {[
                                            { top: '30%', left: '40%', label: 'Alan: 12.4m²' },
                                            { top: '60%', left: '70%', label: 'Işık: İyi (Kuzey)' },
                                            { top: '45%', left: '20%', label: 'Zemin: Meşe' },
                                        ].map((pt, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: i * 0.3 }}
                                                className="absolute z-20"
                                                style={{ top: pt.top, left: pt.left }}
                                            >
                                                <div className="w-4 h-4 rounded-full bg-gold animate-pulse mb-2 shadow-[0_0_10px_#D4AF37]" />
                                                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                                                    <span className="text-[10px] text-white font-sans font-bold uppercase tracking-widest">{pt.label}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>

                            {/* Center UI */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                <AnimatePresence mode="wait">
                                    {status === 'idle' && (
                                        <motion.button
                                            key="idle"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setStatus('scanning')}
                                            className="group relative"
                                        >
                                            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 group-hover:bg-gold transition-all duration-500">
                                                <Camera className="text-white" size={32} />
                                            </div>
                                            <p className="text-white font-serif text-xl mb-1">Odanı Tara</p>
                                            <p className="text-white/60 text-xs font-sans uppercase tracking-[0.2em]">Yapay Zeka Mimarı</p>
                                        </motion.button>
                                    )}

                                    {status === 'scanning' && (
                                        <motion.div
                                            key="scanning"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full max-w-xs"
                                        >
                                            <div className="flex items-center justify-center gap-3 mb-6">
                                                <Loader2 className="animate-spin text-gold" size={24} />
                                                <span className="text-white font-sans font-bold uppercase tracking-widest text-xs">Alan Analiz Ediliyor...</span>
                                            </div>
                                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gold"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {status === 'analyzing' && (
                                        <motion.div
                                            key="analyzing"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <Sparkles className="text-gold mx-auto mb-4 animate-bounce" size={40} />
                                            <p className="text-white font-serif text-2xl">Tarz Eşleşmesi Bulundu</p>
                                            <p className="text-white/60 text-xs font-sans uppercase tracking-widest mt-2">Kişiye Özel Katalog Hazırlanıyor</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Corner HUD */}
                            <div className="absolute top-8 left-8 flex gap-3 z-30">
                                <div className="p-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
                                    <Scan size={16} className="text-gold" />
                                </div>
                                <div className="p-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
                                    <Maximize size={16} className="text-white" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold mb-8">
                            <Sparkles size={16} />
                            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em]">Yeni Nesil Deneyim</span>
                        </div>

                        <h2 className="text-display-md text-white font-serif mb-8">
                            Eviniz İçin <br />
                            <span className="italic text-warm-gray-light">Yapay Zeka</span> Asistanı
                        </h2>

                        <p className="text-lg text-white/70 font-sans leading-relaxed mb-12">
                            Telefonunuzun kamerasıyla odanızı tarayın, yapay zekamız yaşam alanınızın boyutlarını, ışık miktarını ve mevcut tarzını analiz ederek size %100 uyumlu parçaları saniyeler içinde önersin.
                        </p>

                        <div className="space-y-6 mb-12">
                            {[
                                { icon: SlidersHorizontal, title: 'Otomatik Ölçü Analizi', desc: 'Mobilyaların alanınıza sığıp sığmayacağını test edin.' },
                                { icon: CheckCircle2, title: 'Işık ve Renk Uyumu', desc: 'Kumaş tonlarının odanızın ışığında nasıl görüneceğini simüle edin.' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                                        <item.icon size={20} className="text-gold" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-sans font-bold text-sm tracking-wide uppercase mb-1">{item.title}</h4>
                                        <p className="text-white/50 text-xs font-sans">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="group flex items-center gap-3 text-sm font-sans font-bold uppercase tracking-[0.2em] text-white hover:text-gold transition-colors">
                            HEMEN TEST ET
                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold transition-all">
                                <ArrowRight size={18} className="group-hover:text-white" />
                            </div>
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

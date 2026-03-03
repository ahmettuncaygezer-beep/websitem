'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('[SELIS Error]', error);
    }, [error]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#FAFAF8] dark:bg-[#0D0D0F] py-20 px-6">
            <div className="max-w-xl text-center">
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                    className="w-20 h-20 bg-[#C9A96E]/10 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                    <AlertTriangle size={36} className="text-[#C9A96E]" strokeWidth={1.5} />
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <h1 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] dark:text-[#F5F0EB] mb-4">
                        Beklenmedik Bir Hata
                    </h1>
                    <p className="text-base font-sans text-[#6B6560] dark:text-[#8E8E93] mb-10 max-w-md mx-auto leading-relaxed">
                        Bir şeyler ters gitti. Sorun geçici olabilir — lütfen tekrar deneyin
                        veya ana sayfaya dönün.
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button
                        onClick={reset}
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1C1C1E] dark:bg-[#C9A96E] text-white dark:text-[#0D0D0F] text-xs font-sans font-bold uppercase tracking-widest rounded-2xl hover:bg-black dark:hover:bg-[#B8915A] transition-all duration-300"
                    >
                        <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                        Tekrar Dene
                    </button>
                    <Link
                        href="/"
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-[#1C1C1E] border border-[#E8E2DB] dark:border-[#2C2C2E] text-[#1C1C1E] dark:text-[#F5F0EB] text-xs font-sans font-bold uppercase tracking-widest rounded-2xl hover:bg-[#FAF8F5] dark:hover:bg-[#2C2C2E] transition-all duration-300"
                    >
                        <Home size={16} />
                        Ana Sayfaya Dön
                    </Link>
                </motion.div>

                {/* Error digest (for debugging) */}
                {error.digest && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-12 text-[11px] font-mono text-[#9C9590] dark:text-[#636366]"
                    >
                        Hata Kodu: {error.digest}
                    </motion.p>
                )}
            </div>
        </div>
    );
}

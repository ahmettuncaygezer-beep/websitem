'use client';

import { useReducedMotion, useScroll, useTransform, motion } from 'framer-motion';

export function ScrollIndicator() {
    const prefersReduced = useReducedMotion();

    // Fade + slide out when user scrolls past 100 px
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 100], [0.7, 0]);
    const translateY = useTransform(scrollY, [0, 100], [0, prefersReduced ? 0 : 10]);

    const handleClick = () => {
        document.querySelector('#categories')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <motion.button
            onClick={handleClick}
            aria-label="Aşağı kaydır"
            // Orchestration: appears at 2.0 s
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 2.0, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20
                 flex flex-col items-center gap-0
                 cursor-pointer select-none
                 hover:opacity-100 transition-opacity duration-300"
            style={{ opacity, y: translateY }}
        >
            {/* ── Option A: Mouse / scroll icon ── */}
            <div
                className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
                style={{ border: '2px solid rgba(255,255,255,0.4)' }}
            >
                <span
                    className="w-1 h-1.5 rounded-full bg-white block"
                    style={{ animation: 'scrollDot 1.5s ease-in-out infinite' }}
                />
            </div>

            {/* Label */}
            <span
                className="mt-3 uppercase tracking-[0.25em] text-white/50"
                style={{ fontSize: '10px' }}
                data-lang-key="common_discover"
            >
                Keşfet
            </span>
        </motion.button>
    );
}

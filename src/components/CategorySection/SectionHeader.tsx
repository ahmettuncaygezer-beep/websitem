'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function SectionHeader() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const reduceMotion = useReducedMotion();

    const baseAnim = reduceMotion
        ? { initial: { opacity: 0 }, animate: isInView ? { opacity: 1 } : {} }
        : null;

    return (
        <div ref={ref} className="text-center mb-12 md:mb-16">
            {/* ① Mini label */}
            <motion.div
                className="flex items-center justify-center gap-3 mb-3"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <span
                    className="block h-px"
                    style={{ width: 24, background: '#C9A96E' }}
                    aria-hidden="true"
                />
                <span
                    className="uppercase font-medium"
                    style={{
                        fontSize: '11px',
                        letterSpacing: '0.35em',
                        color: '#C9A96E',
                    }}
                    data-lang-key="cat_badge"
                >
                    Yaşam Alanlarınız
                </span>
                <span
                    className="block h-px"
                    style={{ width: 24, background: '#C9A96E' }}
                    aria-hidden="true"
                />
            </motion.div>

            {/* ② Ana başlık */}
            <motion.h2
                id="categories-heading"
                className="mt-3"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease }}
                style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    fontWeight: 400,
                    lineHeight: 1.2,
                    color: '#1C1C1E',
                }}
            >
                <span className="text-2xl md:text-3xl lg:text-4xl" data-lang-key="cat_title_1">
                    Yaşam Alanınızı{' '}
                </span>
                <em
                    className="text-2xl md:text-3xl lg:text-4xl"
                    style={{ fontStyle: 'italic', color: '#C9A96E' }}
                    data-lang-key="cat_title_2"
                >
                    Keşfedin
                </em>
            </motion.h2>

            {/* ③ Alt açıklama */}
            <motion.p
                className="mt-4 text-sm leading-relaxed max-w-sm mx-auto"
                style={{ color: 'rgba(28,28,30,0.6)' }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                data-lang-key="cat_desc"
            >
                Her odanız için titizlikle seçilmiş, zamansız parçalar.
            </motion.p>

            {/* ④ Dekoratif ayraç */}
            <motion.div
                className="mt-6 flex items-center justify-center gap-3 mx-auto select-none"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.55 }}
                aria-hidden="true"
            >
                <span
                    className="block h-px flex-1 max-w-[40px]"
                    style={{ background: '#C9A96E', opacity: 0.5 }}
                />
                <span style={{ color: '#C9A96E', fontSize: '12px' }}>◆</span>
                <span
                    className="block h-px flex-1 max-w-[40px]"
                    style={{ background: '#C9A96E', opacity: 0.5 }}
                />
            </motion.div>
        </div>
    );
}

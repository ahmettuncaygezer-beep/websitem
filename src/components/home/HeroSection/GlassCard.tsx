'use client';

import { useReducedMotion, motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TypewriterText } from './TypewriterText';

// Custom easing matching the spec's cubic bezier
const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function GlassCard() {
    const prefersReduced = useReducedMotion();

    // When reduced motion: only opacity, no translate/scale
    const cardVariants = {
        hidden: { opacity: 0, scale: prefersReduced ? 1 : 0.96 },
        show: {
            opacity: 1, scale: 1,
            transition: { duration: 0.6, delay: 0.2, ease }
        },
    };

    const fromLeft = {
        hidden: { opacity: 0, x: prefersReduced ? 0 : -20 },
        show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.4 } },
    };

    const fromBottom = (delay: number) => ({
        hidden: { opacity: 0, y: prefersReduced ? 0 : 30 },
        show: {
            opacity: 1, y: 0,
            transition: { duration: 0.7, delay, ease }
        },
    });

    const fadeIn = (delay: number) => ({
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.6, delay } },
    });

    return (
        /* ── Positioning wrapper ──
           Desktop ≥1280: centred (or you can swap to left-1/4 for left-third)
           Tablet  768-1279: centred, max-w-lg
           Mobile  <768: 88% width, centred */
        <div
            className="
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20
        w-[88%]
        max-w-sm
        md:max-w-lg
        xl:max-w-2xl
      "
        >
            {/* ── Glass shell ── */}
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="show"
                className="relative overflow-hidden
                   px-7 py-8
                   md:px-10 md:py-10
                   xl:px-16 xl:py-14"
                style={{
                    borderRadius: '2px',
                    background: 'rgba(255, 255, 255, 0.07)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow:
                        '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                }}
            >
                {/* ① Etiket — 0.4 s */}
                <motion.div
                    variants={fromLeft}
                    initial="hidden"
                    animate="show"
                    className="flex items-center gap-3 mb-5"
                >
                    <span
                        className="block h-px w-8 shrink-0"
                        style={{ background: '#C9A96E' }}
                    />
                    <span
                        className="font-medium uppercase"
                        style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#C9A96E' }}
                        data-lang-key="hero_badge"
                    >
                        2026 Koleksiyonu
                    </span>
                </motion.div>

                {/* ② H1 — 0.7 s; typewriter starts at 0.9 s (built into TypewriterText) */}
                <motion.h1
                    variants={fromBottom(0.7)}
                    initial="hidden"
                    animate="show"
                    className="font-serif
                     text-[1.75rem] leading-[1.15]
                     md:text-4xl
                     xl:text-5xl
                     mb-5"
                    style={{ letterSpacing: '-0.02em' }}
                >
                    <TypewriterText typeStartDelay={900} />
                </motion.h1>

                {/* ③ Description — 1.4 s */}
                <motion.p
                    variants={fromBottom(1.4)}
                    initial="hidden"
                    animate="show"
                    className="text-sm leading-relaxed max-w-xs mb-8"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                    data-lang-key="hero_desc"
                >
                    Doğal malzemeler, zamansız tasarımlar ve el işçiliği ile
                    yaşam alanlarınıza sofistike bir dokunuş.
                </motion.p>

                {/* ④ Buttons — 1.7 s, stagger 150 ms */}
                <motion.div
                    variants={fadeIn(1.7)}
                    initial="hidden"
                    animate="show"
                    // Mobile: stacked — Tablet+: side by side
                    className="flex flex-col sm:flex-row gap-3"
                >
                    <PrimaryButton href="/kategori/oturma-odasi" delay={1.7}>
                        <span data-lang-key="hero_cta_1">Koleksiyonu Keşfet</span>
                    </PrimaryButton>
                    <GhostButton href="/lookbook" delay={1.85}>
                        <span data-lang-key="hero_cta_2">Lookbook</span>
                    </GhostButton>
                </motion.div>

                {/* ⑤ Micro trust strip — 2.0 s */}
                <motion.p
                    variants={fadeIn(2.0)}
                    initial="hidden"
                    animate="show"
                    className="mt-6 uppercase tracking-wider font-medium"
                    style={{ fontSize: '10px', color: 'var(--maison-gold)', opacity: 0.8 }}
                    data-lang-key="hero_trust"
                >
                    ✓ Ücretsiz Kargo&nbsp;&nbsp;·&nbsp;&nbsp;✓ 5 Yıl Garanti&nbsp;&nbsp;·&nbsp;&nbsp;✓ 30 Gün İade
                </motion.p>

                {/* Inner radial glow highlight */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)',
                    }}
                />
            </motion.div>
        </div>
    );
}

/* ─── Button sub-components ─── */

function PrimaryButton({
    href,
    children,
    delay,
}: {
    href: string;
    children: React.ReactNode;
    delay: number;
}) {
    const prefersReduced = useReducedMotion();

    return (
        <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Link
                href={href}
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2
                   font-semibold text-sm"
                style={{
                    background: 'var(--maison-gold)',
                    color: '#000',
                    padding: '13px 28px',
                    letterSpacing: '0.03em',
                    borderRadius: '4px',
                    border: '1px solid transparent',
                    transition: 'all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                    Object.assign((e.currentTarget as HTMLElement).style, {
                        background: 'var(--maison-gold-dark)',
                        transform: 'translateY(-3px)',
                        boxShadow: 'var(--shadow-maison-gold)',
                    });
                }}
                onMouseLeave={(e) => {
                    Object.assign((e.currentTarget as HTMLElement).style, {
                        background: 'var(--maison-gold)',
                        transform: 'translateY(0)',
                        boxShadow: 'none',
                    });
                }}
            >
                <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                />
                {children}
            </Link>
        </motion.div>
    );
}

function GhostButton({
    href,
    children,
    delay,
}: {
    href: string;
    children: React.ReactNode;
    delay: number;
}) {
    const prefersReduced = useReducedMotion();

    return (
        <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Link
                href={href}
                className="inline-flex w-full sm:w-auto items-center justify-center text-white text-sm"
                style={{
                    background: 'transparent',
                    color: '#ffffff',
                    padding: '13px 28px',
                    letterSpacing: '0.03em',
                    borderRadius: '2px',
                    border: '1px solid rgba(255,255,255,0.4)',
                    transition: 'all 250ms ease',
                    textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                    Object.assign((e.currentTarget as HTMLElement).style, {
                        background: 'rgba(255,255,255,0.1)',
                        borderColor: 'rgba(255,255,255,0.8)',
                    });
                }}
                onMouseLeave={(e) => {
                    Object.assign((e.currentTarget as HTMLElement).style, {
                        background: 'transparent',
                        borderColor: 'rgba(255,255,255,0.4)',
                    });
                }}
            >
                {children}
            </Link>
        </motion.div>
    );
}

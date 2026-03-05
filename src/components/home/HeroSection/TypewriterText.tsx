'use client';

import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useGlobal } from '@/context/GlobalContext';

// ─── Hook ────────────────────────────────────────────────────────────────────

function useTypewriter(
    texts: string[],
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseAfterType = 3000,
    startDelay = 0,       // ms before first character
) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [started, setStarted] = useState(false);
    const [phase, setPhase] = useState<'idle' | 'typing' | 'pause' | 'deleting' | 'next'>('idle');
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Honour startDelay — kick off typing after x ms
    useEffect(() => {
        const t = setTimeout(() => {
            setStarted(true);
            setPhase('typing');
            setIsTyping(true);
        }, startDelay);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!started || phase === 'idle') return;

        const target = texts[currentIndex] ?? '';
        const clear = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };

        if (phase === 'typing') {
            if (displayText.length < target.length) {
                timeoutRef.current = setTimeout(() => {
                    setDisplayText(target.slice(0, displayText.length + 1));
                }, typingSpeed);
            } else {
                // Fully typed
                if (texts.length <= 1) {
                    setIsTyping(false);
                    setPhase('idle'); // Just idle permanently if only 1 text
                } else {
                    // Pause then delete
                    timeoutRef.current = setTimeout(() => {
                        setIsTyping(false);
                        setPhase('pause');
                    }, pauseAfterType);
                }
            }
        }

        if (phase === 'pause') {
            timeoutRef.current = setTimeout(() => setPhase('deleting'), 0);
        }

        if (phase === 'deleting') {
            if (displayText.length > 0) {
                timeoutRef.current = setTimeout(() => {
                    setDisplayText((p) => p.slice(0, -1));
                }, deletingSpeed);
            } else {
                setPhase('next');
            }
        }

        if (phase === 'next') {
            setCurrentIndex((p) => (p + 1) % texts.length);
            setIsTyping(true);
            setPhase('typing');
        }

        return clear;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayText, phase, started, currentIndex]);

    return { displayText, isTyping };
}


// ─── Component ───────────────────────────────────────────────────────────────

interface TypewriterTextProps {
    /** Milliseconds to wait before the first character types (orchestration) */
    typeStartDelay?: number;
    className?: string;
    customTexts?: string[];
}

export function TypewriterText({
    typeStartDelay = 0,
    className = '',
    customTexts,
}: TypewriterTextProps) {
    const prefersReduced = useReducedMotion();
    const { t } = useGlobal();

    // Ensure we always have an array of texts to type.
    // If CMS only provides 1 text, we add our default meaningful texts so the typing effect continues.
    const defaultTexts = [
        t('hero_type_1') === 'Yeni Hikayesi' ? 'Yeni Hikayesi' : t('hero_type_1') || 'Yeni Hikayesi',
        t('hero_type_2') === 'Hayalinizdeki Salon' ? 'Hayalinizdeki Salonu' : t('hero_type_2') || 'Hayalinizdeki Salonu',
        t('hero_type_3') === 'Mükemmel Uyku Deneyimi' ? 'Huzuru' : t('hero_type_3') || 'Huzuru',
        t('hero_type_4') === 'Sofistike Yemek Odaları' ? 'Zarafeti' : t('hero_type_4') || 'Zarafeti',
    ];

    let texts = customTexts && customTexts.length > 0 ? customTexts : defaultTexts;
    // If only 1 custom text is provided, add defaults so the loop works
    if (texts.length === 1) {
        texts = [texts[0], ...defaultTexts.slice(1)];
    }

    const { displayText, isTyping } = useTypewriter(texts, 80, 40, 3000, typeStartDelay);

    // Cursor fades out 2 s after typing completes each cycle
    const [cursorVisible, setCursorVisible] = useState(false);
    useEffect(() => {
        if (isTyping) {
            setCursorVisible(true);
        } else {
            const t = setTimeout(() => setCursorVisible(false), 2000);
            return () => clearTimeout(t);
        }
    }, [isTyping]);

    // With reduced motion: just show the first text immediately, no animation
    if (prefersReduced) {
        return (
            <span className={className}>
                <span className="block text-white not-italic mb-1 md:mb-2" data-lang-key="hero_intro">
                    {t('hero_intro') || 'Evinizin'}
                </span>
                <span className="block min-h-[1.2em]">
                    <span
                        className="inline-block italic whitespace-nowrap"
                        style={{
                            fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
                            color: '#C9A96E',
                        }}
                    >
                        {texts[0]}
                    </span>
                </span>
            </span>
        );
    }

    return (
        <span className={className}>
            {/* Line 1 — always static */}
            <span className="block text-white not-italic mb-1 md:mb-2" data-lang-key="hero_intro">
                {t('hero_intro') || 'Evinizin'}
            </span>
            <span className="block min-h-[1.2em]">
                <span
                    className="inline-block italic whitespace-nowrap"
                    style={{
                        fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
                        color: '#C9A96E',
                    }}
                >
                    {displayText}

                    {/* Blinking cursor — blinks while typing, fades 2s after done */}
                    <span
                        aria-hidden="true"
                        className="inline-block w-[2px] ml-[2px] align-baseline bg-[#C9A96E]"
                        style={{
                            height: '0.85em',
                            opacity: cursorVisible ? 1 : 0,
                            transition: 'opacity 500ms ease',
                            animation: isTyping ? 'twBlink 1s step-end infinite' : 'none',
                        }}
                    />
                </span>
            </span>
        </span>
    );
}

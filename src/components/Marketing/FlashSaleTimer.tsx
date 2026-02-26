'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TimeLeft {
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
}

interface FlashSaleTimerProps {
    endDate: Date;
    compact?: boolean; // ürün sayfası küçük versiyonu
    onExpire?: () => void;
}

function calculateTimeLeft(endDate: Date): TimeLeft {
    const total = Math.max(0, endDate.getTime() - Date.now());
    const hours = Math.floor(total / (1000 * 60 * 60));
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((total % (1000 * 60)) / 1000);
    return { hours, minutes, seconds, total };
}

function FlipDigit({ value, label, urgent }: { value: string; label: string; urgent: boolean }) {
    const shouldReduceMotion = useReducedMotion();
    const prevValue = useRef(value);
    const [flip, setFlip] = useState(false);

    useEffect(() => {
        if (prevValue.current !== value) {
            setFlip(true);
            const t = setTimeout(() => setFlip(false), 300);
            prevValue.current = value;
            return () => clearTimeout(t);
        }
    }, [value]);

    return (
        <div className="flex flex-col items-center gap-1">
            <div
                className={`
          relative w-14 h-16 flex items-center justify-center
          rounded-sm overflow-hidden
          ${urgent ? 'bg-[#C0392B]' : 'bg-[#2C2C2E]'}
          transition-colors duration-500
        `}
                style={{ perspective: '200px' }}
            >
                <motion.span
                    key={value}
                    initial={shouldReduceMotion ? { opacity: 0 } : { rotateX: -90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="text-3xl font-bold text-white tabular-nums select-none"
                    style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                >
                    {value}
                </motion.span>
                {/* Flip line */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-black/20" />
            </div>
            <span className="text-[9px] text-white/50 uppercase tracking-widest font-medium">
                {label}
            </span>
        </div>
    );
}

function Colon({ urgent, blink }: { urgent: boolean; blink: boolean }) {
    return (
        <motion.span
            animate={{ opacity: blink ? 0.2 : 1 }}
            transition={{ duration: 0.4 }}
            className={`text-2xl font-bold mb-4 select-none transition-colors duration-500 ${urgent ? 'text-[#E53935]' : 'text-[#C9A96E]'}`}
        >
            :
        </motion.span>
    );
}

/* ─── Compact (Ürün sayfası) ───────────────────────────── */
function CompactTimer({ timeLeft, isExpired }: { timeLeft: TimeLeft; isExpired: boolean }) {
    if (isExpired) return null;
    const pad = (n: number) => String(n).padStart(2, '0');
    const timeStr = `${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`;

    return (
        <div className="inline-flex items-center gap-2 bg-[#E53935] text-white text-[12px] font-semibold px-3 py-1.5 rounded-sm">
            <span>⚡ Bu fiyat biter:</span>
            <span className="tabular-nums font-bold tracking-wider">{timeStr}</span>
            <span className="opacity-70 text-[10px] font-normal border-l border-white/30 pl-2">
                Sınırlı süre
            </span>
        </div>
    );
}

/* ─── Main export ──────────────────────────────────────── */
export default function FlashSaleTimer({ endDate, compact = false, onExpire }: FlashSaleTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(endDate));
    const [blink, setBlink] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const isExpired = timeLeft.total <= 0;
    const isUrgent = timeLeft.total <= 10 * 60 * 1000; // son 10 dakika
    const isPulse = timeLeft.total <= 60 * 1000; // son 60 saniye

    useEffect(() => {
        if (isExpired) {
            onExpire?.();
            return;
        }
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft(endDate));
            setBlink(b => !b);
        }, 1000);
        return () => clearInterval(interval);
    }, [endDate, isExpired, onExpire]);

    const pad = (n: number) => String(n).padStart(2, '0');

    if (compact) {
        return <CompactTimer timeLeft={timeLeft} isExpired={isExpired} />;
    }

    if (isExpired) {
        return (
            <div className="flex items-center justify-center gap-2 text-white/60 text-sm py-2">
                <span>Kampanya Sona Erdi</span>
            </div>
        );
    }

    return (
        <motion.div
            animate={
                isUrgent && !shouldReduceMotion
                    ? { x: [0, -2, 2, -2, 2, 0] }
                    : { x: 0 }
            }
            transition={isUrgent ? { duration: 0.5, repeat: Infinity, repeatDelay: 2 } : {}}
            className="flex items-center gap-1"
        >
            {/* Pulse overlay for last 60s */}
            {isPulse && (
                <motion.div
                    className="absolute inset-0 bg-[#E53935]/10 pointer-events-none"
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            )}
            <FlipDigit value={pad(timeLeft.hours)} label="SAAT" urgent={isUrgent} />
            <Colon urgent={isUrgent} blink={blink} />
            <FlipDigit value={pad(timeLeft.minutes)} label="DAKİKA" urgent={isUrgent} />
            <Colon urgent={isUrgent} blink={blink} />
            <FlipDigit value={pad(timeLeft.seconds)} label="SANİYE" urgent={isUrgent} />
        </motion.div>
    );
}

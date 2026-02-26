'use client';

import React, { useState, useEffect } from 'react';

interface FlashSaleTimerProps {
    endDate: string;
    onExpire?: () => void;
    variant?: 'large' | 'small';
}

export function FlashSaleTimer({ endDate, onExpire, variant = 'small' }: FlashSaleTimerProps) {
    const [timeLeft, setTimeLeft] = useState<{ d: string, h: string, m: string, s: string } | null>(null);

    useEffect(() => {
        const target = new Date(endDate).getTime();

        const calculate = () => {
            const now = new Date().getTime();
            const diff = target - now;

            if (diff <= 0) {
                setTimeLeft(null);
                onExpire?.();
                return false;
            }

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({
                d: d.toString().padStart(2, '0'),
                h: h.toString().padStart(2, '0'),
                m: m.toString().padStart(2, '0'),
                s: s.toString().padStart(2, '0')
            });
            return true;
        };

        if (calculate()) {
            const interval = setInterval(calculate, 1000);
            return () => clearInterval(interval);
        }
    }, [endDate, onExpire]);

    if (!timeLeft) {
        return <span style={{ color: '#FF453A', fontSize: '13px', fontWeight: 600 }}>Sona Erdi</span>;
    }

    const Box = ({ val }: { val: string }) => (
        <div style={{
            background: 'rgba(255,69,58,0.12)', border: '1px solid rgba(255,69,58,0.2)',
            borderRadius: '4px', padding: variant === 'large' ? '6px 10px' : '4px 8px',
            fontSize: variant === 'large' ? '20px' : '16px', fontWeight: 700,
            fontFamily: "'JetBrains Mono', monospace", color: '#FF453A', fontVariantNumeric: 'tabular-nums'
        }}>
            {val}
        </div>
    );

    const Separator = () => <span style={{ color: '#636366', fontWeight: 700 }}>:</span>;

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Box val={timeLeft.d} />
            <Separator />
            <Box val={timeLeft.h} />
            <Separator />
            <Box val={timeLeft.m} />
            <Separator />
            <Box val={timeLeft.s} />
        </div>
    );
}

'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OtpInputProps {
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
}

export function OtpInput({ value, onChange, error }: OtpInputProps) {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const val = e.target.value;
        if (!/^\d*$/.test(val)) return;

        const newValue = value.split('');
        newValue[index] = val.slice(-1);
        const code = newValue.join('');
        onChange(code);

        // Move to next input
        if (val && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const data = e.clipboardData.getData('text').slice(0, 6);
        if (/^\d+$/.test(data)) {
            onChange(data);
            inputRefs.current[Math.min(data.length, 5)]?.focus();
        }
    };

    return (
        <div className="flex justify-between gap-3" onPaste={handlePaste}>
            {Array.from({ length: 6 }).map((_, i) => (
                <motion.input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[i] || ''}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className={`w-12 h-16 bg-[#242426] border rounded-sm text-center text-2xl font-mono text-[#F5F0EB] outline-none transition-all ${error
                        ? 'border-[#FF453A] animate-shake'
                        : value[i]
                            ? 'border-[#C9A96E]/40 bg-[#C9A96E]/05 focus:border-[#C9A96E]'
                            : 'border-white/08 focus:border-[#C9A96E]/40'
                        }`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                />
            ))}
        </div>
    );
}

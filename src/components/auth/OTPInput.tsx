'use client';

import { useRef, useCallback, type KeyboardEvent, type ClipboardEvent } from 'react';

interface Props {
    length?: number;
    value: string;
    onChange: (value: string) => void;
}

export function OTPInput({ length = 6, value, onChange }: Props) {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const digits = value.padEnd(length, '').split('').slice(0, length);

    const focusInput = useCallback((idx: number) => {
        inputsRef.current[idx]?.focus();
    }, []);

    const handleChange = useCallback(
        (idx: number, char: string) => {
            if (!/^\d?$/.test(char)) return;
            const arr = [...digits];
            arr[idx] = char;
            const next = arr.join('');
            onChange(next);
            if (char && idx < length - 1) {
                focusInput(idx + 1);
            }
        },
        [digits, onChange, length, focusInput]
    );

    const handleKeyDown = useCallback(
        (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Backspace') {
                e.preventDefault();
                if (digits[idx]) {
                    handleChange(idx, '');
                } else if (idx > 0) {
                    handleChange(idx - 1, '');
                    focusInput(idx - 1);
                }
            } else if (e.key === 'ArrowLeft' && idx > 0) {
                focusInput(idx - 1);
            } else if (e.key === 'ArrowRight' && idx < length - 1) {
                focusInput(idx + 1);
            }
        },
        [digits, handleChange, focusInput, length]
    );

    const handlePaste = useCallback(
        (e: ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();
            const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
            if (text) {
                onChange(text);
                focusInput(Math.min(text.length, length - 1));
            }
        },
        [onChange, length, focusInput]
    );

    return (
        <div className="flex items-center justify-center gap-2">
            {digits.map((d, i) => (
                <input
                    key={i}
                    ref={(el) => { inputsRef.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d || ''}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    onFocus={(e) => e.target.select()}
                    className="text-center text-xl font-bold transition-colors duration-200 outline-none"
                    style={{
                        width: '48px',
                        height: '56px',
                        border: d ? '1.5px solid #C9A96E' : '1.5px solid #E0E0E0',
                        borderRadius: '6px',
                        color: '#1C1C1E',
                    }}
                />
            ))}
        </div>
    );
}

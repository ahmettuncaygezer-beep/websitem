'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';

interface Props {
    password: string;
}

interface Rule {
    label: string;
    test: (pw: string) => boolean;
}

const RULES: Rule[] = [
    { label: 'En az 8 karakter', test: (pw) => pw.length >= 8 },
    { label: 'Büyük harf', test: (pw) => /[A-Z]/.test(pw) },
    { label: 'Küçük harf', test: (pw) => /[a-z]/.test(pw) },
    { label: 'Rakam', test: (pw) => /\d/.test(pw) },
];

export function PasswordStrength({ password }: Props) {
    const passed = useMemo(() => RULES.filter((r) => r.test(password)).length, [password]);

    const strength = passed <= 1 ? 'weak' : passed <= 2 ? 'fair' : passed <= 3 ? 'good' : 'strong';
    const colors = { weak: '#E53935', fair: '#FF9800', good: '#FFC107', strong: '#4CAF50' };
    const labels = { weak: 'Zayıf', fair: 'Orta', good: 'İyi', strong: 'Güçlü ✓' };
    const color = colors[strength];

    if (!password) return null;

    return (
        <div className="mt-2">
            {/* Bars */}
            <div className="flex gap-1.5 mb-2">
                {[0, 1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="flex-1 h-1 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1, background: i < passed ? color : '#E8E3DC' }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        style={{ transformOrigin: 'left' }}
                    />
                ))}
            </div>

            <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium" style={{ color }}>
                    {labels[strength]}
                </span>
            </div>

            {/* Rules */}
            <div className="flex flex-col gap-1">
                {RULES.map((rule) => {
                    const ok = rule.test(password);
                    return (
                        <div key={rule.label} className="flex items-center gap-2">
                            {ok ? (
                                <Check size={12} color="#4CAF50" />
                            ) : (
                                <Circle size={12} color="#CCC" />
                            )}
                            <span className="text-[11px]" style={{ color: ok ? '#4CAF50' : '#999' }}>
                                {rule.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

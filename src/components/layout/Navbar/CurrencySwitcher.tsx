'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobal } from '@/context/GlobalContext';

const CURRENCIES = [
    { code: 'TRY', symbol: '₺', label: 'Türk Lirası' },
    { code: 'USD', symbol: '$', label: 'Dolar' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
] as const;

interface CurrencySwitcherProps {
    isScrolled: boolean;
}

export function CurrencySwitcher({ isScrolled }: CurrencySwitcherProps) {
    const { currency, setCurrency } = useGlobal();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const textColor = isScrolled ? 'text-[#1C1C1E]/70' : 'text-white/70';
    const hoverColor = isScrolled ? 'hover:text-[#1C1C1E]' : 'hover:text-white';

    const activeCur = CURRENCIES.find((c) => c.code === currency);

    return (
        <div
            ref={containerRef}
            className="relative"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-1 text-[12px] font-medium tracking-wider
                   ${textColor} ${hoverColor} transition-colors duration-200`}
                aria-label={`Para birimi: ${currency}`}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                {activeCur?.symbol} {currency}
                <ChevronDown
                    size={10}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 min-w-[170px] bg-white dark:bg-card rounded-md overflow-hidden z-[60]"
                        style={{
                            border: '1px solid var(--border)',
                            boxShadow: 'var(--shadow-premium)',
                        }}
                        role="listbox"
                    >
                        {CURRENCIES.map(({ code, symbol, label }) => (
                            <button
                                key={code}
                                role="option"
                                aria-selected={currency === code}
                                onClick={() => { setCurrency(code as any); setIsOpen(false); }}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left
                           hover:bg-[#F5F0EB] dark:hover:bg-muted transition-colors duration-150"
                            >
                                <span
                                    className="text-[13px] font-medium"
                                    style={{ color: '#C9A96E', minWidth: '12px' }}
                                >
                                    {symbol}
                                </span>
                                <span className="text-[12px] dark:text-foreground">
                                    {code} — {label}
                                </span>
                                {currency === code && (
                                    <Check size={12} className="ml-auto" style={{ color: '#C9A96E' }} />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

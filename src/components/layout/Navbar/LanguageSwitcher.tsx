'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobal } from '@/context/GlobalContext';

// Using ISO country codes for flagcdn
const LANGUAGES: { code: string; display: string; flag: string; label: string }[] = [
    { code: 'tr', display: 'TR', flag: 'tr', label: 'Türkçe' },
    { code: 'en', display: 'EN', flag: 'gb', label: 'English' },
    { code: 'fr', display: 'FR', flag: 'fr', label: 'Français' },
    { code: 'ar', display: 'AR', flag: 'ae', label: 'العربية' },
    { code: 'de', display: 'DE', flag: 'de', label: 'Deutsch' },
];

interface LanguageSwitcherProps {
    isScrolled: boolean;
}

export function LanguageSwitcher({ isScrolled }: LanguageSwitcherProps) {
    const { language, setLanguage } = useGlobal();
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

    const textColor = 'text-foreground/70 dark:text-white/70';
    const hoverColor = 'hover:text-foreground dark:hover:text-white';
    const activeDisplay = LANGUAGES.find((l) => l.code === language)?.display ?? language;

    return (
        <div
            ref={containerRef}
            className="relative"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-1 text-[12px] font-medium tracking-wider
                   ${textColor} ${hoverColor} transition-colors duration-200`}
                aria-label={`Dil: ${activeDisplay}`}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                {activeDisplay}
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
                        className="absolute top-full right-0 mt-2 min-w-[130px] bg-white dark:bg-card rounded-md overflow-hidden z-[60]"
                        style={{
                            border: '1px solid var(--border)',
                            boxShadow: 'var(--shadow-premium)',
                        }}
                        role="listbox"
                    >
                        {LANGUAGES.map(({ code, display, flag, label }) => (
                            <button
                                key={code}
                                role="option"
                                aria-selected={language === code}
                                onClick={() => { setLanguage(code as any); setIsOpen(false); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-left
                           hover:bg-[#F5F0EB] dark:hover:bg-muted transition-colors duration-150"
                            >
                                <img
                                    src={`https://flagcdn.com/w20/${flag}.png`}
                                    srcSet={`https://flagcdn.com/w40/${flag}.png 2x`}
                                    width="16"
                                    height="12"
                                    alt={`${code} flag`}
                                    className="object-cover rounded-[2px]"
                                />
                                <span
                                    className="text-[13px] dark:text-foreground"
                                    style={{ color: language === code ? '#C9A96E' : '' }}
                                >
                                    {label}
                                </span>
                                {language === code && (
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

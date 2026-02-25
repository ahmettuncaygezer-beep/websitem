'use client';

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobal } from '@/context/GlobalContext';

// GlobalContext uses lowercase locale codes: 'tr' | 'en' | 'fr'
const LANGUAGES = [
    { code: 'tr' as const, display: 'TR', flag: '🇹🇷', label: 'Türkçe' },
    { code: 'en' as const, display: 'EN', flag: '🇬🇧', label: 'English' },
] as const;

interface LanguageSwitcherProps {
    isScrolled: boolean;
}

export function LanguageSwitcher({ isScrolled }: LanguageSwitcherProps) {
    const { language, setLanguage } = useGlobal();
    const [isOpen, setIsOpen] = useState(false);

    const textColor = isScrolled ? 'text-[#1C1C1E]/70' : 'text-white/70';
    const hoverColor = isScrolled ? 'hover:text-[#1C1C1E]' : 'hover:text-white';
    const activeDisplay = LANGUAGES.find((l) => l.code === language)?.display ?? language.toUpperCase();

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
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
                        className="absolute top-full right-0 mt-2 min-w-[130px] bg-white rounded-md overflow-hidden z-[60]"
                        style={{
                            border: '1px solid rgba(0,0,0,0.06)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        }}
                        role="listbox"
                    >
                        {LANGUAGES.map(({ code, display, flag, label }) => (
                            <button
                                key={code}
                                role="option"
                                aria-selected={language === code}
                                onClick={() => { setLanguage(code); setIsOpen(false); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-left
                           hover:bg-[#F5F0EB] transition-colors duration-150"
                            >
                                <span className="text-base">{flag}</span>
                                <span
                                    className="text-[13px]"
                                    style={{ color: language === code ? '#C9A96E' : '#1C1C1E' }}
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

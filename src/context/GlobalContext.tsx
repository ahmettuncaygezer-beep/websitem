'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, currencies } from '@/lib/i18n';

type Language = keyof typeof translations;
type Currency = keyof typeof currencies;

interface GlobalContextType {
    language: Language;
    currency: Currency;
    setLanguage: (lang: Language) => void;
    setCurrency: (cur: Currency) => void;
    t: (keyPath: string) => string;
    formatPrice: (priceTRY: number) => string;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('tr');
    const [currency, setCurrency] = useState<Currency>('TRY');

    // Translation function
    const t = (keyPath: string): string => {
        const keys = keyPath.split('.');
        let result: any = translations[language];

        for (const key of keys) {
            if (result && result[key]) {
                result = result[key];
            } else {
                return keyPath; // Fallback to key path
            }
        }
        return typeof result === 'string' ? result : keyPath;
    };

    // Price formatting function
    const formatPrice = (priceTRY: number): string => {
        const config = currencies[currency];
        const converted = priceTRY * config.rate;

        return new Intl.NumberFormat(language === 'tr' ? 'tr-TR' : 'en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(converted);
    };

    return (
        <GlobalContext.Provider value={{ language, currency, setLanguage, setCurrency, t, formatPrice }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobal() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
}

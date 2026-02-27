'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, currencies } from '@/lib/i18n';

type Language = 'tr' | 'en' | 'fr' | 'ar';
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

    // Auto-switch currency when language changes
    useEffect(() => {
        const langToCurrency: Record<Language, Currency> = {
            tr: 'TRY',
            en: 'USD',
            fr: 'EUR',
            ar: 'USD' // Default for Arabic market in this demo
        };
        setCurrency(langToCurrency[language]);
    }, [language]);

    // Translation function
    const t = (keyPath: string): string => {
        const keys = keyPath.split('.');
        const dict: any = translations;
        let result: any = dict[language];

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

        // Define locale based on language
        const locale = language === 'tr' ? 'tr-TR' :
            language === 'en' ? 'en-US' :
                'fr-FR';

        return new Intl.NumberFormat(locale, {
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

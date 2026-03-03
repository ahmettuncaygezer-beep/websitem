'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, currencies } from '@/lib/i18n';
import { translations as storeTranslations } from '@/store/translationStore';

type Language = 'tr' | 'en' | 'fr' | 'ar' | 'de';
type Currency = keyof typeof currencies;

export interface SiteSettings {
    cms_colors?: { primary: string; primaryDark: string; background: string; text: string };
    cms_hero?: { title: string; subtitle: string; image: string };
    cms_footer?: { description: string; showNewsletter: boolean };
    cms_announcement?: { enabled: boolean; text: string; bg: string; color: string };
    site_info?: {
        siteName: string;
        siteSlogan: string;
        siteDescription: string;
        contactEmail: string;
        contactPhone: string;
        supportEmail: string;
        logo: string;
        favicon: string;
        address: { full: string; city: string; district: string };
    };
    site_social?: {
        instagram: string;
        facebook: string;
        whatsapp: string;
        youtube?: string;
        twitter?: string;
    };
    site_seo?: {
        metaTitle: string;
        metaDescription: string;
        ogImage: string;
    };
}

interface GlobalContextType {
    language: Language;
    currency: Currency;
    siteSettings: SiteSettings | null;
    setLanguage: (lang: Language) => void;
    setCurrency: (cur: Currency) => void;
    refreshSettings: () => Promise<void>;
    t: (keyPath: string, params?: Record<string, string | number>) => string;
    formatPrice: (priceTRY: number) => string;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('tr');
    const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

    const fetchSettings = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/settings', { cache: 'no-store' });
            const data = await res.json();
            setSiteSettings(data);
            if (data.cms_colors) {
                const root = document.documentElement;
                root.style.setProperty('--selis-gold', data.cms_colors.primary);
                root.style.setProperty('--selis-gold-dark', data.cms_colors.primaryDark);
            }
        } catch (err) {
            console.error('Error fetching settings:', err);
        }
    }, []);

    useEffect(() => {
        // Run once on mount to get stored language
        const storedLang = localStorage.getItem('selis_language_pref') as Language;
        if (storedLang && ['tr', 'en', 'fr', 'ar', 'de'].includes(storedLang)) {
            setLanguageState(storedLang);
        }

        fetchSettings();
    }, [fetchSettings]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('selis_language_pref', lang);
    };
    const [currency, setCurrency] = useState<Currency>('TRY');

    // Auto-switch currency when language changes
    useEffect(() => {
        const langToCurrency: Record<Language, Currency> = {
            tr: 'TRY',
            en: 'USD',
            fr: 'EUR',
            ar: 'USD',
            de: 'EUR'
        };
        setCurrency(langToCurrency[language]);
    }, [language]);

    // Translation function
    const t = (keyPath: string, params?: Record<string, string | number>): string => {
        const dict: any = translations;
        const storeDict: any = storeTranslations;

        // language is lowercase 'tr', 'en', etc.
        // translationStore uses uppercase 'TR', 'EN', etc.
        let result: any = dict[language];
        let storeResult: any = storeDict[language.toUpperCase()];

        let finalString: string = keyPath; // fallback

        // First check if the exact string exists as a flat key
        if (result && result[keyPath]) {
            finalString = result[keyPath];
        } else if (storeResult && storeResult[keyPath]) {
            finalString = storeResult[keyPath];
        } else {
            // Otherwise try the nested split logic
            const keys = keyPath.split('.');

            let nestedResult = result;
            let nestedStoreResult = storeResult;

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const isLast = i === keys.length - 1;

                if (nestedResult && nestedResult[key]) {
                    nestedResult = nestedResult[key];
                    if (isLast && typeof nestedResult === 'string') finalString = nestedResult;
                } else if (nestedStoreResult && nestedStoreResult[key]) {
                    nestedStoreResult = nestedStoreResult[key];
                    if (isLast && typeof nestedStoreResult === 'string') finalString = nestedStoreResult;
                } else {
                    break;
                }
            }
        }

        // Replace parameters like {count} if provided
        if (params && typeof finalString === 'string') {
            Object.entries(params).forEach(([key, value]) => {
                finalString = finalString.replace(new RegExp(`{${key}}`, 'g'), String(value));
            });
        }

        return finalString;
    };

    // Price formatting function
    const formatPrice = (priceTRY: number): string => {
        const config = currencies[currency];
        const converted = priceTRY * config.rate;

        // Define locale based on language
        const locale = language === 'tr' ? 'tr-TR' :
            language === 'en' ? 'en-US' :
                language === 'de' ? 'de-DE' :
                    'fr-FR';

        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(converted);
    };

    return (
        <GlobalContext.Provider value={{
            language,
            currency,
            siteSettings,
            setLanguage,
            setCurrency,
            refreshSettings: fetchSettings,
            t,
            formatPrice
        }}>
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

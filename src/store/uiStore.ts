import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'TR' | 'EN';
export type Currency = 'TRY' | 'USD' | 'EUR';

interface UIState {
    language: Language;
    currency: Currency;
    setLanguage: (lang: Language) => void;
    setCurrency: (currency: Currency) => void;
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            language: 'TR',
            currency: 'TRY',
            setLanguage: (lang) => set({ language: lang }),
            setCurrency: (currency) => set({ currency: currency }),
        }),
        {
            name: 'ui-storage',
        }
    )
);

// Currency Conversion Helpers
const EXCHANGE_RATES: Record<Currency, number> = {
    TRY: 1,
    USD: 35,
    EUR: 38,
};

export function formatPrice(amountInTry: number, currency: Currency): string {
    const rate = EXCHANGE_RATES[currency];
    const convertedAmount = amountInTry / rate;

    return new Intl.NumberFormat(currency === 'TRY' ? 'tr-TR' : 'en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: currency === 'TRY' ? 0 : 2,
    }).format(convertedAmount);
}

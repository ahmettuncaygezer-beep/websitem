// ─── Canonical Language & Currency Types ──────────────────────────────────────
// Single source of truth — import from here everywhere.

export type Language = 'TR' | 'EN' | 'AR' | 'FR' | 'DE';
export type Currency = 'TRY' | 'USD' | 'EUR';

export const LANGUAGE_CODES: Language[] = ['TR', 'EN', 'AR', 'FR', 'DE'];

export const LANG_TO_CURRENCY: Record<Language, Currency> = {
    TR: 'TRY',
    EN: 'USD',
    FR: 'EUR',
    AR: 'USD',
    DE: 'EUR',
};

// Single source of truth for exchange rates (TRY-based)
export const EXCHANGE_RATES: Record<Currency, { symbol: string; rate: number; label: string }> = {
    TRY: { symbol: '₺', rate: 1, label: 'TL' },
    USD: { symbol: '$', rate: 1 / 43.88, label: 'USD' },
    EUR: { symbol: '€', rate: 1 / 51.85, label: 'EUR' },
};

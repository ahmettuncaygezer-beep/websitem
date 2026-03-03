/**
 * SELIS Color System
 * ─────────────────────────────────────────────
 * Single source of truth for all colors.
 * Components must import from here — never use raw hex strings.
 *
 * Usage in TS/JS:   import { colors } from '@/lib/design-system'
 * Usage in CSS:     var(--color-accent)  (custom props set in globals.css)
 * Usage in Tailwind: bg-accent-500 / text-primary-800  (via @theme in globals.css)
 */

export const colors = {

    // ── PRIMARY — Deep Anthracite ────────────────────────────────────
    // Navbar (scrolled), buttons, headings, dark surfaces
    primary: {
        50: '#F8F8F8',
        100: '#EBEBEB',
        200: '#D1D1D1',
        300: '#A3A3A3',
        400: '#737373',
        500: '#525252',
        600: '#404040',
        700: '#1A1A1C',   // Deep anthracite for surfaces
        800: '#121214',   // Midnight black for main backgrounds
        900: '#080809',
        DEFAULT: '#121214',
    },

    // ── ACCENT — Warm Gold / Bronze ─────────────────────────────────
    // CTA buttons, active elements, badges, underlines, emphasis points
    accent: {
        50: '#FDFBEE',
        100: '#FAF4D2',
        200: '#F2E2A6',
        300: '#EAB258',
        400: '#D99B4B',   // Premium Gold/Bronze
        500: '#BD8C40',   // ← MAIN — Richer Gold
        600: '#A17336',   // Hover state
        700: '#855B2C',
        800: '#694222',
        900: '#4D2918',
        DEFAULT: '#BD8C40',
        hover: '#A17336',
        light: '#F2E2A6',
        dark: '#D99B4B',
    },

    // ── SECONDARY — Cream / Beige ────────────────────────────────────
    // Page/card/section backgrounds, soft containers
    secondary: {
        50: '#FDFCFA',
        100: '#FAF8F5',
        200: '#F5F0EB',   // ← MAIN — most used
        300: '#EDE5DC',
        400: '#E2D5C8',
        500: '#D4C4B0',
        600: '#C0AB91',
        700: '#A08B6E',
        800: '#7D6A50',
        900: '#5A4C38',
        DEFAULT: '#F5F0EB',
    },

    // ── BORDER ──────────────────────────────────────────────────────
    border: {
        light: '#E8E3DC',
        medium: '#D4CCBF',
        dark: 'rgba(255,255,255,0.08)',
        gold: 'rgba(201,169,110,0.3)',
        DEFAULT: '#E8E3DC',
    },

    // ── SEMANTIC ────────────────────────────────────────────────────
    success: {
        50: '#F0FFF4',
        100: '#C6F6D5',
        500: '#4CAF50',
        600: '#3D9140',
        700: '#2E7032',
        DEFAULT: '#4CAF50',
        light: '#F0FFF4',
        text: '#2E7032',
    },

    error: {
        50: '#FFF5F5',
        100: '#FFD0D0',
        500: '#E53935',
        600: '#C62828',
        700: '#B71C1C',
        DEFAULT: '#E53935',
        light: '#FFF5F5',
        text: '#B71C1C',
    },

    warning: {
        50: '#FFFBF0',
        100: '#FFE0B2',
        500: '#FF9800',
        600: '#F57C00',
        700: '#E65100',
        DEFAULT: '#FF9800',
        light: '#FFFBF0',
        text: '#E65100',
    },

    info: {
        50: '#EFF6FF',
        500: '#3B82F6',
        DEFAULT: '#3B82F6',
        light: '#EFF6FF',
        text: '#1D4ED8',
    },

    // ── BRAND COLORS ────────────────────────────────────────────────
    whatsapp: '#25D366',
    instagram: '#E1306C',

    // ── TEXT HIERARCHY ───────────────────────────────────────────────
    text: {
        primary: '#1C1C1E',
        secondary: '#4A4A4A',
        muted: '#666666',
        disabled: '#999999',
        inverse: '#FFFFFF',
        gold: '#C9A96E',
        link: '#C9A96E',
        linkHover: '#B8915A',
    },

    // ── BACKGROUND HIERARCHY ────────────────────────────────────────
    bg: {
        page: '#FFFFFF',
        section: '#F5F0EB',
        dark: '#1C1C1E',
        card: '#FFFFFF',
        cardHover: '#FDFCFA',
        input: '#FFFFFF',
        disabled: '#F5F5F5',
    },

    // ── DARK MODE OVERRIDES ──────────────────────────────────────────
    dark: {
        bg: {
            page: '#0A0A0B',
            section: '#121214',
            card: '#1A1A1C',
            elevated: '#242426',
        },
        text: {
            primary: '#FDFBEE',
            secondary: '#A1A1A5',
            muted: '#636366',
            disabled: '#3A3A3C',
        },
        border: {
            DEFAULT: 'rgba(255,255,255,0.05)',
            medium: 'rgba(255,255,255,0.10)',
            strong: 'rgba(255,255,255,0.15)',
        },
    },
} as const;

export type ColorToken = typeof colors;
export type AccentShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

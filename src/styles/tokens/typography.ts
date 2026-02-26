/**
 * MAISON Typography System
 * ─────────────────────────────────────────────
 * Usage: import { typography, textStyles } from '@/lib/design-system'
 */

import { colors } from './colors';

export const typography = {

    // ── FONT FAMILIES ────────────────────────────────────────────────
    fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'] as string[],
        // H1-H4, hero, product names (large), editorial content

        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'] as string[],
        // Paragraphs, buttons, forms, navigation, all UI

        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'] as string[],
        // Coupon codes, SKU numbers

        display: ['Playfair Display', 'serif'] as string[],
        // Alias for hero large headings
    },

    // ── FONT WEIGHTS ─────────────────────────────────────────────────
    fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },

    // ── FONT SIZES ───────────────────────────────────────────────────
    // Format: [fontSize, { lineHeight, letterSpacing }]
    fontSize: {
        '2xs': ['10px', { lineHeight: '14px', letterSpacing: '0.05em' }] as [string, { lineHeight: string; letterSpacing: string }],
        // Legal notes, timestamp, brand labels

        'xs': ['11px', { lineHeight: '16px', letterSpacing: '0.04em' }] as [string, { lineHeight: string; letterSpacing: string }],
        // Badges, category labels, uppercase labels

        'sm': ['12px', { lineHeight: '18px', letterSpacing: '0.01em' }] as [string, { lineHeight: string; letterSpacing: string }],
        // Breadcrumb, footer links, form help text

        'base': ['13px', { lineHeight: '20px', letterSpacing: '0em' }] as [string, { lineHeight: string; letterSpacing: string }],
        // Nav links, button text, list items

        'md': ['14px', { lineHeight: '22px', letterSpacing: '-0.01em' }] as [string, { lineHeight: string; letterSpacing: string }],
        // Card descriptions, form inputs

        'lg': ['16px', { lineHeight: '24px', letterSpacing: '-0.01em' }] as [string, { lineHeight: string; letterSpacing: string }],
        // Body text, product descriptions

        'xl': ['18px', { lineHeight: '28px', letterSpacing: '-0.02em' }] as [string, { lineHeight: string; letterSpacing: string }],
        // Card headings, small section headings

        '2xl': ['20px', { lineHeight: '30px', letterSpacing: '-0.02em' }] as [string, { lineHeight: string; letterSpacing: string }],
        // Product name (PDP), page headings (mobile)

        '3xl': ['24px', { lineHeight: '34px', letterSpacing: '-0.02em' }] as [string, { lineHeight: string; letterSpacing: string }],
        // Section headings

        '4xl': ['30px', { lineHeight: '40px', letterSpacing: '-0.03em' }] as [string, { lineHeight: string; letterSpacing: string }],
        // Page H1s (mobile)

        '5xl': ['36px', { lineHeight: '46px', letterSpacing: '-0.03em' }] as [string, { lineHeight: string; letterSpacing: string }],
        // Section H1s (desktop)

        '6xl': ['48px', { lineHeight: '58px', letterSpacing: '-0.04em' }] as [string, { lineHeight: string; letterSpacing: string }],
        // Hero headings

        '7xl': ['60px', { lineHeight: '70px', letterSpacing: '-0.04em' }] as [string, { lineHeight: string; letterSpacing: string }],
        // Large screen hero

        '8xl': ['72px', { lineHeight: '82px', letterSpacing: '-0.05em' }] as [string, { lineHeight: string; letterSpacing: string }],
        // Counter animations, big emphasis numbers

        '9xl': ['96px', { lineHeight: '104px', letterSpacing: '-0.06em' }] as [string, { lineHeight: string; letterSpacing: string }],
        // Decorative large text
    },

    // ── LINE HEIGHTS ─────────────────────────────────────────────────
    lineHeight: {
        none: '1',
        tight: '1.15',
        snug: '1.25',
        normal: '1.5',
        relaxed: '1.65',
        loose: '2.0',
    },

    // ── LETTER SPACING ───────────────────────────────────────────────
    letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
        ultrawide: '0.3em',    // Brand label: MAISON ATELIER
    },
};

// ── PRESET TEXT STYLES ───────────────────────────────────────────────
// Ready-to-use style objects for React inline styles
export const textStyles = {

    h1: {
        fontFamily: typography.fontFamily.heading.join(', '),
        fontSize: 'clamp(32px, 5vw, 60px)',
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight,
        letterSpacing: typography.letterSpacing.tighter,
        color: colors.text.primary,
    },

    h2: {
        fontFamily: typography.fontFamily.heading.join(', '),
        fontSize: 'clamp(24px, 3vw, 36px)',
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight,
        letterSpacing: typography.letterSpacing.tight,
    },

    h3: {
        fontFamily: typography.fontFamily.heading.join(', '),
        fontSize: 'clamp(18px, 2vw, 24px)',
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.snug,
    },

    /** Small all-caps label above a section: "2026 KOLEKSİYONU" */
    sectionLabel: {
        fontFamily: typography.fontFamily.body.join(', '),
        fontSize: '11px',
        fontWeight: typography.fontWeight.medium,
        letterSpacing: typography.letterSpacing.ultrawide,
        textTransform: 'uppercase' as const,
        color: colors.accent.DEFAULT,
    },

    priceMain: {
        fontFamily: typography.fontFamily.body.join(', '),
        fontSize: '24px',
        fontWeight: typography.fontWeight.bold,
        letterSpacing: '-0.02em',
        fontVariantNumeric: 'tabular-nums',
        color: colors.text.primary,
    },

    priceOriginal: {
        fontFamily: typography.fontFamily.body.join(', '),
        fontSize: '16px',
        fontWeight: typography.fontWeight.regular,
        textDecoration: 'line-through',
        color: colors.text.disabled,
    },

    buttonLarge: {
        fontFamily: typography.fontFamily.body.join(', '),
        fontSize: '13px',
        fontWeight: typography.fontWeight.semibold,
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
    },

    buttonSmall: {
        fontFamily: typography.fontFamily.body.join(', '),
        fontSize: '11px',
        fontWeight: typography.fontWeight.semibold,
        letterSpacing: '0.06em',
        textTransform: 'uppercase' as const,
    },

    navLink: {
        fontFamily: typography.fontFamily.body.join(', '),
        fontSize: '13px',
        fontWeight: typography.fontWeight.medium,
        letterSpacing: '0.02em',
    },

    productName: {
        fontFamily: typography.fontFamily.heading.join(', '),
        fontSize: '15px',
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.snug,
    },

    productBrand: {
        fontFamily: typography.fontFamily.body.join(', '),
        fontSize: '11px',
        fontWeight: typography.fontWeight.medium,
        letterSpacing: '0.25em',
        textTransform: 'uppercase' as const,
        color: colors.text.muted,
    },

    blogBody: {
        fontFamily: typography.fontFamily.body.join(', '),
        fontSize: '17px',
        lineHeight: typography.lineHeight.relaxed,
        color: colors.text.secondary,
    },
} as const;

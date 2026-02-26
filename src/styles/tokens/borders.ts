/**
 * MAISON Border System
 * ─────────────────────────────────────────────
 * Usage: import { borders } from '@/lib/design-system'
 */

import { colors } from './colors';

export const borders = {

    // ── BORDER RADIUS ────────────────────────────────────────────────
    radius: {
        none: '0px',
        xs: '2px',    // Buttons, cards (MAISON minimal language)
        sm: '4px',    // Input fields, badges
        md: '8px',    // Dropdowns
        lg: '12px',   // Modals
        xl: '16px',   // Bottom sheet top corners
        '2xl': '24px',   // Pill buttons
        full: '9999px', // Circle buttons, full-pill badges
        DEFAULT: '2px',    // MAISON default — minimal, luxury
    },

    // ── BORDER WIDTHS ────────────────────────────────────────────────
    width: {
        0: '0px',
        px: '1px',
        2: '2px',
        4: '4px',
        8: '8px',
    },

    // ── SEMANTIC BORDERS ─────────────────────────────────────────────
    // Ready-to-use shorthand values for common use cases
    semantic: {
        card: `1px solid ${colors.border.DEFAULT}`,
        input: '1px solid #D4CCBF',
        inputFocus: `1px solid ${colors.accent.DEFAULT}`,
        inputError: `1px solid ${colors.error.DEFAULT}`,
        divider: `1px solid ${colors.border.DEFAULT}`,
        goldAccent: `2px solid ${colors.accent.DEFAULT}`,
        navBottom: '1px solid rgba(0,0,0,0.06)',
        glassBorder: '1px solid rgba(255,255,255,0.15)',
    },
} as const;

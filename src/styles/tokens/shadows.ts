/**
 * SELIS Shadow System
 * ─────────────────────────────────────────────
 * All box-shadow values centralized.
 * Usage: import { shadows } from '@/lib/design-system'
 * Tailwind: shadow-card / shadow-gold  (via @theme in globals.css)
 */

export const shadows = {

    // ── BASE SCALE ───────────────────────────────────────────────────
    none: 'none',

    xs: '0 1px 2px rgba(0,0,0,0.04)',
    // Input, select border effect

    sm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    // Small cards, badges

    md: '0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.04)',
    // Card hover, dropdown

    lg: '0 10px 15px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.04)',
    // Modal, drawer, floating elements

    xl: '0 20px 25px rgba(0,0,0,0.08), 0 10px 10px rgba(0,0,0,0.03)',
    // Popup, large modal

    '2xl': '0 25px 50px rgba(0,0,0,0.15)',
    // Hero card, featured element

    // ── SEMANTIC SHADOWS ─────────────────────────────────────────────
    card: '0 2px 8px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.04)',
    cardHover: '0 8px 24px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',

    navbar: '0 1px 20px rgba(0,0,0,0.08)',
    drawer: '-4px 0 40px rgba(0,0,0,0.12)',
    bottomNav: '0 -4px 20px rgba(0,0,0,0.06)',
    stickyCart: '0 -8px 24px rgba(0,0,0,0.08)',
    megaMenu: '0 20px 60px rgba(0,0,0,0.12)',
    toast: '0 8px 32px rgba(0,0,0,0.12)',

    // ── COLORED SHADOWS ──────────────────────────────────────────────
    gold: '0 8px 24px rgba(201,169,110,0.35)',
    goldSm: '0 4px 12px rgba(201,169,110,0.25)',
    success: '0 4px 12px rgba(76,175,80,0.30)',
    error: '0 4px 12px rgba(229,57,53,0.30)',
    whatsapp: '0 4px 20px rgba(37,211,102,0.40)',

    // ── INSET SHADOWS ────────────────────────────────────────────────
    insetSm: 'inset 0 1px 2px rgba(0,0,0,0.04)',
    insetMd: 'inset 0 2px 4px rgba(0,0,0,0.06)',
    insetInput: 'inset 0 1px 3px rgba(0,0,0,0.08)',

    // ── GLASS SHADOW ─────────────────────────────────────────────────
    glass: '0 8px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.20)',

} as const;

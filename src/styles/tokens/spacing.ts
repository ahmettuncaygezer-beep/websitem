/**
 * SELIS Spacing System
 * ─────────────────────────────────────────────
 * Base unit: 4px
 * All margin, padding, gap in components come from here.
 * Usage: import { spacing, semanticSpacing } from '@/lib/design-system'
 */

export const spacing = {
    0: '0px',
    px: '1px',
    0.5: '2px',
    1: '4px',    // ← base unit
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',   // ← minimum touch target (WCAG)
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    48: '192px',
    56: '224px',
    64: '256px',
    72: '288px',
    80: '320px',
    96: '384px',
} as const;

// ── SEMANTIC SPACING ─────────────────────────────────────────────────
// Named, purposeful spacing decisions — keeps intent visible in code
export const semanticSpacing = {
    // Component internals
    buttonPaddingX: spacing[8],    // 32px
    buttonPaddingY: spacing[3.5],  // 14px
    buttonPaddingXSm: spacing[5],    // 20px
    buttonPaddingYSm: spacing[2.5],  // 10px
    inputPaddingX: spacing[4],    // 16px
    inputPaddingY: spacing[3],    // 12px
    cardPadding: spacing[6],    // 24px
    cardPaddingMobile: spacing[4],    // 16px

    // Layout
    containerPadding: spacing[6],   // 24px
    containerPaddingMobile: spacing[4],   // 16px
    sectionPaddingY: spacing[20],  // 80px
    sectionPaddingYMobile: spacing[12],  // 48px
    navbarHeight: '72px',
    bottomNavHeight: '64px',

    // Grid
    gridGap: spacing[6],  // 24px
    gridGapMobile: spacing[3],  // 12px

    // Forms
    formGap: spacing[4],    // 16px
    labelGap: spacing[1.5],  // 6px
    helpTextGap: spacing[1],    // 4px

    // Touch
    minTouchTarget: spacing[11], // 44px — WCAG AA
} as const;

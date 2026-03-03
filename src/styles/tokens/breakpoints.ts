/**
 * SELIS Breakpoints
 * ─────────────────────────────────────────────
 * Pixel values matching the @theme screen values in globals.css.
 * Use for window.matchMedia() calls in TypeScript.
 *
 * Usage:
 *   import { breakpoints } from '@/lib/design-system'
 *   const isMobile = window.innerWidth < breakpoints.md
 */

export const breakpoints = {
    xs: 375,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1440,
    '3xl': 1920,
} as const;

// Convenience media query strings
export const mediaQuery = {
    xs: `(min-width: 375px)`,
    sm: `(min-width: 640px)`,
    md: `(min-width: 768px)`,
    lg: `(min-width: 1024px)`,
    xl: `(min-width: 1280px)`,
    '2xl': `(min-width: 1440px)`,
    '3xl': `(min-width: 1920px)`,
    mobile: `(max-width: 767px)`,
    tablet: `(min-width: 768px) and (max-width: 1023px)`,
    desktop: `(min-width: 1024px)`,
    touch: `(hover: none) and (pointer: coarse)`,
    reducedMotion: `(prefers-reduced-motion: reduce)`,
    darkMode: `(prefers-color-scheme: dark)`,
} as const;

export type Breakpoint = keyof typeof breakpoints;

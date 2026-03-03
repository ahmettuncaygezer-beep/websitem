/**
 * SELIS Design System — Barrel Export
 * ─────────────────────────────────────────────
 * Single import point for all design tokens.
 *
 * Usage:
 *   import { colors, typography, shadows, animation } from '@/lib/design-system'
 *   import type { ColorToken, Breakpoint } from '@/lib/design-system'
 */

export { colors } from '@/styles/tokens/colors';
export type { ColorToken, AccentShade } from '@/styles/tokens/colors';

export { typography, textStyles } from '@/styles/tokens/typography';

export { spacing, semanticSpacing } from '@/styles/tokens/spacing';

export { shadows } from '@/styles/tokens/shadows';

export { animation } from '@/styles/tokens/animation';

export { borders } from '@/styles/tokens/borders';

export { breakpoints, mediaQuery } from '@/styles/tokens/breakpoints';
export type { Breakpoint } from '@/styles/tokens/breakpoints';

/**
 * MAISON Animation System
 * ─────────────────────────────────────────────
 * Easing, durations, delays, Framer Motion variant presets.
 * Usage: import { animation } from '@/lib/design-system'
 *
 * Example:
 *   import { animation } from '@/lib/design-system'
 *   <motion.div {...animation.variants.fadeInUp} />
 */

export const animation = {

    // ── EASING FUNCTIONS ─────────────────────────────────────────────
    easing: {
        linear: 'linear',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

        // Premium easings
        easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
        // Hero animations, large transitions

        easeOutQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
        // Card hover, button animations

        easeInOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        // Scroll animations, page transitions

        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        // Tap/click feedback, badge pulse

        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        // Notification, tooltip open

        iOS: 'cubic-bezier(0.32, 0.72, 0, 1)',
        // Mobile drawer, sheet (iOS feel)
    },

    // ── DURATION SCALE ───────────────────────────────────────────────
    duration: {
        instant: 50,    // ms — instant feedback (checkbox)
        fastest: 100,   // hover color transitions
        fast: 150,   // dropdown open
        normal: 200,   // standard transition
        medium: 300,   // modal, drawer
        slow: 400,   // page transitions
        slower: 600,   // hero animations
        slowest: 800,   // video transitions
        loading: 1500,  // skeleton shimmer
    },

    // ── DELAY SCALE (stagger) ────────────────────────────────────────
    delay: {
        0: 0,
        1: 50,
        2: 100,
        3: 150,
        4: 200,
        5: 250,
        6: 300,
        7: 400,
        8: 500,
        9: 600,
        10: 800,
    },

    // ── FRAMER MOTION VARIANT PRESETS ────────────────────────────────
    variants: {

        // Basic visibility
        fadeIn: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.3 },
        },

        fadeInUp: {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 },
            transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        },

        fadeInDown: {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
        },

        fadeInLeft: {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -20 },
            transition: { duration: 0.4 },
        },

        fadeInRight: {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 20 },
            transition: { duration: 0.4 },
        },

        // Scale
        scaleIn: {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.95 },
            transition: { duration: 0.2 },
        },

        popIn: {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.8 },
            transition: { type: 'spring' as const, damping: 20, stiffness: 400 },
        },

        // Drawer / Sheet
        slideInRight: {
            initial: { x: '100%' },
            animate: { x: 0 },
            exit: { x: '100%' },
            transition: { type: 'spring' as const, damping: 30, stiffness: 300 },
        },

        slideInBottom: {
            initial: { y: '100%' },
            animate: { y: 0 },
            exit: { y: '100%' },
            transition: { type: 'spring' as const, damping: 30, stiffness: 300 },
        },

        // Stagger list — use on container element
        staggerContainer: {
            animate: {
                transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.1,
                },
            },
        },

        // Stagger item — use on each child
        staggerItem: {
            initial: { opacity: 0, y: 20 },
            animate: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                },
            },
        },

        // Card hover (use with whileHover)
        cardHover: {
            rest: { y: 0 },
            hover: {
                y: -4,
                transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
            },
        },

        buttonTap: {
            tap: { scale: 0.97 },
        },
    },
} as const;

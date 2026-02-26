/**
 * MAISON Button Variants
 * ─────────────────────────────────────────────
 * Uses class-variance-authority (CVA) for type-safe variant composition.
 * Usage: import { buttonVariants } from './button.variants'
 */

import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
    // Base classes applied to all buttons
    [
        'inline-flex items-center justify-center gap-2',
        'font-semibold tracking-wide uppercase',
        'border border-transparent',
        'transition-all duration-200',
        'select-none cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2',
        'active:scale-[0.97]',
        'whitespace-nowrap',
    ],
    {
        variants: {
            // ── VISUAL VARIANT ───────────────────────────────────────────
            variant: {
                primary: [
                    'bg-[#1C1C1E] text-white',
                    'hover:bg-[#C9A96E]',
                    'hover:shadow-[0_8px_24px_rgba(201,169,110,0.35)]',
                ],

                secondary: [
                    'bg-transparent border-[#1C1C1E] text-[#1C1C1E]',
                    'hover:bg-[#1C1C1E] hover:text-white',
                    'dark:border-[#F5F0EB] dark:text-[#F5F0EB]',
                    'dark:hover:bg-[#F5F0EB] dark:hover:text-[#1C1C1E]',
                ],

                ghost: [
                    'bg-transparent text-[#1C1C1E]',
                    'hover:bg-[#F5F0EB]',
                    'dark:text-[#F5F0EB] dark:hover:bg-[#2C2C2E]',
                ],

                gold: [
                    'bg-[#C9A96E] text-[#1C1C1E]',
                    'hover:bg-[#B8915A]',
                    'shadow-[0_4px_12px_rgba(201,169,110,0.25)]',
                    'hover:shadow-[0_8px_24px_rgba(201,169,110,0.35)]',
                ],

                danger: [
                    'bg-[#E53935] text-white',
                    'hover:bg-[#C62828]',
                    'hover:shadow-[0_4px_12px_rgba(229,57,53,0.30)]',
                ],

                link: [
                    'bg-transparent text-[#C9A96E] p-0 h-auto',
                    'hover:text-[#B8915A] hover:underline',
                    'uppercase-normal tracking-normal font-medium',
                ],
            },

            // ── SIZE ─────────────────────────────────────────────────────
            size: {
                xs: ['h-7  px-3    text-[10px]'],
                sm: ['h-8  px-4    text-[11px]'],
                md: ['h-10 px-6    text-[12px]'],  // DEFAULT
                lg: ['h-12 px-8    text-[13px]'],
                xl: ['h-14 px-10   text-[14px]'],
            },

            // ── SHAPE ────────────────────────────────────────────────────
            shape: {
                rounded: ['rounded-[2px]'],     // MAISON default — minimal
                pill: ['rounded-full'],
                square: ['rounded-none'],
            },

            // ── WIDTH ────────────────────────────────────────────────────
            fullWidth: {
                true: ['w-full'],
                false: [],
            },
        },

        defaultVariants: {
            variant: 'primary',
            size: 'md',
            shape: 'rounded',
            fullWidth: false,
        },
    }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

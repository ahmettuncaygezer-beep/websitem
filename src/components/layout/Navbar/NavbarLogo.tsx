'use client';

import Link from 'next/link';

interface NavbarLogoProps {
    isScrolled: boolean;
    isMobileMenuOpen?: boolean;
}

export function NavbarLogo({ isScrolled, isMobileMenuOpen = false }: NavbarLogoProps) {
    // Mobile menu always white; desktop follows scroll state
    const textColor = isMobileMenuOpen
        ? 'text-white'
        : isScrolled
            ? 'text-[#1C1C1E]'
            : 'text-white';

    return (
        <Link
            href="/"
            prefetch={true}
            className={`flex items-center gap-3 group hover:opacity-80 transition-opacity duration-200 ${textColor}`}
            style={{ transition: 'color 400ms ease, opacity 200ms ease' }}
        >
            {/* Gold vertical accent line */}
            <span
                className="hidden sm:block shrink-0"
                style={{
                    width: '2px',
                    height: '24px',
                    background: '#C9A96E',
                    display: 'block',
                }}
                aria-hidden="true"
            />

            {/* MAISON wordmark */}
            <span
                className="text-xl md:text-2xl font-bold tracking-[0.12em]"
                style={{
                    fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                    letterSpacing: '0.12em',
                }}
            >
                MAISON
            </span>
        </Link>
    );
}

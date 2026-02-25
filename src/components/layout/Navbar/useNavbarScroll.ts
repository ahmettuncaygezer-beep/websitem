'use client';

import { useState, useEffect } from 'react';
import type { NavbarScrollState } from './navbar.types';

export function useNavbarScroll(isMegaMenuOpen: boolean): NavbarScrollState & { shouldHide: boolean } {
    const [state, setState] = useState<NavbarScrollState>({
        isScrolled: false,
        isScrollingUp: true,
        lastScrollY: 0,
    });

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;
            setState((prev) => ({
                isScrolled: scrollY > 20,
                isScrollingUp: scrollY < prev.lastScrollY,
                lastScrollY: scrollY,
            }));
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Hide when scrolling down past 400px — but NEVER while mega menu is open
    const shouldHide =
        !state.isScrollingUp &&
        state.lastScrollY > 400 &&
        !isMegaMenuOpen;

    return { ...state, shouldHide };
}

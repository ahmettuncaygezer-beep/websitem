import { useRef, memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavCategory } from './navbar.types';

interface NavbarDesktopProps {
    categories: NavCategory[];
    isScrolled: boolean;
    activeCategoryId: string | null;
    onCategoryEnter: (id: string) => void;
    onCategoryLeave: () => void;
}

export const NavbarDesktop = memo(function NavbarDesktop({
    categories,
    isScrolled,
    activeCategoryId,
    onCategoryEnter,
    onCategoryLeave,
}: NavbarDesktopProps) {
    const pathname = usePathname();

    return (
        <nav
            className="hidden lg:flex items-center gap-6"
            role="navigation"
            aria-label="Ana navigasyon"
        >
            {categories.map((cat) => {
                const isActive = activeCategoryId === cat.id || pathname.startsWith(cat.href);
                const textBase = isScrolled ? 'rgba(28,28,30,0.8)' : 'rgba(255,255,255,0.9)';
                const textHover = isScrolled ? '#1C1C1E' : '#ffffff';
                const textActive = '#C9A96E';

                return (
                    <div
                        key={cat.id}
                        className="relative py-1"
                        onMouseEnter={() => onCategoryEnter(cat.id)}
                        onMouseLeave={onCategoryLeave}
                    >
                        <Link
                            href={cat.href}
                            aria-haspopup="true"
                            aria-expanded={activeCategoryId === cat.id}
                            className="relative block text-[13px] font-medium tracking-wide group"
                            style={{
                                color: isActive ? textActive : textBase,
                                transition: 'color 300ms ease',
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) (e.currentTarget as HTMLElement).style.color = textHover;
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) (e.currentTarget as HTMLElement).style.color = textBase;
                            }}
                            data-lang-key={cat.dataKey}
                        >
                            {cat.label}

                            {/* Animated underline */}
                            <span
                                className="absolute bottom-[-4px] left-0 h-[1.5px] transition-all duration-[250ms] ease-out"
                                style={{
                                    background: '#C9A96E',
                                    width: isActive ? '100%' : '0%',
                                }}
                            />
                        </Link>
                    </div>
                );
            })}
        </nav>
    );
});

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
                const textBase = isScrolled ? 'var(--foreground)' : 'rgba(255,255,255,0.85)';
                const textHover = isScrolled ? 'var(--foreground)' : '#ffffff';
                const textActive = 'var(--maison-gold)';

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
                                className="absolute bottom-[-4px] left-0 h-[1.5px] transition-all duration-[300ms] ease-out"
                                style={{
                                    background: 'var(--maison-gold)',
                                    width: isActive ? '100%' : '0%',
                                    opacity: isActive ? 1 : 0,
                                }}
                            />
                        </Link>
                    </div>
                );
            })}
        </nav>
    );
});

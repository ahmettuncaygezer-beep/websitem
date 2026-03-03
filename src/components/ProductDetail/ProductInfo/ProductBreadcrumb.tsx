'use client';

import Link from 'next/link';

interface BreadcrumbItem { label: string; href?: string; }
interface Props { items: BreadcrumbItem[]; }

export function ProductBreadcrumb({ items }: Props) {
    return (
        <>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6">
                {/* Desktop */}
                <ol className="hidden md:flex items-center gap-2 list-none p-0 m-0">
                    {items.map((item, i) => {
                        const isLast = i === items.length - 1;
                        return (
                            <li key={i} className="flex items-center gap-2">
                                {i > 0 && <span className="text-border" style={{ fontSize: '12px' }}>›</span>}
                                {isLast || !item.href ? (
                                    <span className="font-medium text-foreground text-[12px]">{item.label}</span>
                                ) : (
                                    <Link href={item.href} className="text-muted-foreground hover:text-selis-gold transition-colors duration-150 text-[12px] no-underline">
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
                {/* Mobile: back link */}
                {items.length >= 2 && (
                    <Link href={items[items.length - 2].href ?? '/'} className="flex md:hidden items-center gap-1 transition-colors duration-150" style={{ fontSize: '12px', color: '#999', textDecoration: 'none' }}>
                        ‹ {items[items.length - 2].label}
                    </Link>
                )}
            </nav>
            {/* JSON-LD */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.label, ...(item.href ? { item: item.href } : {}) })),
                })
            }} />
        </>
    );
}

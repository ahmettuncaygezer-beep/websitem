'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
    label: string;
    href?: string;
}

interface Props {
    title: string;
    breadcrumbs?: Breadcrumb[];
    action?: React.ReactNode;
}

export function AccountHeader({ title, breadcrumbs, action }: Props) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <nav className="flex items-center gap-1 mb-1">
                        <Link href="/hesabim" className="text-[11px] text-muted-foreground hover:text-foreground hover:underline transition-colors">
                            Hesabım
                        </Link>
                        {breadcrumbs.map((bc, i) => (
                            <span key={i} className="flex items-center gap-1">
                                <ChevronRight size={12} className="text-muted-foreground/40" />
                                {bc.href ? (
                                    <Link href={bc.href} className="text-[11px] text-muted-foreground hover:text-foreground hover:underline transition-colors">
                                        {bc.label}
                                    </Link>
                                ) : (
                                    <span className="text-[11px] font-medium text-foreground">
                                        {bc.label}
                                    </span>
                                )}
                            </span>
                        ))}
                    </nav>
                )}
                <h1 className="text-xl font-semibold text-foreground font-serif" style={{ fontFamily: 'var(--font-playfair, serif)' }}>
                    {title}
                </h1>
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}

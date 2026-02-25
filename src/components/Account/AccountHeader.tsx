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
                        <Link href="/hesabim" className="text-[11px]" style={{ color: '#999' }}>
                            Hesabım
                        </Link>
                        {breadcrumbs.map((bc, i) => (
                            <span key={i} className="flex items-center gap-1">
                                <ChevronRight size={12} style={{ color: '#CCC' }} />
                                {bc.href ? (
                                    <Link href={bc.href} className="text-[11px]" style={{ color: '#999' }}>
                                        {bc.label}
                                    </Link>
                                ) : (
                                    <span className="text-[11px] font-medium" style={{ color: '#1C1C1E' }}>
                                        {bc.label}
                                    </span>
                                )}
                            </span>
                        ))}
                    </nav>
                )}
                <h1 className="text-xl font-semibold" style={{ color: '#1C1C1E', fontFamily: 'var(--font-playfair)' }}>
                    {title}
                </h1>
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}

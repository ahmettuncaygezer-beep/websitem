import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/lib/structured-data';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
    const schema = generateBreadcrumbSchema(
        items.map(item => ({ name: item.label, href: item.href }))
    );

    return (
        <>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <nav
                aria-label="Breadcrumb"
                className={`flex items-center h-10 px-4 md:px-6 border-b border-black/5 dark:border-white/5 overflow-x-auto scrollbar-none ${className}`}
            >
                <ol className="flex items-center gap-1 text-[11px] whitespace-nowrap">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;
                        return (
                            <li key={index} className="flex items-center gap-1">
                                {index > 0 && (
                                    <ChevronRight className="w-3 h-3 text-[#ccc] dark:text-[#636366] flex-shrink-0" />
                                )}
                                {isLast || !item.href ? (
                                    <span
                                        className={
                                            isLast
                                                ? 'text-[#1C1C1E] dark:text-[#F5F0EB] font-medium'
                                                : 'text-[#999] dark:text-[#636366]'
                                        }
                                        aria-current={isLast ? 'page' : undefined}
                                    >
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="text-[#999] dark:text-[#636366] hover:text-[#C9A96E] dark:hover:text-[#D4AA6E] transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}

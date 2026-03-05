'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useGlobal } from '@/context/GlobalContext';

export function ViewAllButton() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });
    const { t } = useGlobal();

    return (
        <motion.div
            ref={ref}
            className="mt-12 md:mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <Link
                href="/urunler"
                aria-label={t('cat_view_all_aria') || "Tüm kategorileri görüntüle"}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 md:px-12 md:py-4 overflow-hidden rounded-sm"
                style={{
                    border: '1.5px solid #1C1C1E',
                    color: '#1C1C1E',
                    fontSize: '13px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).querySelector<HTMLSpanElement>('#btn-fill')!.style.transform = 'scaleX(1)';
                    (e.currentTarget as HTMLElement).querySelector<HTMLSpanElement>('#btn-text')!.style.color = 'white';
                    (e.currentTarget as HTMLElement).querySelector<HTMLSpanElement>('#btn-arrow')!.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).querySelector<HTMLSpanElement>('#btn-fill')!.style.transform = 'scaleX(0)';
                    (e.currentTarget as HTMLElement).querySelector<HTMLSpanElement>('#btn-text')!.style.color = '#1C1C1E';
                    (e.currentTarget as HTMLElement).querySelector<HTMLSpanElement>('#btn-arrow')!.style.color = '#1C1C1E';
                }}
            >
                {/* Fill layer */}
                <span
                    id="btn-fill"
                    className="absolute inset-0"
                    style={{
                        background: '#1C1C1E',
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 350ms cubic-bezier(0.25,0.46,0.45,0.94)',
                    }}
                    aria-hidden="true"
                />

                {/* Text */}
                <span
                    id="btn-text"
                    className="relative z-10 transition-colors duration-[350ms]"
                    style={{ color: '#1C1C1E' }}
                >
                    {t('cat_view_all') || "Tümünü Gör"}
                </span>

                {/* Arrow */}
                <span
                    id="btn-arrow"
                    className="relative z-10 transition-all duration-300"
                    style={{ color: '#1C1C1E', transform: 'translateX(0)' }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateX(6px)';
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                    }}
                >
                    <ArrowRight size={16} />
                </span>
            </Link>

            {/* Underline text variant */}
            <Link
                href="/urunler"
                className="mt-4 block text-sm transition-colors duration-200"
                style={{ color: 'rgba(28,28,30,0.5)', textDecoration: 'none' }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#C9A96E';
                    (e.currentTarget as HTMLElement).style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(28,28,30,0.5)';
                    (e.currentTarget as HTMLElement).style.textDecoration = 'none';
                }}
            >
                <span>{t('cat_view_all_desc') || "Tüm kategorilere göz atın"}</span>
            </Link>
        </motion.div>
    );
}

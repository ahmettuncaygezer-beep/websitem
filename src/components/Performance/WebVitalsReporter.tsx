'use client';

import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/web-vitals';

/** Drop this in layout.tsx — reports Core Web Vitals once on mount */
export default function WebVitalsReporter() {
    useEffect(() => {
        reportWebVitals();
    }, []);
    return null;
}

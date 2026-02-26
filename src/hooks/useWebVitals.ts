'use client';

import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/web-vitals';

export function useWebVitals() {
    useEffect(() => {
        reportWebVitals();
    }, []);
}

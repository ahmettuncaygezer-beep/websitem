'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function PageTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lastTrackedPath = useRef<string | null>(null);

    useEffect(() => {
        // 1. Get or Generate Session ID
        let sessionId = localStorage.getItem('selis_session_id');
        if (!sessionId) {
            sessionId = uuidv4();
            localStorage.setItem('selis_session_id', sessionId);
        }

        const currentPath = pathname + searchParams.toString();

        // Avoid double tracking on mount/render if path hasn't changed
        if (lastTrackedPath.current === currentPath) return;
        lastTrackedPath.current = currentPath;

        // 2. Track the view
        const trackView = async () => {
            try {
                // Use beacon if available for non-blocking
                const body = JSON.stringify({
                    pathname,
                    search: searchParams.toString(),
                    sessionId,
                    userAgent: navigator.userAgent,
                    referrer: document.referrer
                });

                if (navigator.sendBeacon) {
                    navigator.sendBeacon('/api/track', body);
                } else {
                    fetch('/api/track', {
                        method: 'POST',
                        body,
                        keepalive: true,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }
            } catch (err) {
                // Fail silently in production to not disrupt UX
                console.warn('[Tracker] Failed to record view:', err);
            }
        };

        trackView();
    }, [pathname, searchParams]);

    return null;
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { NOTIFICATION_POOL } from './socialProof.data';
import type { LiveNotificationData } from './socialProof.data';

interface NotificationState {
    current: LiveNotificationData | null;
    isVisible: boolean;
}

export function useNotifications(
    intervalMs = 8000, // kaç ms'de bir yeni bildirim
    displayMs = 5000 // bildirim kaç ms görünür
) {
    const [state, setState] = useState<NotificationState>({
        current: null,
        isVisible: false,
    });
    const [index, setIndex] = useState(0);
    const [isDismissed, setIsDismissed] = useState(false);

    const showNext = useCallback(
        (currentIndex: number) => {
            if (isDismissed) return;

            const next = NOTIFICATION_POOL[currentIndex % NOTIFICATION_POOL.length];
            setState({ current: next, isVisible: true });

            // displayMs sonra gizle
            setTimeout(() => {
                setState((prev) => ({ ...prev, isVisible: false }));
            }, displayMs);

            setIndex(currentIndex + 1);
        },
        [isDismissed, displayMs]
    );

    const dismiss = useCallback(() => {
        setIsDismissed(true);
        setState({ current: null, isVisible: false });
    }, []);

    useEffect(() => {
        let currentIndex = 0;

        // 3 saniye sonra ilkini göster
        const firstTimer = setTimeout(() => {
            showNext(currentIndex);
            currentIndex++;
        }, 3000);

        // Sonra intervalMs'de bir tekrarla
        const intervalId = setInterval(() => {
            showNext(currentIndex);
            currentIndex++;
        }, intervalMs + displayMs);

        return () => {
            clearTimeout(firstTimer);
            clearInterval(intervalId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // sadece mount'ta çalışsın

    return { ...state, dismiss };
}

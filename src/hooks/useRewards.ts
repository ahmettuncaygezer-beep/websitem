'use client';

import { useState, useMemo, useCallback } from 'react';
import { mockPointTransactions } from '@/data/mock-account';
import { useAuthStore } from '@/store/authStore';
import { TIERS } from '@/types/account.types';
import type { PointTransactionType } from '@/types/account.types';

export function useRewards() {
    const user = useAuthStore((s) => s.user);
    const deductPoints = useAuthStore((s) => s.deductPoints);
    const [filter, setFilter] = useState<PointTransactionType | 'all'>('all');

    const transactions = mockPointTransactions;

    const filteredTransactions = useMemo(() => {
        if (filter === 'all') return transactions;
        return transactions.filter((t) => t.type === filter);
    }, [transactions, filter]);

    const currentTier = useMemo(() => {
        const spent = user?.totalSpent ?? 0;
        return TIERS.find((t) => spent >= t.minSpent && spent < t.maxSpent) ?? TIERS[0];
    }, [user?.totalSpent]);

    const nextTier = useMemo(() => {
        const idx = TIERS.findIndex((t) => t.name === currentTier.name);
        return idx < TIERS.length - 1 ? TIERS[idx + 1] : null;
    }, [currentTier]);

    const tierProgress = useMemo(() => {
        if (!nextTier) return 100;
        const spent = user?.totalSpent ?? 0;
        const range = nextTier.minSpent - currentTier.minSpent;
        const progress = spent - currentTier.minSpent;
        return Math.min(100, Math.round((progress / range) * 100));
    }, [user?.totalSpent, currentTier, nextTier]);

    const amountToNextTier = useMemo(() => {
        if (!nextTier) return 0;
        return Math.max(0, nextTier.minSpent - (user?.totalSpent ?? 0));
    }, [user?.totalSpent, nextTier]);

    const pointsValue = useMemo(() => {
        return Math.floor((user?.points ?? 0) / 10);
    }, [user?.points]);

    const expiringPoints = useMemo(() => {
        const now = new Date();
        const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        return transactions
            .filter((t) => t.type === 'earned' && t.expiresAt && new Date(t.expiresAt) <= thirtyDays && new Date(t.expiresAt) > now)
            .reduce((sum, t) => sum + t.points, 0);
    }, [transactions]);

    const redeemPoints = useCallback(
        (amount: number) => {
            if (!user || amount > user.points) return null;
            deductPoints(amount);
            const code = `PUAN${amount}`;
            return { code, value: Math.floor(amount / 10) };
        },
        [user, deductPoints]
    );

    return {
        points: user?.points ?? 0,
        pointsValue,
        currentTier,
        nextTier,
        tierProgress,
        amountToNextTier,
        transactions,
        filteredTransactions,
        filter,
        setFilter,
        expiringPoints,
        redeemPoints,
        allTiers: TIERS,
    };
}

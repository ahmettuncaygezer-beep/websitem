'use client';

import { useState, useMemo, useCallback } from 'react';
import { mockOrders } from '@/data/mock-account';
import type { Order, OrderStatus } from '@/types/account.types';

export function useOrders() {
    const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
    const orders = mockOrders;

    const filteredOrders = useMemo(() => {
        if (filter === 'all') return orders;
        return orders.filter((o) => o.status === filter);
    }, [orders, filter]);

    const getOrder = useCallback(
        (id: string): Order | undefined => {
            return orders.find((o) => o.id === id);
        },
        [orders]
    );

    const activeOrders = useMemo(() => {
        return orders.filter((o) => ['pending', 'confirmed', 'preparing', 'shipped'].includes(o.status));
    }, [orders]);

    const statusCounts = useMemo(() => {
        const counts: Record<string, number> = { all: orders.length };
        orders.forEach((o) => {
            counts[o.status] = (counts[o.status] || 0) + 1;
        });
        return counts;
    }, [orders]);

    return {
        orders,
        filteredOrders,
        filter,
        setFilter,
        getOrder,
        activeOrders,
        statusCounts,
    };
}

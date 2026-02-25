'use client';

import { use } from 'react';
import { OrderDetail } from '@/components/Account/Orders/OrderDetail';

export default function SiparisDetayPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = use(params);
    return <OrderDetail orderId={orderId} />;
}

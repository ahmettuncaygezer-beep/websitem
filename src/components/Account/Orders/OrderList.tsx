'use client';

import { useOrders } from '@/hooks/useOrders';
import { OrderFilter } from './OrderFilter';
import { OrderCard } from './OrderCard';
import { AccountHeader } from '../AccountHeader';

export function OrderList() {
    const { filteredOrders, filter, setFilter, statusCounts } = useOrders();

    return (
        <div>
            <AccountHeader title="Siparişlerim" breadcrumbs={[{ label: 'Siparişlerim' }]} />
            <OrderFilter filter={filter} onChange={setFilter} counts={statusCounts} />
            {filteredOrders.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-5xl mb-4">📦</p>
                    <p className="text-[15px] font-semibold" style={{ color: '#1C1C1E' }}>Sipariş bulunamadı</p>
                    <p className="text-[13px] mt-1" style={{ color: '#999' }}>Bu kategoride sipariş yok.</p>
                </div>
            ) : (
                filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
            )}
        </div>
    );
}

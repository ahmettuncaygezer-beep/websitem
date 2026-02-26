'use client';

import ComparisonTable from '@/components/Marketing/ComparisonTable';
import { useComparisonStore } from '@/store/comparisonStore';

export function ComparisonClientWrapper() {
    const { products } = useComparisonStore();
    return <ComparisonTable products={products} />;
}

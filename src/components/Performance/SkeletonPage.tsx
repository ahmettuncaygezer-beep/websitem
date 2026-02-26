import SkeletonCard from './SkeletonCard';
import SkeletonText from './SkeletonText';

interface SkeletonPageProps {
    cards?: number;
}

export default function SkeletonPage({ cards = 8 }: SkeletonPageProps) {
    return (
        <div className="min-h-screen bg-white dark:bg-[#1C1C1E]" aria-hidden="true">
            {/* Hero */}
            <div className="skeleton w-full h-[480px] md:h-[600px] rounded-none" />

            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Sayfa başlığı */}
                <div className="mb-8 flex flex-col gap-3">
                    <div className="skeleton h-3 w-24 rounded-sm" />
                    <SkeletonText lines={2} widths={['40%', '25%']} gap="gap-3" />
                </div>

                {/* Filtreler */}
                <div className="flex gap-2 mb-8">
                    {[60, 80, 70, 90, 65].map((w, i) => (
                        <div key={i} className="skeleton h-8 rounded-full flex-shrink-0" style={{ width: w }} />
                    ))}
                </div>

                {/* Ürün grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                    {Array.from({ length: cards }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}

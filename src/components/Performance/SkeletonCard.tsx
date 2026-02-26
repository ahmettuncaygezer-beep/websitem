/** Ürün kartıyla birebir aynı boyut ve layout */
export default function SkeletonCard() {
    return (
        <div className="flex flex-col gap-3" aria-hidden="true">
            {/* Görsel alanı */}
            <div className="skeleton aspect-[3/4] w-full rounded-sm" />
            {/* Marka */}
            <div className="skeleton h-3 w-1/4 rounded-sm" />
            {/* Ürün adı */}
            <div className="skeleton h-4 w-3/4 rounded-sm" />
            {/* Fiyat */}
            <div className="flex items-center gap-2">
                <div className="skeleton h-5 w-1/3 rounded-sm" />
                <div className="skeleton h-3 w-1/4 rounded-sm opacity-60" />
            </div>
        </div>
    );
}

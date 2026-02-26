interface SkeletonTextProps {
    lines?: number;
    widths?: (string | number)[];
    className?: string;
    gap?: string;
}

export default function SkeletonText({
    lines = 3,
    widths,
    className = '',
    gap = 'gap-2',
}: SkeletonTextProps) {
    const defaultWidths = ['100%', '85%', '60%', '75%', '50%'];

    return (
        <div className={`flex flex-col ${gap} ${className}`} aria-hidden="true">
            {Array.from({ length: lines }).map((_, i) => {
                const w = widths?.[i] ?? defaultWidths[i % defaultWidths.length];
                return (
                    <div
                        key={i}
                        className="skeleton h-4 rounded-sm"
                        style={{ width: w }}
                    />
                );
            })}
        </div>
    );
}

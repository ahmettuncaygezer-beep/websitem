export function LoadingSkeleton({ className = '', count = 1 }: { className?: string; count?: number }) {
    return (
        <div className={className}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="animate-pulse mb-4">
                    <div className="h-4 rounded mb-3" style={{ background: '#F0EDE8', width: '60%' }} />
                    <div className="h-32 rounded" style={{ background: '#F0EDE8' }} />
                </div>
            ))}
        </div>
    );
}

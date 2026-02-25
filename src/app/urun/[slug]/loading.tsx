export default function ProductLoading() {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 animate-pulse">
            <div className="grid md:grid-cols-2 lg:gap-16 gap-8">
                {/* Gallery skeleton */}
                <div>
                    <div className="w-full rounded-sm" style={{ aspectRatio: '4/5', background: '#F5F0EB' }} />
                    <div className="flex gap-2 mt-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="rounded-sm" style={{ width: 72, height: 90, background: '#F0EDE8' }} />
                        ))}
                    </div>
                </div>

                {/* Info skeleton */}
                <div className="space-y-4">
                    <div className="h-3 w-24 rounded" style={{ background: '#F0EDE8' }} />
                    <div className="h-8 w-3/4 rounded" style={{ background: '#F0EDE8' }} />
                    <div className="h-4 w-1/3 rounded" style={{ background: '#F0EDE8' }} />
                    <div className="h-10 w-1/2 rounded mt-6" style={{ background: '#F0EDE8' }} />
                    <div className="flex gap-2 mt-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-10 h-10 rounded" style={{ background: '#F0EDE8' }} />
                        ))}
                    </div>
                    <div className="h-12 w-full rounded mt-6" style={{ background: '#F0EDE8' }} />
                    <div className="flex gap-3 mt-3">
                        <div className="h-11 flex-1 rounded" style={{ background: '#F0EDE8' }} />
                        <div className="h-11 flex-1 rounded" style={{ background: '#F0EDE8' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

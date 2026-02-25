'use client';

export function ARButton() {
    return (
        <button
            className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2.5 font-medium transition-all duration-200"
            style={{
                fontSize: '12px',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '2px',
                color: '#1C1C1E',
                zIndex: 10,
                cursor: 'pointer',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'white'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.92)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            aria-label="3D modelde incele"
        >
            <span style={{ fontSize: '16px' }}>🪑</span>
            <span className="hidden sm:inline">3D&apos;de İncele</span>
            <span className="sm:hidden">AR</span>
        </button>
    );
}

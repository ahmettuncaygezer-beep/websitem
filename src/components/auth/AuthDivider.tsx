'use client';

export function AuthDivider() {
    return (
        <div className="flex items-center gap-3 my-4 px-8">
            <div className="flex-1 h-px" style={{ background: '#E8E3DC' }} />
            <span className="text-[11px] uppercase tracking-wider" style={{ color: '#999' }} data-lang-key="auth_divider_or">
                veya
            </span>
            <div className="flex-1 h-px" style={{ background: '#E8E3DC' }} />
        </div>
    );
}

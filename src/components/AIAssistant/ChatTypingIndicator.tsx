'use client';

export function ChatTypingIndicator() {
    return (
        <div className="flex items-start gap-2 px-4 py-2">
            <div className="flex-shrink-0 flex items-center justify-center"
                style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #C9A96E, #B8915A)' }}>
                <span style={{ fontSize: 12, color: 'white' }}>AI</span>
            </div>
            <div className="flex items-center gap-1 px-4 py-3"
                style={{ background: '#F5F0EB', borderRadius: '4px 16px 16px 16px' }}>
                {[0, 1, 2].map((i) => (
                    <span key={i} style={{
                        width: 8, height: 8, borderRadius: '50%', background: '#999', display: 'inline-block',
                        animation: `bounce-dot 1.5s infinite`, animationDelay: `${i * 150}ms`,
                    }} />
                ))}
            </div>
            <style jsx>{`
        @keyframes bounce-dot {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
        </div>
    );
}

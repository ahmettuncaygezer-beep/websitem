'use client';

interface CategoryBadgeProps {
    text: string;
    textKey?: string;
    variant?: 'glass' | 'gold';
    isHovered?: boolean;
}

export function CategoryBadge({
    text,
    textKey,
    variant = 'glass',
    isHovered = false,
}: CategoryBadgeProps) {
    if (variant === 'gold') {
        return (
            <span
                className="inline-flex items-center px-3 py-1 rounded-full font-medium tracking-wide"
                style={{
                    fontSize: '10px',
                    background: '#C9A96E',
                    color: '#1C1C1E',
                }}
                data-lang-key={textKey}
                suppressHydrationWarning
            >
                {text}
            </span>
        );
    }

    return (
        <span
            className="inline-flex items-center px-3 py-1 rounded-full font-medium tracking-wide transition-all duration-300"
            style={{
                fontSize: '11px',
                color: 'white',
                background: isHovered
                    ? 'rgba(201,169,110,0.8)'
                    : 'rgba(255,255,255,0.15)',
                border: `1px solid ${isHovered ? 'rgba(201,169,110,0.4)' : 'rgba(255,255,255,0.25)'
                    }`,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
            }}
            data-lang-key={textKey}
            suppressHydrationWarning
        >
            {text}
        </span>
    );
}

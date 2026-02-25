'use client';

interface CompareButtonProps {
    isCompared: boolean;
    onToggle: () => void;
    isCardHovered: boolean;
    productName: string;
}

export function CompareButton({
    isCompared,
    onToggle,
    isCardHovered,
    productName,
}: CompareButtonProps) {
    return (
        <button
            aria-label={
                isCompared
                    ? `${productName} karşılaştırmadan çıkar`
                    : `${productName} karşılaştırmaya ekle`
            }
            aria-pressed={isCompared}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle();
            }}
            className="transition-all duration-200"
            style={{
                fontSize: '11px',
                color: isCompared ? '#C9A96E' : '#999',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                opacity: isCardHovered || isCompared ? 1 : 0,
                pointerEvents: isCardHovered || isCompared ? 'auto' : 'none',
            }}
            onMouseEnter={(e) => {
                if (!isCompared) (e.currentTarget as HTMLElement).style.color = '#1C1C1E';
            }}
            onMouseLeave={(e) => {
                if (!isCompared) (e.currentTarget as HTMLElement).style.color = '#999';
            }}
        >
            {isCompared ? '✓ Eklendi' : '⊕ Karşılaştır'}
        </button>
    );
}

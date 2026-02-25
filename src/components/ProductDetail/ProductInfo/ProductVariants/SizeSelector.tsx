'use client';

interface SizeOption { id: string; label: string; inStock: boolean; }
interface Props { sizes: SizeOption[]; selectedId: string; onSelect: (id: string) => void; onOpenGuide?: () => void; }

export function SizeSelector({ sizes, selectedId, onSelect, onOpenGuide }: Props) {
    return (
        <div className="mt-5">
            <div className="flex items-center justify-between">
                <span className="uppercase font-medium" style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#999' }}>Boyut:</span>
                {onOpenGuide && (
                    <button onClick={onOpenGuide} className="text-[12px] transition-colors duration-150" style={{ color: '#C9A96E', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                        📏 Boyut Rehberi
                    </button>
                )}
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
                {sizes.map((s) => {
                    const isActive = s.id === selectedId;
                    return (
                        <button key={s.id} disabled={!s.inStock} onClick={() => s.inStock && onSelect(s.id)}
                            className="px-4 py-2 font-medium transition-all duration-200"
                            style={{
                                fontSize: '12px', borderRadius: '2px', cursor: s.inStock ? 'pointer' : 'not-allowed',
                                background: isActive ? '#1C1C1E' : 'transparent', color: isActive ? 'white' : '#1C1C1E',
                                border: isActive ? '1px solid #1C1C1E' : '1px solid #DDD',
                                opacity: s.inStock ? 1 : 0.4, textDecoration: s.inStock ? 'none' : 'line-through',
                            }}>
                            {s.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

'use client';

interface SizeOption { id: string; label: string; inStock: boolean; }
interface Props { sizes: SizeOption[]; selectedId: string; onSelect: (id: string) => void; onOpenGuide?: () => void; }

export function SizeSelector({ sizes, selectedId, onSelect, onOpenGuide }: Props) {
    return (
        <div className="mt-5">
            <div className="flex items-center justify-between">
                <span className="uppercase font-medium text-muted-foreground" style={{ fontSize: '12px', letterSpacing: '0.15em' }} data-lang-key="pdp_size">Boyut:</span>
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
                            className={`px-4 py-2 font-medium transition-all duration-200 border rounded-sm text-[12px] ${isActive
                                ? 'bg-foreground text-background border-foreground'
                                : 'bg-transparent text-foreground border-border'
                                } ${s.inStock ? 'cursor-pointer' : 'cursor-not-allowed opacity-40 line-through'}`}>
                            {s.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

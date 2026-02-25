'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProductColor } from './product.types';

interface ProductCardColorsProps {
    colors: ProductColor[];
    selectedId: string;
    onSelect: (id: string) => void;
}

export function ProductCardColors({
    colors,
    selectedId,
    onSelect,
}: ProductCardColorsProps) {
    const [tooltipId, setTooltipId] = useState<string | null>(null);
    const maxVisible = 4;
    const visible = colors.slice(0, maxVisible);
    const extra = colors.length - maxVisible;

    return (
        <div
            className="flex items-center gap-1.5 mt-2"
            role="radiogroup"
            aria-label="Renk seçin"
        >
            {visible.map((c) => {
                const selected = c.id === selectedId;
                return (
                    <div key={c.id} className="relative">
                        <button
                            role="radio"
                            aria-checked={selected}
                            aria-label={`${c.name} rengini seç${!c.inStock ? ' (stokta yok)' : ''}`}
                            disabled={!c.inStock}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (c.inStock) onSelect(c.id);
                            }}
                            onMouseEnter={() => setTooltipId(c.id)}
                            onMouseLeave={() => setTooltipId(null)}
                            className="relative w-4 h-4 rounded-full transition-transform duration-150"
                            style={{
                                background: c.hex,
                                border: selected ? '1.5px solid #1C1C1E' : '1.5px solid transparent',
                                outline: selected ? '2px solid white' : 'none',
                                outlineOffset: '1px',
                                transform: selected ? 'scale(1.15)' : 'scale(1)',
                                opacity: c.inStock ? 1 : 0.35,
                                cursor: c.inStock ? 'pointer' : 'not-allowed',
                                boxShadow: selected ? '0 0 0 1px #1C1C1E' : 'none',
                            }}
                        >
                            {/* Out-of-stock diagonal line */}
                            {!c.inStock && (
                                <span
                                    className="absolute inset-0 rounded-full overflow-hidden"
                                    aria-hidden="true"
                                >
                                    <span
                                        className="absolute top-1/2 left-0 w-full"
                                        style={{
                                            height: '1px',
                                            background: '#E53935',
                                            transform: 'rotate(-45deg)',
                                            transformOrigin: 'center',
                                        }}
                                    />
                                </span>
                            )}
                        </button>

                        {/* Tooltip */}
                        <AnimatePresence>
                            {tooltipId === c.id && (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8, y: 4 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-sm whitespace-nowrap pointer-events-none"
                                    style={{
                                        fontSize: '10px',
                                        background: '#1C1C1E',
                                        color: 'white',
                                        zIndex: 20,
                                    }}
                                >
                                    {c.name}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}

            {/* +N extra indicator */}
            {extra > 0 && (
                <span
                    className="flex items-center justify-center w-4 h-4 rounded-full"
                    style={{
                        background: '#F5F0EB',
                        border: '1px solid #ddd',
                        fontSize: '9px',
                        color: '#666',
                    }}
                    title={`+${extra} renk daha`}
                >
                    +{extra}
                </span>
            )}
        </div>
    );
}

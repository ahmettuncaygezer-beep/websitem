'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import type { ProductColor } from '@/components/ProductCard/product.types';

interface Props { colors: ProductColor[]; selectedId: string; onSelect: (id: string) => void; }

export function ColorSelector({ colors, selectedId, onSelect }: Props) {
    const [tooltip, setTooltip] = useState<string | null>(null);
    const selected = colors.find((c) => c.id === selectedId);

    return (
        <div className="mt-6">
            <div className="flex items-center justify-between">
                <span className="uppercase font-medium" style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#999' }}>Renk:</span>
                <span className="text-[12px] font-medium" style={{ color: '#1C1C1E' }}>{selected?.name}</span>
            </div>
            <div className="flex flex-wrap gap-2.5 mt-3" role="radiogroup" aria-label="Renk seçin">
                {colors.map((c) => {
                    const isActive = c.id === selectedId;
                    return (
                        <div key={c.id} className="relative">
                            <button
                                role="radio" aria-checked={isActive} aria-label={`${c.name} rengini seç${!c.inStock ? ' (stokta yok)' : ''}`}
                                disabled={!c.inStock}
                                onClick={() => c.inStock && c.id && onSelect(c.id)}
                                onMouseEnter={() => c.id && setTooltip(c.id)}
                                onMouseLeave={() => setTooltip(null)}
                                className="relative overflow-hidden flex items-center justify-center transition-transform duration-150"
                                style={{
                                    width: 40, height: 40, borderRadius: '4px', background: c.hex, cursor: c.inStock ? 'pointer' : 'not-allowed',
                                    border: isActive ? '1.5px solid #C9A96E' : '1.5px solid transparent',
                                    boxShadow: isActive ? '0 0 0 3px rgba(201,169,110,0.25), inset 0 0 0 1px rgba(0,0,0,0.1)' : 'inset 0 0 0 1px rgba(0,0,0,0.1)',
                                    opacity: c.inStock ? 1 : 0.3,
                                    transform: isActive ? 'scale(1.08)' : 'scale(1)',
                                }}
                            >
                                {isActive && <Check size={16} color="white" strokeWidth={2.5} style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }} />}
                                {!c.inStock && (
                                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 40"><line x1="0" y1="40" x2="40" y2="0" stroke="#E53935" strokeWidth="2" /></svg>
                                )}
                            </button>
                            <AnimatePresence>
                                {tooltip === c.id && (
                                    <motion.span initial={{ opacity: 0, scale: 0.8, y: 4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }}
                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-sm whitespace-nowrap pointer-events-none"
                                        style={{ fontSize: '10px', background: '#1C1C1E', color: 'white', zIndex: 20 }}>
                                        {c.inStock ? c.name : `${c.name} — Stokta yok`}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

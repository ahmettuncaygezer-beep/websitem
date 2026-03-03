'use client';

import { motion } from 'framer-motion';

interface Props { value: number; onChange: (v: number) => void; max?: number; }

export function QuantitySelector({ value, onChange, max = 99 }: Props) {
    return (
        <div className="flex items-center mt-4" role="group" aria-label="Adet seçici">
            <button disabled={value <= 1} onClick={() => onChange(value - 1)} aria-label="Azalt"
                className={`flex items-center justify-center font-light text-lg transition-colors duration-150 border border-border rounded-l-sm bg-transparent ${value <= 1 ? 'cursor-not-allowed text-muted-foreground/30' : 'cursor-pointer text-foreground hover:bg-muted'
                    }`}
                style={{ width: 40, height: 40 }}>
                −
            </button>
            <motion.div key={value} initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }}
                className="flex items-center justify-center font-medium border-t border-b border-border text-[15px] text-foreground"
                style={{ width: 56, height: 40 }}>
                {value}
            </motion.div>
            <button disabled={value >= max} onClick={() => onChange(value + 1)} aria-label="Arttır"
                className={`flex items-center justify-center font-light text-lg transition-colors duration-150 border border-border rounded-r-sm bg-transparent ${value >= max ? 'cursor-not-allowed text-muted-foreground/30' : 'cursor-pointer text-foreground hover:bg-muted'
                    }`}
                style={{ width: 40, height: 40 }}>
                +
            </button>
        </div>
    );
}

'use client';

import { motion } from 'framer-motion';

interface Props { value: number; onChange: (v: number) => void; max?: number; }

export function QuantitySelector({ value, onChange, max = 99 }: Props) {
    return (
        <div className="flex items-center mt-4" role="group" aria-label="Adet seçici">
            <button disabled={value <= 1} onClick={() => onChange(value - 1)} aria-label="Azalt"
                className="flex items-center justify-center font-light text-lg transition-colors duration-150"
                style={{ width: 40, height: 40, border: '1px solid #E0E0E0', borderRadius: '2px 0 0 2px', background: 'transparent', cursor: value <= 1 ? 'not-allowed' : 'pointer', color: value <= 1 ? '#CCC' : '#1C1C1E' }}>
                −
            </button>
            <motion.div key={value} initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }}
                className="flex items-center justify-center font-medium"
                style={{ width: 56, height: 40, borderTop: '1px solid #E0E0E0', borderBottom: '1px solid #E0E0E0', fontSize: '15px', color: '#1C1C1E' }}>
                {value}
            </motion.div>
            <button disabled={value >= max} onClick={() => onChange(value + 1)} aria-label="Arttır"
                className="flex items-center justify-center font-light text-lg transition-colors duration-150"
                style={{ width: 40, height: 40, border: '1px solid #E0E0E0', borderRadius: '0 2px 2px 0', background: 'transparent', cursor: value >= max ? 'not-allowed' : 'pointer', color: value >= max ? '#CCC' : '#1C1C1E' }}>
                +
            </button>
        </div>
    );
}

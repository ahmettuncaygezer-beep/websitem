'use client';

import { CreditCard, Landmark, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
    activeMethod: 'card' | 'bank' | 'cod';
    onSelect: (m: 'card' | 'bank' | 'cod') => void;
}

export function PaymentMethods({ activeMethod, onSelect }: Props) {
    const methods = [
        { id: 'card', label: 'Banka/Kredi Kartı', icon: CreditCard },
        { id: 'bank', label: 'Havale/EFT', icon: Landmark },
        { id: 'cod', label: 'Kapıda Ödeme', icon: Truck },
    ] as const;

    return (
        <div className="flex border-b border-[#F0EDE8]">
            {methods.map((m) => (
                <button
                    key={m.id}
                    onClick={() => onSelect(m.id)}
                    className={`relative flex-1 py-4 flex flex-col items-center gap-2 transition-all ${activeMethod === m.id ? 'text-[#1C1C1E]' : 'text-[#999] hover:text-[#666]'}`}
                >
                    <m.icon size={20} strokeWidth={activeMethod === m.id ? 2 : 1.5} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">{m.label}</span>

                    {activeMethod === m.id && (
                        <motion.div
                            layoutId="activePaymentTab"
                            className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#C9A96E]"
                        />
                    )}
                </button>
            ))}
        </div>
    );
}

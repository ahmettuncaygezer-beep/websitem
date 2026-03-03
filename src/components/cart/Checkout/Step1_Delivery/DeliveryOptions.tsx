'use client';

import { Truck, Zap, Gift } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface Props {
    selectedMethod: 'standard' | 'express';
    onSelect: (m: 'standard' | 'express') => void;
}

export function DeliveryOptions({ selectedMethod, onSelect }: Props) {
    const { totalPrice: subtotal } = useCart();
    const isFreeEligible = subtotal >= 5000;

    const methods = [
        {
            id: 'standard',
            title: 'Standart Kargo',
            desc: '3-7 iş günü içinde teslimat',
            price: isFreeEligible ? 0 : 149,
            icon: isFreeEligible ? Gift : Truck,
            color: 'var(--foreground)'
        },
        {
            id: 'express',
            title: 'Hızlı Kargo ⚡',
            desc: '1-2 iş günü içinde teslimat',
            price: 299,
            icon: Zap,
            color: 'var(--selis-gold)'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {methods.map((m) => (
                <label
                    key={m.id}
                    className={`relative p-5 border-2 rounded-xl cursor-pointer transition-all flex items-start gap-4 ${selectedMethod === m.id ? 'border-selis-gold bg-selis-gold/10' : 'border-border bg-card hover:border-foreground'}`}
                >
                    <input
                        type="radio"
                        name="shipping"
                        className="sr-only"
                        checked={selectedMethod === m.id}
                        onChange={() => onSelect(m.id as any)}
                    />

                    <div className="p-3 bg-background rounded-lg shadow-sm" style={{ color: m.color }}>
                        <m.icon size={24} />
                    </div>

                    <div className="flex-1">
                        <h4 className="text-[14px] font-bold text-foreground">{m.title}</h4>
                        <p className="text-[12px] text-muted-foreground mt-0.5">{m.desc}</p>
                        <p className="text-[14px] font-bold mt-2" style={{ color: m.price === 0 ? 'var(--selis-gold)' : 'var(--foreground)' }}>
                            {m.price === 0 ? 'Ücretsiz' : `₺${m.price.toLocaleString('tr-TR')}`}
                        </p>
                    </div>

                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedMethod === m.id ? 'border-selis-gold' : 'border-border'}`}>
                        {selectedMethod === m.id && <div className="w-2.5 h-2.5 bg-selis-gold rounded-full" />}
                    </div>
                </label>
            ))}
        </div>
    );
}

'use client';

import { Check } from 'lucide-react';
import type { CheckoutStep } from '../hooks/useCheckout';

const STEPS: { id: CheckoutStep; label: string }[] = [
    { id: 'delivery', label: 'Teslimat' },
    { id: 'payment', label: 'Ödeme' },
    { id: 'review', label: 'Onay' },
];

export function CheckoutSteps({ currentStep }: { currentStep: CheckoutStep }) {
    const currentIndex = STEPS.findIndex(s => s.id === currentStep);

    return (
        <div className="flex items-center justify-center gap-4 sm:gap-12">
            {STEPS.map((step, index) => {
                const isCompleted = index < currentIndex;
                const isActive = index === currentIndex;

                return (
                    <div key={step.id} className="flex items-center gap-3">
                        <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-500
              ${isCompleted ? 'bg-selis-gold text-white' : isActive ? 'bg-foreground text-background scale-110 shadow-lg' : 'bg-background border border-border text-muted-foreground'}
            `}>
                            {isCompleted ? <Check size={16} /> : index + 1}
                        </div>
                        <span className={`
              text-[12px] font-bold uppercase tracking-widest hidden sm:inline
              ${isActive ? 'text-foreground' : 'text-muted-foreground'}
            `}>
                            {step.label}
                        </span>
                        {index < STEPS.length - 1 && (
                            <div className="w-8 sm:w-16 h-px bg-border ml-2 hidden sm:block" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

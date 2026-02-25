import { useState, useCallback } from 'react';

export type CheckoutStep = 'delivery' | 'payment' | 'review';

export function useCheckout() {
    const [currentStep, setCurrentStep] = useState<CheckoutStep>('delivery');

    const goToStep = useCallback((step: CheckoutStep) => {
        setCurrentStep(step);
        window.scrollTo(0, 0);
    }, []);

    const nextStep = useCallback(() => {
        if (currentStep === 'delivery') goToStep('payment');
        else if (currentStep === 'payment') goToStep('review');
    }, [currentStep, goToStep]);

    const prevStep = useCallback(() => {
        if (currentStep === 'payment') goToStep('delivery');
        else if (currentStep === 'review') goToStep('payment');
    }, [currentStep, goToStep]);

    return {
        currentStep,
        goToStep,
        nextStep,
        prevStep,
    };
}

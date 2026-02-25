'use client';

import { useCheckout } from '@/components/cart/hooks/useCheckout';
import { CheckoutSteps } from '@/components/cart/Checkout/CheckoutSteps';
import { CheckoutSummary } from '@/components/cart/Checkout/CheckoutSummary';
import { Step1_Delivery } from '@/components/cart/Checkout/Step1_Delivery';
import { Step2_Payment } from '@/components/cart/Checkout/Step2_Payment';
import { Step3_Review } from '@/components/cart/Checkout/Step3_Review';
import { AnimatePresence, motion } from 'framer-motion';

export function Checkout() {
    const { currentStep, nextStep, prevStep } = useCheckout();

    return (
        <div className="bg-[#F5F0EB] min-h-screen">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h1 className="font-serif text-3xl text-[#1C1C1E] mb-8 text-center">Ödeme İşlemi</h1>

                <CheckoutSteps currentStep={currentStep} />

                <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Main Form Area */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {currentStep === 'delivery' && (
                                <motion.div
                                    key="delivery"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Step1_Delivery onNext={nextStep} />
                                </motion.div>
                            )}

                            {currentStep === 'payment' && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Step2_Payment onNext={nextStep} onPrev={prevStep} />
                                </motion.div>
                            )}

                            {currentStep === 'review' && (
                                <motion.div
                                    key="review"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Step3_Review onPrev={prevStep} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Sticky Summary */}
                    <div className="lg:col-span-4 sticky top-24">
                        <CheckoutSummary />
                    </div>
                </div>
            </div>
        </div>
    );
}

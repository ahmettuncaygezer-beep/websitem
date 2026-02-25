'use client';

import { useState } from 'react';
import { AddressForm } from './AddressForm';
import { SavedAddresses } from './SavedAddresses';
import { DeliveryOptions } from './DeliveryOptions';

interface Props {
    onNext: () => void;
}

export function Step1_Delivery({ onNext }: Props) {
    const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 rounded-xl border border-[#E8E3DC] shadow-sm">
                <h2 className="font-serif text-2xl text-[#1C1C1E] mb-6">Teslimat Bilgileri</h2>

                {/* In a real app, logic to show SavedAddresses if logged in */}
                <SavedAddresses />

                <div className="mt-8 pt-8 border-t border-[#F0EDE8]">
                    <h3 className="text-[14px] font-bold text-[#1C1C1E] uppercase tracking-wider mb-6">
                        Yeni Teslimat Adresi
                    </h3>
                    <AddressForm onSubmit={onNext} />
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-[#E8E3DC] shadow-sm">
                <h2 className="font-serif text-2xl text-[#1C1C1E] mb-6">Kargo Seçenekleri</h2>
                <DeliveryOptions
                    selectedMethod={shippingMethod}
                    onSelect={setShippingMethod}
                />
            </div>
        </div>
    );
}

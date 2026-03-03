'use client';

import Image from 'next/image';
import { ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useGlobal } from '@/context/GlobalContext';

const FREE_SHIPPING_THRESHOLD = 5000;

export function CheckoutSummary() {
    const { t, formatPrice } = useGlobal();
    const { items, totalPrice } = useCart();

    const shippingCost = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : 199;
    const total = totalPrice + shippingCost;

    return (
        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
            <div className="bg-muted/30 px-5 py-4 border-b border-border">
                <h3 className="text-[14px] font-bold text-foreground uppercase tracking-wider">{t('cart_summary_title')}</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">{items.length} {t('checkout_different_items')}</p>
            </div>

            <div className="max-h-[300px] overflow-y-auto px-5 divide-y divide-border">
                {items.map((item) => (
                    <div key={item.id} className="py-4 flex gap-4">
                        <div className="relative w-16 h-16 bg-muted rounded border border-border flex-shrink-0 overflow-hidden">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[13px] font-medium text-foreground leading-tight line-clamp-2">{item.name}</h4>
                            <p className="text-[11px] text-muted-foreground mt-1">
                                {item.selectedColor && `${item.selectedColor} | `}{t('checkout_quantity')}: {item.quantity}
                            </p>
                            <p className="text-[13px] font-bold text-foreground mt-1">
                                {formatPrice(item.price * item.quantity)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-5 border-t border-border bg-card space-y-2">
                <div className="flex justify-between text-[13px]">
                    <span className="text-muted-foreground">{t('cart_subtotal')}</span>
                    <span className="font-medium text-foreground">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                    <span className="text-muted-foreground">{t('cart_shipping')}</span>
                    <span className={`font-medium ${shippingCost === 0 ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>
                        {shippingCost === 0 ? t('cart_free') : formatPrice(shippingCost)}
                    </span>
                </div>
                <div className="pt-3 border-t border-dashed border-border mt-2 flex justify-between items-end">
                    <span className="text-[14px] font-bold text-foreground">{t('cart_total')}</span>
                    <span className="text-xl font-bold text-selis-gold">{formatPrice(total)}</span>
                </div>
            </div>

            {/* Trust Grid */}
            <div className="p-5 border-t border-dashed border-border grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-selis-gold" />
                    <span className="text-[10px] text-muted-foreground font-medium">{t('checkout_secure_ssl')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <RefreshCw size={14} className="text-selis-gold" />
                    <span className="text-[10px] text-muted-foreground font-medium">{t('trust_return_title')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Truck size={14} className="text-selis-gold" />
                    <span className="text-[10px] text-muted-foreground font-medium">{t('checkout_insured_shipping')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Star size={14} className="text-selis-gold" />
                    <span className="text-[10px] text-muted-foreground font-medium">{t('trust_warranty_title')}</span>
                </div>
            </div>
        </div>
    );
}

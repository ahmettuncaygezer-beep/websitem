'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Truck, RefreshCw, Star, Tag, CheckCircle, X, Loader2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useGlobal } from '@/context/GlobalContext';

const FREE_SHIPPING_THRESHOLD = 5000;

interface CouponResult {
    valid: boolean;
    campaignId?: string;
    campaignName?: string;
    discountAmount?: number;
    freeShipping?: boolean;
    message?: string;
    error?: string;
}

export function CheckoutSummary() {
    const { t, formatPrice } = useGlobal();
    const { items, totalPrice } = useCart();

    const [couponCode, setCouponCode] = useState('');
    const [couponLoading, setCouponLoading] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState<CouponResult | null>(null);
    const [couponError, setCouponError] = useState('');

    const discountAmount = appliedCoupon?.valid ? (appliedCoupon.discountAmount || 0) : 0;
    const hasFreeShipping = appliedCoupon?.valid && appliedCoupon.freeShipping;
    const shippingCost = hasFreeShipping || totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : 199;
    const total = totalPrice - discountAmount + shippingCost;

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setCouponLoading(true);
        setCouponError('');
        setAppliedCoupon(null);

        try {
            const res = await fetch('/api/checkout/coupon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: couponCode.trim(),
                    cartTotal: totalPrice,
                    productIds: items.map(item => item.id),
                    // We don't have categoryIds directly here, but could be extracted if cart item had it properly
                    // For now sending an empty array as categories unless it's added to cart items
                    categoryIds: []
                })
            });

            const data = await res.json();

            if (data.success) {
                setAppliedCoupon({
                    valid: true,
                    discountAmount: data.discount_amount,
                    freeShipping: data.discount_type === 'free_shipping',
                    message: data.discount_type === 'percentage' ? '% İndirim uygulandı' : 'İndirim uygulandı'
                });
                setCouponError('');
            } else {
                setCouponError(data.error || 'Geçersiz kupon kodu');
                setAppliedCoupon(null);
            }
        } catch {
            setCouponError('Kupon doğrulanamadı. Tekrar deneyin.');
        } finally {
            setCouponLoading(false);
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode('');
        setCouponError('');
    };

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

            {/* Coupon Code Section */}
            <div className="px-5 py-4 border-t border-border bg-muted/10">
                {appliedCoupon?.valid ? (
                    <div className="flex items-center justify-between bg-green-500/5 border border-green-500/20 rounded-md px-3 py-2.5">
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <div>
                                <span className="text-[12px] font-bold text-green-500">{couponCode.toUpperCase()}</span>
                                <span className="text-[11px] text-muted-foreground ml-2">{appliedCoupon.message}</span>
                            </div>
                        </div>
                        <button onClick={handleRemoveCoupon} className="text-muted-foreground hover:text-foreground transition-colors">
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder={t('checkout_coupon_placeholder') || 'Kupon kodu girin'}
                                    value={couponCode}
                                    onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCouponError(''); }}
                                    onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                                    className="w-full bg-background border border-border rounded-md py-2 pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-selis-gold/50 transition-colors"
                                />
                            </div>
                            <button
                                onClick={handleApplyCoupon}
                                disabled={couponLoading || !couponCode.trim()}
                                className="bg-selis-gold/10 border border-selis-gold/20 text-selis-gold px-4 py-2 rounded-md text-[12px] font-bold hover:bg-selis-gold/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                            >
                                {couponLoading ? <Loader2 size={14} className="animate-spin" /> : null}
                                {couponLoading ? '...' : t('checkout_apply') || 'Uygula'}
                            </button>
                        </div>
                        {couponError && (
                            <p className="text-[11px] text-red-500 mt-2 flex items-center gap-1">
                                <X size={12} /> {couponError}
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="p-5 border-t border-border bg-card space-y-2">
                <div className="flex justify-between text-[13px]">
                    <span className="text-muted-foreground">{t('cart_subtotal')}</span>
                    <span className="font-medium text-foreground">{formatPrice(totalPrice)}</span>
                </div>

                {discountAmount > 0 && (
                    <div className="flex justify-between text-[13px]">
                        <span className="text-green-500 flex items-center gap-1">
                            <Tag size={12} /> {t('checkout_discount') || 'İndirim'}
                        </span>
                        <span className="font-medium text-green-500">-{formatPrice(discountAmount)}</span>
                    </div>
                )}

                <div className="flex justify-between text-[13px]">
                    <span className="text-muted-foreground">{t('cart_shipping')}</span>
                    <span className={`font-medium ${shippingCost === 0 ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>
                        {shippingCost === 0 ? t('cart_free') : formatPrice(shippingCost)}
                        {hasFreeShipping && <span className="text-[10px] ml-1">(Kupon)</span>}
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

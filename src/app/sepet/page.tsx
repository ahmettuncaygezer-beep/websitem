'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowLeft, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
    const { items, totalItems, closeCart } = useCart();

    return (
        <main className="min-h-screen bg-[#FAFAF8] pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-[13px] text-[#999] hover:text-[#1C1C1E] transition-colors mb-4 group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span data-lang-key="continue_shopping">Alışverişe Devam Et</span>
                        </Link>
                        <h1 className="text-[32px] font-serif uppercase tracking-wider text-[#1C1C1E]" data-lang-key="cart_title">Alışveriş Sepetim</h1>
                    </div>
                    {totalItems > 0 && (
                        <div className="text-right">
                            <span className="text-[14px] text-[#666]">{totalItems} <span data-lang-key="cart_items_selected">ürün seçildi</span></span>
                        </div>
                    )}
                </div>

                {items.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 shadow-sm flex flex-center items-center justify-center min-h-[400px]">
                        <EmptyCart onClose={() => { }} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Items List */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8E3DC]/30">
                                <div className="p-8 space-y-0 divide-y divide-[#E8E3DC]">
                                    <AnimatePresence initial={false}>
                                        {items.map(item => (
                                            <div key={item.product.id} className="py-6 first:pt-0 last:pb-0">
                                                <CartItem item={item} />
                                            </div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-2xl border border-[#E8E3DC]/30 flex flex-col items-center text-center">
                                    <ShieldCheck className="text-[#C9A96E] mb-3" size={24} />
                                    <h3 className="text-[12px] font-bold uppercase tracking-wider mb-1" data-lang-key="cart_trust_sec_title">Güvenli Ödeme</h3>
                                    <p className="text-[11px] text-[#999]" data-lang-key="cart_trust_sec_desc">256-bit SSL koruması</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-[#E8E3DC]/30 flex flex-col items-center text-center">
                                    <Truck className="text-[#C9A96E] mb-3" size={24} />
                                    <h3 className="text-[12px] font-bold uppercase tracking-wider mb-1" data-lang-key="cart_trust_del_title">Ücretsiz Teslimat</h3>
                                    <p className="text-[11px] text-[#999]" data-lang-key="cart_trust_del_desc">5.000 TL üzeri siparişlerde</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-[#E8E3DC]/30 flex flex-col items-center text-center">
                                    <RefreshCw className="text-[#C9A96E] mb-3" size={24} />
                                    <h3 className="text-[12px] font-bold uppercase tracking-wider mb-1" data-lang-key="cart_trust_ret_title">Kolay İade</h3>
                                    <p className="text-[11px] text-[#999]" data-lang-key="cart_trust_ret_desc">30 gün iade garantisi</p>
                                </div>
                            </div>
                        </div>

                        {/* Summary Sticky */}
                        <div className="lg:col-span-4 sticky top-32">
                            <div className="bg-white rounded-2xl shadow-xl border border-[#E8E3DC]/30 overflow-hidden">
                                <div className="p-8 bg-[#1C1C1E] text-white">
                                    <h2 className="text-[16px] font-serif uppercase tracking-[0.2em]" data-lang-key="cart_summary_title">Sipariş Özeti</h2>
                                </div>
                                <CartSummary />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

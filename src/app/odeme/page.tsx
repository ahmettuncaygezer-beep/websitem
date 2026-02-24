'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/constants';
import { CreditCard, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    const { items, totalPrice } = useCart();
    const [step, setStep] = useState<1 | 2>(1);
    const shipping = totalPrice() >= 5000 ? 0 : 490;
    const total = totalPrice() + shipping;

    return (
        <div className="bg-sand min-h-screen">
            <div className="container-premium py-10">
                {/* Back */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-sans text-warm-gray hover:text-charcoal transition-colors mb-8"
                >
                    <ArrowLeft size={16} />
                    Alışverişe Dön
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-3"
                    >
                        <h1 className="font-serif text-3xl mb-8">Ödeme</h1>

                        {/* Steps */}
                        <div className="flex items-center gap-4 mb-10">
                            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-gold' : 'text-warm-gray-light'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans font-semibold ${step >= 1 ? 'bg-gold text-white' : 'bg-border text-warm-gray'}`}>
                                    1
                                </div>
                                <span className="text-sm font-sans font-medium">Bilgiler</span>
                            </div>
                            <div className="flex-1 h-px bg-border" />
                            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-gold' : 'text-warm-gray-light'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans font-semibold ${step >= 2 ? 'bg-gold text-white' : 'bg-border text-warm-gray'}`}>
                                    2
                                </div>
                                <span className="text-sm font-sans font-medium">Ödeme</span>
                            </div>
                        </div>

                        {step === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                {/* Guest checkout option */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-serif text-lg">İletişim Bilgileri</h3>
                                        <button className="text-xs font-sans text-gold hover:text-gold-dark transition-colors uppercase tracking-wider">
                                            Giriş Yap
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-sans font-medium text-warm-gray mb-1.5">
                                                    Ad
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Adınız"
                                                    className="w-full px-4 py-3 border border-border rounded-xl font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-sans font-medium text-warm-gray mb-1.5">
                                                    Soyad
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Soyadınız"
                                                    className="w-full px-4 py-3 border border-border rounded-xl font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-sans font-medium text-warm-gray mb-1.5">
                                                E-posta
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="ornek@email.com"
                                                className="w-full px-4 py-3 border border-border rounded-xl font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-sans font-medium text-warm-gray mb-1.5">
                                                Telefon
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="+90 555 000 00 00"
                                                className="w-full px-4 py-3 border border-border rounded-xl font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping address */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h3 className="font-serif text-lg mb-6">Teslimat Adresi</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-sans font-medium text-warm-gray mb-1.5">
                                                Adres
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Sokak ve bina numarası"
                                                className="w-full px-4 py-3 border border-border rounded-xl font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-sans font-medium text-warm-gray mb-1.5">
                                                    İl
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="İstanbul"
                                                    className="w-full px-4 py-3 border border-border rounded-xl font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-sans font-medium text-warm-gray mb-1.5">
                                                    İlçe
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Kadıköy"
                                                    className="w-full px-4 py-3 border border-border rounded-xl font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-sans font-medium text-warm-gray mb-1.5">
                                                Posta Kodu
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="34000"
                                                className="w-full px-4 py-3 border border-border rounded-xl font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full py-4 bg-gold text-white font-sans font-semibold text-sm uppercase tracking-widest rounded-full hover:bg-gold-dark transition-colors"
                                >
                                    Ödemeye Devam Et
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                {/* Payment methods */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h3 className="font-serif text-lg mb-6">Ödeme Yöntemi</h3>

                                    {/* Quick pay buttons */}
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        <button className="flex items-center justify-center gap-2 py-3.5 bg-charcoal text-white rounded-xl text-sm font-sans font-semibold hover:bg-charcoal/90 transition-colors">
                                            Apple Pay
                                        </button>
                                        <button className="flex items-center justify-center gap-2 py-3.5 bg-white border border-border rounded-xl text-sm font-sans font-semibold hover:bg-sand transition-colors">
                                            Google Pay
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex-1 h-px bg-border" />
                                        <span className="text-xs font-sans text-warm-gray-light uppercase tracking-wider">veya</span>
                                        <div className="flex-1 h-px bg-border" />
                                    </div>

                                    {/* Card form */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-sans font-medium text-warm-gray mb-1.5">
                                                Kart Numarası
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="1234 5678 9012 3456"
                                                    className="w-full px-4 py-3 pr-12 border border-border rounded-xl font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                                                />
                                                <CreditCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray-light" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-sans font-medium text-warm-gray mb-1.5">
                                                    Son Kullanma
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="AA/YY"
                                                    className="w-full px-4 py-3 border border-border rounded-xl font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-sans font-medium text-warm-gray mb-1.5">
                                                    CVV
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="123"
                                                    className="w-full px-4 py-3 border border-border rounded-xl font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="px-8 py-4 border-2 border-border text-charcoal font-sans font-semibold text-sm uppercase tracking-widest rounded-full hover:bg-sand transition-colors"
                                    >
                                        Geri
                                    </button>
                                    <button className="flex-1 py-4 bg-gold text-white font-sans font-semibold text-sm uppercase tracking-widest rounded-full hover:bg-gold-dark transition-colors">
                                        Siparişi Tamamla — {formatPrice(total)}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Order summary */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-28">
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h3 className="font-serif text-lg mb-6">Sipariş Özeti</h3>

                                {/* Items */}
                                <div className="space-y-4 mb-6">
                                    {items.length === 0 ? (
                                        <p className="text-sm font-sans text-warm-gray text-center py-8">
                                            Sepetiniz boş
                                        </p>
                                    ) : (
                                        items.map((item) => (
                                            <div key={item.product.id} className="flex gap-4">
                                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-sand to-linen flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-serif text-sm truncate">{item.product.name}</p>
                                                    <p className="text-xs font-sans text-warm-gray-light">Adet: {item.quantity}</p>
                                                </div>
                                                <p className="font-sans font-semibold text-sm">
                                                    {formatPrice((item.product.salePrice || item.product.price) * item.quantity)}
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Totals */}
                                <div className="border-t border-border pt-4 space-y-3">
                                    <div className="flex justify-between text-sm font-sans">
                                        <span className="text-warm-gray">Ara Toplam</span>
                                        <span>{formatPrice(totalPrice())}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-sans">
                                        <span className="text-warm-gray">Kargo</span>
                                        <span className={shipping === 0 ? 'text-sage font-medium' : ''}>
                                            {shipping === 0 ? 'Ücretsiz' : formatPrice(shipping)}
                                        </span>
                                    </div>
                                    <div className="border-t border-border pt-3 flex justify-between">
                                        <span className="font-serif text-lg">Toplam</span>
                                        <span className="font-sans font-bold text-xl">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                {/* Estimated delivery */}
                                <div className="mt-6 p-4 bg-sand rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Truck size={18} className="text-gold" />
                                        <div>
                                            <p className="text-xs font-sans font-medium">Tahmini Teslimat</p>
                                            <p className="text-xs font-sans text-warm-gray">3-7 İş Günü</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust badges */}
                            <div className="flex items-center justify-center gap-6 mt-6">
                                <div className="flex items-center gap-1.5 text-xs font-sans text-warm-gray-light">
                                    <ShieldCheck size={14} className="text-sage" />
                                    SSL Güvenli
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-sans text-warm-gray-light">
                                    <ShieldCheck size={14} className="text-sage" />
                                    256-bit Şifreleme
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

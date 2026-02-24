'use client';

import { motion } from 'framer-motion';
import { OrderTracking } from '@/components/order/OrderTracking';
import { DeliveryScheduler } from '@/components/order/DeliveryScheduler';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function TrackingPage() {
    return (
        <div className="bg-[#FAFAFA] min-h-screen">
            {/* Header / Breadcrumb */}
            <div className="container-premium pt-32 pb-12">
                <nav className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-warm-gray-light mb-8">
                    <Link href="/" className="hover:text-gold transition-colors">Ana Sayfa</Link>
                    <ChevronRight size={14} />
                    <Link href="/hesabim" className="hover:text-gold transition-colors">Hesabım</Link>
                    <ChevronRight size={14} />
                    <span className="text-charcoal underline underline-offset-4 decoration-gold decoration-2">Sipariş Takibi</span>
                </nav>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl"
                >
                    <h1 className="text-5xl md:text-6xl font-serif text-charcoal mb-6">Sipariş Durumu</h1>
                    <p className="text-lg font-sans text-warm-gray">
                        Mobilyanızın zanaat yolculuğunu takip edin ve size en uygun teslimat zamanını seçin.
                    </p>
                </motion.div>
            </div>

            <div className="container-premium pb-24 space-y-12">
                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-12">
                        <OrderTracking />
                    </div>
                    <div className="lg:col-span-12">
                        <DeliveryScheduler />
                    </div>
                </div>

                {/* Help Section */}
                <div className="bg-charcoal rounded-[2rem] p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <div className="relative z-10">
                        <h2 className="text-3xl font-serif mb-4">Bir sorunuz mu var?</h2>
                        <p className="text-white/60 font-sans mb-8 max-w-md mx-auto">
                            Siparişiniz veya teslimat süreciniz hakkında detaylı bilgi için butik danışmanlarımızla iletişime geçebilirsiniz.
                        </p>
                        <button className="px-10 py-4 bg-white text-charcoal rounded-full font-sans font-bold tracking-widest uppercase hover:bg-gold hover:text-white transition-all duration-500">
                            Danışmanla Görüş
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

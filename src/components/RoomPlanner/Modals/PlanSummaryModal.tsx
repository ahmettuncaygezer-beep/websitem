'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';
import { usePlannerStore } from '../plannerStore';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/constants';
import { useRouter } from 'next/navigation';

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function PlanSummaryModal({ open, onClose }: Props) {
    const items = usePlannerStore((s) => s.items);
    const { addItem } = useCart();
    const router = useRouter();

    const totalPrice = items.reduce((sum, item) => sum + (item.product?.price || 0), 0);

    const handleFinish = () => {
        // Add all items to cart
        items.forEach((item) => {
            if (item.product) {
                // Pass the precise fields that CartContext's addItem expects (CartProduct)
                addItem({
                    id: item.product.id,
                    name: item.product.name,
                    brand: item.product.brand || 'SELIS Exclusive',
                    price: item.product.price,
                    image: item.product.image,
                    href: item.product.originalHref || `/urun/${item.product.id}`
                });
            }
        });
        // Success feedback and redirect
        router.push('/sepet');
    };

    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center z-[100] px-4"
                style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.2)]"
                >
                    {/* Header */}
                    <div className="relative h-32 bg-[#1C1C1E] flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(168,137,86,0.3),transparent)]" />
                        </div>
                        <div className="relative text-center">
                            <CheckCircle2 className="text-gold mx-auto mb-2" size={32} />
                            <h2 className="text-white text-[18px] font-serif uppercase tracking-[0.2em]" data-lang-key="plan_summary_title">Plan Özeti</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <div className="space-y-4 max-h-[300px] overflow-y-auto mb-8 pr-2">
                            {items.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[#F8F6F3] border border-[#E8E3DC]/10">
                                    <div className="w-16 h-16 rounded-lg bg-white p-2 flex items-center justify-center">
                                        <img src={item.product?.image} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[13px] font-semibold text-[#1C1C1E]">{item.name}</h3>
                                        <p className="text-[11px] text-[#999]">{item.product?.brand || 'SELIS Exclusive'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[13px] font-bold text-[#C9A96E]">{formatPrice(item.product?.price || 0)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between py-4 border-t border-[#E8E3DC]">
                            <span className="text-[14px] text-[#666]">
                                <span data-lang-key="plan_total_amount">Toplam Tutar</span> ({items.length} <span data-lang-key="plan_product_count">Ürün</span>)
                            </span>
                            <span className="text-[20px] font-bold text-[#1C1C1E]">{formatPrice(totalPrice)}</span>
                        </div>

                        {/* CTA Buttons */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <button
                                onClick={onClose}
                                className="py-4 text-[13px] font-bold uppercase tracking-widest text-[#1C1C1E] border border-[#E8E3DC] hover:bg-[#F8F6F3] rounded-sm transition-all"
                                data-lang-key="plan_continue_edit"
                            >
                                Düzenlemeye Devam
                            </button>
                            <button
                                onClick={handleFinish}
                                className="group relative py-4 bg-[#1C1C1E] text-white overflow-hidden rounded-sm transition-all hover:bg-[#C9A96E]"
                            >
                                <div className="relative z-10 flex items-center justify-center gap-2 text-[13px] font-bold uppercase tracking-widest">
                                    <ShoppingBag size={16} />
                                    <span data-lang-key="plan_add_and_finish">Sepete Ekle & Bitir</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

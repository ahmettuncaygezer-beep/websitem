'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star, MessageSquare, Check, X,
    MoreHorizontal, Share2, Flag,
    ChevronDown, User, ShoppingBag,
    Award
} from 'lucide-react';
import { Review } from '@/types/reviews';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ReviewReplyForm } from './ReviewReplyForm';

interface ReviewCardProps {
    review: Review;
    onStatusChange: (id: string, status: Review['status']) => void;
}

export function ReviewCard({ review, onStatusChange }: ReviewCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [showActions, setShowActions] = useState(false);

    const getStatusStyle = (status: Review['status']) => {
        switch (status) {
            case 'pending': return { color: '#FFD60A', bg: 'rgba(255, 214, 10, 0.1)', label: 'İnceleniyor' };
            case 'approved': return { color: '#30D158', bg: 'rgba(48, 209, 88, 0.1)', label: 'Yayında' };
            case 'rejected': return { color: '#FF453A', bg: 'rgba(255, 69, 58, 0.1)', label: 'Reddedildi' };
            case 'featured': return { color: '#C9A96E', bg: 'rgba(201, 169, 110, 0.1)', label: 'Öne Çıkan' };
        }
    };

    const statusStyle = getStatusStyle(review.status);

    return (
        <div className={`bg-[#1C1C1E] border rounded-sm transition-all overflow-hidden ${review.status === 'pending' ? 'border-[#FFD60A]/20 border-l-[3px] border-l-[#FFD60A]' : 'border-white/[0.06]'
            }`}>
            <div className="p-5">
                {/* User & Rating Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/10">
                            {review.userAvatar ? (
                                <img src={review.userAvatar} alt={review.userName} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <User size={20} className="text-[#636366]" />
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-[14px] font-semibold text-[#F5F0EB]">{review.userName}</span>
                                {review.isVerifiedPurchase && (
                                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[#30D158]/10 text-[#30D158] rounded-[3px] text-[9px] font-bold uppercase tracking-wider">
                                        <Check size={8} strokeWidth={4} />
                                        Doğrulanmış
                                    </div>
                                )}
                            </div>
                            <div className="text-[11px] text-[#636366] mt-0.5">
                                {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true, locale: tr })}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <div className="flex gap-0.5 mb-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={i < review.rating ? 'text-[#C9A96E]' : 'text-[#636366]'}
                                    fill={i < review.rating ? '#C9A96E' : 'transparent'}
                                />
                            ))}
                        </div>
                        <span className="text-[14px] font-mono font-bold text-[#C9A96E]">{review.rating.toFixed(1)}</span>
                    </div>
                </div>

                {/* Product Reference */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded-sm p-3 flex items-center gap-3 mb-4">
                    <img src={review.productImage} className="w-10 h-10 rounded-sm object-cover" alt="" />
                    <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-medium text-[#AEAEB2] truncate hover:text-[#C9A96E] cursor-pointer transition-colors">
                            {review.productName}
                        </div>
                        <div className="text-[10px] text-[#636366] truncate">
                            ID: {review.productId} • {review.productVariant || 'Standart'}
                        </div>
                    </div>
                    <ShoppingBag size={14} className="text-[#636366]" />
                </div>

                {/* Review Content */}
                <div className="mb-6">
                    {review.title && <h3 className="text-[14px] font-bold text-[#F5F0EB] mb-2">{review.title}</h3>}
                    <div className="relative">
                        <p className={`text-[14px] text-[#AEAEB2] leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
                            {review.content}
                        </p>
                        {review.content.length > 200 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-[12px] font-semibold text-[#C9A96E] mt-2 flex items-center gap-1 hover:underline"
                            >
                                {isExpanded ? 'Kısalt' : 'Devamını Oku'}
                                <ChevronDown size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Photos */}
                {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                        {review.images.map((img, i) => (
                            <div key={i} className="relative w-16 h-16 rounded-sm overflow-hidden group/img cursor-zoom-in">
                                <img src={img} className="w-full h-full object-cover transition-transform group-hover/img:scale-110" alt="" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                                    <Star size={12} className="text-white" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Admin Reply (if exists) */}
                {review.adminReply && (
                    <div className="bg-[#C9A96E]/05 border-l-2 border-[#C9A96E] p-4 ml-2 mb-6 rounded-r-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[11px] font-bold text-[#C9A96E] uppercase tracking-wider">MAISON Yanıtı</span>
                            <span className="text-[10px] text-[#636366]">• {formatDistanceToNow(new Date(review.adminReply.repliedAt), { addSuffix: true, locale: tr })}</span>
                        </div>
                        <p className="text-[13px] text-[#AEAEB2] leading-relaxed">
                            {review.adminReply.content}
                        </p>
                    </div>
                )}

                {/* Actions Footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/[0.04]">
                    <div
                        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] text-[11px] font-bold uppercase tracking-wider"
                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
                    >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusStyle.color }} />
                        {statusStyle.label}
                    </div>

                    <div className="flex items-center gap-3">
                        {review.status === 'pending' ? (
                            <>
                                <button
                                    onClick={() => onStatusChange(review.id, 'approved')}
                                    className="px-4 py-2 bg-[#30D158]/10 hover:bg-[#30D158]/20 text-[#30D158] text-[12px] font-bold rounded-sm transition-all flex items-center gap-2"
                                >
                                    <Check size={14} /> Onayla
                                </button>
                                <button
                                    onClick={() => onStatusChange(review.id, 'rejected')}
                                    className="px-4 py-2 bg-[#FF453A]/10 hover:bg-[#FF453A]/20 text-[#FF453A] text-[12px] font-bold rounded-sm transition-all flex items-center gap-2"
                                >
                                    <X size={14} /> Reddet
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsReplying(true)}
                                className="px-4 py-2 bg-[#C9A96E]/10 hover:bg-[#C9A96E]/20 text-[#C9A96E] text-[12px] font-bold rounded-sm transition-all flex items-center gap-2"
                            >
                                <MessageSquare size={14} />
                                {review.adminReply ? 'Yanıtı Düzenle' : 'Yanıtla'}
                            </button>
                        )}

                        <div className="relative">
                            <button
                                onClick={() => setShowActions(!showActions)}
                                className="p-2 bg-white/[0.04] hover:bg-white/[0.08] text-[#AEAEB2] rounded-sm transition-all"
                            >
                                <MoreHorizontal size={16} />
                            </button>

                            <AnimatePresence>
                                {showActions && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setShowActions(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                            className="absolute right-0 bottom-full mb-2 w-48 bg-[#1C1C1E] border border-white/10 rounded-sm shadow-2xl z-50 overflow-hidden"
                                        >
                                            <button className="w-full text-left px-4 py-3 text-[12px] text-[#AEAEB2] hover:bg-white/05 hover:text-[#C9A96E] flex items-center gap-3 transition-all">
                                                <Award size={14} /> Öne Çıkar
                                            </button>
                                            <button className="w-full text-left px-4 py-3 text-[12px] text-[#AEAEB2] hover:bg-white/05 hover:text-[#C9A96E] flex items-center gap-3 transition-all">
                                                <Share2 size={14} /> Paylaş
                                            </button>
                                            <button className="w-full text-left px-4 py-3 text-[12px] text-[#FF453A] hover:bg-[#FF453A]/10 flex items-center gap-3 transition-all border-t border-white/05">
                                                <Flag size={14} /> Sil
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isReplying && (
                    <ReviewReplyForm
                        onCancel={() => setIsReplying(false)}
                        onSubmit={(reply) => {
                            console.log('Reply submitted:', reply);
                            setIsReplying(false);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

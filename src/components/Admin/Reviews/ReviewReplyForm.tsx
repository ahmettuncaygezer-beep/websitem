'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, X, ShieldCheck } from 'lucide-react';

interface ReviewReplyFormProps {
    onCancel: () => void;
    onSubmit: (reply: string) => void;
}

export function ReviewReplyForm({ onCancel, onSubmit }: ReviewReplyFormProps) {
    const [text, setText] = useState('');
    const templates = [
        'Harika yorumunuz için teşekkürler!',
        'Memnuniyetiniz bizim için çok değerli.',
        'Yaşadığınız sorun için özür dileriz, hemen ilgileneceğiz.',
        'Geri bildiriminiz için teşekkürler, dikkate alacağız.'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.length > 5) onSubmit(text);
    };

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
        >
            <div className="bg-[#242426] border-t border-white/[0.06] p-5">
                <div className="flex items-center gap-2 mb-4 text-[13px] font-medium text-[#C9A96E]">
                    <ShieldCheck size={16} />
                    <span>MAISON olarak yanıtlıyorsunuz</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="relative mb-4">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Müşteriye yanıtınızı buraya yazın..."
                            className="w-full bg-[#1C1C1E] border border-white/10 rounded-sm p-4 text-[14px] text-[#F5F0EB] outline-none focus:border-[#C9A96E]/40 min-h-[100px] resize-y"
                            maxLength={500}
                        />
                        <div className="absolute bottom-3 right-3 text-[11px] text-[#636366]">
                            {text.length}/500
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {templates.map((tpl) => (
                            <button
                                key={tpl}
                                type="button"
                                onClick={() => setText(tpl)}
                                className="text-[11px] bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-[#AEAEB2] px-3 py-1.5 rounded-sm transition-all"
                            >
                                {tpl}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="text-[13px] font-medium text-[#636366] hover:text-[#AEAEB2] px-4 py-2 transition-colors"
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            disabled={text.length < 5}
                            className="bg-[#C9A96E] hover:bg-[#D4B87A] disabled:opacity-50 disabled:cursor-not-allowed text-[#0F0F10] px-6 py-2 rounded-sm text-[13px] font-bold transition-all flex items-center gap-2"
                        >
                            <Send size={14} />
                            Yanıtı Yayınla
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

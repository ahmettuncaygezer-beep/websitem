'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Phone } from 'lucide-react';

interface StockNotifyFormProps {
    productId: string;
    productName: string;
}

type Channel = 'email' | 'sms' | 'whatsapp';

export default function StockNotifyForm({ productId, productName }: StockNotifyFormProps) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [channels, setChannels] = useState<Set<Channel>>(new Set(['email']));
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const toggleChannel = (ch: Channel) => {
        setChannels(prev => {
            const next = new Set(prev);
            if (next.has(ch)) {
                if (next.size === 1) return prev; // en az 1 seçili
                next.delete(ch);
            } else {
                next.add(ch);
            }
            return next;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, productName, email, phone, channels: Array.from(channels) }),
            });
            // localStorage'a kaydet
            const notifyList: string[] = JSON.parse(localStorage.getItem('notifyList') ?? '[]');
            if (!notifyList.includes(productId)) {
                localStorage.setItem('notifyList', JSON.stringify([...notifyList, productId]));
            }
            setDone(true);
        } catch {
            // graceful
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Tetikleyici buton */}
            {!done && (
                <button
                    onClick={() => setOpen(o => !o)}
                    className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#C9A96E] text-[#C9A96E] text-[13px] font-semibold rounded-sm hover:bg-[#C9A96E] hover:text-white transition-all duration-200 group"
                >
                    <Bell className="w-4 h-4 group-hover:animate-pulse" />
                    Tekrar Gelince Haber Ver 🔔
                </button>
            )}

            <AnimatePresence>
                {open && !done && (
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="mt-3 p-4 bg-[#F5F0EB] rounded-sm border border-[#E8E3DC]">
                            <p className="text-[12px] text-[#666] mb-3">
                                Bu ürün stoka girdiğinde size bildirelim.
                            </p>

                            {/* E-posta + Bildir butonu */}
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    placeholder="e-posta@adresiniz.com"
                                    className="flex-1 border border-[#E8E3DC] rounded-sm px-3 py-2 text-[12px] bg-white focus:outline-none focus:border-[#C9A96E] transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-shrink-0 px-4 py-2 bg-[#1C1C1E] text-white text-[12px] font-semibold rounded-sm hover:bg-[#333] transition-colors disabled:opacity-50"
                                >
                                    {loading ? '...' : 'Bildir'}
                                </button>
                            </div>

                            {/* Kanallar */}
                            <div className="flex flex-col gap-2 mb-3">
                                {[
                                    { key: 'email' as Channel, label: 'E-posta bildirimi' },
                                    { key: 'sms' as Channel, label: 'SMS bildirimi' },
                                    { key: 'whatsapp' as Channel, label: 'WhatsApp bildirimi' },
                                ].map(({ key, label }) => (
                                    <label key={key} className="flex items-center gap-2 text-[12px] text-[#444] cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={channels.has(key)}
                                            onChange={() => toggleChannel(key)}
                                            className="accent-[#C9A96E]"
                                        />
                                        {label}
                                        {key === 'sms' && channels.has('sms') && (
                                            <div className="flex items-center gap-1 ml-2">
                                                <Phone className="w-3 h-3 text-[#666]" />
                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={e => setPhone(e.target.value)}
                                                    placeholder="+90 555 000 0000"
                                                    className="border border-[#E8E3DC] rounded-sm px-2 py-1 text-[11px] w-36 focus:outline-none focus:border-[#C9A96E]"
                                                />
                                            </div>
                                        )}
                                    </label>
                                ))}
                            </div>

                            <p className="text-[10px] text-[#aaa]">
                                Stoka girdiğinde bir kez bildirim gönderilir. Başka e-posta almayacaksınız.
                            </p>
                        </div>
                    </motion.form>
                )}

                {/* Başarı mesajı */}
                {done && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 mt-2 p-3 bg-green-50 border border-green-200 rounded-sm text-green-700 text-[13px] font-medium"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 10, stiffness: 200 }}
                            className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"
                        >
                            <Check className="w-3.5 h-3.5 text-white" />
                        </motion.div>
                        Haberdar edileceksiniz ✓
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

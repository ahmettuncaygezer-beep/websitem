'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, User, Bot, Loader2, MessageSquare, Phone, ChevronRight } from 'lucide-react';
import { useChat } from '@ai-sdk/react';

export function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [userInput, setUserInput] = useState('');
    const { messages, status, error, sendMessage, stop } = useChat({
        api: '/api/chat',
        initialMessages: [
            {
                id: 'welcome',
                role: 'assistant',
                content: 'Merhaba. Ben MAISON Dijital Concierge. Size lüks koleksiyonlarımızdan ürün önermek, iç mimari tavsiyeleri vermek veya teslimat sürecinizde yardımcı olmak için buradayım. Size bugün nasıl yardımcı olabilirim?'
            }
        ] as any,
    }) as any;

    const isLoading = status === 'submitted' || status === 'streaming';

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const timer = setTimeout(() => setShowNotification(false), 8000);
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const text = userInput;
        setUserInput('');
        await sendMessage({ text });
    };

    const handleQuickAction = async (text: string) => {
        if (isLoading) return;
        await sendMessage({ text });
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] font-sans">
            {/* Notification Bubble */}
            <AnimatePresence>
                {showNotification && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.8 }}
                        className="absolute bottom-20 right-0 mb-2 w-max bg-white border border-border shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3 cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-charcoal">Size nasıl yardımcı olabilirim?</span>
                        <X size={14} className="text-warm-gray hover:text-charcoal" onClick={(e) => { e.stopPropagation(); setShowNotification(false); }} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-500 ${isOpen ? 'bg-white text-charcoal border border-border' : 'bg-charcoal text-white'
                    }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                            <Sparkles size={24} className="text-gold" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        className="absolute bottom-20 right-0 w-[420px] h-[650px] bg-white border border-border/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] rounded-[32px] flex flex-col overflow-hidden backdrop-blur-xl"
                    >
                        {/* Luxury Header */}
                        <div className="p-6 bg-white border-b border-sand/30 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-charcoal rounded-2xl flex items-center justify-center transform rotate-3 shadow-lg">
                                        <Sparkles size={20} className="text-gold" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-charcoal tracking-tight">MAISON Concierge</h3>
                                    <p className="text-[11px] font-bold text-warm-gray uppercase tracking-[0.2em]">Dijital Tasarım Asistanı</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2.5 hover:bg-sand/40 rounded-full transition-all text-warm-gray">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth scrollbar-thin scrollbar-thumb-sand"
                        >
                            {messages.map((m: any) => (
                                <motion.div
                                    key={m.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-4 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${m.role === 'user' ? 'bg-sand/30 border border-sand/50' : 'bg-charcoal text-white'
                                            }`}>
                                            {m.role === 'user' ? <User size={16} className="text-charcoal" /> : <Bot size={16} className="text-gold" />}
                                        </div>
                                        <div className={`group relative p-4 rounded-[24px] text-sm leading-relaxed ${m.role === 'user'
                                            ? 'bg-charcoal text-white rounded-tr-none shadow-gold/5 shadow-xl'
                                            : 'bg-sand/10 border border-sand/20 rounded-tl-none text-charcoal'
                                            }`}>
                                            {(m as any).content}
                                            {m.role === 'assistant' && (
                                                <div className="absolute -bottom-5 left-1 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-warm-gray">
                                                    MAISON AI tarafından yanıtlandı
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing / Loading Animation */}
                            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                                <div className="flex justify-start">
                                    <div className="flex gap-4">
                                        <div className="w-9 h-9 rounded-xl bg-charcoal flex items-center justify-center flex-shrink-0">
                                            <Bot size={16} className="text-gold" />
                                        </div>
                                        <div className="bg-sand/10 border border-sand/20 p-4 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                                            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                                            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                                            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Error State */}
                            {error && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-red-600">
                                        <X size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-red-800">Sistem Yoğunluğu</p>
                                        <p className="text-[11px] text-red-700 leading-normal mt-1">Şu an sunucularımızda bir yoğunluk var, lütfen müşteri hizmetleri numaramızdan bize ulaşın.</p>
                                        <button className="mt-2 text-[10px] font-bold uppercase tracking-wider text-red-800 flex items-center gap-1">
                                            <Phone size={10} /> 0850 305 00 00
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white border-t border-sand/20">
                            {/* Suggestions */}
                            <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {['# Keten Koltuk', '# İade Politikası', '# Lüks Dekorasyon'].map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => handleQuickAction(tag.replace('# ', ''))}
                                        className="whitespace-nowrap px-4 py-2 bg-sand/20 hover:bg-sand/40 border border-sand/30 rounded-full text-[11px] font-bold text-charcoal/70 transition-all active:scale-95"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit} className="relative group">
                                <input
                                    value={userInput}
                                    onChange={handleInputChange}
                                    placeholder="Bir soru sorun..."
                                    className="w-full pl-6 pr-14 py-4 bg-sand/10 border border-sand/30 rounded-[20px] focus:bg-white focus:border-gold/30 focus:ring-4 focus:ring-gold/5 outline-none text-sm transition-all placeholder:text-warm-gray/60"
                                />
                                <button
                                    type="submit"
                                    disabled={!userInput || isLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-charcoal text-white rounded-16 flex items-center justify-center hover:bg-black transition-all disabled:opacity-20 disabled:grayscale"
                                >
                                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                </button>
                            </form>
                            <p className="mt-3 text-center text-[9px] text-warm-gray/50 uppercase tracking-[0.1em] font-medium">
                                MAISON Concierge · Estetik ve Konforun Buluşma Noktası
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

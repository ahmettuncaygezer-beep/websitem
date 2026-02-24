'use client';

import { motion } from 'framer-motion';
import {
    MessageSquare,
    User,
    Sparkles,
    Handshake,
    Send,
    Search,
    Clock,
    UserPlus
} from 'lucide-react';

const activeChats = [
    { id: '1', user: 'Elif Yıldız', lastMsg: 'Sipariş durumumu görebilir miyim?', time: '2 dk önce', status: 'ai', priority: 'high' },
    { id: '2', user: 'Can Özkan', lastMsg: 'Modern bir koltuk takımı arıyorum.', time: '5 dk önce', status: 'ai', priority: 'medium' },
    { id: '3', user: 'Selin Demir', lastMsg: 'İç mimar ile görüşmek istiyorum.', time: '12 dk önce', status: 'human', priority: 'vip' },
];

export default function AdminConciergePage() {
    return (
        <div className="h-full flex gap-8">
            {/* List of Chats */}
            <div className="w-96 flex flex-col gap-6">
                <div>
                    <h1 className="text-2xl font-serif text-charcoal">Concierge Inbox</h1>
                    <p className="text-xs font-sans text-warm-gray mt-1">AI ve canlı destek görüşmeleri.</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" size={16} />
                    <input placeholder="Sohbet veya müşteri ara..." className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-2xl text-xs font-sans outline-none focus:ring-2 focus:ring-gold/20" />
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-hide">
                    {activeChats.map((chat) => (
                        <motion.div
                            key={chat.id}
                            whileHover={{ x: 4 }}
                            className={`p-5 rounded-3xl border transition-all cursor-pointer ${chat.status === 'human' ? 'bg-gold/5 border-gold shadow-sm' : 'bg-white border-border'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    {chat.status === 'ai' ? <Sparkles size={12} className="text-gold" /> : <User size={12} className="text-charcoal" />}
                                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-warm-gray">
                                        {chat.status === 'ai' ? 'AI Yönetiminde' : 'Bana Bağlı'}
                                    </span>
                                </div>
                                <span className="text-[10px] font-sans text-warm-gray">{chat.time}</span>
                            </div>
                            <div className="text-sm font-sans font-bold text-charcoal mb-1">{chat.user}</div>
                            <div className="text-xs font-sans text-warm-gray line-clamp-1">{chat.lastMsg}</div>

                            {chat.priority === 'vip' && (
                                <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-0.5 bg-charcoal text-white text-[9px] font-sans font-bold uppercase rounded-full tracking-tighter">
                                    <UserPlus size={10} /> VIP Müşteri
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 bg-white rounded-[40px] border border-border shadow-sm flex flex-col overflow-hidden">
                {/* Chat Header */}
                <div className="p-8 border-b border-border flex items-center justify-between bg-sand/5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center font-serif text-white">S</div>
                        <div>
                            <div className="text-sm font-sans font-bold text-charcoal">Selin Demir</div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-[10px] font-sans font-bold text-warm-gray uppercase tracking-widest">Çevrimiçi</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-border rounded-xl text-[10px] font-sans font-bold uppercase tracking-widest hover:bg-gold hover:text-white hover:border-gold transition-all">
                            <Clock size={16} /> Sipariş Geçmişi
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-charcoal text-white rounded-xl text-[10px] font-sans font-bold uppercase tracking-widest hover:bg-black transition-all">
                            <Handshake size={16} /> Devral
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-8 space-y-6 overflow-y-auto scrollbar-hide bg-[#FBFBFA]">
                    <div className="flex justify-center">
                        <span className="px-4 py-1.5 bg-sand/30 rounded-full text-[10px] font-sans font-bold text-warm-gray uppercase tracking-widest">Görüşme 1 saat önce başladı</span>
                    </div>

                    <div className="flex justify-start items-end gap-3">
                        <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center text-charcoal"><User size={14} /></div>
                        <div className="max-w-[70%] p-4 bg-white border border-border rounded-2xl rounded-bl-none text-sm font-sans shadow-sm">
                            Merhaba, aldığım sipariş (MSN-48194) üzerinde bir değişiklik yapmak istiyorum.
                        </div>
                    </div>

                    <div className="flex justify-start items-end gap-3">
                        <div className="w-8 h-8 rounded-full bg-charcoal flex items-center justify-center text-gold"><Sparkles size={14} /></div>
                        <div className="max-w-[70%] p-4 bg-white border border-border rounded-2xl rounded-bl-none text-sm font-sans shadow-sm italic text-warm-gray">
                            AI Asistanı cevap veriyor: "Tabii ki Selin Hanım, siparişiniz şu an atölye aşamasında. Ne gibi bir değişiklik yapmak istersiniz?"
                        </div>
                    </div>

                    <div className="flex justify-start items-end gap-3 pt-6">
                        <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center text-charcoal"><User size={14} /></div>
                        <div className="max-w-[70%] p-4 bg-white border border-border rounded-2xl rounded-bl-none text-sm font-sans shadow-sm">
                            Kumaş rengini antrasit yerine lüks kadife lacivert yapmak mümkün mü?
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <span className="px-4 py-2 bg-gold/10 text-gold rounded-xl text-[10px] font-sans font-bold uppercase tracking-widest border border-gold/20">Müşteri İç Mimar bekliyor</span>
                    </div>
                </div>

                {/* Reply */}
                <div className="p-8 border-t border-border bg-white">
                    <div className="relative">
                        <input placeholder="Mesajınızı yazın..." className="w-full pl-6 pr-20 py-4 bg-sand/10 rounded-2xl border-none outline-none text-sm font-sans" />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-charcoal text-white p-3 rounded-xl hover:bg-black transition-all">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

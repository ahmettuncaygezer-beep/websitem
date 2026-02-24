'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const timeSlots = [
    '09:00 - 11:00',
    '11:00 - 13:00',
    '14:00 - 16:00',
    '16:00 - 18:00'
];

const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

export function DeliveryScheduler() {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [confirmed, setConfirmed] = useState(false);

    const handleConfirm = () => {
        if (selectedDate && selectedSlot) {
            setConfirmed(true);
        }
    };

    if (confirmed) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2rem] p-12 text-center border border-sage/20 shadow-xl shadow-sage/5"
            >
                <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-sage" />
                </div>
                <h3 className="text-2xl font-serif text-charcoal mb-4">Randevunuz Alındı</h3>
                <p className="text-sm font-sans text-warm-gray mb-8 max-w-sm mx-auto">
                    Beyaz eldiven ekiplerimiz 24 Şubat tarihinde, {selectedSlot} saatleri arasında kapınızda olacak.
                </p>
                <div className="bg-sand p-6 rounded-2xl inline-block text-left">
                    <div className="flex items-center gap-3 mb-2">
                        <MapPin size={16} className="text-gold" />
                        <span className="text-xs font-sans font-bold uppercase tracking-widest text-charcoal">Nişantaşı, İstanbul</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Calendar size={16} className="text-gold" />
                        <span className="text-xs font-sans font-bold uppercase tracking-widest text-charcoal">24 Şubat 2026</span>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="bg-sand/30 rounded-[2rem] p-8 md:p-12 border border-sand shadow-sm">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <Calendar className="text-gold" size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-serif text-charcoal">Beyaz Eldiven Randevusu</h2>
                    <p className="text-xs font-sans text-warm-gray uppercase tracking-widest font-bold mt-1">
                        Profesyonel Teslimat & Kurulum
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Date Selection */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-sm font-sans font-bold uppercase tracking-widest text-charcoal">Şubat 2026</span>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-white rounded-full transition-colors"><ChevronLeft size={16} /></button>
                            <button className="p-2 hover:bg-white rounded-full transition-colors"><ChevronRight size={16} /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-6 gap-2">
                        {days.map(d => (
                            <div key={d} className="text-center text-[10px] uppercase font-bold text-warm-gray-light pb-2">{d}</div>
                        ))}
                        {[...Array(24)].map((_, i) => {
                            const day = i + 1;
                            const isAvailable = day > 22 && day < 28;
                            return (
                                <button
                                    key={day}
                                    disabled={!isAvailable}
                                    onClick={() => setSelectedDate(day)}
                                    className={`aspect-square rounded-xl text-xs font-sans transition-all flex flex-col items-center justify-center gap-0.5 ${selectedDate === day ? 'bg-charcoal text-white shadow-lg scale-110 z-10' :
                                            isAvailable ? 'bg-white text-charcoal shadow-sm hover:bg-gold hover:text-white' :
                                                'text-warm-gray-light/30'
                                        }`}
                                >
                                    {day}
                                    {isAvailable && <div className={`w-1 h-1 rounded-full ${selectedDate === day ? 'bg-white' : 'bg-gold'}`} />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Slot Selection */}
                <div>
                    <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-charcoal mb-6 flex items-center gap-2">
                        <Clock size={16} className="text-gold" />
                        Saat Seçimi
                    </h3>
                    <div className="space-y-3">
                        {timeSlots.map(slot => (
                            <button
                                key={slot}
                                disabled={!selectedDate}
                                onClick={() => setSelectedSlot(slot)}
                                className={`w-full p-4 rounded-2xl text-xs font-sans font-bold uppercase tracking-widest text-left transition-all border ${selectedSlot === slot ? 'bg-charcoal text-white border-charcoal shadow-lg' :
                                        selectedDate ? 'bg-white text-charcoal border-transparent hover:border-gold' :
                                            'bg-white/50 text-warm-gray-light/50 border-transparent cursor-not-allowed'
                                    }`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleConfirm}
                        disabled={!selectedDate || !selectedSlot}
                        className="w-full mt-8 bg-gold text-white py-4 rounded-2xl font-sans font-bold tracking-widest uppercase hover:bg-charcoal transition-all disabled:opacity-30 disabled:grayscale"
                    >
                        Randevuyu Onayla
                    </button>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-sand flex flex-col md:flex-row gap-6 justify-between">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-sage/10 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle2 size={16} className="text-sage" />
                    </div>
                    <p className="text-[11px] font-sans text-warm-gray uppercase tracking-wider leading-relaxed">
                        Ücretsiz Kurulum & <br /> Ambalaj Atık İmhası Dahildir.
                    </p>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-sage/10 rounded-full flex items-center justify-center shrink-0">
                        <MapPin size={16} className="text-sage" />
                    </div>
                    <p className="text-[11px] font-sans text-warm-gray uppercase tracking-wider leading-relaxed">
                        Teslimat Bölgesi: <br /><span className="font-bold text-charcoal">Beşiktaş, İstanbul</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

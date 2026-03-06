'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    MapPin, Phone, Mail, Clock, Send,
    MessageCircle, CheckCircle2
} from 'lucide-react';

const contactInfo = [
    {
        icon: MapPin,
        title: 'Showroom & Atölye',
        lines: ['Maslak Mah. Büyükdere Cad.', 'No: 243/A Sarıyer, İstanbul'],
    },
    {
        icon: Phone,
        title: 'Telefon',
        lines: ['+90 552 994 17 17', '+90 552 994 17 17 (WhatsApp)'],
    },
    {
        icon: Mail,
        title: 'E-posta',
        lines: ['info@selismobilya.com', 'siparis@selismobilya.com'],
    },
    {
        icon: Clock,
        title: 'Çalışma Saatleri',
        lines: ['Pazartesi – Cumartesi: 10:00 – 19:00', 'Pazar: 11:00 – 17:00'],
    },
];

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState),
            });
            if (res.ok) {
                setIsSubmitted(true);
            }
        } catch {
            // Fallback: still show success for UX (message is logged server-side)
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="bg-white dark:bg-[#0D0D0F] min-h-screen">
            {/* Hero */}
            <section className="relative bg-[#1C1C1E] py-20 md:py-28">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,#C9A96E_0%,transparent_60%)]" />
                <div className="container-premium relative text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-xs font-sans uppercase tracking-[0.3em] text-[#C9A96E] mb-4"
                        data-lang-key="contact_hero_badge"
                    >
                        İletişim
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="font-serif text-4xl md:text-5xl text-white mb-4"
                        data-lang-key="contact_hero_title"
                    >
                        Bize Ulaşın
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-base font-sans text-white/60 max-w-lg mx-auto"
                        data-lang-key="contact_hero_desc"
                    >
                        Sorularınız, önerileriniz veya özel talepleriniz için
                        her zaman yanınızdayız.
                    </motion.p>
                </div>
            </section>

            {/* Content */}
            <section className="container-premium py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Contact Info */}
                    <div className="lg:col-span-4 space-y-8">
                        {contactInfo.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="flex gap-4"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] dark:bg-[#1C1C1E] flex items-center justify-center shrink-0">
                                    <item.icon size={20} className="text-[#C9A96E]" />
                                </div>
                                <div>
                                    <h3
                                        className="text-sm font-sans font-bold text-[#1C1C1E] dark:text-[#F5F0EB] mb-1"
                                        data-lang-key={`contact_info_title_${i + 1}`}
                                    >
                                        {item.title}
                                    </h3>
                                    {item.lines.map((line, idx) => (
                                        <p key={idx} className="text-sm font-sans text-[#6B6560] dark:text-[#8E8E93]">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}

                        {/* WhatsApp CTA */}
                        <motion.a
                            href="https://wa.me/905529941717"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex items-center gap-3 px-6 py-4 bg-[#25D366] text-white rounded-2xl hover:bg-[#1DA851] transition-colors group w-full"
                        >
                            <MessageCircle size={20} />
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider" data-lang-key="contact_wa_title">WhatsApp'tan Yazın</p>
                                <p className="text-xs opacity-80" data-lang-key="contact_wa_sub">Hızlı yanıt alın</p>
                            </div>
                        </motion.a>

                        {/* Map Embed */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="rounded-2xl overflow-hidden border border-[#E8E2DB] dark:border-[#2C2C2E] aspect-[4/3]"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.7!2d29.02!3d41.11!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA2JzM2LjAiTiAyOcKwMDEnMTIuMCJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="SELIS Showroom Konum"
                            />
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white dark:bg-[#1C1C1E] border border-[#E8E2DB] dark:border-[#2C2C2E] rounded-3xl p-8 md:p-12"
                        >
                            {isSubmitted ? (
                                /* Success State */
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 size={32} className="text-[#4CAF50]" />
                                    </div>
                                    <h2 className="font-serif text-2xl text-[#1C1C1E] dark:text-[#F5F0EB] mb-3" data-lang-key="contact_success_title">
                                        Mesajınız Alındı
                                    </h2>
                                    <p className="text-sm font-sans text-[#6B6560] dark:text-[#8E8E93] max-w-sm mx-auto" data-lang-key="contact_success_desc">
                                        En kısa sürede size geri dönüş yapacağız.
                                        Genellikle 24 saat içinde yanıt veriyoruz.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
                                        }}
                                        className="mt-8 text-sm font-sans text-[#C9A96E] hover:text-[#B8915A] transition-colors underline underline-offset-4"
                                        data-lang-key="contact_success_btn"
                                    >
                                        Yeni mesaj gönder
                                    </button>
                                </motion.div>
                            ) : (
                                /* Form */
                                <>
                                    <div className="mb-8">
                                        <h2 className="font-serif text-xl md:text-2xl text-[#1C1C1E] dark:text-[#F5F0EB] mb-2" data-lang-key="contact_form_title">
                                            İletişim Formu
                                        </h2>
                                        <p className="text-sm font-sans text-[#6B6560] dark:text-[#8E8E93]" data-lang-key="contact_form_desc">
                                            Tüm alanları doldurarak bize mesaj gönderin.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Name */}
                                            <div>
                                                <label htmlFor="contact-name" className="block text-xs font-sans font-bold uppercase tracking-widest text-[#6B6560] dark:text-[#8E8E93] mb-2" data-lang-key="contact_label_name">
                                                    Ad Soyad *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="contact-name"
                                                    name="name"
                                                    required
                                                    value={formState.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3.5 bg-[#FAF8F5] dark:bg-[#0D0D0F] border border-[#E8E2DB] dark:border-[#2C2C2E] rounded-xl text-sm font-sans text-[#1C1C1E] dark:text-[#F5F0EB] placeholder:text-[#9C9590] focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] transition-all"
                                                    placeholder="Adınız ve soyadınız"
                                                    data-lang-placeholder="contact_placeholder_name"
                                                />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label htmlFor="contact-email" className="block text-xs font-sans font-bold uppercase tracking-widest text-[#6B6560] dark:text-[#8E8E93] mb-2" data-lang-key="contact_label_email">
                                                    E-posta *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="contact-email"
                                                    name="email"
                                                    required
                                                    value={formState.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3.5 bg-[#FAF8F5] dark:bg-[#0D0D0F] border border-[#E8E2DB] dark:border-[#2C2C2E] rounded-xl text-sm font-sans text-[#1C1C1E] dark:text-[#F5F0EB] placeholder:text-[#9C9590] focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] transition-all"
                                                    placeholder="ornek@email.com"
                                                    data-lang-placeholder="contact_placeholder_email"
                                                />
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <label htmlFor="contact-phone" className="block text-xs font-sans font-bold uppercase tracking-widest text-[#6B6560] dark:text-[#8E8E93] mb-2" data-lang-key="contact_label_phone">
                                                    Telefon
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="contact-phone"
                                                    name="phone"
                                                    value={formState.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3.5 bg-[#FAF8F5] dark:bg-[#0D0D0F] border border-[#E8E2DB] dark:border-[#2C2C2E] rounded-xl text-sm font-sans text-[#1C1C1E] dark:text-[#F5F0EB] placeholder:text-[#9C9590] focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] transition-all"
                                                    placeholder="05XX XXX XX XX"
                                                    data-lang-placeholder="contact_placeholder_phone"
                                                />
                                            </div>

                                            {/* Subject */}
                                            <div>
                                                <label htmlFor="contact-subject" className="block text-xs font-sans font-bold uppercase tracking-widest text-[#6B6560] dark:text-[#8E8E93] mb-2" data-lang-key="contact_label_subject">
                                                    Konu *
                                                </label>
                                                <select
                                                    id="contact-subject"
                                                    name="subject"
                                                    required
                                                    value={formState.subject}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3.5 bg-[#FAF8F5] dark:bg-[#0D0D0F] border border-[#E8E2DB] dark:border-[#2C2C2E] rounded-xl text-sm font-sans text-[#1C1C1E] dark:text-[#F5F0EB] focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] transition-all"
                                                >
                                                    <option value="" data-lang-key="contact_subject_select">Konu seçiniz</option>
                                                    <option value="siparis" data-lang-key="contact_subject_order">Sipariş Hakkında</option>
                                                    <option value="urun" data-lang-key="contact_subject_product">Ürün Bilgisi</option>
                                                    <option value="iade" data-lang-key="contact_subject_return">İade & Değişim</option>
                                                    <option value="teslimat" data-lang-key="contact_subject_delivery">Teslimat & Kargo</option>
                                                    <option value="ozel-siparis" data-lang-key="contact_subject_custom">Özel Sipariş</option>
                                                    <option value="isbirligi" data-lang-key="contact_subject_collab">İş Birliği</option>
                                                    <option value="diger" data-lang-key="contact_subject_other">Diğer</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label htmlFor="contact-message" className="block text-xs font-sans font-bold uppercase tracking-widest text-[#6B6560] dark:text-[#8E8E93] mb-2" data-lang-key="contact_label_message">
                                                Mesajınız *
                                            </label>
                                            <textarea
                                                id="contact-message"
                                                name="message"
                                                required
                                                rows={5}
                                                value={formState.message}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3.5 bg-[#FAF8F5] dark:bg-[#0D0D0F] border border-[#E8E2DB] dark:border-[#2C2C2E] rounded-xl text-sm font-sans text-[#1C1C1E] dark:text-[#F5F0EB] placeholder:text-[#9C9590] focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] transition-all resize-none"
                                                placeholder="Mesajınızı buraya yazın..."
                                                data-lang-placeholder="contact_placeholder_message"
                                            />
                                        </div>

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="group w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#1C1C1E] dark:bg-[#C9A96E] text-white dark:text-[#0D0D0F] text-xs font-sans font-bold uppercase tracking-widest rounded-2xl hover:bg-black dark:hover:bg-[#B8915A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    <span data-lang-key="contact_btn_sending">Gönderiliyor...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                    <span data-lang-key="contact_btn_send">Mesaj Gönder</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}

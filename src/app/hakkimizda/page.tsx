'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Gem, HandMetal, ShieldCheck, ArrowRight } from 'lucide-react';

const values = [
    {
        icon: HandMetal,
        title: 'El İşçiliği',
        description: 'Her parça usta zanaatkarlarımız tarafından özenle üretilir. Makine mükemmelliği değil, insan dokunuşunun sıcaklığı.',
    },
    {
        icon: Leaf,
        title: 'Sürdürülebilirlik',
        description: 'FSC sertifikalı ahşaplar, geri dönüştürülebilir ambalajlar ve düşük karbon ayak izi ile doğaya saygılı üretim.',
    },
    {
        icon: Gem,
        title: 'Premium Malzeme',
        description: 'İtalyan deri, Belçika keteni, Türk mermer — sadece en iyi malzemeler seçilir ve titizlikle işlenir.',
    },
    {
        icon: ShieldCheck,
        title: 'Ömür Boyu Kalite',
        description: '25 yıl garanti ile desteklenen ürünlerimiz, nesiller boyu kullanılmak üzere tasarlanır.',
    },
];

const stats = [
    { number: '15+', label: 'Yıllık Deneyim' },
    { number: '12.000+', label: 'Mutlu Müşteri' },
    { number: '500+', label: 'Ürün Çeşidi' },
    { number: '98%', label: 'Müşteri Memnuniyeti' },
];

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
                <Image
                    src="/images/rooms/lookbook-1.jpg"
                    alt="MAISON Atölye"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-charcoal/50" />
                <div className="relative h-full container-premium flex flex-col justify-center items-center text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-4"
                    >
                        Hikayemiz
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-display text-white"
                    >
                        MAISON
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg font-sans text-white/80 mt-4 max-w-lg"
                    >
                        Doğal malzemeler, zamansız tasarım ve el işçiliğiyle
                        yaşam alanlarınıza anlam katıyoruz.
                    </motion.p>
                </div>
            </section>

            {/* Story */}
            <section className="container-premium py-20 md:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-4">
                            Bir Tutku Hikayesi
                        </p>
                        <h2 className="text-headline text-charcoal mb-6">
                            Evinize Dokunan<br />
                            <span className="italic text-gold">Tasarım Felsefesi</span>
                        </h2>
                        <div className="space-y-4 text-body text-warm-gray">
                            <p>
                                MAISON, 2009 yılında İstanbul&apos;da küçük bir atölyede doğdu. Kurucumuz,
                                İtalya&apos;da mobilya tasarımı eğitimi aldıktan sonra, Anadolu&apos;nun zengin
                                zanaat geleneğini modern Avrupa estetiğiyle buluşturma vizyonuyla yola çıktı.
                            </p>
                            <p>
                                Bugün, 50&apos;den fazla usta zanaatkarımızla birlikte, her parçayı aynı
                                tutkuyla üretmeye devam ediyoruz. Seri üretimin hızına değil, kalıcılığın
                                değerine inanıyoruz.
                            </p>
                            <p>
                                Her MAISON parçası, bir hikaye anlatır — doğal malzemelerin sıcaklığını,
                                insan elinin inceliğini ve zamansız tasarımın zarafetini.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-[4/5] rounded-3xl overflow-hidden"
                    >
                        <Image
                            src="/images/categories/living-room.jpg"
                            alt="MAISON Atölye"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-sand py-20 md:py-28">
                <div className="container-premium">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-14"
                    >
                        <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-4">
                            Değerlerimiz
                        </p>
                        <h2 className="text-headline text-charcoal">
                            Bizi Farklı Kılan
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-5">
                                    <value.icon size={24} className="text-gold" />
                                </div>
                                <h3 className="font-serif text-lg text-charcoal mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-sm font-sans text-warm-gray leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="container-premium py-20 md:py-28">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-14"
                >
                    <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-4">
                        Rakamlarla
                    </p>
                    <h2 className="text-headline text-charcoal">MAISON</h2>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="text-center py-8"
                        >
                            <p className="font-serif text-4xl md:text-5xl text-gold mb-2">
                                {stat.number}
                            </p>
                            <p className="text-sm font-sans uppercase tracking-widest text-warm-gray">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-charcoal py-20">
                <div className="container-premium text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                            Hikayenizi Birlikte Yazalım
                        </h2>
                        <p className="text-base font-sans text-white/60 max-w-lg mx-auto mb-8">
                            Yaşam alanınızı hayal edin, biz gerçeğe dönüştürelim.
                        </p>
                        <Link
                            href="/kategori/oturma-odasi"
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-gold text-white text-sm font-sans font-semibold uppercase tracking-widest rounded-full hover:bg-gold-dark transition-colors duration-500"
                        >
                            Koleksiyonu Keşfet
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

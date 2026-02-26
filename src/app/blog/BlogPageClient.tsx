'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, Search, BookOpen, TrendingUp, Bookmark } from 'lucide-react';
import type { BlogPost } from './page';

/* ─── types ─────────────────────────────────────────────────────────── */
interface Props {
    posts: BlogPost[];
    categories: string[];
}

/* ─── Hero featured card ─────────────────────────────────────────────── */
function HeroCard({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block">
            <div className="relative overflow-hidden rounded-none md:rounded-sm aspect-[16/9] md:aspect-[21/9] bg-[#1C1C1E]">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover opacity-70 group-hover:opacity-80 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Badge */}
                <div className="absolute top-5 left-5 flex gap-2">
                    <span className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white rounded-full"
                        style={{ background: post.categoryColor }}>
                        <TrendingUp className="w-2.5 h-2.5" />
                        Öne Çıkan
                    </span>
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full"
                        style={{ background: 'rgba(255,255,255,0.15)', color: 'white', backdropFilter: 'blur(8px)' }}>
                        {post.category}
                    </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="max-w-2xl">
                        <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3 group-hover:text-[#C9A96E] transition-colors duration-300"
                            style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                            {post.title}
                        </h1>
                        <p className="text-white/70 text-sm md:text-base leading-relaxed mb-5 hidden md:block line-clamp-2">
                            {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-white/60 text-[12px]">
                            <span className="font-medium text-white/80">{post.author}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingMinutes} dk okuma</span>
                            <span>·</span>
                            <span>{new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-4 text-[#C9A96E] text-[13px] font-semibold group-hover:gap-3 transition-all">
                            Devamını Oku <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

/* ─── Standard blog card ─────────────────────────────────────────────── */
function BlogCard({ post, size = 'normal' }: { post: BlogPost; size?: 'normal' | 'large' }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block h-full">
            <article className={`h-full flex flex-col overflow-hidden bg-white dark:bg-[#2C2C2E] border border-[#E8E3DC] dark:border-white/8 hover:border-[#C9A96E] hover:shadow-[0_8px_32px_rgba(201,169,110,0.15)] transition-all duration-400 rounded-sm`}>
                {/* Cover */}
                <div className={`relative overflow-hidden bg-[#E8E3DC] ${size === 'large' ? 'aspect-[4/3]' : 'aspect-[3/2]'}`}>
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes={size === 'large' ? '(max-width:768px) 100vw, 40vw' : '(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw'}
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-600 ease-out"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white rounded-full"
                            style={{ background: post.categoryColor }}>
                            {post.category}
                        </span>
                    </div>
                    {/* Bookmark button */}
                    <button
                        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)' }}
                        aria-label="Kaydet"
                        onClick={e => e.preventDefault()}
                    >
                        <Bookmark className="w-3.5 h-3.5 text-[#1C1C1E]" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col p-5">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-1.5 flex-wrap mb-3">
                            {post.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[9px] uppercase tracking-wider text-[#C9A96E] font-semibold">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <h2 className={`font-bold text-[#1C1C1E] dark:text-[#F5F0EB] leading-snug mb-3 line-clamp-2 group-hover:text-[#C9A96E] transition-colors duration-200 ${size === 'large' ? 'text-xl' : 'text-[15px]'}`}
                        style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                        {post.title}
                    </h2>

                    <p className="text-[12px] text-[#777] dark:text-[#AEAEB2] leading-relaxed line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#F5F0EB] dark:border-white/8">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#B8915A] flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                                {post.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <span className="text-[11px] text-[#666] dark:text-[#AEAEB2] font-medium">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-[#aaa]">
                            <Clock className="w-3 h-3" />
                            {post.readingMinutes} dk
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}

/* ─── Newsletter strip ───────────────────────────────────────────────── */
function NewsletterStrip() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    return (
        <div className="relative overflow-hidden py-12 px-6 md:px-12 my-12"
            style={{
                background: 'linear-gradient(135deg, #1C1C1E 0%, #2C2425 50%, #1A1614 100%)',
                borderRadius: '2px',
            }}>
            {/* Decorative circle */}
            <div className="absolute right-[-80px] top-[-80px] w-64 h-64 rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, #C9A96E 0%, transparent 70%)' }} />

            <div className="relative max-w-2xl mx-auto text-center">
                <BookOpen className="w-8 h-8 text-[#C9A96E] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                    Haftanın Seçkileri
                </h3>
                <p className="text-white/60 text-sm mb-6">
                    Her hafta en ilham verici dekorasyon yazıları ve özel fırsatlar e-posta kutunuza gelsin.
                </p>
                {sent ? (
                    <p className="text-[#C9A96E] font-semibold text-sm">✓ Harika! Sizi listeye ekledik.</p>
                ) : (
                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                        onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}>
                        <input
                            type="email"
                            placeholder="E-posta adresiniz"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="flex-1 px-4 py-3 text-[13px] bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-sm focus:outline-none focus:border-[#C9A96E]"
                        />
                        <button type="submit"
                            className="px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-[#1C1C1E] rounded-sm hover:opacity-90 transition-opacity flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg, #C9A96E, #D4AA6E)' }}>
                            Abone Ol
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function BlogPageClient({ posts, categories }: Props) {
    const [activeCategory, setActiveCategory] = useState('Tümü');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const featured = posts.find(p => p.featured);

    const filtered = useMemo(() => {
        let result = posts.filter(p => !p.featured);
        if (activeCategory !== 'Tümü') {
            result = result.filter(p => p.category === activeCategory);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.excerpt.toLowerCase().includes(q) ||
                p.tags?.some(t => t.toLowerCase().includes(q))
            );
        }
        return result;
    }, [posts, activeCategory, searchQuery]);

    return (
        <main className="min-h-screen bg-white dark:bg-[#1C1C1E]">

            {/* ── Page header ─────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <p className="text-[10px] text-[#C9A96E] tracking-[0.3em] uppercase font-semibold mb-1">
                            MAISON Editorial
                        </p>
                        <h1 className="text-3xl md:text-5xl font-bold text-[#1C1C1E] dark:text-[#F5F0EB]"
                            style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                            İlham &amp; Rehberler
                        </h1>
                        <p className="text-[#888] dark:text-[#AEAEB2] text-sm mt-2">
                            Uzman tavsiyeleri · Dekorasyon fikirleri · Mobilya rehberleri
                        </p>
                    </div>

                    {/* Search toggle */}
                    <button
                        onClick={() => setIsSearchOpen(v => !v)}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E8E3DC] dark:border-white/10 hover:border-[#C9A96E] transition-colors"
                        aria-label="Ara"
                    >
                        <Search className="w-4 h-4 text-[#666] dark:text-[#AEAEB2]" />
                    </button>
                </div>

                {/* Search bar */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mb-4"
                        >
                            <input
                                autoFocus
                                type="text"
                                placeholder="Yazı veya konu ara..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full px-5 py-3.5 text-[14px] bg-[#F5F0EB] dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-[#F5F0EB] rounded-sm border border-transparent focus:border-[#C9A96E] outline-none transition-colors"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Category pills */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className="flex-shrink-0 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider rounded-full transition-all duration-200"
                            style={{
                                background: activeCategory === cat ? '#C9A96E' : 'transparent',
                                color: activeCategory === cat ? 'white' : '#888',
                                border: `1px solid ${activeCategory === cat ? '#C9A96E' : 'rgba(0,0,0,0.1)'}`,
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-16">

                {/* ── Hero post ───────────────────────────────────────────── */}
                {featured && activeCategory === 'Tümü' && !searchQuery && (
                    <div className="mb-10">
                        <HeroCard post={featured} />
                    </div>
                )}

                {/* ── Grid ────────────────────────────────────────────────── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory + searchQuery}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                    >
                        {filtered.length === 0 ? (
                            <div className="py-24 text-center">
                                <p className="text-[#aaa] text-sm">Sonuç bulunamadı.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered.map((post, i) => (
                                    <motion.div
                                        key={post.slug}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                        className={i === 0 && activeCategory === 'Tümü' && !searchQuery ? 'lg:col-span-2 lg:row-span-1' : ''}
                                    >
                                        <BlogCard
                                            post={post}
                                            size={i === 0 && activeCategory === 'Tümü' && !searchQuery ? 'large' : 'normal'}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* ── Newsletter ──────────────────────────────────────────── */}
                <NewsletterStrip />

                {/* ── Popular tags ────────────────────────────────────────── */}
                <div className="mt-4">
                    <h2 className="text-[11px] uppercase tracking-widest text-[#C9A96E] font-semibold mb-4">Popüler Konular</h2>
                    <div className="flex flex-wrap gap-2">
                        {['salon', 'yatak odası', 'renk', 'minimalizm', 'aydınlatma', 'trend 2026', 'depolama', 'balkon', 'mutfak'].map(tag => (
                            <button
                                key={tag}
                                onClick={() => { setSearchQuery(tag); setIsSearchOpen(true); }}
                                className="px-3 py-1.5 text-[11px] border border-[#E8E3DC] dark:border-white/10 text-[#666] dark:text-[#AEAEB2] hover:border-[#C9A96E] hover:text-[#C9A96E] rounded-full transition-colors"
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}

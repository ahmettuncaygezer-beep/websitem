'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Tag } from 'lucide-react';
import type { BlogPost } from './page';

import { useGlobal } from '@/context/GlobalContext';

interface BlogSidebarProps {
    posts: BlogPost[];
    categories: string[];
}

export default function BlogSidebar({ posts, categories }: BlogSidebarProps) {
    const { language, t } = useGlobal();
    const langKey = (language?.toLowerCase() || 'tr') as 'tr' | 'en' | 'fr' | 'ar' | 'de';

    return (
        <aside className="lg:w-72 lg:flex-shrink-0">
            <div className="sticky top-24 flex flex-col gap-6">
                {/* Arama */}
                <div>
                    <h4 className="text-[12px] font-bold text-[#1C1C1E] uppercase tracking-wider mb-2">{t('common_search') || (langKey === 'tr' ? 'Ara' : 'Search')}</h4>
                    <input
                        type="search"
                        placeholder={t('blog_search_placeholder') || (langKey === 'tr' ? 'Yazı ara...' : 'Search articles...')}
                        className="w-full border border-[#E8E3DC] rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-[#C9A96E] transition-colors"
                    />
                </div>

                {/* Kategoriler */}
                <div>
                    <h4 className="text-[12px] font-bold text-[#1C1C1E] uppercase tracking-wider mb-3">{t('cat_cat') || (langKey === 'tr' ? 'Kategoriler' : 'Categories')}</h4>
                    <ul className="flex flex-col gap-1.5">
                        {categories.filter(c => c !== 'blog_all').map(cat => (
                            <li key={cat}>
                                <button className="flex items-center gap-2 text-[13px] text-[#666] hover:text-[#C9A96E] transition-colors">
                                    <Tag className="w-3 h-3 text-[#C9A96E]" />
                                    {t(cat) || cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Popüler */}
                <div>
                    <h4 className="text-[12px] font-bold text-[#1C1C1E] uppercase tracking-wider mb-3">{t('blog_popular_topics') || (langKey === 'tr' ? 'Popüler Yazılar' : 'Popular Posts')}</h4>
                    <ul className="flex flex-col gap-3">
                        {posts.slice(0, 3).map(post => (
                            <li key={post.slug}>
                                <Link href={`/blog/${post.slug}`} className="flex gap-2.5 group">
                                    <div className="relative w-12 h-12 flex-shrink-0 rounded-sm overflow-hidden bg-[#E8E3DC]">
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title[langKey] || post.title.tr}
                                            fill
                                            sizes="48px"
                                            className="object-cover group-hover:scale-105 transition-transform"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold text-[#1C1C1E] leading-tight line-clamp-2 group-hover:text-[#C9A96E] transition-colors">
                                            {post.title[langKey] || post.title.tr}
                                        </p>
                                        <div className="flex items-center gap-1 mt-0.5 text-[10px] text-[#aaa]">
                                            <Clock className="w-2.5 h-2.5" />{post.readingMinutes} {t('blog_min_read') || (langKey === 'tr' ? 'dk okuma' : 'min read')}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bülten */}
                <div className="bg-[#F5F0EB] rounded-sm p-4">
                    <h4 className="font-bold text-[#1C1C1E] text-[13px] mb-1">Bültene Abone Ol</h4>
                    <p className="text-[11px] text-[#666] mb-3">Haftalık ilham, fırsatlar ve yeni yazılar.</p>
                    <input
                        type="email"
                        placeholder="e-posta@adresiniz.com"
                        className="w-full border border-[#E8E3DC] rounded-sm px-3 py-2 text-[12px] mb-2 bg-white focus:outline-none focus:border-[#C9A96E]"
                    />
                    <button className="w-full py-2 bg-[#C9A96E] text-white text-[12px] font-semibold rounded-sm hover:bg-[#B8915A] transition-colors">
                        Abone Ol
                    </button>
                </div>

                {/* Haftanın Ürünü */}
                <div className="border border-[#E8E3DC] rounded-sm p-3">
                    <p className="text-[10px] text-[#C9A96E] uppercase tracking-wider font-medium mb-2">Haftanın Ürünü</p>
                    <Link href="/urun/luna-kose-koltuk" className="flex gap-2.5 group">
                        <div className="relative w-14 h-14 flex-shrink-0 rounded-sm overflow-hidden bg-[#E8E3DC]">
                            <Image
                                src="/images/gallery-1.jpg"
                                alt="Luna Köşe Koltuk"
                                fill
                                sizes="56px"
                                className="object-cover group-hover:scale-105 transition-transform"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                        </div>
                        <div>
                            <p className="text-[12px] font-semibold text-[#1C1C1E] group-hover:text-[#C9A96E] transition-colors">
                                Luna Köşe Koltuk
                            </p>
                            <p className="text-[13px] font-bold text-[#C9A96E]">₺74.990</p>
                        </div>
                    </Link>
                </div>
            </div>
        </aside>
    );
}

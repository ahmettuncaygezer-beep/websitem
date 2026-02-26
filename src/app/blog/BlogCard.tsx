'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import type { BlogPost } from './page';

export default function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block">
            <article className="overflow-hidden rounded-sm border border-[#E8E3DC] hover:border-[#C9A96E] hover:shadow-md transition-all duration-300">
                <div className={`relative overflow-hidden bg-[#E8E3DC] ${featured ? 'h-64 md:h-80' : 'h-44'}`}>
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width:768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
                    />
                    <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-white"
                            style={{ backgroundColor: post.categoryColor }}>
                            {post.category}
                        </span>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className={`font-bold text-[#1C1C1E] leading-snug mb-2 line-clamp-2 ${featured ? 'text-xl' : 'text-base'}`}
                        style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                        {post.title}
                    </h3>
                    <p className="text-[12px] text-[#666] leading-relaxed line-clamp-3 mb-3">
                        {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-[#aaa]">
                        <span>{post.author}</span>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readingMinutes} dk okuma
                        </div>
                        <span>·</span>
                        <span>{new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}

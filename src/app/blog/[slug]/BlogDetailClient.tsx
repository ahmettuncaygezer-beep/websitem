'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Facebook, LinkIcon, Clock } from 'lucide-react';

interface ShareBarProps {
    title: string;
    slug: string;
    author: string;
    date: string;
    readingMinutes: number;
}

export function ShareBar({ title, slug, author, date, readingMinutes }: ShareBarProps) {
    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    return (
        <div className="flex items-center justify-between flex-wrap gap-3 pb-5 border-b border-[#E8E3DC] mb-8">
            <div className="flex items-center gap-3 text-[12px] text-[#888]">
                <div className="w-7 h-7 rounded-full bg-[#C9A96E] flex items-center justify-center text-white font-bold text-[11px]">M</div>
                <span className="font-medium text-[#444]">{author}</span>
                <span>·</span>
                <span>{new Date(date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readingMinutes} dk okuma</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#aaa]">Paylaş:</span>
                {[
                    { Icon: Twitter, label: 'Twitter', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}` },
                    { Icon: Facebook, label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`/blog/${slug}`)}` },
                ].map(({ Icon, label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full border border-[#E8E3DC] flex items-center justify-center text-[#666] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                        aria-label={label}>
                        <Icon className="w-3 h-3" />
                    </a>
                ))}
                <button
                    onClick={handleCopy}
                    className="w-7 h-7 rounded-full border border-[#E8E3DC] flex items-center justify-center text-[#666] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                    aria-label="Linki kopyala"
                >
                    <LinkIcon className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}

interface RelatedProductsProps {
    products: { name: string; price: number; image: string; href: string }[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
    return (
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none">
            {products.map(p => (
                <Link key={p.name} href={p.href}
                    className="flex-shrink-0 w-44 border border-[#E8E3DC] rounded-sm overflow-hidden hover:border-[#C9A96E] transition-colors group">
                    <div className="relative h-32 bg-[#E8E3DC]">
                        <Image src={p.image} alt={p.name} fill sizes="176px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }} />
                    </div>
                    <div className="p-2.5">
                        <p className="text-[12px] font-semibold text-[#1C1C1E] line-clamp-1">{p.name}</p>
                        <p className="text-[13px] font-bold text-[#C9A96E] mt-0.5">₺{p.price.toLocaleString('tr-TR')}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export function CoverImage({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="relative w-full rounded-sm overflow-hidden mb-10 bg-[#E8E3DC]" style={{ aspectRatio: '16/7' }}>
            <Image
                src={src} alt={alt} fill
                sizes="(max-width:768px) 100vw, 800px"
                className="object-cover"
                priority
                onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
            />
        </div>
    );
}

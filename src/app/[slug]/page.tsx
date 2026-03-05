import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';

// Define the ISR revalidation time (e.g., revalidate every 60 seconds)
export const revalidate = 60;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    // Check if the slug conflicts with static folders (e.g., 'admin', 'urunler', etc.)
    // We'll let Next.js routing handle those automatically if they exist in the app directory,
    // but just in case, we query Supabase exclusively.
    const { data: page } = await supabase
        .from('pages')
        .select('title, meta_title, meta_description, meta_keywords, is_published')
        .eq('slug', slug)
        .single();

    if (!page || !page.is_published) {
        return {
            title: 'Sayfa Bulunamadı - 2Mobilya'
        };
    }

    return {
        title: `${page.meta_title || page.title} | 2Mobilya`,
        description: page.meta_description || page.excerpt,
        keywords: page.meta_keywords || '',
    };
}

export default async function DynamicCMSPage({ params }: PageProps) {
    const { slug } = await params;

    const { data: page } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!page || !page.is_published) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#F5F0EB]">
            <Navbar />

            <div className="pt-[120px] pb-24 border-b border-[#0F0F10]/10">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <h1 className="text-[40px] md:text-[56px] font-[300] text-[#0F0F10] font-['Playfair_Display',serif] leading-[1.1] mb-6 tracking-tight">
                        {page.title}
                    </h1>
                    {page.excerpt && (
                        <p className="text-[18px] text-[#0F0F10]/60 mb-12 font-[300] max-w-2xl leading-[1.6]">
                            {page.excerpt}
                        </p>
                    )}
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
                {/* 
                   We render the HTML content directly here. 
                   Ensure Tailwind Typography plugin is installed for proper styling of WYSIWYG content if needed, 
                   or style raw HTML using basic descendent selectors.
                 */}
                <div
                    className="prose prose-lg prose-neutral max-w-none text-[#0F0F10]/80
                               prose-headings:font-['Playfair_Display',serif] prose-headings:font-normal prose-headings:text-[#0F0F10]
                               prose-a:text-[#C9A96E] prose-a:no-underline hover:prose-a:text-[#b8995d]"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
            </article>

            <Footer />
        </main>
    );
}

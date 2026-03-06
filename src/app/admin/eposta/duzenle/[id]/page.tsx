import { NewsletterEditor } from '@/components/Admin/Email/NewsletterEditor';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditNewsletterPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createSupabaseServerClient();
    const { data: campaign } = await supabase
        .from('newsletter_campaigns')
        .select('*')
        .eq('id', id)
        .single();

    if (!campaign) notFound();

    return (
        <div className="flex flex-col h-screen bg-[#0F0F10]">
            <div className="p-8 pt-6 pb-2 border-b border-white/05">
                <h1 className="text-[24px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif]">Kampanyayı Düzenle</h1>
                <p className="text-[13px] text-[#636366]">Bülteninizi güncelleyin veya gönderin</p>
            </div>

            <div className="flex-1 min-h-0">
                <NewsletterEditor initialData={campaign} />
            </div>
        </div>
    );
}

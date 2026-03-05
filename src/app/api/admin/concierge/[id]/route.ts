import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const payload = await request.json();
        const supabase = await createSupabaseServerClient();

        // Optional: If we are changing status, we might want to send an email.
        // E.g., if payload.status && payload.status !== existingData.status...
        // For now, just update the data.

        const { data, error } = await supabase
            .from('concierge_requests')
            .update(payload)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        // TODO: Fire off an email notification here if status changed, 
        // e.g., await sendEmail(data.customer_email, 'Concierge Request Update', ...)

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

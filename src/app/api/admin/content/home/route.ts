import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { mockPageSections } from '@/lib/mock/content';

const SETTING_KEY = 'home_page_sections';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('value')
            .eq('key', SETTING_KEY)
            .maybeSingle();

        if (error) throw error;

        // If no data exists yet, return the default mock sections
        return NextResponse.json(data?.value || mockPageSections);
    } catch (err) {
        console.error('Error fetching home page sections:', err);
        return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const sections = await req.json();

        if (!sections || !Array.isArray(sections)) {
            return NextResponse.json({ error: 'Geçersiz veri formatı' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('site_settings')
            .upsert({
                key: SETTING_KEY,
                value: sections,
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, sections: data.value });
    } catch (err) {
        console.error('Error updating home page sections:', err);
        return NextResponse.json({ error: 'Failed to update sections' }, { status: 500 });
    }
}

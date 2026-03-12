import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

/**
 * GET /auth/callback
 * Supabase OAuth (Google, Apple vb.) geri dönüş noktası.
 * Supabase token'ı session'a çevirir ve kullanıcıyı yönlendirir.
 */
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/hesabim';

    if (code) {
        const supabase = await createSupabaseServerClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // Hata durumunda giriş sayfasına yönlendir
    return NextResponse.redirect(`${origin}/auth/giris?error=oauth_failed`);
}

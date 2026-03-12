require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");
const fs = require('fs');
const path = require('path');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// We need an admin client (service role) to execute raw SQL or bypass RLS for DDL if possible, 
// but Supabase REST API doesn't support executing arbitrary SQL directly via the client library.
// We will try to apply changes via REST API where possible (creating tables via REST is not possible),
// OR if the user has a local supabase CLI, we can use that.

async function applyFixes() {
    console.log("To fix the schema, we need to run SQL directly in the Supabase Editor.");
    console.log(`
-- 1. Add missing is_active to products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- 2. Add missing is_active to categories
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- 3. Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
    key VARCHAR(255) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) Aktifleştir
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir
CREATE POLICY "Public profiles are viewable by everyone."
    ON public.site_settings FOR SELECT
    USING ( true );

-- Sadece authenticated (admin/anon yetkisi) olanlar yazabilir -> Demo için anon kullanıyoruz, güvenlik için session bazlı olabilir
CREATE POLICY "Enable insert for authenticated users only"
    ON public.site_settings FOR INSERT
    WITH CHECK ( true );

CREATE POLICY "Enable update for authenticated users only"
    ON public.site_settings FOR UPDATE
    USING ( true )
    WITH CHECK ( true );

-- Varsayılan site ayarlarını seed edelim
INSERT INTO public.site_settings (key, value) VALUES 
('cms_colors', '{"primary": "#C9A96E", "primaryDark": "#B8915A", "background": "#F5F0EB", "text": "#1C1C1E"}'),
('cms_hero', '{"title": "Mükemmel Evinizin Hikayesi", "subtitle": "Modern tasarım, zamansız zarafet. MAISON ile yaşam alanlarınızı yeniden keşfedin.", "image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format"}'),
('cms_footer', '{"description": "Premium mobilya ve ev dekorasyonu. Evinizin yeni hikayesini birlikte yazalım.", "showNewsletter": true}')
ON CONFLICT (key) DO UPDATE 
SET value = EXCLUDED.value;
    `);
}

applyFixes();

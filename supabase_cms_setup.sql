-- Tabloyu oluştur: site_settings
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

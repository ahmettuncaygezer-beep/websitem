-- ═══════════════════════════════════════════════════
-- Menü ve Sayfa Tabloları + Seed Data
-- Supabase Dashboard > SQL Editor'da çalıştırın
-- ═══════════════════════════════════════════════════

-- 1. menus tablosu
CREATE TABLE IF NOT EXISTS public.menus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    handle VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. menu_items tablosu
CREATE TABLE IF NOT EXISTS public.menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    menu_id UUID NOT NULL REFERENCES public.menus(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.menu_items(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    is_external BOOLEAN DEFAULT false,
    target VARCHAR(50) DEFAULT '_self',
    icon VARCHAR(100),
    sort_order INTEGER DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Index
CREATE INDEX IF NOT EXISTS idx_menu_items_menu_parent_order 
    ON public.menu_items(menu_id, parent_id, sort_order);

-- 4. RLS
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'menus' AND policyname = 'Herkes menüleri okuyabilir'
    ) THEN
        CREATE POLICY "Herkes menüleri okuyabilir" ON public.menus FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'menu_items' AND policyname = 'Herkes menü öğelerini okuyabilir'
    ) THEN
        CREATE POLICY "Herkes menü öğelerini okuyabilir" ON public.menu_items FOR SELECT USING (is_active = true);
    END IF;
END $$;

-- 5. Seed: header ve footer menüleri
INSERT INTO public.menus (name, handle, description)
VALUES 
    ('Ana Menü (Header)', 'header', 'Sitenin üst kısmındaki ana navigasyon menüsü.'),
    ('Alt Menü (Footer)', 'footer', 'Sitenin alt kısmındaki footer menüsü.')
ON CONFLICT (handle) DO NOTHING;

-- 6. Header menü öğeleri
WITH header_menu AS (
    SELECT id FROM public.menus WHERE handle = 'header'
)
INSERT INTO public.menu_items (menu_id, title, url, sort_order, is_active)
SELECT 
    header_menu.id,
    item.title,
    item.url,
    item.sort_order,
    true
FROM header_menu, (VALUES
    ('Ürünler', '/urunler', 1),
    ('Koleksiyonlar', '/koleksiyonlar', 2),
    ('Lookbook', '/lookbook', 3),
    ('Hakkımızda', '/hakkimizda', 4),
    ('İletişim', '/iletisim', 5)
) AS item(title, url, sort_order)
ON CONFLICT DO NOTHING;

-- 7. Footer menü öğeleri
WITH footer_menu AS (
    SELECT id FROM public.menus WHERE handle = 'footer'
)
INSERT INTO public.menu_items (menu_id, title, url, sort_order, is_active)
SELECT 
    footer_menu.id,
    item.title,
    item.url,
    item.sort_order,
    true
FROM footer_menu, (VALUES
    ('Gizlilik Politikası', '/gizlilik', 1),
    ('Kullanım Koşulları', '/kullanim-kosullari', 2),
    ('İade Politikası', '/iade', 3),
    ('Garanti', '/garanti', 4),
    ('Kargo', '/kargo', 5),
    ('SSS', '/sss', 6),
    ('Yardım', '/yardim', 7)
) AS item(title, url, sort_order)
ON CONFLICT DO NOTHING;

SELECT 'Kurulum tamamlandı!' as durum,
       (SELECT count(*) FROM public.menus) as menu_sayisi,
       (SELECT count(*) FROM public.menu_items) as menu_ogesi_sayisi;

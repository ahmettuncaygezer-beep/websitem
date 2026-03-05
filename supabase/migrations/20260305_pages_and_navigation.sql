-- 1. Sayfalar (Pages) Tablosu
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords VARCHAR(255),
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Slug üzerinden arama için index
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_published ON public.pages(is_published);

-- 2. Menüler Tablosu (Örn: Header Menu, Footer Menu)
CREATE TABLE IF NOT EXISTS public.menus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    handle VARCHAR(255) NOT NULL UNIQUE, -- Örn: 'header-main', 'footer-links'
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Menü Öğeleri Tablosu (Menu Items)
CREATE TABLE IF NOT EXISTS public.menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    menu_id UUID NOT NULL REFERENCES public.menus(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.menu_items(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL, -- '/', '/hakkimizda', 'https://google.com'
    is_external BOOLEAN DEFAULT false,
    target VARCHAR(50) DEFAULT '_self', -- '_self', '_blank'
    icon VARCHAR(100),
    sort_order INTEGER DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Menü öğeleri sıralaması için index
CREATE INDEX IF NOT EXISTS idx_menu_items_menu_parent_order ON public.menu_items(menu_id, parent_id, sort_order);

-- Fonksiyon: sayfa güncellendiğinde updated_at tetikleyicisi
CREATE TRIGGER handle_pages_updated_at BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);

CREATE TRIGGER handle_menus_updated_at BEFORE UPDATE ON public.menus
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);

CREATE TRIGGER handle_menu_items_updated_at BEFORE UPDATE ON public.menu_items
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);

-- RLS (Row Level Security) - Sayfalar
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Herkes aktif sayfaları okuyabilir" ON public.pages
    FOR SELECT USING (is_published = true);

CREATE POLICY "Sadece adminler tüm sayfaları görebilir" ON public.pages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid() AND users.role IN ('admin', 'superadmin', 'editor')
        )
    );

CREATE POLICY "Sadece adminler sayfa oluşturabilir" ON public.pages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid() AND users.role IN ('admin', 'superadmin', 'editor')
        )
    );

CREATE POLICY "Sadece adminler sayfa güncelleyebilir" ON public.pages
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid() AND users.role IN ('admin', 'superadmin', 'editor')
        )
    );

CREATE POLICY "Sadece adminler sayfa silebilir" ON public.pages
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid() AND users.role IN ('admin', 'superadmin')
        )
    );


-- RLS - Menüler
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Herkes menüleri okuyabilir" ON public.menus FOR SELECT USING (true);
CREATE POLICY "Herkes menü öğelerini okuyabilir" ON public.menu_items FOR SELECT USING (is_active = true);

CREATE POLICY "Adminler menüleri yönetebilir" ON public.menus
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid() AND users.role IN ('admin', 'superadmin', 'editor')
        )
    );

CREATE POLICY "Adminler menü öğelerini yönetebilir" ON public.menu_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid() AND users.role IN ('admin', 'superadmin', 'editor')
        )
    );

-- Başlangıç verileri (Seed Data)
INSERT INTO public.menus (name, handle, description)
VALUES 
    ('Ana Menü (Header)', 'header-main', 'Sitenin üst kısmında yer alan ana navigasyon menüsü.'),
    ('Alt Yasal Menü (Footer)', 'footer-legal', 'Sitenin alt kısmında yer alan sözleşmeler ve yasal uyarılar.')
ON CONFLICT (handle) DO NOTHING;

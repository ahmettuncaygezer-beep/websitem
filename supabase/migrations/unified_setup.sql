-- SELIS HOME CONCEPT - Unified Database Migration
-- Run this once in your Supabase Dashboard → SQL Editor

-- 1. Site Settings Table (CMS Content)
CREATE TABLE IF NOT EXISTS public.site_settings (
    key VARCHAR(255) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public profiles are viewable by everyone.' AND tablename = 'site_settings') THEN
        CREATE POLICY "Public profiles are viewable by everyone." ON public.site_settings FOR SELECT USING ( true );
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable all for authenticated' AND tablename = 'site_settings') THEN
        CREATE POLICY "Enable all for authenticated" ON public.site_settings FOR ALL USING ( true );
    END IF;
END $$;

-- 2. Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text        NOT NULL,
  slug             text        UNIQUE NOT NULL,
  content          text        DEFAULT '',
  excerpt          text        DEFAULT '',
  cover_image      text        DEFAULT '',
  author           text        DEFAULT '',
  category         text        DEFAULT '',
  status           text        DEFAULT 'draft'
                               CHECK (status IN ('draft', 'published', 'scheduled')),
  published_at     timestamptz,
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now(),
  meta_title       text        DEFAULT '',
  meta_description text        DEFAULT '',
  read_time        int         DEFAULT 0,
  view_count       int         DEFAULT 0
);

-- RLS for Blog
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Blog posts are viewable by everyone.' AND tablename = 'blog_posts') THEN
        CREATE POLICY "Blog posts are viewable by everyone." ON public.blog_posts FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin can do everything with blog' AND tablename = 'blog_posts') THEN
        CREATE POLICY "Admin can do everything with blog" ON public.blog_posts FOR ALL USING (true);
    END IF;
END $$;

-- Indexes
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON blog_posts (status);
CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx ON blog_posts (created_at DESC);

-- 3. Seed Default Site Settings
INSERT INTO public.site_settings (key, value) VALUES 
('cms_colors', '{"primary": "#C9A96E", "primaryDark": "#B8915A", "background": "#1C1C1E", "text": "#F5F0EB"}'),
('cms_hero', '{"title": "Mükemmel Evinizin Hikayesi", "subtitle": "Modern tasarım, zamansız zarafet. SELIS ile yaşam alanlarınızı yeniden keşfedin.", "image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format"}'),
('cms_footer', '{"description": "Premium mobilya ve ev dekorasyonu. Evinizin yeni hikayesini birlikte yazalım.", "showNewsletter": true}')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

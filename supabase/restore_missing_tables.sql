-- DATABASE RESTORATION SCRIPT
-- Run this in your Supabase Dashboard → SQL Editor to restore missing tables.

-- 1. Users table (if missing)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    role TEXT DEFAULT 'customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_tr TEXT NOT NULL,
    name_en TEXT,
    slug TEXT UNIQUE NOT NULL,
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    description TEXT,
    cover_image TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Customer Profiles (CRM)
CREATE TABLE IF NOT EXISTS public.customer_profiles (
    id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    style_preference TEXT,
    tone_preference TEXT,
    total_spent NUMERIC DEFAULT 0,
    order_count INTEGER DEFAULT 0,
    last_order_date TIMESTAMP WITH TIME ZONE,
    is_vip BOOLEAN DEFAULT false,
    assigned_designer TEXT,
    ai_insights JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Campaigns
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT,
    status TEXT DEFAULT 'Aktif',
    discount_value NUMERIC DEFAULT 0,
    discount_unit TEXT DEFAULT 'yüzde',
    coupon_code TEXT,
    is_single_use BOOLEAN DEFAULT false,
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    min_order_amount NUMERIC,
    min_product_count INTEGER,
    valid_categories JSONB DEFAULT '[]',
    valid_products JSONB DEFAULT '[]',
    target_segment TEXT DEFAULT 'Tümü',
    per_user_limit INTEGER,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    description TEXT,
    flash_sale_end_date TIMESTAMP WITH TIME ZONE,
    bundle_products JSONB DEFAULT '[]',
    bundle_condition TEXT,
    revenue NUMERIC DEFAULT 0,
    orders INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Coupons
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    discount_type TEXT NOT NULL,
    discount_value NUMERIC NOT NULL,
    min_order_amount NUMERIC DEFAULT 0,
    usage_limit INTEGER,
    usage_limit_per_user INTEGER DEFAULT 1,
    valid_category_ids JSONB,
    valid_product_ids JSONB,
    starts_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    ends_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Languages
CREATE TABLE IF NOT EXISTS public.languages (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    is_default BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Translations
CREATE TABLE IF NOT EXISTS public.translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL,
    language_code TEXT REFERENCES public.languages(code) ON DELETE CASCADE,
    value TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    UNIQUE (key, language_code)
);

-- 8. SEO Meta
CREATE TABLE IF NOT EXISTS public.seo_meta (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url_path TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    keywords TEXT,
    og_image TEXT,
    og_title TEXT,
    og_description TEXT,
    robots TEXT DEFAULT 'index, follow',
    canonical_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Enablement
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_meta ENABLE ROW LEVEL SECURITY;

-- Basic Policies
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admin manage categories" ON public.categories FOR ALL USING (true);

CREATE POLICY "Public read languages" ON public.languages FOR SELECT USING (true);
CREATE POLICY "Admin manage languages" ON public.languages FOR ALL USING (true);

CREATE POLICY "Public read translations" ON public.translations FOR SELECT USING (true);
CREATE POLICY "Admin manage translations" ON public.translations FOR ALL USING (true);

CREATE POLICY "Public read seo_meta" ON public.seo_meta FOR SELECT USING (true);
CREATE POLICY "Admin manage seo_meta" ON public.seo_meta FOR ALL USING (true);

CREATE POLICY "Admin manage all users" ON public.users FOR ALL USING (true);
CREATE POLICY "Admin manage profiles" ON public.customer_profiles FOR ALL USING (true);
CREATE POLICY "Admin manage campaigns" ON public.campaigns FOR ALL USING (true);
CREATE POLICY "Admin manage coupons" ON public.coupons FOR ALL USING (true);

-- Seed Initial Data
INSERT INTO public.languages (code, name, is_active, is_default, sort_order) VALUES 
('tr', 'Türkçe', true, true, 1),
('en', 'English', true, false, 2),
('ar', 'العربية', true, false, 3)
ON CONFLICT (code) DO NOTHING;

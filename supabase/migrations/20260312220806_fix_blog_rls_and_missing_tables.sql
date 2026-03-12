/*
  # Fix Blog RLS and Add Missing Tables
  
  1. Security Updates
    - Enable RLS on blog_posts table
    - Add appropriate policies for public read and admin write
  
  2. New Tables
    - `categories` - Product categories
    - `campaigns` - Marketing campaigns  
    - `coupons` - Discount coupons
    - `press_items` - Press and media coverage
    - `pages` - Custom pages
    - `navigation_items` - Navigation menu items
    - `translations` - i18n translations
    - `seo_settings` - SEO configuration
    - `site_settings` - General site settings
    - `email_templates` - Email templates
    - `audit_logs` - System audit logs
    - `crm_customers` - CRM customer data
    - `concierge_requests` - Concierge service requests
  
  3. Security
    - Enable RLS on all new tables
    - Add policies for appropriate access control
*/

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Blog posts are viewable by everyone" ON public.blog_posts;
CREATE POLICY "Blog posts are viewable by everyone"
  ON public.blog_posts FOR SELECT
  USING (status = 'published' OR status IS NULL);

DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
CREATE POLICY "Admins can manage blog posts"
  ON public.blog_posts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Categories are viewable by everyone" ON public.categories;
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT
  USING (is_active = true OR is_active IS NULL);

DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT DEFAULT 'discount' CHECK (type IN ('discount', 'banner', 'email', 'popup')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  config JSONB DEFAULT '{}',
  stats JSONB DEFAULT '{"views": 0, "clicks": 0, "conversions": 0}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Campaigns are viewable by everyone" ON public.campaigns;
CREATE POLICY "Campaigns are viewable by everyone"
  ON public.campaigns FOR SELECT
  USING (status = 'active');

DROP POLICY IF EXISTS "Admins can manage campaigns" ON public.campaigns;
CREATE POLICY "Admins can manage campaigns"
  ON public.campaigns FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  type TEXT DEFAULT 'percentage' CHECK (type IN ('percentage', 'fixed', 'free_shipping')),
  value NUMERIC NOT NULL,
  min_purchase_amount NUMERIC DEFAULT 0,
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Coupons are viewable by everyone" ON public.coupons;
CREATE POLICY "Coupons are viewable by everyone"
  ON public.coupons FOR SELECT
  USING (is_active = true AND (start_date IS NULL OR start_date <= now()) AND (end_date IS NULL OR end_date >= now()));

DROP POLICY IF EXISTS "Admins can manage coupons" ON public.coupons;
CREATE POLICY "Admins can manage coupons"
  ON public.coupons FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS public.press_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  publication TEXT NOT NULL,
  publication_logo TEXT,
  article_url TEXT,
  published_date DATE,
  excerpt TEXT,
  cover_image TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.press_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Press items are viewable by everyone" ON public.press_items;
CREATE POLICY "Press items are viewable by everyone"
  ON public.press_items FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins can manage press items" ON public.press_items;
CREATE POLICY "Admins can manage press items"
  ON public.press_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS public.pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  meta_title TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Published pages are viewable by everyone" ON public.pages;
CREATE POLICY "Published pages are viewable by everyone"
  ON public.pages FOR SELECT
  USING (is_published = true);

DROP POLICY IF EXISTS "Admins can manage pages" ON public.pages;
CREATE POLICY "Admins can manage pages"
  ON public.pages FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS public.navigation_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  parent_id UUID REFERENCES public.navigation_items(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Navigation items are viewable by everyone" ON public.navigation_items;
CREATE POLICY "Navigation items are viewable by everyone"
  ON public.navigation_items FOR SELECT
  USING (is_active = true);

DROP POLICY IF EXISTS "Admins can manage navigation" ON public.navigation_items;
CREATE POLICY "Admins can manage navigation"
  ON public.navigation_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS public.translations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'tr',
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(key, language)
);

ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Translations are viewable by everyone" ON public.translations;
CREATE POLICY "Translations are viewable by everyone"
  ON public.translations FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins can manage translations" ON public.translations;
CREATE POLICY "Admins can manage translations"
  ON public.translations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS public.seo_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  keywords TEXT[],
  og_image TEXT,
  canonical_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "SEO settings are viewable by everyone" ON public.seo_settings;
CREATE POLICY "SEO settings are viewable by everyone"
  ON public.seo_settings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins can manage SEO settings" ON public.seo_settings;
CREATE POLICY "Admins can manage SEO settings"
  ON public.seo_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Site settings are viewable by everyone" ON public.site_settings;
CREATE POLICY "Site settings are viewable by everyone"
  ON public.site_settings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins can manage site settings" ON public.site_settings;
CREATE POLICY "Admins can manage site settings"
  ON public.site_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  variables JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view email templates" ON public.email_templates;
CREATE POLICY "Admins can view email templates"
  ON public.email_templates FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Admins can manage email templates" ON public.email_templates;
CREATE POLICY "Admins can manage email templates"
  ON public.email_templates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;
CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS public.crm_customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  segment TEXT,
  lifetime_value NUMERIC DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  avg_order_value NUMERIC DEFAULT 0,
  last_purchase_date TIMESTAMPTZ,
  tags TEXT[],
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.crm_customers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view CRM customers" ON public.crm_customers;
CREATE POLICY "Admins can view CRM customers"
  ON public.crm_customers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Admins can manage CRM customers" ON public.crm_customers;
CREATE POLICY "Admins can manage CRM customers"
  ON public.crm_customers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS public.concierge_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  request_type TEXT,
  description TEXT NOT NULL,
  budget_range TEXT,
  preferred_contact TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'cancelled')),
  assigned_to UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.concierge_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own requests" ON public.concierge_requests;
CREATE POLICY "Users can view their own requests"
  ON public.concierge_requests FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create requests" ON public.concierge_requests;
CREATE POLICY "Users can create requests"
  ON public.concierge_requests FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view all requests" ON public.concierge_requests;
CREATE POLICY "Admins can view all requests"
  ON public.concierge_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Admins can manage requests" ON public.concierge_requests;
CREATE POLICY "Admins can manage requests"
  ON public.concierge_requests FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

INSERT INTO public.site_settings (key, value) VALUES
  ('site_name', '{"tr": "2Mobilya", "en": "2Mobilya"}'),
  ('site_description', '{"tr": "Premium mobilya ve ev dekorasyonu", "en": "Premium furniture and home decor"}'),
  ('contact_email', '"info@2mobilya.com"'),
  ('contact_phone', '"+90 555 123 45 67"'),
  ('social_media', '{"instagram": "", "facebook": "", "twitter": "", "pinterest": ""}'),
  ('theme_colors', '{"primary": "#C9A96E", "secondary": "#1C1C1E", "accent": "#F5F0EB"}'),
  ('shipping_settings', '{"free_shipping_threshold": 1000, "standard_shipping_cost": 50}'),
  ('currency', '{"code": "TRY", "symbol": "₺"}')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.categories (name, slug, description, display_order) VALUES
  ('Oturma Odası', 'oturma-odasi', 'Oturma odası mobilyaları', 1),
  ('Yatak Odası', 'yatak-odasi', 'Yatak odası mobilyaları', 2),
  ('Yemek Odası', 'yemek-odasi', 'Yemek odası mobilyaları', 3),
  ('Çalışma Odası', 'calisma-odasi', 'Çalışma odası mobilyaları', 4),
  ('Dekorasyon', 'dekorasyon', 'Dekoratif ürünler', 5),
  ('Aydınlatma', 'aydinlatma', 'Aydınlatma ürünleri', 6)
ON CONFLICT (slug) DO NOTHING;
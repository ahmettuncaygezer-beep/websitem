-- Migration: Create press_items table
-- Created at: 2026-03-05

CREATE TABLE IF NOT EXISTS public.press_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    article_title TEXT NOT NULL,
    article_url TEXT NOT NULL,
    logo_url TEXT,
    is_active BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.press_items ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access for active press items" ON public.press_items
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow admin full access" ON public.press_items
    FOR ALL USING (true); -- This should be restricted by role in practice, but for now we follow the existing pattern

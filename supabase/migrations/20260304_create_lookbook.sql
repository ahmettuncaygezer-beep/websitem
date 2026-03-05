-- SELIS HOME CONCEPT - Lookbook Database Schema
-- Run this in Supabase SQL Editor

-- 1. Lookbook Collections
CREATE TABLE IF NOT EXISTS public.lookbook_collections (
    id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    name             text        NOT NULL,
    season           text        NOT NULL,
    cover_image      text        DEFAULT '',
    is_active        boolean     DEFAULT true,
    order_index      int         DEFAULT 0,
    published_at     timestamptz DEFAULT now(),
    created_at       timestamptz DEFAULT now(),
    updated_at       timestamptz DEFAULT now()
);

-- 2. Lookbook Photos
CREATE TABLE IF NOT EXISTS public.lookbook_photos (
    id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    collection_id    uuid        REFERENCES public.lookbook_collections(id) ON DELETE CASCADE,
    title            text        DEFAULT '',
    description      text        DEFAULT '',
    category         text        DEFAULT '',
    url              text        NOT NULL,
    order_index      int         DEFAULT 0,
    is_featured      boolean     DEFAULT false,
    created_at       timestamptz DEFAULT now(),
    updated_at       timestamptz DEFAULT now()
);

-- 3. Lookbook Product Tags (Hotspots)
CREATE TABLE IF NOT EXISTS public.lookbook_product_tags (
    id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    photo_id         uuid        REFERENCES public.lookbook_photos(id) ON DELETE CASCADE,
    product_id       uuid        NOT NULL, -- Relation to products table (assumed exists)
    x_pos            float       NOT NULL, -- % from left
    y_pos            float       NOT NULL, -- % from top
    created_at       timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lookbook_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lookbook_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lookbook_product_tags ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Lookbook public view" ON public.lookbook_collections FOR SELECT USING (true);
CREATE POLICY "Lookbook public view photos" ON public.lookbook_photos FOR SELECT USING (true);
CREATE POLICY "Lookbook public view tags" ON public.lookbook_product_tags FOR SELECT USING (true);

CREATE POLICY "Admin full access collections" ON public.lookbook_collections FOR ALL USING (true);
CREATE POLICY "Admin full access photos" ON public.lookbook_photos FOR ALL USING (true);
CREATE POLICY "Admin full access tags" ON public.lookbook_product_tags FOR ALL USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS lookbook_photos_collection_id_idx ON public.lookbook_photos(collection_id);
CREATE INDEX IF NOT EXISTS lookbook_tags_photo_id_idx ON public.lookbook_product_tags(photo_id);

-- Supabase Storage Buckets Setup
-- Run this once in Supabase Dashboard → SQL Editor

INSERT INTO storage.buckets (id, name, public) VALUES
('products', 'products', true),
('blog', 'blog', true),
('categories', 'categories', true),
('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to all buckets
CREATE POLICY "Public read access for products" ON storage.objects
FOR SELECT USING (bucket_id = 'products');

CREATE POLICY "Public read access for blog" ON storage.objects
FOR SELECT USING (bucket_id = 'blog');

CREATE POLICY "Public read access for categories" ON storage.objects
FOR SELECT USING (bucket_id = 'categories');

CREATE POLICY "Public read access for media" ON storage.objects
FOR SELECT USING (bucket_id = 'media');

-- Allow authenticated users to upload/delete in all buckets
CREATE POLICY "Authenticated upload for products" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'products');

CREATE POLICY "Authenticated upload for blog" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'blog');

CREATE POLICY "Authenticated upload for categories" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'categories');

CREATE POLICY "Authenticated upload for media" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated delete for products" ON storage.objects
FOR DELETE USING (bucket_id = 'products');

CREATE POLICY "Authenticated delete for blog" ON storage.objects
FOR DELETE USING (bucket_id = 'blog');

CREATE POLICY "Authenticated delete for categories" ON storage.objects
FOR DELETE USING (bucket_id = 'categories');

CREATE POLICY "Authenticated delete for media" ON storage.objects
FOR DELETE USING (bucket_id = 'media');

/*
  # Create Storage Buckets
  
  1. Storage Buckets
    - `products` - Product images
    - `blog` - Blog post images
    - `lookbook` - Lookbook photos
    - `media` - General media files
    - `user-avatars` - User profile pictures
  
  2. Security
    - Public read access for all buckets
    - Authenticated write access for user-avatars
    - Admin-only write access for other buckets
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('products', 'products', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('blog', 'blog', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('lookbook', 'lookbook', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('media', 'media', true, 20971520, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'video/mp4']),
  ('user-avatars', 'user-avatars', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
CREATE POLICY "Public can view product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
CREATE POLICY "Admins can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'products' AND
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
CREATE POLICY "Admins can update product images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'products' AND
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;
CREATE POLICY "Admins can delete product images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'products' AND
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Public can view blog images" ON storage.objects;
CREATE POLICY "Public can view blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog');

DROP POLICY IF EXISTS "Admins can manage blog images" ON storage.objects;
CREATE POLICY "Admins can manage blog images"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'blog' AND
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Public can view lookbook images" ON storage.objects;
CREATE POLICY "Public can view lookbook images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'lookbook');

DROP POLICY IF EXISTS "Admins can manage lookbook images" ON storage.objects;
CREATE POLICY "Admins can manage lookbook images"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'lookbook' AND
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Public can view media files" ON storage.objects;
CREATE POLICY "Public can view media files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Admins can manage media files" ON storage.objects;
CREATE POLICY "Admins can manage media files"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'media' AND
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Public can view user avatars" ON storage.objects;
CREATE POLICY "Public can view user avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'user-avatars');

DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'user-avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'user-avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'user-avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
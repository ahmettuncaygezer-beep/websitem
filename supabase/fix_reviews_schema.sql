-- MASTER FIX: Yorumlar (Reviews) Tablosu ve İlişki Yapılandırması

-- 1. Eksik kolonları ekle (Admin paneli bu alanları bekliyor)
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS comment TEXT;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS admin_reply JSONB;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS is_verified_purchase BOOLEAN DEFAULT true;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS product_name TEXT;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS product_image TEXT;

-- 2. Durum (Status) kısıtlamasını tanımla
ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_status_check;
ALTER TABLE public.reviews ADD CONSTRAINT reviews_status_check CHECK (status IN ('pending', 'approved', 'rejected', 'featured'));

-- 3. KRİTİK: Profiles tablosuyla ilişkiyi (Foreign Key) kur
-- "Could not find a relationship..." hatasını çözen asıl kısım budur.
ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_user_id_profiles_fkey;
ALTER TABLE public.reviews ADD CONSTRAINT reviews_user_id_profiles_fkey 
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) 
    ON DELETE SET NULL;

-- 4. RLS Politikalarını Düzenle
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can read approved reviews" ON public.reviews;
CREATE POLICY "Anyone can read approved reviews" ON public.reviews
    FOR SELECT USING (status = 'approved' OR status = 'featured');

-- 5. Şema Önbelleğini Yenile (Supabase'in değişikliği tanıması için)
NOTIFY pgrst, 'reload schema';

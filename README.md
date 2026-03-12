# 2Mobilya - Premium Mobilya E-Ticaret Platformu

Tam özellikli, modern ve production-ready mobilya e-ticaret web sitesi. Next.js 16, React 19, Supabase ve Tailwind CSS ile geliştirilmiştir.

## 🌟 Özellikler

### Müşteri Özellikleri
- ✅ Modern ve responsive tasarım
- ✅ Ürün listeleme ve filtreleme
- ✅ Gelişmiş ürün arama
- ✅ Sepet yönetimi
- ✅ Kullanıcı kayıt/giriş sistemi
- ✅ Sipariş takibi
- ✅ Favori ürünler
- ✅ Ürün karşılaştırma
- ✅ Blog sistemi
- ✅ AI destekli ürün önerileri
- ✅ 3D ürün görüntüleme
- ✅ Oda planlayıcı
- ✅ Dark mode desteği
- ✅ PWA desteği

### Admin Panel Özellikleri
- ✅ Kapsamlı yönetim paneli
- ✅ Ürün yönetimi (CRUD)
- ✅ Kategori yönetimi
- ✅ Sipariş yönetimi
- ✅ Müşteri yönetimi (CRM)
- ✅ Blog yönetimi
- ✅ Kampanya yönetimi
- ✅ SEO ayarları
- ✅ Analitik ve raporlama

## 🚀 Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install --legacy-peer-deps
```

2. Environment variables düzenleyin (.env):
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

3. Supabase migrations'ı çalıştırın

4. Development server:
```bash
npm run dev
```

5. Production build:
```bash
npm run build
npm run start
```

## 📊 Database

Supabase SQL Editor'den migrations dosyalarını sırasıyla çalıştırın:
1. `supabase/migrations/20260221024335_schema.sql`
2. `supabase/migrations/20260312220806_fix_blog_rls_and_missing_tables.sql`
3. `supabase/migrations/20260312220837_create_storage_buckets.sql`

## 🔐 Admin Erişimi

1. Supabase Dashboard > Authentication > Users > Add User
2. SQL Editor'den admin yetkisi verin:
```sql
INSERT INTO public.admin_users (id, role)
VALUES ('user_id', 'admin');
```
3. `/admin/login` sayfasından giriş yapın

## 📁 Proje Yapısı

```
src/
├── app/          # Next.js pages
├── components/   # React components
├── lib/          # Utilities
├── hooks/        # Custom hooks
└── types/        # TypeScript types
```

## 🎨 Teknolojiler

- Next.js 16
- React 19
- Tailwind CSS
- Supabase
- TypeScript
- Framer Motion
- Three.js

## 📝 Notlar

- Production build başarıyla tamamlandı
- Tüm veritabanı tabloları ve RLS policies hazır
- Sample data yüklü
- Admin panel tam fonksiyonel


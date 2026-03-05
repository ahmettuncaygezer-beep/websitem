-- ============================================================
-- admin_users tablosu oluşturma
-- Supabase Dashboard → SQL Editor'de çalıştırın
-- ============================================================

create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'editor'
    check (role in ('super_admin', 'admin', 'editor')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Row Level Security — API kodu service_role'u kullanıyor,
-- anonim erişimi kapat
alter table public.admin_users enable row level security;

-- Tüm erişimi service_role'a bırak (middleware + API route'lar server-side çalışır)
create policy "Service role only" on public.admin_users
  as restrictive
  using (false);

-- ============================================================
-- İlk admin kullanıcısını eklemek için:
-- 1) Önce Supabase Auth → Users ekranından kullanıcı oluşturun
-- 2) Aşağıdaki satırdaki değerleri doldurup çalıştırın:
-- ============================================================

-- insert into public.admin_users (id, email, role)
-- values (
--   '<supabase-auth-kullanici-uuid>',
--   'admin@selishome.com',
--   'super_admin'
-- );

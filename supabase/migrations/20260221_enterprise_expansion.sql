-- 1. Enable pgvector extension for RAG
create extension if not exists vector;

-- 2. Create products_embeddings for RAG
create table if not exists public.product_embeddings (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade,
  embedding vector(1536), -- For OpenAI text-embedding-ada-002 or 3rd small
  metadata jsonb,
  created_at timestamp with time zone default now()
);

-- 3. Create chat_sessions and chat_messages for monitoring
create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  status text default 'ai' check (status in ('ai', 'human')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.chat_sessions(id) on delete cascade,
  role text check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamp with time zone default now()
);

-- 4. Create room_hotspots for "Shop the Room"
create table if not exists public.room_hotspots (
  id uuid primary key default gen_random_uuid(),
  room_image_url text not null,
  product_id uuid references public.products(id) on delete cascade,
  x_coord float not null, -- Percentage 0-100
  y_coord float not null, -- Percentage 0-100
  metadata jsonb,
  created_at timestamp with time zone default now()
);

-- 5. Add 3D asset support to products table (if not exists)
alter table public.products 
add column if not exists model_url_glb text,
add column if not exists model_url_usdz text;

-- 6. RLS Policies
alter table public.product_embeddings enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;
alter table public.room_hotspots enable row level security;

-- Admin users - Separate table for convenience or use custom claims
create table if not exists public.admin_users (
  id uuid primary key references auth.users(id),
  role text default 'editor',
  created_at timestamp with time zone default now()
);
alter table public.admin_users enable row level security;

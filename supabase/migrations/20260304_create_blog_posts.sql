-- Supabase SQL Migration: blog_posts table
-- Run this once in Supabase Dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS blog_posts (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text        NOT NULL,
  slug             text        UNIQUE NOT NULL,
  content          text        DEFAULT '',
  excerpt          text        DEFAULT '',
  cover_image      text        DEFAULT '',
  author           text        DEFAULT '',
  category         text        DEFAULT '',
  status           text        DEFAULT 'draft'
                               CHECK (status IN ('draft', 'published', 'scheduled')),
  published_at     timestamptz,
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now(),
  meta_title       text        DEFAULT '',
  meta_description text        DEFAULT '',
  read_time        int         DEFAULT 0,
  view_count       int         DEFAULT 0
);

-- Optional: Enable Row Level Security (RLS)
-- ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Optional: Add index for fast slug lookup
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON blog_posts (status);
CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx ON blog_posts (created_at DESC);

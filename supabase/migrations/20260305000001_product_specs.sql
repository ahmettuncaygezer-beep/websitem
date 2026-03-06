-- Add detailed specification columns to products table
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS description_full TEXT,
  ADD COLUMN IF NOT EXISTS features TEXT,
  ADD COLUMN IF NOT EXISTS delivery_info TEXT;

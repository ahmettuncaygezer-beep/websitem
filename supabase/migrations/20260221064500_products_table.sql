-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    sale_price NUMERIC,
    category_id TEXT,
    category_slug TEXT,
    images TEXT[] DEFAULT '{}',
    lifestyle_image TEXT,
    colors JSONB[] DEFAULT '{}',
    materials TEXT[] DEFAULT '{}',
    dimensions JSONB,
    stock INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    brand TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT 
USING (true);

CREATE POLICY "Products can be managed by authenticated admins" 
ON public.products FOR ALL 
TO authenticated 
USING (auth.jwt() ->> 'email' IN ('tunca@example.com')) -- Replace with actual admin emails
WITH CHECK (auth.jwt() ->> 'email' IN ('tunca@example.com'));

-- Functions for triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

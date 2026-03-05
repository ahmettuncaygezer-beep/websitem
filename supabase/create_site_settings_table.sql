-- Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS site_settings_key_idx ON public.site_settings (key);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies (Allow all for now, or refine if needed)
CREATE POLICY "Enable read access for all users" ON public.site_settings
    FOR SELECT USING (true);

CREATE POLICY "Enable all access for authenticated users" ON public.site_settings
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert initial home page sections if empty
-- (Optional: you can seed this with mockPageSections if desired)

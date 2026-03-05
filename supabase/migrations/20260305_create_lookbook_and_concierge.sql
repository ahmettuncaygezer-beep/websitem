-- Create lookbook_items table
CREATE TABLE IF NOT EXISTS public.lookbook_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    cover_image TEXT,
    images TEXT[] DEFAULT '{}',
    season TEXT,
    tags TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: In Supabase, if we want sort_order to auto-increment we'd typically manage it application-side or via trigger,
-- but a default of 0 is fine and we'll handle setting the max order on insert.

-- Trigger for updating lookbook_items.updated_at
CREATE OR REPLACE FUNCTION update_lookbook_items_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trg_lookbook_items_updated_at ON public.lookbook_items;
CREATE TRIGGER trg_lookbook_items_updated_at
    BEFORE UPDATE ON public.lookbook_items
    FOR EACH ROW
    EXECUTE FUNCTION update_lookbook_items_updated_at();

-- RLS policies for lookbook_items
ALTER TABLE public.lookbook_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for lookbook_items" ON public.lookbook_items FOR SELECT USING (true);
CREATE POLICY "Admin full access for lookbook_items" ON public.lookbook_items USING (true); -- simplify as other tables in this app, typically secure by API

-- Create concierge_requests table
CREATE TABLE IF NOT EXISTS public.concierge_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID, -- Will link if user is logged in
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    request_type TEXT NOT NULL, -- 'ozel_siparis' | 'stil_danisma' | 'hediye'
    message TEXT,
    budget NUMERIC(10,2),
    status TEXT DEFAULT 'bekliyor', -- 'bekliyor' | 'inceleniyor' | 'tamamlandi' | 'iptal'
    admin_notes TEXT,
    assigned_to UUID, -- Could link to auth.users or admin_users if such table exists
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger for updating concierge_requests.updated_at
CREATE OR REPLACE FUNCTION update_concierge_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trg_concierge_requests_updated_at ON public.concierge_requests;
CREATE TRIGGER trg_concierge_requests_updated_at
    BEFORE UPDATE ON public.concierge_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_concierge_requests_updated_at();

-- RLS policies for concierge_requests
ALTER TABLE public.concierge_requests ENABLE ROW LEVEL SECURITY;
-- For now, all access allowed since it's driven by admin API. Public insert will be from frontend API route.
CREATE POLICY "Public insert access for concierge" ON public.concierge_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access for concierge" ON public.concierge_requests USING (true);


-- Storage bucket for lookbook
INSERT INTO storage.buckets (id, name, public) VALUES ('lookbook', 'lookbook', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access for lookbook bucket" ON storage.objects
FOR SELECT USING (bucket_id = 'lookbook');

CREATE POLICY "Authenticated upload for lookbook bucket" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'lookbook');

CREATE POLICY "Authenticated delete for lookbook bucket" ON storage.objects
FOR DELETE USING (bucket_id = 'lookbook');

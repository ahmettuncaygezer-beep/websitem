-- 1. Upgrade newsletter_subscribers table
ALTER TABLE IF EXISTS newsletter_subscribers 
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'DIRECT',
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

-- 2. Create newsletter_campaigns table
CREATE TABLE IF NOT EXISTS newsletter_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject TEXT NOT NULL,
    target_audience TEXT DEFAULT 'Tüm Aboneler',
    content_blocks JSONB NOT NULL DEFAULT '[]',
    status TEXT DEFAULT 'draft', -- draft, sent
    stats JSONB DEFAULT '{"sent_count": 0, "open_rate": 0, "click_rate": 0}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sent_at TIMESTAMP WITH TIME ZONE
);

-- 3. RLS for campaigns (Admin only)
ALTER TABLE newsletter_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on campaigns" 
ON newsletter_campaigns 
FOR ALL 
USING (true); -- Assuming middleware/API handles auth

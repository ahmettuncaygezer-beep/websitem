-- ══════════════════════════════════════════════════════════════
-- Campaigns Table (with product/category relationship fields)
-- ══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'PercentDiscount',
    status TEXT NOT NULL DEFAULT 'draft',
    discount_value DECIMAL(10,2) DEFAULT 0,
    discount_unit TEXT DEFAULT 'yüzde',
    coupon_code TEXT UNIQUE,
    is_single_use BOOLEAN DEFAULT false,
    usage_count INTEGER DEFAULT 0,
    usage_limit INTEGER,
    min_order_amount DECIMAL(10,2),
    min_product_count INTEGER,
    valid_categories JSONB DEFAULT '[]',
    valid_products JSONB DEFAULT '[]',
    target_segment TEXT DEFAULT 'Tümü',
    per_user_limit INTEGER,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    description TEXT,
    flash_sale_end_date TIMESTAMPTZ,
    bundle_products JSONB DEFAULT '[]',
    bundle_condition JSONB,
    revenue DECIMAL(12,2) DEFAULT 0,
    orders INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage campaigns" ON public.campaigns
    FOR ALL USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON public.campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_coupon_code ON public.campaigns(coupon_code);
CREATE INDEX IF NOT EXISTS idx_campaigns_dates ON public.campaigns(start_date, end_date);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_campaigns_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_campaigns_updated_at ON public.campaigns;
CREATE TRIGGER update_campaigns_updated_at
    BEFORE UPDATE ON public.campaigns
    FOR EACH ROW EXECUTE FUNCTION update_campaigns_updated_at();

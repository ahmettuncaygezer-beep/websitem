-- ══════════════════════════════════════════════════════════════
-- Stock Notifications table
-- Customers subscribe to be notified when a product is back in stock
-- ══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.stock_notifications (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id   TEXT NOT NULL,
    product_name TEXT,
    email        TEXT NOT NULL,
    phone        TEXT,
    channels     JSONB DEFAULT '["email"]',
    notified_at  TIMESTAMPTZ,          -- set when the notification is sent
    created_at   TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT stock_notifications_product_email_unique UNIQUE (product_id, email)
);

-- RLS
ALTER TABLE public.stock_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage stock_notifications" ON public.stock_notifications
    FOR ALL USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_stock_notif_product_id ON public.stock_notifications(product_id);
CREATE INDEX IF NOT EXISTS idx_stock_notif_email      ON public.stock_notifications(email);
CREATE INDEX IF NOT EXISTS idx_stock_notif_notified   ON public.stock_notifications(notified_at);

-- ══════════════════════════════════════════════════════════════
-- Email Send History Table
-- ══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.email_send_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL,
    to_email TEXT NOT NULL,
    subject TEXT,
    status TEXT NOT NULL DEFAULT 'sent',
    error_message TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.email_send_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage email history" ON public.email_send_history
    FOR ALL USING (true);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_email_history_created_at ON public.email_send_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_history_type ON public.email_send_history(type);

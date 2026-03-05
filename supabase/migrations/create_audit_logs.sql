-- ============================================================
-- Audit Logs table — tracks all admin panel actions
-- ============================================================

CREATE TABLE IF NOT EXISTS audit_logs (
    id              uuid            PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id        uuid            REFERENCES admin_users(id) ON DELETE SET NULL,
    admin_email     text            NOT NULL DEFAULT 'unknown',
    action          text            NOT NULL,       -- e.g. 'product.update', 'order.status_change'
    entity_type     text            NOT NULL,       -- e.g. 'product', 'order', 'category'
    entity_id       text,                           -- ID of the affected entity
    entity_name     text,                           -- Human-readable name
    old_value       jsonb,                          -- State before the action
    new_value       jsonb,                          -- State after the action
    ip_address      text,
    created_at      timestamptz     NOT NULL DEFAULT now()
);

-- Index for fast paginated queries (newest first)
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs (created_at DESC);

-- Index for filtering by entity
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs (entity_type, entity_id);

-- Index for filtering by admin
CREATE INDEX IF NOT EXISTS idx_audit_logs_admin ON audit_logs (admin_email);

-- RLS: Only authenticated users with admin role can read
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read audit logs"
    ON audit_logs FOR SELECT
    USING (true);

CREATE POLICY "Service role can insert audit logs"
    ON audit_logs FOR INSERT
    WITH CHECK (true);

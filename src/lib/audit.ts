import { SupabaseClient } from '@supabase/supabase-js';

// ─── Types ──────────────────────────────────────────────────────────────────────

export interface LogActionParams {
    action: string;        // e.g. 'product.update', 'order.status_change', 'category.delete'
    entityType: string;    // e.g. 'product', 'order', 'category', 'campaign', 'settings'
    entityId: string;      // ID of the entity
    entityName?: string;   // Human-readable name of the entity
    oldValue?: any;        // Previous state (before mutation)
    newValue?: any;        // New state (after mutation)
}

export interface AdminInfo {
    adminId?: string | null;
    adminEmail: string;
}

// ─── Extract IP from request headers ────────────────────────────────────────────

function getIpAddress(req: Request): string {
    const forwarded = req.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    const realIp = req.headers.get('x-real-ip');
    if (realIp) return realIp;
    return '127.0.0.1';
}

// ─── Extract admin info from session/mock ───────────────────────────────────────

export function getAdminInfo(authResult: {
    session?: any;
    isMock?: boolean;
    role?: string;
}): AdminInfo {
    if (authResult.isMock || !authResult.session) {
        return {
            adminId: null,
            adminEmail: 'admin@mock.dev',
        };
    }
    return {
        adminId: authResult.session.user?.id || null,
        adminEmail: authResult.session.user?.email || 'unknown',
    };
}

// ─── Main logging function ──────────────────────────────────────────────────────

/**
 * Logs an admin action to the audit_logs table.
 * 
 * Wrapped in try/catch — errors are logged to console but
 * NEVER block the main API operation.
 */
export async function logAction(
    req: Request,
    supabase: SupabaseClient,
    adminInfo: AdminInfo,
    params: LogActionParams
): Promise<void> {
    try {
        const ip = getIpAddress(req);

        await supabase.from('audit_logs').insert({
            admin_id: adminInfo.adminId || null,
            admin_email: adminInfo.adminEmail,
            action: params.action,
            entity_type: params.entityType,
            entity_id: params.entityId,
            entity_name: params.entityName || null,
            old_value: params.oldValue || null,
            new_value: params.newValue || null,
            ip_address: ip,
        });
    } catch (err) {
        // Never block the main operation
        console.error('[AuditLog] Failed to log action:', err);
    }
}

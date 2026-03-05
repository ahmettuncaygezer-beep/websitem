export type AdminRole = 'super_admin' | 'admin' | 'editor' | 'support';

// Central registry of fine-grained permissions
export const PERMISSIONS = {
    // --- Products ---
    'products.view': ['super_admin', 'admin', 'editor'],
    'products.edit': ['super_admin', 'admin', 'editor'],
    'products.create': ['super_admin', 'admin', 'editor'],
    'products.delete': ['super_admin', 'admin'],

    // --- Categories ---
    'categories.view': ['super_admin', 'admin', 'editor'],
    'categories.edit': ['super_admin', 'admin', 'editor'],
    'categories.create': ['super_admin', 'admin', 'editor'],
    'categories.delete': ['super_admin', 'admin'],

    // --- Orders ---
    'orders.view': ['super_admin', 'admin', 'support'],
    'orders.update': ['super_admin', 'admin', 'support'], // status update
    'orders.delete': ['super_admin'],

    // --- Customers ---
    'customers.view': ['super_admin', 'admin', 'support'],
    'customers.edit': ['super_admin', 'admin'],
    'customers.delete': ['super_admin'],

    // --- Content (Blog, Lookbook, Homepage) ---
    'content.view': ['super_admin', 'admin', 'editor'],
    'content.edit': ['super_admin', 'admin', 'editor'],
    'content.delete': ['super_admin', 'admin', 'editor'],

    // --- Reviews ---
    'reviews.view': ['super_admin', 'admin', 'editor'],
    'reviews.approve': ['super_admin', 'admin', 'editor'],
    'reviews.delete': ['super_admin', 'admin'],

    // --- Campaigns ---
    'campaigns.view': ['super_admin', 'admin'],
    'campaigns.create': ['super_admin', 'admin'],
    'campaigns.edit': ['super_admin', 'admin'],
    'campaigns.delete': ['super_admin', 'admin'],

    // --- Settings / System ---
    'settings.view': ['super_admin', 'admin'],
    'settings.edit': ['super_admin'], // Only super_admin can change settings according to rules

    // --- Users (Admin Management) ---
    'users.view': ['super_admin'],
    'users.manage': ['super_admin'],
    'users.delete': ['super_admin'],

    // --- Audit Logs ---
    'auditlogs.view': ['super_admin'],
    'auditlogs.delete': ['super_admin'],

    // --- Concierge & Notifications ---
    'concierge.view': ['super_admin', 'admin', 'support'],
    'concierge.edit': ['super_admin', 'admin', 'support'],
    'notifications.view': ['super_admin', 'admin', 'support'],
    'notifications.send': ['super_admin', 'admin', 'support'],
};

// Central registry of Module/Path Access Level
export const PATH_PERMISSIONS: Record<string, AdminRole[]> = {
    // Exact paths or prefixes
    '/admin': ['super_admin', 'admin', 'editor', 'support'], // Dashboard accessible to all (read-only handled by UI)
    '/admin/dashboard': ['super_admin', 'admin', 'editor', 'support'],

    // Products
    '/admin/urunler': ['super_admin', 'admin', 'editor'],
    '/admin/kategoriler': ['super_admin', 'admin', 'editor'],
    '/admin/medya': ['super_admin', 'admin', 'editor'],

    // Order & CRM
    '/admin/siparisler': ['super_admin', 'admin', 'support'],
    '/admin/musteriler': ['super_admin', 'admin', 'support'],
    '/admin/yorumlar': ['super_admin', 'admin', 'editor'],
    '/admin/concierge': ['super_admin', 'admin', 'support'],
    '/admin/bildirimler': ['super_admin', 'admin', 'support'],

    // Growth
    '/admin/analytics': ['super_admin', 'admin'],
    '/admin/kampanyalar': ['super_admin', 'admin'],
    '/admin/eposta': ['super_admin', 'admin'],

    // Content
    '/admin/icerik': ['super_admin', 'admin', 'editor'],

    // System
    '/admin/ayarlar': ['super_admin', 'admin'], // Admin can see general settings but not security/integrations
    '/admin/ayarlar/guvenlik': ['super_admin'],
    '/admin/ayarlar/entegrasyon': ['super_admin'],
    '/admin/kullanicilar': ['super_admin'],
};

/**
 * Checks if a given role has a specific fine-grained permission action.
 */
export function hasPermission(role: string, action: keyof typeof PERMISSIONS): boolean {
    if (role === 'super_admin') return true; // Super admin always has all permissions
    const allowedRoles = PERMISSIONS[action];
    if (!allowedRoles) return false;
    return allowedRoles.includes(role as AdminRole);
}

/**
 * Checks if a given role can access a specific router path.
 * Evaluates exact match, then falls back to prefix matching.
 */
export function canAccess(role: string, path: string): boolean {
    if (role === 'super_admin') return true;

    // Ensure we are only checking paths starting with /admin
    if (!path.startsWith('/admin')) return true;

    // Exact Match First
    if (PATH_PERMISSIONS[path]) {
        return PATH_PERMISSIONS[path].includes(role as AdminRole);
    }

    // Prefix Match (e.g. /admin/urunler/yeni should match /admin/urunler)
    // Find the longest matching prefix
    let bestMatch = '';
    for (const key of Object.keys(PATH_PERMISSIONS)) {
        if (path.startsWith(key) && key.length > bestMatch.length) {
            bestMatch = key;
        }
    }

    if (bestMatch && PATH_PERMISSIONS[bestMatch]) {
        // Special strict sub-path exclusions for 'admin'
        if (role === 'admin') {
            if (path.startsWith('/admin/ayarlar/guvenlik')) return false;
            if (path.startsWith('/admin/ayarlar/entegrasyon')) return false;
            if (path.startsWith('/admin/kullanicilar')) return false;
        }

        return PATH_PERMISSIONS[bestMatch].includes(role as AdminRole);
    }

    // Default deny if no path matching
    return false;
}

-- update_admin_roles.sql
-- This migration updates the existing roles in the 'admin_users' table to match the new RBAC system

BEGIN;

-- Update existing users to the new role names
UPDATE admin_users SET role = 'super_admin' WHERE role = 'super-admin' OR role = 'owner';
UPDATE admin_users SET role = 'editor' WHERE role = 'content-editor' OR role = 'yazar';
UPDATE admin_users SET role = 'support' WHERE role = 'order-manager' OR role = 'destek';
UPDATE admin_users SET role = 'admin' WHERE role = 'manager';

-- Ensure all remaining NULL or unmapped roles get the lowest access or default
UPDATE admin_users SET role = 'editor' WHERE role NOT IN ('super_admin', 'admin', 'editor', 'support');

COMMIT;

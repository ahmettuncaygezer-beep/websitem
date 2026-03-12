const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const env = fs.readFileSync(envPath, 'utf8');
const supabaseUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const supabaseKey = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllPossibleTables() {
    const tableCandidates = [
        'users', 'profiles', 'customer_profiles', 'products', 'categories', 'orders', 'order_items',
        'campaigns', 'coupons', 'pages', 'menus', 'menu_items', 'translations', 'languages',
        'seo_meta', 'reviews', 'contact_messages', 'newsletter_subscribers', 'lookbook_items',
        'lookbook_photos', 'lookbook_tags', 'lookbook_collections', 'audit_logs', 'concierge_requests'
    ];

    console.log('--- STARTING DATABASE AUDIT ---');

    for (const table of tableCandidates) {
        process.stdout.write(`Checking [${table}]... `);
        try {
            const { data, count, error } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });

            if (error) {
                if (error.code === '42P01') { // Undefined table
                    console.log('MISSING');
                } else {
                    console.log(`ERROR (${error.code}) - ${error.message}`);
                }
            } else {
                console.log(`EXISTS (${count || 0} rows)`);
            }
        } catch (err) {
            console.log(`FATAL ERROR - ${err.message}`);
        }
    }
    console.log('--- AUDIT COMPLETE ---');
}

checkAllPossibleTables();

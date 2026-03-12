
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
    const tables = ['users', 'products', 'categories', 'orders', 'customers', 'customer_profiles', 'campaigns', 'coupons', 'pages', 'menus', 'translations', 'languages', 'seo_meta'];
    console.log('Checking table existence...');

    for (const table of tables) {
        const { data, error } = await supabase
            .from(table)
            .select('id')
            .limit(1);

        if (error) {
            if (error.code === 'PGRST204' || error.message.includes('not find')) {
                console.log(`[-] ${table}: MISSING`);
            } else {
                console.log(`[?] ${table}: ERROR (${error.code}) - ${error.message}`);
            }
        } else {
            console.log(`[+] ${table}: EXISTS (${data.length} rows sample)`);
        }
    }
}

checkTables();

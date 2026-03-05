require('dotenv').config({ path: '.env.local' });
const { createClient: createSupabaseClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    console.log('Checking site_settings table with ANON key...');

    // Check if table exists
    const { data: cols, error: colError } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1);

    if (colError) {
        console.error('Error querying table:', colError.message);
    } else {
        console.log('Table accessibility confirmed.');
        if (cols.length > 0) {
            console.log('Keys in row:', Object.keys(cols[0]));
        } else {
            console.log('Table is empty.');
        }
    }
}

checkSchema();

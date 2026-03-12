const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const env = fs.readFileSync(envPath, 'utf8');
const supabaseUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const supabaseKey = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    process.stdout.write(`Fetching columns for products... `);
    // There is no direct "describe" in supabase-js, so we'll try to select one row and check keys
    const { data, error } = await supabase.from('products').select('*').limit(1);
    if (error) {
        console.log('ERROR:', error);
    } else if (data && data.length > 0) {
        console.log('Fields:', Object.keys(data[0]).join(', '));
        console.log('Example category_id value:', data[0].category_id, typeof data[0].category_id);
    } else {
        console.log('No data found to check fields.');
    }
}

checkSchema();

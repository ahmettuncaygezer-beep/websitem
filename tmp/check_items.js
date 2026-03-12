const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const env = fs.readFileSync(envPath, 'utf8');
const supabaseUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const supabaseKey = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkOrderItems() {
    const { data: items, error } = await supabase.from('order_items').select('*').limit(1);
    if (error) console.error(error);
    else if (data && data.length > 0) console.log('Fields:', Object.keys(data[0]).join(', '));
    else console.log('No order items found.');
}

checkOrderItems();

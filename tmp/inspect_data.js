const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const env = fs.readFileSync(envPath, 'utf8');
const supabaseUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const supabaseKey = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectOrders() {
    console.log('--- INSPECTING ORDERS ---');
    const { data: orders, error } = await supabase.from('orders').select('*');
    if (error) console.error(error);
    else console.log(`Found ${orders.length} orders:`, JSON.stringify(orders, null, 2));

    const { data: items, error: iErr } = await supabase.from('order_items').select('*');
    if (iErr) console.error(iErr);
    else console.log(`Found ${items.length} order items:`, JSON.stringify(items, null, 2));

    const { data: users, error: uErr } = await supabase.from('users').select('*');
    if (uErr) console.error(uErr);
    else console.log(`Found ${users.length} users:`, JSON.stringify(users, null, 2));
}

inspectOrders();

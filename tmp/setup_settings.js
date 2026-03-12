const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const env = fs.readFileSync(envPath, 'utf8');
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const key = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();

const supabase = createClient(url, key);

async function setupSettings() {
    console.log('--- SETTING UP SETTINGS TABLE ---');
    // Using simple query if RPC is not available
    const { error: tErr } = await supabase.from('settings').select('*').limit(1);

    if (tErr && tErr.code === '42P01') {
        console.log('Table missing. Please run the SQL manually or I will try to use product update trick if possible (unlikely).');
        console.log('Actually, I will just provide the SQL for the user to run if needed, but let us try to insert into existing tables first.');
    } else {
        const { error: insErr } = await supabase.from('settings').upsert({
            id: 'general',
            value: {
                maintenance_mode: false,
                site_name: "SelisHome",
                maintenance_message: "Size daha iyi hizmet verebilmek için kısa bir süreliğine bakımdayız.",
                allowed_ips: []
            }
        });
        if (insErr) console.error('Insert error:', insErr.message);
        else console.log('Settings initialized!');
    }
}

setupSettings();

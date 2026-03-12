require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function check() {
    const { data, error } = await supabase.from('site_settings').select('*');
    if (error) {
        console.log("Error:", error.message);
    } else {
        data.forEach(item => {
            console.log(`Key: ${item.key}`);
            console.log(`Value: ${JSON.stringify(item.value, null, 2)}`);
            console.log("---");
        });
    }
}

check();

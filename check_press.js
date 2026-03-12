require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function check() {
    console.log("Checking press_items...");
    const { data, error } = await supabase.from('press_items').select('*');
    if (error) {
        console.log("Error:", error.message);
    } else {
        console.log("Press Items:", JSON.stringify(data, null, 2));
    }
}

check();

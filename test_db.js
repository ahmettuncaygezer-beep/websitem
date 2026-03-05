require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function check() {
    const { data, error } = await supabase
        .from('products')
        .select('id, name, price, sale_price, slug, is_active, stock, category_slug, brand')
        .eq('is_active', true);

    console.log("Error:", error);
    console.log("Data count:", data ? data.length : 0);
    if (data) console.log("First item:", data[0]);
}

check();

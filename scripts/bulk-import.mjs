import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Using anon key for now, service role is safer for bulk

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to convert camelCase to snake_case
const toSnakeCase = (obj) => {
    const snakeObj = {};
    for (const [key, value] of Object.entries(obj)) {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        snakeObj[snakeKey] = value;
    }
    return snakeObj;
};

async function importProducts() {
    try {
        // You can point this to any JSON file
        // For now, let's assume we have a products.json 
        // Example: node scripts/bulk-import.mjs products.json
        const filePath = process.argv[2];
        if (!filePath) {
            console.log('Usage: node scripts/bulk-import.mjs <path-to-json>');
            return;
        }

        const rawData = readFileSync(path.resolve(process.cwd(), filePath), 'utf8');
        const products = JSON.parse(rawData);

        console.log(`Importing ${products.length} products...`);

        const formattedProducts = products.map(p => {
            const { id, ...rest } = p; // Let Supabase gen UUID if id is present as 1, 2, 3
            return toSnakeCase(rest);
        });

        const { data, error } = await supabase
            .from('products')
            .upsert(formattedProducts, { onConflict: 'slug' });

        if (error) throw error;

        console.log('✅ Successfully imported/updated products!');
    } catch (err) {
        console.error('❌ Import failed:', err.message);
    }
}

importProducts();

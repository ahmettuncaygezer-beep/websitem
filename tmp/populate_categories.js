const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const env = fs.readFileSync(envPath, 'utf8');
const supabaseUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const supabaseKey = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();

const supabase = createClient(supabaseUrl, supabaseKey);

// Categories from src/lib/constants.ts
const CATEGORIES = [
    { id: '1', name: 'Oturma Odası', nameKey: 'nav_living_room', slug: 'oturma-odasi', description: 'Yaşam alanınız için lüks koltuklar ve mobilyalar' },
    { id: '2', name: 'Yatak Odası', nameKey: 'nav_bedroom', slug: 'yatak-odasi', description: 'Konforlu ve şık yatak odası mobilyaları' },
    { id: '3', name: 'Yemek Odası', nameKey: 'nav_dining', slug: 'yemek-odasi', description: 'Zarif yemek masaları ve sandalyeler' },
    { id: '4', name: 'Çalışma Odası', nameKey: 'nav_office', slug: 'calisma-odasi', description: 'Üretken çalışma alanları' },
    { id: '5', name: 'Aydınlatma', nameKey: 'nav_lighting', slug: 'aydinlatma', description: 'Atmosfer yaratan aydınlatma çözümleri' },
    { id: '6', name: 'Dekorasyon', nameKey: 'nav_decoration', slug: 'dekorasyon', description: 'Evinizi tamamlayan dekoratif aksesuarlar' },
    { id: '7', name: 'Genç & Çocuk Odası', nameKey: 'nav_kids_room', slug: 'genc-cocuk-odasi', description: 'Renkli ve enerjik genç odası mobilyaları' },
];

async function populateCategories() {
    console.log('--- POPULATING CATEGORIES ---');
    // First, check if categories.id is UUID or TEXT
    const { data: catSample, error: catErr } = await supabase.from('categories').select('*').limit(1);

    // My script created public.categories with UUID. If it's UUID, we need to handle it.
    // However, products have category_id as "2" (string).
    // Let's see if we should convert categories.id to TEXT or use UUIDs that match strings.

    const rows = CATEGORIES.map(c => ({
        id: c.id, // This will fail if it's UUID and we give "1"
        name_tr: c.name,
        name_en: c.name, // default
        slug: c.slug,
        description: c.description,
        is_active: true
    }));

    const { data, error } = await supabase.from('categories').upsert(rows);
    if (error) {
        console.error('Populate failed:', error.message);
        if (error.message.includes('uuid')) {
            console.log('Hint: The id column is UUID but we provided a string digit. We should probably recreate the table with TEXT id or use UUIDs.');
        }
    } else {
        console.log('Successfully populated categories!');
    }
}

populateCategories();

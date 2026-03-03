import { createClient } from '@supabase/supabase-js';
import { mockProducts } from '../src/data/mock-products';

const SUPABASE_URL = 'https://hvqsjhnlpaksnejlkcpl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cXNqaG5scGFrc25lamxrY3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMjc0NjEsImV4cCI6MjA4NzkwMzQ2MX0.cbI47gDi4YcukleRdsulBcm7U-8ADBmrnHVbIja_Q8c';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function toDbRow(p: any) {
    return {
        name: p.name || 'Unnamed',
        slug: p.slug || `product-${Date.now()}`,
        description: (p.description || '').replace(/<[^>]*>/g, '').trim() || null,
        price: p.price || 0,
        sale_price: p.salePrice || null,
        category_id: p.categoryId || null,
        category_slug: p.categorySlug || null,
        images: p.images || [],
        lifestyle_image: p.lifestyleImage || null,
        colors: (p.colors || []).map((c: any) => JSON.stringify(c)),
        materials: p.materials || [],
        dimensions: p.dimensions || null,
        stock: p.stock || 0,
        featured: !!p.featured,
        is_new: !!p.isNew,
        brand: p.brand || 'SelisHome',
    };
}

async function seed() {
    console.log('\n🌱 Starting product seed...\n');
    console.log(`📦 Loaded ${mockProducts.length} products from mock data\n`);

    // Filter out products with duplicate slugs
    const slugSet = new Set<string>();
    const uniqueProducts = mockProducts.filter((p: any) => {
        if (slugSet.has(p.slug)) {
            console.log(`  ⚠️ Duplicate slug skipped: ${p.slug}`);
            return false;
        }
        slugSet.add(p.slug);
        return true;
    });

    console.log(`\n📊 ${uniqueProducts.length} unique products to insert\n`);

    // Insert in batches of 20
    const batchSize = 20;
    let inserted = 0;
    let errors = 0;

    for (let i = 0; i < uniqueProducts.length; i += batchSize) {
        const batch = uniqueProducts.slice(i, i + batchSize);
        const rows = batch.map(toDbRow);

        const { error } = await supabase
            .from('products')
            .upsert(rows, { onConflict: 'slug' });

        if (error) {
            console.error(`  ❌ Batch ${Math.floor(i / batchSize) + 1} error:`, error.message);
            errors += batch.length;
        } else {
            inserted += batch.length;
            console.log(`  ✅ Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} products`);
        }
    }

    console.log(`\n════════════════════════════════════════`);
    console.log(`✅ Inserted: ${inserted}`);
    console.log(`❌ Errors: ${errors}`);
    console.log(`════════════════════════════════════════\n`);

    // Verify
    const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });
    console.log(`📊 Total products in DB: ${count}\n`);
}

seed().catch(console.error);

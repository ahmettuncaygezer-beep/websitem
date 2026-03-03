/**
 * Seed script: Import all mock products into Supabase.
 * Usage: node scripts/seed-products.mjs
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = 'https://hvqsjhnlpaksnejlkcpl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cXNqaG5scGFrc25lamxrY3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMjc0NjEsImV4cCI6MjA4NzkwMzQ2MX0.cbI47gDi4YcukleRdsulBcm7U-8ADBmrnHVbIja_Q8c';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Read the mock products TS file and parse the array
async function loadMockProducts() {
    const filePath = path.join(__dirname, '..', 'src', 'data', 'mock-products.ts');
    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove TypeScript-specific constructs
    content = content.replace(/import\s+.*?;\s*/g, '');
    content = content.replace(/export\s+/g, '');
    content = content.replace(/const\s+mockProducts\s*:\s*Product\[\]\s*=/, 'var mockProducts =');
    content = content.replace(/nameKey\s*:.*?,/g, '');
    content = content.replace(/descriptionKey\s*:.*?,/g, '');
    content = content.replace(/as\s+\w+/g, '');

    // Evaluate using Function constructor (safe for local scripts)
    const fn = new Function(content + '\nreturn mockProducts;');
    return fn();
}

// Map frontend Product type to database columns
function toDbRow(p) {
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
        colors: (p.colors || []).map(c => JSON.stringify(c)),
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

    const products = await loadMockProducts();
    console.log(`📦 Loaded ${products.length} products from mock data\n`);

    // Filter out products with duplicate slugs
    const slugSet = new Set();
    const uniqueProducts = products.filter(p => {
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

        const { data, error } = await supabase
            .from('products')
            .upsert(rows, { onConflict: 'slug' });

        if (error) {
            console.error(`  ❌ Batch ${Math.floor(i / batchSize) + 1} error:`, error.message);
            errors += batch.length;
        } else {
            inserted += batch.length;
            console.log(`  ✅ Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} products inserted`);
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

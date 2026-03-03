/**
 * Migration runner — Run all SQL migrations against Supabase.
 * Usage: node scripts/run-migrations.mjs
 * 
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 * Since we only have the anon key, this uses the Supabase REST RPC endpoint
 * or falls back to logging instructions.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.join(__dirname, '..', 'supabase', 'migrations');

const SUPABASE_URL = 'https://hvqsjhnlpaksnejlkcpl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cXNqaG5scGFrc25lamxrY3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMjc0NjEsImV4cCI6MjA4NzkwMzQ2MX0.cbI47gDi4YcukleRdsulBcm7U-8ADBmrnHVbIja_Q8c';

async function runMigrations() {
    const files = fs.readdirSync(MIGRATIONS_DIR)
        .filter(f => f.endsWith('.sql'))
        .sort();

    console.log(`\n📦 Found ${files.length} migration files:\n`);

    let allSQL = '';
    for (const file of files) {
        const content = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf-8');
        console.log(`  ✓ ${file} (${content.length} bytes)`);
        allSQL += `\n-- ═══ ${file} ═══\n${content}\n`;
    }

    console.log('\n🔗 Supabase URL:', SUPABASE_URL);
    console.log('\n════════════════════════════════════════════════════\n');
    console.log('📋 Tüm migration SQL\'i aşağıda birleştirildi.');
    console.log('   Supabase Dashboard → SQL Editor\'e yapıştırın:');
    console.log(`   ${SUPABASE_URL.replace('.co', '.co')}/project/hvqsjhnlpaksnejlkcpl/sql/new`);
    console.log('\n════════════════════════════════════════════════════\n');
    console.log(allSQL);
}

runMigrations().catch(console.error);

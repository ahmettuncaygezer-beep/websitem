import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hvqsjhnlpaksnejlkcpl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cXNqaG5scGFrc25lamxrY3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMjc0NjEsImV4cCI6MjA4NzkwMzQ2MX0.cbI47gDi4YcukleRdsulBcm7U-8ADBmrnHVbIja_Q8c';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const { data, error } = await supabase.from('categories').select('*').limit(1);
    if (error) {
        console.error("Error connecting to table:", error.message);
    } else {
        console.log("Table 'categories' exists. First row:", data.length > 0 ? Object.keys(data[0]) : "No data but table exists");
    }
}

check();

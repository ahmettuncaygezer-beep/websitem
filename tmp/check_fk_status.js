const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hvqsjhnlpaksnejlkcpl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cXNqaG5scGFrc25lamxrY3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMjc0NjEsImV4cCI6MjA4NzkwMzQ2MX0.cbI47gDi4YcukleRdsulBcm7U-8ADBmrnHVbIja_Q8c';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkFK() {
    console.log('Checking foreign keys for "reviews" table...');

    // We can't query information_schema directly via PostgREST easily if RLS is on or not exposed.
    // But we can try an RPC if one exists, or just try to join directly in a way that would fail with a different error if it existed.

    // Let's try a simpler join to see if it works now.
    const { data, error } = await supabase
        .from('reviews')
        .select('id, user_id, profiles(id)')
        .limit(1);

    if (error) {
        console.log('Error attempting join:', error.message);
        console.log('Error details:', error);
    } else {
        console.log('Join successful! Relationship exists.');
        console.log('Data sample:', data);
    }
}

checkFK();

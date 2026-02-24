import { createClient } from '@supabase/supabase-js';
import { OpenAIEmbeddings } from '@langchain/openai';
import { mockProducts } from '../src/data/mock-products';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Need service role for upserting
const openaiApiKey = process.env.OPENAI_API_KEY!;

if (!supabaseUrl || !supabaseKey || !openaiApiKey) {
    console.error('Missing environment variables. Check .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const embeddings = new OpenAIEmbeddings({
    openAIApiKey: openaiApiKey,
    modelName: 'text-embedding-3-small',
});

async function seed() {
    console.log('Starting embedding process for', mockProducts.length, 'products...');

    for (const product of mockProducts) {
        const textToEmbed = `
            Name: ${product.name}
            Description: ${product.description}
            Category: ${product.categorySlug}
            Materials: ${product.materials?.join(', ') || ''}
            Price: ${product.price}
            Brand: ${product.brand || 'MAISON'}
        `.trim();

        console.log(`Generating embedding for: ${product.name}`);

        try {
            const embedding = await embeddings.embedQuery(textToEmbed);

            const { error } = await supabase
                .from('products')
                .upsert({
                    id: isNaN(Number(product.id)) ? undefined : undefined, // Handle UUID vs String ID
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: product.categorySlug,
                    image_url: product.images[0],
                    embedding: embedding
                }, { onConflict: 'name' }); // Using name as unique identifier for this demo

            if (error) {
                console.error(`Error inserting ${product.name}:`, error.message);
            } else {
                console.log(`Successfully stored ${product.name}`);
            }
        } catch (err) {
            console.error(`Failed to embed ${product.name}:`, err);
        }
    }

    console.log('Embedding process completed.');
}

seed();

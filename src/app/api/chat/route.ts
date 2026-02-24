import { openai, createOpenAI } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { mockProducts } from '@/data/mock-products';

// Pollinations AI: Free, keyless, and OpenAI-compatible
const pollinations = createOpenAI({
    baseURL: 'https://text.pollinations.ai/v1',
    apiKey: 'pollinations', // Dummy key required by the SDK
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isUrlValid = (url: string) => {
    try {
        return url.startsWith('http');
    } catch {
        return false;
    }
};

const supabase = isUrlValid(supabaseUrl) && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Model selection logic: Prefer Gemini if key is present, otherwise fallback to OpenAI
    const googleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    let model: any;
    if (googleKey) {
        console.log('Using Google Gemini');
        model = google('gemini-1.5-flash');
    } else if (openaiKey) {
        console.log('Using OpenAI GPT-4o-mini');
        model = openai('gpt-4o-mini');
    } else {
        console.log('Using Pollinations AI (Free/Keyless Fallback)');
        model = pollinations('openai');
    }

    const result = await streamText({
        model,
        system: `Sen dünyanın en lüks mobilya mağazasının Dijital İç Mimarı ve Müşteri Temsilcisisin (MAISON Concierge). 
        Yanıtların çok kibar, kısa ve ikna edici olmalı. 
        Müşterilere ürün önerirken mutlaka sitemizin veritabanından çektiğin gerçek ürünleri kullan. 
        Teslimat süremizin tüm ürünlerde 7 gün olduğunu ve beyaz eldiven (white-glove) kurulum hizmetimiz olduğunu unutma.
        Eğer kullanıcı belirli bir ürün veya tarz sorarsa (örn: "keten koltuk", "hardal sarısı"), önce searchProducts tool'unu kullan.
        Ürün önerirken şu formatı kullan: [Ürün Adı] - [Fiyat] (Link: /shop/product/[slug])
        Dilin her zaman elit ve yardımsever olsun.`,
        messages,
        // Disable tools if using Pollinations as it's a simple text model
        tools: (!googleKey && !openaiKey) ? {} as any : {
            searchProducts: {
                description: 'Veritabanında semantik veya metin tabanlı ürün araması yapar.',
                inputSchema: z.object({
                    query: z.string().describe('Kullanıcının aradığı ürün veya özellikler'),
                }),
                execute: async ({ query }: { query: string }) => {
                    console.log('Searching for:', query);

                    // Fallback to mock search if Supabase or Embedding Key (OpenAI) is not ready
                    // Note: Embeddings usually still require OpenAI or a dedicated service
                    if (!supabase || !openaiKey) {
                        const lowerQuery = query.toLowerCase();
                        const found = mockProducts.filter(p =>
                            p.name.toLowerCase().includes(lowerQuery) ||
                            p.description.toLowerCase().includes(lowerQuery) ||
                            p.materials?.some(m => m.toLowerCase().includes(lowerQuery))
                        ).slice(0, 4);
                        return { products: found, method: 'mock' };
                    }

                    try {
                        // 1. Generate embedding for query
                        const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${openaiKey}`,
                            },
                            body: JSON.stringify({
                                input: query,
                                model: 'text-embedding-3-small',
                            }),
                        });

                        const embeddingData = await embeddingResponse.json();
                        if (!embeddingData.data) throw new Error('Embedding failed');

                        const query_embedding = embeddingData.data[0].embedding;

                        // 2. Search in Supabase using match_products RPC
                        const { data: products, error } = await supabase.rpc('match_products', {
                            query_embedding,
                            match_threshold: 0.5,
                            match_count: 4,
                        });

                        if (error) throw error;

                        // If no matches found with vector, try title match as fallback
                        if (!products || products.length === 0) {
                            const { data: textMatches } = await supabase
                                .from('products')
                                .select('*')
                                .ilike('name', `%${query}%`)
                                .limit(4);
                            return { products: textMatches || [], method: 'supabase-text' };
                        }

                        return { products, method: 'supabase-vector' };
                    } catch (err) {
                        console.error('Search error:', err);
                        // Final fallback to mock
                        return {
                            products: mockProducts.filter(p => p.name.includes(query)).slice(0, 3) as any,
                            method: 'error-fallback'
                        };
                    }
                },
            },
        },
    });

    return result.toTextStreamResponse();
}

import Anthropic from '@anthropic-ai/sdk';

export const maxDuration = 30;

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
    const { image, mediaType } = await req.json();

    if (!image) {
        return new Response(JSON.stringify({ error: 'No image provided' }), { status: 400 });
    }

    try {
        const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 500,
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'image',
                            source: {
                                type: 'base64',
                                media_type: (mediaType || 'image/jpeg') as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
                                data: image,
                            },
                        },
                        {
                            type: 'text',
                            text: `Bu mobilya görselini analiz et:
1. Mobilya türü nedir?
2. Stil (minimalist/klasik/modern/bohem/skandinav)?
3. Dominant renk?
4. Malzeme tahmini?

Sadece JSON formatında yanıtla, başka bir şey yazma:
{"type":"koltuk","style":"minimalist","color":"gri","material":"kumaş"}`,
                        },
                    ],
                },
            ],
        });

        // Parse JSON from response
        const text = response.content[0].type === 'text' ? response.content[0].text : '';
        let analysis = { type: 'bilinmiyor', style: 'modern', color: 'gri', material: 'kumaş' };
        try {
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) analysis = JSON.parse(jsonMatch[0]);
        } catch { /* use defaults */ }

        // Mock similar products based on analysis
        const styleProducts: Record<string, { id: string; name: string; price: number; image: string; href: string; matchScore: number; matchReason: string }[]> = {
            minimalist: [
                { id: 'f1', name: 'Luna Köşe Koltuk', price: 74990, image: '/images/gallery-1.jpg', href: '/urun/luna-kose-koltuk', matchScore: 91, matchReason: 'Benzer sade çizgiler' },
                { id: 'f6', name: 'Nova Sehpa', price: 8990, image: '/images/gallery-6.jpg', href: '/urun/nova-sehpa', matchScore: 87, matchReason: 'Minimal form' },
            ],
            klasik: [
                { id: 'f2', name: 'Nova 3\'lü Koltuk', price: 42990, image: '/images/gallery-2.jpg', href: '/urun/nova-3lu-koltuk', matchScore: 93, matchReason: 'Benzer zarif tasarım' },
                { id: 'f3', name: 'Atlas Berjer', price: 18990, image: '/images/gallery-3.jpg', href: '/urun/atlas-berjer', matchScore: 88, matchReason: 'Klasik form' },
            ],
            modern: [
                { id: 'f13', name: 'TV Ünitesi', price: 14990, image: '/images/gallery-1.jpg', href: '/urun/tv-unitesi', matchScore: 90, matchReason: 'Benzer geometrik çizgiler' },
                { id: 'f8', name: 'Çalışma Masası', price: 12990, image: '/images/gallery-2.jpg', href: '/urun/calisma-masasi', matchScore: 85, matchReason: 'Modern tasarım' },
            ],
            bohem: [
                { id: 'f17', name: 'Atlas Halı 200×300', price: 12990, image: '/images/gallery-5.jpg', href: '/urun/atlas-hali', matchScore: 92, matchReason: 'Benzer doğal doku' },
                { id: 'f4', name: 'Zen Puf', price: 6990, image: '/images/gallery-4.jpg', href: '/urun/zen-puf', matchScore: 86, matchReason: 'Rahat ve renkli' },
            ],
            skandinav: [
                { id: 'f1', name: 'Luna Köşe Koltuk', price: 74990, image: '/images/gallery-1.jpg', href: '/urun/luna-kose-koltuk', matchScore: 89, matchReason: 'Doğal keten dokusu' },
                { id: 'f11', name: 'Komodin', price: 5990, image: '/images/gallery-5.jpg', href: '/urun/komodin', matchScore: 84, matchReason: 'Ahşap sadelik' },
            ],
        };

        const products = styleProducts[analysis.style] || styleProducts.modern;

        return new Response(JSON.stringify({ analysis, products }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err: any) {
        console.error('Visual search error:', err);
        return new Response(JSON.stringify({ error: 'Visual analysis failed' }), { status: 500 });
    }
}

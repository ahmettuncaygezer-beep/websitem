import Anthropic from '@anthropic-ai/sdk';

export const maxDuration = 30;

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
    const { answers, scores, primaryStyle, secondaryStyle } = await req.json();

    const prompt = `Bir kullanıcı MAISON mobilya mağazasının stil testini tamamladı.

Stil puanları: ${JSON.stringify(scores)}
Ana stil: ${primaryStyle}
İkincil stil: ${secondaryStyle || 'yok'}

Lütfen bu sonuçlara göre kişisel bir analiz yaz:
- 3 kısa paragraf
- Türkçe, samimi ve ilham verici ton
- Kullanıcının tercihlerini anlatan, onlara özel hissettiren bir yorum
- Ev dekorasyonu için 2-3 pratik ipucu ver
- MAISON ürünlerinden bahsetme alanı bırak`;

    try {
        const stream = anthropic.messages.stream({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 600,
            messages: [{ role: 'user', content: prompt }],
        });

        const readableStream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                try {
                    for await (const event of stream) {
                        if (event.type === 'content_block_delta') {
                            const delta = event.delta as { type: string; text?: string };
                            if (delta.type === 'text_delta' && delta.text) {
                                controller.enqueue(encoder.encode(delta.text));
                            }
                        }
                    }
                } catch (err) {
                    console.error('Stream error:', err);
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(readableStream, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' },
        });
    } catch (err: any) {
        console.error('Quiz analysis error:', err);
        return new Response(JSON.stringify({ error: 'Analysis failed' }), { status: 500 });
    }
}

import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { buildSystemPrompt } from '@/components/AIAssistant/data/system.prompt';

export const maxDuration = 30;

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

// Simple in-memory rate limiting
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimits.get(ip);
    if (!entry || now > entry.resetAt) {
        rateLimits.set(ip, { count: 1, resetAt: now + 60000 }); // 1 min window
        return true;
    }
    if (entry.count >= 20) return false;
    entry.count++;
    return true;
}

export async function POST(req: Request) {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
        return new Response('Rate limit exceeded', { status: 429 });
    }

    const { messages, context, language = 'tr' } = await req.json();
    const systemPrompt = buildSystemPrompt(context, language);

    // Filter and map messages for common format
    const commonMessages = (messages || [])
        .filter((m: { role: string }) => m.role === 'user' || m.role === 'assistant')
        .map((m: { role: string; content: string }) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
        }));

    // Ensure messages alternate and start with user
    const cleaned: { role: 'user' | 'assistant'; content: string }[] = [];
    for (const msg of commonMessages) {
        if (cleaned.length === 0 && msg.role !== 'user') continue;
        if (cleaned.length > 0 && cleaned[cleaned.length - 1].role === msg.role) continue;
        if (msg.content.trim()) cleaned.push(msg);
    }

    if (cleaned.length === 0) {
        cleaned.push({ role: 'user', content: 'Merhaba' });
    }

    // 1. Try Anthropic (Claude)
    if (process.env.ANTHROPIC_API_KEY) {
        try {
            console.log('Using Anthropic provider');
            const stream = anthropic.messages.stream({
                model: 'claude-3-5-sonnet-20240620',
                max_tokens: 1024,
                system: systemPrompt,
                messages: cleaned,
            });

            return new Response(new ReadableStream({
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
                        console.error('Anthropic stream error:', err);
                    } finally {
                        controller.close();
                    }
                },
            }), {
                headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' },
            });
        } catch (err) {
            console.error('Anthropic failed, falling back...', err);
        }
    }

    // 2. Try OpenAI (GPT-4o)
    if (process.env.OPENAI_API_KEY) {
        try {
            console.log('Using OpenAI provider');
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...cleaned,
                ],
                stream: true,
            });

            return new Response(new ReadableStream({
                async start(controller) {
                    const encoder = new TextEncoder();
                    try {
                        for await (const chunk of response) {
                            const content = chunk.choices[0]?.delta?.content || '';
                            if (content) controller.enqueue(encoder.encode(content));
                        }
                    } catch (err) {
                        console.error('OpenAI stream error:', err);
                    } finally {
                        controller.close();
                    }
                },
            }), {
                headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' },
            });
        } catch (err) {
            console.error('OpenAI failed, falling back...', err);
        }
    }

    // 3. Fallback: Pollinations AI (Base64/Raw endpoint, free & keyless)
    try {
        console.log('Using Fallback (Pollinations)');
        // Pollinations supports a simple text endpoint or a chat-like system via query params
        // For best results with our system prompt, we'll use their chat completion endpoint if available, 
        // or a simple prompt construction.
        const fullPrompt = `${systemPrompt}\n\nUser History: ${cleaned.map(m => `${m.role}: ${m.content}`).join('\n')}\nAssistant:`;

        const response = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...cleaned
                ],
                model: 'openai', // This is a virtual model name on Pollinations
                seed: Math.floor(Math.random() * 1000000),
            }),
        });

        if (!response.ok) throw new Error('Pollinations failed');

        // Pollinations text endpoint returns raw text, so we wrap it in a stream for UI consistency
        const text = await response.text();
        return new Response(new ReadableStream({
            start(controller) {
                const encoder = new TextEncoder();
                controller.enqueue(encoder.encode(text));
                controller.close();
            }
        }), {
            headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' },
        });

    } catch (err) {
        console.error('All AI providers failed:', err);
        return new Response(
            JSON.stringify({ error: 'AI servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyiniz.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } },
        );
    }
}

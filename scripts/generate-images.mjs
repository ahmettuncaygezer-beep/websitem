/**
 * fal.ai FLUX Image Generator for MAISON E-Commerce
 * Uses synchronous fal.run endpoint (not queue)
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images');

const FAL_KEY = '161345fe-048c-47e6-9a46-f97ab26d8a1d:949135c3e2cdc77fe96631bda3aeff71';

// Image generation configs
const IMAGES = [
    {
        name: 'hero/main.jpg',
        prompt: 'A stunning luxury modern living room with a cream boucle sofa, natural oak coffee table, warm sunlight through sheer curtains, beige and gold accents, minimalist high-end interior design, Architectural Digest style editorial photography, soft natural lighting, 16:9 wide shot',
        size: 'landscape_16_9',
    },
    {
        name: 'products/luna-sofa.jpg',
        prompt: 'A premium cream boucle modular corner sofa with soft rounded edges and natural oak wood legs, clean white studio background, luxury furniture product photography, centered composition, soft studio lighting with gentle shadows, e-commerce style, photorealistic, high-end',
        size: 'portrait_4_3',
    },
    {
        name: 'products/aurora-bed.jpg',
        prompt: 'An elegant upholstered bed headboard in soft beige linen fabric with channel tufting, natural oak bed frame, white studio background, luxury bedroom furniture product photography, soft studio lighting, e-commerce style, photorealistic',
        size: 'portrait_4_3',
    },
    {
        name: 'products/sol-dining-table.jpg',
        prompt: 'A beautiful solid natural oak dining table with clean modern lines and tapered legs, clean white studio background, luxury furniture product photography, centered composition, soft studio lighting, e-commerce style, photorealistic',
        size: 'portrait_4_3',
    },
    {
        name: 'products/iris-armchair.jpg',
        prompt: 'A luxurious bouclé armchair in sage green with curved organic shape, solid oak legs, clean white studio background, luxury furniture product photography, soft studio lighting, centered, photorealistic',
        size: 'portrait_4_3',
    },
    {
        name: 'categories/living-room.jpg',
        prompt: 'Modern luxury living room interior, cream and warm tones, boucle sofa, natural wood, soft natural lighting, editorial interior design photography, Architectural Digest style',
        size: 'landscape_4_3',
    },
    {
        name: 'categories/bedroom.jpg',
        prompt: 'Serene luxury bedroom interior, soft linen bedding in cream and white, natural oak nightstand, warm morning light, minimal and elegant, editorial interior photography',
        size: 'landscape_4_3',
    },
    {
        name: 'categories/dining.jpg',
        prompt: 'Elegant dining room interior with natural oak dining table set for dinner, cream chairs, pendant lighting, warm ambient light, editorial interior design photography',
        size: 'landscape_4_3',
    },
    {
        name: 'products/luna-lifestyle.jpg',
        prompt: 'A beautiful modern living room with a cream boucle corner sofa, styled with throw pillows and a knit blanket, natural oak side table with a coffee cup, warm sunlight, editorial interior photography',
        size: 'landscape_4_3',
    },
    {
        name: 'products/aurora-lifestyle.jpg',
        prompt: 'A serene bedroom scene with an upholstered linen headboard, white bedding, natural oak nightstand with a vase of dried flowers, warm morning light through sheer curtains, editorial interior photography',
        size: 'landscape_4_3',
    },
    {
        name: 'rooms/lookbook-1.jpg',
        prompt: 'A complete luxury living room interior design, cream boucle sofa, natural oak coffee table, designer floor lamp, decorative vases, soft rug, warm natural light, wide shot showing the full room, editorial interior photography, Architectural Digest style',
        size: 'landscape_16_9',
    },
];

function falRunSync(prompt, imageSize) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            prompt,
            image_size: imageSize,
            num_inference_steps: 28,
            guidance_scale: 3.5,
            output_format: 'jpeg',
            num_images: 1,
        });

        const options = {
            hostname: 'fal.run',
            path: '/fal-ai/flux/dev',
            method: 'POST',
            headers: {
                'Authorization': `Key ${FAL_KEY}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data),
            },
        };

        const req = https.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => responseData += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(responseData);
                    if (res.statusCode >= 400) {
                        reject(new Error(`API error ${res.statusCode}: ${JSON.stringify(parsed)}`));
                    } else {
                        resolve(parsed);
                    }
                } catch (e) {
                    reject(new Error(`Parse error (${res.statusCode}): ${responseData.slice(0, 300)}`));
                }
            });
        });
        req.setTimeout(120000, () => { req.destroy(); reject(new Error('Timeout')); });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

function downloadFile(url, filepath) {
    return new Promise((resolve, reject) => {
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const get = url.startsWith('https') ? https.get : http.get;
        get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                downloadFile(res.headers.location, filepath).then(resolve).catch(reject);
                return;
            }
            if (res.statusCode !== 200) {
                reject(new Error(`Download failed: ${res.statusCode}`));
                return;
            }
            const ws = fs.createWriteStream(filepath);
            res.pipe(ws);
            ws.on('finish', () => { ws.close(); resolve(); });
            ws.on('error', reject);
        }).on('error', reject);
    });
}

async function generateImage(config) {
    console.log(`\n🎨 Generating: ${config.name}`);
    console.log(`   Prompt: ${config.prompt.slice(0, 80)}...`);

    try {
        const result = await falRunSync(config.prompt, config.size);

        if (result.images && result.images.length > 0) {
            const imageUrl = result.images[0].url;
            const filepath = path.join(PUBLIC_DIR, config.name);
            console.log(`   Downloading from: ${imageUrl.slice(0, 80)}...`);
            await downloadFile(imageUrl, filepath);
            const stats = fs.statSync(filepath);
            console.log(`   ✅ Saved: ${config.name} (${(stats.size / 1024).toFixed(0)} KB)`);
        } else {
            console.error(`   ❌ No images in response:`, JSON.stringify(result).slice(0, 200));
        }
    } catch (error) {
        console.error(`   ❌ Error: ${error.message}`);
    }
}

async function main() {
    console.log('🚀 MAISON Image Generator - fal.ai FLUX');
    console.log(`📁 Output: ${PUBLIC_DIR}`);
    console.log(`📸 Images to generate: ${IMAGES.length}\n`);

    for (const imageConfig of IMAGES) {
        await generateImage(imageConfig);
        await new Promise(r => setTimeout(r, 500));
    }

    console.log('\n✨ Done!');
}

main().catch(console.error);

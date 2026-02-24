/**
 * fal.ai FLUX - Generate remaining product images
 * Products that need unique images: terra-tv, zen-kitaplik, neva-abajur,
 * diva-konsol, como-sandalye, pera-sehpa, aura-yastik, flora-vazo
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images');

const FAL_KEY = '161345fe-048c-47e6-9a46-f97ab26d8a1d:949135c3e2cdc77fe96631bda3aeff71';

const IMAGES = [
    {
        name: 'products/terra-tv.jpg',
        prompt: 'A sleek modern TV console unit in natural walnut wood with clean lines, matte black metal legs, minimalist design, clean white studio background, luxury furniture product photography, soft studio lighting, e-commerce style, photorealistic',
        size: 'portrait_4_3',
    },
    {
        name: 'products/zen-kitaplik.jpg',
        prompt: 'A modern minimalist bookshelf in natural light oak wood with asymmetric open shelving, some shelves with books and decorative objects, clean white studio background, luxury furniture product photography, soft studio lighting, photorealistic',
        size: 'portrait_4_3',
    },
    {
        name: 'products/neva-abajur.jpg',
        prompt: 'An elegant designer table lamp with a brass base and natural linen shade, warm ambient glow, clean white studio background, luxury lighting product photography, soft studio lighting, photorealistic, high-end',
        size: 'portrait_4_3',
    },
    {
        name: 'products/diva-konsol.jpg',
        prompt: 'A luxury console table in white marble top with brass hairpin legs, minimalist elegant design, clean white studio background, luxury furniture product photography, soft studio lighting, e-commerce style, photorealistic',
        size: 'portrait_4_3',
    },
    {
        name: 'products/como-sandalye.jpg',
        prompt: 'A beautiful solid oak dining chair with curved backrest and cream boucle upholstered seat, Scandinavian modern design, clean white studio background, luxury furniture product photography, soft studio lighting, photorealistic',
        size: 'portrait_4_3',
    },
    {
        name: 'products/pera-sehpa.jpg',
        prompt: 'A round coffee table with natural travertine stone top and solid brass cylindrical base, minimalist luxury design, clean white studio background, luxury furniture product photography, soft studio lighting, photorealistic',
        size: 'portrait_4_3',
    },
    {
        name: 'products/aura-yastik.jpg',
        prompt: 'A set of three luxury decorative throw pillows in cream, sand, and sage green colors with textured linen and boucle fabrics, styled together, clean white studio background, luxury home decor product photography, soft studio lighting',
        size: 'portrait_4_3',
    },
    {
        name: 'products/flora-vazo.jpg',
        prompt: 'An elegant ceramic vase in matte sage green with organic curved shape, holding dried pampas grass, clean white studio background, luxury home decor product photography, soft studio lighting, photorealistic',
        size: 'portrait_4_3',
    },
    // Extra category images for office, lighting, decor
    {
        name: 'categories/office.jpg',
        prompt: 'A modern luxury home office interior with natural walnut desk, designer task chair, warm sunlight through windows, minimal decor, editorial interior photography',
        size: 'landscape_4_3',
    },
    {
        name: 'categories/lighting.jpg',
        prompt: 'Beautiful designer pendant lights and table lamps in a luxury showroom setting, brass and linen materials, warm ambient lighting, editorial commercial photography',
        size: 'landscape_4_3',
    },
    {
        name: 'categories/decor.jpg',
        prompt: 'A curated collection of luxury home decor items: ceramic vases, brass candle holders, art books, dried flowers, arranged on a natural oak shelf, editorial still life photography',
        size: 'landscape_4_3',
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

        https.get(url, (res) => {
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
    try {
        const result = await falRunSync(config.prompt, config.size);
        if (result.images && result.images.length > 0) {
            const filepath = path.join(PUBLIC_DIR, config.name);
            await downloadFile(result.images[0].url, filepath);
            const stats = fs.statSync(filepath);
            console.log(`   ✅ Saved: ${config.name} (${(stats.size / 1024).toFixed(0)} KB)`);
        } else {
            console.error(`   ❌ No images`);
        }
    } catch (error) {
        console.error(`   ❌ Error: ${error.message}`);
    }
}

async function main() {
    console.log(`🚀 Generating ${IMAGES.length} additional images...\n`);
    for (const img of IMAGES) {
        await generateImage(img);
        await new Promise(r => setTimeout(r, 500));
    }
    console.log('\n✨ Done!');
}

main().catch(console.error);

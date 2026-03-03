import fs from 'fs';
import path from 'path';

const projectRoot = 'c:/xampp/htdocs/2mobilya';
const publicDir = path.join(projectRoot, 'public');
const iconsDir = path.join(publicDir, 'icons');
const imagesDir = path.join(publicDir, 'images', 'products');

// 1. Fix PWA Icons
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

const sourceIconPath = 'C:/Users/tunca/.gemini/antigravity/brain/8865ff39-8e02-4ac9-8f42-244ac346a731/maison_icon_logo_1772349305148.png';
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

if (fs.existsSync(sourceIconPath)) {
    for (const size of sizes) {
        const dest = path.join(iconsDir, `icon-${size}x${size}.png`);
        fs.copyFileSync(sourceIconPath, dest);
        console.log(`Created: ${dest}`);
    }
} else {
    console.log('Source icon not found. Skipping icons.');
}

// 2. Fix 404 Images in mock data
const filesToCheck = [
    path.join(projectRoot, 'src', 'data', 'mock-products.ts'),
    path.join(projectRoot, 'src', 'lib', 'mock', 'products.ts')
];

let missingImages = new Set();
const imgRegex = /\/images\/products\/([^'"]+.(?:jpg|jpeg|png|webp))/g;

for (const file of filesToCheck) {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        let match;
        while ((match = imgRegex.exec(content)) !== null) {
            const imgPath = path.join(publicDir, 'images', 'products', match[1]);
            if (!fs.existsSync(imgPath)) {
                missingImages.add(match[1]);
            }
        }
    }
}

console.log('\nMissing Images Found:', Array.from(missingImages));

// 3. Fallback Generation
// We will use an existing product image as a generic fallback.
const fallbackSource = path.join(publicDir, 'images', 'products', 'luna-sofa.jpg');

if (fs.existsSync(fallbackSource)) {
    for (const missing of missingImages) {
        const dest = path.join(publicDir, 'images', 'products', missing);
        // Copy the fallback to the missing path
        fs.copyFileSync(fallbackSource, dest);
        console.log(`Fixed 404: Created ${missing} using fallback.`);
    }
} else {
    console.log('Fallback source not found. Cannot fix missing images.');
}

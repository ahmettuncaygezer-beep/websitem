const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('route.ts')) {
            results.push(file);
        }
    });
    return results;
}

const targetDir = path.join(__dirname, 'src/app/api/admin');
const files = walk(targetDir);
let changed = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // We want to replace `{ params }: { params: { code: string } }`
    // with `{ params }: { params: Promise<{ code: string }> }`
    // The previous regex was strict on spaces.

    const regex = /\{\s*params\s*\}\s*:\s*\{\s*params\s*:\s*\{\s*([a-zA-Z]+)\s*:\s*string\s*\}\s*\}/g;

    // Let's also check for `{ params }: { params: { id: string } }` which might not have spaces inside brackets.

    const newContent = content.replace(/\{\s*params\s*\}\s*:\s*\{\s*params\s*:\s*\{\s*([a-zA-Z]+)\s*:\s*string\s*\}\s*\}/g, '{ params }: { params: Promise<{ $1: string }> }');

    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        changed++;
        console.log(`Updated ${file.replace(targetDir, '')}`);
    }
});

console.log(`Done! Changed ${changed} files.`);

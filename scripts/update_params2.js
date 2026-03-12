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

    // Explicit string replacements
    const replacements = [
        { find: '{ params }: { params: { id: string } }', replace: '{ params }: { params: Promise<{ id: string }> }' },
        { find: '{ params }: { params: { code: string } }', replace: '{ params }: { params: Promise<{ code: string }> }' },
        { find: '{ params }: { params: { key: string } }', replace: '{ params }: { params: Promise<{ key: string }> }' },
        { find: '{ params }: { params: { id: string } }', replace: '{ params }: { params: Promise<{ id: string }> }' }
    ];

    let newContent = content;
    replacements.forEach(({ find, replace }) => {
        if (newContent.includes(find)) {
            newContent = newContent.split(find).join(replace);
        }
    });

    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        changed++;
        console.log(`Updated ${file.replace(targetDir, '')}`);
    }
});

console.log(`Done! Changed ${changed} files.`);

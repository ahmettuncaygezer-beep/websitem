const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src/app');
for (const f of files) {
    if (f.endsWith('.ts') || f.endsWith('.tsx')) {
        let content = fs.readFileSync(f, 'utf8');
        if (content.includes('{ params: {  } }') || content.includes('{ params: {} }') || content.includes('{ params: Promise<{')) {
            const match = f.match(/\[(.*?)\]/);
            if (match) {
                const paramName = match[1];
                let newContent = content.replace(/\{ params \}: \{ params: \{ \s*\} \}/g, `{ params }: { params: { ${paramName}: string } }`);
                newContent = newContent.replace(/\{ params \}: \{ params: \{\} \}/g, `{ params }: { params: { ${paramName}: string } }`);
                // Also fix any remaining Promise params
                const regexPromise = new RegExp(`\\{ params \\}: \\{ params: Promise<\\{ ${paramName}: string \\}> \\}`, 'g');
                newContent = newContent.replace(regexPromise, `{ params }: { params: { ${paramName}: string } }`);
                const regexPromiseGlobal = /\{ params \}: \{ params: Promise<\{ ([\w, :\-]+) \}> \}/g;
                newContent = newContent.replace(regexPromiseGlobal, '{ params }: { params: { $1 } }');

                // Fix `const { slug } = await params;` or `const {  } = await params;`
                newContent = newContent.replace(/const \{ ([\w, :]+) \}\s*=\s*await\s*params;/g, 'const { $1 } = params;');
                newContent = newContent.replace(/const \{\s*\}\s*=\s*await\s*params;/g, `const { ${paramName} } = params;`);

                // fix empty destructurings left from previous regex `const {  } = params;`
                newContent = newContent.replace(/const \{\s*\}\s*=\s*params;/g, `const { ${paramName} } = params;`);

                if (content !== newContent) {
                    fs.writeFileSync(f, newContent);
                    console.log('Fixed', f);
                }
            }
        }
    }
}

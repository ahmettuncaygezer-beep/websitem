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
        let originalContent = content;

        const match = f.match(/\[(.*?)\]/);
        if (match) {
            const paramName = match[1];

            // Replace sync params definition with Promise
            const syncParamRegex = new RegExp(`\\{ params \\}: \\{ params: \\{ ${paramName}: string \\} \\}`, 'g');
            content = content.replace(syncParamRegex, `{ params }: { params: Promise<{ ${paramName}: string }> }`);

            // Also for Page props interfaces
            const interfaceRegex = new RegExp(`params: \\{ ${paramName}: string \\};`, 'g');
            content = content.replace(interfaceRegex, `params: Promise<{ ${paramName}: string }>;`);

            // Also replace Page component props directly if inline
            const inlinePagePropsRegex = new RegExp(`\\{ params \\}: \\{ params: \\{ ${paramName}: string \\} \\}`, 'g');
            content = content.replace(inlinePagePropsRegex, `{ params }: { params: Promise<{ ${paramName}: string }> }`);

            // Now, we must add `await params` where `params` is accessed
            // Currently it has `const { id } = params;`
            const syncDestructureRegex = new RegExp(`const \\{ ${paramName} \\} = params;`, 'g');
            content = content.replace(syncDestructureRegex, `const { ${paramName} } = await params;`);

            // In case it was deleted completely, e.g. `const {  } = params;` doesn't exist anymore, but we need to inject it 
            // if we see `await params` missing but we are in a dynamic route. Actually my previous script only did it if it found the signature.

            if (content !== originalContent) {
                fs.writeFileSync(f, content);
                console.log('Fixed to Async Promise:', f);
            }
        }
    }
}

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/i18n.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The literal characters '\n' were written by mistake. Let's fix them.
content = content.replace(/\\n/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Cleaned \\n literals safely.');

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We need to dynamically import these or since we use tsx, just standard import
import { translations as i18nTranslations } from '../lib/i18n';
import { translations as storeTranslations } from '../store/translationStore';

const merged = {
    TR: { ...i18nTranslations.TR, ...storeTranslations.TR },
    EN: { ...i18nTranslations.EN, ...storeTranslations.EN },
    DE: { ...i18nTranslations.DE, ...storeTranslations.DE },
    FR: { ...i18nTranslations.FR, ...storeTranslations.FR },
    AR: { ...i18nTranslations.AR, ...storeTranslations.AR },
};

const output = `export const translations = ${JSON.stringify(merged, null, 4)};\n\n` +
    `export const currencies = {\n` +
    `    TRY: { symbol: '₺', rate: 1, position: 'left' },\n` +
    `    USD: { symbol: '$', rate: 0.031, position: 'left' },\n` +
    `    EUR: { symbol: '€', rate: 0.029, position: 'left' },\n` +
    `    GBP: { symbol: '£', rate: 0.025, position: 'left' }\n` +
    `};\n`;

fs.writeFileSync(path.join(__dirname, '../lib/i18n.ts'), output);
console.log("Merged successfully.");

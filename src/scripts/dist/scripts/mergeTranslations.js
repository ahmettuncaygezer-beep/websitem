"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
// We need to dynamically import these or since we use tsx, just standard import
const i18n_1 = require("../lib/i18n");
const translationStore_1 = require("../store/translationStore");
const merged = {
    tr: { ...i18n_1.translations.tr, ...translationStore_1.translations.TR },
    en: { ...i18n_1.translations.en, ...translationStore_1.translations.EN },
    de: { ...i18n_1.translations.de, ...translationStore_1.translations.DE },
    fr: { ...i18n_1.translations.fr, ...translationStore_1.translations.FR },
    ar: { ...i18n_1.translations.ar, ...translationStore_1.translations.AR },
};
const output = `export const translations = ${JSON.stringify(merged, null, 4)};\n\n` +
    `export const currencies = {\n` +
    `    TRY: { symbol: '₺', rate: 1, position: 'left' },\n` +
    `    USD: { symbol: '$', rate: 0.031, position: 'left' },\n` +
    `    EUR: { symbol: '€', rate: 0.029, position: 'left' },\n` +
    `    GBP: { symbol: '£', rate: 0.025, position: 'left' }\n` +
    `};\n`;
fs_1.default.writeFileSync(path_1.default.join(__dirname, '../lib/i18n.ts'), output);
console.log("Merged successfully.");

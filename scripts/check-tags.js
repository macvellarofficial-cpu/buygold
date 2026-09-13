const fs = require('fs');
const path = require('path');

const dirs = ['', 'public'];
const langs = ['', 'ar', 'zh', 'es', 'ru', 'fr'];
const pages = [
  'index.html',
  'about-us.html',
  'mining.html',
  'agri-business.html',
  'supply-and-logistics.html',
  'engineering.html',
  'contact-us.html',
  'disclaimer.html'
];

let totalChecked = 0;
let errors = 0;

for (const base of dirs) {
  for (const lang of langs) {
    for (const page of pages) {
      const parts = [__dirname, '..'];
      if (base) parts.push(base);
      if (lang) parts.push(lang);
      parts.push(page);
      const fullPath = path.join(...parts);
      const relPath = path.relative(path.join(__dirname, '..'), fullPath);

      if (!fs.existsSync(fullPath)) {
        console.error(`[FAIL] Missing file: ${relPath}`);
        errors++;
        continue;
      }
      const html = fs.readFileSync(fullPath, 'utf8');
      const opens = (html.match(/<div[\s>]/gi) || []).length;
      const closes = (html.match(/<\/div>/gi) || []).length;
      const hasHeader = html.includes('class="main-header"');
      const hasSwitcher = html.includes('class="lang-switcher"');

      if (opens !== closes) {
        console.error(`[MISMATCH] ${relPath}: divs ${opens}/${closes}`);
        errors++;
      }
      if (!hasHeader) {
        console.error(`[NO HEADER] ${relPath}: main-header missing`);
        errors++;
      }
      if (!hasSwitcher) {
        console.error(`[NO SWITCHER] ${relPath}: lang-switcher missing`);
        errors++;
      }
      totalChecked++;
    }
  }
}

console.log(`\nChecked ${totalChecked} files across root and public. Total errors found: ${errors}`);
if (errors > 0) {
  process.exit(1);
} else {
  console.log('ALL 96 HTML FILES (48 ROOT + 48 PUBLIC) PASSED 100% PERFECT DOM PARITY CHECKS!');
}

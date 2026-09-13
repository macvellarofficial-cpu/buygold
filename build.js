const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(child => {
      copyRecursive(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

const items = [
  'index.html',
  'about-us.html',
  'mining.html',
  'agri-business.html',
  'supply-and-logistics.html',
  'engineering.html',
  'contact-us.html',
  'disclaimer.html',
  'sitemap.xml',
  'robots.txt',
  'css',
  'js',
  'assets'
];

items.forEach(item => {
  const src = path.join(__dirname, item);
  const dest = path.join(publicDir, item);
  if (fs.existsSync(src)) {
    copyRecursive(src, dest);
  }
});

console.log('Static build successfully created public/ directory with all assets!');

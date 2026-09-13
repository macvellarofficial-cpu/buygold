const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

// Instruct Vercel NFT bundler to trace and include all asset directories and HTML pages
try {
  if (fs.existsSync(path.join(__dirname, 'css'))) fs.readdirSync(path.join(__dirname, 'css'));
  if (fs.existsSync(path.join(__dirname, 'js'))) fs.readdirSync(path.join(__dirname, 'js'));
  if (fs.existsSync(path.join(__dirname, 'assets'))) fs.readdirSync(path.join(__dirname, 'assets'));
  if (fs.existsSync(path.join(__dirname, 'assets', 'images'))) fs.readdirSync(path.join(__dirname, 'assets', 'images'));
  ['about-us.html', 'mining.html', 'agri-business.html', 'supply-and-logistics.html', 'engineering.html', 'contact-us.html', 'disclaimer.html'].forEach(f => {
    if (fs.existsSync(path.join(__dirname, f))) fs.readFileSync(path.join(__dirname, f));
  });
} catch (e) {}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  let filePath = path.join(ROOT, reqPath);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), reqPath);
  }

  // Handle extensionless HTML routes (e.g. /about-us -> /about-us.html)
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (fs.existsSync(path.join(ROOT, reqPath + '.html'))) {
      filePath = path.join(ROOT, reqPath + '.html');
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 Not Found</h1><p>The requested URL was not found on this server.</p><p><a href="/">Return Home</a></p>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': ext === '.html' ? 'public, max-age=0, must-revalidate' : 'public, max-age=31536000, immutable'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}

module.exports = server;

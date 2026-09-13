const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

// Instruct Vercel NFT bundler to trace and include all asset directories and HTML pages
try {
  ['css', 'js', 'assets', 'ar', 'zh', 'es', 'ru', 'fr'].forEach(d => {
    if (fs.existsSync(path.join(__dirname, d))) fs.readdirSync(path.join(__dirname, d));
  });
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
  '.xml': 'application/xml; charset=utf-8',
  '.xsl': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const LOCALIZED_SLUGS = {
  // Arabic
  '/ar/من-نحن': '/ar/about-us.html',
  '/ar/تعدين-الذهب': '/ar/mining.html',
  '/ar/الزراعة-والأعمال-الزراعية': '/ar/agri-business.html',
  '/ar/سلاسل-الإمداد-واللوجستيات': '/ar/supply-and-logistics.html',
  '/ar/خدمات-الهندسة-والإنشاءات': '/ar/engineering.html',
  '/ar/اتصل-بنا': '/ar/contact-us.html',
  '/ar/إخلاء-المسؤولية-القانونية': '/ar/disclaimer.html',
  // Chinese
  '/zh/关于我们': '/zh/about-us.html',
  '/zh/黄金开采': '/zh/mining.html',
  '/zh/现代农业': '/zh/agri-business.html',
  '/zh/物流供应链': '/zh/supply-and-logistics.html',
  '/zh/工程建设': '/zh/engineering.html',
  '/zh/联系我们': '/zh/contact-us.html',
  '/zh/法律免责声明': '/zh/disclaimer.html',
  // Spanish
  '/es/sobre-nosotros': '/es/about-us.html',
  '/es/mineria-de-oro': '/es/mining.html',
  '/es/agroindustria': '/es/agri-business.html',
  '/es/suministro-y-logistica': '/es/supply-and-logistics.html',
  '/es/ingenieria': '/es/engineering.html',
  '/es/contacto': '/es/contact-us.html',
  '/es/descargo-de-responsabilidad': '/es/disclaimer.html',
  // Russian
  '/ru/o-nas': '/ru/about-us.html',
  '/ru/dobycha-zolota': '/ru/mining.html',
  '/ru/agrobiznes': '/ru/agri-business.html',
  '/ru/logistika': '/ru/supply-and-logistics.html',
  '/ru/inzheneriya': '/ru/engineering.html',
  '/ru/kontakty': '/ru/contact-us.html',
  '/ru/otkaz-ot-otvetstvennosti': '/ru/disclaimer.html',
  // French
  '/fr/a-propos': '/fr/about-us.html',
  '/fr/mines-dor': '/fr/mining.html',
  '/fr/agro-industrie': '/fr/agri-business.html',
  '/fr/chaine-logistique': '/fr/supply-and-logistics.html',
  '/fr/ingenierie': '/fr/engineering.html',
  '/fr/contactez-nous': '/fr/contact-us.html',
  '/fr/mentions-legales': '/fr/disclaimer.html'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  let reqPath = decodeURI(reqUrl);

  // 1. Check Browser Accept-Language header on root path (/)
  if (reqPath === '/' || reqPath === '') {
    const cookieHeader = req.headers['cookie'] || '';
    const cookieMatch = cookieHeader.match(/(?:^|;\s*)buygold_lang=([^;]+)/);
    const userPref = cookieMatch ? cookieMatch[1] : null;

    const userAgent = (req.headers['user-agent'] || '').toLowerCase();
    const isBot = /googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|twitterbot|facebookexternalhit|rogerbot|embedly|quora link preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot/i.test(userAgent);

    // If user has set an explicit language cookie
    if (userPref && userPref !== 'en' && ['ar', 'zh', 'es', 'ru', 'fr'].includes(userPref)) {
      res.writeHead(302, { 'Location': `/${userPref}/`, 'Vary': 'Accept-Language, Cookie' });
      res.end();
      return;
    }

    // If no cookie set and not a crawler bot, check Accept-Language header
    if (!userPref && !isBot && !req.url.includes('noredirect=true')) {
      const acceptLang = (req.headers['accept-language'] || '').toLowerCase();
      let detectedLang = null;

      if (acceptLang.startsWith('ar') || acceptLang.includes(',ar')) detectedLang = 'ar';
      else if (acceptLang.startsWith('zh') || acceptLang.includes(',zh')) detectedLang = 'zh';
      else if (acceptLang.startsWith('es') || acceptLang.includes(',es')) detectedLang = 'es';
      else if (acceptLang.startsWith('ru') || acceptLang.includes(',ru')) detectedLang = 'ru';
      else if (acceptLang.startsWith('fr') || acceptLang.includes(',fr')) detectedLang = 'fr';

      if (detectedLang) {
        res.writeHead(302, { 'Location': `/${detectedLang}/`, 'Vary': 'Accept-Language, Cookie' });
        res.end();
        return;
      }
    }
    reqPath = '/index.html';
  }

  // 2. Check localized slug mapping
  if (LOCALIZED_SLUGS[reqPath] || LOCALIZED_SLUGS[reqPath.replace(/\/$/, '')]) {
    reqPath = LOCALIZED_SLUGS[reqPath] || LOCALIZED_SLUGS[reqPath.replace(/\/$/, '')];
  }

  let filePath = path.join(ROOT, reqPath);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), reqPath);
  }

  // 3. Handle extensionless HTML routes and directory indices
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

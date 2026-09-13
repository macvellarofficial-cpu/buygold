const http = require('http');
const server = require('../server.js');

server.listen(3456, async () => {
  console.log('Test server started on 3456');
  
  const testReq = (reqPath, headers = {}) => new Promise((resolve) => {
    http.get({
      hostname: '127.0.0.1',
      port: 3456,
      path: reqPath,
      headers: headers
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, location: res.headers.location, data: data.substring(0, 1500) }));
    });
  });

  try {
    // 1. Accept-Language: ar
    const arRes = await testReq('/', { 'Accept-Language': 'ar-SA,ar;q=0.9' });
    console.log('TEST 1 (ar header redirect):', arRes.status === 302 && arRes.location === '/ar/' ? 'PASS' : 'FAIL', arRes.status, arRes.location);

    // 2. Accept-Language: zh
    const zhRes = await testReq('/', { 'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8' });
    console.log('TEST 2 (zh header redirect):', zhRes.status === 302 && zhRes.location === '/zh/' ? 'PASS' : 'FAIL', zhRes.status, zhRes.location);

    // 3. Cookie override: buygold_lang=es
    const cookieRes = await testReq('/', { 'Cookie': 'buygold_lang=es' });
    console.log('TEST 3 (cookie override):', cookieRes.status === 302 && cookieRes.location === '/es/' ? 'PASS' : 'FAIL', cookieRes.status, cookieRes.location);

    // 4. Googlebot crawl on /
    const botRes = await testReq('/', { 'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)' });
    console.log('TEST 4 (Googlebot no redirect):', botRes.status === 200 ? 'PASS' : 'FAIL', botRes.status);

    // 5. Localized slug Arabic
    const slugAr = await testReq(encodeURI('/ar/تعدين-الذهب'));
    console.log('TEST 5 (Localized slug Arabic):', slugAr.status === 200 && slugAr.data.includes('dir="rtl"') ? 'PASS' : 'FAIL', slugAr.status);

    // 6. Localized slug Chinese
    const slugZh = await testReq(encodeURI('/zh/关于我们'));
    console.log('TEST 6 (Localized slug Chinese):', slugZh.status === 200 && slugZh.data.includes('lang="zh"') ? 'PASS' : 'FAIL', slugZh.status);

    // 7. Localized French page
    const frPage = await testReq('/fr/mining.html');
    console.log('TEST 7 (French mining page):', frPage.status === 200 && frPage.data.includes('lang="fr"') ? 'PASS' : 'FAIL', frPage.status);

    // 8. Sitemap
    const sitemapRes = await testReq('/sitemap.xml');
    console.log('TEST 8 (Multilingual Sitemap):', sitemapRes.status === 200 && sitemapRes.data.includes('xhtml:link') ? 'PASS' : 'FAIL', sitemapRes.status);

  } catch (err) {
    console.error('Test error:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});

/**
 * BUYGOLD (Al' Itihaad Investments)
 * Static Multilingual Pre-Rendering & Localization Compiler
 * 
 * Compiles localized versions for: ar, zh, es, ru, fr
 * Updates master English files with language switcher, hreflang cluster, and detection logic.
 * Generates Google Search Console compliant multilingual sitemap.xml.
 */

const fs = require('fs');
const path = require('path');
const { LANGUAGES, PAGES_META, UI_STRINGS } = require('./i18n-dictionary');

const ROOT_DIR = path.resolve(__dirname, '..');
const BASE_URL = 'https://www.buygold.blog';
const PAGES = [
  'index.html',
  'about-us.html',
  'mining.html',
  'agri-business.html',
  'supply-and-logistics.html',
  'engineering.html',
  'contact-us.html',
  'disclaimer.html'
];

function getPageUrl(lang, pageName) {
  const prefix = lang === 'en' ? '' : `/${lang}`;
  if (pageName === 'index.html') {
    return prefix ? `${prefix}/` : '/';
  }
  return `${prefix}/${pageName}`;
}

function getFullPageUrl(lang, pageName) {
  const pageUrl = getPageUrl(lang, pageName);
  return `${BASE_URL}${pageUrl.startsWith('/') ? '' : '/'}${pageUrl}`;
}

function generateHreflangTags(pageName) {
  let tags = `  <!-- Bidirectional Multilingual Hreflang Cluster Matrix -->\n`;
  tags += `  <link rel="alternate" hreflang="x-default" href="${getFullPageUrl('en', pageName)}">\n`;
  for (const langCode of Object.keys(LANGUAGES)) {
    tags += `  <link rel="alternate" hreflang="${langCode}" href="${getFullPageUrl(langCode, pageName)}">\n`;
  }
  return tags;
}

function generateLanguageSwitcher(currentLang, pageName) {
  const currentLangObj = LANGUAGES[currentLang];
  let items = '';
  for (const [code, lang] of Object.entries(LANGUAGES)) {
    const targetUrl = getPageUrl(code, pageName);
    const isActive = code === currentLang ? ' active' : '';
    items += `          <li><a href="${targetUrl}" class="lang-dropdown-item${isActive}" data-lang="${code}" role="menuitem"><span class="lang-flag">${lang.flag}</span><span class="lang-name">${lang.name}</span><span class="lang-native">${lang.nativeName}</span></a></li>\n`;
  }

  return `
        <!-- Multilingual Language Switcher -->
        <div class="lang-switcher">
          <button type="button" class="lang-switcher-btn" aria-haspopup="true" aria-expanded="false" aria-label="Select Language">
            <span class="lang-flag">${currentLangObj.flag}</span>
            <span class="lang-code">${currentLangObj.code.toUpperCase()}</span>
            <svg class="lang-arrow" viewBox="0 0 320 512"><path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"/></svg>
          </button>
          <ul class="lang-dropdown-menu" role="menu">
${items}          </ul>
        </div>`;
}

function generateMobileLanguageSwitcher(currentLang, pageName) {
  let links = '';
  for (const [code, lang] of Object.entries(LANGUAGES)) {
    const targetUrl = getPageUrl(code, pageName);
    const isActive = code === currentLang ? ' active' : '';
    links += `        <a href="${targetUrl}" class="mobile-lang-link${isActive}" data-lang="${code}"><span class="lang-flag">${lang.flag}</span> <span>${lang.nativeName}</span></a>\n`;
  }

  return `
      <!-- Mobile Drawer Language Selector -->
      <div class="mobile-lang-switcher">
        <h5>${currentLang === 'ar' ? 'اختر اللغة' : (currentLang === 'zh' ? '选择语言' : (currentLang === 'es' ? 'Seleccionar Idioma' : (currentLang === 'ru' ? 'Выберите язык' : (currentLang === 'fr' ? 'Choisir la langue' : 'Select Language'))))}</h5>
        <div class="mobile-lang-grid">
${links}        </div>
      </div>`;
}

const ROOT_REDIRECT_SCRIPT = `
  <!-- Automatic Client-Side Browser Accept-Language Detector -->
  <script>
  (function() {
    try {
      var savedLang = localStorage.getItem('preferred_lang');
      var cookieMatch = document.cookie.match(/(?:^|;\\s*)buygold_lang=([^;]+)/);
      var activePref = savedLang || (cookieMatch ? cookieMatch[1] : null);
      
      if (activePref && activePref !== 'en') {
        if (['ar', 'zh', 'es', 'ru', 'fr'].indexOf(activePref) !== -1) {
          window.location.replace('/' + activePref + '/');
          return;
        }
      }
      
      if (!activePref && !sessionStorage.getItem('buygold_lang_detected')) {
        sessionStorage.setItem('buygold_lang_detected', 'true');
        var navLang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
        navLang = navLang.toLowerCase().split('-')[0];
        if (['ar', 'zh', 'es', 'ru', 'fr'].indexOf(navLang) !== -1) {
          window.location.replace('/' + navLang + '/');
        }
      }
    } catch (e) {}
  })();
  </script>`;

function localizeHtml(html, lang, pageName) {
  const langObj = LANGUAGES[lang];
  const meta = PAGES_META[pageName] ? (PAGES_META[pageName][lang] || PAGES_META[pageName]['en']) : null;
  let localized = html;

  // 1. Update <html lang="..." dir="...">
  localized = localized.replace(/<html[^>]*>/i, `<html lang="${lang}"${langObj.dir === 'rtl' ? ' dir="rtl"' : ''}>`);

  // 2. Inject RTL CSS stylesheet if Arabic
  if (langObj.dir === 'rtl') {
    if (!localized.includes('/css/rtl.css')) {
      localized = localized.replace(/<link rel="stylesheet" href="\/css\/style\.css">/i, '<link rel="stylesheet" href="/css/style.css">\n  <link rel="stylesheet" href="/css/rtl.css">');
    }
  } else {
    localized = localized.replace(/\s*<link rel="stylesheet" href="\/css\/rtl\.css">/gi, '');
  }

  // 3. Update Title, Meta Description, Meta Keywords
  if (meta) {
    if (meta.title) {
      localized = localized.replace(/<title>[^<]*<\/title>/i, `<title>${meta.title}</title>`);
      localized = localized.replace(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${meta.title}">`);
      localized = localized.replace(/<meta name="twitter:title" content="[^"]*">/i, `<meta name="twitter:title" content="${meta.title}">`);
    }
    if (meta.description) {
      localized = localized.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${meta.description}">`);
      localized = localized.replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${meta.description}">`);
      localized = localized.replace(/<meta name="twitter:description" content="[^"]*">/i, `<meta name="twitter:description" content="${meta.description}">`);
    }
    if (meta.keywords) {
      localized = localized.replace(/<meta name="keywords" content="[^"]*">/i, `<meta name="keywords" content="${meta.keywords}">`);
    }
  }

  // 4. Update Canonical URL
  const canonicalUrl = getFullPageUrl(lang, pageName);
  localized = localized.replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${canonicalUrl}">`);
  localized = localized.replace(/<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${canonicalUrl}">`);
  localized = localized.replace(/<meta name="twitter:url" content="[^"]*">/i, `<meta name="twitter:url" content="${canonicalUrl}">`);

  // 5. Replace existing or inject hreflang cluster tags
  const hreflangBlock = generateHreflangTags(pageName);
  if (localized.includes('<!-- Bidirectional Multilingual Hreflang Cluster Matrix -->')) {
    localized = localized.replace(/<!-- Bidirectional Multilingual Hreflang Cluster Matrix -->[\s\S]*?(?=<meta name="robots"|<link rel="canonical"|<link rel="icon")/i, hreflangBlock);
  } else {
    localized = localized.replace(/<link rel="canonical"[^>]*>/i, (match) => `${hreflangBlock}${match}`);
  }

  // 6. Update OpenGraph Locale
  localized = localized.replace(/<meta property="og:locale" content="[^"]*">/i, `<meta property="og:locale" content="${langObj.locale}">`);

  // 7. Update internal navigation links first so visitors stay within their current language
  if (lang !== 'en') {
    const linkMap = {
      'href="index.html"': `href="/${lang}/"`,
      'href="/"': `href="/${lang}/"`,
      'href="about-us.html"': `href="/${lang}/about-us.html"`,
      'href="/about-us.html"': `href="/${lang}/about-us.html"`,
      'href="mining.html"': `href="/${lang}/mining.html"`,
      'href="/mining.html"': `href="/${lang}/mining.html"`,
      'href="agri-business.html"': `href="/${lang}/agri-business.html"`,
      'href="/agri-business.html"': `href="/${lang}/agri-business.html"`,
      'href="supply-and-logistics.html"': `href="/${lang}/supply-and-logistics.html"`,
      'href="/supply-and-logistics.html"': `href="/${lang}/supply-and-logistics.html"`,
      'href="engineering.html"': `href="/${lang}/engineering.html"`,
      'href="/engineering.html"': `href="/${lang}/engineering.html"`,
      'href="contact-us.html"': `href="/${lang}/contact-us.html"`,
      'href="/contact-us.html"': `href="/${lang}/contact-us.html"`,
      'href="disclaimer.html"': `href="/${lang}/disclaimer.html"`,
      'href="/disclaimer.html"': `href="/${lang}/disclaimer.html"`
    };

    for (const [srcLink, targetLink] of Object.entries(linkMap)) {
      localized = localized.split(srcLink).join(targetLink);
    }

    // Navigation and Common UI strings
    const navT = UI_STRINGS.nav;
    localized = localized.replace(/>Home<\/a>/g, `>${navT.home[lang]}</a>`);
    localized = localized.replace(/>About Us<\/a>/g, `>${navT.about[lang]}</a>`);
    localized = localized.replace(/>Mining<\/a>/g, `>${navT.mining[lang]}</a>`);
    localized = localized.replace(/>Agri Business<\/a>/g, `>${navT.agri[lang]}</a>`);
    localized = localized.replace(/>Agri-Business<\/a>/g, `>${navT.agri[lang]}</a>`);
    localized = localized.replace(/>Supply and Logistics<\/a>/g, `>${navT.logistics[lang]}</a>`);
    localized = localized.replace(/>Engineering<\/a>/g, `>${navT.engineering[lang]}</a>`);
    localized = localized.replace(/>Contact Us<\/a>/g, `>${navT.contact[lang]}</a>`);
    localized = localized.replace(/>Disclaimer<\/a>/g, `>${navT.disclaimer[lang]}</a>`);
    localized = localized.replace(/<span>Disclaimer<\/span>/g, `<span>${UI_STRINGS.topbar.disclaimer[lang]}</span>`);

    // Buttons
    const btnT = UI_STRINGS.buttons;
    localized = localized.replace(/>Submit Now<\/button>/g, `>${btnT.submitNow[lang]}</button>`);
    localized = localized.replace(/Call Us: \+256 762 079 775/g, `${btnT.callUs[lang]}: +256 762 079 775`);
    localized = localized.replace(/>Explore Our Operations<\/a>/g, `>${btnT.exploreOperations[lang]}</a>`);
    localized = localized.replace(/>Learn More<\/a>/g, `>${btnT.learnMore[lang]}</a>`);
    localized = localized.replace(/>Book a Consultation Today<\/a>/g, `>${btnT.getInTouch[lang]}</a>`);
    localized = localized.replace(/>Book a Consultation<\/a>/g, `>${btnT.getInTouch[lang]}</a>`);

    // Form placeholders
    const formT = UI_STRINGS.form;
    localized = localized.replace(/placeholder="Your Name"/g, `placeholder="${formT.name[lang]}"`);
    localized = localized.replace(/placeholder="Name"/g, `placeholder="${formT.name[lang]}"`);
    localized = localized.replace(/placeholder="Email Address"/g, `placeholder="${formT.email[lang]}"`);
    localized = localized.replace(/placeholder="Your Email"/g, `placeholder="${formT.email[lang]}"`);
    localized = localized.replace(/placeholder="Email"/g, `placeholder="${formT.email[lang]}"`);
    localized = localized.replace(/placeholder="Phone Number"/g, `placeholder="${formT.phone[lang]}"`);
    localized = localized.replace(/placeholder="Phone"/g, `placeholder="${formT.phone[lang]}"`);
    localized = localized.replace(/placeholder="Subject"/g, `placeholder="${formT.subject[lang]}"`);
    localized = localized.replace(/placeholder="Your Message\.\.\."/g, `placeholder="${formT.message[lang]}"`);
    localized = localized.replace(/placeholder="Message"/g, `placeholder="${formT.message[lang]}"`);
    localized = localized.replace(/Stay updated with our latest offers and opportunities\./g, formT.newsletterText[lang]);
    localized = localized.replace(/Any Questions\? Book a Consultation Today\./g, formT.consultationHeading[lang]);

    // Section Badges and Headings
    const badges = {
      whyChooseUs: { en: "WHY CHOOSE US", ar: "لماذا تختارنا", zh: "为什么选择我们", es: "POR QUÉ ELEGIRNOS", ru: "ПОЧЕМУ МЫ", fr: "POURQUOI NOUS CHOISIR" },
      getInTouch: { en: "GET IN TOUCH", ar: "تواصل معنا", zh: "联系我们", es: "CONTACTAR", ru: "СВЯЗАТЬСЯ С НАМИ", fr: "CONTACTEZ-NOUS" },
      startConversation: { en: "Start a Conversation", ar: "ابدأ محادثتك معنا", zh: "开启商业洽谈", es: "Inicie una Conversación", ru: "Начните диалог", fr: "Engager la Conversation" },
      getInTouchNow: { en: "Get in Touch Now", ar: "تواصل معنا الآن", zh: "即刻与我们联系", es: "Póngase en Contacto Ahora", ru: "Свяжитесь с Нами Сейчас", fr: "Contactez-Nous Dès Maintenant" }
    };

    localized = localized.replace(/<span class="badge-tag">WHY CHOOSE US<\/span>/g, `<span class="badge-tag">${badges.whyChooseUs[lang]}</span>`);
    localized = localized.replace(/<span class="badge-tag">GET IN TOUCH<\/span>/g, `<span class="badge-tag">${badges.getInTouch[lang]}</span>`);
    localized = localized.replace(/<span class="badge-tag">Start a Conversation<\/span>/g, `<span class="badge-tag">${badges.startConversation[lang]}</span>`);
    localized = localized.replace(/<h2>Get in Touch Now<\/h2>/g, `<h2>${badges.getInTouchNow[lang]}</h2>`);

    // Hero headline and taglines for index.html
    if (pageName === 'index.html' && meta) {
      if (meta.h1) localized = localized.replace(/<h1>Sustainable Gold Mining, Smelting &amp; Global Mineral Trade in Uganda<\/h1>/i, `<h1>${meta.h1}</h1>`);
      if (meta.badge) localized = localized.replace(/<span class="badge-tag">AL' ITIHAAD INVESTMENTS LTD - UGANDA<\/span>/i, `<span class="badge-tag">${meta.badge}</span>`);
      if (meta.tagline) localized = localized.replace(/<p class="hero-lead">BUYGOLD is Uganda's premier licensed enterprise specialized in high-yield ethical gold extraction, advanced refining, sustainable agro-industry, civil engineering, and worldwide secured logistics\.<\/p>/i, `<p class="hero-lead">${meta.tagline}</p>`);
    }

    // Stats
    const statsT = {
      gold: { ar: "ذهب خالص مفحوص", zh: "化验纯金交付", es: "Oro Puro Ensayado", ru: "Опробованное Золото", fr: "Or Pur Titré" },
      delivery: { ar: "شحن وتوصيل عالمي", zh: "全球安全交付", es: "Entrega Global Segura", ru: "Глобальная Доставка", fr: "Livraison Mondiale" },
      licenses: { ar: "تراخيص تعدين معتمدة", zh: "官方采矿资质", es: "Licencias Mineras", ru: "Горные Лицензии", fr: "Permis Miniers" },
      partners: { ar: "شركاء حول العالم", zh: "全球合作伙伴", es: "Socios Globales", ru: "Партнеры по Всему Миру", fr: "Partenaires Internationaux" }
    };
    if (statsT.gold[lang]) {
      localized = localized.replace(/Pure Gold Assayed/g, statsT.gold[lang]);
      localized = localized.replace(/Global Delivery/g, statsT.delivery[lang]);
      localized = localized.replace(/Mining Licenses/g, statsT.licenses[lang]);
      localized = localized.replace(/Partners Worldwide/g, statsT.partners[lang]);
    }

    // Footer
    const footerT = UI_STRINGS.footer;
    localized = localized.replace(/<h4>Contact Info<\/h4>/g, `<h4>${footerT.contactInfo[lang]}</h4>`);
    localized = localized.replace(/<h4>Quick Links<\/h4>/g, `<h4>${footerT.quickLinks[lang]}</h4>`);
    localized = localized.replace(/<h4>Our Sectors<\/h4>/g, `<h4>${footerT.ourSectors[lang]}</h4>`);
    localized = localized.replace(/<h4>Newsletter<\/h4>/g, `<h4>${footerT.newsletter[lang]}</h4>`);
    localized = localized.replace(/Copyright 2026 BUYGOLD - All Rights Reserved\. Hosted on <a href="https:\/\/www\.buygold\.blog"[^>]*>www\.buygold\.blog<\/a>/g, footerT.copyright[lang]);

    // Schema.org inLanguage update
    localized = localized.replace(/"@context": "https:\/\/schema\.org"/g, `"@context": "https://schema.org",\n    "inLanguage": "${lang}"`);
  }

  // 8. Inject Language Switcher in Top Bar (Done after linkMap to protect switcher URLs)
  const switcherHtml = generateLanguageSwitcher(lang, pageName);
  if (localized.includes('<!-- Multilingual Language Switcher -->')) {
    localized = localized.replace(/<!-- Multilingual Language Switcher -->[\s\S]*?<\/div>\s*<\/div>/i, switcherHtml.trim());
  } else if (localized.includes('<div class="top-bar-socials">')) {
    localized = localized.replace('<div class="top-bar-socials">', `<div class="top-bar-socials">\n${switcherHtml}`);
  }

  // 9. Inject Mobile Language Switcher into Mobile Navigation Drawer
  const mobileSwitcherHtml = generateMobileLanguageSwitcher(lang, pageName);
  if (localized.includes('<!-- Mobile Drawer Language Selector -->')) {
    localized = localized.replace(/<!-- Mobile Drawer Language Selector -->[\s\S]*?<\/div>\s*<\/div>/i, mobileSwitcherHtml.trim());
  } else if (localized.includes('</nav>') && localized.includes('mobile-nav-drawer')) {
    localized = localized.replace(/(<div class="mobile-nav-drawer[^>]*>[\s\S]*?)(<\/aside>|<\/div>\s*<!-- SITE HEADER -->|<\/div>\s*<!-- MAIN HEADER -->)/i, (m, p1, p2) => `${p1}\n${mobileSwitcherHtml}\n${p2}`);
  }

  // 10. If English root page index.html, inject the smart redirect script
  if (lang === 'en' && pageName === 'index.html') {
    if (!localized.includes('buygold_lang_detected')) {
      localized = localized.replace('</head>', `${ROOT_REDIRECT_SCRIPT}\n</head>`);
    }
  } else {
    localized = localized.replace(ROOT_REDIRECT_SCRIPT, '');
  }

  return localized;
}

function generateMultilingualSitemap() {
  const allLangs = Object.keys(LANGUAGES);
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;

  for (const page of PAGES) {
    let priority = '0.8';
    let freq = 'weekly';
    if (page === 'index.html') { priority = '1.0'; freq = 'daily'; }
    else if (page === 'mining.html' || page === 'contact-us.html') { priority = '0.9'; }
    else if (page === 'disclaimer.html') { priority = '0.5'; freq = 'monthly'; }

    // Generate <url> entry for each language variant of this page
    for (const lang of allLangs) {
      const loc = getFullPageUrl(lang, page);
      xml += `  <url>\n`;
      xml += `    <loc>${loc}</loc>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${getFullPageUrl('en', page)}" />\n`;
      for (const altLang of allLangs) {
        xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${getFullPageUrl(altLang, page)}" />\n`;
      }
      xml += `    <lastmod>2026-09-13</lastmod>\n`;
      xml += `    <changefreq>${freq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>\n`;
  return xml;
}

async function run() {
  console.log('--- STARTING BUYGOLD I18N PRE-RENDERER ---');

  // Ensure language directories exist in root and public
  const targetLangs = ['ar', 'zh', 'es', 'ru', 'fr'];
  for (const lang of targetLangs) {
    const langDir = path.join(ROOT_DIR, lang);
    if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });
  }

  // 1. Process each page
  for (const pageName of PAGES) {
    const srcFilePath = path.join(ROOT_DIR, pageName);
    if (!fs.existsSync(srcFilePath)) {
      console.warn(`[WARN] Source file missing: ${pageName}`);
      continue;
    }

    const masterHtml = fs.readFileSync(srcFilePath, 'utf8');

    // Update English master file with language switcher & hreflang
    const updatedEnglish = localizeHtml(masterHtml, 'en', pageName);
    fs.writeFileSync(srcFilePath, updatedEnglish, 'utf8');
    console.log(`[EN] Updated root master: ${pageName}`);

    // Generate localized version for each other language
    for (const lang of targetLangs) {
      const localizedContent = localizeHtml(masterHtml, lang, pageName);
      const destPath = path.join(ROOT_DIR, lang, pageName);
      fs.writeFileSync(destPath, localizedContent, 'utf8');
      console.log(`[${lang.toUpperCase()}] Pre-rendered: ${lang}/${pageName}`);
    }
  }

  // 2. Generate updated Multilingual Sitemap
  const sitemapXml = generateMultilingualSitemap();
  const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
  console.log('[SITEMAP] Generated multilingual sitemap.xml with 48 localized URLs & xhtml:link clusters.');

  console.log('--- BUYGOLD I18N COMPILATION COMPLETE ---');
}

if (require.main === module) {
  run().catch(err => {
    console.error('[ERROR] i18n compilation failed:', err);
    process.exit(1);
  });
}

module.exports = { run };

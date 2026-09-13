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
const { applyBodyTranslations } = require('./i18n-content');

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

// Marker constants for clean, idempotent replacement
const LANG_SWITCHER_START = '<!-- LANG_SWITCHER_START -->';
const LANG_SWITCHER_END = '<!-- LANG_SWITCHER_END -->';

const MOBILE_SWITCHER_START = '<!-- MOBILE_LANG_SWITCHER_START -->';
const MOBILE_SWITCHER_END = '<!-- MOBILE_LANG_SWITCHER_END -->';

const HREFLANG_START = '<!-- HREFLANG_START -->';
const HREFLANG_END = '<!-- HREFLANG_END -->';

const REDIRECT_START = '<!-- ACCEPT_LANG_REDIRECT_START -->';
const REDIRECT_END = '<!-- ACCEPT_LANG_REDIRECT_END -->';

function getFlagSvg(code) {
  switch (code) {
    case 'en':
      return `<svg class="lang-flag-svg" viewBox="0 0 640 480" width="16" height="12"><path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="m75 0 244 181L562 0h78v62L439 240l201 178v62h-78L319 299 75 480H0v-62l201-178L0 62V0h75z"/><path fill="#C8102E" d="m424 288 216 161v31h-40L384 319v-31h40zM640 31 424 192h-40v-31L600 0h40v31zM0 449l216-161h40v31L40 480H0v-31zm0-418L216 192h40v-31L40 0H0v31z"/><path fill="#FFF" d="M240 0h160v480H240zM0 160h640v160H0z"/><path fill="#C8102E" d="M267 0h106v480H267zM0 187h640v106H0z"/></svg>`;
    case 'ar':
      return `<svg class="lang-flag-svg" viewBox="0 0 640 480" width="16" height="12"><path fill="#00732f" d="M0 0h640v160H0z"/><path fill="#fff" d="M0 160h640v160H0z"/><path fill="#000" d="M0 320h640v160H0z"/><path fill="#f00" d="M0 0h160v480H0z"/></svg>`;
    case 'zh':
      return `<svg class="lang-flag-svg" viewBox="0 0 640 480" width="16" height="12"><path fill="#ee1c25" d="M0 0h640v480H0z"/><path fill="#ffde00" d="M120 160l-37.6 27.3 14.4-44.2-37.6-27.4h46.5L120 71.4l14.4 44.3h46.5l-37.6 27.4 14.4 44.2zM200 48l-4.2 13.9 14.4.7-11.4 8.7 4.2 13.9-11.8-8.1-11.8 8.1 4.2-13.9-11.4-8.7 14.4-.7zM240 96l-7.4 12.5 13.2 5.7-14.3 1.5.8 14.5-9.6-10.9-13.9 4 7.4-12.5-9.6-10.9 14.3 1.5zM240 176l-11.8 8.2.8 14.5-9.6-10.9-13.9 4 7.4-12.5-9.6-10.9 14.3 1.5 5.8-13.3 4.2 13.9zM200 240l-4.2 13.9 14.4.7-11.4 8.7 4.2 13.9-11.8-8.1-11.8 8.1 4.2-13.9-11.4-8.7 14.4-.7z"/></svg>`;
    case 'es':
      return `<svg class="lang-flag-svg" viewBox="0 0 640 480" width="16" height="12"><path fill="#aa151b" d="M0 0h640v480H0z"/><path fill="#f1bf00" d="M0 120h640v240H0z"/></svg>`;
    case 'ru':
      return `<svg class="lang-flag-svg" viewBox="0 0 640 480" width="16" height="12"><path fill="#fff" d="M0 0h640v160H0z"/><path fill="#0039a6" d="M0 160h640v160H0z"/><path fill="#d52b1e" d="M0 320h640v160H0z"/></svg>`;
    case 'fr':
      return `<svg class="lang-flag-svg" viewBox="0 0 640 480" width="16" height="12"><path fill="#002395" d="M0 0h213.3v480H0z"/><path fill="#fff" d="M213.3 0h213.4v480H213.3z"/><path fill="#ed2939" d="M426.7 0H640v480H426.7z"/></svg>`;
    default:
      return '';
  }
}

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
  return tags.trimEnd();
}

function generateLanguageSwitcher(currentLang, pageName) {
  const currentFlagSvg = getFlagSvg(currentLang);
  let items = '';
  for (const [code, lang] of Object.entries(LANGUAGES)) {
    const targetUrl = getPageUrl(code, pageName);
    const isActive = code === currentLang ? ' active' : '';
    const flagSvg = getFlagSvg(code);
    items += `            <li><a href="${targetUrl}" class="lang-dropdown-item${isActive}" data-lang="${code}" role="menuitem"><span class="lang-flag">${flagSvg}</span><span class="lang-name">${lang.name}</span><span class="lang-native">${lang.nativeName}</span></a></li>\n`;
  }

  return `        <div class="lang-switcher">
          <button type="button" class="lang-switcher-btn" aria-haspopup="true" aria-expanded="false" aria-label="Select Language">
            <span class="lang-flag">${currentFlagSvg}</span>
            <span class="lang-code">${currentLang.toUpperCase()}</span>
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
    const flagSvg = getFlagSvg(code);
    links += `          <a href="${targetUrl}" class="mobile-lang-link${isActive}" data-lang="${code}"><span class="lang-flag">${flagSvg}</span> <span>${lang.nativeName}</span></a>\n`;
  }

  const headingText = currentLang === 'ar' ? 'اختر اللغة' : (currentLang === 'zh' ? '选择语言' : (currentLang === 'es' ? 'Seleccionar Idioma' : (currentLang === 'ru' ? 'Выберите язык' : (currentLang === 'fr' ? 'Choisir la langue' : 'Select Language'))));

  return `        <div class="mobile-lang-switcher">
          <h5>${headingText}</h5>
          <div class="mobile-lang-grid">
${links}          </div>
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

  // 2. Inject RTL CSS stylesheet if Arabic, remove for LTR
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

  // 4. Update Canonical URL & Social URLs
  const canonicalUrl = getFullPageUrl(lang, pageName);
  localized = localized.replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${canonicalUrl}">`);
  localized = localized.replace(/<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${canonicalUrl}">`);
  localized = localized.replace(/<meta name="twitter:url" content="[^"]*">/i, `<meta name="twitter:url" content="${canonicalUrl}">`);

  // 5. Replace existing or inject hreflang cluster tags with exact bounded markers
  const hreflangBlock = generateHreflangTags(pageName);
  const fullHreflangSection = `${HREFLANG_START}\n${hreflangBlock}\n  ${HREFLANG_END}`;
  if (localized.includes(HREFLANG_START)) {
    const reHreflang = new RegExp(`${HREFLANG_START}[\\s\\S]*?${HREFLANG_END}`, 'i');
    localized = localized.replace(reHreflang, fullHreflangSection);
  } else {
    localized = localized.replace(/<link rel="canonical"[^>]*>/i, (match) => `${fullHreflangSection}\n  ${match}`);
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
      licenses: { ar: "تراخيص تعدين معتمدة", zh: "官方采矿资质", es: "Licencias Mineras", ru: "Permis Miniers" },
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
    localized = localized.replace(/<h4>Contact Info<\/h4>/gi, `<h4>${footerT.contactInfo[lang]}</h4>`);
    localized = localized.replace(/<h4>Quick Links<\/h4>/gi, `<h4>${footerT.quickLinks[lang]}</h4>`);
    localized = localized.replace(/<h4>Quick links<\/h4>/gi, `<h4>${footerT.quickLinks[lang]}</h4>`);
    localized = localized.replace(/<h4>Our Sectors<\/h4>/gi, `<h4>${footerT.ourSectors[lang]}</h4>`);
    localized = localized.replace(/<h4>Services<\/h4>/gi, `<h4>${footerT.ourSectors[lang]}</h4>`);
    localized = localized.replace(/<h4>Newsletter<\/h4>/gi, `<h4>${footerT.newsletter[lang]}</h4>`);
    localized = localized.replace(/Copyright 2026 BUYGOLD - All Rights Reserved\. Hosted on <a href="https:\/\/www\.buygold\.blog"[^>]*>www\.buygold\.blog<\/a>/g, footerT.copyright[lang]);

    // Footer, breadcrumb, and drawer spans
    localized = localized.replace(/<span>Home<\/span>/g, `<span>${navT.home[lang]}</span>`);
    localized = localized.replace(/<span>Mining<\/span>/g, `<span>${navT.mining[lang]}</span>`);
    localized = localized.replace(/<span>Agri-Business<\/span>/g, `<span>${navT.agri[lang]}</span>`);
    localized = localized.replace(/<span>Agri Business<\/span>/g, `<span>${navT.agri[lang]}</span>`);
    localized = localized.replace(/<span>Supply and Logistics<\/span>/g, `<span>${navT.logistics[lang]}</span>`);
    localized = localized.replace(/<span>Engineering<\/span>/g, `<span>${navT.engineering[lang]}</span>`);
    localized = localized.replace(/<span>About Us<\/span>/g, `<span>${navT.about[lang]}</span>`);
    localized = localized.replace(/<span>Contact Us<\/span>/g, `<span>${navT.contact[lang]}</span>`);
    localized = localized.replace(/>Fraud Disclaimer<\/a>/g, `>${navT.disclaimer[lang]}</a>`);

    // Schema.org inLanguage update
    localized = localized.replace(/"@context": "https:\/\/schema\.org"/g, `"@context": "https://schema.org",\n    "inLanguage": "${lang}"`);

    // Apply comprehensive human-grade body content translations across all pages & sections
    localized = applyBodyTranslations(localized, lang, pageName);
  }

  // 8. Inject / Update Language Switcher in .header-actions with bounded markers
  const switcherHtml = generateLanguageSwitcher(lang, pageName);
  const fullSwitcherBlock = `${LANG_SWITCHER_START}\n${switcherHtml}\n        ${LANG_SWITCHER_END}`;
  if (localized.includes(LANG_SWITCHER_START)) {
    const reSwitcher = new RegExp(`${LANG_SWITCHER_START}[\\s\\S]*?${LANG_SWITCHER_END}`, 'i');
    localized = localized.replace(reSwitcher, fullSwitcherBlock);
  } else if (localized.includes('<div class="header-actions">')) {
    localized = localized.replace('<div class="header-actions">', `<div class="header-actions">\n${fullSwitcherBlock}`);
  }

  // 9. Inject / Update Mobile Language Switcher into Mobile Navigation Drawer (if drawer exists)
  if (localized.includes('mobile-nav-drawer')) {
    const mobileSwitcherHtml = generateMobileLanguageSwitcher(lang, pageName);
    const fullMobileBlock = `${MOBILE_SWITCHER_START}\n${mobileSwitcherHtml}\n      ${MOBILE_SWITCHER_END}`;
    if (localized.includes(MOBILE_SWITCHER_START)) {
      const reMobile = new RegExp(`${MOBILE_SWITCHER_START}[\\s\\S]*?${MOBILE_SWITCHER_END}`, 'i');
      localized = localized.replace(reMobile, fullMobileBlock);
    } else {
      // Safely append after the disclaimer link inside .mobile-nav-links
      localized = localized.replace(/(<a[^>]*disclaimer\.html[^>]*>.*?<\/a>)/i, `$1\n${fullMobileBlock}`);
    }
  }

  // 10. If English root page index.html, inject the smart redirect script
  if (lang === 'en' && pageName === 'index.html') {
    const fullRedirectBlock = `${REDIRECT_START}\n${ROOT_REDIRECT_SCRIPT}\n  ${REDIRECT_END}`;
    if (localized.includes(REDIRECT_START)) {
      const reRedirect = new RegExp(`${REDIRECT_START}[\\s\\S]*?${REDIRECT_END}`, 'i');
      localized = localized.replace(reRedirect, fullRedirectBlock);
    } else {
      localized = localized.replace('</head>', `  ${fullRedirectBlock}\n</head>`);
    }
  } else {
    // Remove redirect script from localized pages or inner pages
    if (localized.includes(REDIRECT_START)) {
      const reRedirect = new RegExp(`\\s*${REDIRECT_START}[\\s\\S]*?${REDIRECT_END}`, 'gi');
      localized = localized.replace(reRedirect, '');
    }
  }

  return localized;
}

function validateHtml(filePath, html) {
  const openDivs = (html.match(/<div[\s>]/gi) || []).length;
  const closeDivs = (html.match(/<\/div>/gi) || []).length;
  if (openDivs !== closeDivs) {
    throw new Error(`CRITICAL TAG MISMATCH in ${filePath}: ${openDivs} <div> opened vs ${closeDivs} </div> closed! Aborting to protect layout.`);
  }
  if (!html.includes('class="main-header"')) {
    throw new Error(`CRITICAL DOM LOSS in ${filePath}: .main-header is missing! Aborting to protect layout.`);
  }
  if (!html.includes('class="lang-switcher"')) {
    throw new Error(`CRITICAL ERROR in ${filePath}: .lang-switcher is missing! Aborting.`);
  }
  return true;
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

  // Ensure language directories exist in root
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
    validateHtml(pageName, updatedEnglish);
    fs.writeFileSync(srcFilePath, updatedEnglish, 'utf8');
    console.log(`[EN] Updated & validated root master: ${pageName}`);

    // Generate localized version for each target language
    for (const lang of targetLangs) {
      const localizedContent = localizeHtml(masterHtml, lang, pageName);
      const destPath = path.join(ROOT_DIR, lang, pageName);
      validateHtml(`${lang}/${pageName}`, localizedContent);
      fs.writeFileSync(destPath, localizedContent, 'utf8');
      console.log(`[${lang.toUpperCase()}] Pre-rendered & validated: ${lang}/${pageName}`);
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

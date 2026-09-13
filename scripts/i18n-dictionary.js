/**
 * BUYGOLD (Al' Itihaad Investments)
 * Comprehensive Multilingual Translation Dictionary
 * Languages: en (English), ar (Arabic), zh (Chinese), es (Spanish), ru (Russian), fr (French)
 */

const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    dir: 'ltr',
    slugPrefix: '',
    locale: 'en_US'
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇦🇪',
    dir: 'rtl',
    slugPrefix: '/ar',
    locale: 'ar_AE'
  },
  zh: {
    code: 'zh',
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
    flag: '🇨🇳',
    dir: 'ltr',
    slugPrefix: '/zh',
    locale: 'zh_CN'
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    dir: 'ltr',
    slugPrefix: '/es',
    locale: 'es_ES'
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    dir: 'ltr',
    slugPrefix: '/ru',
    locale: 'ru_RU'
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    dir: 'ltr',
    slugPrefix: '/fr',
    locale: 'fr_FR'
  }
};

const PAGES_META = {
  'index.html': {
    slug: '',
    en: {
      title: "BUYGOLD – Premier Gold Mining, Processing & Investment in Uganda",
      description: "BUYGOLD (Al' Itihaad Investments) is Uganda's premier licensed enterprise for ethical gold mining, smelting, mineral export, sustainable agriculture, and logistics.",
      keywords: "buy gold uganda, gold mining uganda, gold processing kampala, uganda gold exporter, buy physical gold africa, ethical gold mining, gold refinery uganda, raw gold bullion, uganda mining investment, al itihaad investments",
      h1: "Sustainable Gold Mining, Smelting & Global Mineral Trade in Uganda",
      badge: "AL' ITIHAAD INVESTMENTS LTD - UGANDA",
      tagline: "Empowering Uganda's Resource Wealth Through Responsible Extraction, Advanced Processing, and International Trading Standards."
    },
    ar: {
      title: "باي جولد – استخراج وتكرير الذهب والاستثمار التعديني في أوغندا",
      description: "باي جولد (استثمارات الاتحاد) هي المؤسسة الأوغندية الرائدة في التعدين الأخلاقي للذهب، صهر المعادن الثمينة، التصدير العالمي، والخدمات اللوجستية.",
      keywords: "شراء ذهب اوغندا, تعدين الذهب اوغندا, مصفاة ذهب كمبالا, تصدير سبائك الذهب, استثمار التعدين افريقيا, شراء ذهب خام, استثمارات الاتحاد",
      h1: "تعدين وصهر الذهب والتجارة العالمية للمعادن الثمينة في أوغندا",
      badge: "شركة استثمارات الاتحاد المحدودة - أوغندا",
      tagline: "تمكين الثروات الطبيعية في أوغندا عبر استخراج مسؤول، معالجة صناعية متطورة، ومعايير تصدير دولية."
    },
    zh: {
      title: "BUYGOLD – 乌干达领先的黄金开采、冶炼加工与矿业投资伙伴",
      description: "BUYGOLD（Al' Itihaad Investments）是乌干达政府许可的领先企业，专注于合规道德黄金开采、纯金冶炼、矿物出口、现代化农业与全球物流。",
      keywords: "乌干达买黄金, 乌干达金矿开采, 坎帕拉黄金精炼厂, 非洲实物黄金出口, 道德黄金开采, 纯金金条, 乌干达矿业投资, 非洲大宗商品贸易",
      h1: "乌干达可持续黄金开采、先进冶炼与全球贵金属贸易",
      badge: "AL' ITIHAAD INVESTMENTS LTD - 乌干达",
      tagline: "依托负责任的开采实践、尖端的选矿与冶炼技术，连接乌干达黄金资源与全球投资市场。"
    },
    es: {
      title: "BUYGOLD – Minería, Procesamiento y Comercio de Oro en Uganda",
      description: "BUYGOLD (Al' Itihaad Investments) es la empresa líder certificada en Uganda para la minería ética de oro, fundición, exportación de minerales y logística global.",
      keywords: "comprar oro uganda, mineria de oro uganda, refineria de oro kampala, lingotes de oro africa, exportacion de minerales preciosos, inversion minera uganda",
      h1: "Minería Responsable de Oro, Fundición y Comercio Internacional en Uganda",
      badge: "AL' ITIHAAD INVESTMENTS LTD - UGANDA",
      tagline: "Potenciando la riqueza mineral de Uganda mediante extracción responsable, procesamiento avanzado y estándares globales de comercio."
    },
    ru: {
      title: "BUYGOLD – Добыча, Переработка и Экспорт Золота в Уганде",
      description: "BUYGOLD (Al' Itihaad Investments) — ведущее лицензированное предприятие Уганды в сфере этичной золотодобычи, аффинажа, экспорта слитков и логистики.",
      keywords: "купить золото уганда, добыча золота уганда, аффинаж золота кампала, экспорт золотых слитков африка, инвестиции в золотодобычу, этичное золото",
      h1: "Добыча, Аффинаж и Международная Торговля Золотом в Уганде",
      badge: "AL' ITIHAAD INVESTMENTS LTD - УГАНДА",
      tagline: "Развитие минеральных ресурсов Уганды через ответственную добычу, передовую металлургию и международные стандарты торговли."
    },
    fr: {
      title: "BUYGOLD – Extraction, Raffinage et Négoce d'Or en Ouganda",
      description: "BUYGOLD (Al' Itihaad Investments) est l'entreprise ougandaise agréée pour l'extraction éthique de l'or, la fonderie, l'exportation minérale et la logistique.",
      keywords: "acheter de lor ouganda, mines dor ouganda, affinage or kampala, lingots dor afrique, export mineraux precieux, investissement minier ouganda",
      h1: "Exploitation Minière Durable, Fonderie et Commerce International d'Or",
      badge: "AL' ITIHAAD INVESTMENTS LTD - OUGANDA",
      tagline: "Valoriser le potentiel minéral de l'Ouganda grâce à une extraction éthique, un raffinage de pointe et des normes de négociation internationales."
    }
  },
  'about-us.html': {
    slug: 'about-us.html',
    localizedSlugs: {
      ar: 'من-نحن',
      zh: '关于我们',
      es: 'sobre-nosotros',
      ru: 'o-nas',
      fr: 'a-propos'
    },
    en: {
      title: "About Us – BUYGOLD | Licensed Gold Mining & Multi-Sector Enterprise Uganda",
      description: "Learn about BUYGOLD (Al' Itihaad Investments): Our mission, leadership, ethical mining practices, and vision as a premier multi-sector conglomerate in Uganda.",
      keywords: "about buygold, gold mining company uganda, ethical gold sourcing, al itihaad investments, uganda mineral development, sustainable mining east africa"
    },
    ar: {
      title: "من نحن – باي جولد | مؤسسة التعدين والاستثمار المتعدد في أوغندا",
      description: "تعرف على باي جولد (استثمارات الاتحاد): رؤيتنا، قيادتنا، مبادئ التعدين الأخلاقي، ودورنا كمجموعة استثمارية رائدة في أوغندا وشرق أفريقيا.",
      keywords: "عن باي جولد, شركة تعدين ذهب اوغندا, مصادر الذهب الاخلاقية, استثمارات الاتحاد, تنمية المعادن اوغندا"
    },
    zh: {
      title: "关于我们 – BUYGOLD | 乌干达合规黄金开采与多元产业集团",
      description: "了解BUYGOLD（Al' Itihaad Investments）：我们的企业愿景、专业管理团队、合规道德开采准则，以及引领东非矿业发展的宏伟战略。",
      keywords: "关于buygold, 乌干达金矿公司, 道德黄金溯源, 非洲大型矿业集团, 乌干达投资"
    },
    es: {
      title: "Sobre Nosotros – BUYGOLD | Minería y Grupo Empresarial en Uganda",
      description: "Conozca BUYGOLD (Al' Itihaad Investments): Nuestra misión, liderazgo, estándares éticos de minería y visión como conglomerado líder en Uganda.",
      keywords: "sobre buygold, empresa minera de oro uganda, abastecimiento etico de oro, inversiones en uganda"
    },
    ru: {
      title: "О Нас – BUYGOLD | Золотодобывающее и Инвестиционное Предприятие Уганды",
      description: "Узнайте о BUYGOLD (Al' Itihaad Investments): наша миссия, руководство, этические стандарты добычи и масштабные проекты в Уганде.",
      keywords: "о компании buygold, золотодобывающая компания уганда, этичная добыча золота, инвестиции в африку"
    },
    fr: {
      title: "À Propos – BUYGOLD | Exploitation Minière et Groupe Multisectoriel en Ouganda",
      description: "Découvrez BUYGOLD (Al' Itihaad Investments) : Notre mission, gouvernance, traçabilité éthique de l'or et vision pour le développement minier en Ouganda.",
      keywords: "a propos de buygold, societe miniere or ouganda, or ethique afrique, investissements ouganda"
    }
  },
  'mining.html': {
    slug: 'mining.html',
    localizedSlugs: {
      ar: 'تعدين-الذهب',
      zh: '黄金开采',
      es: 'mineria-de-oro',
      ru: 'dobycha-zolota',
      fr: 'mines-dor'
    },
    en: {
      title: "Gold Mining, Smelting & Mineral Processing – BUYGOLD Uganda",
      description: "Explore BUYGOLD's world-class gold mining, extraction, assaying, smelting, and mineral export operations in Uganda under strict ethical standards.",
      keywords: "gold mining uganda, gold smelting kampala, mineral processing east africa, buy raw gold uganda, gold assaying services, ethical gold extraction, uganda gold refinery, gold bullion export"
    },
    ar: {
      title: "تعدين وصهر ومعالجة الذهب – باي جولد أوغندا",
      description: "استكشف عمليات باي جولد في استخراج الذهب، الفحص المخبري الدقيق، الصهر، والتصدير التجاري وفق أعلى المعايير الدولية في أوغندا.",
      keywords: "تعدين الذهب اوغندا, صهر الذهب كمبالا, معالجة المعادن شرق افريقيا, شراء ذهب خام, فحص عيار الذهب, مصفاة ذهب اوغندا"
    },
    zh: {
      title: "黄金开采、冶炼与矿物深加工 – BUYGOLD 乌干达",
      description: "探索BUYGOLD世界一流的黄金开采、重选分离、高精度化验、提纯冶炼及国际金条出口全产业链体系。",
      keywords: "乌干达黄金开采, 坎帕拉黄金冶炼, 东非矿物加工, 购买乌干达生金, 黄金化验检测, 纯金出口"
    },
    es: {
      title: "Minería, Fundición y Procesamiento de Oro – BUYGOLD Uganda",
      description: "Explore las operaciones de BUYGOLD en extracción minera, ensayo químico, fundición de alta pureza y exportación legal de oro en Uganda.",
      keywords: "mineria de oro uganda, fundicion de oro kampala, procesamiento de minerales, comprar oro en bruto, ensayo de pureza de oro"
    },
    ru: {
      title: "Добыча, Плавка и Переработка Золота – BUYGOLD Уганда",
      description: "Ознакомьтесь с масштабными операциями BUYGOLD по добыче золота, химическому анализу, выплавке слитков и экспорту драгметаллов из Уганды.",
      keywords: "добыча золота уганда, плавка золота кампала, обогащение руды, покупка сырого золота, анализ пробы золота"
    },
    fr: {
      title: "Mines d'Or, Fonderie et Traitement des Minéraux – BUYGOLD Ouganda",
      description: "Explorez les infrastructures de BUYGOLD pour l'extraction aurifère, l'analyse titrage, la fonderie et l'exportation sécurisée de lingots en Ouganda.",
      keywords: "mines dor ouganda, fonderie or kampala, traitement mineraux afrique, achat or brut ouganda, analyse purete or"
    }
  },
  'agri-business.html': {
    slug: 'agri-business.html',
    localizedSlugs: {
      ar: 'الزراعة-والأعمال-الزراعية',
      zh: '现代农业',
      es: 'agroindustria',
      ru: 'agrobiznes',
      fr: 'agro-industrie'
    },
    en: {
      title: "Sustainable Agri-Business & Modern Farming – BUYGOLD Uganda",
      description: "BUYGOLD's modern mechanized agriculture, commercial crop farming, agro-processing, and food security initiatives driving sustainable economic growth in Uganda.",
      keywords: "agri business uganda, sustainable farming east africa, commercial agriculture kampala, organic crop production, agro processing uganda, farm investment africa"
    },
    ar: {
      title: "الزراعة المستدامة والمشاريع الزراعية الحديثة – باي جولد أوغندا",
      description: "استثمارات باي جولد في الزراعة الآلية الحديثة، زراعة المحاصيل النقدية التجارية، التصنيع الزراعي، والأمن الغذائي في أوغندا.",
      keywords: "الزراعة في اوغندا, استثمار زراعي شرق افريقيا, زراعة تجارية كمبالا, محاصيل عضوية, تصنيع زراعي اوغندا"
    },
    zh: {
      title: "现代化生态农业与农产品加工 – BUYGOLD 乌干达",
      description: "BUYGOLD投资大规模机械化农业、高价值经济作物种植、现代农产品深加工与东非粮食安全保障项目。",
      keywords: "乌干达农业投资, 东非现代农业, 坎帕拉商品农业, 有机作物出口, 非洲农产品加工"
    },
    es: {
      title: "Agroindustria Sostenible y Agricultura Moderna – BUYGOLD Uganda",
      description: "Las iniciativas de BUYGOLD en agricultura mecanizada moderna, cultivos comerciales a gran escala y procesamiento agroalimentario en Uganda.",
      keywords: "agroindustria uganda, agricultura sostenible africa, cultivos comerciales kampala, inversiones agricolas"
    },
    ru: {
      title: "Устойчивый Агробизнес и Сельское Хозяйство – BUYGOLD Уганда",
      description: "Инвестиции BUYGOLD в механизированное земледелие, выращивание экспортных культур, агропереработку и обеспечение продовольственной безопасности.",
      keywords: "агробизнес уганда, сельское хозяйство африка, товарное растениеводство, инвестиции в агросектор"
    },
    fr: {
      title: "Agro-Industrie Durable et Agriculture Moderne – BUYGOLD Ouganda",
      description: "Projets de BUYGOLD dans l'agriculture mécanisée, la production de cultures de rente commerciales et la transformation agroalimentaire en Ouganda.",
      keywords: "agro industrie ouganda, agriculture durable afrique, cultures commerciales, transformation agroalimentaire"
    }
  },
  'supply-and-logistics.html': {
    slug: 'supply-and-logistics.html',
    localizedSlugs: {
      ar: 'سلاسل-الإمداد-واللوجستيات',
      zh: '物流供应链',
      es: 'suministro-y-logistica',
      ru: 'logistika',
      fr: 'chaine-logistique'
    },
    en: {
      title: "Supply Chain & Secure Mineral Logistics – BUYGOLD Uganda",
      description: "Armored transport, secure transit, customs documentation, bonded warehousing, and international freight forwarding for gold and valuable commodities worldwide.",
      keywords: "gold transport logistics uganda, armored transport kampala, secure mineral transit, international freight forwarding, bonded warehousing uganda, gold export logistics"
    },
    ar: {
      title: "سلاسل الإمداد والخدمات اللوجستية الآمنة للمعادن – باي جولد أوغندا",
      description: "نقل مصفح عالي الأمان، عبور دولي آمن، تخليص جمركي، مستودعات مؤمنة، وشحن جوي للمعادن الثمينة والذهب حول العالم.",
      keywords: "لوجستيات نقل الذهب اوغندا, نقل مصفح كمبالا, شحن معادن ثمينة, تخليص جمركي ذهب, مستودعات مؤمنة اوغندا"
    },
    zh: {
      title: "贵金属安全物流与全球供应链管理 – BUYGOLD 乌干达",
      description: "提供最高级别武装押运、海关报关合规、保税仓储与国际航运专线，确保黄金及贵金属资产全球安全交付。",
      keywords: "乌干达黄金押运物流, 坎帕拉武装运输, 贵金属安全航运, 保税仓库乌干达, 黄金出口合规报关"
    },
    es: {
      title: "Cadena de Suministro y Logística Segura de Minerales – BUYGOLD",
      description: "Transporte blindado, tránsito seguro, trámites aduaneros, almacenamiento fiscal y transporte aéreo internacional para oro y carga de alto valor.",
      keywords: "logistica de transporte de oro uganda, transporte blindado kampala, flete aereo internacional, aduanas de oro"
    },
    ru: {
      title: "Логистика и Безопасная Транспортировка Золота – BUYGOLD",
      description: "Бронированные перевозки, таможенное оформление, охраняемые склады и международная авиаперевозка золота и драгоценных грузов.",
      keywords: "логистика золота уганда, инкассация кампала, бронированный транспорт, таможенное оформление золота"
    },
    fr: {
      title: "Chaîne d'Approvisionnement et Logistique Minière Sécurisée – BUYGOLD",
      description: "Transport blindé haute sécurité, transit douanier, entreposage sous douane et fret aérien international pour l'or et les métaux précieux.",
      keywords: "logistique transport or ouganda, transport blinde kampala, fret aerien mineraux, douane exportation or"
    }
  },
  'engineering.html': {
    slug: 'engineering.html',
    localizedSlugs: {
      ar: 'خدمات-الهندسة-والإنشاءات',
      zh: '工程建设',
      es: 'ingenieria',
      ru: 'inzheneriya',
      fr: 'ingenierie'
    },
    en: {
      title: "Civil, Structural & Mining Engineering Services – BUYGOLD",
      description: "Comprehensive civil, structural, mining infrastructure, and heavy equipment engineering solutions delivered by BUYGOLD's certified technical teams in Uganda.",
      keywords: "mining engineering uganda, civil construction kampala, heavy equipment services, industrial infrastructure east africa, structural engineering uganda"
    },
    ar: {
      title: "الهندسة المدنية والإنشائية وهندسة التعدين – باي جولد",
      description: "حلول متكاملة في الهندسة الإنشائية، تطوير بنية التعدين التحتية، وإدارة المعدات الثقيلة تنفذها فرق باي جولد الهندسية المعتمدة.",
      keywords: "هندسة التعدين اوغندا, انشاءات مدنية كمبالا, خدمات المعدات الثقيلة, بنية تحتية صناعية شرق افريقيا"
    },
    zh: {
      title: "矿业工程、土木建设与重型设备服务 – BUYGOLD",
      description: "BUYGOLD专业工程师团队提供涵盖选矿厂设计施工、矿山基础设施建设、土木结构工程与重型机械运维的一体化解决方案。",
      keywords: "乌干达矿业工程, 坎帕拉土木工程, 重型设备运维, 东非工业基础设施, 选矿厂建设"
    },
    es: {
      title: "Servicios de Ingeniería Civil, Estructural y Minera – BUYGOLD",
      description: "Soluciones completas de infraestructura minera, construcción civil e ingeniería estructural ejecutadas por los equipos técnicos de BUYGOLD.",
      keywords: "ingenieria minera uganda, construccion civil kampala, maquinaria pesada, infraestructura industrial"
    },
    ru: {
      title: "Горный Инжиниринг, Гражданское Строительство – BUYGOLD",
      description: "Проектирование обогатительных фабрик, строительство горнодобывающей инфраструктуры и обслуживание тяжелой спецтехники в Уганде.",
      keywords: "горный инжиниринг уганда, строительные работы кампала, тяжелая техника, инфраструктура горного дела"
    },
    fr: {
      title: "Ingénierie Civile, Structurelle et Minière – BUYGOLD",
      description: "Solutions d'infrastructure minière, génie civil, structures industrielles et gestion d'équipements lourds par les équipes agréées de BUYGOLD.",
      keywords: "ingenierie miniere ouganda, genie civil kampala, engins lourds exploitation, infrastructures industrielles"
    }
  },
  'contact-us.html': {
    slug: 'contact-us.html',
    localizedSlugs: {
      ar: 'اتصل-بنا',
      zh: '联系我们',
      es: 'contacto',
      ru: 'kontakty',
      fr: 'contactez-nous'
    },
    en: {
      title: "Contact Us – Gold Inquiries & Consultations | BUYGOLD Uganda",
      description: "Contact BUYGOLD for gold purchasing, trade inquiries, and investment consultations. Visit our Kiwatule Kampala office, email info@buygold.blog, or call +256 762 079 775.",
      keywords: "contact buygold, buy gold kampala office, gold dealer contact uganda, kiwatule kampala gold office, gold inquiry email buygold, uganda gold consultation"
    },
    ar: {
      title: "اتصل بنا – استفسارات شراء الذهب والاستشارات | باي جولد أوغندا",
      description: "تواصل مع باي جولد لشراء الذهب، استفسارات الصفقات، واستشارات الاستثمار. تفضل بزيارة مكتبنا في كيواتولي كمبالا أو راسلنا عبر البريد الإلكتروني.",
      keywords: "اتصل بباي جولد, مكتب شراء ذهب كمبالا, ارقام تجار ذهب اوغندا, استشارة شراء ذهب اوغندا"
    },
    zh: {
      title: "联系我们 – 黄金采购、商务咨询与合作洽谈 | BUYGOLD",
      description: "欢迎就黄金现货采购、国际矿业投资与商业合作联系BUYGOLD。办公地址：乌干达坎帕拉Kiwatule Valley Close，电话：+256 762 079 775。",
      keywords: "联系buygold, 坎帕拉买金办公室, 乌干达黄金交易商电话, 乌干达金矿投资咨询, 官方合作邮箱"
    },
    es: {
      title: "Contáctenos – Consultas y Compra de Oro | BUYGOLD Uganda",
      description: "Póngase en contacto con BUYGOLD para la compra de oro, consultas comerciales e inversiones. Visite nuestra sede en Kiwatule Kampala o llame al +256 762 079 775.",
      keywords: "contacto buygold, comprar oro en kampala, oficina de oro uganda, consulta sobre oro"
    },
    ru: {
      title: "Контакты – Покупка Золота и Консультации | BUYGOLD Уганда",
      description: "Свяжитесь с BUYGOLD по вопросам закупки золота и партнерских соглашений. Наш офис: Valley Close, Kiwatule, Кампала. Тел: +256 762 079 775.",
      keywords: "контакты buygold, купить золото офис кампала, дилер золота уганда, консультация по закупке золота"
    },
    fr: {
      title: "Contactez-Nous – Achat d'Or et Consultations | BUYGOLD Ouganda",
      description: "Contactez BUYGOLD pour l'achat d'or, les opportunités d'investissement et partenariats. Siège à Kiwatule Kampala ou appelez le +256 762 079 775.",
      keywords: "contact buygold, achat or bureau kampala, negocient or ouganda, consultation or investissement"
    }
  },
  'disclaimer.html': {
    slug: 'disclaimer.html',
    localizedSlugs: {
      ar: 'إخلاء-المسؤولية-القانونية',
      zh: '法律免责声明',
      es: 'descargo-de-responsabilidad',
      ru: 'otkaz-ot-otvetstvennosti',
      fr: 'mentions-legales'
    },
    en: {
      title: "Official Legal Disclaimer & Fraud Warning Notice – BUYGOLD",
      description: "Important official disclaimer and fraud prevention notice from BUYGOLD regarding genuine communications, verification protocols, and authentic business transactions.",
      keywords: "buygold disclaimer, official fraud alert, gold transaction verification, authentic communications buygold"
    },
    ar: {
      title: "إخلاء المسؤولية القانونية وتنبيه الحماية من الاحتيال – باي جولد",
      description: "إشعار قانوني رسمي وتحذير من الاحتيال صادر عن شركة باي جولد لحماية المتعاملين وضمان التحقق من القنوات الرسمية المعتمدة.",
      keywords: "اخلاء مسؤولية باي جولد, تحذير احتيال الذهب, التحقق من معاملات الذهب, القنوات الرسمية باي جولد"
    },
    zh: {
      title: "官方法律免责声明与防诈骗安全警示 – BUYGOLD",
      description: "BUYGOLD官方发布的反诈骗警示与免责声明，明确官方正规交易渠道与防伪验证指引，切实保障客户与合作伙伴财产安全。",
      keywords: "buygold免责声明, 黄金交易防骗警示, 乌干达黄金交易防伪验证, 官方正规沟通渠道"
    },
    es: {
      title: "Descargo Legal y Aviso Contra el Fraude – BUYGOLD",
      description: "Aviso oficial y advertencia contra el fraude de BUYGOLD sobre canales de comunicación verificados y autenticidad de transacciones.",
      keywords: "aviso legal buygold, alerta de fraude oro, verificacion de transacciones de oro"
    },
    ru: {
      title: "Официальное Уведомление и Предостережение о Мошенничестве – BUYGOLD",
      description: "Важное юридическое предупреждение BUYGOLD о проверке подлинности сделок и защите от несанкционированных предложений.",
      keywords: "уведомление buygold, предупреждение о мошенничестве золото, проверка подлинности контактов"
    },
    fr: {
      title: "Avis Juridique et Mise en Garde Contre la Fraude – BUYGOLD",
      description: "Avis officiel et mise en garde de BUYGOLD concernant les protocoles de vérification et les canaux de communication authentiques.",
      keywords: "avis juridique buygold, alerte fraude or, verification transaction or"
    }
  }
};

const UI_STRINGS = {
  nav: {
    home: { en: "Home", ar: "الرئيسية", zh: "首页", es: "Inicio", ru: "Главная", fr: "Accueil" },
    about: { en: "About Us", ar: "من نحن", zh: "关于我们", es: "Sobre Nosotros", ru: "О нас", fr: "À Propos" },
    mining: { en: "Mining", ar: "التعدين", zh: "黄金开采", es: "Minería", ru: "Добыча", fr: "Mines" },
    agri: { en: "Agri-Business", ar: "الزراعة", zh: "生态农业", es: "Agroindustria", ru: "Агробизнес", fr: "Agro-Industrie" },
    logistics: { en: "Supply and Logistics", ar: "سلاسل الإمداد واللوجستيات", zh: "物流与供应链", es: "Suministro y Logística", ru: "Логистика", fr: "Chaîne Logistique" },
    engineering: { en: "Engineering", ar: "الهندسة", zh: "工程建设", es: "Ingeniería", ru: "Инжиниринг", fr: "Ingénierie" },
    contact: { en: "Contact Us", ar: "اتصل بنا", zh: "联系我们", es: "Contacto", ru: "Контакты", fr: "Contactez-Nous" },
    disclaimer: { en: "Disclaimer", ar: "إخلاء المسؤولية", zh: "免责声明", es: "Aviso Legal", ru: "Отказ от ответственности", fr: "Mentions Légales" }
  },
  topbar: {
    location: { en: "Valley Close, Kiwatule Kampala", ar: "فالي كلوز، كيواتولي كمبالا", zh: "乌干达坎帕拉 Kiwatule Valley Close", es: "Valley Close, Kiwatule Kampala", ru: "Вэлли Клоуз, Киватуле Кампала", fr: "Valley Close, Kiwatule Kampala" },
    disclaimer: { en: "Disclaimer", ar: "إخلاء المسؤولية", zh: "免责声明", es: "Aviso Legal", ru: "Предостережение", fr: "Avis Juridique" }
  },
  buttons: {
    submitNow: { en: "Submit Now", ar: "إرسال الطلب الآن", zh: "立即提交", es: "Enviar Ahora", ru: "Отправить Сейчас", fr: "Envoyer Maintenant" },
    sending: { en: "Sending...", ar: "جاري الإرسال...", zh: "发送中...", es: "Enviando...", ru: "Отправка...", fr: "Envoi en cours..." },
    callUs: { en: "Call Us", ar: "اتصل بنا", zh: "电话咨询", es: "Llámenos", ru: "Позвоните нам", fr: "Appelez-nous" },
    learnMore: { en: "Learn More", ar: "اكتشف المزيد", zh: "了解更多", es: "Más Información", ru: "Подробнее", fr: "En Savoir Plus" },
    getInTouch: { en: "Get In Touch", ar: "تواصل معنا", zh: "与我们取得联系", es: "Contáctenos", ru: "Связаться с нами", fr: "Prendre Contact" },
    exploreOperations: { en: "Explore Our Operations", ar: "استكشف عملياتنا التعدينية", zh: "探索我们的矿业运营", es: "Explorar Operaciones", ru: "Наши Операции", fr: "Découvrir Nos Opérations" }
  },
  form: {
    name: { en: "Your Name", ar: "الاسم الكريم", zh: "您的姓名", es: "Su Nombre", ru: "Ваше Имя", fr: "Votre Nom" },
    email: { en: "Email Address", ar: "البريد الإلكتروني", zh: "电子邮箱地址", es: "Correo Electrónico", ru: "Электронная Почта", fr: "Adresse E-mail" },
    phone: { en: "Phone Number", ar: "رقم الهاتف", zh: "联系电话", es: "Teléfono", ru: "Номер Телефона", fr: "Numéro de Téléphone" },
    subject: { en: "Subject", ar: "الموضوع", zh: "咨询主题", es: "Asunto", ru: "Тема обращения", fr: "Objet" },
    message: { en: "Your Message...", ar: "تفاصيل رسالتك أو استفسارك...", zh: "您的留言或合作需求...", es: "Su Mensaje...", ru: "Ваше сообщение...", fr: "Votre Message..." },
    newsletterText: { en: "Stay updated with our latest offers and opportunities.", ar: "ابقَ على اطلاع بأحدث عروضنا وفرص الاستثمار التعديني.", zh: "订阅行业动态，获取最新投资与市场资讯。", es: "Manténgase informado con nuestras ofertas y oportunidades.", ru: "Будьте в курсе актуальных предложений и возможностей.", fr: "Restez informé de nos offres et opportunités d'investissement." },
    consultationHeading: { en: "Any Questions? Book a Consultation Today.", ar: "هل لديك أي استفسار؟ احجز استشارتك اليوم مع خبرائنا.", zh: "有任何疑问？立即预约专业投资咨询。", es: "¿Preguntas? Reserve una Consulta Hoy Mismo.", ru: "Есть вопросы? Запишитесь на консультацию сегодня.", fr: "Des questions ? Réservez une consultation aujourd'hui." }
  },
  footer: {
    contactInfo: { en: "Contact Info", ar: "معلومات الاتصال", zh: "联系方式", es: "Información de Contacto", ru: "Контакты", fr: "Coordonnées" },
    quickLinks: { en: "Quick Links", ar: "روابط سريعة", zh: "快速链接", es: "Enlaces Rápidos", ru: "Быстрые ссылки", fr: "Liens Rapides" },
    ourSectors: { en: "Our Sectors", ar: "قطاعات أعمالنا", zh: "业务领域", es: "Nuestros Sectores", ru: "Направления бизнеса", fr: "Nos Secteurs" },
    newsletter: { en: "Newsletter", ar: "النشرة الإخبارية", zh: "新闻快报", es: "Boletín Informativo", ru: "Рассылка", fr: "Bulletin d'information" },
    copyright: {
      en: "Copyright 2026 BUYGOLD - All Rights Reserved. Hosted on www.buygold.blog",
      ar: "حقوق الطبع والنشر 2026 باي جولد - جميع الحقوق محفوظة. مستضاف على www.buygold.blog",
      zh: "版权所有 2026 BUYGOLD - 保留所有权利。由 www.buygold.blog 提供托管",
      es: "Copyright 2026 BUYGOLD - Todos los Derechos Reservados. Alojado en www.buygold.blog",
      ru: "Авторские права 2026 BUYGOLD - Все права защищены. Размещено на www.buygold.blog",
      fr: "Tous droits réservés 2026 BUYGOLD. Hébergé sur www.buygold.blog"
    }
  }
};

module.exports = {
  LANGUAGES,
  PAGES_META,
  UI_STRINGS
};

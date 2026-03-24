export type Lang = "fr" | "ar";

export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      services: "Services",
      projects: "Projets",
      contact: "Contact",
      cta: "Demander un devis",
    },
    hero: {
      tagline: "Entreprise multi-services — Région Sud",
      h1a: "Bâtisseurs",
      h1b: "d'avenir,",
      h1c: "experts du terrain",
      sub: "Travaux électriques, construction, aménagement, énergies solaires et plomberie — des solutions fiables pour chaque projet.",
      btn1: "Nos services",
      btn2: "Demander un devis",
      scroll: "Défiler",
    },
    ticker: [
      "Travaux Électriques",
      "Construction & Aménagement",
      "Panneaux Solaires",
      "Plomberie",
      "Travaux Divers",
    ],
    stats: [
      { value: "10+", label: "Années d'expérience" },
      { value: "500+", label: "Projets réalisés" },
      { value: "5", label: "Domaines d'expertise" },
      { value: "98%", label: "Clients satisfaits" },
    ],
    services: {
      badge: "Nos services",
      title: "Ce que nous réalisons",
      sub: "De l'installation électrique à la construction complète, nous couvrons tous vos besoins.",
      items: [
        {
          num: "01",
          title: "Travaux Électriques",
          desc: "Installation, mise aux normes et rénovation de réseaux électriques résidentiels et industriels. Tableau, câblage, domotique.",
          link: "Découvrir",
        },
        {
          num: "02",
          title: "Construction & Aménagement",
          desc: "Gros œuvre, second œuvre, aménagement intérieur et extérieur. Nous accompagnons votre projet de A à Z.",
          link: "Découvrir",
        },
        {
          num: "03",
          title: "Panneaux Solaires",
          desc: "Conception, fourniture et installation de systèmes photovoltaïques pour particuliers et professionnels. Économisez sur vos factures.",
          link: "Découvrir",
        },
        {
          num: "04",
          title: "Plomberie",
          desc: "Installation et réparation de réseaux sanitaires, robinetterie, chauffage et systèmes d'évacuation.",
          link: "Découvrir",
        },
        {
          num: "05",
          title: "Travaux Divers",
          desc: "Peinture, revêtement, carrelage, menuiserie et toute intervention de rénovation ou d'entretien.",
          link: "Découvrir",
        },
      ],
    },
    about: {
      badge: "À propos de CAS",
      title: "Une équipe engagée, des résultats durables",
      p1: "Courant Amousy Sud (CAS) est une entreprise générale de travaux basée dans le sud, spécialisée dans l'électricité, la construction, l'aménagement, l'énergie solaire et la plomberie.",
      p2: "Fondée sur des valeurs de rigueur, de fiabilité et d'innovation, notre équipe intervient aussi bien pour les particuliers que pour les professionnels, avec le même niveau d'exigence sur chaque chantier.",
      vals: [
        { num: "01", title: "Fiabilité", desc: "Installations conformes aux normes, garanties et durables." },
        { num: "02", title: "Expertise", desc: "Des techniciens certifiés dans chaque domaine d'intervention." },
        { num: "03", title: "Innovation", desc: "Solutions modernes : domotique, énergie solaire, efficacité énergétique." },
        { num: "04", title: "Réactivité", desc: "Intervention rapide, respect des délais, disponibilité 24h/24 pour urgences." },
      ],
    },
    projects: {
      badge: "Réalisations",
      title: "Nos projets récents",
      sub: "Quelques-unes de nos interventions marquantes.",
      items: [
        {
          tag: "Électricité",
          title: "Complexe résidentiel — 24 appartements",
          desc: "Câblage complet, tableaux divisionnaires, mise aux normes NF C 15-100.",
          meta: "Région Sud · 2024",
        },
        {
          tag: "Panneaux Solaires",
          title: "Ferme solaire — Installation 80 kWc",
          desc: "Conception et installation d'un système photovoltaïque industriel avec onduleurs triphasés.",
          meta: "Zone industrielle · 2024",
        },
        {
          tag: "Construction",
          title: "Villa moderne — Gros & second œuvre",
          desc: "Construction complète : fondations, structure béton, revêtements, aménagements extérieurs.",
          meta: "Région Sud · 2023",
        },
        {
          tag: "Plomberie",
          title: "Hôtel 4 étoiles — Réseau sanitaire",
          desc: "Installation complète du réseau eau chaude/froide, sanitaires et évacuations sur 5 niveaux.",
          meta: "Centre-ville · 2023",
        },
      ],
      viewAll: "Voir tous les projets",
    },
    cta: {
      label: "Prêt à démarrer ?",
      title: "Votre projet mérite le meilleur.",
      sub: "Contactez-nous pour un devis gratuit et sans engagement. Notre équipe vous répond sous 24h.",
      btn: "Demander un devis",
      infos: [
        { label: "Réponse sous 24h" },
        { label: "Devis gratuit" },
        { label: "Disponible 24h/24" },
      ],
    },
    footer: {
      desc: "Entreprise générale de travaux — électricité, construction, panneaux solaires, plomberie et aménagement.",
      nav: "Navigation",
      svcTitle: "Services",
      contactTitle: "Contact",
      addr: "Région Sud, France",
      phone: "+33 (0)X XX XX XX XX",
      email: "contact@courant-amousy-sud.fr",
      hours: "Urgences 24h/24",
      legal: "Mentions légales",
      privacy: "Confidentialité",
      rights: "Tous droits réservés.",
    },
    comingSoon: {
      badge: "En cours de développement",
      back: "Retour à l'accueil",
    },
    pages: {
      about: "À propos de nous",
      aboutSub: "Notre histoire, nos valeurs et notre équipe — bientôt disponibles.",
      services: "Nos Services",
      servicesSub: "Le détail complet de nos prestations — bientôt disponibles.",
      projects: "Nos Projets",
      projectsSub: "Notre portfolio de réalisations — bientôt disponibles.",
      contact: "Contactez-nous",
      contactSub: "Notre formulaire de contact arrive bientôt. Appelez-nous directement.",
    },
  },

  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "خدماتنا",
      projects: "مشاريعنا",
      contact: "اتصل بنا",
      cta: "طلب عرض سعر",
    },
    hero: {
      tagline: "شركة متعددة الخدمات — الجنوب",
      h1a: "بناة",
      h1b: "المستقبل،",
      h1c: "خبراء الميدان",
      sub: "أعمال كهربائية، بناء، تهيئة، طاقة شمسية وسباكة — حلول موثوقة لكل مشروع.",
      btn1: "خدماتنا",
      btn2: "طلب عرض سعر",
      scroll: "تمرير",
    },
    ticker: [
      "الأعمال الكهربائية",
      "البناء والتهيئة",
      "الألواح الشمسية",
      "السباكة",
      "أعمال متنوعة",
    ],
    stats: [
      { value: "+10", label: "سنوات من الخبرة" },
      { value: "+500", label: "مشروع منجز" },
      { value: "5", label: "مجالات الخبرة" },
      { value: "98%", label: "عملاء راضون" },
    ],
    services: {
      badge: "خدماتنا",
      title: "ما نقوم بإنجازه",
      sub: "من التركيبات الكهربائية إلى البناء الكامل، نغطي جميع احتياجاتكم.",
      items: [
        {
          num: "01",
          title: "الأعمال الكهربائية",
          desc: "تركيب وتجديد وتطبيق معايير الشبكات الكهربائية السكنية والصناعية. لوحات، توصيلات، منزل ذكي.",
          link: "اكتشف",
        },
        {
          num: "02",
          title: "البناء والتهيئة",
          desc: "أعمال الهيكل الخارجي والداخلي، التهيئة الداخلية والخارجية. نرافق مشروعكم من البداية إلى النهاية.",
          link: "اكتشف",
        },
        {
          num: "03",
          title: "الألواح الشمسية",
          desc: "تصميم وتوريد وتركيب الأنظمة الكهروضوئية للأفراد والمحترفين. وفّروا على فواتيركم.",
          link: "اكتشف",
        },
        {
          num: "04",
          title: "السباكة",
          desc: "تركيب وإصلاح شبكات الصرف الصحي، الحنفيات، التدفئة وأنظمة الصرف.",
          link: "اكتشف",
        },
        {
          num: "05",
          title: "أعمال متنوعة",
          desc: "طلاء، تغليف، بلاط، نجارة وكل أعمال التجديد والصيانة.",
          link: "اكتشف",
        },
      ],
    },
    about: {
      badge: "من نحن — CAS",
      title: "فريق ملتزم، نتائج دائمة",
      p1: "كوران أموزي سود (CAS) شركة عامة للأعمال مقرها الجنوب، متخصصة في الكهرباء والبناء والتهيئة والطاقة الشمسية والسباكة.",
      p2: "مبنية على قيم الصرامة والموثوقية والابتكار، يتدخل فريقنا لدى الأفراد والمحترفين بنفس مستوى الجودة في كل ورش.",
      vals: [
        { num: "01", title: "الموثوقية", desc: "تركيبات متوافقة مع المعايير، مضمونة ودائمة." },
        { num: "02", title: "الخبرة", desc: "تقنيون معتمدون في كل مجال تدخل." },
        { num: "03", title: "الابتكار", desc: "حلول حديثة: منزل ذكي، طاقة شمسية، كفاءة طاقوية." },
        { num: "04", title: "الاستجابة", desc: "تدخل سريع، احترام المواعيد، متوفر 24 ساعة للطوارئ." },
      ],
    },
    projects: {
      badge: "الإنجازات",
      title: "مشاريعنا الأخيرة",
      sub: "بعض من أبرز تدخلاتنا الميدانية.",
      items: [
        {
          tag: "كهرباء",
          title: "مجمع سكني — 24 شقة",
          desc: "توصيل كامل، لوحات فرعية، تطبيق معيار NF C 15-100.",
          meta: "الجنوب · 2024",
        },
        {
          tag: "ألواح شمسية",
          title: "مزرعة شمسية — 80 كيلوواط",
          desc: "تصميم وتركيب نظام كهروضوئي صناعي مع عاكسات ثلاثية الطور.",
          meta: "المنطقة الصناعية · 2024",
        },
        {
          tag: "بناء",
          title: "فيلا عصرية — هيكل وتشطيب",
          desc: "بناء كامل: أساسات، هيكل خرساني، تشطيبات، تهيئة خارجية.",
          meta: "الجنوب · 2023",
        },
        {
          tag: "سباكة",
          title: "فندق 4 نجوم — شبكة صحية",
          desc: "تركيب كامل لشبكة الماء الساخن/البارد، الصرف الصحي على 5 طوابق.",
          meta: "وسط المدينة · 2023",
        },
      ],
      viewAll: "عرض جميع المشاريع",
    },
    cta: {
      label: "مستعد للانطلاق؟",
      title: "مشروعكم يستحق الأفضل.",
      sub: "تواصلوا معنا للحصول على عرض سعر مجاني وبدون التزام. فريقنا يردّ خلال 24 ساعة.",
      btn: "طلب عرض سعر",
      infos: [
        { label: "رد خلال 24 ساعة" },
        { label: "عرض سعر مجاني" },
        { label: "متوفر 24/7" },
      ],
    },
    footer: {
      desc: "شركة عامة للأعمال — كهرباء، بناء، ألواح شمسية، سباكة وتهيئة.",
      nav: "التنقل",
      svcTitle: "الخدمات",
      contactTitle: "التواصل",
      addr: "جنوب فرنسا",
      phone: "+33 (0)X XX XX XX XX",
      email: "contact@courant-amousy-sud.fr",
      hours: "طوارئ 24/7",
      legal: "الشروط القانونية",
      privacy: "الخصوصية",
      rights: "جميع الحقوق محفوظة.",
    },
    comingSoon: {
      badge: "قيد الإنشاء",
      back: "العودة إلى الرئيسية",
    },
    pages: {
      about: "من نحن",
      aboutSub: "تاريخنا وقيمنا وفريقنا — قريباً.",
      services: "خدماتنا",
      servicesSub: "تفاصيل كاملة لخدماتنا — قريباً.",
      projects: "مشاريعنا",
      projectsSub: "معرض إنجازاتنا — قريباً.",
      contact: "تواصل معنا",
      contactSub: "نموذج الاتصال قادم قريباً. اتصل بنا مباشرة.",
    },
  },
} as const;

export type Translations = {
  nav: { home: string; about: string; services: string; projects: string; contact: string; cta: string };
  hero: { tagline: string; h1a: string; h1b: string; h1c: string; sub: string; btn1: string; btn2: string; scroll: string };
  ticker: readonly string[];
  stats: readonly { value: string; label: string }[];
  services: {
    badge: string; title: string; sub: string;
    items: readonly { num: string; title: string; desc: string; link: string }[];
  };
  about: {
    badge: string; title: string; p1: string; p2: string;
    vals: readonly { num: string; title: string; desc: string }[];
  };
  projects: {
    badge: string; title: string; sub: string; viewAll: string;
    items: readonly { tag: string; title: string; desc: string; meta: string }[];
  };
  cta: { label: string; title: string; sub: string; btn: string; infos: readonly { label: string }[] };
  footer: { desc: string; nav: string; svcTitle: string; contactTitle: string; addr: string; phone: string; email: string; hours: string; legal: string; privacy: string; rights: string };
  comingSoon: { badge: string; back: string };
  pages: { about: string; aboutSub: string; services: string; servicesSub: string; projects: string; projectsSub: string; contact: string; contactSub: string };
};

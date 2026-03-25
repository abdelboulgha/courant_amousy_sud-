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
      tagline: "CAS · Courant Amousy Sud · Région Sud",
      h1a: "Bâtisseurs",
      h1b: "d'excellence.",
      h1c: "",
      sub: "De l'installation électrique à la sécurité connectée — 7 expertises, une seule entreprise.",
      btn1: "Nos services",
      btn2: "Devis gratuit",
      scroll: "Défiler",
    },
    ticker: [
      "Travaux Électriques",
      "Plomberie",
      "Climatisation",
      "Vidéosurveillance",
      "Système d'alarme",
      "Peinture & Décoration",
      "Plâtre & Zellige",
      "Travaux Divers",
    ],
    stats: [
      { value: "10+", label: "Années d'expérience" },
      { value: "500+", label: "Projets réalisés" },
      { value: "7", label: "Domaines d'expertise" },
      { value: "98%", label: "Clients satisfaits" },
    ],
    services: {
      badge: "Nos services",
      title: "Ce que nous réalisons",
      sub: "De l'installation électrique à la construction complète, nous couvrons tous vos besoins.",
      items: [
        {
          num: "01",
          title: "Électricité",
          desc: "Installation, maintenance et dépannage électrique pour tous types de projets résidentiels et industriels.",
          link: "Découvrir",
        },
        {
          num: "02",
          title: "Plomberie",
          desc: "Installation et réparation de systèmes de plomberie avec efficacité et dans les délais.",
          link: "Découvrir",
        },
        {
          num: "03",
          title: "Climatisation",
          desc: "Installation et maintenance de systèmes de climatisation modernes pour le confort de vos espaces.",
          link: "Découvrir",
        },
        {
          num: "04",
          title: "Vidéosurveillance",
          desc: "Installation de caméras et systèmes de surveillance IP pour sécuriser vos locaux professionnels et résidentiels.",
          link: "Découvrir",
        },
        {
          num: "05",
          title: "Système d'alarme",
          desc: "Solutions d'alarme intrusion fiables et connectées pour assurer votre sécurité en toute sérénité.",
          link: "Découvrir",
        },
        {
          num: "06",
          title: "Peinture & Décoration",
          desc: "Travaux de finition intérieure : peinture, enduit et décoration pour sublimer vos espaces.",
          link: "Découvrir",
        },
        {
          num: "07",
          title: "Plâtre & Zellige",
          desc: "Expertise en artisanat et finition : pose de plâtre moderne, traditionnel et zellige authentique.",
          link: "Découvrir",
        },
        {
          num: "08",
          title: "Travaux Divers",
          desc: "Accompagnement complet pour vos projets de construction, aménagement et rénovation tous corps d'état.",
          link: "Découvrir",
        },
      ],
    },
    about: {
      badge: "À propos de CAS",
      title: "Une équipe engagée, des résultats durables",
      p1: "Courant Amousy Sud (CAS) est une entreprise générale de travaux basée dans le sud, spécialisée dans l'électricité, la plomberie, la climatisation, la vidéosurveillance, les systèmes d'alarme et les travaux de finition.",
      p2: "Fondée sur des valeurs de rigueur, de fiabilité et d'innovation, notre équipe intervient aussi bien pour les particuliers que pour les professionnels, avec le même niveau d'exigence sur chaque chantier.",
      vals: [
        { num: "01", title: "Fiabilité", desc: "Installations conformes aux normes, garanties et durables." },
        { num: "02", title: "Expertise", desc: "Des techniciens certifiés dans chaque domaine d'intervention." },
        { num: "03", title: "Innovation", desc: "Solutions modernes : domotique, sécurité connectée, efficacité énergétique." },
        { num: "04", title: "Réactivité", desc: "Intervention rapide, respect des délais, disponibilité 24h/24 pour urgences." },
      ],
    },
    advantages: {
      badge: "Nos avantages",
      title: "Pourquoi nous choisir ?",
      sub: "Une approche globale orientée vers la performance, la sécurité et la satisfaction de nos clients.",
      items: [
        { title: "Techniciens Qualifiés", desc: "Nos équipes possèdent les certifications requises pour des interventions aux normes." },
        { title: "Équipements Haut de Gamme", desc: "Nous utilisons du matériel dernière génération pour garantir longévité et efficacité." },
        { title: "Intervention Rapide", desc: "Disponibilité pour les urgences et respect absolu de nos plannings de livraison." },
        { title: "Solutions Sur-Mesure", desc: "De l'étude de faisabilité à l'exécution, chaque projet est pensé pour répondre à vos besoins." },
      ],
    },
    testimonials: {
      badge: "Témoignages",
      title: "Ce que disent nos clients",
      sub: "La satisfaction de nos partenaires et clients est notre meilleure carte de visite.",
      items: [
        { text: "Une équipe réactive et très professionnelle. L'installation de notre système de climatisation s'est faite sans le moindre retard. Excellent suivi.", author: "Karim M.", role: "Gérant d'Hôtel" },
        { text: "Nous avons fait appel à CAS pour la rénovation électrique complète de notre usine. Travail propre, sécurisé et strictement aux normes.", author: "Youssef E.", role: "Directeur Industriel" },
        { text: "Des finitions en plâtre et peinture impeccables. L'artisanat et la précision dont ils ont fait preuve dans notre villa sont tout simplement remarquables.", author: "Fatima Z.", role: "Particulier" },
      ]
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
          tag: "Climatisation",
          title: "Hôtel 4 étoiles — 120 splits installés",
          desc: "Étude thermique, fourniture et pose de systèmes multi-splits et VRV sur 6 niveaux.",
          meta: "Centre-ville · 2024",
        },
        {
          tag: "Construction",
          title: "Villa moderne — Gros & second œuvre",
          desc: "Construction complète : fondations, structure béton, revêtements, aménagements extérieurs.",
          meta: "Région Sud · 2023",
        },
        {
          tag: "Vidéosurveillance",
          title: "Site industriel — Sécurité complète",
          desc: "Installation de 48 caméras IP HD, NVR, contrôle d'accès et interphonie sécurisée.",
          meta: "Zone industrielle · 2023",
        },
        {
          tag: "Peinture & Plâtre",
          title: "Résidence premium — Finitions intérieures",
          desc: "Plâtrage, enduit de finition, peinture décorative et faux-plafonds sur 1 200 m².",
          meta: "Région Sud · 2024",
        },
      ],
      viewAll: "Voir tous les projets",
    },
    cta: {
      label: "Prêt à démarrer ?",
      title: "Confiez-nous vos projets en toute confiance.",
      sub: "Contactez-nous pour un devis gratuit et sans engagement. Notre équipe vous répond sous 24h.",
      btn: "Demander un devis",
      infos: [
        { label: "Réponse sous 24h" },
        { label: "Devis gratuit" },
        { label: "Disponible 24h/24" },
      ],
    },
    footer: {
      desc: "Entreprise générale de travaux — électricité, plomberie, climatisation, vidéosurveillance, alarme et travaux divers.",
      nav: "Navigation",
      svcTitle: "Services",
      contactTitle: "Contact",
      addr: "Région Sud, Maroc",
      phone: "+212 6 02 46 72 22",
      email: "contact@courant-amousy-sud.ma",
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
      tagline: "CAS · كوران أموزي سود · الجنوب",
      h1a: "بنّاؤون",
      h1b: "بامتياز.",
      h1c: "",
      sub: "من الكهرباء إلى الأمن المتصل — 7 خبرات، شركة واحدة موثوقة.",
      btn1: "خدماتنا",
      btn2: "عرض مجاني",
      scroll: "تمرير",
    },
    ticker: [
      "الأعمال الكهربائية",
      "السباكة",
      "تكييف الهواء",
      "المراقبة بالكاميرات",
      "نظام الإنذار",
      "الطلاء والديكور",
      "الجبص والزليج",
      "أعمال متنوعة",
    ],
    stats: [
      { value: "+10", label: "سنوات من الخبرة" },
      { value: "+500", label: "مشروع منجز" },
      { value: "7", label: "مجالات الخبرة" },
      { value: "98%", label: "عملاء راضون" },
    ],
    services: {
      badge: "خدماتنا",
      title: "ما نقوم بإنجازه",
      sub: "من التركيبات الكهربائية إلى البناء الكامل، نغطي جميع احتياجاتكم.",
      items: [
        {
          num: "01",
          title: "الكهرباء",
          desc: "تركيب وصيانة وإصلاح الأنظمة الكهربائية لجميع أنواع المشاريع السكنية والصناعية.",
          link: "اكتشف",
        },
        {
          num: "02",
          title: "السباكة",
          desc: "تركيب وإصلاح أنظمة السباكة بكفاءة وفي الوقت المحدد.",
          link: "اكتشف",
        },
        {
          num: "03",
          title: "تكييف الهواء",
          desc: "تركيب وصيانة أنظمة التكييف العصرية لراحة فضاءاتكم.",
          link: "اكتشف",
        },
        {
          num: "04",
          title: "المراقبة بالكاميرات",
          desc: "تركيب كاميرات وأنظمة مراقبة IP لتأمين محلاتكم المهنية والسكنية.",
          link: "اكتشف",
        },
        {
          num: "05",
          title: "نظام الإنذار",
          desc: "حلول إنذار موثوقة ومتصلة لضمان سلامتكم في كل الأوقات.",
          link: "اكتشف",
        },
        {
          num: "06",
          title: "الطلاء والديكور",
          desc: "أعمال التشطيب الداخلي: طلاء، حجر وديكور لتجميل فضاءاتكم.",
          link: "اكتشف",
        },
        {
          num: "07",
          title: "الجبص والزليج",
          desc: "خبرة في الحرف اليدوية والتشطيبات: تركيب الجبص العصري والتقليدي والزليج الأصيل.",
          link: "اكتشف",
        },
        {
          num: "08",
          title: "أعمال متنوعة",
          desc: "مرافقة كاملة لمشاريع البناء والتهيئة والترميم بجميع أوجهها.",
          link: "اكتشف",
        },
      ],
    },
    about: {
      badge: "من نحن — CAS",
      title: "فريق ملتزم، نتائج دائمة",
      p1: "كوران أموزي سود (CAS) شركة عامة للأعمال مقرها الجنوب، متخصصة في الكهرباء والسباكة وتكييف الهواء والمراقبة بالكاميرات وأنظمة الإنذار وأعمال التشطيب.",
      p2: "مبنية على قيم الصرامة والموثوقية والابتكار، يتدخل فريقنا لدى الأفراد والمحترفين بنفس مستوى الجودة في كل ورشة.",
      vals: [
        { num: "01", title: "الموثوقية", desc: "تركيبات متوافقة مع المعايير، مضمونة ودائمة." },
        { num: "02", title: "الخبرة", desc: "تقنيون معتمدون في كل مجال تدخل." },
        { num: "03", title: "الابتكار", desc: "حلول حديثة: منزل ذكي، أمن متصل، كفاءة طاقوية." },
        { num: "04", title: "الاستجابة", desc: "تدخل سريع، احترام المواعيد، متوفر 24 ساعة للطوارئ." },
      ],
    },
    advantages: {
      badge: "مميزاتنا",
      title: "لماذا تختاروننا؟",
      sub: "نهج يركز على الأداء والسلامة ورضا عملائنا الكامل.",
      items: [
        { title: "فنيون مؤهلون", desc: "فرقنا حاصلة على الشهادات اللازمة لتدخلات آمنة ومطابقة للمعايير." },
        { title: "معدات متطورة", desc: "نستخدم أحدث المعدات لضمان المتانة وكفاءة استهلاك الطاقة." },
        { title: "تدخل سريع", desc: "متوفرون للطوارئ. نحرص على احترام مواعيد التسليم دون تأخير." },
        { title: "حلول مخصصة", desc: "من دراسة الجدوى إلى التنفيذ، يتم تصميم كل مشروع خصيصاً لتلبية احتياجاتكم." },
      ],
    },
    testimonials: {
      badge: "آراء العملاء",
      title: "ماذا يقول عملاؤنا؟",
      sub: "رضا شركائنا وعملائنا هو أفضل بطاقة تعريف لنا.",
      items: [
        { text: "فريق متجاوب ومحترف للغاية. تمت عملية تركيب نظام التكييف دون أي تأخير. متابعة ممتازة للعملاء.", author: "كريم م.", role: "مدير فندق" },
        { text: "لجأنا إلى CAS للتجديد الكهربائي الكامل في مصنعنا. عمل نظيف، آمن ومطابق للمعايير الصارمة.", author: "يوسف إ.", role: "مدير صناعي" },
        { text: "تشطيبات الجبص والطلاء لا تشوبها شائبة. الحرفية والدقة التي أظهروها في فيلتنا كانت رائعة بصراحة.", author: "فاطمة ز.", role: "عميل خاص" },
      ]
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
          tag: "تكييف الهواء",
          title: "فندق 4 نجوم — 120 وحدة تكييف",
          desc: "دراسة حرارية، توريد وتركيب أنظمة multi-splits وVRV على 6 طوابق.",
          meta: "وسط المدينة · 2024",
        },
        {
          tag: "بناء",
          title: "فيلا عصرية — هيكل وتشطيب",
          desc: "بناء كامل: أساسات، هيكل خرساني، تشطيبات، تهيئة خارجية.",
          meta: "الجنوب · 2023",
        },
        {
          tag: "مراقبة بالكاميرات",
          title: "موقع صناعي — أمن كامل",
          desc: "تركيب 48 كاميرا IP HD، NVR، تحكم في الوصول وإنترفون آمن.",
          meta: "المنطقة الصناعية · 2023",
        },
        {
          tag: "طلاء وجبس",
          title: "إقامة فاخرة — تشطيبات داخلية",
          desc: "جبس، طبقة إنهاء، دهان ديكوري وأسقف معلقة على 1200 م².",
          meta: "الجنوب · 2024",
        },
      ],
      viewAll: "عرض جميع المشاريع",
    },
    cta: {
      label: "مستعد للانطلاق؟",
      title: "أوكلوا لنا مشاريعكم بثقة.",
      sub: "تواصلوا معنا للحصول على عرض سعر مجاني وبدون التزام. فريقنا يردّ خلال 24 ساعة.",
      btn: "طلب عرض سعر",
      infos: [
        { label: "رد خلال 24 ساعة" },
        { label: "عرض سعر مجاني" },
        { label: "متوفر 24/7" },
      ],
    },
    footer: {
      desc: "شركة عامة للأعمال — كهرباء، سباكة، تكييف، مراقبة، إنذار وأعمال متنوعة.",
      nav: "التنقل",
      svcTitle: "الخدمات",
      contactTitle: "التواصل",
      addr: "الجنوب، المغرب",
      phone: "+212 6 02 46 72 22",
      email: "contact@courant-amousy-sud.ma",
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
  advantages: {
    badge: string; title: string; sub: string;
    items: readonly { title: string; desc: string }[];
  };
  testimonials: {
    badge: string; title: string; sub: string;
    items: readonly { text: string; author: string; role: string }[];
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

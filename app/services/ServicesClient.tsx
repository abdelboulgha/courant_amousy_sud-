"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import ServicesGrid from "@/components/Services";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ─── Static rich data per service ─────────────────────────
   Indexed to match t.services.items order (0–7)
─────────────────────────────────────────────────────────── */
const RICH = [
  /* 01 — Électricité */
  {
    accent: "#5319c6",
    image: "/assets/images/services/electrical.png",
    features: {
      fr: [
        "Tableau électrique & disjoncteurs",
        "Câblage résidentiel et industriel",
        "Mise aux normes NF C 15-100",
        "Domotique & éclairage LED intelligent",
        "Maintenance préventive & corrective",
        "Dépannage d'urgence 24h/24 · 7j/7",
      ],
      ar: [
        "لوحة كهربائية وقواطع",
        "توصيلات سكنية وصناعية",
        "تطبيق معيار NF C 15-100",
        "منزل ذكي وإضاءة LED",
        "صيانة وقائية وتصحيحية",
        "تدخل طارئ 24/7",
      ],
    },
    tags: { fr: ["Résidentiel", "Industriel", "NF C 15-100", "Domotique"], ar: ["سكني", "صناعي", "طوارئ"] },
    highlights: {
      fr: [{ val: "200+", lbl: "Installations" }, { val: "24h", lbl: "Urgences" }, { val: "100%", lbl: "Aux normes" }],
      ar: [{ val: "+200", lbl: "تركيب" }, { val: "24h", lbl: "طوارئ" }, { val: "100%", lbl: "مطابق للمعايير" }],
    },
  },
  /* 02 — Plomberie */
  {
    accent: "#00a8ff",
    image: "/assets/images/services/plumbing.png",
    features: {
      fr: [
        "Installation de réseaux sanitaires complets",
        "Chauffe-eau, ballon thermodynamique & solaire",
        "Détection et réparation de fuites",
        "Robinetterie, sanitaires & douches",
        "Réseaux d'évacuation & siphons",
        "Chauffage central & plancher chauffant",
      ],
      ar: [
        "تركيب شبكات صحية كاملة",
        "سخانات مائية واجهزة شمسية",
        "كشف وإصلاح التسربات",
        "صنابير ومرافق صحية",
        "شبكات الصرف والتصريف",
        "تدفئة مركزية وأرضية",
      ],
    },
    tags: { fr: ["Sanitaires", "Chauffage", "Fuites", "Rénovation"], ar: ["صحي", "تدفئة", "إصلاح"] },
    highlights: {
      fr: [{ val: "48h", lbl: "Intervention" }, { val: "2 ans", lbl: "Garantie" }, { val: "Gratuit", lbl: "Devis" }],
      ar: [{ val: "48h", lbl: "تدخل" }, { val: "سنتين", lbl: "ضمان" }, { val: "مجاني", lbl: "تقييم" }],
    },
  },
  /* 03 — Climatisation */
  {
    accent: "#00e5ff",
    image: "/assets/images/services/ac.png",
    features: {
      fr: [
        "Climatiseurs split & multi-split toutes marques",
        "Systèmes VRF/VRV pour grands espaces",
        "Maintenance et entretien saisonniers",
        "Pompe à chaleur air/air & air/eau",
        "Ventilation mécanique contrôlée (VMC)",
        "Climatisation centralisée & gainable",
      ],
      ar: [
        "مكيفات سبليت ومتعددة الوحدات",
        "أنظمة VRF/VRV للمساحات الكبيرة",
        "صيانة موسمية وتنظيف دوري",
        "مضخات حرارة هواء/هواء وهواء/ماء",
        "تهوية ميكانيكية محكومة",
        "تكييف مركزي وقنوي",
      ],
    },
    tags: { fr: ["Split", "Multi-split", "VRV", "Pompe à chaleur"], ar: ["سبليت", "VRV", "مضخة حرارة"] },
    highlights: {
      fr: [{ val: "Toutes", lbl: "Marques" }, { val: "5 ans", lbl: "Garantie" }, { val: "A+++", lbl: "Énergie" }],
      ar: [{ val: "جميع", lbl: "الماركات" }, { val: "5 سنوات", lbl: "ضمان" }, { val: "A+++", lbl: "طاقة" }],
    },
  },
  /* 04 — Vidéosurveillance */
  {
    accent: "#ff2c34",
    image: "/assets/images/services/surveillance.png",
    features: {
      fr: [
        "Caméras IP HD et 4K intérieures/extérieures",
        "Enregistreurs NVR/DVR & stockage cloud",
        "Accès et supervision à distance via mobile",
        "Analyse vidéo intelligente & détection d'intrusion",
        "Vision nocturne infrarouge longue portée",
        "Installation, configuration et formation incluses",
      ],
      ar: [
        "كاميرات IP بدقة HD و4K داخلية وخارجية",
        "مسجلات NVR/DVR وتخزين سحابي",
        "مراقبة عن بُعد عبر الهاتف",
        "تحليل ذكي وكشف التسلل",
        "رؤية ليلية بالأشعة تحت الحمراء",
        "تركيب وضبط وتدريب شامل",
      ],
    },
    tags: { fr: ["IP / Analogique", "4K", "Infrarouge", "Cloud"], ar: ["IP", "4K", "أشعة تحت حمراء"] },
    highlights: {
      fr: [{ val: "4K", lbl: "Résolution" }, { val: "48", lbl: "Cam max/projet" }, { val: "30m", lbl: "Vision nocturne" }],
      ar: [{ val: "4K", lbl: "دقة" }, { val: "48", lbl: "كاميرا/مشروع" }, { val: "30م", lbl: "رؤية ليلية" }],
    },
  },
  /* 05 — Système d'alarme */
  {
    accent: "#ff2c34",
    image: "/assets/images/services/alarm.png",
    features: {
      fr: [
        "Alarme anti-intrusion filaire & sans fil",
        "Détecteurs de mouvement, ouverture & bris de vitre",
        "Contrôle d'accès badge, code et biométrie",
        "Interphonie vidéo & visiophone",
        "Sirènes intérieures/extérieures & flash",
        "Télésurveillance et monitoring 24h/24",
      ],
      ar: [
        "إنذار مضاد للاقتحام سلكي ولاسلكي",
        "كاشفات حركة وفتح وكسر الزجاج",
        "تحكم في الوصول ببطاقة ورمز وبيومتري",
        "إنترفون مرئي وشاشة مدخل",
        "صفارات داخلية وخارجية وضوء وميضي",
        "مراقبة عن بُعد على مدار الساعة",
      ],
    },
    tags: { fr: ["Anti-intrusion", "Contrôle d'accès", "GSM", "Biométrie"], ar: ["اقتحام", "تحكم وصول", "GSM"] },
    highlights: {
      fr: [{ val: "Sans fil", lbl: "Installation" }, { val: "App", lbl: "Mobile" }, { val: "24/7", lbl: "Monitoring" }],
      ar: [{ val: "لاسلكي", lbl: "تركيب" }, { val: "تطبيق", lbl: "موبايل" }, { val: "24/7", lbl: "مراقبة" }],
    },
  },
  /* 06 — Peinture & Décoration */
  {
    accent: "#ff007f",
    image: "/assets/images/services/finishing.png",
    features: {
      fr: [
        "Peinture intérieure & extérieure (toutes surfaces)",
        "Enduit de lissage & préparation des supports",
        "Peintures décoratives : texturée, métallisée, satiné",
        "Revêtements muraux & papiers peints",
        "Faux-plafonds décoratifs en placo ou bois",
        "Traitement anti-humidité & anti-moisissures",
      ],
      ar: [
        "طلاء داخلي وخارجي لجميع الأسطح",
        "طبقة تمهيدية وإعداد الحوامل",
        "طلاء ديكوري: نسيج، معدني، ساتان",
        "تغليف جداري وورق الحائط",
        "أسقف معلقة زخرفية من الجبص أو الخشب",
        "معالجة الرطوبة والعفن",
      ],
    },
    tags: { fr: ["Intérieur", "Extérieur", "Décoratif", "Anti-humidité"], ar: ["داخل", "خارج", "ديكور"] },
    highlights: {
      fr: [{ val: "1200m²", lbl: "Récents" }, { val: "Premium", lbl: "Produits" }, { val: "∞", lbl: "Teintes" }],
      ar: [{ val: "1200م²", lbl: "منجز" }, { val: "ممتاز", lbl: "منتجات" }, { val: "∞", lbl: "ألوان" }],
    },
  },
  /* 07 — Plâtre & Zellige */
  {
    accent: "#8c52ff",
    image: "/assets/images/services/zellige.png",
    features: {
      fr: [
        "Plâtre traditionnel marocain & moderne",
        "Corniches, moulures et encadrements décoratifs",
        "Zellige artisanal authentique toutes couleurs",
        "Tadelakt & béton ciré sur mesure",
        "Stuc vénitien & badigeon à la chaux",
        "Restauration et rénovation d'œuvres artisanales",
      ],
      ar: [
        "جبص تقليدي مغربي وعصري",
        "كرانيش وزخارف وإطارات ديكورية",
        "زليج حرفي أصيل بجميع الألوان",
        "تادلاكت وخرسانة مصقولة مخصصة",
        "ستاكو فينيسي وجير مطلي",
        "ترميم وتجديد الأعمال الحرفية",
      ],
    },
    tags: { fr: ["Zellige", "Tadelakt", "Traditionnel", "Sur mesure"], ar: ["زليج", "تادلاكت", "تقليدي"] },
    highlights: {
      fr: [{ val: "100%", lbl: "Artisanal" }, { val: "Sur", lbl: "Mesure" }, { val: "Certifiés", lbl: "Artisans" }],
      ar: [{ val: "100%", lbl: "حرفي" }, { val: "مخصص", lbl: "طلب" }, { val: "معتمد", lbl: "حرفيون" }],
    },
  },
  /* 08 — Travaux Divers */
  {
    accent: "#ffbd00",
    image: "/assets/images/services/construction.png",
    features: {
      fr: [
        "Carrelage, faïence & revêtements de sol",
        "Menuiserie PVC, aluminium & bois sur mesure",
        "Isolation thermique & phonique (ITE / ITI)",
        "Étanchéité toiture & terrasse",
        "Faux-plafonds placo, dalles & BA13",
        "Démolition, reconstruction & gros œuvre",
      ],
      ar: [
        "بلاط وفايانس وأرضيات",
        "نجارة PVC وألومنيوم وخشب مخصص",
        "عزل حراري وصوتي",
        "عزل السطح والشرفة",
        "أسقف معلقة جبص وقرميد",
        "هدم وبناء وهيكل خرساني",
      ],
    },
    tags: { fr: ["Carrelage", "Menuiserie", "Isolation", "Gros œuvre"], ar: ["بلاط", "نجارة", "عزل"] },
    highlights: {
      fr: [{ val: "Clé", lbl: "En main" }, { val: "Tous", lbl: "Corps métier" }, { val: "Gratuit", lbl: "Devis" }],
      ar: [{ val: "تسليم", lbl: "مفتاح" }, { val: "جميع", lbl: "المهن" }, { val: "مجاني", lbl: "تقييم" }],
    },
  },
];

/* ─── Check icon ─────────────────────────────────────────── */
const Check = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─── Custom animated effects per service ─────────────────── */
const CustomEffect = ({ type, color }: { type: string; color: string }) => {
  switch (type) {
    case "electrical":
      return (
        <div className="absolute top-10 right-10 flex gap-2 rotate-45 opacity-40 pointer-events-none">
          <div className="w-[2px] h-12 animate-[pulse_0.1s_infinite]" style={{ background: color }} />
          <div className="w-[1px] h-8 animate-[pulse_0.15s_infinite_0.1s] bg-white" />
          <div className="w-[2px] h-16 animate-[pulse_0.1s_infinite_0.2s]" style={{ background: color }} />
        </div>
      );
    case "plumbing":
      return (
        <div className="absolute top-0 right-1/4 h-full flex gap-6 overflow-hidden pointer-events-none opacity-30">
          <div className="w-1 h-8 rounded-full translate-y-[-100%] animate-[drop_1.5s_infinite]" style={{ background: color }} />
          <div className="w-1.5 h-6 rounded-full translate-y-[-100%] animate-[drop_2s_infinite_0.5s]" style={{ background: color }} />
          <style jsx>{`@keyframes drop { 0% { transform: translateY(-100px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(400px); opacity: 0; } }`}</style>
        </div>
      );
    case "scan":
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          <div className="w-full h-[2px] shadow-lg animate-[scan_3s_ease-in-out_infinite]" style={{ background: color, boxShadow: `0 0 15px ${color}` }} />
          <style jsx>{`@keyframes scan { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(500px); opacity: 0; } }`}</style>
        </div>
      );
    case "ping":
      return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 pointer-events-none z-0">
          <div className="absolute inset-0 rounded-full animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-40 mix-blend-screen" style={{ background: color }} />
          <div className="absolute inset-6 rounded-full animate-[pulse_1s_infinite] opacity-60 blur-xl mix-blend-screen" style={{ background: color }} />
        </div>
      );
    default:
      return null;
  }
};

const EFFECT_TYPES = ["electrical", "plumbing", "default", "scan", "ping", "default", "default", "default"];

/* ─── ServiceDetail ──────────────────────────────────────── */
const ServiceDetail = ({ item, index, isRTL }: { item: { num: string; title: string; desc: string; link: string }; index: number; isRTL: boolean }) => {
  const isEven = index % 2 === 0;
  const rich   = RICH[index] || RICH[0];
  const lang   = isRTL ? "ar" : "fr";

  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 78%",
        onEnter: () => {
          gsap.fromTo(textRef.current, { x: isEven ? -60 : 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
          gsap.fromTo(imgRef.current,  { scale: 0.9, opacity: 0 },           { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.1 });
          // stagger feature items
          const feats = textRef.current?.querySelectorAll(".feat-item");
          if (feats) gsap.fromTo(feats, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power2.out", delay: 0.3 });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isEven]);

  const TextBlock = (
    <div ref={textRef} className={`w-full lg:w-1/2 flex flex-col justify-center ${isRTL ? "text-right" : "text-left"}`}>

      {/* Number + accent line */}
      <div className={`flex items-center gap-4 mb-5 ${isRTL ? "flex-row-reverse" : ""}`}>
        <span className="text-5xl font-black text-transparent" style={{ WebkitTextStroke: `1.5px ${rich.accent}` }}>
          {item.num}
        </span>
        <div className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: rich.accent }} />
      </div>

      {/* Title */}
      <h3 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-base text-gray-400 leading-relaxed mb-6" style={{ maxWidth: 520 }}>
        {item.desc}
      </p>

      {/* Features list */}
      <ul className="space-y-2.5 mb-7">
        {rich.features[lang].map((feat, fi) => (
          <li key={fi} className={`feat-item flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Check color={rich.accent} />
            <span className="text-sm text-gray-300 leading-snug">{feat}</span>
          </li>
        ))}
      </ul>

      {/* Highlights */}
      <div className={`flex gap-6 mb-8 flex-wrap ${isRTL ? "justify-end" : ""}`}>
        {rich.highlights[lang].map((h, hi) => (
          <div key={hi} className={`flex flex-col gap-1 ${isRTL ? "items-end" : ""}`}>
            <span className="text-2xl font-black leading-none" style={{ color: rich.accent }}>{h.val}</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">{h.lbl}</span>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className={`flex flex-wrap gap-2 mb-8 ${isRTL ? "justify-end" : ""}`}>
        {rich.tags[lang].map((tag, ti) => (
          <span key={ti} className="px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ border: `1px solid ${rich.accent}33`, color: rich.accent, background: `${rich.accent}0d` }}>
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className={isRTL ? "self-end" : "self-start"}>
        <Link href="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 text-sm font-black uppercase tracking-widest transition-all duration-300 hover:gap-4"
          style={{ background: rich.accent, color: "#fff" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#ff2c34"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = rich.accent; }}
        >
          {isRTL ? "طلب عرض سعر" : "Demander un devis"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: isRTL ? "rotate(180deg)" : "none" }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );

  const ImageBlock = (
    <div ref={imgRef} className="w-full lg:w-1/2 relative min-h-[440px] lg:min-h-[520px] group rounded-sm overflow-hidden">
      {/* Glow border */}
      <div className="absolute inset-0 z-10 pointer-events-none transition-all duration-500 rounded-sm"
        style={{ boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.08)` }} />
      <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"
        style={{ boxShadow: `inset 0 0 0 2px ${rich.accent}` }} />

      {/* Image */}
      <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-105">
        <Image src={rich.image} alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70" />
        {/* Accent top border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: rich.accent }} />
        {/* Effect overlay */}
        <CustomEffect type={EFFECT_TYPES[index]} color={rich.accent} />
      </div>

      {/* Floating badge */}
      <div className="absolute bottom-6 left-6 z-20 px-4 py-2 backdrop-blur-md"
        style={{ background: "rgba(0,0,0,0.55)", border: `1px solid ${rich.accent}55` }}>
        <span className="text-xs font-bold uppercase tracking-widest text-white">{item.title}</span>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>

      {/* Subtle bg glow */}
      <div aria-hidden className="absolute pointer-events-none"
        style={{ width: 600, height: 600, borderRadius: "50%", top: "50%", left: isEven ? "-10%" : "auto", right: isEven ? "auto" : "-10%", transform: "translateY(-50%)", background: `radial-gradient(circle, ${rich.accent}10 0%, transparent 70%)` }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`flex flex-col gap-12 lg:gap-16 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
          {isRTL ? (isEven ? TextBlock : ImageBlock) : TextBlock}
          {isRTL ? (isEven ? ImageBlock : TextBlock) : ImageBlock}
        </div>
      </div>
    </section>
  );
};

/* ─── Main page ──────────────────────────────────────────── */
export default function ServicesClient() {
  const { t, isRTL } = useLang();
  const heroRef     = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-stagger",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: "power4.out", delay: 0.15 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: "#07071a", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section ref={heroRef} className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "60vh", paddingTop: 110, paddingBottom: 80 }}
        dir={isRTL ? "rtl" : "ltr"}>

        {/* Bg glows */}
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(83,25,198,0.22) 0%, transparent 70%)" }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 40% at 100% 100%, rgba(255,44,52,0.08) 0%, transparent 70%)" }} />

        <div ref={heroTextRef} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="hero-stagger inline-flex items-center gap-3 mb-6">
            <span style={{ width: 20, height: 2, background: "#ff2c34", display: "block" }} />
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "#ff2c34" }}>
              {t.services.badge}
            </span>
            <span style={{ width: 20, height: 2, background: "#ff2c34", display: "block" }} />
          </div>

          <h1 className="hero-stagger font-black text-white leading-tight tracking-tight"
            style={{ fontSize: "clamp(36px, 5vw, 72px)", marginBottom: 20 }}>
            {isRTL ? "خدماتنا" : "Nos Services"}{" "}
            <span style={{ color: "transparent", WebkitTextStroke: "2px #ff2c34" }}>
              {isRTL ? "الاحترافية" : "Professionnels"}
            </span>
          </h1>

          <p className="hero-stagger" style={{ fontSize: 16, color: "#8888aa", maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.75 }}>
            {isRTL
              ? "حلول موثوقة وحديثة في جميع مجالات خبرتنا لضمان نجاح مشاريعكم."
              : "Des solutions fiables et modernes dans tous nos domaines d'expertise pour garantir la réussite de vos projets."}
          </p>

          <button className="hero-stagger"
            onClick={() => document.getElementById("services-grid")?.scrollIntoView({ behavior: "smooth" })}
            style={{ padding: "13px 32px", border: "1px solid rgba(83,25,198,0.5)", color: "#fff", background: "transparent", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", cursor: "pointer" }}>
            {isRTL ? "اكتشف خدماتنا" : "Découvrir nos services"}
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Services overview grid ──────────────────────────── */}
      <div id="services-grid">
        <ServicesGrid />
      </div>

      {/* ── Separator ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex items-center gap-6" style={{ opacity: 0.25 }}>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #5319c6, transparent)" }} />
        <div className="w-2 h-2 rounded-full" style={{ background: "#ff2c34" }} />
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #5319c6, transparent)" }} />
      </div>

      {/* ── Detailed sections ───────────────────────────────── */}
      <div>
        {t.services.items.map((item, i) => (
          <ServiceDetail key={i} item={item} index={i} isRTL={isRTL} />
        ))}
      </div>

      <CTA />
      <Footer />
    </div>
  );
}

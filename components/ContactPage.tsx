"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ─── Labels ─────────────────────────────────────────────────── */
const L = {
  fr: {
    badge: "Contact",
    h1a: "Parlons de",
    h1b: "votre projet.",
    sub: "Notre équipe répond sous 24h. Devis gratuit et sans engagement.",
    formTitle: "Envoyer un message",
    name: "Nom complet", email: "Adresse email",
    phone: "Téléphone", service: "Service concerné",
    serviceDefault: "Sélectionner un service…",
    msg: "Votre message",
    msgHint: "Décrivez votre projet, la superficie, le délai souhaité…",
    submit: "Envoyer le message", sending: "Envoi en cours…",
    success: "Message envoyé ! Nous vous répondons sous 24h.",
    error: "Erreur. Appelez-nous directement.",
    social: "Retrouvez-nous",
    processTitle: "Comment ça marche ?",
    faqTitle: "Questions fréquentes",
    services: ["Électricité","Plomberie","Climatisation","Vidéosurveillance","Système d'alarme","Peinture & Plâtre","Plâtre & Zellige","Travaux Divers"],
    steps: [
      { num: "01", title: "Contactez-nous", desc: "Remplissez le formulaire ou appelez-nous. On répond sous 24h." },
      { num: "02", title: "Devis gratuit", desc: "Un technicien se déplace pour évaluer votre projet sans frais." },
      { num: "03", title: "Réalisation", desc: "Nos experts interviennent dans les délais convenus, garanti." },
    ],
    faqs: [
      { q: "Les devis sont-ils vraiment gratuits ?", a: "Oui, tous nos devis sont entièrement gratuits et sans engagement. Un technicien peut se déplacer chez vous pour évaluer le chantier." },
      { q: "Intervenez-vous en urgence ?", a: "Oui, notre équipe est disponible 24h/24 et 7j/7 pour toutes les urgences électriques, plomberie et sécurité." },
      { q: "Dans quelle zone géographique intervenez-vous ?", a: "Nous intervenons principalement dans la région Sud du Maroc. Contactez-nous pour vérifier la disponibilité dans votre secteur." },
      { q: "Proposez-vous des garanties sur vos travaux ?", a: "Oui, tous nos travaux sont garantis. Nous appliquons les normes en vigueur et fournissons les documents de garantie à la livraison." },
    ],
  },
  ar: {
    badge: "التواصل",
    h1a: "لنتحدث عن",
    h1b: "مشروعكم.",
    sub: "فريقنا يردّ خلال 24 ساعة. عرض سعر مجاني وبدون أي التزام.",
    formTitle: "أرسل رسالة",
    name: "الاسم الكامل", email: "البريد الإلكتروني",
    phone: "رقم الهاتف", service: "الخدمة المطلوبة",
    serviceDefault: "اختر خدمة…",
    msg: "رسالتكم",
    msgHint: "صفوا مشروعكم، المساحة، الأجل المطلوب…",
    submit: "إرسال الرسالة", sending: "جارٍ الإرسال…",
    success: "تم إرسال رسالتكم! سنتواصل معكم خلال 24 ساعة.",
    error: "حدث خطأ. اتصلوا بنا مباشرة.",
    social: "تابعونا",
    processTitle: "كيف يعمل ذلك؟",
    faqTitle: "الأسئلة الشائعة",
    services: ["الكهرباء","السباكة","تكييف الهواء","المراقبة","نظام الإنذار","الطلاء والجبس","الجبص والزليج","أعمال متنوعة"],
    steps: [
      { num: "01", title: "تواصلوا معنا", desc: "أرسلوا رسالة أو اتصلوا بنا. نرد خلال 24 ساعة." },
      { num: "02", title: "تقدير مجاني", desc: "يزور تقنيٌّ متخصص لتقييم مشروعكم دون أي تكلفة." },
      { num: "03", title: "التنفيذ", desc: "يتدخل خبراؤنا في الآجال المتفق عليها مع ضمان الجودة." },
    ],
    faqs: [
      { q: "هل التقديرات مجانية حقاً؟", a: "نعم، جميع عروض الأسعار مجانية وبدون أي التزام. يمكن لتقنيٍّ الانتقال إليكم لتقييم الموقع." },
      { q: "هل تتدخلون في حالات الطوارئ؟", a: "نعم، فريقنا متاح 24 ساعة على 24 ساعة و7 أيام في الأسبوع لجميع حالات طوارئ الكهرباء والسباكة والأمن." },
      { q: "ما هي المناطق الجغرافية التي تغطونها؟", a: "نتدخل بشكل رئيسي في المنطقة الجنوبية من المغرب. اتصلوا بنا للتحقق من التوفر في منطقتكم." },
      { q: "هل تقدمون ضمانات على أعمالكم؟", a: "نعم، جميع أعمالنا مضمونة. نطبق المعايير المعمول بها ونقدم وثائق الضمان عند التسليم." },
    ],
  },
};

/* ─── Contact info cards ─────────────────────────────────────── */
const INFO_CARDS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z" />
      </svg>
    ),
    labelFR: "Appelez-nous", labelAR: "اتصلوا بنا",
    valueFR: "+212 6 02 46 72 22", valueAR: "+212 6 02 46 72 22",
    subFR: "Lun – Sam · 8h – 20h", subAR: "الإثنين – السبت · 8ص – 8م",
    link: "tel:+212602467222",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    labelFR: "Écrivez-nous", labelAR: "راسلونا",
    valueFR: "contact@courant-amousy-sud.ma", valueAR: "contact@courant-amousy-sud.ma",
    subFR: "Réponse sous 24h garantie", subAR: "رد مضمون خلال 24 ساعة",
    link: "mailto:contact@courant-amousy-sud.ma",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    labelFR: "WhatsApp", labelAR: "واتساب",
    valueFR: "+212 6 02 46 72 22", valueAR: "+212 6 02 46 72 22",
    subFR: "Réponse instantanée", subAR: "رد فوري",
    link: "https://wa.me/212602467222?text=Bonjour%2C%20je%20souhaite%20un%20devis.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    labelFR: "Notre zone", labelAR: "منطقتنا",
    valueFR: "Région Sud, Maroc", valueAR: "الجنوب، المغرب",
    subFR: "Intervention rapide sur site", subAR: "تدخل سريع في الموقع",
    link: null,
  },
];

/* ─── Input style ────────────────────────────────────────────── */
const IS: React.CSSProperties = {
  width: "100%", background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)", color: "#fff",
  padding: "14px 16px", fontSize: 14, outline: "none",
  borderRadius: 0, appearance: "none", fontFamily: "inherit",
  transition: "border-color 0.2s, background 0.2s",
};

export default function ContactPage() {
  const { lang, isRTL } = useLang();
  const l = L[lang];

  const pageRef   = useRef<HTMLDivElement>(null);
  const heroRef   = useRef<HTMLElement>(null);
  const cardsRef  = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const formRef   = useRef<HTMLFormElement>(null);
  const faqRef    = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const field = (k: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [k]: v }));

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "#5319c6";
    (e.currentTarget as HTMLElement).style.background = "rgba(83,25,198,0.07)";
  };
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1400));
    setStatus("success");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(".hero-line", { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.1 });

      // Info cards
      gsap.fromTo(".info-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 85%" } });

      // Process steps
      gsap.fromTo(".process-step",
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: processRef.current, start: "top 80%" } });

      // Form
      const fields = formRef.current?.querySelectorAll(".ff");
      if (fields) gsap.fromTo(fields,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: formRef.current, start: "top 85%" } });

      // FAQ
      gsap.fromTo(".faq-item",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: faqRef.current, start: "top 82%" } });

    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} style={{ background: "#04040a", minHeight: "100vh", color: "#fff" }} dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      {/* ══ 1. HERO ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=80"
            alt="Contact CAS"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(4,4,10,0.97) 45%, rgba(4,4,10,0.6) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #04040a 0%, transparent 55%)" }} />
        </div>

        {/* Glow accents */}
        <div className="absolute top-0 left-0 w-px h-full opacity-60"
          style={{ background: "linear-gradient(to bottom, transparent, #ff2c34, transparent)" }} />
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-[140px]" style={{ background: "#5319c6" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-20 pt-40 w-full">

          <div className="hero-line flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-[#ff2c34]" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#ff2c34]">{l.badge}</span>
          </div>

          <h1 className="hero-line font-black leading-none tracking-tight"
            style={{ fontSize: "clamp(48px, 7.5vw, 100px)" }}>
            <span className="text-white block">{l.h1a}</span>
            <span className="block" style={{ color: "transparent", WebkitTextStroke: "2px #5319c6" }}>{l.h1b}</span>
          </h1>

          <p className="hero-line mt-6 text-base leading-relaxed max-w-md"
            style={{ color: "rgba(255,255,255,0.5)" }}>
            {l.sub}
          </p>

          {/* Quick stats */}
          <div className="hero-line mt-10 flex flex-wrap gap-6">
            {[
              { val: "24h", labelFR: "Délai de réponse", labelAR: "وقت الرد" },
              { val: "100%", labelFR: "Devis gratuit", labelAR: "تقدير مجاني" },
              { val: "500+", labelFR: "Projets réalisés", labelAR: "مشروع منجز" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-2xl font-black" style={{ color: "#5319c6" }}>{s.val}</span>
                <span className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {lang === "fr" ? s.labelFR : s.labelAR}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 2. INFO CARDS ═════════════════════════════════════ */}
      <div ref={cardsRef} className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INFO_CARDS.map((card, i) => (
            <div
              key={i}
              className="info-card group relative p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                cursor: card.link ? "pointer" : "default",
              }}
              onClick={() => card.link && window.open(card.link, "_blank")}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(83,25,198,0.35)";
                (e.currentTarget as HTMLElement).style.background = "rgba(83,25,198,0.05)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
              }}
            >
              {/* Top accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                style={{ background: "#5319c6" }} />

              {/* Icon */}
              <div className="w-11 h-11 flex items-center justify-center border border-white/10 text-white/40 group-hover:text-white group-hover:border-white/20 transition-colors duration-300">
                {card.icon}
              </div>

              {/* Text */}
              <div className={isRTL ? "text-right" : ""}>
                <div className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: "rgba(255,255,255,0.3)" }}>
                  {lang === "fr" ? card.labelFR : card.labelAR}
                </div>
                <div className="text-sm font-bold text-white leading-tight mb-1">
                  {lang === "fr" ? card.valueFR : card.valueAR}
                </div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {lang === "fr" ? card.subFR : card.subAR}
                </div>
              </div>

              {/* Arrow if clickable */}
              {card.link && (
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-white/50"
                  style={{ transform: isRTL ? "rotate(180deg)" : "none" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ══ 3. PROCESS ════════════════════════════════════════ */}
      <section ref={processRef} className="py-20 border-t border-white/5" style={{ background: "#07071a" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className={`mb-14 ${isRTL ? "text-right" : ""}`}>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#ff2c34] block mb-4">
              {lang === "fr" ? "Simple & rapide" : "بسيط وسريع"}
            </span>
            <h2 className="font-black tracking-tight" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
              {l.processTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {l.steps.map((step, i) => (
              <div key={i} className="process-step relative group" style={{
                padding: "40px 36px",
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : undefined,
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : undefined,
              }}>
                {/* Connector arrow (desktop) */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 right-0 translate-x-1/2 z-10 w-6 h-6 flex items-center justify-center"
                    style={{ color: "rgba(255,255,255,0.15)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}

                {/* Number */}
                <div className="text-6xl font-black mb-6 leading-none"
                  style={{ color: "transparent", WebkitTextStroke: "1px #5319c6", opacity: 0.4 }}>
                  {step.num}
                </div>

                {/* Bar */}
                <div className="w-8 h-0.5 mb-5 transition-all duration-400 group-hover:w-16"
                  style={{ background: "#5319c6" }} />

                <h3 className={`text-xl font-black text-white mb-3 ${isRTL ? "text-right" : ""}`}>{step.title}</h3>
                <p className={`text-sm leading-relaxed ${isRTL ? "text-right" : ""}`}
                  style={{ color: "rgba(255,255,255,0.45)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. FORM + FAQ ═════════════════════════════════════ */}
      <section className="py-20 border-t border-white/5" style={{ background: "#04040a" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-16 max-w-3xl mx-auto">

            {/* ── Form ─────────────────────────────────────── */}
            <div>
              <div className={`mb-10 ${isRTL ? "text-right" : ""}`}>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-[#5319c6] block mb-4">
                  {lang === "fr" ? "Formulaire de contact" : "نموذج التواصل"}
                </span>
                <h2 className="font-black tracking-tight" style={{ fontSize: "clamp(26px, 3vw, 38px)" }}>
                  {l.formTitle}
                </h2>
              </div>

              {/* Success banner */}
              {status === "success" && (
                <div className="flex items-start gap-3 p-4 mb-6 text-sm"
                  style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", color: "#4ade80", flexDirection: isRTL ? "row-reverse" : "row" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {l.success}
                </div>
              )}

              <form ref={formRef} onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}
                dir={isRTL ? "rtl" : "ltr"}>

                {/* Name + Email */}
                <div className="ff grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#666688" }}>
                      {l.name} <span style={{ color: "#ff2c34" }}>*</span>
                    </label>
                    <input type="text" required value={form.name} onChange={e => field("name")(e.target.value)}
                      placeholder={lang === "fr" ? "Jean Dupont" : "محمد العلوي"}
                      style={{ ...IS }} onFocus={focus} onBlur={blur} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#666688" }}>
                      {l.email} <span style={{ color: "#ff2c34" }}>*</span>
                    </label>
                    <input type="email" required value={form.email} onChange={e => field("email")(e.target.value)}
                      placeholder="email@exemple.com" style={{ ...IS }} onFocus={focus} onBlur={blur} />
                  </div>
                </div>

                {/* Phone + Service */}
                <div className="ff grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#666688" }}>
                      {l.phone}
                    </label>
                    <input type="tel" value={form.phone} onChange={e => field("phone")(e.target.value)}
                      placeholder="+212 6 00 00 00 00" style={{ ...IS }} onFocus={focus} onBlur={blur} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#666688" }}>
                      {l.service}
                    </label>
                    <div style={{ position: "relative" }}>
                      <select value={form.service} onChange={e => field("service")(e.target.value)}
                        style={{ ...IS, paddingRight: 36, cursor: "pointer" }} onFocus={focus} onBlur={blur}>
                        <option value="" style={{ background: "#0d0d24" }}>{l.serviceDefault}</option>
                        {l.services.map(s => <option key={s} value={s} style={{ background: "#0d0d24" }}>{s}</option>)}
                      </select>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555577" strokeWidth="2"
                        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="ff flex flex-col gap-2">
                  <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#666688" }}>
                    {l.msg} <span style={{ color: "#ff2c34" }}>*</span>
                  </label>
                  <textarea required rows={6} value={form.message} onChange={e => field("message")(e.target.value)}
                    placeholder={l.msgHint}
                    style={{ ...IS, resize: "vertical", minHeight: 140 }} onFocus={focus} onBlur={blur} />
                </div>

                {/* Submit */}
                <div className="ff">
                  <button type="submit" disabled={status === "sending"}
                    style={{
                      width: "100%", padding: "16px 28px",
                      background: status === "sending" ? "rgba(83,25,198,0.6)" : "#5319c6",
                      color: "#fff", fontSize: 11, fontWeight: 800,
                      textTransform: "uppercase", letterSpacing: "0.2em",
                      border: "none", cursor: status === "sending" ? "wait" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={e => { if (status !== "sending") (e.currentTarget as HTMLElement).style.background = "#ff2c34"; }}
                    onMouseLeave={e => { if (status !== "sending") (e.currentTarget as HTMLElement).style.background = "#5319c6"; }}
                  >
                    {status === "sending" ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          style={{ animation: "spin 1s linear infinite" }}>
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        {l.sending}
                      </>
                    ) : (
                      <>
                        {l.submit}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                          style={{ transform: isRTL ? "rotate(180deg)" : "none" }}>
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p style={{ marginTop: 10, fontSize: 13, color: "#ff6b6b", textAlign: isRTL ? "right" : "left" }}>
                      {l.error}
                    </p>
                  )}

                  <p style={{ marginTop: 12, fontSize: 11, color: "#333355", lineHeight: 1.7, textAlign: isRTL ? "right" : "left" }}>
                    {lang === "fr"
                      ? "En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour répondre à votre demande."
                      : "بإرسال هذا النموذج، توافقون على استخدام بياناتكم للرد على طلبكم."}
                  </p>
                </div>
              </form>
            </div>

            {/* ── FAQ ──────────────────────────────────────── */}
            <div ref={faqRef as React.RefObject<HTMLDivElement>}>
              <div className={`mb-10 ${isRTL ? "text-right" : ""}`}>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-[#ff2c34] block mb-4">
                  {lang === "fr" ? "On répond à tout" : "نجيب على كل شيء"}
                </span>
                <h2 className="font-black tracking-tight" style={{ fontSize: "clamp(26px, 3vw, 38px)" }}>
                  {l.faqTitle}
                </h2>
              </div>

              <div className="flex flex-col gap-2">
                {l.faqs.map((faq, i) => (
                  <div key={i} className="faq-item border border-white/5 transition-colors duration-300"
                    style={{ background: openFaq === i ? "rgba(83,25,198,0.06)" : "rgba(255,255,255,0.02)", borderColor: openFaq === i ? "rgba(83,25,198,0.3)" : "rgba(255,255,255,0.05)" }}>
                    <button
                      className="w-full flex items-center justify-between gap-4 p-5 text-left"
                      style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className={`text-sm font-bold text-white leading-snug ${isRTL ? "text-right" : "text-left"}`}>
                        {faq.q}
                      </span>
                      <span className="shrink-0 w-6 h-6 flex items-center justify-center border border-white/10 transition-all duration-300"
                        style={{ color: openFaq === i ? "#5319c6" : "#555577", borderColor: openFaq === i ? "#5319c6" : "rgba(255,255,255,0.1)", transform: openFaq === i ? "rotate(45deg)" : "none" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5">
                        <p className={`text-sm leading-relaxed ${isRTL ? "text-right" : ""}`}
                          style={{ color: "rgba(255,255,255,0.5)" }}>
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Social row */}
              <div className="mt-10 p-6 border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
                <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${isRTL ? "text-right" : ""}`}
                  style={{ color: "rgba(255,255,255,0.3)" }}>
                  {l.social}
                </p>
                <div className={`flex gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                  {[
                    { label: "Facebook", href: "#",
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
                    { label: "Instagram", href: "#",
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
                    { label: "LinkedIn", href: "#",
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                    { label: "WhatsApp", href: "https://wa.me/212602467222",
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg> },
                  ].map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                      className="w-10 h-10 flex items-center justify-center border transition-all duration-200"
                      style={{ borderColor: "rgba(255,255,255,0.08)", color: "#444466" }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
                        (e.currentTarget as HTMLElement).style.color = "#fff";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                        (e.currentTarget as HTMLElement).style.color = "#444466";
                      }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <Footer />
    </div>
  );
}

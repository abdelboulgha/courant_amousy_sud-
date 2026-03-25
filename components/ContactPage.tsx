"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ─── Bilingual labels (local, no i18n change needed) ─── */
const L = {
  fr: {
    badge: "Contact",
    title: "Parlons de\nvotre projet",
    sub: "Notre équipe vous répond sous 24h. Devis entièrement gratuit et sans engagement.",
    name: "Nom complet",
    email: "Adresse email",
    phone: "Téléphone",
    service: "Service concerné",
    serviceDefault: "Sélectionner un service…",
    msg: "Votre message",
    msgHint: "Décrivez votre projet, la superficie, le délai souhaité…",
    submit: "Envoyer le message",
    sending: "Envoi…",
    success: "Message envoyé avec succès ! Nous vous répondons sous 24h.",
    error: "Une erreur est survenue. Veuillez réessayer ou appeler directement.",
    infoTitle: "Informations de contact",
    social: "Retrouvez-nous",
    services: [
      "Électricité",
      "Plomberie",
      "Climatisation",
      "Vidéosurveillance",
      "Système d'alarme",
      "Peinture & Plâtre",
      "Travaux Divers",
    ],
  },
  ar: {
    badge: "التواصل",
    title: "لنتحدث عن\nمشروعكم",
    sub: "فريقنا يردّ خلال 24 ساعة. عرض سعر مجاني وبدون أي التزام.",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    service: "الخدمة المطلوبة",
    serviceDefault: "اختر خدمة…",
    msg: "رسالتكم",
    msgHint: "صفوا مشروعكم، المساحة، الأجل المطلوب…",
    submit: "إرسال الرسالة",
    sending: "جارٍ الإرسال…",
    success: "تم إرسال رسالتكم بنجاح! سنتواصل معكم خلال 24 ساعة.",
    error: "حدث خطأ. يرجى المحاولة مجدداً أو الاتصال بنا مباشرة.",
    infoTitle: "معلومات التواصل",
    social: "تابعونا",
    services: [
      "الكهرباء",
      "السباكة",
      "تكييف الهواء",
      "المراقبة بالكاميرات",
      "نظام الإنذار",
      "الطلاء والجبس",
      "أعمال متنوعة",
    ],
  },
};

const INFO_ITEMS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: { fr: "Adresse", ar: "العنوان" },
    value: { fr: "Région Sud, Maroc", ar: "الجنوب، المغرب" },
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z" />
      </svg>
    ),
    label: { fr: "Téléphone", ar: "الهاتف" },
    value: { fr: "+212 6 02 46 72 22", ar: "+212 6 02 46 72 22" },
    link: "tel:+212602467222",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: { fr: "Email", ar: "البريد" },
    value: { fr: "contact@courant-amousy-sud.ma", ar: "contact@courant-amousy-sud.ma" },
    link: "mailto:contact@courant-amousy-sud.ma",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: { fr: "Disponibilité", ar: "التوفر" },
    value: { fr: "Urgences 24h/24 · 7j/7", ar: "طوارئ 24/7" },
  },
];

/* ─── Input style helper ────────────────────────────────── */
const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#ffffff",
  padding: "13px 16px",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.2s",
  borderRadius: 0,
  appearance: "none",
};

export default function ContactPage() {
  const { lang, isRTL } = useLang();
  const l = L[lang];

  const pageRef   = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftRef   = useRef<HTMLDivElement>(null);
  const formRef   = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  /* ── GSAP entrance ─────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.15 }
      );
      // Left panel
      gsap.fromTo(leftRef.current,
        { x: isRTL ? 40 : -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 }
      );
      // Form fields stagger
      const fields = formRef.current?.querySelectorAll(".form-field");
      if (fields) {
        gsap.fromTo(fields,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: "power2.out", delay: 0.45 }
        );
      }
    }, pageRef);
    return () => ctx.revert();
  }, [isRTL]);

  /* ── Form submit (simulated — wire to backend as needed) ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate network delay — replace with real fetch/EmailJS/Formspree call
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const field = (key: keyof typeof formData) =>
    (val: string) => setFormData((prev) => ({ ...prev, [key]: val }));

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "#5319c6";
    (e.currentTarget as HTMLElement).style.background = "rgba(83,25,198,0.06)";
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
  };

  return (
    <div ref={pageRef} style={{ background: "#07071a", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Page header ──────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: 130,
          paddingBottom: 72,
          background: "linear-gradient(160deg, #0d0722 0%, #07071a 60%)",
        }}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Decorative glows */}
        <div aria-hidden style={{ position: "absolute", top: 0, left: isRTL ? "auto" : 0, right: isRTL ? 0 : "auto", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(83,25,198,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", bottom: 0, right: isRTL ? "auto" : 0, left: isRTL ? 0 : "auto", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,44,52,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div ref={headerRef} className="max-w-7xl mx-auto px-6 lg:px-8" style={{ opacity: 0 }}>
          {/* Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexDirection: isRTL ? "row-reverse" : "row" }}>
            <span style={{ width: 28, height: 2, background: "#ff2c34", display: "block" }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#ff2c34" }}>
              {l.badge}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 68px)",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              marginBottom: 18,
              whiteSpace: "pre-line",
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {l.title}
          </h1>

          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#8888aa", maxWidth: 480, textAlign: isRTL ? "right" : "left" }}>
            {l.sub}
          </p>
        </div>
      </div>

      {/* ── Main body: info + form ────────────────────────────── */}
      <main
        className="max-w-7xl mx-auto px-6 lg:px-8 py-16"
        dir={isRTL ? "rtl" : "ltr"}
        style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 48,
            alignItems: "start",
          }}
        >

          {/* ── Left: contact info ─────────────────────────────── */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#5319c6", marginBottom: 20 }}>
              {l.infoTitle}
            </p>

            {/* Info cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 36 }}>
              {INFO_ITEMS.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "16px 18px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    flexDirection: isRTL ? "row-reverse" : "row",
                    transition: "border-color 0.2s, background 0.2s",
                    cursor: item.link ? "pointer" : "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(83,25,198,0.35)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(83,25,198,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  }}
                  onClick={() => item.link && window.open(item.link)}
                >
                  {/* Icon */}
                  <span style={{ color: "#5319c6", marginTop: 2, flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  {/* Text */}
                  <div style={{ textAlign: isRTL ? "right" : "left" }}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#444466", marginBottom: 4 }}>
                      {item.label[lang]}
                    </div>
                    <div style={{ fontSize: 14, color: "#ccccee", fontWeight: 500 }}>
                      {item.value[lang]}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 28 }} />

            {/* Social links */}
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#444466", marginBottom: 14 }}>
              {l.social}
            </p>
            <div style={{ display: "flex", gap: 10, flexDirection: isRTL ? "row-reverse" : "row" }}>
              {[
                { label: "Facebook", href: "#", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
                { label: "Instagram", href: "#", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
                { label: "WhatsApp", href: "#", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: 38, height: 38,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#666688",
                    transition: "all 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#5319c6";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                    (e.currentTarget as HTMLElement).style.background = "rgba(83,25,198,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "#666688";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Decorative badge */}
            <div
              style={{
                marginTop: 40,
                padding: "20px 22px",
                background: "linear-gradient(135deg, rgba(83,25,198,0.12) 0%, rgba(83,25,198,0.04) 100%)",
                border: "1px solid rgba(83,25,198,0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexDirection: isRTL ? "row-reverse" : "row" }}>
                <span style={{ width: 20, height: 2, background: "#ff2c34", display: "block" }} />
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ff2c34" }}>
                  {lang === "fr" ? "Réponse garantie" : "رد مضمون"}
                </span>
              </div>
              <p style={{ fontSize: 13, color: "#8888aa", lineHeight: 1.6, margin: 0, textAlign: isRTL ? "right" : "left" }}>
                {lang === "fr"
                  ? "Nous nous engageons à répondre à toute demande sous 24 heures ouvrées."
                  : "نلتزم بالرد على كل طلب خلال 24 ساعة عمل."}
              </p>
            </div>
          </div>

          {/* ── Right: contact form ───────────────────────────── */}
          <div>
            {/* Success message */}
            {status === "success" && (
              <div
                style={{
                  padding: "18px 22px",
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.25)",
                  color: "#4ade80",
                  fontSize: 14,
                  lineHeight: 1.6,
                  marginBottom: 24,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  flexDirection: isRTL ? "row-reverse" : "row",
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                {l.success}
              </div>
            )}

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
              dir={isRTL ? "rtl" : "ltr"}
            >
              {/* Name + Email row */}
              <div className="form-field" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8888aa" }}>
                    {l.name} <span style={{ color: "#ff2c34" }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => field("name")(e.target.value)}
                    placeholder={lang === "fr" ? "Jean Dupont" : "محمد العلوي"}
                    style={{ ...INPUT_STYLE }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8888aa" }}>
                    {l.email} <span style={{ color: "#ff2c34" }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => field("email")(e.target.value)}
                    placeholder="email@exemple.com"
                    style={{ ...INPUT_STYLE }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>
              </div>

              {/* Phone + Service row */}
              <div className="form-field" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8888aa" }}>
                    {l.phone}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => field("phone")(e.target.value)}
                    placeholder="+212 6 00 00 00 00"
                    style={{ ...INPUT_STYLE }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8888aa" }}>
                    {l.service}
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={formData.service}
                      onChange={(e) => field("service")(e.target.value)}
                      style={{ ...INPUT_STYLE, paddingRight: 36, cursor: "pointer" }}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                    >
                      <option value="" style={{ background: "#0d0d24" }}>{l.serviceDefault}</option>
                      {l.services.map((s) => (
                        <option key={s} value={s} style={{ background: "#0d0d24" }}>{s}</option>
                      ))}
                    </select>
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666688" strokeWidth="2"
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="form-field" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8888aa" }}>
                  {l.msg} <span style={{ color: "#ff2c34" }}>*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => field("message")(e.target.value)}
                  placeholder={l.msgHint}
                  style={{ ...INPUT_STYLE, resize: "vertical", minHeight: 140, fontFamily: "inherit" }}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>

              {/* Submit */}
              <div className="form-field">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    width: "100%",
                    padding: "15px 28px",
                    background: status === "sending" ? "rgba(255,44,52,0.6)" : "#ff2c34",
                    color: "#ffffff",
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    border: "none",
                    cursor: status === "sending" ? "wait" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    transition: "background 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "sending") (e.currentTarget as HTMLElement).style.background = "#cc1f26";
                  }}
                  onMouseLeave={(e) => {
                    if (status !== "sending") (e.currentTarget as HTMLElement).style.background = "#ff2c34";
                  }}
                >
                  {status === "sending" ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      {l.sending}
                    </>
                  ) : (
                    <>
                      {l.submit}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: isRTL ? "rotate(180deg)" : "none" }}>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Error */}
                {status === "error" && (
                  <p style={{ marginTop: 10, fontSize: 13, color: "#ff6b6b", textAlign: isRTL ? "right" : "left" }}>
                    {l.error}
                  </p>
                )}

                {/* Legal note */}
                <p style={{ marginTop: 12, fontSize: 11, color: "#444466", lineHeight: 1.6, textAlign: isRTL ? "right" : "left" }}>
                  {lang === "fr"
                    ? "En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour répondre à votre demande."
                    : "بإرسال هذا النموذج، توافقون على استخدام بياناتكم للرد على طلبكم."}
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Spin keyframe for loader */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <Footer />
    </div>
  );
}

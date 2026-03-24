"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const serviceColors = ["#5319c6", "#7c3aed", "#be185d", "#ff2c34"];

const serviceIcons = [
  // Électricité générale
  <svg key="s1" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect x="8" y="12" width="24" height="3" rx="1.5" fill="currentColor" opacity="0.4" />
    <rect x="8" y="18.5" width="24" height="3" rx="1.5" fill="currentColor" opacity="0.7" />
    <rect x="8" y="25" width="16" height="3" rx="1.5" fill="currentColor" />
    <circle cx="30" cy="26.5" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M30 24 L30 26.5 L32 28.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 6 L17 12 L20 12 L17 20 L23 13 L20 13 Z" fill="currentColor" />
  </svg>,
  // Installation industrielle
  <svg key="s2" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect x="6" y="14" width="8" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
    <rect x="16" y="10" width="8" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
    <rect x="26" y="17" width="8" height="13" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M20 6 L17 12 L20 12 L17 20 L23 13 L20 13 Z" fill="currentColor" />
    <path d="M4 34 L36 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>,
  // Maintenance
  <svg key="s3" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 8 C13.37 8 8 13.37 8 20 C8 26.63 13.37 32 20 32 C26.63 32 32 26.63 32 20"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M26 8 L32 8 L32 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M32 8 L22 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="20" r="3" fill="currentColor" />
  </svg>,
  // Dépannage
  <svg key="s4" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 6 L16 16 L20 16 L14 34 L24 22 L19 22 Z" fill="currentColor" />
    <path d="M8 20 C8 13.37 13.37 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" fill="none" />
    <path d="M32 20 C32 26.63 26.63 32 20 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" fill="none" />
  </svg>,
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t, isRTL } = useLang();

  const services = [
    { title: t.services.s1t, desc: t.services.s1d, color: serviceColors[0], icon: serviceIcons[0] },
    { title: t.services.s2t, desc: t.services.s2d, color: serviceColors[1], icon: serviceIcons[1] },
    { title: t.services.s3t, desc: t.services.s3d, color: serviceColors[2], icon: serviceIcons[2] },
    { title: t.services.s4t, desc: t.services.s4d, color: serviceColors[3], icon: serviceIcons[3] },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headingRef.current, start: "top 85%",
        onEnter: () => gsap.fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }),
      });
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        ScrollTrigger.create({
          trigger: card, start: "top 90%",
          onEnter: () => gsap.fromTo(card, { y: 70, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.3)", delay: (i % 2) * 0.1 }),
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" style={{ background: "#07071a" }} dir={isRTL ? "rtl" : "ltr"}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(83,25,198,0.08) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: "rgba(255,44,52,0.1)", border: "1px solid rgba(255,44,52,0.25)", color: "#f87171" }}>
            {t.services.badge}
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4" style={{ fontWeight: 900 }}>
            {t.services.title1}{" "}
            <span style={{ color: "#5319c6" }}>{t.services.title2}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">{t.services.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            let iconRef: HTMLDivElement | null = null;
            return (
              <div
                key={service.title}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group p-7 rounded-2xl cursor-default"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(83,25,198,0.2)", opacity: 0 }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { y: -10, duration: 0.3, ease: "power2.out" });
                  (e.currentTarget as HTMLElement).style.borderColor = service.color;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${service.color}33`;
                  if (iconRef) gsap.to(iconRef, { rotation: 15, scale: 1.15, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: "power2.out" });
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(83,25,198,0.2)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  if (iconRef) gsap.to(iconRef, { rotation: 0, scale: 1, duration: 0.3 });
                }}
              >
                <div ref={(el) => { iconRef = el; }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${service.color}22`, color: service.color }}>
                  {service.icon}
                </div>
                <h3 className={`font-black text-xl text-white mb-3 ${isRTL ? "text-right" : ""}`}>{service.title}</h3>
                <p className={`text-gray-400 text-sm leading-relaxed mb-6 ${isRTL ? "text-right" : ""}`}>{service.desc}</p>
                <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-bold transition-all"
                  style={{ color: service.color }}>
                  {t.services.learnMore}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

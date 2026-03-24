"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const ICONS = [
  // Électricité
  <svg key="e" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>,
  // Construction
  <svg key="c" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M5 21V7l7-4 7 4v14" /><path d="M9 21v-6h6v6" />
  </svg>,
  // Solaire
  <svg key="s" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>,
  // Plomberie
  <svg key="p" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12" /><path d="M2 12c0 2.4 1 4.5 2.5 6" /><path d="M12 12h.01" />
    <path d="M9 9h.01M15 9h.01M9 15h.01" />
  </svg>,
  // Travaux divers
  <svg key="t" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>,
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headRef.current,
        start: "top 88%",
        onEnter: () => {
          gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" });
        },
      });
      const cards = gridRef.current?.querySelectorAll(".svc-item");
      if (cards) {
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(cards, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" });
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24" style={{ background: "#f5f5fa" }} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div ref={headRef} className={`mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#ff2c34" }}>
              {t.services.badge}
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              {t.services.title}
            </h2>
          </div>
          <p className="text-base max-w-xs leading-relaxed" style={{ color: "#666688" }}>
            {t.services.sub}
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "#e2e2ec" }}>
          {t.services.items.map((svc, i) => (
            <div
              key={i}
              className="svc-card svc-item group bg-white p-8 flex flex-col gap-4 opacity-0"
              style={{ borderLeft: isRTL ? "none" : "3px solid transparent", borderRight: isRTL ? "3px solid transparent" : "none" }}
            >
              {/* Number + icon row */}
              <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                <span className="text-xs font-bold tracking-[0.2em]" style={{ color: "#ccccdd" }}>
                  {svc.num}
                </span>
                <span className="w-10 h-10 rounded-sm flex items-center justify-center transition-colors duration-200 group-hover:bg-red-50"
                  style={{ background: "#f5f5fa", color: "#5319c6" }}>
                  {ICONS[i]}
                </span>
              </div>

              {/* Title */}
              <h3 className={`text-xl font-black text-gray-900 ${isRTL ? "text-right" : ""}`}>
                {svc.title}
              </h3>

              {/* Desc */}
              <p className={`text-sm leading-relaxed flex-1 ${isRTL ? "text-right" : ""}`} style={{ color: "#666688" }}>
                {svc.desc}
              </p>

              {/* Link */}
              <Link href="/services"
                className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors duration-200 group-hover:gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
                style={{ color: "#5319c6" }}>
                {isRTL ? (
                  <><span>{svc.link}</span><span>←</span></>
                ) : (
                  <><span>{svc.link}</span><span>→</span></>
                )}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(innerRef.current?.children ?? [],
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
          );
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="cta-glow py-24 relative overflow-hidden" style={{ background: "#5319c6" }} dir={isRTL ? "rtl" : "ltr"}>
      {/* Decorative radial flares */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 80% at 100% 50%, rgba(255,44,52,0.18) 0%, transparent 70%)" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 50% 70% at 0% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={innerRef} className={`flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20 ${isRTL ? "lg:flex-row-reverse" : ""}`}>

          {/* Left text */}
          <div className="flex-1">
            <div className="text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t.cta.label}
            </div>
            <h2 className={`text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight ${isRTL ? "text-right" : ""}`}>
              {t.cta.title}
            </h2>
            <p className={`mt-5 text-base leading-relaxed max-w-md ${isRTL ? "text-right" : ""}`} style={{ color: "rgba(255,255,255,0.65)" }}>
              {t.cta.sub}
            </p>
          </div>

          {/* Right */}
          <div className={`flex flex-col gap-6 ${isRTL ? "items-end" : ""}`}>
            {/* Button */}
            <Link href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-black uppercase tracking-widest transition-all duration-200 hover:bg-gray-100"
              style={{ background: "#ffffff", color: "#5319c6" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#ff2c34"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#ffffff"; (e.currentTarget as HTMLElement).style.color = "#5319c6"; }}
            >
              {t.cta.btn}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Info pills */}
            <div className={`flex flex-wrap gap-3 ${isRTL ? "justify-end" : ""}`}>
              {t.cta.infos.map((info, i) => (
                <span key={i}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.8)",
                  }}>
                  {info.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

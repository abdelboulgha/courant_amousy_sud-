"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current, start: "top 80%",
        onEnter: () => gsap.fromTo(contentRef.current, { y: 60, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.3)" }),
      });
      gsap.to(glowRef.current, { scale: 1.15, opacity: 0.6, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" style={{ background: "#07071a" }}>
      <div ref={glowRef} className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(83,25,198,0.3) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(255,44,52,0.1) 0%, transparent 60%)" }} />
      <div className="absolute left-0 right-0 top-0 h-px opacity-30"
        style={{ background: "linear-gradient(90deg, transparent, #5319c6, transparent)" }} />
      <div className="absolute left-0 right-0 bottom-0 h-px opacity-30"
        style={{ background: "linear-gradient(90deg, transparent, #ff2c34, transparent)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center" dir={isRTL ? "rtl" : "ltr"}>
        <div ref={contentRef}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ background: "rgba(255,44,52,0.1)", border: "1px solid rgba(255,44,52,0.3)", color: "#f87171" }}>
            ⚡ {t.cta.badge}
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{ fontWeight: 900 }}>
            {t.cta.title1}{" "}
            <span style={{ background: "linear-gradient(135deg, #5319c6, #ff2c34)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t.cta.title2}
            </span>
          </h2>

          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">{t.cta.subtitle}</p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-white font-black text-lg uppercase tracking-wider transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #5319c6 0%, #ff2c34 100%)", boxShadow: "0 8px 40px rgba(83,25,198,0.5), 0 0 80px rgba(255,44,52,0.2)" }}
            onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.06, boxShadow: "0 12px 60px rgba(83,25,198,0.7), 0 0 100px rgba(255,44,52,0.4)", duration: 0.3 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, boxShadow: "0 8px 40px rgba(83,25,198,0.5), 0 0 80px rgba(255,44,52,0.2)", duration: 0.3 })}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="currentColor" />
            </svg>
            {t.cta.btn}
          </Link>

          <div className="mt-10 flex flex-wrap justify-center gap-8">
            {[
              { icon: "📍", label: t.cta.info1 },
              { icon: "🕐", label: t.cta.info2 },
              { icon: "✅", label: t.cta.info3 },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                <span>{item.icon}</span>{item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

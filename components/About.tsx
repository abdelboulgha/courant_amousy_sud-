"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t, isRTL } = useLang();

  const values = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 3 L19.5 12 L29.5 12 L21.5 18 L24.5 28 L16 22 L7.5 28 L10.5 18 L2.5 12 L12.5 12 Z"
            fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 8 L18 14 L24 14 L19.5 17.5 L21 23 L16 19.5 L11 23 L12.5 17.5 L8 14 L14 14 Z" fill="currentColor" />
        </svg>
      ),
      title: t.about.val1t,
      desc: t.about.val1d,
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M18 4 L10 17 L16 17 L14 28 L22 15 L16 15 Z" fill="currentColor" />
          <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
        </svg>
      ),
      title: t.about.val2t,
      desc: t.about.val2d,
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M16 8 L16 16 L22 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="16" r="2" fill="currentColor" />
        </svg>
      ),
      title: t.about.val3t,
      desc: t.about.val3d,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
          gsap.fromTo(textRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 });
        },
      });
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        ScrollTrigger.create({
          trigger: card, start: "top 88%",
          onEnter: () => {
            gsap.fromTo(card, { y: 60, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.4)", delay: i * 0.12 });
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" style={{ background: "#0c0c22" }} dir={isRTL ? "rtl" : "ltr"}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px opacity-30"
        style={{ background: "linear-gradient(90deg, transparent, #5319c6, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: "rgba(83,25,198,0.15)", border: "1px solid rgba(83,25,198,0.3)", color: "#a78bfa" }}>
            {t.about.badge}
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6" style={{ fontWeight: 900 }}>
            {t.about.title1}{" "}
            <span style={{ color: "#ff2c34" }}>{t.about.title2}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div className={isRTL ? "text-right" : ""}>
            <p ref={textRef} className="text-lg text-gray-300 leading-relaxed mb-8">
              <span className="font-bold text-white">Courant Amousy Sud</span>{" "}
              {t.about.desc1}{" "}
              <span style={{ color: "#c084fc" }}>{t.about.desc1b}</span>{" "}
              {t.about.desc1c}{" "}
              <span style={{ color: "#c084fc" }}>{t.about.desc1d}</span>.
            </p>
            <p className="text-base text-gray-400 leading-relaxed mb-10">{t.about.desc2}</p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { v: t.about.stat1v, l: t.about.stat1l },
                { v: t.about.stat2v, l: t.about.stat2l },
                { v: t.about.stat3v, l: t.about.stat3l },
                { v: t.about.stat4v, l: t.about.stat4l },
              ].map((item) => (
                <div key={item.l} className="p-4 rounded-xl"
                  style={{ background: "rgba(83,25,198,0.1)", border: "1px solid rgba(83,25,198,0.2)" }}>
                  <div className="font-black text-lg" style={{ color: "#ff2c34" }}>{item.v}</div>
                  <div className="text-sm text-gray-400 font-medium">{item.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Values cards */}
          <div className="flex flex-col gap-5">
            {values.map((val, i) => (
              <div
                key={val.title}
                ref={(el) => { cardsRef.current[i] = el; }}
                className={`card group flex items-start gap-5 p-6 rounded-2xl cursor-default ${isRTL ? "flex-row-reverse" : ""}`}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(83,25,198,0.2)", backdropFilter: "blur(8px)", opacity: 0 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,44,52,0.4)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(83,25,198,0.12)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(255,44,52,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid rgba(83,25,198,0.2)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(83,25,198,0.25)", color: "#a78bfa" }}>
                  {val.icon}
                </div>
                <div className={isRTL ? "text-right" : ""}>
                  <h3 className="font-black text-xl text-white mb-1.5">{val.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

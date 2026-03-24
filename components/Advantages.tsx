"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const ICONS = [
  // Techniciens Qualifiés - shield badge
  <svg key="1" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  // Équipements Haut de Gamme - cpu / settings
  <svg key="2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>,
  // Intervention Rapide - clock fast
  <svg key="3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
    <path d="M16.5 4.5 20 8" />
    <path d="M20 4.5 16.5 8" />
  </svg>,
  // Solutions Sur-Mesure - target
  <svg key="4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>,
];

export default function Advantages() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Title
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(titleRef.current?.children || [], 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
          );
        }
      });

      // Reveal Cards
      const cards = cardsRef.current?.querySelectorAll(".adv-card");
      if (cards) {
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(cards, 
              { y: 50, opacity: 0 }, 
              { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "back.out(1.2)" }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-black relative" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div ref={titleRef} className={`mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          <div className="relative">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#ff2c34] flex items-center gap-4">
              <span className="w-10 h-[2px] bg-[#ff2c34]"></span>
              {t.advantages.badge}
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
              {t.advantages.title}
            </h2>
          </div>
          <p className="text-base max-w-md leading-relaxed text-[#a0a0c0]">
            {t.advantages.sub}
          </p>
        </div>

        {/* Features Grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {t.advantages.items.map((item, i) => (
            <div 
              key={i} 
              className="adv-card group relative p-8 bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#5319c6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-white/10 group-hover:bg-[#ff2c34] transition-colors duration-500" />
              
              <div className={`relative z-10 flex flex-col h-full ${isRTL ? "items-end text-right" : "items-start text-left"}`}>
                
                {/* Number & Icon */}
                <div className={`flex items-center justify-between w-full mb-8 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                  <span className="text-5xl font-black text-transparent opacity-20" style={{ WebkitTextStroke: "1px white" }}>
                    0{i + 1}
                  </span>
                  <div className="w-14 h-14 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-[#ff2c34] group-hover:scale-110 group-hover:border-[#5319c6] group-hover:text-[#5319c6] transition-all duration-500">
                    {ICONS[i]}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:-translate-y-1 transition-transform duration-500">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                  {item.desc}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

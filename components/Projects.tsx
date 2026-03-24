"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const PROJECT_COLORS = [
  { bg: "#5319c6", tag: "rgba(255,255,255,0.15)" },
  { bg: "#ff2c34", tag: "rgba(255,255,255,0.15)" },
  { bg: "#1a1a3a", tag: "rgba(83,25,198,0.4)" },
  { bg: "#0f1f0f", tag: "rgba(34,197,94,0.3)" },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headRef.current,
        start: "top 88%",
        onEnter: () => gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }),
      });
      const cards = gridRef.current?.querySelectorAll(".proj-card");
      if (cards) {
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 85%",
          onEnter: () => gsap.fromTo(cards, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" }),
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
              {t.projects.badge}
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              {t.projects.title}
            </h2>
          </div>
          <p className="text-sm max-w-xs leading-relaxed" style={{ color: "#666688" }}>
            {t.projects.sub}
          </p>
        </div>

        {/* Grid 2+2 */}
        <div ref={gridRef} className="grid sm:grid-cols-2 gap-5">
          {t.projects.items.map((proj, i) => (
            <div key={i}
              className="proj-card project-card group relative overflow-hidden rounded-sm opacity-0"
              style={{ minHeight: i < 2 ? 340 : 260 }}
            >
              {/* Color background */}
              <div className="absolute inset-0 transition-transform duration-500"
                style={{ background: PROJECT_COLORS[i].bg }} />

              {/* Overlay on hover */}
              <div className="img-overlay absolute inset-0" style={{ background: "rgba(0,0,0,0.35)", opacity: 1 }} />

              {/* Decorative grid on bg */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }} />

              {/* Content */}
              <div className={`absolute inset-0 p-7 flex flex-col justify-between ${isRTL ? "items-end text-right" : ""}`}>
                {/* Tag */}
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-white rounded-sm"
                  style={{ background: PROJECT_COLORS[i].tag, backdropFilter: "blur(4px)" }}>
                  {proj.tag}
                </span>

                {/* Bottom */}
                <div>
                  <div className="text-xl font-black text-white leading-tight mb-2">{proj.title}</div>
                  <div className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>{proj.desc}</div>
                  <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {proj.meta}
                  </div>
                </div>
              </div>

              {/* Hover top border */}
              <div className="absolute top-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ background: "#ff2c34" }} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-10 flex ${isRTL ? "justify-end" : ""}`}>
          <Link href="/projects"
            className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest transition-all duration-200 hover:gap-4"
            style={{ color: "#5319c6" }}>
            {isRTL ? (
              <><span>←</span><span>{t.projects.viewAll}</span></>
            ) : (
              <><span>{t.projects.viewAll}</span><span>→</span></>
            )}
          </Link>
        </div>

      </div>
    </section>
  );
}

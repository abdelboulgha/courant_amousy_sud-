"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const projectGradients = [
  "linear-gradient(135deg, #5319c6 0%, #1a0550 100%)",
  "linear-gradient(135deg, #ff2c34 0%, #7c0a0a 100%)",
  "linear-gradient(135deg, #1d4ed8 0%, #07071a 100%)",
];
const projectIcons = ["🏠", "🏭", "🏢"];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t, isRTL } = useLang();

  const projects = [
    {
      tag: t.projects.tag1, title: t.projects.p1t, desc: t.projects.p1d,
      stats: [{ v: t.projects.p1s1v, l: t.projects.p1s1l }, { v: t.projects.p1s2v, l: t.projects.p1s2l }],
    },
    {
      tag: t.projects.tag2, title: t.projects.p2t, desc: t.projects.p2d,
      stats: [{ v: t.projects.p2s1v, l: t.projects.p2s1l }, { v: t.projects.p2s2v, l: t.projects.p2s2l }],
    },
    {
      tag: t.projects.tag3, title: t.projects.p3t, desc: t.projects.p3d,
      stats: [{ v: t.projects.p3s1v, l: t.projects.p3s1l }, { v: t.projects.p3s2v, l: t.projects.p3s2l }],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headingRef.current, start: "top 85%",
        onEnter: () => gsap.fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }),
      });
      ScrollTrigger.create({
        trigger: trackRef.current, start: "top 85%",
        onEnter: () => gsap.fromTo(cardsRef.current.filter(Boolean), { x: isRTL ? -80 : 80, opacity: 0, scale: 0.95 }, { x: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" }),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" style={{ background: "#0c0c22" }} dir={isRTL ? "rtl" : "ltr"}>
      <div className="absolute top-0 left-0 w-full h-px opacity-30"
        style={{ background: "linear-gradient(90deg, transparent, #ff2c34, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headingRef} className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: "rgba(83,25,198,0.15)", border: "1px solid rgba(83,25,198,0.3)", color: "#a78bfa" }}>
              {t.projects.badge}
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white" style={{ fontWeight: 900 }}>
              {t.projects.title1}{" "}
              <span style={{ color: "#ff2c34" }}>{t.projects.title2}</span>
            </h2>
          </div>
          <Link href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 whitespace-nowrap"
            style={{ background: "rgba(83,25,198,0.2)", border: "1px solid rgba(83,25,198,0.4)", color: "#c084fc" }}>
            {t.projects.viewAll}
          </Link>
        </div>

        <div ref={trackRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ opacity: 0, border: "1px solid rgba(255,255,255,0.08)" }}
              onMouseEnter={(e) => {
                const img = (e.currentTarget as HTMLElement).querySelector(".proj-img") as HTMLElement;
                if (img) gsap.to(img, { scale: 1.08, duration: 0.5 });
              }}
              onMouseLeave={(e) => {
                const img = (e.currentTarget as HTMLElement).querySelector(".proj-img") as HTMLElement;
                if (img) gsap.to(img, { scale: 1, duration: 0.5 });
              }}
            >
              <div className="relative h-52 overflow-hidden">
                <div className="proj-img w-full h-full flex items-center justify-center text-7xl"
                  style={{ background: projectGradients[i] }}>
                  <span style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))" }}>{projectIcons[i]}</span>
                </div>
                <div className={`absolute top-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isRTL ? "right-4" : "left-4"}`}
                  style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}>
                  {project.tag}
                </div>
              </div>
              <div className="p-6" style={{ background: "rgba(255,255,255,0.03)" }}>
                <h3 className={`font-black text-lg text-white mb-2 leading-snug ${isRTL ? "text-right" : ""}`}>{project.title}</h3>
                <p className={`text-gray-400 text-sm leading-relaxed mb-5 ${isRTL ? "text-right" : ""}`}>{project.desc}</p>
                <div className={`flex gap-4 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                  {project.stats.map((stat) => (
                    <div key={stat.l} className={isRTL ? "text-right" : ""}>
                      <div className="font-black text-base" style={{ color: "#ff2c34" }}>{stat.v}</div>
                      <div className="text-xs text-gray-500">{stat.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

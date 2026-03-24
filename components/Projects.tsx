"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// One Unsplash image per project
const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75", // residential / electrical
  "https://images.unsplash.com/photo-1566073771259-470e8a27d08a?auto=format&fit=crop&w=1200&q=75", // hotel lobby / AC
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=75", // modern villa
  "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=75",   // CCTV / security
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=75", // painting / interior
];

const TAG_COLORS = ["#5319c6", "#ff2c34", "#0f4c81", "#1a3a1a", "#3a1a3a"];

export default function Projects() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headRef      = useRef<HTMLDivElement>(null);
  const wrapRef      = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLang();

  useEffect(() => {
    // Header fade-in (always)
    const ctxHead = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headRef.current,
        start: "top 88%",
        onEnter: () => gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }),
      });
    });

    // Horizontal scroll (desktop only)
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const wrap  = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;

      const scrollDist = () => track.scrollWidth - wrap.offsetWidth;

      const tween = gsap.to(track, {
        x: () => -scrollDist(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${scrollDist()}`,
          invalidateOnRefresh: true,
        },
      });

      return () => { tween.kill(); };
    });

    return () => { ctxHead.revert(); mm.revert(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#0d0d24" }} dir={isRTL ? "rtl" : "ltr"}>

      {/* ── Header ─────────────────────────────────── */}
      <div
        ref={headRef}
        className={`max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 opacity-0 ${isRTL ? "sm:flex-row-reverse" : ""}`}
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#ff2c34" }}>
            {t.projects.badge}
          </span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            {t.projects.title}
          </h2>
        </div>
        <div className={`flex flex-col gap-3 ${isRTL ? "items-end" : ""}`}>
          <p className="text-sm max-w-xs leading-relaxed" style={{ color: "#8888aa" }}>
            {t.projects.sub}
          </p>
          <Link
            href="/projects"
            className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 hover:gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
            style={{ color: "#5319c6" }}
          >
            {isRTL ? (
              <><span>←</span><span>{t.projects.viewAll}</span></>
            ) : (
              <><span>{t.projects.viewAll}</span><span>→</span></>
            )}
          </Link>
        </div>
      </div>

      {/* ── Horizontal scroll wrapper ───────────────── */}
      <div
        ref={wrapRef}
        className="overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Track — flex row of cards */}
        <div
          ref={trackRef}
          className="proj-track flex gap-4 h-full"
          style={{ paddingLeft: "clamp(16px, 4vw, 48px)", paddingRight: 40, width: "max-content" }}
        >
          {t.projects.items.map((proj, i) => (
            <div
              key={i}
              className="project-card group relative overflow-hidden shrink-0 rounded-sm"
              style={{ width: "clamp(280px, 35vw, 520px)", height: "100%" }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${PROJECT_IMAGES[i]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: TAG_COLORS[i],
                }}
              />

              {/* Gradient overlay */}
              <div
                className="img-overlay absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(7,7,26,0.92) 30%, rgba(7,7,26,0.25) 100%)",
                }}
              />

              {/* Red top border reveal on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                style={{ background: "#ff2c34" }}
              />

              {/* Content */}
              <div className={`absolute inset-0 p-8 flex flex-col justify-between ${isRTL ? "items-end text-right" : ""}`}>
                {/* Tag */}
                <span
                  className="inline-block self-start px-3 py-1 text-xs font-bold uppercase tracking-widest text-white rounded-sm"
                  style={{ background: "rgba(83,25,198,0.55)", backdropFilter: "blur(4px)" }}
                >
                  {proj.tag}
                </span>

                {/* Bottom */}
                <div>
                  <div className="text-2xl font-black text-white leading-tight mb-3">
                    {proj.title}
                  </div>
                  <div className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {proj.desc}
                  </div>
                  <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {proj.meta}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile-only vertical grid fallback ─────── */}
      <div className="lg:hidden max-w-7xl mx-auto px-6 pb-16 mt-4">
        <div className="grid sm:grid-cols-2 gap-5">
          {t.projects.items.map((proj, i) => (
            <div
              key={`m${i}`}
              className="project-card group relative overflow-hidden rounded-sm"
              style={{ height: 260 }}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${PROJECT_IMAGES[i]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: TAG_COLORS[i],
                }}
              />
              <div className="img-overlay absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,7,26,0.9) 30%, transparent 100%)" }} />
              <div className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ background: "#ff2c34" }} />
              <div className={`absolute inset-0 p-6 flex flex-col justify-between ${isRTL ? "items-end text-right" : ""}`}>
                <span className="inline-block self-start px-3 py-1 text-xs font-bold uppercase tracking-widest text-white" style={{ background: "rgba(83,25,198,0.55)" }}>
                  {proj.tag}
                </span>
                <div>
                  <div className="text-xl font-black text-white leading-tight mb-2">{proj.title}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{proj.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

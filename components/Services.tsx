"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Unsplash images per service (CSS background-image — no Next.js config needed)
const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=75", // electrician
  "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=75", // plumber
  "https://images.unsplash.com/photo-1631545806609-3b95d53e7e7b?auto=format&fit=crop&w=800&q=75", // AC
  "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=75",   // CCTV
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=75",   // alarm
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=75", // painting
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=75", // construction
];

// Fallback gradient per service (shown if image fails to load)
const SERVICE_FALLBACKS = [
  "#1a0a3a", "#0a1f3a", "#0a2a1a", "#1a1a0a", "#2a0a0a", "#1a0a2a", "#0a1a0a",
];

// Service icons (SVG)
const ICONS = [
  // Électricité — bolt
  <svg key="e" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>,
  // Plomberie — droplet
  <svg key="p" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>,
  // Climatisation — wind
  <svg key="c" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
  </svg>,
  // Vidéosurveillance — camera
  <svg key="v" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>,
  // Système d'alarme — shield
  <svg key="a" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
  // Peinture & Plâtre — paintbrush
  <svg key="pt" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3z" />
    <path d="M9 8c-2 3-4 3.5-7 4l8 8c1-.5 3.5-2 4-7" />
    <path d="M14.5 17.5 4.5 15" />
  </svg>,
  // Travaux divers — wrench
  <svg key="t" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>,
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef   = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headRef.current,
        start: "top 88%",
        onEnter: () => gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }),
      });

      const cards = gridRef.current?.querySelectorAll(".svc-img-card");
      if (cards) {
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 85%",
          onEnter: () =>
            gsap.fromTo(cards, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.07, ease: "power3.out" }),
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24" style={{ background: "#07071a" }} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div ref={headRef} className={`mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#ff2c34" }}>
              {t.services.badge}
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              {t.services.title}
            </h2>
          </div>
          <p className="text-sm max-w-xs leading-relaxed" style={{ color: "#8888aa" }}>
            {t.services.sub}
          </p>
        </div>

        {/* Grid — 2 cols on sm, 3 on lg, 4 on xl */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {t.services.items.map((svc, i) => (
            <div
              key={i}
              className="svc-img-card group relative overflow-hidden opacity-0 rounded-sm"
              style={{ height: 320 }}
            >
              {/* Background image with zoom on hover */}
              <div
                className="svc-img-bg absolute inset-0"
                style={{
                  backgroundImage: `url(${SERVICE_IMAGES[i]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: SERVICE_FALLBACKS[i],
                }}
              />

              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(7,7,26,0.95) 35%, rgba(7,7,26,0.35) 100%)",
                }}
              />

              {/* Red glow border on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                style={{ boxShadow: "inset 0 0 0 2px #ff2c34" }}
              />

              {/* Content */}
              <div className={`absolute inset-0 p-6 flex flex-col justify-between ${isRTL ? "items-end text-right" : ""}`}>
                {/* Top: number + icon */}
                <div className={`flex items-center justify-between w-full ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span
                    className="text-xs font-bold tracking-[0.2em]"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {svc.num}
                  </span>
                  <span
                    className="w-9 h-9 flex items-center justify-center rounded-sm transition-colors duration-200"
                    style={{ background: "rgba(83,25,198,0.55)", color: "#fff" }}
                  >
                    {ICONS[i]}
                  </span>
                </div>

                {/* Bottom: title + desc + link */}
                <div>
                  <h3 className="text-lg font-black text-white leading-tight mb-2">
                    {svc.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed mb-4 line-clamp-3"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {svc.desc}
                  </p>
                  <Link
                    href="/services"
                    className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 group-hover:gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
                    style={{ color: "#ff2c34" }}
                  >
                    {isRTL ? (
                      <><span>{svc.link}</span><span>←</span></>
                    ) : (
                      <><span>{svc.link}</span><span>→</span></>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

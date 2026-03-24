"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Local images per service
const SERVICE_IMAGES = [
  "/assets/images/services/electrical.png",
  "/assets/images/services/plumbing.png",
  "/assets/images/services/ac.png",
  "/assets/images/services/surveillance.png",
  "/assets/images/services/alarm.png",
  "/assets/images/services/finishing.png",
  "/assets/images/services/zellige.png",
  "/assets/images/services/construction.png",
];

// Fallback gradient per service
const SERVICE_FALLBACKS = [
  "#1a0a3a", "#0a1f3a", "#0a2a1a", "#1a1a0a", "#2a0a0a", "#1a0a2a", "#1a150a", "#0a1a0a",
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
  // Plâtre & Zellige — grid
  <svg key="z" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>,
  // Travaux divers — wrench
  <svg key="t" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>,
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef   = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      ScrollTrigger.create({
        trigger: headRef.current,
        start: "top 88%",
        onEnter: () => gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }),
      });

      // Cinematic Parallax Background effect for the whole section
      gsap.to(".bg-parallax", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Cards Animation
      const cards = containerRef.current?.querySelectorAll(".svc-img-card");
      if (cards && cards.length > 0) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 85%",
          onEnter: () =>
            gsap.fromTo(
              cards, 
              { y: 80, opacity: 0, scale: 0.95 }, 
              { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.05, ease: "power4.out" }
            ),
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const row1 = t.services.items.slice(0, 4);
  const row2 = t.services.items.slice(4, 8);

  const renderCard = (svc: any, originalIndex: number, uniqueKey: string) => (
    <div
      key={uniqueKey}
      className="svc-img-card group relative overflow-hidden rounded-xl bg-black border border-[#ffffff10] shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(83,25,198,0.3)] w-[85vw] sm:w-[320px] lg:w-[350px] shrink-0"
      style={{ height: 400 }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background image container */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110"
        style={{ backgroundColor: SERVICE_FALLBACKS[originalIndex] }}
      >
        <Image 
          src={SERVICE_IMAGES[originalIndex]}
          alt={svc.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Dark cinematic gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500 ease-in-out group-hover:opacity-90"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.95) 10%, rgba(83,25,198,0.4) 60%, rgba(0,0,0,0.1) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      {/* Red glow border on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 border-2 border-[#ff2c34] rounded-xl z-20"
        style={{ boxShadow: "inset 0 0 20px rgba(255,44,52,0.5)" }}
      />

      {/* Content */}
      <div className={`relative z-10 h-full p-8 flex flex-col justify-between ${isRTL ? "items-end text-right" : ""}`}>
        {/* Top: number + icon */}
        <div className={`flex items-start justify-between w-full ${isRTL ? "flex-row-reverse" : ""}`}>
          <span
            className="text-4xl font-black text-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-80"
            style={{ WebkitTextStroke: "1px white" }}
          >
            {svc.num}
          </span>
          <div className="relative group/icon">
             <span
               className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 backdrop-blur-md bg-white/10 group-hover:bg-[#ff2c34] group-hover:shadow-[0_0_15px_#ff2c34] text-white"
             >
               {ICONS[originalIndex]}
             </span>
          </div>
        </div>

        {/* Bottom: title + desc + link */}
        <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
          <h3 className="text-2xl font-black text-white leading-tight mb-3 drop-shadow-md">
            {svc.title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-6 line-clamp-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
          >
            {svc.desc}
          </p>
          <Link
            href="/services"
            className={`inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${isRTL ? "flex-row-reverse" : ""}`}
            style={{ color: "#ff2c34" }}
          >
            {isRTL ? (
              <>
                <span className="relative overflow-hidden group-hover:text-white transition-colors duration-300">
                  {svc.link}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff2c34] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300"></span>
                </span>
                <span className="transform group-hover:-translate-x-2 transition-transform duration-300 text-white">←</span>
              </>
            ) : (
              <>
                <span className="relative overflow-hidden group-hover:text-white transition-colors duration-300">
                  {svc.link}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff2c34] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </span>
                <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-white">→</span>
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-black" dir={isRTL ? "rtl" : "ltr"}>
      {/* Background Cinematic Glows */}
      <div className="bg-parallax absolute inset-0 pointer-events-none opacity-50 z-0 flex items-center justify-center">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-[#5319c6] rounded-full blur-[12rem] mix-blend-screen opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-[#ff2c34] rounded-full blur-[12rem] mix-blend-screen opacity-20"></div>
      </div>

      <div className="relative z-10 2xl:max-w-[1400px] mx-auto py-10">
        
        {/* Header - kept inside px bounds */}
        <div ref={headRef} className={`mb-16 px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 opacity-0 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          <div className="relative">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#ff2c34] flex items-center gap-4">
              <span className="w-10 h-[2px] bg-[#ff2c34]"></span>
              {t.services.badge}
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
              {t.services.title}
            </h2>
          </div>
          <p className="text-base max-w-md leading-relaxed text-[#a0a0c0]">
            {t.services.sub}
          </p>
        </div>

        {/* Marquee Container */}
        <div ref={containerRef} className="flex flex-col gap-6 overflow-hidden w-full relative" dir="ltr">
          <style>{`
            @keyframes marqueeRight {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0%); }
            }
            @keyframes marqueeLeft {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
          
          {/* Edge fading gradients to make marquee disappear smoothly */}
          <div className="absolute top-0 left-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          {/* Row 1: Scroll Left (moves right-to-left) */}
          <div className="flex w-max animate-[marqueeLeft_35s_linear_infinite] hover:[animation-play-state:paused]">
             <div className="flex gap-6 pr-6 w-max">
                {row1.map((svc, idx) => renderCard(svc, idx, `r11-${idx}`))}
             </div>
             <div className="flex gap-6 pr-6 w-max">
                {row1.map((svc, idx) => renderCard(svc, idx, `r12-${idx}`))}
             </div>
          </div>

          {/* Row 2: Scroll Right (moves left-to-right) */}
          <div className="flex w-max animate-[marqueeRight_35s_linear_infinite] hover:[animation-play-state:paused]">
             <div className="flex gap-6 pr-6 w-max">
                {row2.map((svc, idx) => renderCard(svc, idx + 4, `r21-${idx}`))}
             </div>
             <div className="flex gap-6 pr-6 w-max">
                {row2.map((svc, idx) => renderCard(svc, idx + 4, `r22-${idx}`))}
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}

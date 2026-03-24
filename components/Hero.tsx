"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imgColRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power3.out" }
      )
      .fromTo(tagRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2"
      )
      .fromTo(h1Ref.current?.children ?? [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" }, "-=0.1"
      )
      .fromTo(subRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3"
      )
      .fromTo(btnsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2"
      )
      .fromTo(imgColRef.current,
        { x: isRTL ? -60 : 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "<-0.4"
      )
      .fromTo(statsRef.current?.children ?? [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: "power2.out" }, "-=0.3"
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-20"
      style={{ background: "#07071a" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(83,25,198,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(83,25,198,0.06) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />

      {/* Red vertical accent */}
      <div className="absolute top-0 bottom-0 pointer-events-none"
        style={{ [isRTL ? "right" : "left"]: "calc(58% - 1px)", width: 1, background: "linear-gradient(to bottom, transparent, rgba(255,44,52,0.15), transparent)", display: "none" }} />

      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 lg:px-8 flex items-center">
        <div className="w-full grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center py-16 lg:py-24">

          {/* Left content */}
          <div>
            {/* Accent line */}
            <div ref={lineRef} className="line-draw hr-accent mb-6" style={{ transformOrigin: isRTL ? "right" : "left" }} />

            {/* Tagline */}
            <div ref={tagRef} className="text-sm font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: "#8888aa" }}>
              {t.hero.tagline}
            </div>

            {/* Headline */}
            <h1 ref={h1Ref} className="overflow-hidden">
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-none tracking-tight">
                {t.hero.h1a}
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight" style={{ color: "#ff2c34" }}>
                {t.hero.h1b}
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-none tracking-tight">
                {t.hero.h1c}
              </span>
            </h1>

            {/* Sub */}
            <p ref={subRef} className="mt-8 text-base lg:text-lg leading-relaxed max-w-lg" style={{ color: "#8888aa" }}>
              {t.hero.sub}
            </p>

            {/* Buttons */}
            <div ref={btnsRef} className={`mt-10 flex flex-wrap gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Link href="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 hover:opacity-80"
                style={{ background: "#5319c6" }}>
                {t.hero.btn1}
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-200 hover:bg-white hover:text-gray-900"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff" }}>
                {t.hero.btn2}
              </Link>
            </div>
          </div>

          {/* Right — Logo display */}
          <div ref={imgColRef} className="hidden lg:flex flex-col items-center justify-center">
            <div className="relative" style={{ width: 320, height: 280 }}>
              {/* Purple card behind */}
              <div className="absolute inset-0 rounded-2xl" style={{
                background: "linear-gradient(135deg, rgba(83,25,198,0.15) 0%, rgba(83,25,198,0.05) 100%)",
                border: "1px solid rgba(83,25,198,0.2)",
              }} />
              {/* Red accent corner */}
              <div className="absolute top-0 left-0 w-12 h-1 rounded-tr-sm" style={{ background: "#ff2c34" }} />
              <div className="absolute top-0 left-0 w-1 h-12" style={{ background: "#ff2c34" }} />
              {/* Logo */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <Image src="/assets/LOGO-PNG.png" alt="CAS" width={260} height={200} style={{ objectFit: "contain" }} priority />
              </div>
            </div>

            {/* Service pills */}
            <div className="mt-6 flex flex-col gap-2 w-full" style={{ maxWidth: 320 }}>
              {t.ticker.map((item, i) => (
                <div key={i}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm font-medium"
                  style={{
                    background: i === 0 ? "rgba(255,44,52,0.1)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${i === 0 ? "rgba(255,44,52,0.3)" : "rgba(255,255,255,0.07)"}`,
                    color: i === 0 ? "#ff6b6b" : "#8888aa",
                  }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: i === 0 ? "#ff2c34" : "#5319c6" }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div ref={statsRef} className="relative z-10 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4" dir={isRTL ? "rtl" : "ltr"}>
          {t.stats.map((stat, i) => (
            <div key={i}
              className="py-6 px-4 flex flex-col gap-1 border-r last:border-r-0"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="text-2xl lg:text-3xl font-black" style={{ color: i % 2 === 0 ? "#ff2c34" : "#5319c6" }}>
                {stat.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "#8888aa" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

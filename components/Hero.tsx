"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const boltRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t, isRTL } = useLang();

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string };
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.5 ? "#5319c6" : "#ff2c34",
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animId); };
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });
      tl.fromTo(titleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" })
        .fromTo(subtitleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.4")
        .fromTo(btnsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3")
        .fromTo(boltRef.current, { scale: 0, rotation: -20, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.5)" }, "-=0.8");

      gsap.to(boltRef.current, { y: -20, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(ringRef.current, { rotation: 360, duration: 20, ease: "none", repeat: -1 });
      gsap.to(ringRef.current, { scale: 1.05, opacity: 0.7, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #07071a 0%, #13073a 50%, #1a0550 100%)" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }} />

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(83,25,198,0.25) 0%, transparent 70%)" }} />

      {/* Decorative bolt — opposite side for RTL */}
      <div
        ref={boltRef}
        className={`absolute top-1/2 -translate-y-1/2 hidden lg:block ${isRTL ? "left-0 -translate-x-1/4" : "right-0 translate-x-1/4"}`}
        style={{ width: 520, height: 520 }}
      >
        <div ref={ringRef} className="absolute inset-0"
          style={{ borderRadius: "50%", border: "2px dashed rgba(83,25,198,0.5)" }} />
        <div className="absolute inset-8"
          style={{ borderRadius: "50%", border: "1px solid rgba(255,44,52,0.25)" }} />
        <div className="absolute inset-16 pulse-glow"
          style={{ borderRadius: "50%", background: "radial-gradient(circle, rgba(83,25,198,0.35) 0%, transparent 70%)" }} />
        <svg
          className="absolute blink"
          width="280" height="280" viewBox="0 0 100 130" fill="none"
          style={{
            filter: "drop-shadow(0 0 30px rgba(255,44,52,0.7)) drop-shadow(0 0 60px rgba(83,25,198,0.5))",
            top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          }}
        >
          <path d="M60 5 L28 62 L50 62 L40 125 L72 58 L50 58 Z" fill="url(#boltGrad)" />
          <defs>
            <linearGradient id="boltGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff2c34" />
              <stop offset="100%" stopColor="#5319c6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center pt-24 pb-16">
        <div className={isRTL ? "text-right" : "text-left"}>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ background: "rgba(83,25,198,0.2)", border: "1px solid rgba(83,25,198,0.4)", color: "#c084fc" }}
          >
            <span className="blink">⚡</span> {t.hero.badge}
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6"
            style={{ fontWeight: 900 }}
          >
            {t.hero.title1}{" "}
            <span style={{ background: "linear-gradient(135deg, #ff2c34, #ff6b35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t.hero.title2}
            </span>{" "}
            <br />
            {t.hero.title3}
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl">
            {t.hero.subtitle}
          </p>

          {/* Buttons */}
          <div ref={btnsRef} className={`flex flex-wrap gap-4 ${isRTL ? "justify-end" : ""}`}>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white uppercase tracking-wider transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #5319c6, #7c3aed)", boxShadow: "0 4px 24px rgba(83,25,198,0.5)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 36px rgba(83,25,198,0.8)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(83,25,198,0.5)"; }}
            >
              {t.hero.btn1}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
              style={{ background: "transparent", border: "2px solid rgba(255,44,52,0.6)", color: "#fff" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,44,52,0.15)"; (e.currentTarget as HTMLElement).style.borderColor = "#ff2c34"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,44,52,0.6)"; }}
            >
              {t.hero.btn2}
            </Link>
          </div>

          {/* Stats */}
          <div className={`mt-12 flex flex-wrap gap-8 ${isRTL ? "justify-end" : ""}`}>
            {[
              { value: t.hero.stat1v, label: t.hero.stat1l },
              { value: t.hero.stat2v, label: t.hero.stat2l },
              { value: t.hero.stat3v, label: t.hero.stat3l },
            ].map((stat) => (
              <div key={stat.label} className={isRTL ? "text-right" : ""}>
                <div className="text-3xl font-black" style={{ color: "#ff2c34" }}>{stat.value}</div>
                <div className="text-sm text-gray-400 font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile bolt */}
        <div className="lg:hidden flex justify-center">
          <svg className="blink float" width="180" height="220" viewBox="0 0 100 130" fill="none"
            style={{ filter: "drop-shadow(0 0 20px rgba(255,44,52,0.8)) drop-shadow(0 0 40px rgba(83,25,198,0.5))" }}>
            <path d="M60 5 L28 62 L50 62 L40 125 L72 58 L50 58 Z" fill="url(#boltGradMobile)" />
            <defs>
              <linearGradient id="boltGradMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff2c34" /><stop offset="100%" stopColor="#5319c6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs text-gray-400 uppercase tracking-widest">{t.hero.scroll}</span>
        <div className="w-0.5 h-10 rounded-full" style={{ background: "linear-gradient(to bottom, #5319c6, transparent)" }} />
      </div>
    </section>
  );
}

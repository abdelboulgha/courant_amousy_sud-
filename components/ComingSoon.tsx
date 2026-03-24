"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLang } from "@/contexts/LanguageContext";

interface ComingSoonProps {
  titleKey: "about" | "services" | "projects" | "contact";
}

export default function ComingSoon({ titleKey }: ComingSoonProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const boltRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLang();

  const title = t.pages[titleKey];
  const subtitle = t.pages[`${titleKey}Sub` as keyof typeof t.pages];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "back.out(1.2)", delay: 0.4 });
      gsap.to(boltRef.current, { y: -16, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #07071a 0%, #13073a 50%, #1a0550 100%)" }}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(83,25,198,0.2) 0%, transparent 70%)" }} />

        <div ref={contentRef} className="relative z-10 text-center px-6 max-w-2xl">
          <div ref={boltRef} className="mb-8 flex justify-center">
            <svg width="64" height="80" viewBox="0 0 100 130" fill="none"
              style={{ filter: "drop-shadow(0 0 20px rgba(255,44,52,0.8)) drop-shadow(0 0 40px rgba(83,25,198,0.5))" }}>
              <path d="M60 5 L28 62 L50 62 L40 125 L72 58 L50 58 Z" fill="url(#csGrad)" />
              <defs>
                <linearGradient id="csGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff2c34" /><stop offset="100%" stopColor="#5319c6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ background: "rgba(255,44,52,0.1)", border: "1px solid rgba(255,44,52,0.3)", color: "#f87171" }}>
            🚧 {t.comingSoon.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ fontWeight: 900 }}>
            {title}
          </h1>
          <p className="text-lg text-gray-400 mb-10">{subtitle}</p>

          <Link href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white uppercase tracking-wider transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #5319c6, #ff2c34)", boxShadow: "0 4px 24px rgba(83,25,198,0.5)" }}>
            {isRTL ? `${t.comingSoon.back} ←` : `← ${t.comingSoon.back}`}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

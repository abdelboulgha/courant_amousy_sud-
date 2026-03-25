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
  const ref = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLang();
  const title = t.pages[titleKey];
  const sub = t.pages[`${titleKey}Sub` as keyof typeof t.pages];

  useEffect(() => {
    gsap.fromTo(ref.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.3 });
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center" style={{ background: "#07071a" }} dir={isRTL ? "rtl" : "ltr"}>
        <div ref={ref} className={`max-w-xl px-6 text-center ${isRTL ? "text-right" : ""}`}>
          <div className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-8"
            style={{ border: "1px solid rgba(255,44,52,0.3)", color: "#ff2c34", background: "rgba(255,44,52,0.05)" }}>
            {t.comingSoon.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5 tracking-tight">{title}</h1>
          <p className="text-base leading-relaxed mb-10" style={{ color: "#8888aa" }}>{sub}</p>
          <Link href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:opacity-80"
            style={{ background: "#5319c6" }}>
            {isRTL ? <><span>{t.comingSoon.back}</span><span>←</span></> : <><span>←</span><span>{t.comingSoon.back}</span></>}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

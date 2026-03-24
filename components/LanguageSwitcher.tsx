"use client";

import { useLang } from "@/contexts/LanguageContext";
import { gsap } from "gsap";
import { useRef } from "react";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const btnRef = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    if (btnRef.current) {
      gsap.fromTo(btnRef.current, { scale: 0.9, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)" });
    }
    setLang(lang === "fr" ? "ar" : "fr");
  };

  return (
    <button
      ref={btnRef}
      onClick={toggle}
      className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all duration-150 hover:text-white"
      style={{
        border: "1px solid rgba(255,255,255,0.15)",
        color: "#aaaacc",
        background: "transparent",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,44,52,0.4)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
      aria-label="Switch language"
    >
      {lang === "fr" ? "عربي" : "FR"}
    </button>
  );
}

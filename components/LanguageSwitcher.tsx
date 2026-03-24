"use client";

import { useLang } from "@/contexts/LanguageContext";
import { gsap } from "gsap";
import { useRef } from "react";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const btnRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const next = lang === "fr" ? "ar" : "fr";

    // Quick flash animation
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 0.85, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }
      );
    }
    setLang(next);
  };

  return (
    <div ref={btnRef}>
      <button
        onClick={toggle}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
        style={{
          background: "rgba(83,25,198,0.2)",
          border: "1px solid rgba(83,25,198,0.4)",
          color: "#c084fc",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,44,52,0.15)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,44,52,0.4)";
          (e.currentTarget as HTMLElement).style.color = "#f87171";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(83,25,198,0.2)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(83,25,198,0.4)";
          (e.currentTarget as HTMLElement).style.color = "#c084fc";
        }}
        aria-label="Switch language"
      >
        {lang === "fr" ? (
          <>
            <span>🇩🇿</span>
            <span>عربي</span>
          </>
        ) : (
          <>
            <span>🇫🇷</span>
            <span>FR</span>
          </>
        )}
      </button>
    </div>
  );
}

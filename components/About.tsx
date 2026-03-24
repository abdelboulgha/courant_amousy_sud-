"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const valsRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(leftRef.current, { x: isRTL ? 50 : -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
          gsap.fromTo(rightRef.current, { x: isRTL ? -50 : 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.15 });
        },
      });
      const vals = valsRef.current?.querySelectorAll(".val-item");
      if (vals) {
        ScrollTrigger.create({
          trigger: valsRef.current,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(vals, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" });
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section ref={sectionRef} className="py-24" style={{ background: "#07071a" }} dir={isRTL ? "rtl" : "ltr"}>
      {/* Top divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-start ${isRTL ? "lg:flex-row-reverse" : ""}`}>

          {/* Left */}
          <div ref={leftRef}>
            <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#ff2c34" }}>
              {t.about.badge}
            </span>
            <h2 className={`mt-4 text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight ${isRTL ? "text-right" : ""}`}>
              {t.about.title}
            </h2>

            <div className="mt-8 space-y-4">
              <p className={`text-base leading-relaxed ${isRTL ? "text-right" : ""}`} style={{ color: "#8888aa" }}>
                {t.about.p1}
              </p>
              <p className={`text-base leading-relaxed ${isRTL ? "text-right" : ""}`} style={{ color: "#8888aa" }}>
                {t.about.p2}
              </p>
            </div>

            {/* Big accent */}
            <div className="mt-12 p-8 rounded-sm" style={{
              background: "linear-gradient(135deg, rgba(83,25,198,0.15) 0%, rgba(83,25,198,0.05) 100%)",
              border: "1px solid rgba(83,25,198,0.2)",
            }}>
              <div className="text-6xl font-black" style={{ color: "#5319c6" }}>CAS</div>
              <div className="mt-2 text-sm font-medium uppercase tracking-widest" style={{ color: "#8888aa" }}>
                Courant Amousy Sud
              </div>
              <div className="mt-4 h-px w-full" style={{ background: "rgba(83,25,198,0.2)" }} />
              <div className={`mt-4 text-sm leading-relaxed ${isRTL ? "text-right" : ""}`} style={{ color: "#8888aa" }}>
                NF C 15-100 · Qualifelec · RGE
              </div>
            </div>
          </div>

          {/* Right — Values */}
          <div ref={rightRef}>
            <div ref={valsRef} className="space-y-1">
              {t.about.vals.map((val, i) => (
                <div key={i}
                  className="val-item group flex items-start gap-5 p-6 opacity-0 transition-colors duration-200 hover:bg-white/5 rounded-sm"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="text-xs font-bold tracking-[0.2em] mt-1 flex-shrink-0" style={{ color: "#5319c6" }}>
                    {val.num}
                  </span>
                  <div className={`flex-1 ${isRTL ? "text-right" : ""}`}>
                    <div className="flex items-center gap-3 mb-2" style={{ justifyContent: isRTL ? "flex-end" : "flex-start" }}>
                      <span className="text-lg font-black text-white">{val.title}</span>
                      <span className="w-8 h-px transition-all duration-300 group-hover:w-12" style={{ background: "#ff2c34" }} />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#8888aa" }}>{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

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
  const { t, isRTL } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax glow
      gsap.to(".about-glow", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Left content fade-up
      ScrollTrigger.create({
        trigger: leftRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            leftRef.current?.children || [],
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
          );
        },
      });

      // Right values bento cards stagger
      const cards = rightRef.current?.querySelectorAll(".val-bento-card");
      if (cards) {
        ScrollTrigger.create({
          trigger: rightRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(
              cards,
              { y: 60, opacity: 0, scale: 0.95 },
              { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" }
            );
          },
        });
      }
      
      // Center dot pulse animation
      gsap.fromTo(".center-dot", 
        { scale: 0.8, opacity: 0.5 }, 
        { scale: 1.2, opacity: 1, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section ref={sectionRef} className="relative py-32 bg-[#020205] overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Cinematic Background Glows */}
      <div className="about-glow absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#5319c6] rounded-full blur-[150px] opacity-20 pointer-events-none" />
      <div className="about-glow absolute bottom-0 right-0 translate-y-1/2 w-[500px] h-[500px] bg-[#ff2c34] rounded-full blur-[150px] opacity-10 pointer-events-none delay-150" />

      {/* Top subtle divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center`}>
          
          {/* =======================
              LEFT (Typography & Stats)
              ======================= */}
          <div ref={leftRef} className={`flex flex-col gap-8 ${isRTL ? "text-right" : "text-left"}`}>
            <div className="relative inline-block">
               <span className="text-[#ff2c34] text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-4">
                 <span className="w-10 h-[2px] bg-[#ff2c34]" />
                 {t.about.badge}
               </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter drop-shadow-lg">
              {t.about.title}
            </h2>

            <div className="h-[1px] w-24 bg-gradient-to-r from-[#5319c6] to-transparent" />

            <div className="space-y-6">
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                {t.about.p1}
              </p>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                {t.about.p2}
              </p>
            </div>

            {/* Dynamic Stats Row (Instead of the static CAS box) */}
            <div className="grid grid-cols-2 gap-8 mt-6 pt-8 border-t border-white/5">
              {t.stats.slice(0, 2).map((st, i) => (
                 <div key={i} className={`flex flex-col group ${isRTL ? "border-r border-white/10 pr-6" : "border-l border-white/10 pl-6"} first:border-0 first:pl-0 first:pr-0`}>
                    <span className="text-5xl lg:text-6xl font-black text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:text-[#5319c6] transition-colors duration-500">
                      {st.value}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#ff2c34] font-bold">
                      {st.label}
                    </span>
                 </div>
              ))}
            </div>
          </div>

          {/* =======================
              RIGHT (Bento Values Grid)
              ======================= */}
          <div ref={rightRef} className="relative">
             <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                {/* Center glowing decoration */}
                <div className="center-dot hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#ff2c34] rounded-full shadow-[0_0_30px_#ff2c34] z-20 pointer-events-none" />
                
                {t.about.vals.map((val, i) => {
                  // Slightly translate the right column down for a masonry feel
                  const isEvenColumn = i % 2 !== 0; 
                  return (
                    <div 
                      key={i} 
                      className={`val-bento-card group relative p-8 bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#5319c6]/50 transition-all duration-500 hover:-translate-y-2 backdrop-blur-md ${isEvenColumn ? "sm:mt-12" : "sm:mb-12"}`}
                    >
                       {/* Background hover gradient */}
                       <div className="absolute inset-0 bg-gradient-to-br from-[#5319c6]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                       
                       {/* Big Number */}
                       <span 
                         className="absolute -top-4 -right-2 text-8xl font-black text-transparent opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" 
                         style={{ WebkitTextStroke: "2px white" }}
                       >
                         {val.num}
                       </span>

                       {/* Content */}
                       <div className={`relative z-10 flex items-center justify-between mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                          <div className="w-12 h-12 rounded-full bg-[#020205] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#ff2c34] transition-colors duration-500">
                             <span className="text-[#ff2c34] font-bold">{val.num}</span>
                          </div>
                          <div className="w-12 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-[#ff2c34] transition-all duration-500" />
                       </div>

                       <h3 className={`text-2xl font-bold text-white mb-4 relative z-10 ${isRTL ? "text-right" : "text-left"}`}>
                         {val.title}
                       </h3>
                       <p className={`text-gray-400 text-sm leading-relaxed relative z-10 font-light ${isRTL ? "text-right" : "text-left"}`}>
                         {val.desc}
                       </p>

                       {/* Bottom accent progress bar */}
                       <div className={`absolute bottom-0 h-1 bg-gradient-to-r from-[#5319c6] to-[#ff2c34] transition-all duration-700 w-0 group-hover:w-full ${isRTL ? "right-0" : "left-0"}`} />
                    </div>
                  );
                })}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}

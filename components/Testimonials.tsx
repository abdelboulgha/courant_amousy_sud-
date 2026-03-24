"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Helper function to get initials from the author name
const getInitials = (name: string) => {
  return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
};

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      ScrollTrigger.create({
        trigger: headRef.current,
        start: "top 85%",
        onEnter: () => gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }),
      });

      // Cards Stagger Animation
      const cards = cardsRef.current?.querySelectorAll(".testi-card");
      if (cards) {
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(
              cards,
              { y: 50, opacity: 0, scale: 0.95 },
              { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" }
            );
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#0a0a0f] relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5319c6] rounded-full blur-[200px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div ref={headRef} className={`mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 opacity-0 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          <div className="relative">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#ff2c34] flex items-center gap-4">
              <span className="w-10 h-[2px] bg-[#ff2c34]"></span>
              {t.testimonials.badge}
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
              {t.testimonials.title}
            </h2>
          </div>
          <p className="text-base max-w-md leading-relaxed text-[#a0a0c0]">
            {t.testimonials.sub}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {t.testimonials.items.map((item, i) => (
            <div 
              key={i} 
              className="testi-card group relative p-8 bg-black border border-white/5 rounded-2xl overflow-hidden hover:border-[#5319c6]/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
            >
              {/* Giant background quote mark */}
              <div className={`absolute top-4 opacity-5 text-8xl font-serif leading-none select-none text-white transition-opacity duration-500 group-hover:opacity-10 ${isRTL ? "left-6" : "right-6"}`}>
                &quot;
              </div>

              <div className={`relative z-10 flex flex-col h-full ${isRTL ? "text-right" : "text-left"}`}>
                
                {/* 5 Stars */}
                <div className={`flex gap-1 mb-6 ${isRTL ? "justify-end" : "justify-start"}`}>
                  {[...Array(5)].map((_, starIdx) => (
                    <svg key={starIdx} className="w-5 h-5 text-[#ff2c34]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 text-base leading-relaxed mb-10 flex-grow italic">
                  &quot;{item.text}&quot;
                </p>

                {/* Author Info */}
                <div className={`flex items-center gap-4 mt-auto pt-6 border-t border-white/10 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Initials Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5319c6] to-[#2a0c66] border border-white/20 flex items-center justify-center text-white font-bold tracking-wider shrink-0 shadow-[0_0_15px_rgba(83,25,198,0.4)]">
                    {getInitials(item.author)}
                  </div>
                  
                  <div>
                    <h4 className="text-white font-bold text-lg leading-tight group-hover:text-[#ff2c34] transition-colors duration-300">
                      {item.author}
                    </h4>
                    <span className="text-[#8888aa] text-sm">
                      {item.role}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ==========================================
// DATASET
// ==========================================
const VALUES_DATA = [
  {
    id: 1,
    titleFR: "FIABILITÉ",
    titleAR: "الموثوقية",
    subtitleFR: "Zéro compromis sur la qualité",
    subtitleAR: "لا مساومة على الجودة",
    image: "https://images.unsplash.com/photo-1541888086225-ee8269d4d9de?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    titleFR: "EXPERTISE",
    titleAR: "الخبرة",
    subtitleFR: "10 ans d'ingénierie de pointe",
    subtitleAR: "10 سنوات من الهندسة المتقدمة",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    titleFR: "INNOVATION",
    titleAR: "الابتكار",
    subtitleFR: "Technologies de demain, aujourd'hui",
    subtitleAR: "تكنولوجيا الغد، اليوم",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    titleFR: "RÉACTIVITÉ",
    titleAR: "الاستجابة",
    subtitleFR: "Interventions rapides 24/7",
    subtitleAR: "تدخلات سريعة 24/7",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
  },
];

const HISTORY_DATA = [
  { year: "2010", titleFR: "L'Étincelle", descFR: "Naissance de CAS avec une vision audacieuse." },
  { year: "2015", titleFR: "Expansion", descFR: "Déploiement des pôles Plomberie & CVC." },
  { year: "2019", titleFR: "Technologie", descFR: "Intégration de la cybersécurité & domotique." },
  { year: "2024", titleFR: "Excellence", descFR: "Plus de 500 projets livrés avec succès." },
];

const TEAM_DATA = [
  { name: "Youssef Amrani", role: "CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" },
  { name: "Amina Tazi", role: "CTO", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
  { name: "Driss Kabbaj", role: "COO", img: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=800&q=80" },
  { name: "Sara Benali", role: "CFO", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" },
];


export default function AboutClient() {
  const { isRTL } = useLang();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const horizontalWrapRef = useRef<HTMLDivElement>(null);
  
  // Custom Cursor for Values
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  useEffect(() => {
    const handleGlobalMouse = (e: globalThis.MouseEvent) => {
      // Smooth lerp for cursor would be better with GSAP, let's use quickTo
      gsap.to(".cursor-image-reveal", {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out"
      });
    };
    window.addEventListener("mousemove", handleGlobalMouse);
    return () => window.removeEventListener("mousemove", handleGlobalMouse);
  }, []);

  // Main GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. HERO MASSIVE SCALE (Scrollytelling "Through the Eye")
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
        animation: gsap.to(maskRef.current, {
          scale: 30, // Explode the mask to reveal next section naturally
          opacity: 0,
          ease: "power2.in",
        }),
      });

      // 2. PARALLAX TEXT IN SPLIT SECTION
      gsap.to(".parallax-text", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".split-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // 3. HORIZONTAL SCROLL (The Journey tape)
      if (horizontalRef.current && horizontalWrapRef.current) {
        // Calculate dynamic width based on children
        const wrapWidth = horizontalWrapRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        
        gsap.to(horizontalWrapRef.current, {
          x: -(wrapWidth - windowWidth + windowWidth*0.1), // move left
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: "top top",
            end: () => "+=" + wrapWidth,
            pin: true,
            scrub: 1,
          }
        });
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#020205] min-h-screen text-white overflow-hidden selection:bg-[#ff2c34]" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      {/* ==========================================
          1. HERO (Brutalist Exploding Mask)
          ========================================== */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden perspective-1000">
        
        {/* Background that will be revealed */}
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1920&q=80" alt="Hero bg" fill className="object-cover opacity-50 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/40 to-transparent" />
        </div>

        {/* The Giant Scale Element */}
        <div ref={maskRef} className="relative z-10 w-full h-full flex flex-col items-center justify-center origin-center">
          <h1 className="text-[15vw] leading-[0.8] font-black uppercase tracking-tighter mix-blend-overlay text-white drop-shadow-[0_0_30px_rgba(83,25,198,0.8)] filter blur-[0.5px]">
            COURANT
          </h1>
          <h1 className="text-[15vw] leading-[0.8] font-black uppercase tracking-tighter mix-blend-overlay text-[#ff2c34] drop-shadow-[0_0_30px_rgba(255,44,52,0.8)]">
            AMOUSY
          </h1>
          <h1 className="text-[15vw] leading-[0.8] font-black uppercase tracking-tighter mix-blend-overlay text-white drop-shadow-[0_0_30px_rgba(83,25,198,0.8)] filter blur-[0.5px]">
            SUD
          </h1>
        </div>

        {/* Floating intro text */}
        <div className="absolute bottom-10 left-10 z-20 max-w-sm">
          <p className="text-xl font-light leading-relaxed animate-[fadeIn_2s_ease_1s_forwards] opacity-0 text-gray-300">
            {isRTL 
              ? "نحن لا نبني فقط. نحن نؤسس إرثاً من الطاقة المتطورة." 
              : "Nous ne faisons pas que construire. Nous forgeons un héritage d'ingénierie avancée."}
          </p>
        </div>
      </section>

      {/* ==========================================
          2. THE PHILOSOPHY (Interactive Hover Lines)
          ========================================== */}
      <section className="relative py-40 bg-[#020205] cursor-crosshair">
        
        {/* Floating Mouse Follower Image */}
        <div 
          className="cursor-image-reveal fixed top-0 left-0 w-[400px] h-[500px] pointer-events-none z-0 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden transition-opacity duration-500 rounded-3xl"
          style={{ opacity: hoveredValue !== null ? 1 : 0 }}
        >
          {hoveredValue !== null && (
            <>
              <Image 
                src={VALUES_DATA[hoveredValue].image} 
                alt="Value Image" 
                fill 
                className="object-cover scale-110 animate-[slowZoom_5s_infinite_alternate]" 
              />
              <div className="absolute inset-0 bg-[#5319c6]/20 mix-blend-multiply" />
            </>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 mix-blend-difference">
          <p className="text-[#ff2c34] font-black uppercase tracking-[0.4em] mb-12 text-sm ml-4 border-l-2 border-[#ff2c34] pl-4">
            {isRTL ? "فلسفتنا" : "Notre Philosophie"}
          </p>
          
          <div className="flex flex-col w-full border-t border-white/10">
            {VALUES_DATA.map((val, i) => (
              <div 
                key={val.id}
                onMouseEnter={() => setHoveredValue(i)}
                onMouseLeave={() => setHoveredValue(null)}
                className={`group py-8 md:py-12 border-b border-white/10 flex flex-col md:flex-row items-baseline justify-between transition-colors duration-500 hover:bg-white/5 px-4 ${isRTL ? "md:flex-row-reverse" : ""}`}
              >
                <div className={`text-5xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter opacity-50 group-hover:opacity-100 transition-opacity duration-300 ${isRTL ? "text-right" : "text-left"}`}>
                  <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>
                    {isRTL ? val.titleAR : val.titleFR}
                  </span>
                </div>
                <div className={`mt-4 md:mt-0 text-xl font-light tracking-widest text-[#a080ff] opacity-0 group-hover:opacity-100 transform translate-x-10 group-hover:translate-x-0 transition-all duration-500 ease-out ${isRTL ? "text-left" : "text-right"}`}>
                  {isRTL ? val.subtitleAR : val.subtitleFR}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. SPLIT X-RAY SECTION (Parallax Text vs Image)
          ========================================== */}
      <section className="split-section relative bg-[#020205] h-[150vh] overflow-hidden flex items-center">
        <div className="absolute inset-0 w-full h-full lg:w-1/2 right-0 lg:left-1/2">
           <Image src="https://images.unsplash.com/photo-1541888086225-ee8269d4d9de?auto=format&fit=crop&w=1920&q=80" alt="Vision" fill className="object-cover opacity-60" />
           <div className="absolute inset-0 bg-[#5319c6] mix-blend-color opacity-40" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#020205] via-transparent to-transparent hidden lg:block" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent block lg:hidden" />
        </div>
        
        <div className="relative z-10 w-full lg:w-1/2 px-6 lg:px-20">
           <div className="parallax-text">
             <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-[1.1] uppercase text-white drop-shadow-2xl">
               {isRTL ? "رؤية" : "Transparence"} <br/>
               <span className="text-[#ff2c34]">{isRTL ? "لا متناهية" : "Totale"}</span>
             </h2>
             <p className="text-xl text-gray-400 font-light leading-relaxed max-w-xl">
               {isRTL 
                 ? "نعتمد الانفتاح والمصداقية في كل مرحلة من مراحل مشاريعنا. فريقنا يعمل في تناغم متكامل لتقديم نتائج استثنائية." 
                 : "Nous adoptons une démarche d'ouverture et de fiabilité à chaque étape de nos projets. Notre équipe opère dans une harmonie absolue pour livrer un confort esthétique et technique exceptionnel."}
             </p>
           </div>
        </div>
      </section>

      {/* ==========================================
          4. HORIZONTAL TIMELINE (Infinite Tape)
          ========================================== */}
      <section ref={horizontalRef} className="bg-[#020205] h-screen overflow-hidden flex flex-col justify-center border-t border-b border-[#ffffff0a] relative">
        <div className="absolute top-20 left-10 pointer-events-none z-20">
           <p className="text-[#a080ff] font-bold uppercase tracking-[0.5em] text-xs">
             {isRTL ? "شريط الزمن" : "Notre Parcours"}
           </p>
        </div>

        <div className="flex w-full items-center pl-[10vw]">
           <div ref={horizontalWrapRef} className="flex gap-[15vw] items-center whitespace-nowrap min-w-max">
             {HISTORY_DATA.map((item, i) => (
               <div key={i} className="relative flex flex-col items-center justify-center w-[60vw] md:w-[40vw] group">
                  {/* Giant Background Year */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[30vw] md:text-[20vw] font-black text-transparent opacity-10 select-none z-0 transition-opacity duration-1000 group-hover:opacity-30" style={{ WebkitTextStroke: "2px #5319c6" }}>
                    {item.year}
                  </div>
                  
                  <div className="relative z-10 text-center">
                    <div className="w-4 h-4 rounded-full bg-[#ff2c34] mx-auto mb-10 shadow-[0_0_20px_#ff2c34] animate-pulse" />
                    <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 drop-shadow-xl">{item.titleFR}</h3>
                    <p className="text-xl md:text-2xl text-gray-400 font-light whitespace-normal max-w-lg mx-auto leading-relaxed">
                      {item.descFR}
                    </p>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* ==========================================
          5. THE TEAM (Accordion Carousel)
          ========================================== */}
      <section className="py-40 bg-black relative">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-20 tracking-tighter">
              <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>
                {isRTL ? "مكتب" : "Cercle"}
              </span> {" "}
              <span className="text-[#ff2c34]">
                {isRTL ? "القيادة" : "Dirigeant"}
              </span>
            </h2>

            {/* Accordion Flex Layout */}
            <div className="flex flex-col lg:flex-row w-full h-[80vh] gap-4">
              {TEAM_DATA.map((member, i) => (
                <div key={i} className="group relative flex-1 min-h-[100px] hover:flex-[4] transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-2xl overflow-hidden cursor-crosshair border border-white/5 hover:border-[#5319c6]/50">
                  <Image src={member.img} alt={member.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                  
                  {/* Dark Overlay that fades out slightly on hover */}
                  <div className="absolute inset-0 bg-black/80 group-hover:bg-gradient-to-t group-hover:from-black group-hover:via-black/20 group-hover:to-transparent transition-all duration-700" />
                  
                  {/* Vertical / Horizontal Text depending on state */}
                  <div className="absolute bottom-10 left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                     <p className="text-[#a080ff] font-bold uppercase tracking-[0.3em] text-xs mb-2">
                       {member.role}
                     </p>
                     <h3 className="text-4xl font-black text-white whitespace-nowrap drop-shadow-xl">
                       {member.name}
                     </h3>
                  </div>

                  {/* Vertical label for unhovered state */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:-rotate-90 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                     <h3 className="text-2xl font-black text-white/50 uppercase tracking-widest whitespace-nowrap">
                       {member.name}
                     </h3>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* ==========================================
          6. CTA & FOOTER
          ========================================== */}
      <CTA />
      <Footer />

      <style jsx global>{`
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.15); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Spline from "@splinetool/react-spline";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// ==========================================
// DOCK DATA
// ==========================================
const HISTORY_DATA = [
  {
    year: "2010",
    titleFR: "Fondation",
    titleAR: "التأسيس",
    descFR: "Création de la société avec une équipe fondatrice de 5 ingénieurs spécialisés en électricité industrielle.",
    descAR: "تأسيس الشركة مع فريق مؤسس من 5 مهندسين متخصصين في الكهرباء الصناعية.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "2015",
    titleFR: "Expansion Multiservices",
    titleAR: "التوسع متعدد الخدمات",
    descFR: "Lancement des départements Plomberie et Climatisation (CVC) pour offrir une solution globale clé en main.",
    descAR: "إطلاق أقسام السباكة والتكييف لتقديم حلول شاملة ومتكاملة.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "2019",
    titleFR: "Pôle Sécurité Technologique",
    titleAR: "قطب الأمن التكنولوجي",
    descFR: "Intégration de la vidéosurveillance HD et des systèmes d'alarme maillés aux standards européens.",
    descAR: "دمج أنظمة المراقبة بالفيديو عالية الدقة وأنظمة الإنذار وفق المعايير الأوروبية.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "2024",
    titleFR: "Acteur Régional Majeur",
    titleAR: "فاعل إقليمي رئيسي",
    descFR: "Plus de 500 projets livrés. Certification d'excellence sur les gros œuvres et développement continu.",
    descAR: "أكثر من 500 مشروع تم إنجازه. شهادة التميز في الأعمال الكبرى والتطوير المستمر.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
];

const TEAM_DATA = [
  {
    name: "Youssef Amrani",
    roleFR: "Directeur Général (CEO)",
    roleAR: "المدير العام",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Amina Tazi",
    roleFR: "Directrice Technique",
    roleAR: "المديرة الفنية",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Driss Kabbaj",
    roleFR: "Chef des Opérations",
    roleAR: "رئيس العمليات",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=800&q=80",
  },
];

export default function AboutClient() {
  const { t, isRTL } = useLang();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Hero & Global animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Cinematic Pin & Scrub
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=60%",
        pin: true,
        scrub: 1,
        animation: gsap.to(heroTextRef.current, {
          y: -150,
          scale: 0.9,
          opacity: 0,
          ease: "power2.inOut",
        }),
      });

      // 2. Timeline SVG Draw Animation
      if (lineRef.current && timelineRef.current) {
        const pathLength = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        });
      }

      // 3. Timeline Cards Slide-in
      const historyItems = gsap.utils.toArray(".history-item");
      historyItems.forEach((item: unknown, i) => {
        const historyItem = item as HTMLElement;
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          historyItem,
          { opacity: 0, x: isLeft ? -80 : 80, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: historyItem,
              start: "top 85%",
            },
          }
        );
      });

      // 4. Mission & Values Cards Floating Stagger
      gsap.fromTo(
        ".value-card",
        { y: 80, opacity: 0, rotationX: 15 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 75%",
          },
        }
      );

      // 5. Team Reveal
      gsap.fromTo(
        ".team-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".team-section",
            start: "top 80%",
          },
        }
      );

      // 6. Infinite Marquee
      if (marqueeRef.current) {
        const w = marqueeRef.current.offsetWidth / 2;
        gsap.to(marqueeRef.current, {
          x: -w,
          duration: 30, // Extremely slow and elegant
          ease: "none",
          repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#04040a] min-h-screen text-white overflow-hidden selection:bg-[#5319c6] selection:text-white" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      {/* ==========================================
          1. HERO SECTION (Spline 3D + Cinematic Reveal)
          ========================================== */}
      <section ref={heroRef} className="relative h-screen flex flex-col justify-center items-center">
        {/* Spline Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#04040a]/40 to-[#04040a] z-10 pointer-events-none" />
          <div className="w-full h-full opacity-50 mix-blend-screen scale-110">
            {/* Same premium energy visual */}
            <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
          </div>
        </div>

        {/* Floating Particles CSS Background (Custom Glows) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#5319c6] rounded-full blur-[150px] mix-blend-screen animate-[pulse_4s_ease-in-out_infinite_alternate]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff2c34] rounded-full blur-[150px] mix-blend-screen animate-[pulse_5s_ease-in-out_infinite_alternate_1s]" />
        </div>

        {/* Text Area */}
        <div ref={heroTextRef} className="relative z-20 max-w-5xl mx-auto px-6 text-center mt-12 backdrop-blur-sm bg-black/10 p-10 rounded-2xl border border-white/5">
           <div className="inline-block px-5 py-2 border border-[#ff2c34]/50 rounded-full mb-8 shadow-[0_0_20px_rgba(255,44,52,0.2)] animate-[fadeIn_1s_ease_forwards]">
             <span className="text-xs font-black uppercase tracking-[0.3em] text-[#ff2c34]">
               {t.about.badge}
             </span>
           </div>
           
           <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-tight lg:leading-[0.9] mb-8 animate-[fadeInUp_1.5s_ease_0.2s_forwards] opacity-0">
             {isRTL ? "من نحن" : "L'Expertise"}<br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5319c6] to-white drop-shadow-2xl">
               {isRTL ? "طاقة وابتكار" : "Courant Amousy"}
             </span>
           </h1>
           
           <p className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed animate-[fadeInUp_1.5s_ease_0.4s_forwards] opacity-0">
             {isRTL
               ? "نلتزم بتقديم حلول تقنية موثوقة وحديثة ومستدامة لعملائنا في مجالات البناء والهندسة."
               : "Expertise, fiabilité et innovation. Nous fournissons des solutions techniques fiables, modernes et durables."}
           </p>

           <div className="mt-12 animate-[fadeInUp_1.5s_ease_0.6s_forwards] opacity-0">
             <Link
               href="/contact"
               className="group relative inline-flex items-center justify-center px-10 py-5 bg-white text-black overflow-hidden font-bold uppercase tracking-widest text-sm rounded-sm transition-transform hover:scale-105"
             >
               <span className="absolute inset-0 bg-[#ff2c34] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
               <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                 {isRTL ? "تواصل معنا" : "Contactez-nous"}
               </span>
             </Link>
           </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce pointer-events-none opacity-50">
           <div className="w-[1px] h-16 bg-gradient-to-b from-[#5319c6] to-transparent"></div>
        </div>
      </section>

      {/* ==========================================
          2. THE STORY / COMPANY HISTORY (Timeline)
          ========================================== */}
      <section ref={timelineRef} className="relative z-20 py-32 bg-[#04040a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-widest text-[#5319c6] mb-6 drop-shadow-[0_0_15px_rgba(83,25,198,0.5)]">
              {isRTL ? "تاريخنا" : "Notre Histoire"}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {isRTL ? "رحلة من النمو المستمر والإنجازات البارزة." : "Un parcours fait de croissance continue et de jalons remarquables."}
            </p>
          </div>

          <div className="relative">
             {/* Center SVG Line for Timeline */}
             <div className="absolute top-0 bottom-0 left-[20px] md:left-1/2 md:-translate-x-1/2 w-[4px] z-0">
                <svg className="h-full w-full" preserveAspectRatio="none">
                   <path
                     ref={lineRef}
                     d={`M 2 0 L 2 10000`} // Abstract large height, scaled by container
                     stroke="url(#timeline-grad)"
                     strokeWidth="4"
                     fill="none"
                   />
                   <defs>
                     <linearGradient id="timeline-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                       <stop offset="0%" stopColor="#5319c6" />
                       <stop offset="50%" stopColor="#ff2c34" />
                       <stop offset="100%" stopColor="#5319c6" />
                     </linearGradient>
                   </defs>
                </svg>
             </div>

             <div className="space-y-16 md:space-y-32">
               {HISTORY_DATA.map((item, i) => {
                 const isLeft = i % 2 === 0;
                 return (
                   <div key={i} className={`history-item relative flex flex-col md:flex-row items-center justify-between w-full ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      
                      {/* Timeline Dot */}
                      <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#04040a] border-4 border-[#ff2c34] z-10 shadow-[0_0_15px_#ff2c34]" />

                      {/* Content Card */}
                      <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isRTL ? (isLeft ? "md:text-right" : "md:text-left") : (isLeft ? "md:text-right" : "md:text-left")}`}>
                        <div className="mb-2 text-5xl font-black text-transparent opacity-50" style={{ WebkitTextStroke: "1px #5319c6" }}>
                          {item.year}
                        </div>
                        <h3 className="text-3xl font-bold mb-4 text-white">
                          {isRTL ? item.titleAR : item.titleFR}
                        </h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                          {isRTL ? item.descAR : item.descFR}
                        </p>
                      </div>

                      {/* Image Card */}
                      <div className="w-full md:w-[45%] pl-16 md:pl-0 mt-8 md:mt-0">
                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border border-[#ffffff10] group">
                           <Image src={item.image} alt={item.titleFR} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                           <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                      </div>
                   </div>
                 );
               })}
             </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. MISSION & VALUES (Glassmorphism Cards)
          ========================================== */}
      <section ref={valuesRef} className="py-32 relative bg-gradient-to-b from-[#04040a] to-[#0a0a1a] border-t border-b border-[#ffffff0a]">
         <div className="absolute inset-0 bg-[url('/assets/images/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
               <span className="text-[#ff2c34] font-black uppercase tracking-[0.3em] text-sm block mb-4">
                 {isRTL ? "جذورنا" : "Notre ADN"}
               </span>
               <h2 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight max-w-4xl mx-auto">
                 {isRTL 
                   ? "توفير حلول تقنية موثوقة وحديثة ومستدامة لعملائنا." 
                   : "Fournir des solutions techniques fiables, modernes et durables à nos clients."}
               </h2>
            </div>
            
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}>
               {t.about.vals.map((val, i) => (
                 <div key={i} className="value-card group relative p-10 bg-[#020205]/50 backdrop-blur-xl border border-white/5 rounded-2xl hover:border-[#5319c6] transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(83,25,198,0.2)]">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-[#5319c6] rounded-full blur-[50px] opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                   
                   <div className={`flex items-center gap-4 mb-8 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span className="text-4xl font-black text-transparent" style={{ WebkitTextStroke: "1px #ff2c34" }}>{val.num}</span>
                      <div className="h-px w-10 bg-gradient-to-r from-[#ff2c34] to-transparent" />
                   </div>
                   
                   <h3 className={`text-2xl font-black text-white mb-4 ${isRTL ? "text-right" : "text-left"}`}>{val.title}</h3>
                   <p className={`text-gray-400 text-sm leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>{val.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* ==========================================
          4. SERVICES MARQUEE (High-end showcase)
          ========================================== */}
      <section className="py-16 bg-[#04040a] relative overflow-hidden flex items-center shadow-[inset_0_0_100px_rgba(0,0,0,1)]">
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#04040a] to-transparent z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#04040a] to-transparent z-10" />
        
        <div className="flex w-max" ref={marqueeRef}>
           {/* Duplicate array twice for seamless infinite loop */}
           {[...t.ticker, ...t.ticker].map((item, i) => (
             <div key={i} className="flex items-center px-8">
                <span className="text-4xl md:text-6xl font-black text-transparent uppercase tracking-tighter whitespace-nowrap hover:text-white transition-colors duration-300 cursor-default" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
                   {item}
                </span>
                <span className="mx-8 w-4 h-4 rounded-full bg-[#ff2c34] shadow-[0_0_15px_#ff2c34]" />
             </div>
           ))}
        </div>
      </section>

      {/* ==========================================
          5. THE TEAM (Portrait Cards)
          ========================================== */}
      <section className="team-section py-32 bg-[#020205] relative border-t border-[#ffffff0a]">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
               <div className={`max-w-2xl ${isRTL ? "text-right" : "text-left"}`}>
                  <h2 className="text-4xl lg:text-5xl font-black uppercase text-white mb-6">
                    {isRTL ? "الفريق المؤسس" : "L'Équipe Dirigeante"}
                  </h2>
                  <p className="text-gray-400 text-lg">
                    {isRTL 
                      ? "خبراء تقنيون يضعون شغفهم في خدمة نجاح مشاريعكم." 
                      : "Des experts techniques qui mettent leur passion au service de la réussite de vos projets."}
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {TEAM_DATA.map((member, i) => (
                 <div key={i} className="team-card group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-crosshair">
                    <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                    
                    {/* Glow Accents */}
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#5319c6] rounded-full blur-[60px] opacity-0 group-hover:opacity-80 transition-opacity duration-700" />

                    <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end text-center">
                       <h3 className="text-3xl font-black text-white mb-2">{member.name}</h3>
                       <p className="text-[#ff2c34] font-bold uppercase tracking-[0.2em] text-xs">
                         {isRTL ? member.roleAR : member.roleFR}
                       </p>
                    </div>

                    {/* Frame overlay */}
                    <div className="absolute inset-4 border border-white/20 rounded-xl pointer-events-none scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-100" />
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
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

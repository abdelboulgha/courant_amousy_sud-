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
// DATASET
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

const SERVICES_DATA = [
  { id: "electricity", titleFR: "Électricité", titleAR: "الكهرباء", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
  { id: "plumbing", titleFR: "Plomberie", titleAR: "السباكة", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
  { id: "ac", titleFR: "Climatisation", titleAR: "التكييف", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.514a.25.25 0 01.164.045l4.004 3.003c.241.181.514.305.808.368L14 14z" /></svg> },
  { id: "surveillance", titleFR: "Vidéosurveillance", titleAR: "كاميرات المراقبة", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
  { id: "alarm", titleFR: "Système d'alarme", titleAR: "أنظمة الإنذار", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
  { id: "painting", titleFR: "Peinture, Plâtre, Décorations", titleAR: "الطلاء والديكور", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg> },
  { id: "zellige", titleFR: "Plâtre & Zellige", titleAR: "الجبص والزليج", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg> },
  { id: "misc", titleFR: "Travaux divers / Construction", titleAR: "أشغال بناء متنوعة", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
];

const PROJECTS_DATA = [
  { titleFR: "Complexe Résidentiel", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80", tag: "Électricité" },
  { titleFR: "Hôtel 5 Étoiles", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80", tag: "Climatisation" },
  { titleFR: "Centre Commercial", image: "https://images.unsplash.com/photo-1541888086225-ee8269d4d9de?auto=format&fit=crop&w=1200&q=80", tag: "Vidéosurveillance" },
  { titleFR: "Siège Social Tech", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80", tag: "Construction" }
];

export default function AboutClient() {
  const { t, isRTL } = useLang();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const projectsWrapRef = useRef<HTMLDivElement>(null);

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

      // 6. Services Highlight Stagger
      gsap.fromTo(
        ".service-card-reveal",
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
          },
        }
      );

      // 7. Project Highlight (Horizontal Scroll Gallery)
      if (projectsRef.current && projectsWrapRef.current) {
        const scrollWidth = projectsWrapRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        gsap.to(projectsWrapRef.current, {
          x: -(scrollWidth - windowWidth + 100),
          ease: "none",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top top",
            end: () => "+=" + scrollWidth,
            pin: true,
            scrub: 1,
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#04040a] min-h-screen text-white overflow-hidden selection:bg-[#5319c6] selection:text-white" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      {/* ==========================================
          1. HERO SECTION (Spline 3D + Cinematic Reveal)
          ========================================== */}
      <section ref={heroRef} className="relative h-screen flex flex-col justify-center items-center">
        {/* Spline Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#04040a]/40 to-[#04040a] z-10 pointer-events-none" />
          <div className="w-full h-full opacity-50 mix-blend-screen scale-110">
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
      <section ref={valuesRef} className="py-32 relative bg-gradient-to-b from-[#04040a] to-[#020205] border-t border-b border-[#ffffff0a]">
         <div className="absolute inset-0 bg-[url('/assets/images/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
               <span className="text-[#ff2c34] font-black uppercase tracking-[0.3em] text-sm block mb-4">
                 {isRTL ? "جذورنا" : "Notre ADN"}
               </span>
               <h2 className="text-5xl lg:text-5xl font-black uppercase tracking-tighter max-w-4xl mx-auto">
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
          5. SERVICES HIGHLIGHT (Requested Grid Addition)
          ========================================== */}
      <section ref={servicesRef} className="py-24 bg-[#0a0a1a] relative border-b border-[#ffffff0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-widest text-white mb-6">
                {isRTL ? "مجالات تخصصنا" : "Nos Domaines d'Expertise"}
              </h2>
           </div>

           <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
             {SERVICES_DATA.map((srv, i) => (
                <Link key={srv.id} href="/services" className={`service-card-reveal group relative p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#ff2c34]/10 transition-colors duration-500 flex flex-col justify-center items-center text-center`}>
                   <div className="w-16 h-16 rounded-full bg-[#020205] border border-white/10 flex items-center justify-center mb-6 text-[#5319c6] group-hover:text-[#ff2c34] group-hover:scale-110 transition-all duration-300">

                   <div className="w-8 h-8">
                        {srv.svg}
                   </div>
                   </div>
                   <h3 className="text-lg font-bold text-white group-hover:text-[#ff2c34] transition-colors">{isRTL ? srv.titleAR : srv.titleFR}</h3>

                   <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#ff2c34] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100" />
                </Link>
             ))}
           </div>
        </div>
      </section>

      {/* ==========================================
          6. PROJECT HIGHLIGHT (Horizontal Scroll Gallery)
          ========================================== */}
      <section ref={projectsRef} className="py-24 bg-[#020205] h-screen flex flex-col justify-center overflow-hidden border-b border-[#ffffff0a]">
         <div className="px-6 lg:px-12 mb-10 w-full">
            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-widest text-[#5319c6]">
              {isRTL ? "نموذج من إنجازاتنا" : "Nos Réalisations Clés"}
            </h2>
         </div>

         <div className="flex w-full overflow-hidden">
            <div ref={projectsWrapRef} className="flex gap-8 px-6 lg:px-12 w-max">
               {PROJECTS_DATA.map((proj, i) => (
                  <div key={i} className="w-[80vw] lg:w-[45vw] h-[55vh] relative rounded-2xl overflow-hidden group">
                     {/* Parallax scaled image base */}
                     <Image src={proj.image} alt={proj.titleFR} fill className="object-cover scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                     
                     <div className="absolute bottom-10 left-10 right-10 flex flex-col">
                        <span className="w-max px-3 py-1 bg-[#ff2c34] text-xs font-bold uppercase tracking-widest mb-4">
                           {proj.tag}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">
                           {proj.titleFR}
                        </h3>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ==========================================
          7. THE TEAM (Portrait Cards)
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
          8. CTA & FOOTER
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

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Spline from "@splinetool/react-spline";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. PROJECT DATASET
// ==========================================
// High-quality Unsplash URLs matching the sectors
const PROJECT_DATA = [
  {
    id: 1,
    tag: "Électricité",
    category: "electricity",
    titleFR: "Complexe résidentiel moderne",
    titleAR: "مجمع سكني حديث",
    descFR: "Câblage complet, tableaux divisionnaires et mise aux normes NF C 15-100 pour 24 appartements de haut standing.",
    descAR: "توصيل كامل ولوحات فرعية وتطبيق معايير للسلامة لـ 24 شقة فاخرة.",
    meta: "Région Sud · 2024",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    tag: "Climatisation",
    category: "ac",
    titleFR: "Hôtel 4 étoiles",
    titleAR: "فندق 4 نجوم",
    descFR: "Étude thermique, fourniture et pose de systèmes multi-splits et VRV sur 6 niveaux avec régulation centralisée.",
    descAR: "دراسة حرارية، توريد وتركيب أنظمة تكييف متطورة على 6 طوابق.",
    meta: "Centre-ville · 2024",
    image: "https://images.unsplash.com/photo-1522045585501-8bfebbeecab9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    tag: "Travaux divers",
    category: "construction",
    titleFR: "Villa d'architecte",
    titleAR: "فيلا معمارية",
    descFR: "Construction complète incluant fondations, structure béton armé et aménagements extérieurs avec piscine.",
    descAR: "بناء كامل يشمل الأساسات وهيكل الخرسانة المسلحة وتجهيزات خارجية.",
    meta: "Région Sud · 2023",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    tag: "Vidéosurveillance",
    category: "surveillance",
    titleFR: "Site industriel sécurisé",
    titleAR: "موقع صناعي آمن",
    descFR: "Installation de 48 caméras IP HD, infrastructure NVR, contrôle d'accès biométrique et interphonie sécurisée.",
    descAR: "تركيب 48 كاميرا IP عالية الدقة وبنية تحتية وأنظمة تحكم بالوصول.",
    meta: "Zone industrielle · 2023",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    tag: "Peinture & Plâtre",
    category: "painting",
    titleFR: "Résidence premium",
    titleAR: "سكن فاخر",
    descFR: "Plâtrage haute précision, enduit de finition lisse, peinture décorative mate et création de faux-plafonds lumineux (1 200 m²).",
    descAR: "جبس، طبقة إنهاء ناعمة، طلاء ديكوري غير لامع وأسقف معلقة.",
    meta: "Région Sud · 2024",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    tag: "Plomberie",
    category: "plumbing",
    titleFR: "Réfection de réseau tertiaire",
    titleAR: "تجديد الشبكة الصحية",
    descFR: "Remplacement complet de la tuyauterie cuivre et PVC, installation de sanitaires modernes pour un immeuble de bureaux.",
    descAR: "استبدال كامل للأنابيب وتركيب مرافق صحية حديثة لمبنى إداري.",
    meta: "Pôle d'affaires · 2023",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 7,
    tag: "Système d'alarme",
    category: "alarm",
    titleFR: "Hub logistique central",
    titleAR: "مركز لوجستي مركزي",
    descFR: "Déploiement d'un système d'alarme intrusion maillé, détecteurs volumétriques et liaison directe avec centre de télésurveillance.",
    descAR: "نشر نظام إنذار ضد التطفل، ومستشعرات وربط مباشر مع مركز المراقبة.",
    meta: "Zone Franche · 2024",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 8,
    tag: "Électricité",
    category: "electricity",
    titleFR: "Bureaux Tech-Hub",
    titleAR: "مكاتب محور التكنولوجيا",
    descFR: "Éclairage LED intelligent, planchers techniques, baies de brassage informatique et onduleurs de secours.",
    descAR: "إضاءة LED ذكية، أرضيات تقنية، وخوادم احتياطية.",
    meta: "Technopark · 2025",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
  },
];

const CATEGORIES = [
  { id: "all", labelFR: "Tous", labelAR: "الكل" },
  { id: "electricity", labelFR: "Électricité", labelAR: "كهرباء" },
  { id: "plumbing", labelFR: "Plomberie", labelAR: "سباكة" },
  { id: "ac", labelFR: "Climatisation", labelAR: "تكييف" },
  { id: "surveillance", labelFR: "Vidéosurveillance", labelAR: "مراقبة" },
  { id: "alarm", labelFR: "Alarme", labelAR: "إنذار" },
  { id: "painting", labelFR: "Peinture/Plâtre", labelAR: "طلاء وجبس" },
  { id: "construction", labelFR: "Construction", labelAR: "أعمال متنوعة" },
];

export default function ProjectsClient() {
  const { isRTL } = useLang();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridWrapRef = useRef<HTMLDivElement>(null);
  const filterBtnRef = useRef<HTMLDivElement>(null);

  const [filter, setFilter] = useState("all");
  const [displayedProjects, setDisplayedProjects] = useState(PROJECT_DATA);
  const [isChanging, setIsChanging] = useState(false);

  // Initial Hero Animations + Parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning hero for cinematic entrance
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=60%",
        pin: true,
        scrub: 1,
        animation: gsap.fromTo(
          textRef.current,
          { opacity: 1, y: 0, scale: 1 },
          { opacity: 0, y: -150, scale: 0.85, ease: "power2.inOut" }
        ),
      });

      // Background slower parallax
      gsap.to(parallaxRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Simple fade-up for hero title
      gsap.fromTo(
        ".hero-stgr",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.3 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Filter Transition Logic
  const handleFilterChange = (newFilter: string) => {
    if (newFilter === filter || isChanging) return;
    setIsChanging(true);
    
    // Animate current cards out
    gsap.to(".project-card", {
      opacity: 0,
      y: 30,
      scale: 0.95,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setFilter(newFilter);
        setDisplayedProjects(
          newFilter === "all" ? PROJECT_DATA : PROJECT_DATA.filter((p) => p.category === newFilter)
        );
        // Animate new cards in
        setTimeout(() => {
          gsap.fromTo(
            ".project-card",
            { opacity: 0, y: 40, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6, ease: "back.out(1.5)" }
          );
          setIsChanging(false);
          ScrollTrigger.refresh();
        }, 50);
      },
    });
  };

  // Re-trigger ScrollReveals on mount or regular scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card");
      cards.forEach((card: any) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          animation: gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
          ),
          once: true,
        });
      });
    }, gridWrapRef);
    return () => ctx.revert();
  }, [displayedProjects]);

  return (
    <div className="bg-[#04040a] min-h-screen text-white selection:bg-[#5319c6] selection:text-white" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      {/* ==========================================
          1. HERO SECTION
          ========================================== */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Parallax Layer */}
        <div ref={parallaxRef} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#04040a]/50 to-[#04040a] z-10 pointer-events-none" />
          <div className="w-full h-full opacity-60 mix-blend-screen overflow-hidden object-cover scale-110">
            {/* Using Spline for abstract tech/energy background */}
            <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(83,25,198,0.2)_0%,_rgba(0,0,0,0.8)_100%)] z-10 pointer-events-none" />
        </div>

        {/* Text Content */}
        <div ref={textRef} className="relative z-20 max-w-5xl mx-auto px-6 text-center mt-20">
          <span className="hero-stgr block text-sm font-bold uppercase tracking-[0.4em] text-[#ff2c34] mb-6 flex justify-center items-center gap-4">
            <span className="w-12 h-px bg-[#ff2c34]"></span>
            {isRTL ? "محفظة أعمالنا" : "Portfolio"}
            <span className="w-12 h-px bg-[#ff2c34]"></span>
          </span>
          <h1 className="hero-stgr text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter mb-8 drop-shadow-2xl">
            {isRTL ? "مشاريعنا" : "Nos Projets"}<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5319c6] to-[#ff2c34]">
               {isRTL ? "المتميزة" : "Marquants"}
            </span>
          </h1>
          <p className="hero-stgr text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            {isRTL
              ? "اكتشفوا إنجازاتنا وتدخلاتنا في مجالات البناء والتقنية بأعلى معايير الجودة المعتمدة."
              : "Découvrez nos réalisations et nos interventions dans tous nos domaines d’expertise, conçues pour durer."}
          </p>
          <div className="hero-stgr flex items-center justify-center">
             <button
               onClick={() => {
                 document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' });
               }}
               className="group relative px-10 py-5 bg-black/50 overflow-hidden backdrop-blur-md rounded-sm border border-[#5319c6]/50 hover:border-[#ff2c34] transition-colors duration-500"
             >
               <div className="absolute inset-0 w-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,44,52,0.3)_50%,transparent_100%)] animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <span className="relative text-white font-bold tracking-widest uppercase text-sm z-10">
                 {isRTL ? "تصفح المشاريع" : "Parcourir la galerie"}
               </span>
             </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. FILTER & GALLERY SECTION
          ========================================== */}
      <section id="gallery-section" className="relative z-20 pt-20 pb-32 bg-[#04040a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Filters */}
          <div ref={filterBtnRef} className="flex flex-wrap items-center justify-center gap-3 mb-16 px-4">
            {CATEGORIES.map((cat) => {
              const isActive = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleFilterChange(cat.id)}
                  disabled={isChanging}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                    isActive 
                      ? "bg-[#5319c6] border-[#5319c6] text-white shadow-[0_0_20px_rgba(83,25,198,0.4)]" 
                      : "bg-transparent border-[#ffffff20] text-gray-400 hover:border-[#ff2c34] hover:text-white"
                  }`}
                >
                  {isRTL ? cat.labelAR : cat.labelFR}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div ref={gridWrapRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
            {displayedProjects.length === 0 ? (
               <div className="col-span-full py-20 text-center text-gray-500 text-lg">
                 {isRTL ? "لا توجد مشاريع في هذه الفئة حاليا." : "Aucun projet trouvé pour cette catégorie."}
               </div>
            ) : (
              displayedProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="project-card group relative h-[450px] w-full bg-[#0a0a1a] rounded-xl overflow-hidden cursor-pointer shadow-lg will-change-transform"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-110">
                    <Image
                      src={proj.image}
                      alt={proj.titleFR}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500 opacity-90 group-hover:opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5319c6]/80 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500 mix-blend-multiply" />
                  
                  {/* Glow Border on Hover */}
                  <div className="absolute inset-0 border-2 border-transparent transition-colors duration-500 group-hover:border-[#ff2c34] rounded-xl z-20 pointer-events-none shadow-[inset_0_0_20px_rgba(255,44,52,0)] group-hover:shadow-[inset_0_0_20px_rgba(255,44,52,0.5)]" />

                  {/* Content Container */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-30 pointer-events-none">
                    {/* Tag */}
                    <div className="mb-4 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                      <span className="px-3 py-1 bg-[#ff2c34] text-white text-[10px] font-black uppercase tracking-widest rounded-sm">
                        {proj.tag}
                      </span>
                    </div>
                    {/* Title */}
                    <h3 className="text-2xl font-black text-white leading-tight mb-2 drop-shadow-md transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                      {isRTL ? proj.titleAR : proj.titleFR}
                    </h3>
                    {/* Desc */}
                    <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-2 transform transition-all duration-500 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      {isRTL ? proj.descAR : proj.descFR}
                    </p>
                    {/* Meta */}
                    <div className="flex items-center gap-2 mt-auto transform transition-transform duration-500 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="text-xs text-gray-400 font-medium tracking-wider">{proj.meta}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. FEATURED PROJECT HIGHLIGHT (Optional key project)
          ========================================== */}
      <section className="relative py-32 bg-black overflow-hidden flex items-center min-h-[80vh]">
        <div className="absolute inset-0 z-0">
          <Image
             src="https://images.unsplash.com/photo-1541888086225-ee8269d4d9de?auto=format&fit=crop&w=1920&q=80"
             alt="Featured Project"
             fill
             className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div className="w-full lg:w-1/2">
             <div className="inline-block px-4 py-1.5 border border-[#5319c6] text-[#5319c6] font-bold text-xs uppercase tracking-[0.2em] rounded-full mb-6 relative overflow-hidden group/tag">
                <span className="relative z-10">Projet Phare</span>
                <div className="absolute inset-0 bg-[#5319c6]/20 animate-pulse"></div>
             </div>
             
             <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight">
               {isRTL ? "مجمع صناعي مستدام" : "Complexe Industriel Durable"}
             </h2>
             
             <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
               {isRTL 
                 ? "تدخل كامل لجميع الحرف: الكهرباء ذات الجهد العالي والمنخفض، التكييف المركزي، وشبكات مكافحة الحرائق." 
                 : "Intervention complète tous corps d'état: CFO/CFA, CVC industriel centralisé, et réseaux plomberie lourds."
               }
             </p>
             
             <button className="px-8 py-4 bg-white text-black font-bold uppercase text-sm tracking-widest hover:bg-[#ff2c34] hover:text-white transition-colors duration-300 rounded-sm">
               {isRTL ? "عرض دراسة الحالة" : "Voir l'étude de cas"}
             </button>
          </div>
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute bottom-0 right-0 w-1/2 h-full pointer-events-none flex justify-end items-end opacity-30">
           <svg viewBox="0 0 200 200" className="w-[800px] h-[800px] absolute -right-40 -bottom-40 text-[#5319c6] animate-[spin_60s_linear_infinite]">
              <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
           </svg>
        </div>
      </section>

      {/* ==========================================
          4. CTA & FOOTER
          ========================================== */}
      <CTA />
      <Footer />
    </div>
  );
}

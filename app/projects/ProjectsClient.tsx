"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
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
// OUT-OF-THE-BOX DATASET (Enhanced)
// ==========================================
const PROJECT_DATA = [
  {
    id: 1,
    tag: "Électricité",
    category: "electricity",
    titleFR: "Complexe Résidentiel 'Les Lumières'",
    titleAR: "مجمع 'الأضواء' السكني",
    descFR: "Déploiement électrique complet haute et basse tension pour 24 villas intelligentes.",
    descAR: "نشر كهربائي كامل عالي ومنخفض الجهد لـ 24 فيلا ذكية.",
    challengeFR: "Intégrer la domotique sans compromettre l'esthétique épurée des intérieurs.",
    solutionFR: "Câblage invisible, tableaux divisionnaires encastrés et intégration de la norme NF C 15-100.",
    impactFR: "-30% de consommation énergétique grâce à l'éclairage LED intelligent.",
    image: "/assets/images/projects/electrical.png",
    client: "Groupe Immobilier Sud",
    duration: "8 Mois",
  },
  {
    id: 2,
    tag: "Climatisation",
    category: "ac",
    titleFR: "Hôtel 4 Étoiles 'L'Oasis'",
    titleAR: "فندق 'الواحة' 4 نجوم",
    descFR: "Climatisation centralisée de 120 chambres avec contrôle individuel et traitement d'air.",
    descAR: "تكييف مركزي لـ 120 غرفة مع تحكم فردي ومعالجة الهواء.",
    challengeFR: "Maintenir un silence absolu (inférieur à 20dB) dans les suites premium.",
    solutionFR: "Installation de systèmes VRV ultra-silencieux avec gaines acoustiques spéciales.",
    impactFR: "Confort thermique optimal et certification énergétique classe A.",
    image: "/assets/images/projects/ac.png",
    client: "Hospitality Ventures",
    duration: "12 Mois",
  },
  {
    id: 3,
    tag: "Construction",
    category: "construction",
    titleFR: "Siège Social 'Tech-Hub'",
    titleAR: "المقر الرئيسي 'تيك هاب'",
    descFR: "Construction tous corps d'état d'un bâtiment de 3 étages aux normes écologiques.",
    descAR: "بناء شامل لمقر من 3 طوابق وفق المعايير البيئية.",
    challengeFR: "Un délai serré de construction tout en utilisant des matériaux durables.",
    solutionFR: "Gestion de projet agile, fondations renforcées et architecture bioclimatique.",
    impactFR: "Livraison 2 semaines avant la date limite avec zéro défaut de finition.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    client: "Tech Solutions Maroc",
    duration: "14 Mois",
  },
  {
    id: 4,
    tag: "Surveillance & Alarme",
    category: "surveillance",
    titleFR: "Data Center Sécurisé",
    titleAR: "مركز بيانات آمن",
    descFR: "Maillage de 60 caméras IP 4K, contrôle d'accès biométrique et alarmes volumétriques.",
    descAR: "شبكة من 60 كاميرا 4K، تحكم بالوصول البيومتري وإنذارات حجمية.",
    challengeFR: "Sécuriser une zone critique de 2000m² sans aucun angle mort.",
    solutionFR: "Modélisation 3D pour l'emplacement des caméras et réseau fibre optique redondant.",
    impactFR: "Niveau de sécurité TIER III atteint, audit validé du premier coup.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
    client: "Banque Nationale",
    duration: "4 Mois",
  },
  {
    id: 5,
    tag: "Peinture & Plâtre",
    category: "painting",
    titleFR: "Galerie d'Art Contemporain",
    titleAR: "معرض الفن المعاصر",
    descFR: "Finitions intérieures d'exception : stuc Vénitien, faux-plafonds flottants et peinture mate muséale.",
    descAR: "تشطيبات داخلية استثنائية: الجص البندقي وأسقف عائمة.",
    challengeFR: "Créer des surfaces parfaitement lisses pour mettre en valeur les œuvres d'art.",
    solutionFR: "Application de 4 couches d'enduit avec ponçage millimétrique et éclairage rasant de contrôle.",
    impactFR: "Rendu visuel époustouflant, acclamé par les critiques locaux.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
    client: "Ministère de la Culture",
    duration: "3 Mois",
  },
  {
    id: 6,
    tag: "Plomberie",
    category: "plumbing",
    titleFR: "Complexe Sportif 'Aqua'",
    titleAR: "المركب الرياضي 'أكوا'",
    descFR: "Installation de systèmes de plomberie lourde, traitement d'eau de piscine et blocs sanitaires.",
    descAR: "تركيب أنظمة السباكة الثقيلة ومعالجة مياه المسبح.",
    challengeFR: "Gérer la pression d'eau d'un bassin olympique et de 40 douches simultanées.",
    solutionFR: "Mise en place de pompes à débit variable et canalisations anti-corrosion en PPR.",
    impactFR: "Réseau hydraulique 100% fiable, zéro fuite détectée après 2 ans d'exploitation.",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1200&q=80",
    client: "Commune Urbaine",
    duration: "6 Mois",
  },
];

const CATEGORIES = [
  { id: "all", labelFR: "Tous les Projets", labelAR: "كل المشاريع" },
  { id: "electricity", labelFR: "Électricité", labelAR: "كهرباء" },
  { id: "plumbing", labelFR: "Plomberie", labelAR: "سباكة" },
  { id: "ac", labelFR: "Climatisation", labelAR: "تكييف" },
  { id: "surveillance", labelFR: "Sécurité", labelAR: "أمن" },
  { id: "painting", labelFR: "Finition", labelAR: "تشطيب" },
  { id: "construction", labelFR: "Gros Œuvre", labelAR: "البناء" },
];

export default function ProjectsClient() {
  const { t, isRTL } = useLang();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const horizontalWrapRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [filter, setFilter] = useState("all");
  const [displayedProjects, setDisplayedProjects] = useState(PROJECT_DATA);
  const [isChanging, setIsChanging] = useState(false);
  const [modalProject, setModalProject] = useState<typeof PROJECT_DATA[0] | null>(null);

  // Hero Flashlight Effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Main Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Title Reveal
      gsap.fromTo(
        ".hero-char",
        { opacity: 0, y: 100, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.05,
          duration: 1.2,
          ease: "back.out(1.5)",
          delay: 0.5,
        }
      );

      // 2. Stats Counters Setup
      const statElements = gsap.utils.toArray(".stat-number");
      statElements.forEach((el: unknown) => {
        const element = el as HTMLElement;
        const targetValue = parseInt(element.getAttribute("data-value") || "0", 10);
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(element, {
              innerHTML: targetValue,
              duration: 2.5,
              ease: "power2.out",
              snap: { innerHTML: 1 },
              onUpdate: function () {
                element.innerHTML = Math.ceil(Number(this.targets()[0].innerHTML)) + (element.getAttribute("data-suffix") || "");
              },
            });
          },
        });
      });

      // 3. Horizontal Scroll Section
      if (horizontalRef.current && horizontalWrapRef.current) {
        const wrapWidth = horizontalWrapRef.current.offsetWidth;
        const windowWidth = window.innerWidth;
        
        gsap.to(horizontalWrapRef.current, {
          x: -(wrapWidth - windowWidth + 100),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + (wrapWidth - windowWidth),
          },
        });
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Filter Logic
  const handleFilterChange = (newFilter: string) => {
    if (newFilter === filter || isChanging) return;
    setIsChanging(true);
    
    gsap.to(".project-card-3d", {
      opacity: 0,
      scale: 0.8,
      rotationY: 15,
      y: 50,
      stagger: 0.05,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setFilter(newFilter);
        setDisplayedProjects(newFilter === "all" ? PROJECT_DATA : PROJECT_DATA.filter((p) => p.category === newFilter));
        setTimeout(() => {
          gsap.fromTo(
            ".project-card-3d",
            { opacity: 0, scale: 0.8, rotationY: -15, y: 50 },
            { opacity: 1, scale: 1, rotationY: 0, y: 0, stagger: 0.08, duration: 0.7, ease: "back.out(1.2)" }
          );
          setIsChanging(false);
          ScrollTrigger.refresh();
        }, 50);
      },
    });
  };

  // 3D Card Hover Effect Handlers
  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>, cardElement: HTMLDivElement) => {
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;  // Max 10 deg

    gsap.to(cardElement, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power1.out",
      duration: 0.4,
    });
  };

  const handleCardMouseLeave = (cardElement: HTMLDivElement) => {
    gsap.to(cardElement, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 0.8,
    });
  };

  // Helper to split text for GSAP
  const renderSplitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="hero-char inline-block" style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
        {char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="bg-[#020205] min-h-screen text-white selection:bg-[#ff2c34] selection:text-white" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      {/* ==========================================
          1. HERO SECTION (Flashlight Effect)
          ========================================== */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#020205]">
        {/* Cinematic Mouse Following Glow Mask */}
        <div 
           className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
           style={{
             background: `radial-gradient(1200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(83,25,198,0.15), transparent 40%)`
           }}
        />

        {/* Interactive Floating Project Images Background */}
        <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
          {typeof window !== 'undefined' && PROJECT_DATA.slice(0, 5).map((proj, i) => {
             const positions = [
               { top: "15%", left: "5%", width: "20vw" },
               { top: "60%", left: "15%", width: "18vw" },
               { top: "20%", right: "8%", width: "22vw" },
               { top: "65%", right: "12%", width: "16vw" },
               { top: "35%", right: "35%", width: "25vw" }, // Center-ish background
             ];
             const pos = positions[i];
             
             // Mouse parallax effect (reverse direction based on index)
             const isWindowValid = typeof window !== 'undefined';
             const cx = isWindowValid ? window.innerWidth / 2 : 0;
             const cy = isWindowValid ? window.innerHeight / 2 : 0;
             const offsetX = (mousePos.x - cx) * (i % 2 === 0 ? 0.04 : -0.04);
             const offsetY = (mousePos.y - cy) * (i % 2 === 0 ? 0.04 : -0.04);

             // Opacity is very low so it serves as an elegant background
             const baseOpacity = i === 4 ? 0.1 : 0.3;

             return (
               <div
                 key={i}
                 className="absolute rounded-lg overflow-hidden border border-white/5 transition-transform duration-1000 ease-out"
                 style={{
                   top: pos.top,
                   ...(pos.left ? { left: pos.left } : { right: pos.right }),
                   width: pos.width,
                   aspectRatio: i % 2 === 0 ? "3/4" : "1/1",
                   transform: `translate(${offsetX}px, ${offsetY}px)`,
                   opacity: baseOpacity,
                   boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                 }}
               >
                 {/* Internal floating animation */}
                 <div className="relative w-full h-full" style={{ animation: `customFloat ${7 + i}s ease-in-out infinite alternate ${i * 0.5}s` }}>
                   <div className="absolute inset-0 bg-[#5319c6] mix-blend-color z-10 opacity-30" />
                   <Image src={proj.image} alt={proj.titleFR} fill className="object-cover grayscale brightness-125" sizes="25vw" />
                 </div>
               </div>
             );
          })}
        </div>

        <div className="relative z-30 flex flex-col items-center text-center px-6">
           <div className="inline-block px-4 py-1.5 border border-[#5319c6]/50 rounded-full mb-8 backdrop-blur-md opacity-0 animate-[fadeIn_1s_ease_1s_forwards]">
             <span className="text-xs font-bold uppercase tracking-widest text-[#a080ff] drop-shadow-lg">
               {isRTL ? "معرض الإنجازات" : "Galerie d'excellence"}
             </span>
           </div>
           
           <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none mb-6 perspective-1000">
             {renderSplitText(isRTL ? "المشاريع" : "PROJETS")}
           </h1>
           
           <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl opacity-0 animate-[fadeInUp_1s_ease_2s_forwards]">
             {isRTL 
               ? "نحول التحديات الفنية إلى إنجازات مستدامة. استكشف بصمتنا عبر القطاعات."
               : "Nous transformons les défis techniques en accomplissements durables. Explorez notre empreinte."}
           </p>

           <div className="absolute bottom-12 opacity-0 animate-[fadeIn_1s_ease_3s_forwards]">
              <div className="w-[1px] h-16 bg-gradient-to-b from-[#ff2c34] to-transparent mx-auto animate-[pulse_2s_infinite]" />
           </div>
        </div>
      </section>

      {/* ==========================================
          2. STATS & METHODOLOGY (Thinking Out of the Box)
          ========================================== */}
      <section ref={statsRef} className="py-24 bg-gradient-to-b from-[#020205] to-[#0a0a1a] relative border-b border-[#ffffff0a]">
         <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {t.stats.map((stat, i) => {
               const numValue = stat.value.replace(/\D/g, "");
               const suffix = stat.value.replace(/\d/g, "");
               return (
                 <div key={i} className="relative group">
                   <div className="text-5xl md:text-7xl font-black text-transparent mb-4 transition-all duration-500 group-hover:drop-shadow-[0_0_20px_#5319c6]" style={{ WebkitTextStroke: "1px #ffffff50" }}>
                     <span className="stat-number" data-value={numValue} data-suffix={suffix}>0</span>
                   </div>
                   <div className="text-sm md:text-base font-bold text-gray-400 uppercase tracking-widest">
                     {stat.label}
                   </div>
                   <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#ff2c34] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                   <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#ff2c34] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                 </div>
               );
            })}
         </div>

         {/* Methodology Timeline */}
         <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-32 text-center">
            <h2 className="text-3xl font-black mb-16 tracking-widest">{isRTL ? "منهجيتنا" : "NOTRE APPROCHE"}</h2>
            <div className="flex flex-col md:flex-row justify-between relative">
               <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#5319c6] to-transparent -translate-y-1/2 z-0" />
               
               {[
                 { num: "01", t: isRTL ? "التشخيص" : "Audit", d: isRTL ? "تحليل دقيق للاحتياجات" : "Analyse précise des besoins" },
                 { num: "02", t: isRTL ? "التصميم" : "Conception", d: isRTL ? "هندسة الحل الفني" : "Ingénierie de la solution" },
                 { num: "03", t: isRTL ? "التنفيذ" : "Déploiement", d: isRTL ? "إنجاز بأعلى المعايير" : "Exécution sur site" },
                 { num: "04", t: isRTL ? "التسليم" : "Passation", d: isRTL ? "اختبارات وضمان الجودة" : "Tests et validation finale" },
               ].map((step, i) => (
                 <div key={i} className="relative z-10 flex flex-col items-center mb-10 md:mb-0 group cursor-default">
                    <div className="w-16 h-16 rounded-full bg-[#020205] border-2 border-[#333] group-hover:border-[#ff2c34] flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(255,44,52,0.4)]">
                       <span className="font-black text-xl text-[#5319c6] group-hover:text-[#ff2c34] transition-colors">{step.num}</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-white">{step.t}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-widest max-w-[150px]">{step.d}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* ==========================================
          3. HORIZONTAL SCROLL FEATURED (Projets Phares)
          ========================================== */}
      <section ref={horizontalRef} className="bg-black pt-24 pb-12 overflow-hidden h-screen flex flex-col justify-center border-b border-[#ffffff0a]">
        <div className="px-6 lg:px-12 mb-12">
           <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
             <span className="text-transparent" style={{ WebkitTextStroke: "1px #fff" }}>
                {isRTL ? "أبرز" : "Projets"}
             </span>{" "}
             {isRTL ? "الإنجازات" : "Phares"}
           </h2>
        </div>
        
        <div className="flex w-full overflow-hidden">
           <div ref={horizontalWrapRef} className="flex gap-12 px-6 lg:px-12 w-max">
             {PROJECT_DATA.slice(0, 3).map((proj, i) => (
               <div key={i} className="w-[80vw] lg:w-[60vw] h-[60vh] relative rounded-lg overflow-hidden group">
                 <Image src={proj.image} alt={proj.titleFR} fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                 
                 <div className={`absolute bottom-0 left-0 w-full p-10 flex flex-col justify-end ${isRTL ? "text-right" : "text-left"}`}>
                    <div className={`flex items-center gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span className="w-12 h-1 bg-[#ff2c34]" />
                      <span className="text-sm font-bold uppercase tracking-[0.2em]">{proj.category}</span>
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-black text-white mb-4 drop-shadow-lg">
                      {isRTL ? proj.titleAR : proj.titleFR}
                    </h3>
                    <p className="text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed">
                      {isRTL ? proj.challengeFR : proj.challengeFR /* Since no AR trans for challenge provided, keeping FR or leaving it */}
                    </p>
                    <button 
                      onClick={() => setModalProject(proj)}
                      className="origin-left scale-100 group-hover:scale-105 transition-transform duration-300 self-start px-8 py-3 border border-white hover:bg-white hover:text-black font-bold uppercase text-xs tracking-widest"
                    >
                      {isRTL ? "اقرأ دراسة الحالة" : "Lire l'étude de cas"}
                    </button>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* ==========================================
          4. THE LAB / FILTERED GALLERY (3D Mouse Tracking)
          ========================================== */}
      <section className="relative z-20 pt-32 pb-32 bg-[#020205]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest mb-10">
              {isRTL ? "أرشيف المشاريع" : "Archives des réalisations"}
            </h2>
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-3 px-4">
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
                        : "bg-[#0a0a1a] border-[#ffffff10] text-gray-400 hover:border-[#ff2c34] hover:text-white"
                    }`}
                  >
                    {isRTL ? cat.labelAR : cat.labelFR}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3D Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-16 perspective-1000">
            {displayedProjects.length === 0 ? (
               <div className="col-span-full py-20 text-center text-gray-500 font-light">
                 {isRTL ? "لا توجد مشاريع في هذه الفئة حاليا." : "Aucun projet trouvé pour cette catégorie."}
               </div>
            ) : (
              displayedProjects.map((proj) => (
                <div
                  key={proj.id}
                  onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget as HTMLDivElement)}
                  onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget as HTMLDivElement)}
                  onClick={() => setModalProject(proj)}
                  className="project-card-3d group relative aspect-[4/3] w-full bg-[#0a0a1a] cursor-pointer shadow-2xl transition-all duration-300 border border-[#ffffff0a] hover:border-[#5319c6]"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <Image src={proj.image} alt={proj.titleFR} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                  
                  {/* Glassmorphism Information Plate */}
                  <div className={`absolute bottom-6 ${isRTL ? "right-6 left-12" : "left-6 right-12"} p-6 bg-black/40 backdrop-blur-md border border-white/10 opacity-90 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500`}>
                    <div className={`flex items-center gap-3 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span className="w-2 h-2 rounded-full bg-[#ff2c34]" />
                      <span className="text-[10px] text-[#ff2c34] font-black uppercase tracking-[0.2em]">
                        {proj.tag}
                      </span>
                    </div>
                    <h3 className={`text-xl font-black text-white leading-tight ${isRTL ? "text-right" : "text-left"}`}>
                      {isRTL ? proj.titleAR : proj.titleFR}
                    </h3>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#ff2c34] to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. MODAL / DETAILED CASE STUDY
          ========================================== */}
      {modalProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setModalProject(null)} />
          <div className="relative z-10 w-full max-w-5xl bg-[#0a0a1a] max-h-[90vh] overflow-y-auto border border-[#ffffff10] flex flex-col md:flex-row shadow-[0_0_50px_rgba(83,25,198,0.3)] animate-[fadeInUp_0.4s_ease-out]">
            
            {/* Close Btn */}
            <button 
              className="absolute top-4 right-4 z-50 p-2 bg-black rounded-full border border-[#ffffff20] hover:bg-[#ff2c34] transition-colors"
              onClick={() => setModalProject(null)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
              <Image src={modalProject.image} alt="Project" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a1a] hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] to-transparent block md:hidden" />
            </div>

            {/* Modal Content */}
            <div className={`w-full md:w-1/2 p-10 lg:p-14 flex flex-col justify-center ${isRTL ? "text-right" : "text-left"}`}>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff2c34] mb-4">
                {modalProject.category}
              </span>
              <h2 className="text-3xl lg:text-4xl font-black mb-8">
                {isRTL ? modalProject.titleAR : modalProject.titleFR}
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-[#5319c6] font-bold uppercase tracking-widest text-xs mb-2">{isRTL ? "التحدي" : "Le Challenge"}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed font-light">{modalProject.challengeFR}</p>
                </div>
                <div>
                  <h4 className="text-[#5319c6] font-bold uppercase tracking-widest text-xs mb-2">{isRTL ? "الحل المقدم" : "Notre Solution"}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed font-light">{modalProject.solutionFR}</p>
                </div>
                <div>
                  <h4 className="text-[#5319c6] font-bold uppercase tracking-widest text-xs mb-2">{isRTL ? "الأثر" : "L'Impact"}</h4>
                  <p className="text-sm text-[#ff2c34] font-medium leading-relaxed">{modalProject.impactFR}</p>
                </div>
              </div>

              <div className={`mt-10 flex items-center justify-between border-t border-[#ffffff10] pt-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                 <div className="text-xs text-gray-400">
                    <span className="block font-bold text-white mb-1">{isRTL ? "العميل" : "Client"}</span>
                    {modalProject.client}
                 </div>
                 <div className="text-xs text-gray-400">
                    <span className="block font-bold text-white mb-1">{isRTL ? "المدة" : "Durée"}</span>
                    {modalProject.duration}
                 </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          6. CTA & FOOTER
          ========================================== */}
      <CTA />
      <Footer />

      <style jsx global>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        @keyframes customFloat { 
            0% { transform: translateY(0px) rotate(0deg) scale(1); } 
            50% { transform: translateY(-15px) rotate(2deg) scale(1.02); } 
            100% { transform: translateY(0px) rotate(-1deg) scale(1); } 
        }
      `}</style>
    </div>
  );
}

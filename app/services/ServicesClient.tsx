"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Spline from "@splinetool/react-spline";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import ServicesGrid from "@/components/Services";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const SERVICE_DATA = [
  {
    id: "electrical",
    image: "/assets/images/services/electrical.png",
    accent: "#5319c6",
    effectType: "electrical",
  },
  {
    id: "plumbing",
    image: "/assets/images/services/plumbing.png",
    accent: "#00a8ff",
    effectType: "plumbing",
  },
  {
    id: "ac",
    image: "/assets/images/services/ac.png",
    accent: "#00e5ff",
    effectType: "ac",
  },
  {
    id: "surveillance",
    image: "/assets/images/services/surveillance.png",
    accent: "#ff2c34",
    effectType: "surveillance",
  },
  {
    id: "alarm",
    image: "/assets/images/services/alarm.png",
    accent: "#ff2c34",
    effectType: "alarm",
  },
  {
    id: "finishing",
    image: "/assets/images/services/finishing.png",
    accent: "#ff007f",
    effectType: "brush",
  },
  {
    id: "construction",
    image: "/assets/images/services/construction.png",
    accent: "#ffbd00",
    effectType: "building",
  },
];

// Reusable SVG Effects tailored for each service
const CustomEffect = ({ type }: { type: string }) => {
  switch (type) {
    case "electrical":
      return (
        <div className="absolute top-10 right-10 flex gap-2 rotate-45 opacity-50">
          <div className="w-[2px] h-12 bg-[#5319c6] animate-[pulse_0.1s_infinite]" />
          <div className="w-[1px] h-8 bg-white animate-[pulse_0.15s_infinite_0.1s]" />
          <div className="w-[2px] h-16 bg-[#5319c6] animate-[pulse_0.1s_infinite_0.2s]" />
          <div className="w-[1px] h-6 bg-white animate-[pulse_0.2s_infinite]" />
        </div>
      );
    case "plumbing":
      return (
        <div className="absolute top-0 right-1/4 h-full flex gap-6 overflow-hidden pointer-events-none opacity-40">
           <div className="w-1 h-8 rounded-full bg-[#00a8ff] translate-y-[-100%] animate-[drop_1.5s_infinite]" />
           <div className="w-1.5 h-6 rounded-full bg-[#00e5ff] translate-y-[-100%] animate-[drop_2s_infinite_0.5s]" />
           <div className="w-1 h-10 rounded-full bg-[#00a8ff] translate-y-[-100%] animate-[drop_1.8s_infinite_1s]" />
           <style jsx>{`
             @keyframes drop { 0% { transform: translateY(-100px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(400px); opacity: 0; } }
           `}</style>
        </div>
      );
    case "ac":
      return (
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-10 opacity-30 pointer-events-none">
          <svg width="200" height="40" viewBox="0 0 200 40" className="animate-[wind_3s_ease-in-out_infinite]">
            <path d="M0,20 Q50,0 100,20 T200,20" fill="none" stroke="#00e5ff" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <svg width="150" height="40" viewBox="0 0 150 40" className="animate-[wind_4s_ease-in-out_infinite_1s]">
            <path d="M0,20 Q37.5,40 75,20 T150,20" fill="none" stroke="#00e5ff" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <style jsx>{`
            @keyframes wind { 0% { transform: translateX(20px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateX(-50px); opacity: 0; } }
          `}</style>
        </div>
      );
    case "surveillance":
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          <div className="w-full h-[2px] bg-red-500 shadow-[0_0_15px_#ff2c34] animate-[scan_3s_ease-in-out_infinite]" />
          <style jsx>{`
            @keyframes scan { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(400px); opacity: 0; } }
          `}</style>
        </div>
      );
    case "alarm":
      return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[#ff2c34] rounded-full animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-60 mix-blend-screen" />
          <div className="absolute inset-4 bg-[#ff2c34] rounded-full animate-[pulse_1s_infinite] opacity-80 mix-blend-screen blur-md" />
        </div>
      );
    case "brush":
      return (
        <div className="absolute -inset-10 pointer-events-none overflow-hidden opacity-30 object-cover z-0 mix-blend-screen mix-blend-color-dodge">
          <svg viewBox="0 0 400 300" className="w-full h-full animate-[brush_5s_ease-in-out_infinite_alternate]">
             <path d="M-50,150 Q100,250 200,50 T450,200" fill="none" stroke="#ff007f" strokeWidth="40" strokeLinecap="round" strokeDasharray="600" strokeDashoffset="600" className="animate-[draw_3s_infinite_alternate]" />
          </svg>
          <style jsx>{`
            @keyframes draw { 0% { stroke-dashoffset: 600; } 100% { stroke-dashoffset: 0; } }
            @keyframes brush { 0% { transform: scale(1) rotate(0deg); } 100% { transform: scale(1.1) rotate(5deg); } }
          `}</style>
        </div>
      );
    case "building":
      return (
        <div className="absolute bottom-0 right-10 flex items-end gap-4 opacity-40 pointer-events-none">
           <div className="w-8 outline outline-2 outline-[#ffbd00] bg-transparent origin-bottom animate-[grow_2s_ease-out_infinite_alternate]" style={{height: "150px"}} />
           <div className="w-12 outline outline-2 outline-[#ffbd00] bg-transparent origin-bottom animate-[grow_2.5s_ease-out_infinite_alternate_0.2s]" style={{height: "220px"}} />
           <div className="w-10 outline outline-2 outline-[#ffbd00] bg-transparent origin-bottom animate-[grow_1.8s_ease-out_infinite_alternate_0.4s]" style={{height: "180px"}} />
           <style jsx>{`
             @keyframes grow { 0% { transform: scaleY(0); } 100% { transform: scaleY(1); } }
           `}</style>
        </div>
      );
    default:
      return null;
  }
};

const ServiceDetail = ({
  item,
  index,
  isRTL
}: {
  item: any;
  index: number;
  isRTL: boolean;
}) => {
  const isEven = index % 2 === 0;
  const matchRow = SERVICE_DATA[index] || SERVICE_DATA[0];

  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // desktop animations
        "(min-width: 768px)": () => {
          gsap.fromTo(
            textRef.current,
            { x: isEven ? -100 : 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
            }
          );
          gsap.fromTo(
            imgRef.current,
            { scale: 0.8, opacity: 0, rotationY: isEven ? -15 : 15 },
            {
              scale: 1,
              opacity: 1,
              rotationY: 0,
              duration: 1.4,
              ease: "back.out(1.2)",
              scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
            }
          );
        },
        // mobile animations
        "(max-width: 767px)": () => {
          gsap.fromTo(
            sectionRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
            }
          );
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isEven]);

  const TextBlock = (
    <div ref={textRef} className={`w-full lg:w-1/2 flex flex-col justify-center relative z-10 ${isRTL ? "text-right" : "text-left"}`}>
      <div className={`flex items-center gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
        <span className="text-6xl font-black text-transparent" style={{ WebkitTextStroke: `1px ${matchRow.accent}` }}>
          {item.num}
        </span>
        <div className="h-[2px] w-24" style={{ backgroundColor: matchRow.accent }}></div>
      </div>
      <h3 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
        {item.title}
      </h3>
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        {item.desc}
      </p>
      <div className={`mt-auto ${isRTL ? "self-end" : "self-start"}`}>
        <Link
          href="/contact"
          className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:bg-[#ff2c34] hover:text-white rounded-sm overflow-hidden relative"
        >
          <span className="relative z-10">{isRTL ? "طلب عرض سعر" : "Demander un devis"}</span>
        </Link>
      </div>
    </div>
  );

  const ImageBlock = (
    <div ref={imgRef} className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[500px] group rounded-xl overflow-hidden perspective-1000">
      <div className="absolute inset-0 border border-[#ffffff10] rounded-xl z-10 pointer-events-none group-hover:border-[#ff2c34] transition-colors duration-500" />
      <div className="absolute -inset-4 bg-gradient-to-tr from-[rgba(83,25,198,0.2)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl z-0" />
      
      <div className="relative w-full h-full z-10 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1">
        <Image
          src={matchRow.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        
        {/* Dynamic visual effect based on service */}
        <CustomEffect type={matchRow.effectType} />
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`flex flex-col gap-12 lg:gap-20 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
          {isRTL ? (isEven ? TextBlock : ImageBlock) : TextBlock}
          {isRTL ? (isEven ? ImageBlock : TextBlock) : ImageBlock}
        </div>
      </div>
    </section>
  );
};

export default function ServicesClient() {
  const { t, isRTL } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero cinematic pin and scrub
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=50%",
        pin: true,
        scrub: 1,
        animation: gsap.to(heroTextRef.current, { opacity: 0, y: -100, scale: 0.9, ease: "power2.inOut" }),
      });

      // Simple staggered fade for hero text onload
      gsap.fromTo(
        ".hero-stagger",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out", delay: 0.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black min-h-screen selection:bg-[#5319c6] selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
        {/* Spline Background or robust gradient fallback */}
        <div className="absolute inset-0 z-0">
          {/* We will try to load a gorgeous generic Spline scene. If network blocks it, the gradient background still shows. */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(83,25,198,0.3)_0%,_rgba(0,0,0,1)_70%)] opacity-80 z-10 pointer-events-none" />
          <div className="w-full h-full opacity-60 mix-blend-screen overflow-hidden">
            <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
          </div>
          {/* subtle noise texture */}
          <div className="absolute inset-0 opacity-20 pointer-events-none z-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
        </div>

        <div ref={heroTextRef} className="relative z-20 max-w-5xl mx-auto px-6 text-center mt-20">
          <span className="hero-stagger block text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-[#ff2c34] mb-6">
            {t.services.badge}
          </span>
          <h1 className="hero-stagger text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter mb-8 drop-shadow-2xl">
            {isRTL ? "خدماتنا الاحترافية" : "Nos Services"} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5319c6] to-[#ff2c34]">
               {isRTL ? "في جميع الميادين" : "Professionnels"}
            </span>
          </h1>
          <p className="hero-stagger text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            {isRTL 
               ? "حلول موثوقة وحديثة في جميع مجالات خبرتنا لضمان نجاح مشاريعكم." 
               : "Des solutions fiables et modernes dans tous nos domaines d’expertise pour garantir la réussite de vos projets."}
          </p>
          <div className="hero-stagger flex items-center justify-center">
             <button
               onClick={() => {
                 document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' });
               }}
               className="group relative px-10 py-5 bg-transparent overflow-hidden rounded-sm border border-[#5319c6]"
             >
               <div className="absolute inset-0 w-0 bg-gradient-to-r from-[#5319c6] to-[#ff2c34] transition-all duration-[400ms] ease-out group-hover:w-full"></div>
               <span className="relative text-white font-bold tracking-widest uppercase text-sm z-10 transition-colors duration-300">
                 {isRTL ? "اكتشف خدماتنا" : "Découvrir nos services"}
               </span>
             </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer opacity-70">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M12 5v14M19 12l-7 7-7-7"/>
           </svg>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW GRID */}
      <div id="services-grid" className="relative z-20">
        <ServicesGrid />
      </div>

      {/* 3. DETAILED SERVICE SECTIONS */}
      <div className="relative z-20 bg-black pb-20">
         {/* Interstitial separator */}
         <div className="max-w-7xl mx-auto px-6 my-10 flex items-center gap-6 opacity-30">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#5319c6] to-transparent" />
            <div className="w-2 h-2 rounded-full bg-[#ff2c34]" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#5319c6] to-transparent" />
         </div>

         {t.services.items.map((item, i) => (
           <ServiceDetail key={i} item={item} index={i} isRTL={isRTL} />
         ))}
      </div>

      {/* 4. CTA SECTION */}
      <CTA />

      {/* 5. FOOTER */}
      <Footer />
    </div>
  );
}

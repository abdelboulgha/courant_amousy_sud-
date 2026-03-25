"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function ContactClient() {
  const { t, isRTL } = useLang();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSent, setIsSent] = useState(false);

  // Localization for form
  const formT = isRTL
    ? {
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        subject: "الموضوع",
        message: "الرسالة",
        submit: "إرسال الرسالة",
        success: "تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.",
      }
    : {
        name: "Nom complet",
        email: "Adresse e-mail",
        subject: "Sujet",
        message: "Votre message",
        submit: "Envoyer le message",
        success: "Votre message a été envoyé avec succès. Nous vous contacterons bientôt.",
      };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      gsap.fromTo(
        ".hero-text",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out", delay: 0.1 }
      );

      // 2. Info Cards Stagger
      gsap.fromTo(
        ".info-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
        }
      );

      // 3. Form Reveal
      gsap.fromTo(
        ".form-wrapper",
        { x: isRTL ? -50 : 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isRTL]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate network request
    setTimeout(() => {
      setIsSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div ref={containerRef} className="bg-[#020205] min-h-screen text-white selection:bg-[#5319c6] selection:text-white" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      {/* ==========================================
          1. HERO SECTION (Cinematic Minimalist)
          ========================================== */}
      <section ref={heroRef} className="relative pt-40 pb-20 px-6 lg:px-8 border-b border-[#ffffff0a] overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />
        
        {/* Glows */}
        <div className="absolute top-0 right-1/4 w-[30rem] h-[30rem] bg-[#5319c6] rounded-full blur-[10rem] mix-blend-screen opacity-20 pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[25rem] h-[25rem] bg-[#ff2c34] rounded-full blur-[10rem] mix-blend-screen opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
           <span className="hero-text text-[#ff2c34] font-bold uppercase tracking-[0.4em] text-xs mb-6 block">
              {t.pages.contact}
           </span>
           <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-tight mb-8">
             {isRTL ? "نحن في" : "Nous sommes"} <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5319c6] to-white drop-shadow-2xl">
               {isRTL ? "استماعكم" : "À votre écoute"}
             </span>
           </h1>
           <p className="hero-text text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto">
             {t.cta.sub}
           </p>
        </div>
      </section>

      {/* ==========================================
          2. CONTENT GRID (Info Cards + Form)
          ========================================== */}
      <section ref={contentRef} className="py-24 relative overflow-hidden bg-[#04040a]">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24`}>
               
               {/* LEFT: Contact Information */}
               <div className="flex flex-col gap-6">
                  {/* Card 1: Address */}
                  <div className="info-card group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#ff2c34]/50 transition-colors duration-500 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff2c34] rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity" />
                     <div className={`flex items-start gap-6 relative z-10 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className="w-14 h-14 rounded-full bg-[#020205] border border-white/10 flex items-center justify-center shrink-0">
                           <svg className="w-6 h-6 text-[#ff2c34]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                        </div>
                        <div className={isRTL ? "text-right" : "text-left"}>
                           <h3 className="text-xl font-bold uppercase text-white mb-2">{isRTL ? "المقر الرئيسي" : "Siège Social"}</h3>
                           <p className="text-gray-400 leading-relaxed font-light">{t.footer.addr}</p>
                        </div>
                     </div>
                  </div>

                  {/* Card 2: Phone */}
                  <div className="info-card group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#5319c6]/50 transition-colors duration-500 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-[#5319c6] rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity" />
                     <div className={`flex items-start gap-6 relative z-10 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className="w-14 h-14 rounded-full bg-[#020205] border border-white/10 flex items-center justify-center shrink-0">
                           <svg className="w-6 h-6 text-[#5319c6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                        </div>
                        <div className={isRTL ? "text-right" : "text-left"}>
                           <h3 className="text-xl font-bold uppercase text-white mb-2">{isRTL ? "رقم الهاتف" : "Téléphone"}</h3>
                           <p className="text-gray-400 font-light" dir="ltr">{t.footer.phone}</p>
                           <p className="text-[#ff2c34] text-xs font-bold uppercase mt-2 tracking-widest">{t.cta.infos[2].label}</p>
                        </div>
                     </div>
                  </div>

                  {/* Card 3: Email */}
                  <div className="info-card group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#ff2c34]/50 transition-colors duration-500 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff2c34] rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity" />
                     <div className={`flex items-start gap-6 relative z-10 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className="w-14 h-14 rounded-full bg-[#020205] border border-white/10 flex items-center justify-center shrink-0">
                           <svg className="w-6 h-6 text-[#ff2c34]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                        </div>
                        <div className={isRTL ? "text-right" : "text-left"}>
                           <h3 className="text-xl font-bold uppercase text-white mb-2">{isRTL ? "البريد الإلكتروني" : "Email"}</h3>
                           <a href={`mailto:${t.footer.email}`} className="text-gray-400 font-light hover:text-white transition-colors">{t.footer.email}</a>
                        </div>
                     </div>
                  </div>
               </div>

               {/* RIGHT: Contact Form (Glassmorphism) */}
               <div className="form-wrapper">
                  <div className="p-10 lg:p-12 rounded-3xl bg-[#020205] border border-[#ffffff1a] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                     {/* Decorative subtle top border line */}
                     <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#5319c6] via-[#ff2c34] to-transparent opacity-80" />
                     
                     {isSent ? (
                       <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center animate-[fadeIn_0.5s_ease-out]">
                         <div className="w-20 h-20 rounded-full bg-[#5319c6]/10 flex items-center justify-center mb-6">
                           <svg className="w-10 h-10 text-[#5319c6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                         </div>
                         <h3 className="text-3xl font-black text-white mb-4">{isRTL ? "شكراً لك!" : "Merci !"}</h3>
                         <p className="text-gray-400">{formT.success}</p>
                         <button onClick={() => setIsSent(false)} className="mt-8 px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors text-sm font-bold uppercase">
                           {isRTL ? "إرسال رسالة أخرى" : "Envoyer un autre message"}
                         </button>
                       </div>
                     ) : (
                       <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                         
                         {/* Name & Email Row */}
                         <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isRTL ? "md:flex-row-reverse" : ""}`}>
                            <div className="relative group">
                               <input type="text" id="name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={`peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#5319c6] transition-colors placeholder-transparent ${isRTL ? "text-right" : "text-left"}`} placeholder={formT.name} />
                               <label htmlFor="name" className={`absolute -top-4 text-xs font-bold text-gray-500 tracking-widest uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-600 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#5319c6] ${isRTL ? "right-0" : "left-0"}`}>
                                  {formT.name}
                               </label>
                            </div>
                            <div className="relative group">
                               <input type="email" id="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={`peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#5319c6] transition-colors placeholder-transparent ${isRTL ? "text-right" : "text-left"}`} placeholder={formT.email} />
                               <label htmlFor="email" className={`absolute -top-4 text-xs font-bold text-gray-500 tracking-widest uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-600 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#5319c6] ${isRTL ? "right-0" : "left-0"}`}>
                                  {formT.email}
                               </label>
                            </div>
                         </div>

                         {/* Subject */}
                         <div className="relative group">
                            <input type="text" id="subject" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className={`peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#5319c6] transition-colors placeholder-transparent ${isRTL ? "text-right" : "text-left"}`} placeholder={formT.subject} />
                            <label htmlFor="subject" className={`absolute -top-4 text-xs font-bold text-gray-500 tracking-widest uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-600 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#5319c6] ${isRTL ? "right-0" : "left-0"}`}>
                               {formT.subject}
                            </label>
                         </div>

                         {/* Message */}
                         <div className="relative group">
                            <textarea id="message" required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className={`peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#5319c6] transition-colors placeholder-transparent resize-none ${isRTL ? "text-right" : "text-left"}`} placeholder={formT.message} />
                            <label htmlFor="message" className={`absolute -top-4 text-xs font-bold text-gray-500 tracking-widest uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-600 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#5319c6] ${isRTL ? "right-0" : "left-0"}`}>
                               {formT.message}
                            </label>
                         </div>

                         {/* Submit Button */}
                         <button type="submit" className="mt-4 relative group overflow-hidden bg-white text-black px-8 py-5 font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-transform hover:scale-105 rounded-sm">
                            <div className="absolute inset-0 w-0 bg-[#ff2c34] transition-all duration-500 ease-out group-hover:w-full z-0" />
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">{formT.submit}</span>
                            <svg className={`relative z-10 w-5 h-5 group-hover:text-white transition-colors duration-300 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                         </button>

                       </form>
                     )}
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* ==========================================
          3. GOOGLE MAPS IFRAME (Dark Mode Filter)
          ========================================== */}
      <section className="h-[50vh] w-full relative bg-black">
         <iframe 
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110196.47141386518!2d-4.99127521019183!3d31.921350485906606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f6fd602f9e42d%3A0xc3bba4dbe39fba0e!2sGoulmima!5e0!3m2!1sfr!2sma!4v1711200000000!5m2!1sfr!2sma" 
           width="100%" 
           height="100%" 
           style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) opacity(0.8) grayscale(50%)" }} 
           allowFullScreen={false} 
           loading="lazy" 
           referrerPolicy="no-referrer-when-downgrade"
         />
         {/* Decorative Shadow Top */}
         <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#04040a] to-transparent pointer-events-none" />
      </section>

      <Footer />
      
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

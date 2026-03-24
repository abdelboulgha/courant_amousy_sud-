"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import LogoSVG from "./LogoSVG";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { t, lang, isRTL } = useLang();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.services, href: "/services" },
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const services = [t.services.s1t, t.services.s2t, t.services.s3t, t.services.s4t];

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: footerRef.current, start: "top 90%",
        onEnter: () => {
          gsap.fromTo(
            footerRef.current?.querySelectorAll(".footer-col") ?? [],
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power2.out" }
          );
        },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden"
      style={{ background: "#030310", borderTop: "1px solid rgba(83,25,198,0.2)" }}
      dir={isRTL ? "rtl" : "ltr"}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #5319c6, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="footer-col opacity-0 lg:col-span-1">
            <LogoSVG size={44} />
            <p className="text-gray-400 text-sm leading-relaxed mt-4 mb-6">{t.footer.desc}</p>
            <div className={`flex gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              {["F", "I", "L"].map((s) => (
                <button key={s}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(83,25,198,0.2)", border: "1px solid rgba(83,25,198,0.3)", color: "#a78bfa" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,44,52,0.2)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,44,52,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#f87171";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(83,25,198,0.2)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(83,25,198,0.3)";
                    (e.currentTarget as HTMLElement).style.color = "#a78bfa";
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col opacity-0">
            <h4 className="font-black text-sm uppercase tracking-widest mb-5" style={{ color: "#ff2c34" }}>
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className={`text-gray-400 text-sm font-medium transition-all duration-200 inline-block hover:text-white ${isRTL ? "" : "hover:translate-x-1"}`}>
                    {isRTL ? `${link.label} ←` : `→ ${link.label}`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col opacity-0">
            <h4 className="font-black text-sm uppercase tracking-widest mb-5" style={{ color: "#5319c6" }}>
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <Link href="/services"
                    className={`text-gray-400 text-sm font-medium transition-all duration-200 inline-block hover:text-white ${isRTL ? "" : "hover:translate-x-1"}`}>
                    ⚡ {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col opacity-0">
            <h4 className="font-black text-sm uppercase tracking-widest mb-5" style={{ color: "#a78bfa" }}>
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-4">
              {[
                { icon: "📍", title: t.footer.address, val: t.footer.addressVal },
                { icon: "📞", title: t.footer.phone, val: t.footer.phoneVal },
                { icon: "✉️", title: t.footer.email, val: t.footer.emailVal },
                { icon: "🕐", title: t.footer.urgent, val: t.footer.urgentVal },
              ].map((item) => (
                <li key={item.title} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                  <span className="text-lg mt-0.5">{item.icon}</span>
                  <div>
                    <div className="text-white text-sm font-semibold">{item.title}</div>
                    <div className="text-gray-400 text-sm">{item.val}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(83,25,198,0.15)" }}>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Courant Amousy Sud (CAS). {t.footer.copyright}
          </p>
          <div className={`flex gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Link href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">{t.footer.legal}</Link>
            <Link href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">{t.footer.privacy}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

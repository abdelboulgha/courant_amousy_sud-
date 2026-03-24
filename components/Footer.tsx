"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { t, isRTL } = useLang();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.services, href: "/services" },
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.contact, href: "/contact" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 92%",
        onEnter: () => {
          gsap.fromTo(
            footerRef.current?.querySelectorAll(".f-col") ?? [],
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" }
          );
        },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} style={{ background: "#030310" }} dir={isRTL ? "rtl" : "ltr"}>
      {/* Top border */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="f-col opacity-0 lg:col-span-1">
            <Image src="/assets/LOGO-PNG.png" alt="Courant Amousy Sud" width={140} height={80} style={{ objectFit: "contain" }} />
            <p className={`mt-5 text-sm leading-relaxed ${isRTL ? "text-right" : ""}`} style={{ color: "#666688" }}>
              {t.footer.desc}
            </p>
          </div>

          {/* Nav */}
          <div className="f-col opacity-0">
            <div className="text-xs font-bold uppercase tracking-[0.2em] mb-5" style={{ color: "#ff2c34" }}>
              {t.footer.nav}
            </div>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className={`text-sm transition-colors duration-150 hover:text-white block ${isRTL ? "text-right" : ""}`}
                    style={{ color: "#666688" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="f-col opacity-0">
            <div className="text-xs font-bold uppercase tracking-[0.2em] mb-5" style={{ color: "#5319c6" }}>
              {t.footer.svcTitle}
            </div>
            <ul className="space-y-3">
              {t.services.items.map((svc) => (
                <li key={svc.num}>
                  <Link href="/services"
                    className={`text-sm transition-colors duration-150 hover:text-white block ${isRTL ? "text-right" : ""}`}
                    style={{ color: "#666688" }}>
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="f-col opacity-0">
            <div className="text-xs font-bold uppercase tracking-[0.2em] mb-5" style={{ color: "#8888aa" }}>
              {t.footer.contactTitle}
            </div>
            <ul className="space-y-4">
              {[
                { label: t.footer.addr },
                { label: t.footer.phone },
                { label: t.footer.email },
                { label: t.footer.hours },
              ].map((item, i) => (
                <li key={i} className={`text-sm leading-snug ${isRTL ? "text-right" : ""}`} style={{ color: "#666688" }}>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social + bottom bar */}
        <div className="mt-14 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-xs" style={{ color: "#444466" }}>
            © {new Date().getFullYear()} Courant Amousy Sud (CAS). {t.footer.rights}
          </p>

          {/* Social icons */}
          <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="transition-colors duration-150 hover:text-white" style={{ color: "#444466" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="transition-colors duration-150 hover:text-white" style={{ color: "#444466" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn" className="transition-colors duration-150 hover:text-white" style={{ color: "#444466" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a href="#" aria-label="WhatsApp" className="transition-colors duration-150 hover:text-white" style={{ color: "#444466" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </a>

            <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.08)" }} />

            <Link href="#" className="text-xs transition-colors hover:text-white" style={{ color: "#444466" }}>
              {t.footer.legal}
            </Link>
            <Link href="#" className="text-xs transition-colors hover:text-white" style={{ color: "#444466" }}>
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

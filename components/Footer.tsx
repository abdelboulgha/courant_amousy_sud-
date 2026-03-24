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

        {/* Bottom bar */}
        <div className="mt-14 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-xs" style={{ color: "#444466" }}>
            © {new Date().getFullYear()} Courant Amousy Sud (CAS). {t.footer.rights}
          </p>
          <div className={`flex gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
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

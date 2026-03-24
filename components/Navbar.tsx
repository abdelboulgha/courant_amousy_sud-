"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLang } from "@/contexts/LanguageContext";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t, isRTL } = useLang();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.services, href: "/services" },
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.contact, href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -70, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(7,7,26,0.97)" : "rgba(7,7,26,0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-18 flex items-center justify-between gap-8" style={{ height: 72 }}>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src="/assets/LOGO-PNG.png" alt="Courant Amousy Sud" width={120} height={48} style={{ objectFit: "contain", height: 44, width: "auto" }} priority />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8" dir={isRTL ? "rtl" : "ltr"}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="nav-ul text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-150"
                style={{ color: isActive ? "#ff2c34" : "#aaaacc" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isActive ? "#ff2c34" : "#aaaacc"; }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: lang + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/contact"
            className="px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all duration-200 hover:opacity-90"
            style={{ background: "#ff2c34", color: "#ffffff" }}>
            {t.nav.cta}
          </Link>
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            className="flex flex-col gap-1.5 p-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className="block w-5 h-0.5 bg-white transition-all duration-200"
              style={{ transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none" }} />
            <span className="block w-5 h-0.5 bg-white transition-all duration-200"
              style={{ opacity: menuOpen ? 0 : 1, width: menuOpen ? 0 : undefined }} />
            <span className="block w-5 h-0.5 bg-white transition-all duration-200"
              style={{ transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "380px" : "0",
          background: "#07071a",
          borderTop: menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="px-6 py-5 flex flex-col gap-1" dir={isRTL ? "rtl" : "ltr"}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className={`py-3 text-sm font-bold uppercase tracking-wider border-b transition-colors ${isRTL ? "text-right" : ""}`}
              style={{ color: pathname === link.href ? "#ff2c34" : "#aaaacc", borderColor: "rgba(255,255,255,0.05)" }}
              onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/contact"
            className="mt-4 py-3 text-xs font-black uppercase tracking-widest text-center"
            style={{ background: "#ff2c34", color: "#fff" }}
            onClick={() => setMenuOpen(false)}>
            {t.nav.cta}
          </Link>
        </div>
      </div>
    </nav>
  );
}

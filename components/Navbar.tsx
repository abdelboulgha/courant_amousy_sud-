"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import LogoSVG from "./LogoSVG";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLang } from "@/contexts/LanguageContext";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        linksRef.current.filter(Boolean),
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out", delay: 0.6 }
      );
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)", delay: 1 }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10, 10, 30, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(83,25,198,0.3)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Courant Amousy Sud">
          <LogoSVG size={44} />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => { linksRef.current[i] = el; }}
                className="nav-link text-sm font-bold uppercase tracking-wider transition-colors"
                style={{ color: isActive ? "#ff2c34" : "#ffffff" }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { color: "#ff2c34", duration: 0.2 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { color: isActive ? "#ff2c34" : "#ffffff", duration: 0.2 })}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side: lang switcher + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/contact"
            ref={ctaRef}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #5319c6, #ff2c34)",
              color: "#fff",
              boxShadow: "0 4px 24px rgba(83,25,198,0.4)",
            }}
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, { boxShadow: "0 4px 32px rgba(255,44,52,0.6)", duration: 0.3 })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, { boxShadow: "0 4px 24px rgba(83,25,198,0.4)", duration: 0.3 })
            }
          >
            ⚡ {t.nav.cta}
          </Link>
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className="block w-6 h-0.5 bg-white transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <span className="block w-6 h-0.5 bg-white transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-0.5 bg-white transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{
          maxHeight: menuOpen ? "400px" : "0",
          background: "rgba(10,10,30,0.97)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          className="px-6 py-6 flex flex-col gap-4 border-t border-purple-900/30"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-bold uppercase tracking-wider transition-colors hover:text-red-400 py-2 border-b border-purple-900/20"
              style={{ color: pathname === link.href ? "#ff2c34" : "#fff" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold uppercase tracking-wider"
            style={{ background: "linear-gradient(135deg, #5319c6, #ff2c34)", color: "#fff" }}
            onClick={() => setMenuOpen(false)}
          >
            ⚡ {t.nav.cta}
          </Link>
        </div>
      </div>
    </nav>
  );
}

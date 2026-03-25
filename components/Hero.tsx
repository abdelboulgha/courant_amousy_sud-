"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Config ─────────────────────────────────────────────── */
const TOTAL_FRAMES = 197;
const SCROLL_MULTIPLIER = 9; // section height = 9 × 100vh — more scroll time for logo reveal
const SCRUB = 0.8;
const FRAME_END_PROGRESS = 0.80; // last frame locked in at 80% → rest is for logo

const frameSrc = (i: number) =>
  `/assets/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

// Labels: which scroll range each word appears (7 services)
const LABELS = [
  { fr: "Électricité",       ar: "الكهرباء",       start: 0.02, end: 0.13 },
  { fr: "Plomberie",         ar: "السباكة",        start: 0.14, end: 0.25 },
  { fr: "Climatisation",     ar: "تكييف الهواء",   start: 0.26, end: 0.37 },
  { fr: "Vidéosurveillance", ar: "المراقبة",       start: 0.38, end: 0.49 },
  { fr: "Système d'alarme",  ar: "نظام الإنذار",   start: 0.50, end: 0.61 },
  { fr: "Peinture & Plâtre", ar: "الطلاء والجبس",  start: 0.62, end: 0.72 },
  { fr: "Travaux divers",    ar: "أعمال متنوعة",   start: 0.73, end: 0.82 },
];

/* ─── Component ───────────────────────────────────────────── */
export default function Hero() {
  const outerRef       = useRef<HTMLElement>(null);
  const stickyRef      = useRef<HTMLDivElement>(null);
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const imagesRef      = useRef<HTMLImageElement[]>([]);
  const frameIndexRef  = useRef(0);
  const rafRef         = useRef<number | null>(null);

  const heroTextRef    = useRef<HTMLDivElement>(null);
  const loadingRef     = useRef<HTMLDivElement>(null);
  const scrollIndRef   = useRef<HTMLDivElement>(null);
  const labelRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRevealRef  = useRef<HTMLDivElement>(null);

  const [loadPct, setLoadPct]   = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { t, lang, isRTL } = useLang();

  /* ── Draw one frame on canvas (cover-fit) ─────────────── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img    = imagesRef.current[index];
    if (!canvas || !img?.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover-fit: crop the image to fill the canvas
    const cRatio = cw / ch;
    const iRatio = iw / ih;

    let sx = 0, sy = 0, sw = iw, sh = ih;
    if (iRatio > cRatio) {
      sw = ih * cRatio;
      sx = (iw - sw) / 2;
    } else {
      sh = iw / cRatio;
      sy = (ih - sh) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }, []);

  /* ── Resize canvas to viewport ────────────────────────── */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(frameIndexRef.current);
  }, [drawFrame]);

  /* ── Preload all frames ───────────────────────────────── */
  useEffect(() => {
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let done = 0;

    const onDone = () => {
      done++;
      setLoadPct(Math.round((done / TOTAL_FRAMES) * 100));
      if (done === TOTAL_FRAMES) {
        imagesRef.current = imgs;
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload  = onDone;
      img.onerror = onDone; // keep counting even on 404
      img.src     = frameSrc(i);
      imgs[i]     = img;
    }

    return () => {
      imgs.forEach((img) => { img.onload = null; img.onerror = null; });
    };
  }, []);

  /* ── Setup GSAP + ScrollTrigger (only after preload) ──── */
  useEffect(() => {
    if (!isLoaded) return;

    // Init canvas size
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Dismiss loading screen
    gsap.to(loadingRef.current, {
      opacity: 0, duration: 0.5, delay: 0.1,
      onComplete: () => {
        if (loadingRef.current) loadingRef.current.style.display = "none";
      },
    });

    // Entrance animation for hero text
    gsap.fromTo(
      heroTextRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.35 }
    );

    // Init labels hidden
    labelRefs.current.forEach((el) => {
      if (!el) return;
      el.style.opacity   = "0";
      el.style.transform = "translateX(-50%) translateY(24px)";
    });

    // Init logo hidden
    if (logoRevealRef.current) {
      logoRevealRef.current.style.opacity   = "0";
      logoRevealRef.current.style.transform = "translate(-50%, -50%) scale(0.3)";
    }

    // Draw first frame
    drawFrame(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: outerRef.current,
        start:   "top top",
        end:     "bottom bottom",
        scrub:   SCRUB,
        onUpdate(self) {
          const p = self.progress;

          // ─ Frame update (locked at last frame after FRAME_END_PROGRESS) ──
          const frameProg = Math.min(p / FRAME_END_PROGRESS, 1);
          const newIdx = Math.min(
            Math.floor(frameProg * (TOTAL_FRAMES - 1)),
            TOTAL_FRAMES - 1
          );
          if (newIdx !== frameIndexRef.current) {
            frameIndexRef.current = newIdx;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => drawFrame(newIdx));
          }

          // ─ Progress bar ──────────────────────────────────
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${p})`;
          }

          // ─ Hero text (visible at start, fades out) ───────
          if (heroTextRef.current) {
            const FADE_START = 0.06;
            const FADE_END   = 0.22;
            let a = 1;
            if (p > FADE_START) {
              a = Math.max(0, 1 - (p - FADE_START) / (FADE_END - FADE_START));
            }
            heroTextRef.current.style.opacity   = String(a);
            heroTextRef.current.style.transform = `translateY(${-(1 - a) * 28}px)`;
          }

          // ─ Scroll indicator ──────────────────────────────
          if (scrollIndRef.current) {
            scrollIndRef.current.style.opacity = String(
              Math.max(0, 1 - p / 0.07)
            );
          }

          // ─ Logo reveal (after Travaux divers, grows over 18% scroll) ──
          if (logoRevealRef.current) {
            const LOGO_START = 0.82;
            const LOGO_FULL  = 1.00;
            const a = p >= LOGO_START
              ? Math.min(1, (p - LOGO_START) / (LOGO_FULL - LOGO_START))
              : 0;
            logoRevealRef.current.style.opacity = String(a);
            // Scale 0.3 → 1.0 — dramatic grow over the whole remaining scroll
            const scale = 0.3 + a * 0.7;
            logoRevealRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
          }

          // ─ Labels fade in/out ────────────────────────────
          LABELS.forEach((label, i) => {
            const el = labelRefs.current[i];
            if (!el) return;

            if (p >= label.start && p <= label.end) {
              const range   = label.end - label.start;
              const fadeLen = range * 0.22;
              let a = 1;
              if (p < label.start + fadeLen) {
                a = (p - label.start) / fadeLen;
              } else if (p > label.end - fadeLen) {
                a = (label.end - p) / fadeLen;
              }
              const alpha = Math.max(0, Math.min(1, a));
              el.style.opacity   = String(alpha);
              el.style.transform = `translateX(-50%) translateY(${(1 - alpha) * 18}px)`;
            } else {
              el.style.opacity   = "0";
              el.style.transform = "translateX(-50%) translateY(24px)";
            }
          });
        },
      });
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctx.revert();
    };
  }, [isLoaded, drawFrame, resizeCanvas]);

  /* ─── Render ────────────────────────────────────────────── */
  return (
    <section
      ref={outerRef}
      style={{ position: "relative", height: `${SCROLL_MULTIPLIER * 100}vh` }}
      aria-label="Hero"
    >
      {/* ── Sticky viewport ─────────────────────────────── */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#07071a",
        }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            willChange: "contents",
          }}
        />

        {/* Vignette overlay */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background:
              "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 25%, rgba(0,0,0,0.68) 100%)",
          }}
        />

        {/* Top-bottom cinematic gradient */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(83,25,198,0.14) 0%, transparent 20%, transparent 65%, rgba(7,7,26,0.72) 100%)",
          }}
        />

        {/* Subtle red left-side flare */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background:
              "radial-gradient(ellipse 50% 60% at 0% 50%, rgba(255,44,52,0.07) 0%, transparent 70%)",
          }}
        />

        {/* ── Loading screen ───────────────────────────── */}
        <div
          ref={loadingRef}
          style={{
            position: "absolute", inset: 0,
            background: "#07071a",
            zIndex: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Logo text */}
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#ffffff",
              marginBottom: 28,
            }}
          >
            Courant Amousy Sud
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: 220,
              height: 1,
              background: "rgba(255,255,255,0.07)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #5319c6, #ff2c34)",
                width: `${loadPct}%`,
                transition: "width 0.1s linear",
              }}
            />
          </div>

          <div
            style={{
              marginTop: 12,
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#444466",
            }}
          >
            {loadPct}%
          </div>
        </div>

        {/* ── Hero text ─────────────────────────────────── */}
        <div
          ref={heroTextRef}
          dir={isRTL ? "rtl" : "ltr"}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            opacity: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(20px, 4vw, 60px)",
            paddingTop: 90,
            paddingBottom: "clamp(20px, 4vh, 44px)",
          }}
        >

          {/* ── TOP: eyebrow ─────────────────────────────── */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            flexDirection: isRTL ? "row-reverse" : "row",
            justifyContent: "center",
          }}>
            <span style={{ width: 20, height: 2, background: "#ff2c34", display: "block", flexShrink: 0 }} />
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.32em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.38)",
            }}>
              {t.hero.tagline}
            </span>
            <span style={{ width: 20, height: 2, background: "#ff2c34", display: "block", flexShrink: 0 }} />
          </div>

          {/* ── MIDDLE: main content ──────────────────────── */}
          <div style={{ position: "relative", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>

            {/* Decorative "7" watermark behind title */}
            <span aria-hidden style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "clamp(180px, 30vw, 400px)",
              fontWeight: 900,
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.03)",
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
              letterSpacing: "-0.04em",
              zIndex: -1,
            }}>7</span>

            {/* Title */}
            <h1 style={{ margin: 0, padding: 0 }}>
              {/* Line 1 — white fill */}
              <span style={{
                display: "block",
                fontSize: "clamp(34px, 6vw, 90px)",
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                textShadow: "0 0 40px rgba(0,0,0,0.5)",
              }}>
                {t.hero.h1a}
              </span>
              {/* Line 2 — outlined only (text-stroke), no fill */}
              <span style={{
                display: "block",
                fontSize: "clamp(34px, 6vw, 90px)",
                fontWeight: 900,
                color: "transparent",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                WebkitTextStroke: "2px #ff2c34",
                filter: "drop-shadow(0 0 20px rgba(255,44,52,0.3))",
              }}>
                {t.hero.h1b}
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{
              margin: "24px auto 0",
              fontSize: 14,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 500,
              textAlign: "center",
            }}>
              {t.hero.sub}
            </p>

            {/* CTA buttons */}
            <div style={{
              marginTop: 32,
              display: "flex", gap: 12, flexWrap: "wrap",
              justifyContent: "center",
            }}>
              <Link href="/services" style={{
                display: "inline-flex", alignItems: "center", gap: 9,
                padding: "14px 32px",
                background: "#ff2c34",
                color: "#ffffff",
                fontSize: 10, fontWeight: 800,
                textTransform: "uppercase", letterSpacing: "0.2em",
                textDecoration: "none",
                transition: "background 0.2s",
                boxShadow: "0 10px 30px -10px rgba(255,44,52,0.5)",
              }}>
                {t.hero.btn1}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ transform: isRTL ? "rotate(180deg)" : "none" }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px",
                background: "rgba(0,0,0,0.4)",
                color: "#ffffff",
                fontSize: 10, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.2em",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                transition: "background 0.2s, border 0.2s",
              }}>
                {t.hero.btn2}
              </Link>
            </div>
          </div>

          {/* ── BOTTOM: stats bar full width ─────────────── */}
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 0,
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 16,
            flexDirection: isRTL ? "row-reverse" : "row",
          }}>
            {t.stats.map((s, i) => (
              <div key={i} style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 4,
                textAlign: "center",
                borderRight: i < t.stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                paddingLeft: 8,
                paddingRight: 8,
              }}>
                <span style={{
                  fontSize: "clamp(18px, 2.2vw, 30px)", fontWeight: 900,
                  color: i === 0 ? "#ff2c34" : "#ffffff",
                  letterSpacing: "-0.03em", lineHeight: 1,
                }}>
                  {s.value}
                </span>
                <span style={{
                  fontSize: 8, fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.28)",
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* ── Scroll-synced service labels ─────────────── */}
        {LABELS.map((label, i) => (
          <div
            key={i}
            ref={(el) => { labelRefs.current[i] = el; }}
            style={{
              position: "absolute",
              bottom: "15%",
              left: "50%",
              transform: "translateX(-50%) translateY(24px)",
              zIndex: 25,
              textAlign: "center",
              opacity: 0,
              pointerEvents: "none",
              width: "max-content",
              maxWidth: "90vw",
            }}
          >
            {/* Word */}
            <span
              style={{
                display: "block",
                fontSize: "clamp(34px, 6.5vw, 78px)",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.025em",
                lineHeight: 1,
                textShadow:
                  "0 0 80px rgba(83,25,198,0.55), 0 2px 24px rgba(0,0,0,0.6)",
              }}
            >
              {lang === "ar" ? label.ar : label.fr}
            </span>

            {/* Accent line */}
            <span
              style={{
                display: "block",
                width: 36,
                height: 3,
                background: "#ff2c34",
                margin: "14px auto 0",
              }}
            />
          </div>
        ))}

        {/* ── Logo reveal (end of scroll) ─────────────── */}
        <div
          ref={logoRevealRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(0.3)",
            zIndex: 26,
            opacity: 0,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/LOGO-PNG.png"
            alt="Courant Amousy Sud"
            style={{ width: "clamp(180px, 22vw, 300px)", height: "auto", filter: "drop-shadow(0 0 60px rgba(83,25,198,0.8)) drop-shadow(0 0 30px rgba(255,44,52,0.4))" }}
          />
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
          }}>
            Courant Amousy Sud
          </span>
          <span style={{
            display: "block",
            width: 40,
            height: 2,
            background: "linear-gradient(90deg, #5319c6, #ff2c34)",
          }} />

          {/* CTA */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 8 }}>
            <p style={{
              fontSize: "clamp(12px, 1.4vw, 16px)",
              color: "rgba(255,255,255,0.65)",
              letterSpacing: "0.05em",
              textAlign: "center",
              maxWidth: 320,
              lineHeight: 1.6,
            }}>
              {isRTL
                ? "هل لديك مشروع؟ نحن هنا لتحويله إلى واقع."
                : "Un projet en tête ? Nous sommes là pour le concrétiser."}
            </p>
            <a
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 36px",
                background: "#ff2c34",
                color: "#ffffff",
                fontSize: 10,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                textDecoration: "none",
                boxShadow: "0 10px 40px -10px rgba(255,44,52,0.7)",
                transition: "background 0.2s",
              }}
            >
              {isRTL ? "تواصل معنا" : "Nous contacter"}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Scroll indicator ────────────────────────── */}
        <div
          ref={scrollIndRef}
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 7,
          }}
        >
          <span
            style={{
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            {t.hero.scroll}
          </span>
          <div
            style={{
              width: 1,
              height: 34,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
            }}
          />
        </div>

        {/* ── Scroll progress bar (bottom edge) ──────── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "rgba(255,255,255,0.05)",
            zIndex: 30,
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #5319c6, #ff2c34)",
              transformOrigin: "left",
              transform: "scaleX(0)",
            }}
          />
        </div>

      </div>{/* end sticky */}
    </section>
  );
}

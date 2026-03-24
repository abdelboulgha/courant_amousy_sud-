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
const TOTAL_FRAMES = 192;
const SCROLL_MULTIPLIER = 6; // section height = 6 × 100vh
const SCRUB = 0.8;

const frameSrc = (i: number) =>
  `/assets/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

// Labels: which scroll range each word appears (7 services)
const LABELS = [
  { fr: "Électricité",       ar: "الكهرباء",       start: 0.02, end: 0.17 },
  { fr: "Plomberie",         ar: "السباكة",        start: 0.18, end: 0.31 },
  { fr: "Climatisation",     ar: "تكييف الهواء",   start: 0.32, end: 0.46 },
  { fr: "Vidéosurveillance", ar: "المراقبة",       start: 0.47, end: 0.61 },
  { fr: "Système d'alarme",  ar: "نظام الإنذار",   start: 0.62, end: 0.74 },
  { fr: "Peinture & Plâtre", ar: "الطلاء والجبس",  start: 0.75, end: 0.87 },
  { fr: "Travaux divers",    ar: "أعمال متنوعة",   start: 0.88, end: 0.97 },
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

          // ─ Frame update ─────────────────────────────────
          const newIdx = Math.min(
            Math.floor(p * (TOTAL_FRAMES - 1)),
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
          }}>
            <span style={{ width: 20, height: 2, background: "#ff2c34", display: "block", flexShrink: 0 }} />
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.32em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.38)",
            }}>
              {t.hero.tagline}
            </span>
          </div>

          {/* ── MIDDLE: main content ──────────────────────── */}
          <div style={{ position: "relative" }}>

            {/* Decorative "7" watermark behind title */}
            <span aria-hidden style={{
              position: "absolute",
              top: "50%", right: isRTL ? "auto" : "-2%", left: isRTL ? "-2%" : "auto",
              transform: "translateY(-55%)",
              fontSize: "clamp(160px, 22vw, 300px)",
              fontWeight: 900,
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.04)",
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
              letterSpacing: "-0.04em",
            }}>7</span>

            {/* Left vertical accent line */}
            {!isRTL && (
              <span aria-hidden style={{
                position: "absolute",
                left: -20, top: 0, bottom: 0,
                width: 2,
                background: "linear-gradient(to bottom, #ff2c34, transparent)",
              }} />
            )}
            {isRTL && (
              <span aria-hidden style={{
                position: "absolute",
                right: -20, top: 0, bottom: 0,
                width: 2,
                background: "linear-gradient(to bottom, #ff2c34, transparent)",
              }} />
            )}

            {/* Title */}
            <h1 style={{ margin: 0, padding: 0 }}>
              {/* Line 1 — white fill */}
              <span style={{
                display: "block",
                fontSize: "clamp(34px, 5.5vw, 82px)",
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
              }}>
                {t.hero.h1a}
              </span>
              {/* Line 2 — outlined only (text-stroke), no fill */}
              <span style={{
                display: "block",
                fontSize: "clamp(34px, 5.5vw, 82px)",
                fontWeight: 900,
                color: "transparent",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                WebkitTextStroke: "2px #ff2c34",
              }}>
                {t.hero.h1b}
              </span>
            </h1>

            {/* Horizontal rule */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12, margin: "18px 0",
              flexDirection: isRTL ? "row-reverse" : "row",
            }}>
              <span style={{ width: 36, height: 1, background: "#ff2c34", display: "block" }} />
              <span style={{ width: 60, height: 1, background: "rgba(255,255,255,0.1)", display: "block" }} />
            </div>

            {/* Subtitle */}
            <p style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 400,
              textAlign: isRTL ? "right" : "left",
            }}>
              {t.hero.sub}
            </p>

            {/* CTA buttons */}
            <div style={{
              marginTop: 26,
              display: "flex", gap: 10, flexWrap: "wrap",
              justifyContent: isRTL ? "flex-end" : "flex-start",
            }}>
              <Link href="/services" style={{
                display: "inline-flex", alignItems: "center", gap: 9,
                padding: "13px 26px",
                background: "#ff2c34",
                color: "#ffffff",
                fontSize: 10, fontWeight: 800,
                textTransform: "uppercase", letterSpacing: "0.2em",
                textDecoration: "none",
                transition: "background 0.2s",
              }}>
                {t.hero.btn1}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ transform: isRTL ? "rotate(180deg)" : "none" }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 26px",
                background: "rgba(255,255,255,0.05)",
                color: "#ffffff",
                fontSize: 10, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.2em",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.14)",
                backdropFilter: "blur(6px)",
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

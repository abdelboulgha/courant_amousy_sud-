"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const screenRef = useRef<HTMLDivElement>(null);
  const boltRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(screenRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => setShow(false),
          });
        },
      });

      tl.fromTo(
        boltRef.current,
        { scale: 0, rotation: -30 },
        { scale: 1, rotation: 0, duration: 0.7, ease: "back.out(2)" }
      )
        .fromTo(
          textRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.2"
        )
        .fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power2.inOut", transformOrigin: "left" }
        )
        .to({}, { duration: 0.3 }); // brief pause
    });

    return () => ctx.revert();
  }, []);

  if (!show) return null;

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#07071a" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(83,25,198,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Bolt icon */}
      <div ref={boltRef} className="mb-6">
        <svg
          width="72"
          height="88"
          viewBox="0 0 100 130"
          fill="none"
          style={{
            filter:
              "drop-shadow(0 0 20px rgba(255,44,52,0.8)) drop-shadow(0 0 40px rgba(83,25,198,0.5))",
          }}
        >
          <path
            d="M60 5 L28 62 L50 62 L40 125 L72 58 L50 58 Z"
            fill="url(#loadGrad)"
          />
          <defs>
            <linearGradient id="loadGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff2c34" />
              <stop offset="100%" stopColor="#5319c6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Text */}
      <div ref={textRef} className="text-center mb-8">
        <div
          className="text-xl font-black uppercase tracking-widest"
          style={{ color: "#ffffff" }}
        >
          Courant Amousy Sud
        </div>
        <div
          className="text-xs font-semibold uppercase tracking-[0.25em] mt-1"
          style={{ color: "#a78bfa" }}
        >
          Chargement...
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="w-48 h-0.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.1)" }}
      >
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #5319c6, #ff2c34)",
            transformOrigin: "left",
          }}
        />
      </div>
    </div>
  );
}

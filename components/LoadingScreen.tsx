"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const screenRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(screenRef.current, {
            opacity: 0, duration: 0.4, ease: "power2.out",
            onComplete: () => setShow(false),
          });
        },
      });

      tl.fromTo(textRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.inOut", transformOrigin: "left" })
        .to({}, { duration: 0.2 });
    });
    return () => ctx.revert();
  }, []);

  if (!show) return null;

  return (
    <div ref={screenRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#07071a" }}>
      <div ref={textRef} className="text-center mb-8">
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-white mb-1">Courant Amousy Sud</div>
        <div className="text-xs uppercase tracking-[0.2em]" style={{ color: "#444466" }}>Chargement</div>
      </div>
      <div className="w-40 h-px overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div ref={barRef} className="h-full" style={{ background: "linear-gradient(90deg, #5319c6, #ff2c34)" }} />
      </div>
    </div>
  );
}

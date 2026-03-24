"use client";

import Image from "next/image";

interface LogoSVGProps {
  size?: number;
  variant?: "color" | "white";
}

export default function LogoSVG({ size = 52, variant = "color" }: LogoSVGProps) {
  return (
    <div className="flex items-center">
      <Image
        src="/assets/LOGO-PNG.png"
        alt="Courant Amousy Sud"
        width={size * 2.2}
        height={size}
        priority
        style={{
          objectFit: "contain",
          // On white variant (footer dark bg) keep as-is; on dark bg the PNG already has transparency
          filter: variant === "white" ? "brightness(0) invert(1)" : "none",
        }}
      />
    </div>
  );
}

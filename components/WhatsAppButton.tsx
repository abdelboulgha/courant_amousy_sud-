"use client";

export default function WhatsAppButton() {
  const phone = "212602467222"; // 0602467222 → +212 (Maroc)
  const message = encodeURIComponent("Bonjour, je souhaite obtenir un devis.");
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactez-nous sur WhatsApp"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 9999,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "#25d366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.12)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 28px rgba(37,211,102,0.65)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(37,211,102,0.45)";
      }}
    >
      {/* WhatsApp SVG icon */}
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 2C8.268 2 2 8.268 2 16c0 2.48.648 4.806 1.782 6.822L2 30l7.382-1.758A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
          fill="#fff"
        />
        <path
          d="M16 4.5C9.596 4.5 4.5 9.596 4.5 16c0 2.22.618 4.296 1.694 6.066L5 27l5.09-1.178A11.46 11.46 0 0016 27.5c6.404 0 11.5-5.096 11.5-11.5S22.404 4.5 16 4.5z"
          fill="#25d366"
        />
        <path
          d="M21.5 18.92c-.3-.15-1.77-.874-2.046-.974-.274-.1-.474-.15-.674.15-.2.3-.774.974-.95 1.174-.174.2-.35.225-.648.075-.3-.15-1.266-.466-2.412-1.487-.892-.796-1.494-1.778-1.67-2.078-.174-.3-.018-.462.132-.61.134-.133.3-.348.45-.522.15-.174.2-.3.3-.498.1-.2.05-.374-.025-.524-.075-.15-.674-1.624-.924-2.224-.242-.582-.49-.503-.674-.513-.174-.009-.374-.011-.574-.011s-.524.075-.8.374c-.274.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.224 5.118 4.52.716.308 1.274.492 1.71.63.718.228 1.372.196 1.888.118.576-.086 1.772-.724 2.022-1.424.25-.7.25-1.3.174-1.424-.075-.125-.274-.2-.574-.35z"
          fill="#fff"
        />
      </svg>
    </a>
  );
}

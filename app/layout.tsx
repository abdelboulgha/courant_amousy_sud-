import type { Metadata } from "next";
import { Nunito, Tajawal } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "Courant Amousy Sud | Multi-Services",
  description:
    "Courant Amousy Sud (CAS) — Électricité, plomberie, climatisation, vidéosurveillance, système d'alarme, peinture & plâtre et travaux divers. Solutions fiables dans la région Sud.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr" className={`${nunito.variable} ${tajawal.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

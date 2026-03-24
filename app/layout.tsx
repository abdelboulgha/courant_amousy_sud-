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
  title: "Courant Amousy Sud | Travaux Électriques",
  description:
    "Courant Amousy Sud (CAS) — Expert en travaux électriques, installation industrielle, maintenance et dépannage rapide.",
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

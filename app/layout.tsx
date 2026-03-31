import type { Metadata } from "next";
import { Bebas_Neue, Nunito, Tajawal } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";

// Cubano substitute — bold condensed uppercase, nearly identical
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

// SK Reykjavik Rounded substitute — rounded clean sans
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
  title: "Courant Amousy Sud | Électricité, Plomberie & Multi-Services",

  description:
    "Courant Amousy Sud (CAS) — Experts en électricité, plomberie, climatisation, vidéosurveillance, système d'alarme, peinture & plâtre. Interventions rapides et fiables dans la région Sud du Maroc.",

  keywords: [
    "electricite maroc sud",
    "plomberie maroc",
    "climatisation maroc",
    "videosurveillance maroc",
    "systeme alarme maroc",
    "peinture platre maroc",
    "multi services maroc",
    "courant amousy sud",
    "CAS maroc",
    "travaux batiment maroc sud",
    "electricien maroc",
    "plombier maroc",
  ],

  authors: [{ name: "Courant Amousy Sud" }],
  creator: "Courant Amousy Sud",

  metadataBase: new URL("https://courant-amousy-sud.ma"),

  icons: {
    icon: "/assets/LOGO-PNG.png",
    shortcut: "/assets/LOGO-PNG.png",
    apple: "/assets/LOGO-PNG.png",
  },

  openGraph: {
    title: "Courant Amousy Sud | Électricité, Plomberie & Multi-Services",
    description:
      "Solutions complètes en électricité, plomberie, climatisation, vidéosurveillance et travaux divers. Qualité et réactivité dans la région Sud du Maroc.",
    url: "https://courant-amousy-sud.ma",
    siteName: "Courant Amousy Sud",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Courant Amousy Sud - Multi-Services Maroc",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Courant Amousy Sud | Multi-Services Maroc",
    description:
      "Électricité, plomberie, climatisation, vidéosurveillance et travaux divers dans la région Sud du Maroc.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr" className={`${bebasNeue.variable} ${nunito.variable} ${tajawal.variable} scroll-smooth`}>
      <head>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Courant Amousy Sud",
              url: "https://courant-amousy-sud.ma",
              telephone: "+212XXXXXXXXX",
              address: {
                "@type": "PostalAddress",
                addressCountry: "MA",
                addressRegion: "Région Sud",
              },
              description:
                "Experts en électricité, plomberie, climatisation, vidéosurveillance, système d'alarme, peinture & plâtre et travaux divers dans la région Sud du Maroc.",
              areaServed: "Morocco",
              sameAs: [
                "https://facebook.com/",
                "https://instagram.com/",
              ],
            }),
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="min-h-screen antialiased">
        <ScrollToTop />
        <LanguageProvider>{children}</LanguageProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}

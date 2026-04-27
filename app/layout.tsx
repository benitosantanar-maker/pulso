import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Café Comercial — Economía y Negocios",
    template: "%s | Café Comercial",
  },
  description:
    "Tu plataforma de conocimiento en economía y negocios. Noticias, análisis, conceptos y guías para entender lo que pasa en el mundo — y por qué importa.",
  keywords: [
    "economía", "finanzas", "negocios", "mercados", "innovación",
    "emprendimiento", "Chile", "brief", "análisis",
  ],
  metadataBase: new URL("https://cafecomercial.vercel.app"),
  alternates: { canonical: "https://cafecomercial.vercel.app" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Café Comercial — Economía y Negocios",
    description: "Noticias, análisis, conceptos y guías de economía y negocios. Tu lugar de confianza para entender lo que está pasando.",
    url: "https://cafecomercial.vercel.app",
    type: "website",
    locale: "es_CL",
    siteName: "Café Comercial",
  },
  twitter: {
    card: "summary_large_image",
    title: "Café Comercial — Economía y Negocios",
    description: "Economía · Finanzas · Mercados · Innovación. Tu plataforma de conocimiento.",
    site: "@cafecomercial",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ background: "var(--paper)", color: "var(--ink)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

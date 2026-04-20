import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Café Comercial — Noticias para ingenieros comerciales",
    template: "%s | Café Comercial",
  },
  description:
    "Las noticias y explicaciones que un ingeniero comercial necesita para entender el mundo de los negocios en pocos minutos. Economía, finanzas, marketing, innovación y estrategia.",
  keywords: [
    "ingeniería comercial",
    "economía",
    "finanzas",
    "marketing",
    "innovación",
    "negocios",
    "noticias",
    "brief",
  ],
  openGraph: {
    title: "Café Comercial",
    description:
      "Noticias de economía, finanzas, marketing e innovación para ingenieros comerciales.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

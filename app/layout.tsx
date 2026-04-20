import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/ui/ThemeProvider";

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
    "noticias Chile",
    "brief",
  ],
  metadataBase: new URL("https://cafecomercial.vercel.app"),
  openGraph: {
    title: "Café Comercial — Lo esencial para ingenieros comerciales",
    description:
      "Noticias de economía, finanzas, marketing e innovación para ingenieros comerciales. Sin ruido, con contexto.",
    type: "website",
    locale: "es_CL",
    siteName: "Café Comercial",
  },
  twitter: {
    card: "summary_large_image",
    title: "Café Comercial",
    description: "Lo esencial para ingenieros comerciales.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-gray-950 transition-colors duration-200">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

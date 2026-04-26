export const revalidate = 120; // ISR: revalidar cada 2 min

import Hero from "@/components/home/Hero";
import CategoriasGrid from "@/components/home/CategoriasGrid";
import NoticiasGrid from "@/components/home/NoticiasGrid";
import TendenciasSection from "@/components/home/TendenciasSection";
import MasLeidas from "@/components/home/MasLeidas";
import DatosChile from "@/components/home/DatosChile";
import ExplicadoSimple from "@/components/home/ExplicadoSimple";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import NewsletterModal from "@/components/ui/NewsletterModal";

export default function HomePage() {
  return (
    <>
      {/* Spacer for fixed editorial header: ticker(34) + header-top(~74) + nav(~40) */}
      <div style={{ height: "148px" }} aria-hidden="true" />
      <Hero />
      <CategoriasGrid />
      <TendenciasSection />
      <MasLeidas />
      <NoticiasGrid />
      <DatosChile />
      <ExplicadoSimple />
      <NewsletterBanner />
      <NewsletterModal />
    </>
  );
}

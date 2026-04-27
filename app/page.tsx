export const revalidate = 120;

import Hero from "@/components/home/Hero";
import DataStrip from "@/components/home/DataStrip";
import CategoriasGrid from "@/components/home/CategoriasGrid";
import NoticiasGrid from "@/components/home/NoticiasGrid";
import AnalisisSection from "@/components/home/AnalisisSection";
import ExplicadoSimple from "@/components/home/ExplicadoSimple";
import GuiasSection from "@/components/home/GuiasSection";
import DatosChile from "@/components/home/DatosChile";
import InnovacionSection from "@/components/home/InnovacionSection";
import TendenciasSection from "@/components/home/TendenciasSection";
import FeedEnVivo from "@/components/home/FeedEnVivo";
import NewsletterBanner from "@/components/home/NewsletterBanner";

export default function HomePage() {
  return (
    <>
      <DataStrip />
      <Hero />
      <CategoriasGrid />
      <NoticiasGrid />
      <AnalisisSection />
      <ExplicadoSimple />
      <GuiasSection />
      <DatosChile />
      <InnovacionSection />
      <TendenciasSection />
      <FeedEnVivo />
      <NewsletterBanner />
    </>
  );
}

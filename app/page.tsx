export const revalidate = 120; // ISR: regenera el HTML cada 2 minutos

import Hero from "@/components/home/Hero";
import DataStrip from "@/components/home/DataStrip";
import CategoriasGrid from "@/components/home/CategoriasGrid";
import NoticiasGrid from "@/components/home/NoticiasGrid";
import AnalisisSection from "@/components/home/AnalisisSection";
import GuiasSection from "@/components/home/GuiasSection";
import DatosChile from "@/components/home/DatosChile";
import InnovacionSection from "@/components/home/InnovacionSection";
import TendenciasSection from "@/components/home/TendenciasSection";
import FeedEnVivo from "@/components/home/FeedEnVivo";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import AutoRefresh from "@/components/ui/AutoRefresh";

export default function HomePage() {
  return (
    <>
      {/* Auto-refresh cada 5 minutos sin recarga completa */}
      <AutoRefresh intervalMs={300_000} />

      <DataStrip />
      <Hero />
      <CategoriasGrid />
      <NoticiasGrid />
      <AnalisisSection />
      <GuiasSection />
      <DatosChile />
      <InnovacionSection />
      <TendenciasSection />
      <FeedEnVivo />
      <NewsletterBanner />
    </>
  );
}

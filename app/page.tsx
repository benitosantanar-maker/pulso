export const revalidate = 120; // ISR: revalidar cada 2 min

import Hero from "@/components/home/Hero";
import LoEsencial from "@/components/home/LoEsencial";
import CategoriasGrid from "@/components/home/CategoriasGrid";
import TendenciasSection from "@/components/home/TendenciasSection";
import DatosChile from "@/components/home/DatosChile";
import NoticiasGrid from "@/components/home/NoticiasGrid";
import ExplicadoSimple from "@/components/home/ExplicadoSimple";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import NewsletterModal from "@/components/ui/NewsletterModal";

export default function HomePage() {
  return (
    <>
      {/* 1. Propuesta de valor + CTA suscripción */}
      <Hero />

      {/* 2. El corazón del producto: noticias curadas con contexto */}
      <LoEsencial />

      {/* 3. Navegación rápida por categoría */}
      <CategoriasGrid />

      {/* 4. Contexto económico: indicadores de Chile */}
      <DatosChile />

      {/* 5. En el radar: una historia por categoría (feed en vivo) */}
      <TendenciasSection />

      {/* 6. Radar en vivo: stream completo de ~45 fuentes */}
      <NoticiasGrid />

      {/* 7. Aprende los conceptos: glosario curado */}
      <ExplicadoSimple />

      {/* 8. El brief: suscripción al producto estrella */}
      <NewsletterBanner />

      {/* Modal de suscripción flotante */}
      <NewsletterModal />
    </>
  );
}

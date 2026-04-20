import Hero from "@/components/home/Hero";
import CategoriasGrid from "@/components/home/CategoriasGrid";
import NoticiasGrid from "@/components/home/NoticiasGrid";
import DatosChile from "@/components/home/DatosChile";
import ExplicadoSimple from "@/components/home/ExplicadoSimple";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import NewsletterModal from "@/components/ui/NewsletterModal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriasGrid />
      <NoticiasGrid />
      <DatosChile />
      <ExplicadoSimple />
      <NewsletterBanner />
      <NewsletterModal />
    </>
  );
}

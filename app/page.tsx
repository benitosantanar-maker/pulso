import Hero from "@/components/home/Hero";
import CategoriasGrid from "@/components/home/CategoriasGrid";
import NoticiasGrid from "@/components/home/NoticiasGrid";
import ExplicadoSimple from "@/components/home/ExplicadoSimple";
import NewsletterBanner from "@/components/home/NewsletterBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriasGrid />
      <NoticiasGrid />
      <ExplicadoSimple />
      <NewsletterBanner />
    </>
  );
}

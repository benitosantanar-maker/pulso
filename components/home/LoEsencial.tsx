import Link from "next/link";
import { ArrowRight } from "lucide-react";
import EssentialStoryCard from "@/components/home/EssentialStoryCard";
import {
  getNoticiasPrincipales,
  getNoticiasDestacadas,
  getUltimasNoticias,
} from "@/lib/data/noticias";

export default function LoEsencial() {
  const principales = getNoticiasPrincipales();
  const destacadas = getNoticiasDestacadas();
  const ultimas = getUltimasNoticias(12).filter(
    (n) => !n.principal && !n.destacada
  );

  const principal = principales[0];
  const secundarias = destacadas.slice(0, 2);
  const grid4 = [...destacadas.slice(2), ...ultimas].slice(0, 4);
  const listaCompacta = [...ultimas].slice(0, 8);

  if (!principal) return null;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado de sección */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest mb-1">
              Análisis curado · hoy
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Lo esencial de hoy
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Las noticias que importan — con contexto para tus ramos, tu pega y tu bolsillo.
            </p>
          </div>
          <Link
            href="/categoria/economia"
            className="flex items-center gap-1 text-sm text-teal-700 dark:text-teal-400 font-medium hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
          >
            Ver todas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Row 1: Principal (3/5 del ancho) + 2 secundarias apiladas */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">
          <div className="lg:col-span-3">
            <EssentialStoryCard noticia={principal} variant="principal" />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            {secundarias.map((n) => (
              <EssentialStoryCard key={n.slug} noticia={n} variant="secondary" />
            ))}
          </div>
        </div>

        {/* Row 2: grid 4 columnas */}
        {grid4.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {grid4.map((n) => (
              <EssentialStoryCard key={n.slug} noticia={n} variant="secondary" />
            ))}
          </div>
        )}

        {/* Row 3: lista compacta — más análisis y contexto */}
        {listaCompacta.length > 0 && (
          <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
              Más análisis y contexto
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
              {listaCompacta.map((n) => (
                <EssentialStoryCard key={n.slug} noticia={n} variant="compact" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NewsCardPrincipal from "@/components/news/NewsCardPrincipal";
import NewsCardSecundaria from "@/components/news/NewsCardSecundaria";
import NewsCardTerciaria from "@/components/news/NewsCardTerciaria";
import {
  getNoticiasPrincipales,
  getNoticiasDestacadas,
  getUltimasNoticias,
} from "@/lib/data/noticias";

export default function NoticiasGrid() {
  const principales = getNoticiasPrincipales();
  const destacadas = getNoticiasDestacadas();
  const ultimas = getUltimasNoticias(6).filter(
    (n) => !n.principal && !n.destacada
  );

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Lo esencial de hoy</h2>
          <Link
            href="/categoria/economia"
            className="flex items-center gap-1 text-sm text-teal-700 font-medium hover:text-teal-800 transition-colors"
          >
            Ver todo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Main grid: principal (large) + destacadas (smaller) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Noticia principal */}
          {principales.length > 0 && (
            <div className="lg:col-span-2">
              <NewsCardPrincipal noticia={principales[0]} />
            </div>
          )}

          {/* Destacadas columna derecha */}
          <div className="flex flex-col gap-4">
            {destacadas.slice(0, 2).map((n) => (
              <NewsCardSecundaria key={n.slug} noticia={n} />
            ))}
          </div>
        </div>

        {/* Segunda fila: 3 cards secundarias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {[...destacadas.slice(2), ...ultimas].slice(0, 3).map((n) => (
            <NewsCardSecundaria key={n.slug} noticia={n} />
          ))}
        </div>

        {/* Últimas noticias (lista compacta) */}
        <div className="border-t border-gray-100 pt-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">
            Más noticias
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {ultimas.slice(0, 6).map((n) => (
              <NewsCardTerciaria key={n.slug} noticia={n} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

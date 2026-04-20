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
  const ultimas = getUltimasNoticias(12).filter(
    (n) => !n.principal && !n.destacada
  );

  // 1-2-2 grid: 5 noticias en dos filas (1 grande + 2 + 2)
  const grid522 = [...destacadas.slice(2), ...ultimas].slice(0, 4);

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Lo esencial de hoy</h2>
          <Link
            href="/categoria/economia"
            className="flex items-center gap-1 text-sm text-teal-700 dark:text-teal-400 font-medium hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
          >
            Ver todo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Row 1: Principal (50%) + 2 secundarias (50%) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {principales.length > 0 && (
            <NewsCardPrincipal noticia={principales[0]} />
          )}
          <div className="flex flex-col gap-4">
            {destacadas.slice(0, 2).map((n) => (
              <NewsCardSecundaria key={n.slug} noticia={n} />
            ))}
          </div>
        </div>

        {/* Row 2: grid 2-2 = 4 noticias secundarias */}
        {grid522.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {grid522.map((n) => (
              <NewsCardSecundaria key={n.slug} noticia={n} />
            ))}
          </div>
        )}

        {/* Más noticias: lista compacta */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-8">
          <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5">
            Más noticias
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            {ultimas.slice(0, 8).map((n) => (
              <NewsCardTerciaria key={n.slug} noticia={n} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

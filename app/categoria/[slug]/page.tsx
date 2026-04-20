import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, getCategoryMeta } from "@/lib/categories";
import { getNoticiasByCategoria, noticias } from "@/lib/data/noticias";
import NewsCardLista from "@/components/news/NewsCardLista";
import NewsCardPrincipal from "@/components/news/NewsCardPrincipal";
import type { Category } from "@/types";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = getCategoryMeta(params.slug as Category);
  return {
    title: cat.label,
    description: cat.description,
  };
}

export default function CategoriaPage({ params }: Props) {
  const validSlug = CATEGORIES.find((c) => c.slug === params.slug);
  if (!validSlug) notFound();

  const cat = getCategoryMeta(params.slug as Category);
  const items = getNoticiasByCategoria(params.slug);

  const [principal, ...rest] = items;

  return (
    <div className="pt-16">
      {/* Category header */}
      <div className={`${cat.bgColor} border-b ${cat.borderColor} py-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className={`text-xs font-semibold uppercase tracking-wider ${cat.textColor}`}>
            Sección
          </span>
          <h1 className={`text-3xl font-bold mt-1 ${cat.textColor}`}>
            {cat.label}
          </h1>
          <p className="text-gray-600 mt-2 max-w-xl">{cat.description}</p>
          <p className="text-sm text-gray-400 mt-3">
            {items.length} {items.length === 1 ? "nota" : "notas"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {items.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium mb-2">Próximamente</p>
            <p className="text-sm">Estamos cubriendo noticias de {cat.label}. Vuelve pronto.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-5">
              {principal && <NewsCardPrincipal noticia={principal} />}
              {rest.map((n) => (
                <NewsCardLista key={n.slug} noticia={n} />
              ))}
            </div>

            {/* Sidebar: otras categorías */}
            <aside className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Otras secciones
                </h3>
                <div className="space-y-2">
                  {CATEGORIES.filter((c) => c.slug !== params.slug).map((c) => (
                    <a
                      key={c.slug}
                      href={`/categoria/${c.slug}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg ${c.bgColor} hover:opacity-80 transition-opacity`}
                    >
                      <span className={`text-sm font-medium ${c.textColor}`}>
                        {c.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-[#1F2937] text-white rounded-xl p-5">
                <p className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
                  Brief semanal
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  Recibe lo más importante cada semana en tu correo. Sin ruido.
                </p>
                <a
                  href="#suscribir"
                  className="block w-full text-center bg-teal-700 hover:bg-teal-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                >
                  Suscribirse
                </a>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLatestBrief } from "@/lib/data/brief";
import { getCategoryMeta } from "@/lib/categories";
import { formatDateShort } from "@/lib/utils";

export default function Hero() {
  const brief = getLatestBrief();

  return (
    <section className="bg-[#1F2937] dark:bg-gray-950 text-white pt-32 pb-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div className="max-w-3xl mb-10">
          <p className="text-teal-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Plataforma editorial
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-4 text-white">
            Lo esencial para{" "}
            <span className="text-teal-400">ingenieros comerciales</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            Noticias con contexto de economía, finanzas, marketing e innovación. Sin ruido. Solo lo que realmente importa.
          </p>
        </div>

        {/* Brief del día — 3 cards horizontal */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-xs font-bold text-teal-300 uppercase tracking-widest">
                Brief del día
              </span>
              <span className="text-xs text-gray-600">{formatDateShort(brief.fecha)}</span>
            </div>
            <Link
              href="/brief"
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-teal-300 transition-colors"
            >
              Ver completo <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {brief.items.map((item, i) => {
              const cat = getCategoryMeta(item.categoria);
              return (
                <Link
                  key={i}
                  href={`/noticia/${item.slug}`}
                  className="group flex flex-col gap-2 bg-white/[0.04] hover:bg-white/10 border border-white/5 hover:border-teal-600/50 rounded-xl p-4 transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50 bg-white/10 border border-white/10 px-2 py-0.5 rounded-full">
                      {cat.label}
                    </span>
                    <span className="text-[10px] text-gray-600">{item.fuente}</span>
                  </div>
                  <p className="text-white text-sm font-medium leading-snug line-clamp-2 group-hover:text-teal-200 transition-colors">
                    {item.titulo}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mt-auto">
                    {item.resumen}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

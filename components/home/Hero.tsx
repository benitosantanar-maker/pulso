import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { getLatestBrief } from "@/lib/data/brief";
import { getCategoryMeta } from "@/lib/categories";
import { formatDateShort } from "@/lib/utils";

export default function Hero() {
  const brief = getLatestBrief();

  return (
    <section className="bg-[#1F2937] text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-5">
            <span className="flex items-center gap-1.5 bg-teal-700/30 text-teal-300 text-xs font-medium px-3 py-1.5 rounded-full border border-teal-700/40">
              <Zap className="w-3 h-3" />
              Plataforma editorial
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5 text-white">
            Lo esencial para
            <br />
            <span className="text-teal-400">ingenieros comerciales</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Noticias, contexto y análisis de economía, finanzas, marketing e innovación. Sin ruido, sin jerga innecesaria. Solo lo que realmente importa.
          </p>
        </div>

        {/* Brief del día */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-teal-300 uppercase tracking-wider">
                Brief del día
              </span>
              <span className="text-xs text-gray-500 ml-1">{formatDateShort(brief.fecha)}</span>
            </div>
            <Link
              href="/brief"
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-teal-300 transition-colors"
            >
              Ver completo <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {brief.items.map((item, i) => {
              const cat = getCategoryMeta(item.categoria);
              return (
                <Link
                  key={i}
                  href={`/noticia/${item.slug}`}
                  className="group bg-white/5 hover:bg-white/10 border border-white/5 hover:border-teal-700/40 rounded-xl p-4 transition-all duration-200"
                >
                  <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 bg-white/10 text-white/80 border border-white/10">
                    {cat.label}
                  </span>
                  <p className="text-white text-sm font-medium leading-snug line-clamp-2 group-hover:text-teal-200 transition-colors">
                    {item.titulo}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{item.fuente}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

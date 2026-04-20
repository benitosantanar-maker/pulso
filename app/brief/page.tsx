import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { getLatestBrief } from "@/lib/data/brief";
import { getCategoryMeta } from "@/lib/categories";
import { formatDate } from "@/lib/utils";
import NewsletterBanner from "@/components/home/NewsletterBanner";

export const metadata: Metadata = {
  title: "Brief diario",
  description: "El resumen diario de noticias de economía, finanzas, marketing e innovación para ingenieros comerciales.",
};

export default function BriefPage() {
  const brief = getLatestBrief();

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-[#1F2937] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-wider">
              Brief editorial
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{brief.titulo}</h1>
          <p className="text-gray-400 text-lg leading-relaxed">{brief.intro}</p>
          <div className="flex items-center justify-center gap-2 mt-5 text-gray-500 text-sm">
            <Calendar className="w-4 h-4" />
            {formatDate(brief.fecha)}
          </div>
        </div>
      </div>

      {/* Brief items */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-5">
          {brief.items.map((item, i) => {
            const cat = getCategoryMeta(item.categoria);
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-teal-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center text-sm font-bold text-teal-700">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${cat.bgColor} ${cat.textColor} ${cat.borderColor}`}
                      >
                        {cat.label}
                      </span>
                      <span className="text-xs text-gray-400">{item.fuente}</span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                      {item.titulo}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{item.resumen}</p>
                    <Link
                      href={`/noticia/${item.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-teal-700 hover:text-teal-800 transition-colors"
                    >
                      Leer análisis completo <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 mb-4">
            ¿Quieres recibir el brief en tu correo cada semana?
          </p>
          <a
            href="#suscribir"
            className="inline-flex items-center gap-2 bg-teal-700 text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-teal-800 transition-colors"
          >
            Suscribirse al brief <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <NewsletterBanner />
    </div>
  );
}

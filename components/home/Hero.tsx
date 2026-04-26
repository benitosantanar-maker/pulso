import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategoryMeta } from "@/lib/categories";
import { fetchNewsByCategory } from "@/lib/feeds";
import {
  getNoticiasPrincipales,
  getNoticiasDestacadas,
  getUltimasNoticias,
} from "@/lib/data/noticias";
import DataStrip from "@/components/home/DataStrip";

const KICKER_COLORS: Record<string, string> = {
  economia:       "#1347CC",
  finanzas:       "#0A6E4E",
  innovacion:     "#7B35CC",
  mercados:       "#B5450A",
  emprendimiento: "#1A7070",
  negocios:       "#3A3731",
  marketing:      "#C0260F",
  estrategia:     "#3A3731",
};

function Kicker({ categoria }: { categoria: string }) {
  const meta = getCategoryMeta(categoria as never);
  const color = KICKER_COLORS[categoria] ?? "#3A3731";
  return (
    <div
      className="font-sans text-[9.5px] font-bold uppercase tracking-[0.14em] mb-2"
      style={{ color }}
    >
      {meta.label}
    </div>
  );
}

function PorQueImporta({ text }: { text: string }) {
  return (
    <div
      className="font-sans text-[12.5px] leading-relaxed mt-3"
      style={{
        borderLeft: "3px solid #B5450A",
        background: "#F5EDE6",
        padding: "10px 14px",
        color: "var(--ink-mid)",
      }}
    >
      <strong
        className="block font-sans text-[9px] uppercase tracking-[0.12em] mb-1 font-bold"
        style={{ color: "#B5450A" }}
      >
        Por qué importa
      </strong>
      {text}
    </div>
  );
}

function SourceTag({ fuente, pais }: { fuente: string; pais?: string }) {
  return (
    <span className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>
      {fuente}{pais ? ` · ${pais}` : ""}
    </span>
  );
}

export default async function Hero() {
  const principales = getNoticiasPrincipales();
  const destacadas  = getNoticiasDestacadas();
  const ultimas     = getUltimasNoticias(8).filter((n) => !n.principal && !n.destacada);

  const { items: liveItems } = await fetchNewsByCategory("economia", 6);

  const lead      = principales[0];
  const secondary = destacadas.slice(0, 2);
  const tertiary  = [...destacadas.slice(2), ...ultimas].slice(0, 5);

  return (
    <>
      {/* Indicadores strip */}
      <DataStrip />

      {/* Newspaper hero */}
      <section className="pt-6 pb-0" style={{ borderBottom: "2px solid var(--ink)" }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          {/* Section label bar */}
          <div
            className="flex items-center justify-between mb-4 pb-2"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <span
              className="font-sans text-[9.5px] font-bold uppercase tracking-[0.16em]"
              style={{ color: "#B5450A" }}
            >
              Lo esencial de hoy
            </span>
            <Link
              href="/brief"
              className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors hover:text-[#B5450A]"
              style={{ color: "#1347CC" }}
            >
              Ver brief completo <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* 3-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1px_1fr_1px_1fr] gap-0">

            {/* ── Lead story ── */}
            <div className="pb-6 lg:pb-6 lg:pr-8">
              {lead ? (
                <>
                  <Kicker categoria={lead.categoria} />
                  <Link href={`/noticia/${lead.slug}`} className="group block">
                    <h1
                      className="font-serif font-bold leading-[1.15] mb-3 transition-colors group-hover:text-[#B5450A]"
                      style={{
                        fontSize: "clamp(24px, 3vw, 34px)",
                        color: "var(--ink)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {lead.titulo}
                    </h1>
                  </Link>
                  <p
                    className="font-body text-[14.5px] leading-[1.55] mb-3"
                    style={{ color: "var(--ink-mid)" }}
                  >
                    {lead.bajada}
                  </p>
                  <PorQueImporta text={lead.porQueImporta} />
                  <div className="mt-3 flex items-center gap-3">
                    <SourceTag fuente={lead.fuente} />
                    <span className="font-mono text-[9.5px]" style={{ color: "var(--ink-faint)" }}>
                      {lead.tiempoLectura} min de lectura
                    </span>
                  </div>
                </>
              ) : (
                <p className="font-body text-sm" style={{ color: "var(--ink-faint)" }}>
                  Actualizando la noticia principal…
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="hidden lg:block" style={{ background: "var(--border)" }} />

            {/* ── Secondary stories ── */}
            <div className="py-6 lg:py-0 lg:px-8" style={{ borderTop: "1px solid var(--border)", borderTopWidth: "1px" }}>
              {secondary.length > 0
                ? secondary.map((n, i) => (
                    <div
                      key={n.slug}
                      className="py-5"
                      style={{ borderBottom: i < secondary.length - 1 ? "1px solid var(--border-light)" : "none" }}
                    >
                      <Kicker categoria={n.categoria} />
                      <Link href={`/noticia/${n.slug}`} className="group block">
                        <h2
                          className="font-serif font-bold text-[20px] leading-[1.2] mb-2 transition-colors group-hover:text-[#B5450A]"
                          style={{ color: "var(--ink)" }}
                        >
                          {n.titulo}
                        </h2>
                      </Link>
                      <p
                        className="font-body text-[13px] leading-[1.5] mb-2 line-clamp-2"
                        style={{ color: "var(--ink-light)" }}
                      >
                        {n.bajada}
                      </p>
                      <SourceTag fuente={n.fuente} />
                    </div>
                  ))
                : liveItems.slice(0, 2).map((item, i) => (
                    <div
                      key={item.id}
                      className="py-5"
                      style={{ borderBottom: i === 0 ? "1px solid var(--border-light)" : "none" }}
                    >
                      <Kicker categoria={item.categoria} />
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="group block">
                        <h2
                          className="font-serif font-bold text-[20px] leading-[1.2] mb-2 transition-colors group-hover:text-[#B5450A]"
                          style={{ color: "var(--ink)" }}
                        >
                          {item.titulo}
                        </h2>
                      </a>
                      {item.resumen && (
                        <p
                          className="font-body text-[13px] leading-[1.5] mb-2 line-clamp-2"
                          style={{ color: "var(--ink-light)" }}
                        >
                          {item.resumen}
                        </p>
                      )}
                      <SourceTag fuente={item.fuente} pais={item.pais} />
                    </div>
                  ))}
            </div>

            {/* Divider */}
            <div className="hidden lg:block" style={{ background: "var(--border)" }} />

            {/* ── Tertiary list ── */}
            <div className="pb-6 lg:pb-6 lg:pl-8" style={{ borderTop: "1px solid var(--border)", borderTopWidth: "1px" }}>
              <div
                className="font-sans text-[9.5px] font-bold uppercase tracking-[0.16em] mb-3 pb-2"
                style={{ color: "var(--ink-faint)", borderBottom: "1px solid var(--border-light)" }}
              >
                Más noticias
              </div>
              {tertiary.map((n, i) => (
                <div
                  key={n.slug}
                  className="flex gap-3 py-3"
                  style={{ borderBottom: i < tertiary.length - 1 ? "1px solid var(--border-light)" : "none" }}
                >
                  <span
                    className="font-mono text-[22px] font-medium shrink-0 leading-none pt-0.5"
                    style={{ color: "var(--border)", letterSpacing: "-0.02em" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <Link href={`/noticia/${n.slug}`} className="group">
                      <h3
                        className="font-serif font-semibold text-[14px] leading-[1.35] transition-colors group-hover:text-[#B5450A] line-clamp-2"
                        style={{ color: "var(--ink)" }}
                      >
                        {n.titulo}
                      </h3>
                    </Link>
                    <div className="mt-1">
                      <SourceTag fuente={n.fuente} />
                    </div>
                  </div>
                </div>
              ))}

              {/* Live feed preview */}
              {liveItems.length > 0 && (
                <div className="mt-4">
                  <div
                    className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] mb-3"
                    style={{ color: "#C0260F" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{ background: "#C0260F", animation: "pulse 2s infinite" }}
                    />
                    En vivo
                  </div>
                  {liveItems.slice(0, 2).map((item) => (
                    <a
                      key={item.id}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block py-2.5"
                      style={{ borderBottom: "1px solid var(--border-light)" }}
                    >
                      <p
                        className="font-serif text-[13px] font-semibold leading-snug line-clamp-2 transition-colors group-hover:text-[#B5450A]"
                        style={{ color: "var(--ink)" }}
                      >
                        {item.titulo}
                      </p>
                      <SourceTag fuente={item.fuente} pais={item.pais} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </>
  );
}

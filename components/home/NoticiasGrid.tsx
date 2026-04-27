import Link from "next/link";
import { fetchNewsByCategory } from "@/lib/feeds";
import { getNoticiasPrincipales, getNoticiasDestacadas, getUltimasNoticias } from "@/lib/data/noticias";
import { getCategoryMeta } from "@/lib/categories";
import type { FeedItem } from "@/types";

function relativeTime(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diff < 1) return "ahora";
  if (diff < 60) return `hace ${diff} min`;
  const h = Math.floor(diff / 60);
  return h < 24 ? `hace ${h}h` : `hace ${Math.floor(h / 24)}d`;
}

function catTag(cat: string) {
  const map: Record<string, string> = {
    economia: "cc-ftag-eco", finanzas: "cc-ftag-fin", mercados: "cc-ftag-mer",
    innovacion: "cc-ftag-inn", emprendimiento: "cc-ftag-emp",
  };
  return `cc-ftag ${map[cat] ?? "cc-ftag-neg"}`;
}

export default async function NoticiasGrid() {
  const destacadas = getNoticiasDestacadas();
  const ultimas = getUltimasNoticias(12);
  const { items: liveAll } = await fetchNewsByCategory("all", 40);

  const liveEco = liveAll.filter((i) => i.categoria === "economia").slice(0, 5);
  const liveFin = liveAll.filter((i) => i.categoria === "finanzas" || i.categoria === "mercados").slice(0, 5);
  const liveNeg = liveAll.filter((i) => ["innovacion", "negocios", "emprendimiento"].includes(i.categoria)).slice(0, 5);

  return (
    <section style={{ padding: "32px 0" }}>
      <div className="cc-container">
        <div className="cc-section-header">
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <h2 className="cc-section-title">Lo que está pasando</h2>
            <div className="cc-live-badge">
              <div className="cc-live-dot" />
              En vivo · {liveAll.length} artículos
            </div>
          </div>
          <Link href="/categoria/economia" className="cc-section-more">Ver todas las noticias →</Link>
        </div>

        <div className="noticias-grid">

          {/* Economía */}
          <div style={{ paddingRight: "32px" }}>
            <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>
              Economía
            </div>
            {destacadas[0] && (
              <>
                <div className="cc-kicker kk-eco">Chile</div>
                <Link href={`/noticia/${destacadas[0].slug}`}>
                  <h3 className="cc-h-lg">{destacadas[0].titulo}</h3>
                </Link>
                <p className="cc-deck" style={{ fontSize: "13.5px" }}>{destacadas[0].resumen}</p>
                {destacadas[0].porQueImporta && (
                  <div className="cc-por-que" style={{ fontSize: "12px", padding: "8px 12px" }}>
                    <strong>¿Por qué importa?</strong>
                    {destacadas[0].porQueImporta}
                  </div>
                )}
                <span className="cc-src">{destacadas[0].fuente} · 5 min</span>
                <div style={{ height: "16px" }} />
              </>
            )}
            {(liveEco.length > 0 ? liveEco.slice(0, 3) : ultimas.slice(0, 3)).map((item) => {
              const isLive = "link" in item;
              const t = (item as any).titulo;
              const src = (item as any).fuente;
              const href = isLive ? undefined : `/noticia/${(item as any).slug}`;
              const cat = (item as any).categoria || "economia";
              return (
                <div key={(item as any).id ?? (item as any).slug} className="cc-story-row">
                  <div className="cc-kicker kk-eco" style={{ marginBottom: 4 }}>
                    {getCategoryMeta(cat).label}
                  </div>
                  {href ? (
                    <Link href={href}><h4 className="cc-h-sm">{t}</h4></Link>
                  ) : (
                    <a href={(item as any).link} target="_blank" rel="noopener noreferrer">
                      <h4 className="cc-h-sm">{t}</h4>
                    </a>
                  )}
                  <div style={{ height: "8px" }} />
                  <span className="cc-src">{src}</span>
                </div>
              );
            })}
          </div>

          <div className="cc-vdiv" />

          {/* Finanzas & Mercados */}
          <div style={{ padding: "0 32px" }}>
            <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--green)", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>
              Finanzas & Mercados
            </div>
            {(liveFin.length > 0 ? liveFin : ultimas.filter((n) => ["finanzas", "mercados"].includes(n.categoria)).slice(0, 5)).map((item, i) => {
              const isLive = "link" in item;
              const t = (item as any).titulo;
              const src = (item as any).fuente;
              const cat = (item as any).categoria || "finanzas";
              const catClass = cat === "mercados" ? "kk-mer" : "kk-fin";
              return (
                <div key={(item as any).id ?? (item as any).slug} className="cc-story-row" style={{ paddingTop: i === 0 ? 0 : undefined }}>
                  <div className={`cc-kicker ${catClass}`} style={{ marginBottom: 4 }}>
                    {getCategoryMeta(cat).label}
                  </div>
                  {isLive ? (
                    <>
                      <a href={(item as any).link} target="_blank" rel="noopener noreferrer">
                        <h3 className={i === 0 ? "cc-h-md" : "cc-h-sm"}>{t}</h3>
                      </a>
                      {i === 0 && (item as any).resumen && (
                        <p className="cc-deck-sm" style={{ marginTop: "6px", marginBottom: "8px" }}>{(item as any).resumen}</p>
                      )}
                    </>
                  ) : (
                    <Link href={`/noticia/${(item as any).slug}`}>
                      <h3 className={i === 0 ? "cc-h-md" : "cc-h-sm"}>{t}</h3>
                    </Link>
                  )}
                  <div style={{ height: "8px" }} />
                  <span className="cc-src">{src} · {isLive ? relativeTime((item as any).fecha) : "4 min"}</span>
                </div>
              );
            })}
          </div>

          <div className="cc-vdiv" />

          {/* Negocios & Innovación */}
          <div style={{ paddingLeft: "32px" }}>
            <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--purple)", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>
              Negocios & Innovación
            </div>
            {(liveNeg.length > 0 ? liveNeg : ultimas.filter((n) => ["innovacion", "negocios"].includes(n.categoria)).slice(0, 5)).map((item, i) => {
              const isLive = "link" in item;
              const t = (item as any).titulo;
              const src = (item as any).fuente;
              const cat = (item as any).categoria || "innovacion";
              const catClass = cat === "innovacion" ? "kk-inn" : "kk-neg";
              return (
                <div key={(item as any).id ?? (item as any).slug} className="cc-story-row" style={{ paddingTop: i === 0 ? 0 : undefined }}>
                  <div className={`cc-kicker ${catClass}`} style={{ marginBottom: 4 }}>
                    {getCategoryMeta(cat).label}
                  </div>
                  {isLive ? (
                    <>
                      <a href={(item as any).link} target="_blank" rel="noopener noreferrer">
                        <h3 className={i === 0 ? "cc-h-md" : "cc-h-sm"}>{t}</h3>
                      </a>
                      {i === 0 && (item as any).resumen && (
                        <p className="cc-deck-sm" style={{ marginTop: "6px", marginBottom: "8px" }}>{(item as any).resumen}</p>
                      )}
                    </>
                  ) : (
                    <Link href={`/noticia/${(item as any).slug}`}>
                      <h3 className={i === 0 ? "cc-h-md" : "cc-h-sm"}>{t}</h3>
                    </Link>
                  )}
                  <div style={{ height: "8px" }} />
                  <span className="cc-src">{src} · {isLive ? relativeTime((item as any).fecha) : "3 min"}</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

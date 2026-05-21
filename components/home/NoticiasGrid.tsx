import Link from "next/link";
import { fetchNewsByCategory } from "@/lib/feeds";
import { getCategoryMeta } from "@/lib/categories";

function relativeTime(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diff < 1) return "ahora";
  if (diff < 60) return `hace ${diff}m`;
  const h = Math.floor(diff / 60);
  return h < 24 ? `hace ${h}h` : `hace ${Math.floor(h / 24)}d`;
}

const CAT_KICKER: Record<string, string> = {
  economia: "kk-eco", finanzas: "kk-fin", mercados: "kk-mer",
  innovacion: "kk-inn", emprendimiento: "kk-emp", negocios: "kk-neg",
  marketing: "kk-neg", estrategia: "kk-neg",
};

export default async function NoticiasGrid() {
  const { items: liveAll } = await fetchNewsByCategory("all", 60);

  const liveEco = liveAll.filter(i =>
    ["economia"].includes(i.categoria)
  ).slice(0, 5);

  const liveFin = liveAll.filter(i =>
    ["finanzas", "mercados"].includes(i.categoria)
  ).slice(0, 5);

  const liveNeg = liveAll.filter(i =>
    ["innovacion", "negocios", "emprendimiento", "estrategia"].includes(i.categoria)
  ).slice(0, 5);

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

          {/* ── Economía ── */}
          <div style={{ paddingRight: "32px" }}>
            <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>
              Economía
            </div>
            {liveEco.length === 0 ? (
              <div style={{ color: "var(--ink-faint)", fontFamily: "var(--mono)", fontSize: "11px" }}>
                Cargando...
              </div>
            ) : liveEco.map((item, i) => {
              const kkClass = CAT_KICKER[item.categoria] ?? "kk-eco";
              return (
                <div key={item.id} className="cc-story-row" style={{ paddingTop: i === 0 ? 0 : undefined }}>
                  <div className={`cc-kicker ${kkClass}`} style={{ marginBottom: 4 }}>
                    {getCategoryMeta(item.categoria).label} · {item.pais}
                  </div>
                  {i === 0 ? (
                    <>
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <h3 className="cc-h-lg">{item.titulo}</h3>
                      </a>
                      {item.resumen && (
                        <p className="cc-deck" style={{ fontSize: "13.5px" }}>{item.resumen}</p>
                      )}
                    </>
                  ) : (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <h4 className="cc-h-sm">{item.titulo}</h4>
                    </a>
                  )}
                  <div style={{ height: "8px" }} />
                  <span className="cc-src">{item.fuente} · {relativeTime(item.fecha)}</span>
                </div>
              );
            })}
          </div>

          <div className="cc-vdiv" />

          {/* ── Finanzas & Mercados ── */}
          <div style={{ padding: "0 32px" }}>
            <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--green)", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>
              Finanzas &amp; Mercados
            </div>
            {liveFin.length === 0 ? (
              <div style={{ color: "var(--ink-faint)", fontFamily: "var(--mono)", fontSize: "11px" }}>
                Cargando...
              </div>
            ) : liveFin.map((item, i) => {
              const kkClass = item.categoria === "mercados" ? "kk-mer" : "kk-fin";
              return (
                <div key={item.id} className="cc-story-row" style={{ paddingTop: i === 0 ? 0 : undefined }}>
                  <div className={`cc-kicker ${kkClass}`} style={{ marginBottom: 4 }}>
                    {getCategoryMeta(item.categoria).label} · {item.pais}
                  </div>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <h3 className={i === 0 ? "cc-h-md" : "cc-h-sm"}>{item.titulo}</h3>
                  </a>
                  {i === 0 && item.resumen && (
                    <p className="cc-deck-sm" style={{ marginTop: "6px", marginBottom: "8px" }}>
                      {item.resumen}
                    </p>
                  )}
                  <div style={{ height: "8px" }} />
                  <span className="cc-src">{item.fuente} · {relativeTime(item.fecha)}</span>
                </div>
              );
            })}
          </div>

          <div className="cc-vdiv" />

          {/* ── Negocios & Innovación ── */}
          <div style={{ paddingLeft: "32px" }}>
            <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--purple)", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>
              Negocios &amp; Innovación
            </div>
            {liveNeg.length === 0 ? (
              <div style={{ color: "var(--ink-faint)", fontFamily: "var(--mono)", fontSize: "11px" }}>
                Cargando...
              </div>
            ) : liveNeg.map((item, i) => {
              const kkClass = item.categoria === "innovacion" ? "kk-inn" : "kk-neg";
              return (
                <div key={item.id} className="cc-story-row" style={{ paddingTop: i === 0 ? 0 : undefined }}>
                  <div className={`cc-kicker ${kkClass}`} style={{ marginBottom: 4 }}>
                    {getCategoryMeta(item.categoria).label} · {item.pais}
                  </div>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <h3 className={i === 0 ? "cc-h-md" : "cc-h-sm"}>{item.titulo}</h3>
                  </a>
                  {i === 0 && item.resumen && (
                    <p className="cc-deck-sm" style={{ marginTop: "6px", marginBottom: "8px" }}>
                      {item.resumen}
                    </p>
                  )}
                  <div style={{ height: "8px" }} />
                  <span className="cc-src">{item.fuente} · {relativeTime(item.fecha)}</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

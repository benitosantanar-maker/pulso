import Link from "next/link";
import { fetchNewsByCategory } from "@/lib/feeds";

function relativeTime(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diff < 1) return "ahora";
  if (diff < 60) return `hace ${diff} min`;
  const h = Math.floor(diff / 60);
  return h < 24 ? `hace ${h}h` : `hace ${Math.floor(h / 24)}d`;
}

const CAT_CLASS: Record<string, string> = {
  economia: "cc-ftag-eco", finanzas: "cc-ftag-fin", mercados: "cc-ftag-mer",
  innovacion: "cc-ftag-inn", emprendimiento: "cc-ftag-emp",
};

export default async function FeedEnVivo() {
  const { items, totalSources } = await fetchNewsByCategory("all", 40);
  if (items.length === 0) return null;

  const col1 = items.slice(0, 4);
  const col2 = items.slice(4, 8);
  const col3 = items.slice(8, 12);

  return (
    <section style={{ borderTop: "2px solid var(--ink)", padding: "28px 0" }}>
      <div className="cc-container">
        <div className="cc-section-header">
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <h2 className="cc-section-title">Feed en vivo</h2>
            <div className="cc-live-badge">
              <div className="cc-live-dot" />
              {items.length} artículos · {totalSources} fuentes
            </div>
          </div>
          <a href="#" className="cc-section-more">Ver feed completo →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[col1, col2, col3].map((col, ci) => (
            <div
              key={ci}
              style={{ padding: `0 ${ci < 2 ? "24px" : "0"} 0 ${ci > 0 ? "24px" : "0"}`, borderRight: ci < 2 ? "1px solid var(--border)" : "none" }}
            >
              {col.map((item) => {
                const catClass = CAT_CLASS[item.categoria] ?? "cc-ftag-neg";
                const label = item.categoria.charAt(0).toUpperCase() + item.categoria.slice(1);
                return (
                  <div key={item.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--border-light)", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <span className={`cc-ftag ${catClass}`} style={{ flexShrink: 0, marginTop: "3px" }}>
                      {label}
                    </span>
                    <div>
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <h5 className="cc-h-sm">{item.titulo}</h5>
                      </a>
                      <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--ink-faint)", marginTop: "4px" }}>
                        {relativeTime(item.fecha)} · {item.fuente} / {item.pais}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

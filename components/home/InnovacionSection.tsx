import Link from "next/link";
import { fetchNewsByCategory } from "@/lib/feeds";
import { getUltimasNoticias } from "@/lib/data/noticias";

function relativeTime(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diff < 1) return "ahora";
  if (diff < 60) return `hace ${diff} min`;
  const h = Math.floor(diff / 60);
  return h < 24 ? `hace ${h}h` : `hace ${Math.floor(h / 24)}d`;
}

const STATIC_CARDS = [
  { kicker: "IA · Macro", titulo: "La IA mejora la productividad, pero los datos macroeconómicos aún no lo reflejan", deck: "La paradoja de la productividad digital: billones invertidos en IA generativa pero el PIB por hora trabajada apenas se mueve.", src: "The Economist · 5 min" },
  { kicker: "Fintech", titulo: "CMF aplica primer marco regulatorio a fintechs: qué cambia para usuarios y empresas", deck: "La nueva regulación afecta a más de 200 empresas en Chile que operan en préstamos, pagos digitales y gestión de activos.", src: "Diario Financiero · 3 min" },
  { kicker: "Startups", titulo: "Agentes de IA transformarán el sector salud en 2026: el desafío de implementarlos en LATAM", deck: "El reto no es adoptar la tecnología, sino hacerla funcionar en sistemas de salud fragmentados.", src: "Entrepreneur · 4 min" },
  { kicker: "Big Tech", titulo: "Tesla en caída libre: ventas bajan 13% en Q1 mientras Musk reconoce el costo de Washington", deck: "Elon Musk admitió que dedicó demasiado tiempo a la política federal. Los analistas preguntan por el plan de recuperación.", src: "TechCrunch · 4 min" },
];

export default async function InnovacionSection() {
  const { items: liveItems } = await fetchNewsByCategory("innovacion", 8);
  const staticFallback = getUltimasNoticias(8).filter((n) => n.categoria === "innovacion");

  const cards = liveItems.length >= 4
    ? liveItems.slice(0, 4)
    : staticFallback.length >= 4
    ? staticFallback.slice(0, 4)
    : null;

  return (
    <section style={{ padding: "32px 0" }}>
      <div className="cc-container">
        <div className="cc-section-header">
          <h2 className="cc-section-title">Innovación &amp; Tecnología</h2>
          <Link href="/categoria/innovacion" className="cc-section-more">Ver todo →</Link>
        </div>

        <div className="grid-4col" style={{ gap: 0 }}>
          {(cards
            ? cards.map((item, i) => {
                const isLive = "link" in item;
                return (
                  <div key={i} style={{ padding: "0 24px 0 0", borderRight: i < 3 ? "1px solid var(--border)" : "none", paddingLeft: i > 0 ? "24px" : undefined }}>
                    <div className="cc-kicker kk-inn" style={{ marginBottom: 4 }}>Innovación</div>
                    {isLive ? (
                      <a href={(item as any).link} target="_blank" rel="noopener noreferrer">
                        <h3 className="cc-h-md">{(item as any).titulo}</h3>
                      </a>
                    ) : (
                      <Link href={`/noticia/${(item as any).slug}`}>
                        <h3 className="cc-h-md">{(item as any).titulo}</h3>
                      </Link>
                    )}
                    {(item as any).resumen && (
                      <p className="cc-deck-sm" style={{ marginTop: "8px", marginBottom: "10px" }}>{(item as any).resumen}</p>
                    )}
                    <span className="cc-src">{(item as any).fuente} · {isLive ? relativeTime((item as any).fecha) : "4 min"}</span>
                  </div>
                );
              })
            : STATIC_CARDS.map((c, i) => (
                <div key={i} style={{ padding: "0 24px 0 0", borderRight: i < 3 ? "1px solid var(--border)" : "none", paddingLeft: i > 0 ? "24px" : undefined }}>
                  <div className="cc-kicker kk-inn" style={{ marginBottom: 4 }}>{c.kicker}</div>
                  <h3 className="cc-h-md">{c.titulo}</h3>
                  <p className="cc-deck-sm" style={{ marginTop: "8px", marginBottom: "10px" }}>{c.deck}</p>
                  <span className="cc-src">{c.src}</span>
                </div>
              ))
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * lib/api/stories.ts
 *
 * Adaptador Noticia → EssentialStory.
 *
 * Los componentes consumen EssentialStory — un modelo limpio con los
 * 3 campos de persona explícitos. Cuando el contenido migre a un CMS,
 * solo cambia esta capa sin tocar los componentes.
 */

import type { EssentialStory, Noticia } from "@/types";
import {
  noticias,
  getNoticiasPrincipales,
  getNoticiasDestacadas,
  getUltimasNoticias,
} from "@/lib/data/noticias";

// ─── Adaptador ────────────────────────────────────────────────────────────────

export function noticiaToEssentialStory(n: Noticia): EssentialStory {
  // Perspectiva estudiante: usa impactoIC como base, detalle en paraTusRamos
  const student =
    n.impactoIC ||
    `Esta noticia conecta con conceptos de ${n.categoria} — identifica qué ramos de tu carrera se relacionan y cómo podrías usarla en un caso o presentación.`;

  // Perspectiva trabajador: usa paraLaPega o porQueImporta como fallback
  const worker =
    n.paraLaPega ||
    n.porQueImporta ||
    "Considera cómo esta noticia afecta tu sector o empresa, y qué preguntas podrías llevar a tu próxima reunión.";

  // Perspectiva ciudadano: usa paraElBolsillo o porQueImporta como fallback
  const citizen =
    n.paraElBolsillo ||
    n.porQueImporta ||
    "Reflexiona sobre cómo este evento impacta en tu bolsillo, tu empleo o las políticas que te afectan como ciudadano.";

  return {
    slug:                    n.slug,
    title:                   n.titulo,
    bajada:                  n.bajada,
    whatHappened:            n.resumen,
    whyItMatters_student:    student,
    whyItMatters_worker:     worker,
    whyItMatters_citizen:    citizen,
    source:                  n.fuente,
    sourceUrl:               n.fuenteUrl,
    date:                    n.fecha,
    readTime:                n.tiempoLectura,
    category:                n.categoria,
    relatedConcepts:         n.conceptosRelacionados,
    paraTusRamos:            n.paraTusRamos,
    tags:                    n.tags,
  };
}

// ─── Funciones públicas ───────────────────────────────────────────────────────

/** Historias marcadas como "principales" (hero de la sección Lo esencial) */
export function getEssentialStories(): EssentialStory[] {
  const principales = getNoticiasPrincipales();
  const destacadas  = getNoticiasDestacadas();
  const ultimas     = getUltimasNoticias(12).filter(
    (n) => !n.principal && !n.destacada
  );
  return [...principales, ...destacadas, ...ultimas].map(noticiaToEssentialStory);
}

/** Historia individual por slug */
export function getEssentialStoryBySlug(slug: string): EssentialStory | undefined {
  const n = noticias.find((n) => n.slug === slug);
  return n ? noticiaToEssentialStory(n) : undefined;
}

/** Todas las historias (para páginas de categoría, etc.) */
export function getAllEssentialStories(): EssentialStory[] {
  return noticias.map(noticiaToEssentialStory);
}

/** Historias filtradas por categoría */
export function getEssentialStoriesByCategory(
  category: EssentialStory["category"]
): EssentialStory[] {
  return noticias
    .filter((n) => n.categoria === category)
    .map(noticiaToEssentialStory);
}

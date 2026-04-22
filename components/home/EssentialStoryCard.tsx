import Link from "next/link";
import { Clock, ExternalLink, GraduationCap, Briefcase, Globe } from "lucide-react";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { formatDateShort } from "@/lib/utils";
import type { EssentialStory } from "@/types";

interface Props {
  story: EssentialStory;
  /**
   * principal — card grande: bajada, qué pasó, 3 bloques persona completos.
   * secondary — card mediana: título, qué pasó (clamp), perspectiva estudiante.
   * compact   — fila lista: solo título + fuente + tiempo.
   */
  variant?: "principal" | "secondary" | "compact";
}

const PERSONA_BLOCKS = [
  {
    key: "student" as const,
    label: "Para tus ramos",
    Icon: GraduationCap,
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-100 dark:border-blue-800/50",
    labelColor: "text-blue-700 dark:text-blue-400",
  },
  {
    key: "worker" as const,
    label: "Para la pega",
    Icon: Briefcase,
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-100 dark:border-amber-800/50",
    labelColor: "text-amber-700 dark:text-amber-400",
  },
  {
    key: "citizen" as const,
    label: "Para tu bolsillo",
    Icon: Globe,
    bg: "bg-teal-50 dark:bg-teal-950/30",
    border: "border-teal-100 dark:border-teal-800/50",
    labelColor: "text-teal-700 dark:text-teal-400",
  },
] as const;

function personaText(story: EssentialStory, key: "student" | "worker" | "citizen"): string {
  if (key === "student") return story.whyItMatters_student;
  if (key === "worker") return story.whyItMatters_worker;
  return story.whyItMatters_citizen;
}

export default function EssentialStoryCard({ story, variant = "secondary" }: Props) {
  const isPrincipal = variant === "principal";
  const isCompact = variant === "compact";

  if (isCompact) {
    return (
      <Link
        href={`/noticia/${story.slug}`}
        className="group flex items-start gap-3 py-3.5 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-2 px-2 rounded-lg transition-colors duration-150"
      >
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
            {story.title}
          </h4>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {story.source} · {story.readTime} min
          </p>
        </div>
      </Link>
    );
  }

  return (
    <article
      className={`group flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 ${
        isPrincipal ? "p-6" : "p-5"
      }`}
    >
      {/* Header: categoría + fecha + tiempo (principal) */}
      <div className="flex items-center gap-2 mb-3">
        <CategoryBadge category={story.category} />
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {formatDateShort(story.date)}
        </span>
        {isPrincipal && (
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 ml-auto">
            <Clock className="w-3 h-3" />
            {story.readTime} min
          </span>
        )}
      </div>

      {/* Título + bajada (solo principal) */}
      <Link href={`/noticia/${story.slug}`} className="block mb-3">
        <h2
          className={`font-bold text-gray-900 dark:text-white leading-snug group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors ${
            isPrincipal ? "text-xl mb-2" : "text-base line-clamp-2"
          }`}
        >
          {story.title}
        </h2>
        {isPrincipal && (
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {story.bajada}
          </p>
        )}
      </Link>

      {/* Qué pasó — en ambos variants */}
      {story.whatHappened && (
        <div className="mb-3">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
            Qué pasó
          </p>
          <p
            className={`text-gray-700 dark:text-gray-300 leading-relaxed ${
              isPrincipal ? "text-sm" : "text-xs line-clamp-2"
            }`}
          >
            {story.whatHappened}
          </p>
        </div>
      )}

      {/* Bloques persona — principal: los 3; secondary: solo estudiante */}
      {isPrincipal ? (
        <div className="flex flex-col gap-2.5 mb-4">
          {PERSONA_BLOCKS.map(({ key, label, Icon, bg, border, labelColor }) => (
            <div
              key={key}
              className={`rounded-xl p-3 border ${bg} ${border}`}
            >
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1 ${labelColor}`}>
                <Icon className="w-3 h-3" />
                {label}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {personaText(story, key)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-teal-50 dark:bg-teal-950/30 rounded-xl p-3 border border-teal-100 dark:border-teal-800/50 mb-3">
          <p className="text-[10px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest mb-1 flex items-center gap-1">
            <GraduationCap className="w-3 h-3" />
            Para tus ramos
          </p>
          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
            {story.whyItMatters_student}
          </p>
        </div>
      )}

      {/* Conceptos relacionados */}
      {story.relatedConcepts && story.relatedConcepts.length > 0 && (
        <div className="flex flex-wrap items-center gap-1 mb-3">
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mr-0.5">
            Conceptos:
          </span>
          {story.relatedConcepts
            .slice(0, isPrincipal ? 6 : 3)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/recursos#${c.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] text-teal-700 dark:text-teal-400 hover:underline bg-teal-50 dark:bg-teal-950/30 px-2 py-0.5 rounded-full border border-teal-100 dark:border-teal-800/50 transition-colors"
              >
                {c.label}
              </Link>
            ))}
        </div>
      )}

      {/* Footer: fuente + CTA */}
      <div
        className={`flex items-center justify-between mt-auto ${
          isPrincipal ? "pt-4 border-t border-gray-100 dark:border-gray-700/50" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <a
            href={story.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            {story.source}
          </a>
          {!isPrincipal && (
            <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
              <Clock className="w-3 h-3" />
              {story.readTime} min
            </span>
          )}
        </div>
        <Link
          href={`/noticia/${story.slug}`}
          className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
        >
          {isPrincipal ? "Leer análisis completo →" : "Leer →"}
        </Link>
      </div>
    </article>
  );
}

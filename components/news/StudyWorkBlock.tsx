import { GraduationCap, Briefcase } from "lucide-react";
import type { RamoContexto } from "@/types";

interface Props {
  paraTusRamos?: RamoContexto[];
  paraLaPega?: string;
}

/**
 * Bloque pedagógico que conecta una noticia con el contexto del lector:
 * ramos universitarios donde aplica y cómo usarla en el trabajo.
 *
 * Se monta en la página de noticia cuando la noticia tiene los campos
 * `paraTusRamos` o `paraLaPega` poblados.
 *
 * TODO: completar paraTusRamos y paraLaPega en lib/data/noticias.ts
 *       para cada noticia curada usando los tipos definidos en types/index.ts.
 */
export default function StudyWorkBlock({ paraTusRamos, paraLaPega }: Props) {
  if (!paraTusRamos?.length && !paraLaPega) return null;

  return (
    <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">

      {/* ── Para tus ramos ── */}
      {paraTusRamos && paraTusRamos.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-800 rounded-lg flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4 text-teal-700 dark:text-teal-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest leading-none">
                Estudiante
              </p>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                Para tus ramos
              </h3>
            </div>
          </div>

          <ul className="space-y-3">
            {paraTusRamos.map((ramo) => (
              <li key={ramo.nombre} className="flex flex-col gap-0.5">
                <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {ramo.nombre}
                </span>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {ramo.contexto}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Para la pega ── */}
      {paraLaPega && (
        <div className="bg-[#1F2937] dark:bg-gray-900 rounded-2xl border border-gray-700 dark:border-gray-700 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-teal-700/20 border border-teal-700/30 rounded-lg flex items-center justify-center shrink-0">
              <Briefcase className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest leading-none">
                Profesional
              </p>
              <h3 className="text-sm font-bold text-white leading-tight">
                Para la pega
              </h3>
            </div>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{paraLaPega}</p>
        </div>
      )}
    </div>
  );
}

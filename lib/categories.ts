import type { Category, CategoryMeta } from "@/types";

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "economia",
    label: "Economía",
    color: "teal",
    bgColor: "bg-teal-50",
    textColor: "text-teal-800",
    borderColor: "border-teal-200",
    description: "Macroeconomía, inflación, política monetaria y crecimiento.",
  },
  {
    slug: "finanzas",
    label: "Finanzas",
    color: "amber",
    bgColor: "bg-amber-50",
    textColor: "text-amber-800",
    borderColor: "border-amber-200",
    description: "Mercados de capitales, banca, tasas y análisis financiero.",
  },
  {
    slug: "marketing",
    label: "Marketing",
    color: "purple",
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
    borderColor: "border-purple-200",
    description: "Estrategia de marca, tendencias digitales y comportamiento del consumidor.",
  },
  {
    slug: "innovacion",
    label: "Innovación",
    color: "blue",
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
    borderColor: "border-blue-200",
    description: "Tecnología, IA, transformación digital y disrupción.",
  },
  {
    slug: "negocios",
    label: "Negocios",
    color: "slate",
    bgColor: "bg-slate-100",
    textColor: "text-slate-700",
    borderColor: "border-slate-200",
    description: "Empresas, industrias, consumo y tendencias corporativas.",
  },
  {
    slug: "estrategia",
    label: "Estrategia",
    color: "indigo",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-800",
    borderColor: "border-indigo-200",
    description: "Decisiones corporativas, liderazgo, ventaja competitiva y management.",
  },
  {
    slug: "mercados",
    label: "Mercados",
    color: "green",
    bgColor: "bg-green-50",
    textColor: "text-green-800",
    borderColor: "border-green-200",
    description: "Bolsas, commodities, divisas y datos de mercado en tiempo real.",
  },
  {
    slug: "emprendimiento",
    label: "Emprendimiento",
    color: "orange",
    bgColor: "bg-orange-50",
    textColor: "text-orange-800",
    borderColor: "border-orange-200",
    description: "Startups, ecosistema emprendedor, venture capital y pymes.",
  },
];

export function getCategoryMeta(slug: Category): CategoryMeta {
  return CATEGORIES.find((c) => c.slug === slug) ?? CATEGORIES[0];
}

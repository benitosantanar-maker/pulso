import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, ExternalLink, ArrowLeft, ChevronRight } from "lucide-react";
import { getNoticiaBySlug, noticias, getNoticiasByCategoria } from "@/lib/data/noticias";
import CategoryBadge from "@/components/ui/CategoryBadge";
import NewsCardSecundaria from "@/components/news/NewsCardSecundaria";
import StudyWorkBlock from "@/components/news/StudyWorkBlock";
import { formatDate } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return noticias.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const noticia = getNoticiaBySlug(params.slug);
  if (!noticia) return { title: "Noticia no encontrada" };
  return {
    title: noticia.titulo,
    description: noticia.bajada,
  };
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let tableBuffer: string[] = [];

  function flushTable() {
    if (tableBuffer.length < 2) {
      tableBuffer = [];
      return null;
    }
    const rows = tableBuffer.map((row) =>
      row.split("|").map((cell) => cell.trim()).filter(Boolean)
    );
    const headers = rows[0];
    const dataRows = rows.slice(2);
    const el = (
      <div key={`table-${i}`} className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              {headers.map((h, j) => (
                <th key={j} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-2 px-3 bg-gray-50 border-b border-gray-200">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, j) => (
              <tr key={j}>
                {row.map((cell, k) => (
                  <td key={k} className="py-2 px-3 border-b border-gray-100 text-gray-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableBuffer = [];
    return el;
  }

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("|")) {
      tableBuffer.push(line);
      i++;
      continue;
    }

    if (tableBuffer.length > 0) {
      const tableEl = flushTable();
      if (tableEl) elements.push(tableEl);
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-lg font-semibold text-gray-900 mt-6 mb-2">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="font-semibold text-gray-900 mb-2">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="text-gray-700 leading-relaxed ml-4 list-disc">
          {line.slice(2).replace(/\*\*(.*?)\*\*/g, (_, m) => m)}
        </li>
      );
    } else if (line.match(/^\d+\. /)) {
      elements.push(
        <li key={i} className="text-gray-700 leading-relaxed ml-4 list-decimal">
          {line.replace(/^\d+\. /, "").replace(/\*\*(.*?)\*\*/g, (_, m) => m)}
        </li>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      const parsed = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      elements.push(
        <p
          key={i}
          className="text-gray-700 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: parsed }}
        />
      );
    }
    i++;
  }

  if (tableBuffer.length > 0) {
    const tableEl = flushTable();
    if (tableEl) elements.push(tableEl);
  }

  return elements;
}

export default function NoticiaPage({ params }: Props) {
  const noticia = getNoticiaBySlug(params.slug);
  if (!noticia) notFound();

  const relacionadas = getNoticiasByCategoria(noticia.categoria)
    .filter((n) => n.slug !== noticia.slug)
    .slice(0, 3);

  return (
    <div className="pt-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-700 transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/categoria/${noticia.categoria}`}
            className="hover:text-gray-700 transition-colors"
          >
            {noticia.categoria.charAt(0).toUpperCase() + noticia.categoria.slice(1)}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-600 truncate max-w-[200px]">{noticia.titulo}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Article */}
          <article className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <CategoryBadge category={noticia.categoria} size="md" />
                {noticia.tags?.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {noticia.titulo}
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-6 font-light">
                {noticia.bajada}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-400 pb-6 border-b border-gray-100">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {noticia.tiempoLectura} min de lectura
                </span>
                <span>{formatDate(noticia.fecha)}</span>
                <a
                  href={noticia.fuenteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-teal-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {noticia.fuente}
                </a>
              </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Resumen
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{noticia.resumen}</p>
              </div>
              <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-2">
                  Por qué importa
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{noticia.porQueImporta}</p>
              </div>
            </div>

            {/* Impact for IC */}
            <div className="bg-[#1F2937] rounded-xl p-5 mb-8 text-white">
              <p className="text-xs font-semibold text-teal-400 uppercase tracking-wide mb-2">
                Impacto para Ingeniería Comercial
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">{noticia.impactoIC}</p>
            </div>

            {/* Para tus ramos / Para la pega */}
            <StudyWorkBlock
              paraTusRamos={noticia.paraTusRamos}
              paraLaPega={noticia.paraLaPega}
            />

            {/* Main content */}
            <div className="text-gray-700 leading-relaxed">
              {renderContent(noticia.contenido)}
            </div>

            {/* Source */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">Fuente original</p>
                <a
                  href={noticia.fuenteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors"
                >
                  {noticia.fuente} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <Link
                href={`/categoria/${noticia.categoria}`}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Volver a {noticia.categoria}
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {relacionadas.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Noticias relacionadas
                </h3>
                <div className="space-y-4">
                  {relacionadas.map((n) => (
                    <NewsCardSecundaria key={n.slug} noticia={n} />
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[#1F2937] text-white rounded-xl p-5 sticky top-24">
              <p className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
                Brief semanal
              </p>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Recibe cada semana lo más importante en economía, finanzas y negocios.
              </p>
              <a
                href="#suscribir"
                className="block w-full text-center bg-teal-700 hover:bg-teal-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
              >
                Suscribirse gratis
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

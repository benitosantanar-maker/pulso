import Link from "next/link";
import { Coffee } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Coffee className="w-7 h-7 text-teal-700" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Página no encontrada</h1>
        <p className="text-gray-500 mb-8">
          Esta nota no existe o fue movida. Vuelve al inicio para explorar el contenido.
        </p>
        <Link
          href="/"
          className="inline-flex items-center bg-teal-700 text-white font-medium px-6 py-3 rounded-xl hover:bg-teal-800 transition-colors"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}

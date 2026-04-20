"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/categoria/economia", label: "Economía" },
  { href: "/categoria/finanzas", label: "Finanzas" },
  { href: "/categoria/marketing", label: "Marketing" },
  { href: "/categoria/innovacion", label: "Innovación" },
  { href: "/brief", label: "Brief" },
  { href: "/recursos", label: "Recursos" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center group-hover:bg-teal-800 transition-colors">
              <Coffee className="w-4 h-4 text-white" />
            </div>
            <span className="text-[#1F2937] font-bold text-lg tracking-tight">
              Café <span className="text-teal-700">Comercial</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href || pathname.startsWith(link.href)
                    ? "text-teal-700 bg-teal-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/acerca"
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              Acerca
            </Link>
            <Link
              href="#suscribir"
              className="bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-teal-800 transition-colors"
            >
              Suscribirse
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-teal-700 bg-teal-50"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 pb-1 border-t border-gray-100 mt-2">
              <Link
                href="#suscribir"
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-teal-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-teal-800 transition-colors"
              >
                Suscribirse al brief
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

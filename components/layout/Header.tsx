"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import MarketTicker from "@/components/layout/MarketTicker";
import { SearchButton } from "@/components/ui/SearchModal";

const NAV_LINKS = [
  { href: "/categoria/economia", label: "Economía" },
  { href: "/categoria/finanzas", label: "Finanzas" },
  { href: "/categoria/marketing", label: "Marketing" },
  { href: "/categoria/innovacion", label: "Innovación" },
  { href: "/brief", label: "Brief" },
  { href: "/datos-chile", label: "Datos Chile" },
  { href: "/recursos", label: "Recursos" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <MarketTicker />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-7 h-7 bg-teal-700 rounded-lg flex items-center justify-center group-hover:bg-teal-800 transition-colors">
              <Coffee className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[#1F2937] dark:text-white font-bold text-base tracking-tight">
              Café <span className="text-teal-700 dark:text-teal-400">Comercial</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-2.5 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap",
                  pathname === link.href || pathname.startsWith(link.href)
                    ? "text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <SearchButton />
            <DarkModeToggle />
            <Link
              href="/acerca"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors px-2"
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

          {/* Mobile right */}
          <div className="lg:hidden flex items-center gap-1">
            <SearchButton />
            <DarkModeToggle />
            <button
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Abrir menú"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 pb-1 border-t border-gray-100 dark:border-gray-800 mt-2">
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

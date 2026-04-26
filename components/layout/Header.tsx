"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import MarketTicker from "@/components/layout/MarketTicker";
import { SearchButton } from "@/components/ui/SearchModal";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/categoria/economia", label: "Economía" },
  { href: "/categoria/finanzas", label: "Finanzas" },
  { href: "/categoria/mercados", label: "Mercados" },
  { href: "/categoria/negocios", label: "Negocios" },
  { href: "/categoria/innovacion", label: "Innovación" },
  { href: "/categoria/emprendimiento", label: "Emprendimiento" },
  { href: "/datos-chile", label: "Datos Chile" },
  { href: "/recursos", label: "Aprende" },
  { href: "/brief", label: "Brief diario" },
];

function todayLabel() {
  return new Date().toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "var(--paper)", borderBottom: "3px solid var(--ink)" }}
    >
      {/* Market ticker */}
      <MarketTicker />

      {/* Header top: date | logo | actions */}
      <div style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between py-3 lg:py-4">
            {/* Left: date */}
            <div
              className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.06em] leading-relaxed"
              style={{ color: "var(--ink-faint)" }}
            >
              <div className="capitalize">{todayLabel()}</div>
              <div className="mt-0.5" style={{ color: "var(--ed-amber, #B5450A)" }}>
                ✦ Edición matinal disponible
              </div>
            </div>

            {/* Center: logo */}
            <Link href="/" className="flex-1 lg:flex-none text-center group">
              <div
                className="font-serif text-2xl lg:text-[38px] font-black leading-none tracking-tight transition-colors"
                style={{ color: "var(--ink)" }}
              >
                Café Comercial
              </div>
              <div
                className="font-mono text-[8px] lg:text-[9px] uppercase tracking-[0.2em] mt-1 hidden sm:block"
                style={{ color: "var(--ink-faint)" }}
              >
                Economía · Negocios · Mercados · Innovación
              </div>
            </Link>

            {/* Right: actions */}
            <div className="hidden lg:flex items-center gap-3">
              <SearchButton />
              <Link
                href="/acerca"
                className="font-mono text-[10px] uppercase tracking-[0.06em] transition-colors"
                style={{ color: "var(--ink-light)" }}
              >
                Acerca
              </Link>
              <Link
                href="#suscribir"
                className="font-sans text-[11px] font-semibold uppercase tracking-[0.08em] px-4 py-1.5 text-white transition-colors"
                style={{ background: "var(--ed-amber, #B5450A)" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#8A3208")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "var(--ed-amber, #B5450A)")}
              >
                Suscribirse
              </Link>
            </div>

            {/* Mobile right */}
            <div className="lg:hidden flex items-center gap-2">
              <SearchButton />
              <button
                className="p-1.5"
                style={{ color: "var(--ink-mid)" }}
                onClick={() => setOpen(!open)}
                aria-label="Abrir menú"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop nav */}
      <nav
        className="hidden lg:flex items-center justify-center overflow-x-auto scrollbar-hide"
        style={{ borderBottom: "none" }}
      >
        {NAV_LINKS.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname === link.href || pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-sans text-[11.5px] font-semibold uppercase tracking-[0.06em] px-4 py-2.5 whitespace-nowrap border-b-2 transition-colors",
                isActive
                  ? "border-[#B5450A] text-[#12100D]"
                  : "border-transparent text-[#3A3731] hover:text-[#12100D] hover:border-[#B5450A]"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden"
          style={{ background: "var(--paper)", borderTop: "1px solid var(--border)" }}
        >
          <div className="px-4 py-3 space-y-0.5">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide transition-colors"
                  style={{
                    color: isActive ? "#B5450A" : "var(--ink-mid)",
                    borderLeft: isActive ? "2px solid #B5450A" : "2px solid transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 mt-2" style={{ borderTop: "1px solid var(--border)" }}>
              <Link
                href="#suscribir"
                onClick={() => setOpen(false)}
                className="block w-full text-center font-sans text-sm font-semibold uppercase tracking-wide px-4 py-2.5 text-white"
                style={{ background: "#B5450A" }}
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

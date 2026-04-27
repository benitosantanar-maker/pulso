"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import MarketTicker from "@/components/layout/MarketTicker";

const NAV_LINKS = [
  { href: "/",                    label: "Inicio",         highlight: false },
  { href: "/brief",               label: "Brief del día",  highlight: true  },
  { href: "/recursos",            label: "Aprende",        highlight: false },
  { href: "/recursos",            label: "Guías",          highlight: false },
  { href: "/categoria/economia",  label: "Análisis",       highlight: false },
  { href: "/categoria/economia",  label: "Noticias",       highlight: false },
  { href: "/datos-chile",         label: "Datos Chile",    highlight: false },
  { href: "/categoria/mercados",  label: "Mercados",       highlight: false },
  { href: "/categoria/emprendimiento", label: "Emprendimiento", highlight: false },
  { href: "/categoria/innovacion", label: "Innovación",   highlight: false },
  { href: "/recursos",            label: "Glosario",       highlight: false },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const today = new Date().toLocaleDateString("es-CL", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <header style={{ borderBottom: "3px solid var(--ink)", background: "var(--paper)" }}>
      <MarketTicker />

      {/* Top bar: date | logo | actions */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px var(--px) 16px", borderBottom: "1px solid var(--border)" }}>
        {/* Date + status */}
        <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--ink-faint)", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.7 }}>
          <div style={{ textTransform: "capitalize" }}>{today}</div>
          <div style={{ color: "var(--amber)" }}>✦ Brief matinal disponible</div>
        </div>

        {/* Logo */}
        <Link href="/" style={{ textAlign: "center", flex: 1, display: "block" }}>
          <div style={{ fontFamily: "var(--serif)", fontSize: "38px", fontWeight: 900, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1 }}>
            Café Comercial
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-faint)", marginTop: "3px" }}>
            Tu plataforma de conocimiento en economía y negocios
          </div>
        </Link>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            href="/brief"
            style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--ink-light)", border: "1px solid var(--border)", padding: "6px 12px", display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            Buscar <span style={{ fontSize: "9px", color: "var(--ink-faint)", background: "var(--paper-dark)", padding: "2px 5px" }}>⌘K</span>
          </Link>
          <button
            style={{ background: "var(--amber)", color: "white", fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "8px 18px", cursor: "pointer", border: "none" }}
          >
            Suscribirse
          </button>
          {/* Mobile toggle */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "6px" }}
          >
            {open ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="hidden lg:flex" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 var(--px)", overflowX: "auto", scrollbarWidth: "none" }}>
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "var(--sans)",
                fontSize: "11.5px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: link.highlight ? "var(--amber)" : active ? "var(--ink)" : "var(--ink-mid)",
                padding: "10px 15px",
                whiteSpace: "nowrap",
                borderBottom: active ? "2px solid var(--amber)" : "2px solid transparent",
                cursor: "pointer",
                transition: "color 0.15s, border-color 0.15s",
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden" style={{ background: "var(--paper)", borderTop: "1px solid var(--border)", padding: "12px var(--px)" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ display: "block", fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 600, color: link.highlight ? "var(--amber)" : "var(--ink-mid)", padding: "10px 0", borderBottom: "1px solid var(--border-light)", letterSpacing: "0.06em", textTransform: "uppercase" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

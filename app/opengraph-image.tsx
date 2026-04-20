import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #0F172A 0%, #134E4A 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid de fondo decorativo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(20,184,166,0.15) 0%, transparent 50%), " +
              "radial-gradient(circle at 20% 80%, rgba(15,118,110,0.1) 0%, transparent 40%)",
            display: "flex",
          }}
        />

        {/* Header: logo + nombre */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Icono taza */}
          <div
            style={{
              width: 64,
              height: 64,
              background: "linear-gradient(135deg, #0F766E 0%, #134E4A 100%)",
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 0 2px rgba(45,212,191,0.3)",
              gap: 3,
            }}
          >
            {/* Vapor */}
            <div style={{ display: "flex", gap: 5, marginBottom: 2 }}>
              <div style={{ width: 3, height: 8, background: "rgba(255,255,255,0.35)", borderRadius: 3 }} />
              <div style={{ width: 3, height: 11, background: "rgba(255,255,255,0.25)", borderRadius: 3, marginTop: 3 }} />
              <div style={{ width: 3, height: 8, background: "rgba(255,255,255,0.35)", borderRadius: 3 }} />
            </div>
            {/* Cuerpo taza */}
            <div
              style={{
                width: 36,
                height: 26,
                background: "white",
                borderRadius: "4px 4px 10px 10px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: -8,
                  top: 4,
                  width: 9,
                  height: 14,
                  border: "3.5px solid white",
                  borderLeft: "none",
                  borderRadius: "0 6px 6px 0",
                }}
              />
            </div>
            {/* Platillo */}
            <div style={{ width: 44, height: 4, background: "rgba(255,255,255,0.75)", borderRadius: 3 }} />
          </div>

          {/* Wordmark */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ color: "white", fontSize: 32, fontWeight: 800, letterSpacing: "-0.5px", display: "flex" }}>
              Café{" "}
              <span style={{ color: "#2DD4BF", marginLeft: 8 }}>Comercial</span>
            </div>
            <div
              style={{
                color: "#5EEAD4",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "3px",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              Plataforma editorial
            </div>
          </div>
        </div>

        {/* Titular principal */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              color: "white",
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-3px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ display: "flex" }}>Lo esencial para</span>
            <span style={{ color: "#2DD4BF", display: "flex" }}>ingenieros comerciales</span>
          </div>
          {/* Categorías pill row */}
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            {["Economía", "Finanzas", "Marketing", "Innovación", "Estrategia"].map((cat) => (
              <div
                key={cat}
                style={{
                  background: "rgba(45,212,191,0.12)",
                  border: "1px solid rgba(45,212,191,0.25)",
                  color: "#2DD4BF",
                  fontSize: 16,
                  fontWeight: 600,
                  padding: "6px 16px",
                  borderRadius: 100,
                  display: "flex",
                }}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            color: "#4B5563",
            fontSize: 18,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ display: "flex" }}>cafecomercial.vercel.app</span>
          <span style={{ color: "#2DD4BF", fontSize: 16, display: "flex" }}>
            Feed RSS · 45+ fuentes · Actualizado cada 2 min
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
